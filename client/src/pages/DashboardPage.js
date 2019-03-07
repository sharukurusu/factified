import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import Auth from '../Auth'
import {Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import PointLink from '../components/PointLink';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            pointArray: []
        }
    }
    
  componentDidMount(){
    let userId = jwt_decode(Auth.getToken()).sub
    this.setState({userId: userId})

        axios({
            method: 'post',
            url: '/api/search/mypoints',
            data: {user: userId},
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

  render() {
    return (
        
        <React.Fragment>
            {/* {this.props.location.state.text && */}
            <React.Fragment>
            {Auth.isUserAuthenticated() ? (
                <Container>
                    <h1 className="text-center text-white mt-4">Points I've Made</h1>
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

export default DashboardPage;
