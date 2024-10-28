import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./Auth/Login";
import Home from "./Home";

const Main = () => {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const setflag = (flag) => {
    setIsAuthentication(flag);
  };

  return isAuthentication ? (
    <Home setflag={setflag} />
  ) : (
    <Login setflag={setflag} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Main;
