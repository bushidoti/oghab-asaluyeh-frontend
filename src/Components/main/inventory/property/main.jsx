import React, {Fragment, useState} from "react";
import {Forms} from "./forms";
import {SideBar} from "./sidebar";
import {Contextform} from "./contextform";

const Property = () => {
    const [showForm , setShowForm] = useState('')
    const [isRepair , setIsRepair] = useState('')

    return(
        <Contextform.Provider value={{
                    isRepair:isRepair,
                    setIsRepair:setIsRepair
                }}>
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                <div className='d-flex'>
                    <SideBar setShowForm={setShowForm} setIsRepair={setIsRepair}/>
                    <Forms showForm={showForm}/>
                </div>

            </div>
        </Fragment>
        </Contextform.Provider>
    )
}

export default Property