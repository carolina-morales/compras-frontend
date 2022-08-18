import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LocalMall } from "@mui/icons-material";
import Layout from "../components/atoms/Layout";
import { login } from "../services/user";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setError(false);
      if (!data.username.trim() || !data.password.trim()) setError(true);

      setLoading(true);
      const resp = await login(data.username, data.password);
      if (!resp) return toast.error("User not found");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={5}>
          <Card style={{ padding: theme.spacing(2) }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <LocalMall color="primary" fontSize="large" />
              </Grid>

              <Grid item marginBottom={2}>
                <Typography variant="h3" fontWeight="bold">
                  Iniciar sesión
                </Typography>
                <Typography color="GrayText">
                  Ingresa tus credenciales de acceso para comenzar a comprar con
                  nosotros.
                </Typography>
              </Grid>

              <Grid item>
                <form onSubmit={handleSumbit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        name="username"
                        value={data.username}
                        label="Usuario*"
                        onChange={(e) =>
                          setData({ ...data, username: e.target.value })
                        }
                        error={error && !data.username.trim()}
                        helperText={
                          error && !data.username.trim()
                            ? "Campo obligatorio"
                            : null
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        value={data.password}
                        label="Contraseña*"
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        error={error && !data.password.trim()}
                        helperText={
                          error && !data.password.trim()
                            ? "Campo obligatorio"
                            : null
                        }
                      />
                    </Grid>
                    <Grid item>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={remember}
                              onChange={() => setRemember(!remember)}
                            />
                          }
                          label="¿Recordar mis datos?"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item textAlign="center">
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={25} /> : null
                        }
                      >
                        {loading ? "Validando" : "Ingresar"}
                      </Button>
                      <Typography variant="caption" color="GrayText">
                        ¿Aún no tienes una cuenta?{" "}
                        <Link to="/signup">Crea una</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
