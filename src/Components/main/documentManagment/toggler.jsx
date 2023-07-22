import React, {Fragment} from "react";

export const Toggler = (props) => {

    return (
        <Fragment>
                <div className='d-flex gap-2'>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" value='کارفرما' id="employee" onChange={props.handleForm}/>
                            <label className="form-check-label" htmlFor="employee">
                                کارفرما
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" value='پیمانکار' id="contractor" onChange={props.handleForm}/>
                            <label className="form-check-label" htmlFor="contractor">
                                پیمانکار
                            </label>
                    </div>
                </div>
        </Fragment>
    )


}