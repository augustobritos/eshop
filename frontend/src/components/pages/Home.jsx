import { Box, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', marginY: '10px' }}>
      <Typography variant="h1" component="h1">
        Minded Crew
      </Typography>

      <Box component="img" src='yacht.jpg' alt="Wonderful" sx={{ marginBottom: '8px' }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <Box sx={{ width: '100%' }}>
          <section>
            <Typography variant="h2" component="h2" sx={{ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4px' }}>
              Luxury & Comfort
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 'lg' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, neque deleniti accusantium ipsa aspernatur eveniet
              animi commodi saepe, odio fugiat
            </Typography>
          </section>
        </Box>
        <Box sx={{ width: '100%' }}>
          <section>
            <Typography variant="h2" component="h2" sx={{ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4px' }}>
              Our Services
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 'lg' }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
              assumenda laudantium illo dolorum quisquam eaque
            </Typography>
          </section>
        </Box>
        <Box sx={{ width: '100%' }}>
          <section>
            <Typography variant="h2" component="h2" sx={{ fontSize: '2xl', fontWeight: 'bold', marginBottom: '4px' }}>
              Comfort and Convenience
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 'lg' }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptates explicabo, eligendi obcaecati praesentium qui porro ea
              b
            </Typography>
          </section>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
