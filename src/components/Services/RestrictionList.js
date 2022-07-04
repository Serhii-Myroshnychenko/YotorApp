import React, {useEffect, useState} from "react";
import {Card,CardBody,CardHeader, Col, Row, Table} from 'reactstrap';
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function RestrictionList(){
    
    const history = useHistory();
    const {t} = useTranslation();
   async function deleteRestriction(id){

    let res = await fetch("https://localhost:44349/api/Restrictions/" + id, {
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

   const editRestriction = (id)=>{
       localStorage.setItem("idRest",id);
       history.push({
           pathname : './EditRestriction'
       })   

   }
    function callTwoFunctions(id){
         deleteRestriction(id);
         getRestrictions();
    }
    async function getRestrictions(){
       
        let res = await fetch("https://localhost:44349/api/Restrictions", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        res = await res.json();
        localStorage.setItem("res", JSON.stringify(res));
        
    }
    getRestrictions();
    return (
        
        <div className="animated fadeIn">
            
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> {t("panel.restriction")}
                        </CardHeader>
                        <CardBody>
                            <Table  striped size ="sm">
                                <thead>
                                    <tr>
                                        <th>restrictionId</th>
                                        <th>userId</th>
                                        <th>name</th>
                                        <th>description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        JSON.parse(localStorage.getItem("res")).map((item,idx)=>{
                                            return <tr key={idx}>
                                                <td>{item.restrictionId}</td>
                                                <td>{item.landlordId}</td>
                                                <td>{item.carName}</td>
                                                <td>{item.description}</td>
                                                <td>
                                                    <row>
                                                    <button className="btn btn-warning" onClick={()=>editRestriction(item.restrictionId)}>{t("panel.edit")}</button>
                                                    </row>
                                                    <row>
                                                        -
                                                    </row>
                                                    <row>
                                                    <button className="btn btn-warning" onClick={()=>callTwoFunctions(item.restrictionId)}>{t("panel.delete")}</button>
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
export default RestrictionList;


