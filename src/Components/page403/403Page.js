import React, {Fragment} from "react";
import './style.scss'
import {Link} from "react-router-dom";
export const Page403 = () => {
    return (
        <Fragment>
            <div id="app" className='fixed-top'>
                <div>403</div>
                <div className="txt">
                    دسترسی ممنوع<span className="blink">_</span>
                </div>
                <div className="txt">
                    <Link className='stretched-link text-decoration-none' to='/'>برگشت</Link>
                </div>
            </div>
        </Fragment>
    )
}