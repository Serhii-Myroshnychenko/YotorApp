import React, { useEffect, useState } from "react";
import s from "./Review.module.css";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

export default function Review() {

    const [Name, setName] = useState("");
    const [Text, setText] = useState("");
    const {t} = useTranslation();
    
    async function getFeedbacks(e){
        let res = await fetch("https://localhost:44349/api/Feedbacks", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
        }); 
        res = await res.json();
        localStorage.setItem("feedbacks", JSON.stringify(res));
        console.log(localStorage.getItem("feedbacks"));
    };

    function callTwoFunctions(){
        createFeedback();
        getFeedbacks();
    }
    async function createFeedback(e){
        let res = await fetch("https://localhost:44349/api/Feedbacks", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("tok"),
            },
            body: JSON.stringify({Name: Name, Text: Text}),
        });
    };
    getFeedbacks();
    return (
        <div className={s.review}>
            <h1 className={s.h1}>{t("review.userReviews")}</h1>
            <div className={s.row}>
                <div className={s.col6}>
                    <div className={s.blockleft}>
                    <h2 className = "ml-3 pt-3 ">{t("review.allReviews")}</h2>
                         <div className={s.lefttop}> 
                         { JSON.parse(localStorage.getItem("feedbacks")).map(item => { 
                    return (

                        <tr>  
                            <td> {item.name } </td>
                            <td>   </td>
                            <td> {": " + item.text}</td>
                        </tr>
                    );})}
                        </div> 
                    </div>
                </div>
                <div className={s.col6}>
                    <div className={s.blockright}>
                        <h3 className={s.getreview}>{t("review.here")}</h3>
                        <h6 className = {s.h6login}>{t("review.enterNeed")}</h6>
                        <div>
                            <input type="name" placeholder="name" onChange={(e)=>setName(e.target.value)} className={'form-control' + ' w-50 ' + ' mb-3 ' +  s.email_input}/>
                            <input type="text" placeholder="text" onChange={(e)=>setText(e.target.value)} className={'form-control' + ' w-50 ' + ' mb-3 ' +  s.email_input}/>
                          </div> 
                       <form onSubmit={callTwoFunctions}>  
                       <button type="submit" className = {s.send}>{t("review.send")}</button>
                       </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
}







