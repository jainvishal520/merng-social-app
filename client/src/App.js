import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import AuthContextProvider from "./context/AuthContext";
import AuthRoute from "./utils/authRoute";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
