import React, {Fragment, useEffect, useState} from "react";
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
import  {Contextform} from "./contextform"
import {DigitalFurniture} from "./forms/digital-furniture";
import {useFormik} from "formik";
import Url from "../../../config";
import {OfficeCar} from "./forms/office-car";

const Modal = (props) => {
  const [isRepair , setIsRepair] = useState('')
  const [property, setProperty] = useState([])

  const formik = useFormik({
    initialValues: {
          code: property.code || '',
          name: property.name || '',
          inventory: property.inventory || '',
          property_number: property.property_number || '',
          install_location: property.install_location || '',
          user: property.user || '',
          use_for: property.use_for || '',
          description: property.description || '',
          type_register: property.type_register || '',
          model: property.model || '',
          document_code: property.document_code,
          systemID: property.systemID,
          year_made: property.year_made || '',
          owner: property.owner || '',
          plate1: property.plate1 || '',
          using_location: property.using_location || '',
          plate2: property.plate2 || '',
          plate3: property.plate3 || '',
          plate4: property.plate4 || '',
          motor: property.motor || '',
          chassis: property.chassis || '',
          year_buy: property.year_buy || '',
          phone_feature: property.phone_feature || '',
          cpu: property.cpu || '',
          motherboard: property.motherboard || '',
          ram: property.ram || '',
          power: property.power || '',
          hdd: property.hdd || '',
          case: property.case || '',
          type_furniture: property.type_furniture || '',
          type_item: property.type_item || '',
          number_type: property.number_type || '',
          number: property.number || '',


        },
        enableReinitialize: true,
        });

     const fetchData = async () => {
        if (props.typeProperty !== '' && props.idNumber !== null){
                const response = await fetch(`${Url}/api/${props.typeProperty}/${props.idNumber}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
                const data = await response.json()
                setProperty(data)
        }
    }

     useEffect(() => {
            void fetchData()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [props.typeProperty, formik.values , props.idNumber])

  return (
     <Contextform.Provider value={{
                    isRepair:isRepair,
                    setIsRepair:setIsRepair,
                    editStatus:props.editStatus,
                    idNumber:props.idNumber,
                    formik:formik,
                    setTypeDigital:props.setTypeDigital,
                    typeDigital:props.typeDigital,
                    typeCommunication:props.typeCommunication,
                    setTypeCommunication:props.setTypeCommunication,
                    viewOnly:props.viewOnly,
        }}>
      <Fragment>
             <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="modalMain" tabIndex="-1" aria-labelledby="modalMainLabel"
             aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">مشاهده</h1>
                            <button type="button" className="btn-close " data-bs-dismiss="modal"
                            aria-label="Close" onClick={() => {
                                props.setIdNumber('')
                                formik.resetForm()
                                props.setEditStatus(false)
                                props.setViewOnly(false)
                            }}></button>
                        </div>
                        <div className="container modal-body">
                            {(() => {
                                if (props.typeProperty === 'safetyequipment'){
                                    return <SafetyEquipment/>
                                }else if (props.typeProperty === 'airportequipment'){
                                    return <AirportEquipment/>
                                }else if (props.typeProperty === 'electronicfurniture'){
                                    return <ElectronicFurniture/>
                                }else if (props.typeProperty === 'officefurniture'){
                                    return <OfficeFurniture/>
                                }else if (props.typeProperty === 'digitalfurniture'){
                                    return <DigitalFurniture/>
                                }else if (props.typeProperty === 'facilityfurniture'){
                                    return <Furniture/>
                                }else if (props.typeProperty === 'airportfurniture'){
                                    return <AirportFurniture/>
                                }else if (props.typeProperty === 'airportvehicle'){
                                    return <AirportCar/>
                                }else if (props.typeProperty === 'officevehicle'){
                                    return <OfficeCar/>
                                }else if (props.typeProperty === 'noneindustrialtool'){
                                    return <IndustrialEquipment/>
                                }else if (props.typeProperty === 'industrialtool'){
                                    return <DustrialEquipment/>
                                }else if (props.typeProperty === 'supportitem'){
                                    return <SupportItems/>
                                }else if (props.typeProperty === 'benefit'){
                                    return <Benefits/>
                                }
                            })()}
                            </div>
                    </div>
                </div>
            </div>
          </Fragment>
     </Contextform.Provider>
  );
};

export default Modal