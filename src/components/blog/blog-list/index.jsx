import React, { Component } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import BlogItem from "../blog-item";
// import posts from "../../../data/posts.json";
export default class BlogList extends Component {
  render() {
    let posts = this.props.posts;
    return (
      <Row>
        {posts.length !== 0 ? (
          posts.map((post) => (
            <Col md={4} style={{ marginBottom: 50 }} key={post._id}>
              <BlogItem {...post} />
            </Col>
          ))
        ) : (
          <Spinner animation='grow' />
        )}
      </Row>
    );
  }
}
