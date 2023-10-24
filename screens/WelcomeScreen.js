import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { useContext } from "react";
import { AuthContext } from "../store/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    axios
      .get(
        "https://expense-a6653-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((resp) => {
        setFetchedMessage(resp.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
      <Button onPress={authCtx.logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
