import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import styled from "styled-components";

const Styles = styled.div`
  margin-top: 132px;
`;

const SignUp = (props) => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    avatar: "",
  });
  const { avatar, setAvatarFormData } = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("id"));
  });

  const postUser = async (e) => {
    e.preventDefault();
    try {
      const api = process.env.REACT_APP_BACKEND_API_URL;
      let res = await fetch(api + "/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Creation of user failed");
      const data = await res.json();
      localStorage.setItem("authorId", data._id);
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append(e.target.id, e.currentTarget.files[0]);
    setAvatarFormData(formData);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <Styles>
      <Container fluid='sm'>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={(e) => handleInputChange(e)}
                  value={user.email}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Your Name'
                  onChange={(e) => handleInputChange(e)}
                  value={user.name}
                />
              </Form.Group>
              <Form.Group controlId='surname'>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Your Surname'
                  onChange={(e) => handleInputChange(e)}
                  value={user.surname}
                />
              </Form.Group>
              <Form.Group controlId='dateOfBirth'>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Date of Birth'
                  onChange={(e) => handleInputChange(e)}
                  value={user.dateOfBirth}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <Form.File
                  id='authorAvatar'
                  label='Upload an author avatar'
                  onChange={(e) => handleFileChange(e)}
                  accept='image/*'
                />
              </Form.Group>
              <Form.Group controlId='avatar'>
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Avatar'
                  onChange={(e) => handleInputChange(e)}
                  value={user.avatar}
                />
              </Form.Group>
              <Button
                variant='primary'
                className='mt-2'
                type='submit'
                onClick={(e) => postUser(e)}>
                SignUp
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default withRouter(SignUp);
