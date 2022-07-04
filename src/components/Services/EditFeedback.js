import React,{useState} from "react";
import { Button,Card, CardBody, CardFooter, Col,Container, Form,Input,InputGroup,Row } from "reactstrap";
import {NavLink, useHistory} from "react-router-dom";

function EditFeedback(){

    const [feedback_id, setFeedbackId] = useState("");
    const [user_id, setUserId] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [text, setText] = useState("");

    const history = useHistory();

    async function editFeedback(e){
        e.preventDefault();
        let res = await fetch("https://localhost:44349/api/Feedback/" + localStorage.getItem("idFeed"), {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
            body: JSON.stringify({Name:name, Text:text}),
        });
        if(res.status==200){
           // history.push('/.OrganizationList');
        }
        else{
            alert("Что-то пошло не так");
        }
    }

    let result = [];
    for(let i = 0; i < JSON.parse(localStorage.getItem("feed")).length; i++ ){
        if(JSON.parse(localStorage.getItem("feed"))[i].feedback_id == localStorage.getItem("idFeed")){
            result.push(JSON.parse(localStorage.getItem("feed"))[i]);
            
        }
    }
    
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={editFeedback}>
                                    <h1>Update Feedback</h1>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="feedback_id" placeholder={result[0].feedback_id}  onChange={(e)=>setFeedbackId(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="user_id" placeholder={result[0].user_id} onChange={(e)=>setUserId(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="name" placeholder={result[0].name} onChange={(e)=>setName(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="date" placeholder={result[0].date} onChange={(e)=>setDate(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="text" placeholder={result[0].text} onChange={(e)=>setText(e.target.value)}/>
                                    </InputGroup>
                                    
                                    <CardFooter className="p-4">
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <Button type="reset" className="btn btn-info mb-1" block><span>Cancel</span></Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
 
}
export default EditFeedback;
