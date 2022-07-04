import React, { useEffect, useState } from "react";
import {  Switch, Link, NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function Database(props){

    const {t} = useTranslation();
    
    async function createBackup(){

        let res = await fetch("https://localhost:44349/api/Databases", {
            method: 'GET',
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
            alert(t("alert.sys"))
        }
    }
    async function getLastBackup(){
        let res = await fetch("https://localhost:44349/api/Databases/RestoreByLastBackup", {
            method: 'GET',
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
            alert(t("alert.sys"))
        }
    }
    
    return (
        <BrowserRouter>
            <div >
                <nav>
                    <div >
                        <ul >
                            <li>    
                                <Link to={'./Database'} onClick={createBackup} className="nav-link">{t("panel.createBackup")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'./Database'} onClick={getLastBackup} className="nav-link">{t("panel.restore")}</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>
                <Switch></Switch>
            </div>
        </BrowserRouter>
    )
}

export default  Database;