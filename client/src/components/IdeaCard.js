import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import Auth from '../Auth'
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import PointBlock from './PointBlock';
import NewPointModal from './NewPointModal'

class IdeaCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mainPointObject: {},
            // show: false,
            text: '',
            relationship: 'Agree'
        }
    }

    componentDidMount(){
        console.log("ideacard props:", this.props)
        let userId = jwt_decode(Auth.getToken()).sub
        this.setState({userId: userId})

            axios({
                method: 'post',
                url: `/api/points/${this.props.match.params.id}`,
                headers: {
                    Authorization: 'Bearer ' + Auth.getToken()
                }
            })
            .then( (result) => {
                console.log(result.data)
                if (!result.data) {
                    return
                }
                this.setState({
                mainPointObject: result.data
                })
            })
        // }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            console.log("axios update request")
            axios({
                method: 'post',
                url: `/api/points/${this.props.match.params.id}`,
                headers: {
                    Authorization: 'Bearer ' + Auth.getToken()
                }
            })
            .then( (result) => {
                if (!result.data) {
                    return
                }
                this.setState({
                mainPointObject: result.data
                })
            })
        }
    }
    tabChange = eventKey => {
        console.log('tabChange', eventKey)
        if (eventKey === 'agree') {
            this.setState({relationship: 'agree'})
        } else if (eventKey === 'disagree') {
            this.setState({relationship: 'disagree'})
        }
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
    };
    // add a new sub point via NewPointModal
    handleSubmit = event => {
        event.preventDefault()
        console.log("handlesubmit")
        let pointData = {
            author: jwt_decode(Auth.getToken()).sub,
            text: this.state.text,
            parent: this.state.mainPointObject._id,
            relationToParent: this.state.relationship
        }
        axios({
            method: 'post',
            url: `/api/points/${pointData.parent}/subpoint`,
            data: pointData,
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        })
        .then( (result) => {
            console.log("result.data", result.data)
            this.setState({
            text:'',
            show: false,
            mainPointObject: result.data
            })
        })
    }
    performVote = (childProps, voteType) => {
        let pointData = {
            user: jwt_decode(Auth.getToken()).sub,
            main: childProps.main,
            voteType: voteType
        }
        axios({
            method: 'post',
            url: `/api/points/${childProps.pointObject._id}/vote`,
            data: pointData,
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        })
        .then( (result) => {
            console.log("result.data", result.data)
            this.setState({mainPointObject: result.data})
        })
    }

    render() {
     
        return (
            <React.Fragment>
            {/* {!this.state.mainPointObject.text && <Redirect to="/"/>} */}
            {this.state.mainPointObject.text &&
            <Tab.Container onSelect={this.tabChange} defaultActiveKey="agree">
            
            <PointBlock 
                main={true} 
                performVote={this.performVote}
                pointObject={this.state.mainPointObject}></PointBlock>
            <div className="ideaCard">
            
                <Card.Header className="bg-dark">
            
                    {/* {props.mainPoint.underlyingSupport && 
                    <React.Fragment>
                        <h2 className="text-center text-white">UNDERLYING SUPPORT: {props.mainPoint.underlyingSupport}% AGREE</h2>
                        <MyProgressBar underlyingSupport={props.mainPoint.underlyingSupport}/>
                    </React.Fragment>} */}
            
                    <Nav variant="tabs" justify>
                        <Nav.Item>
                        <Nav.Link eventKey="agree">Points That Agree ✅</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="disagree">Points That Disagree ❌</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
            
                <div className="bg-dark ">
                    <Tab.Content>
                    <Tab.Pane eventKey="agree">
                    <NewPointModal 
                        // show={this.state.show}
                        // handleClose={this.handleClose}
                        // handleShow={this.handleShow}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        parent={this.state.mainPointObject._id} 
                        relationship='agree'/>
                        {this.state.mainPointObject.agreeChildren.map((point) => (
                            <PointBlock 
                            performVote={this.performVote}
                            key={point._id} 
                            pointObject={point}/>
                        ))}
                   
                    </Tab.Pane>
                    <Tab.Pane eventKey="disagree">
                    <NewPointModal  
                        show={this.state.show}
                        handleClose={this.handleClose}
                        handleShow={this.handleShow}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        parent={this.state.mainPointObject._id} 
                        relationship='disagree'/>
                    {this.state.mainPointObject.disagreeChildren.map((point) => (
                        <PointBlock 
                        performVote={this.performVote}
                        key={point._id} 
                        pointObject={point}/>                   
                    ))}
            
                    </Tab.Pane>
                    </Tab.Content>
            
                </div>
            
            </div>
            
            </Tab.Container>
            }
            </React.Fragment>
        )
    }
    
} 

export default IdeaCard;