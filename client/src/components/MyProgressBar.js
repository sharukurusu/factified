import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const MyProgressBar = (props) => {
    // console.log("MyProgressBar props:", props)
    return (
        <React.Fragment>
        {props.underlyingSupport && 
            <ProgressBar>
                <ProgressBar striped variant="success" now={props.underlyingSupport} key={props.id}/>
                {/* <ProgressBar variant="danger" now={props.percents.disagree} key={props.id}/> */}
            </ProgressBar>
        }
        {props.relevance &&        
            <ProgressBar striped variant="info" now={props.relevance} key={props.id}/>
        }
        </React.Fragment>
    )
}

export default MyProgressBar;
