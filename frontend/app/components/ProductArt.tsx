type ProductArtProps = {
  variant: "waffle" | "matcha" | "bowl" | "shake";
  large?: boolean;
};

export function ProductArt({ variant, large = false }: ProductArtProps) {
  const size = large ? "h-80" : "h-44";

  if (variant === "matcha") {
    return (
      <div className={`${size} relative overflow-hidden bg-[#efe8d8]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,#fffaf0_0_18%,transparent_19%),radial-gradient(circle_at_65%_75%,#d7d4a8_0_16%,transparent_17%)]" />
        <div className="absolute left-1/2 top-1/2 h-28 w-32 -translate-x-1/2 -translate-y-1/2 rounded-b-[42px] rounded-t-lg bg-[#879055] shadow-2xl">
          <div className="mx-auto mt-5 h-10 w-20 rounded-[50%] bg-[#dce0aa] p-2">
            <div className="h-full rounded-[50%] border-2 border-white/70" />
          </div>
          <p className="mt-5 text-center font-serif text-xs tracking-[0.35em] text-[#29311b]">
            BASTI
          </p>
        </div>
      </div>
    );
  }

  if (variant === "bowl") {
    return (
      <div className={`${size} relative overflow-hidden bg-[#eee4d2]`}>
        <div className="absolute left-1/2 top-1/2 h-36 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#f7f1e5] shadow-2xl">
          <div className="absolute inset-4 rounded-[50%] bg-[#5b3428]" />
          {["#d7a33a", "#f4e9cd", "#7b1f28", "#1f4f35", "#b67d45"].map((color, index) => (
            <span
              key={color}
              className="absolute h-7 w-7 rounded-full shadow"
              style={{
                backgroundColor: color,
                left: `${32 + (index % 3) * 18}%`,
                top: `${30 + Math.floor(index / 3) * 22}%`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "shake") {
    return (
      <div className={`${size} relative overflow-hidden bg-[#eadbc4]`}>
        <div className="absolute left-1/2 top-[52%] h-36 w-24 -translate-x-1/2 -translate-y-1/2 rounded-b-3xl rounded-t-md bg-[#8a542c] shadow-2xl">
          <div className="absolute -top-3 left-2 h-6 w-20 rounded-[50%] bg-[#c49260]" />
          <div className="absolute left-10 top-8 h-24 w-1 -rotate-12 rounded-full bg-[#3a271c]" />
          <p className="mt-16 text-center font-serif text-xs tracking-[0.28em] text-[#f8ead5]">
            BASTI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${size} relative overflow-hidden bg-[#efe4d1]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fff8e8_0_13%,transparent_14%),radial-gradient(circle_at_78%_20%,#c2a16d_0_12%,transparent_13%),radial-gradient(circle_at_40%_85%,#e8cf9c_0_12%,transparent_13%)]" />
      <div className="absolute left-1/2 top-[54%] h-44 w-52 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[34px] bg-[#b77b39] shadow-2xl">
        <div className="absolute inset-3 grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="rounded-xl bg-[#e5b96c] shadow-inner" />
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-3 w-3 rounded-full bg-[#4a2a17]"
            style={{
              left: `${18 + (index % 4) * 18}%`,
              top: `${20 + Math.floor(index / 4) * 42}%`,
            }}
          />
        ))}
        <div className="absolute left-[43%] top-3 h-14 w-16 rounded-[50%] bg-[#f4dfa8]" />
      </div>
    </div>
  );
}
