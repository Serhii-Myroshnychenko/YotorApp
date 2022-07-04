import React, { useEffect, useState } from "react";
import {  Switch, Link, NavLink } from "react-router-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Organization from "./Organization";
import Restriction from "./Restriction";
import Feedback from "./Feedback";
import Database from "./Database";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function Services(props){

    const {t} = useTranslation();
    
    return (
        <BrowserRouter>
            <div >
                <nav>
                    <div >
                        <ul >
                            <li className="nav-item">
                                <Link to={'./Organization'} className="nav-link">{t("panel.organization")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'./Restriction'} className="nav-link">{t("panel.restriction")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'./Feedback'} className="nav-link">{t("panel.feedback")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'./Database'} className="nav-link">{t("panel.database")}</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>
                <Switch>
                    <Route path="/Organization" render={() => <Organization />} />
                    <Route path="/Restriction" render={() => <Restriction />} />
                    <Route path="/Feedback" render={() => <Feedback />} />
                    <Route path="/Database" render={() => <Database />} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
export default  Services;