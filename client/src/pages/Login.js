import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/AuthContext";
const Login = (props) => {
  const initLoginState = { username: "", password: "" };
  const { login: contextLogin } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, values, onSubmit } = useForm(loginUser, initLoginState);

  const [loginCb, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      // this will run after success from api
      contextLogin(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUser() {
    loginCb();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      createdAt
    }
  }
`;
export default Login;
