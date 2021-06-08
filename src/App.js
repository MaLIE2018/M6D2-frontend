import React, {  useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import {Link, Route, withRouter } from "react-router-dom";
import SignUp from "./views/SignUp/SignUp";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import GoSignUp from "./components/GoSignUp";


// const Router =
//   process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;


function App(props) {
  const [query, setQuery] = useState("")
  const [logged, setLogging] = useState(false)
  const [userId, setUserId] = useState(localStorage.getItem("authorId"))

  useEffect(() => {
    const authorId  = localStorage.getItem("authorId")
     if(authorId) {
        setLogging(true)
        setUserId(authorId)
     }
  }, [userId, props.location.pathname])

  const handleChange = (query) => {
    setQuery(query)
  }

  return (
    <>
        <NavBar onChangeHandle={handleChange} query={query} isLogged ={logged}/>
        <Route path={["/signUp"]} exact render={(state) =><SignUp/>} />
        {logged?(<><Route path="/blogPosts" component={Home}/>
        <Route path="/" exact component={Home} />
        <Route path="/blog/:id" exact component={Blog} />
        <Route path="/new" exact component={NewBlogPost} /></>): <GoSignUp/>}
        <Footer />
    </>
  );
}

export default withRouter(App);
