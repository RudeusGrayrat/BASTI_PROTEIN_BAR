import Image from "next/image";

export type ProductImageVariant = "waffle" | "matcha" | "bowl" | "shake";

type ProductImageProps = {
  variant: ProductImageVariant;
  alt: string;
  large?: boolean;
  priority?: boolean;
};

const imageByVariant: Record<ProductImageVariant, string> = {
  waffle: "/images/basti/product-waffle.png",
  matcha: "/images/basti/product-matcha.png",
  bowl: "/images/basti/product-bowl.png",
  shake: "/images/basti/product-shake.png",
};

export function ProductImage({
  variant,
  alt,
  large = false,
  priority = false,
}: ProductImageProps) {
  return (
    <div className={`relative overflow-hidden bg-[#f2e8d8] ${large ? "h-80" : "h-44"}`}>
      <Image
        src={imageByVariant[variant]}
        alt={alt}
        fill
        priority={priority}
        sizes={large ? "(min-width: 1024px) 420px, 100vw" : "(min-width: 1024px) 280px, 50vw"}
        className="object-cover"
      />
    </div>
  );
}
