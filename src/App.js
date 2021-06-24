import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import firebase from "./Firestore";

export const AuthContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setCurrentUser(user));
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      <Router>
        <Route exact path="/">
          {currentUser ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard">
          {currentUser ? <DashboardPage /> : <Redirect to="/login" />}
        </Route>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
