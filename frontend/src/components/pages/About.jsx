import { Card, Container, Typography } from "@mui/material";

function About() {
  const about =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias optio suscipit praesentium. Libero laboriosam voluptas excepturi dolor pariatur vero dignissimos necessitatibus iste repellat assumenda rem, odio neque sunt magnam labore?";

  const products = ["Product 1", "Product 2", "Product 3", "Product 4"];

  const benefits = [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto fuga maxime magni pariatur ullam nihil eligendi itaque quo, vel porro soluta ratione illum expedita consectetur, quidem libero repellendus consequuntur consequatur!",
  ];

  return (
    <Container maxWidth="md">
      <Card sx={{ marginBottom: 10 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            padding: 4,
          }}
          gutterBottom
        >
          Sobre Nosotros...
        </Typography>
        <Typography
          variant="body1"
          sx={{ paddingX: 2, paddingY: 4, fontSize: "2xl" }}
          gutterBottom
        >
          {about}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "2xl",
            textAlign: "center",
            paddingTop: 4,
            paddingBottom: 4,
          }}
          gutterBottom
        >
          Nuestros Productos
        </Typography>
        {products.map((tech, index) => (
          <Typography key={index} variant="body1" sx={{ padding: 2 }}>
            ⭐ {tech}
          </Typography>
        ))}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "2xl",
            textAlign: "center",
            paddingTop: 4,
            paddingBottom: 4,
          }}
          gutterBottom
        >
          Beneficios
        </Typography>
        {benefits.map((feature, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ paddingX: 2, paddingY: 4 }}
          >
            🐲 {feature}
          </Typography>
        ))}
      </Card>
    </Container>
  );
}

export default About;
