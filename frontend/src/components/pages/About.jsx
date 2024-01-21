import { Card } from "../ui/Card";

function About() {
  const about = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias optio suscipit praesentium. Libero laboriosam voluptas excepturi dolor pariatur vero dignissimos necessitatibus iste repellat assumenda rem, odio neque sunt magnam labore?";

  const products = ["Product 1" , "Product 2", "Product 3", "Product 4"];

  const benefits = [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto fuga maxime magni pariatur ullam nihil eligendi itaque quo, vel porro soluta ratione illum expedita consectetur, quidem libero repellendus consequuntur consequatur!"
  ];

  return (
    <Card>
      <h1 className="font-bold justify-center text-4xl py-4 text-center text-green-400">
        Sobre Nosotros...
      </h1>
      <h2 className="px-2 py-4 text-2xl">{about}</h2>
      <h1 className="font-bold justify-center text-2xl px-3 py-4 text-center">
        Nuestros Productos
      </h1>
      {products.map((tech, index) => (
        <h3 key={index} className="py-2">⭐ {tech}</h3>
      ))}
      <h1 className="font-bold justify-center text-2xl py-4 text-center">
        Beneficios
      </h1>
      {benefits.map((feature, index) => (
        <p key={index} className="px-2 py-4">🐲 {feature}</p>
      ))}
    </Card>
  );
}

export default About;
