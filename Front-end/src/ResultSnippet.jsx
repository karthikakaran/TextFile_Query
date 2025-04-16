import React from 'react'
import Card from 'react-bootstrap/Card';

const ResultSnippet = (props) => {
  return (
    <div className="content">
        <Card>
            <Card.Body>
                <Card.Text>
                {props.resultSnippet}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ResultSnippet