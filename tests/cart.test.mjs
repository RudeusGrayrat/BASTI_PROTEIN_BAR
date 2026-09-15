import { test } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import fs from "node:fs";
import ts from "typescript";
const output = ts.transpileModule(
  fs.readFileSync(
    new URL("../app/features/commerce/cart-domain.ts", import.meta.url),
    "utf8",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const scope = { exports: {}, URLSearchParams, Intl };
vm.runInNewContext(output, scope);
const { addProduct, restoreCart, cartTotal, authDestination, MAX_QUANTITY } =
  scope.exports;
const product = {
  id: "waffle",
  name: "Waffle",
  description: null,
  category: "Carta",
  imageUrl: null,
  priceCents: 2490,
  currency: "PEN",
  available: true,
};
test("adding the same product aggregates quantities and respects the limit", () => {
  let cart = [];
  for (let i = 0; i < 50; i++) cart = addProduct(cart, product);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, MAX_QUANTITY);
});
test("totals use integer cents", () => {
  const cart = addProduct(addProduct([], product), product);
  assert.equal(cartTotal(cart), 4980);
});
test("unavailable products cannot be added", () => {
  assert.equal(addProduct([], { ...product, available: false }).length, 0);
});
test("recovers valid carts and rejects corrupt and invalid stored data", () => {
  assert.equal(restoreCart("broken").length, 0);
  assert.equal(restoreCart("{}").length, 0);
  const raw = JSON.stringify([
    { product, quantity: 2 },
    { product, quantity: 3 },
    { product: { ...product, id: "bad", priceCents: -100 }, quantity: 1 },
  ]);
  const cart = restoreCart(raw);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);
});
test("return paths cannot redirect to external URLs or arbitrary routes", () => {
  for (const value of [
    "https://evil.test",
    "//evil.test",
    "/login",
    "/cuenta/../../evil",
  ]) {
    assert.equal(
      authDestination(`?next=${encodeURIComponent(value)}`),
      "/cuenta",
    );
  }
  assert.equal(authDestination("?next=/carrito"), "/carrito");
  assert.equal(authDestination("?next=/puntos"), "/puntos");
  assert.equal(authDestination("?next=/cuenta/puntos"), "/puntos");
});
