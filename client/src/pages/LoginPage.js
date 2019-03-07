import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../Auth';
import LoginForm from '../components/LoginForm';
// import jwt_decode from 'jwt-decode';

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });
        // var token = xhr.response.token;

        // var decoded = jwt_decode(token);
        // console.log(decoded);
        // console.log("Loginpage xhr.response", xhr.response)
        // save the token
        Auth.authenticateUser(xhr.response.token);

        // update authenticated state
        this.props.toggleAuthenticateStatus()

        // redirect signed in user to dashboard
        this.props.history.push('/');
      } else {
        // failure

        // change the component state
        // const errors = xhr.response.errors ? xhr.response.errors : {};
        // errors.summary = xhr.response.message;
        console.log(xhr.response.errors)
        const errors = xhr.response.errors
        errors.summary = "Test Error Summary"


        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
        <React.Fragment>
    <div className="jumbotron text-center">
    <h1>F A C T I F I E D</h1>
    <p>Get to the bottom of any argument...</p>
    </div>

      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
      </React.Fragment>
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
