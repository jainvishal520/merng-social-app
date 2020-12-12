import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/AuthContext";
import PostForm from "../components/PostForm";

// import PostCard from "../components/PostCard";
const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading posts ...</h1>
        ) : (
          data &&
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
