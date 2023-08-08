import React, {Fragment, useContext, useState} from "react";
import {Forms} from "./forms";
import {SideBar} from "./sidebar";
import {Contextform} from "./contextform";
import {Context} from "../../../../context";

const Property = () => {
    const [showForm , setShowForm] = useState('')
    const [isRepair , setIsRepair] = useState('')
    const context = useContext(Context)

    return(
        <Contextform.Provider value={{
                    isRepair:isRepair,
                    setIsRepair:setIsRepair
                }}>
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                <div className='d-flex'>
                    <SideBar setShowForm={setShowForm} setIsRepair={setIsRepair}/>
                    <Forms showForm={showForm} scan={context.scan}/>
                </div>

            </div>
        </Fragment>
        </Contextform.Provider>
    )
}

export default Property