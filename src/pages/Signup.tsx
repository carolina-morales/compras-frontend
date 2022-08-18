import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LocalMall } from "@mui/icons-material";
import Layout from "../components/atoms/Layout";
import { create } from "../services/user";
import { IUser } from "../utils/interfaces";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IUser>({
    username: "",
    password: "",
    name: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    photo: "",
  });

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setError(false);
      if (!data.username.trim() || !data.password.trim()) setError(true);

      setLoading(true);
      await create(data);

      toast.success("Cuenta creada");

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Usuario no encontrado");
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
                  Crear cuenta
                </Typography>
                <Typography color="GrayText">
                  Ingresa tus datos para tener acceso y comenzar a registrar tu
                  lista de compras.
                </Typography>
              </Grid>

              <Grid item>
                <form onSubmit={handleSumbit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        name="name"
                        value={data.name}
                        label="Nombre*"
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        error={error && !data.name.trim()}
                        helperText={
                          error && !data.name.trim()
                            ? "Campo obligatorio"
                            : null
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        name="lastName"
                        value={data.lastName}
                        label="Apellidos*"
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                        error={error && !data.lastName.trim()}
                        helperText={
                          error && !data.lastName.trim()
                            ? "Campo obligatorio"
                            : null
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        size="small"
                        name="email"
                        value={data.email}
                        label="Correo eléctronico*"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        error={error && !data.email.trim()}
                        helperText={
                          error && !data.email.trim()
                            ? "Campo obligatorio"
                            : null
                        }
                      />
                    </Grid>
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
                        type="password"
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
                        {loading ? "Validando" : "Crear cuenta"}
                      </Button>
                      <Typography variant="caption" color="GrayText">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login">Inicia sesión</Link>
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
