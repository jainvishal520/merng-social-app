// will export a jsx element
import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
// creating link to graphql endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

// This is kind of interceptor .. before sending it to server it will intercept and can do stuff
// here .. like adding authorization header with each req
const authLink = setContext(() => {
  const user = localStorage.getItem("user");
  let token = "";
  if (user) {
    token = JSON.parse(user).token;
  }
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// creating apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
