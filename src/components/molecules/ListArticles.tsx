import { Dispatch, SetStateAction } from "react";
import { arrayMoveImmutable } from "array-move";
import { Container, Draggable, DropResult } from "react-smooth-dnd";
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { removeArticle } from "../../services/articles";
import { Delete, DragHandle } from "@mui/icons-material";
import { IArticle } from "../../utils/interfaces";

interface ListArticlesProps {
  reload: () => any;
  articles: IArticle[];
  setArticles: Dispatch<SetStateAction<IArticle[]>>;
}

const ListArticles: React.FC<ListArticlesProps> = ({
  reload,
  articles,
  setArticles,
}) => {
  const onDrop = (event: DropResult) => {
    const { removedIndex, addedIndex } = event;
    setArticles((articles) =>
      arrayMoveImmutable(articles, removedIndex || 0, addedIndex || 0)
    );
  };

  const handleRemoveArticle = async (_id: string) => {
    try {
      if (!window.confirm("¿Quieres eliminar el artículo?")) return;

      await removeArticle(_id);
      reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (articles.length <= 0)
    return <Typography color="error">No hay artículos guardados</Typography>;

  return (
    <List>
      <Container onDrop={onDrop}>
        {articles.map(({ _id, name }) => (
          <Draggable key={_id}>
            <ListItem divider>
              <ListItemText primary={name} />
              <ListItemSecondaryAction>
                <ListItemIcon>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveArticle(_id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton>
                    <DragHandle />
                  </IconButton>
                </ListItemIcon>
              </ListItemSecondaryAction>
            </ListItem>
          </Draggable>
        ))}
      </Container>
    </List>
  );
};

export default ListArticles;
