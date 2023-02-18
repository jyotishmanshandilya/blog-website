import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [isSignup, setIsSignup] = useState(false);
  var stateAuth = isSignup ? "Signup" : "Login";
  var changeBtn = isSignup ? "Alreagy have an account" : "Create a new account";
  const handleChange = (e)=>{
    setInputs((prevInput)=>({
      ...prevInput,
      [e.target.name] : e.target.value
    }));
  };

  const sendRequest = async(type="login")=>{
    const res = await axios.post(`http://localhost:5000/api/users/${type}`, {
      name:inputs.name,
      email: inputs.email,
      password: inputs.password,
    })
    .catch((error)=>console.log(error))

    const data = await res.data;
    return data;

  };
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    if(isSignup){
      sendRequest("signup")
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then((data)=>console.log(data));
    }
    else{
      sendRequest()
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then((data)=>console.log(data));
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          display="flex" 
          flexDirection="column"
          alignItems="center" 
          maxWidth="400px" 
          justifyContent="center"
          margin="0 auto"
          marginTop="3rem"
          boxShadow="1px 9px 39px #ccc"
          borderRadius="20px"
          padding="1em"
        >
          <Typography padding={2} textAlign="center" variant="h2">{stateAuth}</Typography>
          {isSignup && <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>}
          <TextField name='email' onChange={handleChange} value={inputs.email} type={"email"} placeholder='Email' margin='normal'/>
          <TextField name='password' onChange={handleChange} value={inputs.password} type={"password"} placeholder='Password' margin='normal'/>
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            >
              Submit
            </Button>
          <Button 
            sx={{ borderRadius: 3, marginTop: 2 }} 
            onClick={()=>setIsSignup(!isSignup)}
          >
            {changeBtn}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;
