import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


function MyNavbar(props) {
    // console.log("navbar props", props)
    return (
    <React.Fragment>

        <Navbar collapseOnSelect={true} variant="dark" className="bg-dark fixed-top" expand="lg">
            <Navbar.Brand>F A C T I F I E D</Navbar.Brand>

            {(!props.authenticated) ? ( 
            <React.Fragment>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Link to="/login" className="nav-link btn btn-primary">Login</Link>
                <Link to="/signup" className="nav-link btn btn-primary">Sign Up</Link>
            </Nav>
            </Navbar.Collapse>
            </React.Fragment>)
            : ( 
            <React.Fragment>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/ask" className="nav-link">Ask A Question</Link>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" />
                        <Button variant="outline-success" className="border-success ml-1">Search</Button>
                    </Form> */}
                <Link className="nav-link btn btn-primary" to={'/logout'}>Logout</Link>
                </Nav>
                </Navbar.Collapse>
            </React.Fragment>
            )}

        </Navbar>

    </React.Fragment>
    );
}


export default MyNavbar;