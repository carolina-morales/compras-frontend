import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useState } from "react";
import { updateProfile } from "../../services/user";
import { getUserByToken } from "../../utils/functions";
import { IUser } from "../../utils/interfaces";
import { regexEmail } from "../../utils/constants";

interface EditProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfileProps> = ({ setOpen }) => {
  const user = getUserByToken();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IUser>(user.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setError(false);
      if (!data.email.trim() && regexEmail.test(data.email)) setError(true);

      const resp = await updateProfile(user.user._id, data);
      if (resp) return toast.success("Datos actualizados");
      return toast.error("No se pudo actualizar la información.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog maxWidth="md" open={true} onClose={(e) => setOpen(false)}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="address"
                value={data?.address}
                label="Dirección"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="city"
                value={data?.city}
                label="Ciudad"
                onChange={(e) => setData({ ...data, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="country"
                value={data?.country}
                label="País"
                onChange={(e) => setData({ ...data, country: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="phone"
                value={data?.phone}
                label="Teléfono"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                name="email"
                value={data?.email}
                label="Email*"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                error={error && !data.email.trim()}
                helperText={
                  error && !data.email.trim() ? "Campo obligatorio" : null
                }
              />
            </Grid>
            <Grid item textAlign="center" xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={25} /> : null}
              >
                {loading ? "Actualizando" : "Actualizar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
