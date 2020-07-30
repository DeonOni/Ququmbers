import React, { Component } from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        
        return(
            <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="mr-auto">
                            <Nav.Link href="/" >About</Nav.Link>
                            <Nav.Link href="/" >Contacts</Nav.Link>
                        </Nav>
                        <Form inline>
                            <button type="button" className="btn btn-primary">Sign up/in?</button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        )
    }
}