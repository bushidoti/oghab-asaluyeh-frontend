import React, {Fragment, useEffect, useState} from "react";
import { ReactComponent as Logo } from "./avatar.svg";
import Modal from './modal'
import {Link} from "react-router-dom";
import axios from "axios";
import Url from "../../config";

export const Profile = (props) => {
    const [fullName, setFullName] = useState('');
    const [office, setOffice] = useState('');

     useEffect(() => {
            (async () => {
                if (props.isAuth) {
                    const {data} = await (await axios.get(`${Url}/home/`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                    }));
                    setOffice(data.message);
                }
        })()
    }, [props.isAuth]);

     useEffect(() => {
            (async () => {
                if (props.isAuth){
                               const {data} = await (await axios.get(`${Url}/name/`, {
                    headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                  }));
                  setFullName(data.message);
                }
     
        })()
    }, [props.isAuth]);
    return (
        <Fragment>
                <Modal username={props.username} setUsername={props.setUsername} password={props.password} setPassword={props.setPassword}/>
               <div className="dropdown">
                <Link className="nav-link dropdown-toggle text-decoration-none" to="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                    <Logo/> <span className={`${props.isAuth ? 'mx-2' : null}`}>{fullName + ' ' +  office}</span>
                </Link>
                <ul className="dropdown-menu">
                    {props.isAuth ?
                        <li><Link className="dropdown-item" to='/logout'>خروج</Link></li>
                        :
                        <li><Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#modalLogin">ورود</Link></li>
                    }
                </ul>
              </div>
        </Fragment>
    )

}