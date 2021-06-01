import React, { Component } from "react";
import { Container, Form, Image, Button, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author/index.jsx";
import CommentList from "../../components/CommentList.jsx";
import "./styles.css";

class Blog extends Component {
  state = {
    blog: {},
    loading: true,
    comments: [],
    comment: {
      user: "",
      text: "",
    },
    update: false,
  };

  getComments = async (id) => {
    try {
      const api = process.env.REACT_APP_BACKEND_API_URL;
      const res = await fetch(api + `/blogPosts/${id}/comments`);
      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      this.setState((state) => {
        return {
          comments: data,
          loading: false,
        };
      });
    } catch (error) {
      console.log("getComments failed", error);
    }
  };

  postComment = async (e) => {
    e.preventDefault();
    const { user, text } = this.state.comment;
    if (user && text) {
      try {
        const { id } = this.props.match.params;
        const api = process.env.REACT_APP_BACKEND_API_URL;
        const res = await fetch(api + `/blogPosts/${id}/comments`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.state.comment),
        });
        if (!res.ok) new Error("something went wrong");
        this.setState((state) => {
          return { update: true };
        });
      } catch (error) {
        console.log("postComments went wrong", error);
      }
    } else {
      alert("please fill the form to send a comment");
    }
  };

  deletePost = async () => {
    const { id } = this.props.match.params;
    try {
      const api = process.env.REACT_APP_BACKEND_API_URL;
      const res = await fetch(api + `/blogPosts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Deletion went wrong");
      this.props.history.push("/");
    } catch (error) {
      console.log("getPosts failed", error);
    }
  };

  getPost = async (id) => {
    try {
      const api = process.env.REACT_APP_BACKEND_API_URL;
      const res = await fetch(api + `/blogPosts/${id}`);
      if (!res.ok) new Error("something went wrong");
      const data = await res.json();
      this.setState((state) => {
        return {
          blog: data,
          loading: false,
        };
      });
      this.getComments(id);
    } catch (error) {
      console.log("getPosts failed", error);
    }
  };

  handleCommentChange = (e) => {
    this.setState((state) => {
      return {
        ...state,
        comment: { ...this.state.comment, [e.target.id]: e.target.value },
      };
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getPost(id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.match.params;
    if (prevState.update !== this.state.update) {
      this.getComments(id);
      this.setState((state) => {
        return { update: false };
      });
    }
  }

  getPDF = async () => {
    const { id } = this.props.match.params;

    const api = process.env.REACT_APP_BACKEND_API_URL;
    fetch(api + `/blogPosts/${id}/PDFDownload`, {
      headers: {
        "Content-Type": "application/json",
        Origin: process.env.REACT_APP_FRONTEND_API_URL,
      },
    })
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = "blog.pdf";
        a.click();
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className='blog-details-root'>
          <Container>
            <Image className='blog-details-cover' src={blog.cover} fluid />
            <Row>
              <Col>
                <h1 className='blog-details-title'>{blog.title}</h1>
              </Col>
              <Col className='d-flex justify-content-end align-items-center '>
                <a className='btn btn-primary' onClick={this.getPDF}>
                  Create PDF
                </a>
                <Button className='btn btn-danger' onClick={this.deletePost}>
                  Delete
                </Button>
              </Col>
            </Row>

            <div className='blog-details-container'>
              <div className='blog-details-author'>
                <BlogAuthor {...blog.author} />
              </div>
              <div className='blog-details-info'>
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

            <div className='mt-4'>
              <hr></hr>
              <CommentList comments={this.state.comments} />
            </div>
            <Form>
              <Form.Group controlId='user'>
                <Form.Label>User</Form.Label>
                <Form.Control
                  type='text'
                  required
                  value={this.state.comment.user}
                  onChange={(e) => this.handleCommentChange(e)}
                />
              </Form.Group>
              <Form.Group controlId='text'>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={2}
                  required
                  value={this.state.comment.text}
                  onChange={(e) => this.handleCommentChange(e)}
                />
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                className='float-right'
                onClick={(e) => this.postComment(e)}>
                Make a Post
              </Button>
            </Form>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
