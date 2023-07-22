import React from "react";
import "./style.css"
import {Link} from "react-router-dom";
export const Page404 = () => {
    return (
        <div id="notfound" className='fixed-top bg-white'>
            <div className="notfound">
                <div className="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>متاسفانه صفحه مورد نظر یافت نشد.</h2>
                <Link className='stretched-link text-decoration-none' to='/'>برگشت</Link>
            </div>
        </div>
    )
}
