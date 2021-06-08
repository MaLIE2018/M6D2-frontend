import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import isEmail from "validator/lib/isEmail";

export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "",
        content: "",
        category: "",
        author: localStorage.getItem("authorId"),
        cover: "",
        readTime: { value: 2, unit: "minute" },
      },
      blogPostCover: undefined,
    };
  }

  handleChange = (e) => {
    if (e.target) {
      this.setState((state) => {
        return {
          post: { ...this.state.post, [e.target.id]: e.target.value },
        };
      });
    } else {
      this.setState((state) => {
        return {
          post: { ...this.state.post, ["content"]: e },
        };
      });
    }
  };
  handleReadTime = (e) => {
    this.setState((state) => {
      return {
        post: {
          ...this.state.post,
          readTime: {
            ...this.state.post.readTime,
            [e.target.id]: e.target.value,
          },
        },
      };
    });
  };

  fileUpload = async (id) => {
    const api = process.env.REACT_APP_BACKEND_API_URL;
    try {
      let res = await fetch(api + `/blogPosts/${id}/uploadCover`, {
        method: "POST",
        body: this.state.blogPostCover,
      });
      if (!res.ok) {
        throw new Error("fileupload got an error!");
      } else {
        let data = await res.json();
        console.log("Fileuploaded created", data);
      }
    } catch (error) {
      console.log("fileupload failed", error);
    }
  };

  sendEmail = async (id) => {
    try {
      const api = process.env.REACT_APP_BACKEND_API_URL;
      let res = await fetch(api + `/blogPosts/${id}/email`);
      if (!res.ok) {
        throw new Error("Email sending got an error!");
      } else {
        console.log("Check your emails");
      }
    } catch (error) {}
  };

  handleSubmit(e) {
    e.preventDefault();
    this.postBlogPost();
  }

  handleFileChange = (e) => {
    const formData = new FormData();
    formData.append(e.target.id, e.currentTarget.files[0]);
    this.setState((state) => {
      return { ...state, blogPostCover: formData };
    });
  };

  postBlogPost = async () => {
    try {
      const api = process.env.REACT_APP_BACKEND_API_URL;
      let res = await fetch(api + "/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.post),
      });
      if (res.ok) {
        console.log("BlogPost created");
        let data = await res.json();
        if (this.state.blogPostCover) {
          await this.fileUpload(data._id);
        }
        await this.sendEmail(data._id);
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container className='new-blog-container'>
        <Form className='mt-5'>
          <Form.Group controlId='title' className='mt-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              size='lg'
              required
              placeholder='Title'
              value={this.state.post.title}
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId='category' className='mt-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              size='lg'
              required
              as='select'
              value={this.state.post.category}
              onChange={(e) => this.handleChange(e)}>
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cover</Form.Label>
            <Form.File
              id='blogPostCover'
              label='Upload an Post cover'
              accept='image/*'
              onChange={(e) => this.handleFileChange(e)}
            />
          </Form.Group>
          <Form.Group controlId='value' className='mt-3'>
            <Form.Label>Readtime in Minutes</Form.Label>
            <Form.Control
              size='sm'
              type='number'
              required
              placeholder='Read time in Minutes'
              value={this.state.post.readTime.value}
              onChange={(e) => this.handleReadTime(e)}
            />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              id='content'
              value={this.state.post.content}
              required
              onChange={(e) => this.handleChange(e)}
              className='new-blog-content'
            />
          </Form.Group>
          <Form.Group className='d-flex mt-3 justify-content-end'>
            <Button type='reset' size='lg' variant='outline-dark'>
              Reset
            </Button>
            <Button
              type='submit'
              size='lg'
              variant='dark'
              style={{ marginLeft: "1em" }}
              onClick={(e) => this.handleSubmit(e)}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
