import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { AuthContext } from "../store/authContext";

function LoginScreen() {
  const navigation = useNavigation()
  const [isAuthenticating, setIsAuthenticating] = useState(false);
const authCtx = useContext(AuthContext)

  async function signInHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      
      const token = await login(email, password);
      authCtx.authenticate(token)
      setIsAuthenticating(false);
      navigation.navigate("Welcome")
    } catch (error) {
      Alert.alert("Authentication failed","Could not log you in , Please check credentials.")
    }
  }
  if (isAuthenticating) {
   return <LoadingOverlay message="Logging you in" />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler}/>;
}

export default LoginScreen;
