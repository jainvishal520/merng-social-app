import gql from "graphql-tag";
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      # createdAt
      # username
      comments {
        id
        body
        createdAt
        username
      }
      likes {
        username
      }
      likeCount
      commentCount
    }
  }
`;
