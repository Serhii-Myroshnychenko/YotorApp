import React, { useEffect, useState } from "react";
import {  Switch, Link, NavLink } from "react-router-dom";
import RestrictionList from "./RestrictionList";
import AddRestriction from "./AddRestriction";
import EditRestriction from "./EditRestriction";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import {useTranslation} from "react-i18next";
import "../../utils/i18next";

function Restriction(props){

    const {t} = useTranslation();

    return (
        <BrowserRouter>
            <div >
                <nav>
                    <div >
                        <ul >
                            <li>
                                <Link to={'./AddRestriction'} className="nav-link">{t("panel.create")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'./RestrictionList'} className="nav-link">{t("panel.list")}</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>
                <Switch>
                    <Route path="/AddRestriction" render={() => <AddRestriction />} />
                    <Route path="/RestrictionList" render={() => <RestrictionList />} />
                    <Route path="/EditRestiction" render={() => <EditRestriction />} />
                </Switch>
            </div>
        </BrowserRouter>   
    )
}
export default  Restriction;