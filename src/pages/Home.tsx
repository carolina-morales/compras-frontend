import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../components/atoms/Layout";
import FormAddArticles from "../components/molecules/FormAddArticles";
import ListArticles from "../components/molecules/ListArticles";
import { getArticles } from "../services/articles";
import { getUserByToken } from "../utils/functions";
import { IArticle } from "../utils/interfaces";

const Home = () => {
  const user = getUserByToken();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      setArticles(await getArticles({ _id: user._id }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Grid container spacing={5} marginY={3}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h1" color="primary" fontWeight="bold">
            Lista de compras
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Agregar elementos" />
            <CardContent>
              <FormAddArticles reload={fetchData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Elementos guardados" />
            <CardContent>
              {loading ? (
                <CircularProgress size={25} color="primary" />
              ) : (
                <ListArticles
                  articles={articles}
                  setArticles={setArticles}
                  reload={fetchData}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
