import Image from "next/image";
import Link from "next/link";
import { GiftIcon, LeafIcon, UserIcon } from "../../components/icons";

export function AuthLayout({
  children,
  title,
  description,
  register = false,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  register?: boolean;
}) {
  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="Bienvenido a Basti">
        <Image
          src="/images/basti/hero-waffles.png"
          alt="Waffles Basti con plátano y chocolate, servidos con luz natural"
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="auth-story-image"
        />
        <div className="auth-story-shade" />
        <div className="auth-story-content">
          <Brand />
          <div className="auth-story-copy">
            <p className="auth-eyebrow">
              Pequeños hábitos,
              <br /> grandes cambios
            </p>
            <h2>
              {register ? "Un buen" : "Tu pausa"}
              <br />
              <span>{register ? "comienzo" : "favorita"}</span>
              <br />
              {register ? "empieza aquí" : "te espera"}
            </h2>
            <p className="auth-story-description">
              {register
                ? "Haz espacio para lo que te hace bien. Crea tu cuenta y empieza a vivir tu experiencia Basti."
                : "Un espacio para tus compras, tus puntos y esos pequeños momentos que hacen bien."}
            </p>
            <div className="auth-perks">
              {[
                {
                  Icon: GiftIcon,
                  title: "Puntos y beneficios",
                  text: "Conoce todo lo que puedes sumar.",
                },
                {
                  Icon: UserIcon,
                  title: "Tu espacio Basti",
                  text: "Tus compras y puntos, en un solo lugar.",
                },
                {
                  Icon: LeafIcon,
                  title: "Ingredientes reales",
                  text: "Una pausa llena de sabor.",
                },
              ].map(({ Icon, title, text }) => (
                <div className="auth-perk" key={title}>
                  <span>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="auth-form-side">
        <div className="auth-card">
          <div className="text-center">
            <Brand />
            <h1>{title}</h1>
            <p className="auth-subtitle">{description}</p>
          </div>
          {children}
          <p className="auth-footnote">
            <LeafIcon className="h-6 w-6 shrink-0" />
            <span>
              Disfruta tu momento.
              <br />
              Lo demás empieza con tu cuenta Basti.
            </span>
          </p>
        </div>
        <Link href="/" className="auth-back">
          ← Volver a Basti
        </Link>
      </section>
    </main>
  );
}
function Brand() {
  return (
    <Link href="/" aria-label="Basti, inicio" className="auth-brand">
      <span>BASTI</span>
      <small>Protein Bar</small>
    </Link>
  );
}
