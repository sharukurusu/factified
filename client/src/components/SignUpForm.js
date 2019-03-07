import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
    <Container>
        <Card className="mt-3">
            <Card.Body>
                <Card.Title>Sign Up</Card.Title>
                {errors.message && <p className="text-danger">{errors.message}</p>}
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={onChange} value={user.name} name="name" type="text" placeholder="Enter Username" />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control onChange={onChange} value={user.email} name="email" type="email" placeholder="Enter Email" />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={onChange} value={user.password} name="password" type="password" placeholder="Password" />
                        {errors.password && <p className="text-danger">{errors.password}</p>}

                    </Form.Group>
                    <Button onClick={onSubmit} variant="success" type="submit">
                        Create New Account
                    </Button>
                </Form>
                <Card.Text>Already have an account? <Link to={'/login'}>Login</Link>.</Card.Text>

            </Card.Body>
        </Card>
    </Container>

);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
