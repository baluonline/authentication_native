import axios from "axios";

const API_KEY = "AIzaSyA3CJ-dit9eKbDAWRwE3GGETcjySXEe6ug";

async function authenticate(mode, email, password) {
  const payload = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, payload);
  //   console.log("response " + JSON.stringify(response.data));
  return response.data.idToken;
}

export function creatUser(email, password) {
  return authenticate("signUp", email, password);
}
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
