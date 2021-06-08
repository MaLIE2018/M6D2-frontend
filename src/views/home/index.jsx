import React, { Component } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list";

import "./styles.css";
export default class Home extends Component {
  state = {
    posts: [],
    url: process.env.REACT_APP_BACKEND_API_URL + "/blogPosts",
    total: "",
    offset: 2,
    limit: 2,
    active: 0,
    pages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getData(this.state.url + this.props.location.search);
    }
  }

  getData = async (url) => {
    try {
      const res = await fetch(`${url}?limit=${this.state.limit}`);
      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      this.setState((state) => {
        return {
          posts: data.posts,
          pages: data.pages,
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
    // let active = 2;
    // let items = [];
    // for (let number = 1; number <= this.state.total / 2; number++) {
    //   items.push(
    //     <Pagination.Item key={number} active={number === active}>
    //       {number}
    //     </Pagination.Item>
    //   );
    // }

    const { pages } = this.state;

    return (
      <Container fluid='sm'>
        <h1 className='blog-main-title'>Welcome to the Strive Blog!</h1>
        <BlogList posts={this.state.posts} />
        <Row>
          <Col className='d-flex justify-content-center'>
            <Pagination>
              {Array.from({ length: pages }).map((v, i) => (
                <Pagination.Item
                  onClick={async () => {
                    const res = await fetch(
                      `http://localhost:3001/blogposts?limit=2&offset=${i * 2}`
                    );
                    const data = await res.json();
                    this.setState((state) => {
                      return {
                        posts: data.posts,
                      };
                    });
                  }}
                  key={i}>
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}
