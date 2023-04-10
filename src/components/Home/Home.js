import React from "react";
import {
    Container,
    AppBar,
    Typography,
    Grow,
    Grid,
    Paper,
    TextField,
    Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import ChipInput from "material-ui-chip-input";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useStyle from "./styles";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../pagination";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyle();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    
    const searchPost = () => {
        if (search.trim() || tags) {
            //dispatch ---> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(
                `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
            );
        } else {
            navigate("/");
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //search posts
        }
    };

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid
                        container
                        className={classes.gridContainer}
                        justify="space-between"
                        alignItems="stretch"
                        spacing={3}>
                        <Grid item xs={12} sm={7} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar
                                className={classes.appBarSearch}
                                position="static"
                                color="inherit">
                                <TextField
                                    name="serach"
                                    variant="outlined"
                                    label="Search Memories"
                                    fullWidth
                                    value={search}
                                    onKeyPress={handleKeyPress}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <ChipInput
                                    style={{ margin: "10px 0" }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button
                                    className={classes.searchButton}
                                    color="primary"
                                    variant="contained"
                                    onClick={searchPost}>
                                    Search
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {( !searchQuery && !tags.length ) && (
                                <Paper elevation={6} className={classes.pagination}>
                                    <Pagination page={page}/>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    );
};

export default Home;
