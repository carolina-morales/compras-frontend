import { useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";

const FormAddArticles = () => {
  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            fullWidth
            size="small"
            name="name"
            value={itemName}
            label="Nombre del artículo*"
            onChange={(e) => setItemName(e.target.value)}
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
