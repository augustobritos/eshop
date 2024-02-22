import { Container, Box, Grid, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h1" align="center" p={2}>
              Bienvenido a Anima!
            </Typography>
          </Grid>
          <Box
            component="img"
            src="dog.jpg"
            alt="Wonderful"
            style={{
              marginTop: 20,
              marginBottom: 20,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </Grid>
        <Box>
          <Box>
            <section>
              <Typography variant="h2" p={2}>
                Nuestros Servicios
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "lg" }}>
                Desde estudios rutinarios, vacunaciones hasta avanzados procesos
                .
              </Typography>
            </section>
          </Box>
          <Box style={{ marginBottom: 50 }}>
            <section>
              <Typography variant="h2" p={2}>
                Nuestro Equipo
              </Typography>
              <Typography variant="body1" p={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                non enim eius, eligendi maiores nam fuga temporibus ullam
                commodi sapiente dolores nisi dolore nulla, eaque exercitationem
                veniam eveniet laudantium amet magnam ea deserunt iure sed!
                Soluta qui alias cumque et?
              </Typography>
            </section>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
