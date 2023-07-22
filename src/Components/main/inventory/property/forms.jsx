import React, {Fragment, useContext, useEffect, useState} from "react";
import {SafetyEquipment} from "./forms/safety-equipment";
import {AirportEquipment} from "./forms/airport-equipment";
import {ElectronicFurniture} from "./forms/electronic-furniture";
import {OfficeFurniture} from "./forms/office-furniture";
import {Furniture} from "./forms/furniture";
import {AirportFurniture} from "./forms/airport-furniture";
import {AirportCar} from "./forms/airport-car";
import {IndustrialEquipment} from "./forms/industrial-equipment";
import {SupportItems} from "./forms/support-items";
import {Benefits} from "./forms/benefits";
import {DustrialEquipment} from "./forms/dustrial-equipment";
import {DigitalFurniture} from "./forms/digital-furniture";
import Url from "../../../config";
import  {Contextform} from "./contextform"
import axios from "axios";
import {AirPlane} from "./forms/airplane";
import {OfficeCar} from "./forms/office-car";
export const Forms =  (props) => {
     const [autoIncrement, setAutoIncrement] = useState([])
     const [office, setOffice] = useState('')
     const [editStatus] = useState(false)
     const [typeDigital , setTypeDigital] = useState('')
     const [typeCommunication , setTypeCommunication] = useState('')
     const form = useContext(Contextform)

     const fetchDataAutoIncrement = async () => {
        const response = await fetch(`${Url}/api/autoincrementproperty/1`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setAutoIncrement(data)
      }

     useEffect(() => {
          void fetchDataAutoIncrement()
          }, [])

     useEffect(() => {
            (async () => {
                const {data} = await axios.get(`${Url}/home/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              });
              setOffice(data.message);
        })()
    }, []);

    return (
        <Contextform.Provider value={{
                    autoIncrement:autoIncrement,
                    office:office,
                    isRepair:form.isRepair,
                    setTypeDigital:setTypeDigital,
                    typeDigital:typeDigital,
                    setIsRepair:form.setIsRepair,
                    typeCommunication:typeCommunication,
                    setTypeCommunication:setTypeCommunication,
                    editStatus:editStatus
        }}>
        <Fragment>
            <div className= 'd-flex justify-content-around m-4 w-100 rounded'>
                        <div className="card card-body gap-2">
                            <div className='d-flex'>
                                <div className='needs-validation col'>
                                    {(() => {
                                        if (props.showForm === 'safetyEquipment'){
                                            return (
                                                      <SafetyEquipment/>
                                            )
                                        }else if (props.showForm === 'airportEquipment'){
                                            return (
                                                     <AirportEquipment/>
                                            )
                                        }else if (props.showForm === 'electronicFurniture'){
                                            return (
                                                     <ElectronicFurniture/>
                                            )
                                        }else if (props.showForm === 'officeFurniture'){
                                            return (
                                                     <OfficeFurniture/>
                                            )
                                        }else if (props.showForm === 'furniture'){
                                            return (
                                                     <Furniture/>
                                            )
                                        }else if (props.showForm === 'airportFurniture'){
                                            return (
                                                     <AirportFurniture/>
                                            )
                                        }else if (props.showForm === 'digitalFurniture'){
                                            return (
                                                     <DigitalFurniture/>
                                            )
                                        }else if (props.showForm === 'airportCar'){
                                            return (
                                                     <AirportCar showForm={props.showForm}/>
                                            )
                                        }else if (props.showForm === 'airplane'){
                                            return (
                                                     <AirPlane showForm={props.showForm}/>
                                            )
                                        }else if (props.showForm === 'personalCar'){
                                            return (
                                                     <OfficeCar showForm={props.showForm}/>
                                            )
                                        }else if (props.showForm === 'industrialEquipment'){
                                            return (
                                                 <IndustrialEquipment/>
                                            )
                                        }else if (props.showForm === 'supportItems'){
                                            return (
                                                     <SupportItems/>
                                            )
                                        }else if (props.showForm === 'benefits'){
                                            return (
                                                     <Benefits/>
                                            )
                                        }else if (props.showForm === 'dustrialEquipment'){
                                            return (
                                                     <DustrialEquipment/>
                                            )
                                        }
                                    })()}
                                 </div>
                                {(() => {
                                        if (props.showForm === 'safetyEquipment'){
                                            return (
                                                <img className='m-2 d-none d-xl-block' src={require('./assets/saftey-equipment.jpg')} style={{width:'31vw' , height:'20vw'}}  alt="..."/>
                                            )
                                        }else if (props.showForm === 'airportEquipment'){
                                            return (
                                                <Fragment>
                                                    <img className='m-2 d-none d-xl-block' src={require('./assets/airport-equipments.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                                </Fragment>
                                            )
                                        }else if (props.showForm === 'electronicFurniture'){
                                            return (
                                                 <Fragment>
                                                       <img className='m-2 d-none d-xl-block' src={require('./assets/electronic-furniture.png')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                                </Fragment>
                                            )
                                        }else if (props.showForm === 'officeFurniture'){
                                            return (
                                                <Fragment>
                                                    <img className='m-3 img-fluid d-none d-xl-block'  src={require('./assets/office-furniture.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                                </Fragment>
                                            )
                                        }else if (props.showForm === 'furniture'){
                                            return (
                                                <Fragment>
                                                    <img className='m-3 img-fluid d-none d-xl-block'  src={require('./assets/utility-furniture.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                                </Fragment>
                                            )
                                        }else if (props.showForm === 'airportFurniture'){
                                            return (
                                                <Fragment>
                                                    <img className='m-3 d-none d-xl-block' src={require('./assets/airport-furniture.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                                </Fragment>
                                            )
                                        }else if (props.showForm === 'digitalFurniture'){
                                            return (
                                               <Fragment>
                                                      <img className='m-3 d-none d-xl-block' src={require('./assets/digital-furniture.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                               </Fragment>
                                            )
                                        }else if (props.showForm === 'airportCar'){
                                            return (
                                                 <Fragment>
                                                      <img className='m-2 d-none d-xl-block' src={require('./assets/airport-vehicles.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                                 </Fragment>
                                            )
                                        }else if (props.showForm === 'airplane'){
                                            return (
                                                 <Fragment>
                                                      <img className='m-2 d-none d-xl-block' src={require('./assets/airplane.jpeg')} style={{width:'35vw' , height:'50vh'}}  alt="..."/>
                                                 </Fragment>
                                            )
                                        }else if (props.showForm === 'personalCar'){
                                            return (
                                                 <Fragment>
                                                     <img className='m-2 d-none d-xl-block' src={require('./assets/personal-vehicles.png')} style={{maxWidth:'31vw' , height:'50vh'}}  alt="..."/>
                                                 </Fragment>
                                            )
                                        }else if (props.showForm === 'industrialEquipment'){
                                            return (
                                               <Fragment>
                                                   <img className='m-3 d-none d-xl-block' src={require('./assets/none-industrial-equipments.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                               </Fragment>
                                            )
                                        }else if (props.showForm === 'supportItems'){
                                            return (
                                              <Fragment>
                                                    <img className='m-3 d-none d-xl-block' src={require('./assets/support-tools.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                              </Fragment>
                                            )
                                        }else if (props.showForm === 'benefits'){
                                            return (
                                                <Fragment>
                                                    <img className='m-2 d-none d-xl-block' src={require('./assets/benefits.jpg')} style={{width:'31vw' , height:'20vw'}}  alt="..."/>
                                                </Fragment>
                                            )
                                        }else if (props.showForm === 'dustrialEquipment'){
                                            return (
                                               <Fragment>
                                                      <img className='m-3 d-none d-xl-block' src={require('./assets/industrial-equipment.jpg')} style={{width:'31vw' , height:'50vh'}}  alt="..."/>
                                               </Fragment>
                                            )
                                        }
                                    })()}

                            </div>
                        </div>
            </div>
        </Fragment>
            </Contextform.Provider>
    )
}