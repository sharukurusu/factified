import React, { Component } from 'react';
import MyNavbar from './components/MyNavbar'
import { Route, Switch} from 'react-router-dom'
import PropsRoute from './components/PropsRoute'
import PrivateRoute from './components/PrivateRoute'
import LoggedOutRoute from './components/LoggedOutRoute'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import AskPage from './pages/AskPage'
import IdeaCard from './components/IdeaCard'
import LogoutFunction from './LogoutFunction'
import Auth from './Auth'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        authenticated: false
        }
    };

    componentDidMount() {
        // check if user is logged in on refresh
        this.toggleAuthenticateStatus()
      }
    
    toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
        this.setState({ authenticated: Auth.isUserAuthenticated() })
    }

    render() {
        return (
            <div>
            <MyNavbar authenticated={this.state.authenticated}></MyNavbar>

            <Switch>
                <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
                <PrivateRoute path="/ask" component={AskPage}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/points/:id" component={IdeaCard}/>
                <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
                <LoggedOutRoute path="/signup" component={SignUpPage}/>
                <Route path="/logout" component={LogoutFunction}/>
                <PropsRoute path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            </Switch>
                
            </div>
        );
    }
}

export default App;
