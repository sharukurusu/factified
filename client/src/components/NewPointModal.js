import React from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class NewPointModal extends React.Component {
    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)

    
        this.state = {
            show: false,
        }
    }

    

    handleClose() {
        this.setState({ show: false });
    }
  
    handleShow() {
        this.setState({ show: true });
    }

    render() {
        // var handleInputChange = this.props.handleInputChange
        // var handleSubmit = this.props.handleSubmit

      return (
        <React.Fragment>
        <Button id="makePointButton" onClick={this.handleShow} variant="info" size="lg" style={{display: 'flex'}}>
        <span role="img" aria-labelledby="makePointButton">💡</span> Make A Point
        </Button> 
  
          <Modal show={this.state.show} onHide={this.handleClose}>
          
            <Modal.Header closeButton>
              <Modal.Title>{this.props.relationship} with Main Point <span role="img">💡</span></Modal.Title>
            </Modal.Header>
            <Modal.Body><React.Fragment>
                <Form>
                    <Form.Group controlId="formText">
                        <Form.Control onChange={this.props.handleInputChange} value={this.props.text} name='text' type="text" placeholder="Make your Point!" />
                        <Form.Text className="text-muted">
                        Points should be something you can agree or disagree with. Yes or No questions should be rephrased as statements.
                        </Form.Text>
                    </Form.Group>
                </Form>
                
            </React.Fragment></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button onClick={this.props.handleSubmit} variant="info">
                    Submit
                </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    }
}
  
  
  export default NewPointModal;
  