import React, { Component } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list";

import "./styles.css";
export default class Home extends Component {
  state = {
    posts: [],
    url: process.env.REACT_APP_BACKEND_API_URL + "/blogPosts",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getData(this.state.url + this.props.location.search);
    }
  }

  getData = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      this.setState((state) => {
        return {
          posts: data,
        };
      });
    } catch (error) {
      console.log("getData failed");
    }
  };

  componentDidMount() {
    this.getData(this.state.url);
  }

  render() {
    return (
      <Container fluid='sm'>
        <h1 className='blog-main-title'>Welcome to the Strive Blog!</h1>
        <BlogList posts={this.state.posts} />
      </Container>
    );
  }
}
