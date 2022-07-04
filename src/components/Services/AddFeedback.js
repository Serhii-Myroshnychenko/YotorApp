import React,{useState} from "react";
import { Button,Card, CardBody, CardFooter, Col,Container, Form,Input,InputGroup,Row } from "reactstrap";
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";


function AddFeedback(){


    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const {t} = useTranslation();
    const history = useHistory();
    

    async function createFeedback(e) {
        e.preventDefault();
        let res = await fetch("https://localhost:44349/api/Feedbacks", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
            body: JSON.stringify({name:name, text:text}),
        });
        console.log(res);
        console.log(res.status);
        if(res.status===200){
            alert(t("alert.successfully"));
            history.push('/.FeedbackList');
        }
        else{
            alert(t("alert.check"))
        }   
    }
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={createFeedback}>
                                    <h1>{t("panel.create")}</h1>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="name" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="text" placeholder="text" onChange={(e)=>setText(e.target.value)}/>
                                    </InputGroup>
                                    <CardFooter className="p-4">
                                        <Row>
                                            <Col xs="12" sm="6">
                                                <Button type="submit" className="btn btn-info mb-1" block><span>{t("panel.save")}</span></Button>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <Button  type="reset" className="btn btn-info mb-1" block><span>{t("panel.cancel")}</span></Button>
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
export default AddFeedback;
