import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { creatUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/authContext";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await creatUser(email, password);
      token.authenticate(authCtx);
    } catch (error) {
      console.log(JSON.stringify(error));
      
      Alert.alert("Signup failed","Could not create a new user, Please check user information.")

    }
    setIsAuthenticating(false);
  }
  if (!isAuthenticating) {
    <LoadingOverlay message="Creating User" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
