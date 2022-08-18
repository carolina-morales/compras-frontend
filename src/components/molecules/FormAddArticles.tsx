import { useState } from "react";
import { toast } from "react-toastify";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { saveArticle } from "../../services/articles";
import { getUserByToken } from "../../utils/functions";

interface FormAddArticlesProps {
  reload: () => any;
}

const FormAddArticles: React.FC<FormAddArticlesProps> = ({ reload }) => {
  const user = getUserByToken();
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setError(false);
      if (!itemName.trim()) setError(true);

      setLoading(true);

      const resp = await saveArticle({ name: itemName, user: user._id });
      if (!resp) return toast.error("No fue posible guardar el articulo");

      setItemName("");

      reload();
      return toast.success("Articulo guardado");
    } catch (error) {
      console.error(error);
      toast.error("No fue posible guardar el articulo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            fullWidth
            size="small"
            name="name"
            value={itemName}
            label="Nombre del artículo*"
            onChange={(e) => setItemName(e.target.value)}
            error={error && !itemName.trim()}
            helperText={error && !itemName.trim() ? "Campo obligatorio" : null}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={25} /> : null}
          >
            {loading ? "Agregando" : "Agregar"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormAddArticles;
