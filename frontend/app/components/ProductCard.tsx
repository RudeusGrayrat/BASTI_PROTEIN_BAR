import { ProductImage, type ProductImageVariant } from "./ProductImage";

type ProductCardProps = {
  product: Readonly<{
    name: string;
    description: string;
    protein: string;
    price: string;
    image: ProductImageVariant;
  }>;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e1d7c7] bg-[#fffaf0] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <ProductImage variant={product.image} alt={product.name} />
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-semibold text-[#1d2815]">{product.name}</h3>
          <button
            type="button"
            aria-label="Favoritos proximamente"
            disabled
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#dacfbf] text-[#3a472a] opacity-70"
          >
            <span aria-hidden>*</span>
          </button>
        </div>
        <p className="text-sm text-[#6e6a5d]">{product.protein} proteina</p>
        <p className="mt-1 text-sm text-[#6e6a5d]">{product.description}</p>
        <p className="mt-4 font-bold text-[#1d2815]">{product.price}</p>
      </div>
    </article>
  );
}
