import { test } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";
import ts from "typescript";
const source = ts.transpileModule(
  fs.readFileSync(
    new URL("../app/features/commerce/commerce-api.ts", import.meta.url),
    "utf8",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
function client(response) {
  const calls = [];
  const context = {
    exports: {},
    URL,
    process: {
      env: {
        NEXT_PUBLIC_API_URL: "https://kapos.example/api",
        NEXT_PUBLIC_BASTI_SLUG: "basti",
      },
    },
    require: () => ({
      apiRequest: async (path, options) => {
        calls.push({ path, options });
        if (response instanceof Error) throw response;
        return response;
      },
    }),
  };
  vm.runInNewContext(source, context);
  return { api: context.exports, calls };
}
test("loads business configuration from Kapos and resolves its logo URL", async () => {
  const { api, calls } = client({ name: "Basti", logoUrl: "/images/logo.png" });
  assert.equal(
    (await api.getStorefront()).logoUrl,
    "https://kapos.example/images/logo.png",
  );
  assert.equal(calls[0].path, "/consumer/storefront/basti/configuration");
});
test("catalog uses selected branch and server currency and images", async () => {
  const { api, calls } = client({
    currency: "USD",
    products: [{ id: "1", imageUrl: "/images/product.png" }],
  });
  const catalog = await api.getCatalog(undefined, "branch-1");
  assert.equal(
    calls[0].path,
    "/consumer/storefront/basti/catalog?branchId=branch-1",
  );
  assert.equal(catalog.products[0].currency, "USD");
  assert.equal(
    catalog.products[0].imageUrl,
    "https://kapos.example/images/product.png",
  );
});
test("a server failure never falls back to sample products", async () => {
  const { api } = client(new Error("offline"));
  await assert.rejects(api.getCatalog(), /offline/);
});
test("private resources include the consumer access token", async () => {
  const { api, calls } = client({});
  await api.getOrders("test-token");
  await api.getWallet("test-token");
  assert.equal(calls[0].path, "/consumer/storefront/basti/orders");
  assert.equal(calls[1].path, "/consumer/storefront/basti/wallet");
  assert.ok(calls.every((call) => call.options.accessToken === "test-token"));
});
