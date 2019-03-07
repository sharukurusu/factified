import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
    <React.Fragment>
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    {successMessage && <p className="text-success">{successMessage}</p>}
                    {errors.message && <p className="text-danger">{errors.message}</p>}
                    <Form>
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
                        <Button onClick={onSubmit} className="btn btn-success" variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Card.Text>Don't have an account? <Link to={'/signup'}>Create one</Link>.</Card.Text>

                </Card.Body>
            </Card>
        </Container>
  </React.Fragment>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
