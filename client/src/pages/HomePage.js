import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import Auth from '../Auth'
import {Redirect, Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import PointLink from '../components/PointLink';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            pointArray: []
        }
    }
    
  componentDidMount(){
    this.props.toggleAuthenticateStatus()

    // console.log("ideacard props:", this.props)
    if (Auth.getToken()) {
        // console.log("Auth.getToken() in homepge", Auth.getToken())
        let userId = jwt_decode(Auth.getToken())
        this.setState({userId: userId})

        // console.log(`IdeaCard: axios post to /api/points/${this.props.match.params.id}`)
        axios({
            method: 'get',
            url: '/api/points/',
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        })
        .then( (result) => {
            if (!result.data) {
                return
            }
            this.setState({
            pointArray: result.data
            })
        })
    }
}

  render() {
    return (
        
        <React.Fragment>
            {/* {this.props.location.state.text && */}
            <React.Fragment>
            {Auth.isUserAuthenticated() ? (
                <Container className="text-center">
                    <Link to="/ask" className="btn btn-info btn-lg">
                    <span role="img" aria-labelledby="makePointButton">💡</span> Make A Point
                    </Link>

                    <h1 className="text-center text-white mt-4">Points Being Voted On</h1>
                    {this.state.pointArray.map((point) => (
                            <PointLink
                            key={point._id}
                            pointObject={point}/>
                        ))}
                </Container>
            ) : (<Redirect to="/login"/>)
            }
           </React.Fragment>
            {/* } */}
         </React.Fragment>
    )
  }
};

export default HomePage;
