import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import {
  Grow,
  Grid,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Paginate from "../Pagination/Paginate";
import ChipInput from "material-ui-chip-input";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import {RESET,RESETUP} from "../../constantes/actionTypes";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const classes = useStyles();


  
  useEffect(() => {
    dispatch({ type:RESET });
    dispatch({ type:RESETUP });
    
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
    console.log(tags);
  };

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  console.log(currentId);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} page={page} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="search Posts"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                variant="outlined"
                label="search Tags "
              />

              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>

            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              page={page}
            />
            <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
