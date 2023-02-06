import PageHeader from "../../components/PageHeader/PageHeader";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import Loader from "../../components/Loader/Loader";

import { useState, useEffect } from "react";


import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";



import { Grid } from "semantic-ui-react";


function FeedPage({ loggedUser, handleLogout }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function addLike(postId) {
        try {
            const response = await likesAPI.create(postId);
            console.log(response, " response from likes APi");
            getPosts();
        } catch (err) {
            console.log(err.message, " add like");
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.deleteLike(likeId);
            console.log(response, " response from likes APi");
            
            getPosts();
        } catch (err) {
            console.log(err.message, " remove like");
        }
    }

   
    async function handleAddPost(post) {
        
        try {
            
            setLoading(true);
            const response = await postsAPI.create(post); 

            
            console.log(response, " handle add post");
            setPosts([response.post, ...posts]); 
            setLoading(false);
        } catch (err) {
            console.log(err.message, "error in addPost");
            setError("Error creating post, please try again");
        }
    }

    async function getPosts() {
        try {
            const response = await postsAPI.getAll();
            console.log(response, " data");
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err.message, " this is the error in getPosts");
            setLoading(false);
        }
    }

    useEffect(() => {

        getPosts();
    }, []); 
    if (error) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                <ErrorMessage error={error} />;
            </>
        );
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1800 }}>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <AddRecipeForm handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1600}}>
                    <PostDisplay
                        posts={posts}
                        numPhotosCol={3}
                        isProfile={false}
                        loading={loading}
                        addLike={addLike}
                        removeLike={removeLike}
                        loggedUser={loggedUser}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default FeedPage;
