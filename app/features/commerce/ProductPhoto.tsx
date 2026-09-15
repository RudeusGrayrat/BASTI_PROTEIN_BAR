import Image from "next/image";
export function ProductPhoto({
  src,
  name,
  compact = false,
}: {
  src: string | null;
  name: string;
  compact?: boolean;
}) {
  const safe =
    src &&
    ((src.startsWith("/") && !src.startsWith("//")) ||
      /^https?:\/\//i.test(src));
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl bg-[#f2e8d8] ${compact ? "h-20 w-20 sm:h-24 sm:w-24" : "h-48"}`}
    >
      {safe ? (
        <Image
          src={src}
          alt={name}
          fill
          unoptimized
          sizes={compact ? "96px" : "(min-width: 1024px) 300px, 100vw"}
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
      ) : (
        <div
          className={`grid h-full place-items-center font-serif tracking-widest text-[#556235] ${compact ? "text-sm" : "text-3xl"}`}
        >
          BASTI
        </div>
      )}
    </div>
  );
}
