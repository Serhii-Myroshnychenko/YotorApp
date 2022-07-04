import React, {useEffect, useState} from "react";
import {Card,CardBody,CardHeader, Col, Row, Table} from 'reactstrap';
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";





function FeedbackList(){

   const history = useHistory();
   const {t} = useTranslation();
   async function deleteFeedback(id){

    let res = await fetch("https://localhost:44349/api/Feedbacks/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        if(res.status==200){
            alert(t("alert.successfully"))
        }
        else{
            alert(t("alert.check"))
        }
   }
   const editFeedback = (id)=>{
       localStorage.setItem("idFeed",id);
       
       history.push({
           pathname : './EditFeedback'
       })   

   }
    function callTwoFunctions(id){
         deleteFeedback(id);
         getFeedbacks();
    }
    async function getFeedbacks(){
       
        let res = await fetch("https://localhost:44349/api/Feedbacks", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        res = await res.json();
        localStorage.setItem("feed", JSON.stringify(res));
    } 
    getFeedbacks();
    return (
        
        <div className="animated fadeIn">
            
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> {t("panel.feedback")}
                        </CardHeader>
                        <CardBody>
                            <Table  striped size ="sm">
                                <thead>
                                    <tr>
                                        <th>feedbackId</th>
                                        <th>userId</th>
                                        <th>name</th>
                                        <th>date</th>
                                        <th>text</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        JSON.parse(localStorage.getItem("feed")).map((item,idx)=>{
                                            return <tr key={idx}>
                                                <td>{item.feedbackId}</td>
                                                <td>{item.userId}</td>
                                                <td>{item.name}</td>
                                                <td>{item.date}</td>
                                                <td>{item.text}</td>
                                                
                                                <td>
                                                    <row>
                                                    <button className="btn btn-warning" onClick={()=>callTwoFunctions(item.feedbackId)}>{t("panel.delete")}</button>
                                                    </row>
                                                </td>

                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default FeedbackList;


