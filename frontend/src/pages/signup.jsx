import { useState } from "react"
import axios from "axios"

export default function SignUp() {
  const [email, setEmail] = useState(null)
  const [password1, setPassword1] = useState(null)
  const [password2, setPassword2] = useState(null)

  const handleSignup = () => {
    const options = {
      method: 'POST',
      url: 'http://127.0.0.1:8080/dj-rest-auth/registration/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: email,
        password1: password1,
        password2: password2,
        email: email,
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    }); 


  return null
}