import React from 'react';
import { Link } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';


function PointLink(props) {
    console.log(props.pointObject)
    const getPercent = function(voteTotals) {
        const {positive, negative} = voteTotals
        const percent = ((positive.length / (positive.length + negative.length)) * 100)

        return (percent.toFixed())
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="card text-center">
                    <h2>{props.pointObject.text}</h2>            
                    <div>AVERAGE: {getPercent(props.pointObject.vote)}% Agree</div>
                    <ProgressBar striped variant="success" now={getPercent(props.pointObject.vote)} key={props.id}/>
                    <Link to={`/points/${props.pointObject._id}`} className="btn btn-primary btn-sm">View Arguments</Link>
                </div>
            </div>

        </React.Fragment>
    )
}

export default PointLink;
