import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoSearchCircleOutline } from "react-icons/io5";

const QueryAutocomplete = (props) => {
    const [queryHistory, setQueryHistory] = useState([])
    const [currentQuery, setCurrentQuery] = useState("")
    const [querySuggestions, setQuerySuggestions] = useState([])
  
    const queryToAPI = () => {
        fetch(`http://localhost:8080/query?fileName=${props.fileName}&queryText=${currentQuery}`, { method : "GET" })
        .then((response) => { return response.text() })
        .then((data) => props.resultSnippetSetter(data))
        .catch((err) => {props.resultSnippetSetter("Error in querying !" + err)});
    }

    const updateQueryHistory = (queryText) =>  {
      if(queryText) {
        if (queryHistory.length >= 5) queryHistory.pop();
        setQueryHistory([queryText, ...queryHistory]);
        setQuerySuggestions([]);
        setCurrentQuery("");
        queryToAPI();
      }
    }

    const handleInputChange = (queryText) => {
        setQuerySuggestions(queryHistory);
        setCurrentQuery(queryText);
    };

    return (
        <div className="query">
            <h6>Query document</h6>
            <Form>
                <Row className="align-items-center">
                    <Col xs={10}>
                        <Form.Group>
                            <Form.Control type="text" autoComplete="off" placeholder="Enter query" tabIndex="0" 
                                                    value={currentQuery}                                                     
                                                    onChange={e => handleInputChange(e.target.value)}
                            />
                            <ListGroup>
                            {
                                querySuggestions.length > 0 &&
                                querySuggestions.map((result) => (
                                <ListGroup.Item
                                    key={result}
                                    onClick={() => handleInputChange(result)}>                                
                                    {result}
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Form.Group>
                    </Col>
                    <Col xs={2}>                 
                        <IoSearchCircleOutline role="button" tabIndex="0" size="2rem" 
                                                onClick={e => updateQueryHistory(currentQuery)}/>
                    </Col>
                </Row>
            </Form>
        </div>
      )
}

export default QueryAutocomplete