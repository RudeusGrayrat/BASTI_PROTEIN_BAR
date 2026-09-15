import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import { RouteHero, BrandValues } from "../components/RouteHero";
import { LeafIcon, HeartIcon, StarIcon } from "../components/icons";
export const metadata: Metadata = {
  title: "Nosotros | Basti Protein Bar",
  description:
    "Ingredientes reales, pequeños hábitos y buenos momentos. Conoce la propuesta de Basti.",
};
export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <RouteHero
          eyebrow="Más que una pausa"
          title="Somos Basti,"
          accent="buenos hábitos, a tu ritmo."
          description="Creemos que comer bien y disfrutar pueden ir de la mano. Una propuesta de sabor y pequeños momentos para acompañarte en tu día."
          image="/images/basti/about-ingredients.png"
          alt="Avena, almendras, plátano y matcha sobre una mesa iluminada por el sol"
        >
          <a href="#filosofia" className="basti-button">
            Nuestra filosofía →
          </a>
          <a href="#valores" className="points-secondary">
            Nuestros valores
          </a>
        </RouteHero>
        <div className="route-body about-body">
          <BrandValues cards />
          <section id="filosofia" className="about-philosophy">
            <div>
              <p className="route-eyebrow">Nuestra filosofía</p>
              <h2>
                Pequeños hábitos,
                <br />
                <span>grandes momentos.</span>
              </h2>
              <p>
                Una pausa a solas, una conversación o algo rico entre
                pendientes. Creemos en hacer espacio para lo que te hace bien,
                sin convertir cada elección en una regla.
              </p>
              <p>
                En Basti queremos acompañarte con una experiencia sencilla y
                cercana. Elige lo que te provoca, descubre nuevas combinaciones
                y encuentra tus propios favoritos.
              </p>
              <Link className="basti-button mt-5" href="/menu">
                Encuentra tu favorito →
              </Link>
            </div>
            {[
              {
                image: "about-ingredients.png",
                title: "El origen del sabor",
                text: "Ingredientes, aromas y texturas: lo sencillo también puede sorprender. Nuestra propuesta empieza por disfrutar cada combinación.",
                alt: "Avena y frutos secos sobre una superficie de piedra",
              },
              {
                image: "product-waffle.png",
                title: "Disfrutar sin prisa",
                text: "Un antojo, una pausa o algo para compartir. Cada momento tiene su lugar y tú eliges cómo vivirlo.",
                alt: "Waffle servido con sus acompañamientos",
              },
              {
                image: "product-shake.png",
                title: "Una pausa a tu manera",
                text: "Tu rutina cambia, tus gustos también. Explora la carta y encuentra qué te acompaña mejor hoy.",
                alt: "Shake de chocolate",
              },
            ].map((item) => (
              <article key={item.title}>
                <div className="about-photo">
                  <Image
                    src={"/images/basti/" + item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </section>
          <section id="valores" className="about-manifesto">
            <div className="about-manifesto-quote">
              <span aria-hidden="true">“</span>
              <h2>
                Comer bien también es disfrutar.
                <br />Y disfrutar es mejor cuando lo compartimos.
              </h2>
              <p>
                No necesitas una ocasión especial para tener un buen momento.
                Queremos que Basti sea ese espacio al que vuelves por el sabor,
                por la pausa y por cómo te hace sentir.
              </p>
              <Link href="/puntos">Sé parte de Basti →</Link>
            </div>
            <div className="about-principles">
              {[
                {
                  Icon: LeafIcon,
                  title: "Bienestar en lo cotidiano",
                  text: "Pequeñas elecciones que encuentran lugar en tu día.",
                },
                {
                  Icon: HeartIcon,
                  title: "Una experiencia cercana",
                  text: "Tu cuenta, tus favoritos y tus momentos Basti.",
                },
                {
                  Icon: StarIcon,
                  title: "Siempre por descubrir",
                  text: "Nuevos sabores y razones para hacer una pausa.",
                },
              ].map(({ Icon, title, text }) => (
                <div key={title}>
                  <Icon className="h-6 w-6 shrink-0" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
