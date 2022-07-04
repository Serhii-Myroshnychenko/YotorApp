import React,{useState} from "react";
import { Button,Card, CardBody, CardFooter, Col,Container, Form,Input,InputGroup,Row } from "reactstrap";
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function EditRestriction(){

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const {t} = useTranslation();

    const history = useHistory();
    async function editRestriction(e){
        e.preventDefault();
        let res = await fetch("https://localhost:44349/api/Restrictions/" + localStorage.getItem("idRest"), {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
            body: JSON.stringify({userId:userId,name:name,description:description}),
        });
        if(res.status==200){
           alert(t("alert.successfully"));
           history.push('/.RestrictionList');
        }
        else{
            alert(t("alert.check"));
        }
    }
    let result = [];
    for(let i = 0; i < JSON.parse(localStorage.getItem("res")).length; i++ ){
        if(JSON.parse(localStorage.getItem("res"))[i].restrictionId == localStorage.getItem("idRest")){
            result.push(JSON.parse(localStorage.getItem("res"))[i]);
            
        }
        
    }
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={editRestriction}>
                                    <h1>Update restriction</h1>
                                    
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="landlordId" placeholder="{result[0].landlordId}" onChange={(e)=>setUserId(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="name" placeholder="{result[0].carName}" onChange={(e)=>setName(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Input type="text" name="description" placeholder="{result[0].description}" onChange={(e)=>setDesciption(e.target.value)}/>
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
export default EditRestriction;
