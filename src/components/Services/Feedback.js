import React, { useEffect, useState } from "react";
import {  Switch, Link, NavLink } from "react-router-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AddFeedback from "./AddFeedback";
import FeedbackList from "./FeedbackList";
import EditFeedback from "./EditFeedback";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function Feedback(props){

    
   const {t} = useTranslation();

    return (
        <BrowserRouter>
            <div >
                <nav>
                    <div >
                        <ul >
                            <li>
                                <Link to={'./AddFeedback'} className="nav-link">{t("panel.create")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'./FeedbackList'} className="nav-link">{t("panel.list")}</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>
                <Switch>
                    <Route path="/AddFeedback" render={() => <AddFeedback />} />
                    <Route path="/FeedbackList" render={() => <FeedbackList />} />
                    <Route path="/EditFeedback" render={() => <EditFeedback />} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default  Feedback;