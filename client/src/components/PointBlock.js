import React from 'react';
// import axios from 'axios'
// import Auth from '../Auth'
import { Link } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const PointBlock = (props) => {

    const getPercent = function(voteTotals) {
        const {positive, negative} = voteTotals
        const percent = ((positive.length / (positive.length + negative.length)) * 100)

        return (percent.toFixed())
    }

    return (
        <React.Fragment>
        {props.pointObject.text &&
        <div className="pointBlock" id={props.main && "pointBlockMain"}>
            {props.main && 
            <h2 className="text-center text-white">MAIN POINT</h2>
            }
            <div className="pointBlockText">
                {(!props.main && (props.pointObject.relationToParent === 'agree')) && 
                <span role="img" aria-label="positives check mark">✅</span>
                }
                {(!props.main && !(props.pointObject.relationToParent === 'agree')) && 
                <span role="img" aria-label="negatives x mark">❌</span>
                }
                <p className="text-center">{props.pointObject.text}</p>
            </div>

        <div className="pointBlockStats">
            <div>
            <div>AVERAGE: {getPercent(props.pointObject.vote)}% Agree</div>
            <ButtonGroup  aria-label="Vote Buttons">
                <Button onClick={() => props.performVote(props, "upvote")} name="upvote" value={props.pointObject} variant="success" size="sm">(+) Agree</Button>
                <Button onClick={() => props.performVote(props, "downvote")} name="downvote" variant="danger" size="sm">(-) Disagree</Button>
                {(props.main && props.pointObject.parent) &&                 
                <Link to={`/points/${props.pointObject.parent}`} className="btn btn-primary btn-sm">Return to Parent Argument</Link>
                }
            </ButtonGroup>
            </div>
           
            {!props.main && 
            <div>
            <div className="text-center">RELEVANT? {getPercent(props.pointObject.relevance)}% Agree</div>
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Relevant to the Main Point?" size="sm" id="bg-nested-dropdown">
                    <Dropdown.Item onClick={() => props.performVote(props, "relevant")} eventKey="1" as="button" variant="info" size="sm">Yes</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.performVote(props, "irrelevant")} eventKey="2" as="button" variant="warning" size="sm">No</Dropdown.Item>
                </DropdownButton>
                <Link to={`/points/${props.pointObject._id}`} className="btn btn-primary btn-sm">View Arguments</Link>
            </ButtonGroup>
            </div>
            }

        </div>
    </div>
    }
    </React.Fragment>
    )
}

export default PointBlock;