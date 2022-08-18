import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../components/atoms/Layout";
import EditProfile from "../components/molecules/EditProfile";
import FormAddArticles from "../components/molecules/FormAddArticles";
import ListArticles from "../components/molecules/ListArticles";
import { getArticles } from "../services/articles";
import { getUserByToken } from "../utils/functions";
import { IArticle } from "../utils/interfaces";

const Home = () => {
  const theme = useTheme();
  const user = getUserByToken();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<IArticle[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      setArticles(await getArticles({ _id: user.user._id }));
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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
          textAlign="center"
        >
          <Grid item marginRight={2}>
            <Typography variant="h1" color="primary" fontWeight="bold">
              Lista de compras
            </Typography>
          </Grid>
          <Grid item style={{ cursor: "pointer" }}>
            {user.user.photo ? (
              <Avatar
                alt={user.user.name}
                src={user.user.photo}
                onClick={() => setOpen(true)}
              />
            ) : (
              <AccountCircle
                color="primary"
                fontSize="large"
                style={{ marginTop: theme.spacing(1) }}
                onClick={() => setOpen(true)}
              />
            )}
          </Grid>
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
        {open ? <EditProfile setOpen={setOpen} /> : null}
      </Grid>
    </Layout>
  );
};

export default Home;
