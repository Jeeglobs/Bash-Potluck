import { useState } from "react"
import axios from "axios"
import { Typography, Button, Input } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function SignUp({setToken}) {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignup = (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      url: 'https://potluck.herokuapp.com/accounts/registration/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: email,
        password1: password1,
        password2: password2,
        email: email,
        first_name: firstName,
        last_name: lastName,
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      handleLogin()

    }).catch((error) => {
      console.error(error);
      setError(error.response.data);

    });
  }

  const handleLogin = () => {

    const options = {
      method: 'POST',
      url: 'https://potluck.herokuapp.com/accounts/login/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: email,
        password: password1,
      }
    };

    axios.request(options).then((response) => {
      setToken('Token ' + response.data.key);

      //this code sends you to the page the user was redirected from visa-cis the ProtectedRoute component if it is stored in the location context
      const origin = location.state?.from?.pathname || '/'
      navigate(origin)
    }).catch((error) => {
      console.error(error);
      setError(error.response.data)
    }); 
  }


  return (<>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Typography variant = 'h4' color="blue-gray">Sign up for an account</Typography>
        <form onSubmit={(e) => handleSignup(e)}>
          <div className="mt-8 mb-4 w-80">
            <div className="flex flex-col gap-6">
              <div>
                <Input required value={email} onChange={(e) => setEmail(e.target.value)} label="Email" size="lg" />
                {error.email && <Typography variant='small' color="red">{error.email[0]}</Typography>}
              </div>
              <div>
                <Input required value={password1} onChange={(e) => setPassword1(e.target.value)} label="Password" size="lg" type="password" />
                {error.non_field_errors && <Typography variant='small' color="red">{error.non_field_errors}</Typography>}
              </div>
              <div>
                <Input required value={password2} onChange={(e) => setPassword2(e.target.value)} label="Retype Password" size="lg" type="password" />
              </div>
             <div>
                <Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" size="lg" type="text" />
              </div>
              <div>
                <Input required value={lastName} onChange={(e) => setLastName(e.target.value)} label="First Name" size="lg" type="text" />
              </div>
            <Button type="submit" className="" fullWidth>Sign-up</Button>
            </div>
          </div>
          <Typography variant = "small">Already have an account? <Link to="/login" className=" font-bold text-blue-800">Login</Link></Typography>
        </form>
      </div>
    </>)
}