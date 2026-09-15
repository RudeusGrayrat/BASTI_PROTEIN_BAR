import Image from "next/image";
import { LeafIcon, HeartIcon, UserIcon, BarbellIcon } from "./icons";

export function RouteHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  alt,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="route-hero">
      <div
        className={
          image.endsWith("about-ingredients.png")
            ? "route-hero-art route-hero-art-about"
            : "route-hero-art"
        }
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="route-hero-shade" />
      <div className="route-hero-content">
        <p className="route-eyebrow">{eyebrow}</p>
        <h1>
          {title}
          <span>{accent}</span>
        </h1>
        <p className="route-hero-description">{description}</p>
        {children && (
          <div className="mt-6 flex flex-wrap gap-3">{children}</div>
        )}
      </div>
    </section>
  );
}
export function BrandValues({ cards = false }: { cards?: boolean }) {
  return (
    <section
      className={cards ? "brand-values brand-values-cards" : "brand-values"}
      aria-label="La experiencia Basti"
    >
      {[
        {
          Icon: LeafIcon,
          title: "Ingredientes reales",
          text: "El sabor empieza en lo sencillo.",
        },
        {
          Icon: BarbellIcon,
          title: "A tu ritmo",
          text: "Opciones para acompañar tu día.",
        },
        {
          Icon: HeartIcon,
          title: "Disfrutar también cuenta",
          text: "Una pausa que se siente bien.",
        },
        {
          Icon: UserIcon,
          title: "Una comunidad real",
          text: "Pequeños hábitos, buenos momentos.",
        },
      ].map(({ Icon, title, text }) => (
        <div className="brand-value" key={title}>
          <span>
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
