import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/atoms/Layout";
import FormAddArticles from "../components/molecules/FormAddArticles";
import ListArticles from "../components/molecules/ListArticles";

const Home = () => {
  return (
    <Layout>
      <Grid container spacing={5} marginY={3}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h1" color="primary" fontWeight="bold">
            Lista de compras
          </Typography>
        </Grid>
        <Grid item md={6} spacing={3}>
          <Card>
            <CardHeader title="Agregar elementos" />
            <CardContent>
              <FormAddArticles />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Elementos guardados" />
            <CardContent>
              <ListArticles />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
