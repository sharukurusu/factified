import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import Auth from '../Auth'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'

class AskPage extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userId: '',
            text: '',
            createdPoint: {}
        }
    }
    
    componentDidMount(){
        let userId = jwt_decode(Auth.getToken()).sub
        this.setState({userId: userId})
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
    };
    handleSubmit = event => {
        event.preventDefault()
        let pointData = {
            author: jwt_decode(Auth.getToken()).sub,
            text: this.state.text
        }
        axios({
            method: 'post',
            url: "/api/points",
            data: pointData,
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        })
        .then( (result) => {this.setState({
            createdPoint: result.data,
            text:''
            })
        })
    }
  
    render() {
        return(
            <React.Fragment>
                <Container className="mt-4 text-center">
                    <Card>
                        <Form className="bg-dark">
                            <Form.Group controlId="formText">
                                <h2>Post a New Point <span role="img">💡</span></h2>
                                <Form.Control onChange={this.handleInputChange} value={this.state.text} name='text' type="text" placeholder="Make your Point!" />
                                <Form.Text className="text-muted">
                                Points should be something you can agree or disagree with. Yes or No questions should be rephrased as statements.
                                </Form.Text>
                            </Form.Group>
                            <Button onClick={this.handleSubmit} variant="info">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Container>
                
                {this.state.createdPoint.text && 
                <Redirect to={{
                    pathname: `/points/${this.state.createdPoint._id}`,
                    state: this.state.createdPoint
                }}></Redirect>}
            </React.Fragment>
        )
    }
}

export default AskPage;