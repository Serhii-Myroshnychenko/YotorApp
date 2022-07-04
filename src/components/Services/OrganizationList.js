import React, {useEffect, useState} from "react";
import {Card,CardBody,CardHeader, Col, Row, Table} from 'reactstrap';
import {NavLink, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function OrganizationList(){
    
   const history = useHistory();
   const {t} = useTranslation();
   async function deleteOrganization(id){

    let res = await fetch("https://localhost:44349/api/Organizations/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        if(res.status==200){
            alert(t("alert.successfully"));
            history.push('/.OrganizationList');
        }
        else{
            alert(t("alert.check"))
        }
   }

   function editOrganization(id){
       localStorage.setItem("id",id);
       history.push({
           pathname : './EditOrganization'
       })   

   }
    function callTwoFunctions(id){
         deleteOrganization(id);
         getOrganizations();
    }
    async function getOrganizations(){
       
        let res = await fetch("https://localhost:44349/api/Organizations/Get", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        });
        res = await res.json();
        localStorage.setItem("org", JSON.stringify(res));
        
    }
    getOrganizations();
    return (
        
        <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> {t("panel.organization")}
                        </CardHeader>
                        <CardBody>
                            <Table  striped size ="sm">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Code</th>
                                        <th>Taxes</th>
                                        <th>Address</th>
                                        <th>Founder</th>
                                        <th>Account</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        JSON.parse(localStorage.getItem("org")).map((item,idx)=>{
                                            return <tr key={idx}>
                                                <td>{item.organizationId}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.code}</td>
                                                <td>{item.taxes}</td>
                                                <td>{item.address}</td>
                                                <td>{item.founder}</td>
                                                <td>{item.account}</td>
                                                <td>
                                                    <row>
                                                    <button className="btn btn-warning" onClick={()=>editOrganization(item.organizationId)}>{t("panel.edit")}</button>
                                                    </row>
                                                    <row>
                                                        -
                                                    </row>
                                                    <row>
                                                    <button className="btn btn-warning" onClick={()=>callTwoFunctions(item.organizationId)}>{t("panel.delete")}</button>
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
export default OrganizationList;


