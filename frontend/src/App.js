import Header from "./components/Header";
import React from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs"; 
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";

import {Routes, Route} from 'react-router-dom';
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blogs/add" element={<AddBlog/>}/>
          <Route path="/my-blogs" element={<UserBlog/>}/>
          <Route path="/my-blogs/:id" element={<BlogDetail/>}/>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
