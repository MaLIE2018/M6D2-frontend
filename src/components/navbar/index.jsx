import React, { Component } from "react";
import { Container, Navbar, Button, FormControl, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
class NavBar extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      if (this.props.query.length === 0) {
        this.props.history.push(`/`);
      } else {
        this.props.history.push(`/blogPosts?title=${this.props.query}`);
      }
    }
  }

  render() {
    return (
      <Navbar expand='lg' className='blog-navbar' fixed='top'>
        <Container className='justify-content-between'>
          <Navbar.Brand as={Link} to='/'>
            <img className='blog-navbar-brand' alt='logo' src={logo} />
          </Navbar.Brand>
          {this.props.isLogged ? (
            <>
              <Form inline>
                <FormControl
                  type='text'
                  placeholder='Search'
                  className='mr-sm-2'
                  onChange={(e) => this.props.onChangeHandle(e.target.value)}
                  value={this.props.query}
                />
              </Form>
              <Button
                as={Link}
                to='/new'
                className='blog-navbar-add-button bg-dark'
                size='lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-plus-lg'
                  viewBox='0 0 16 16'>
                  <path d='M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z' />
                </svg>
                Post Article
              </Button>
            </>
          ) : null}
        </Container>
      </Navbar>
    );
  }
}
export default withRouter(NavBar);
