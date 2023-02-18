import React, { useState } from 'react'
import {AppBar, Button, Tab, Toolbar, Typography, Tabs} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

//Name of website---->Eunoia (Meaning:- Beautiful Thinking)
const Header = () => {
  const dispatch = useDispatch();
    const [value, setChange] = useState();
    const isLoggedIn = useSelector((state)=>state.isLoggedIn);
    console.log(isLoggedIn);
  return (
    <div>
      <AppBar sx={{background:"#fcbb6d"}} position="sticky">
        <Toolbar>
            <Typography variant="h4">Eunoia-Blogs</Typography>
            {isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto">
                <Tabs textColor="inherit" value={value} onChange={(e, val)=>setChange(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab LinkComponent={Link} to="/my-blogs" label="My Blogs"/>
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1}} color='warning'>Login</Button>}
                {!isLoggedIn && <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1}} color='warning'>Signup</Button>}
                {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout)} LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1}} color='warning'>Logout</Button>}
            </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
