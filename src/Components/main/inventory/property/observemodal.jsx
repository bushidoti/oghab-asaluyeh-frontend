import React, {Fragment, useEffect, useRef, useState} from "react";

import {useReactToPrint} from "react-to-print";
import Url from "../../../config";
import {CloseOutlined, PrinterOutlined} from "@ant-design/icons";

const ObserveModal = (props) => {
  const [property, setProperty] = useState([])
  const [repaired, setRepaired] = useState([])
  const componentPDF= useRef();

   const fetchData = async () => {
      if (props.idNumber !== null){
            const response = await fetch(`${Url}/api/${props.typeProperty}/`+ props.idNumber , {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            const data = await response.json()
            setProperty(data)
      }
  }

  const fetchDataProducts = async () => {
              if (props.typeProperty !== '') {
                  const response = await fetch(`${Url}/api/${handleRepairedProperties()}/` , {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
                  const data = await response.json()
                  setRepaired(data)
              }
      }

  const handleRepairedProperties = () => {
       if (props.typeProperty === 'safetyequipment'){
           return 'repairedsafetyequipment'
       }else if (props.typeProperty === 'airportequipment'){
           return 'repairedairportequipment'
       }else if (props.typeProperty === 'digitalfurniture'){
           return 'repairedigitalfurniture'
       }else if (props.typeProperty === 'facilityfurniture'){
           return 'repairedfacilityfurniture'
       }else if (props.typeProperty === 'airportfurniture'){
           return 'repairedairportfurniture'
       }else if (props.typeProperty === 'electronicfurniture'){
           return 'repairedelectronicfurniture'
       }else if (props.typeProperty === 'officefurniture'){
           return 'repairedofficefurniture'
       }else if (props.typeProperty === 'airportvehicle'){
           return 'repairedairportvehicle'
       }else if (props.typeProperty === 'officevehicle'){
           return 'repairedofficevehicle'
       }else if (props.typeProperty === 'industrialtool'){
           return 'repairedindustrialtool'
       }

  }
  useEffect(() => {
          void fetchData()
          void fetchDataProducts()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.idNumber])

   const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });

  return (
      <Fragment>
         <div className="modal fade"  data-bs-backdrop="static" data-bs-keyboard="false" id="observeModal" tabIndex="-1" aria-labelledby="observeModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen" >
                        <div className="modal-content" style={{backgroundColor:'hsl(169,85%,92%)'}}>
                            <div className="modal-header mx-4">
                                <div className="modal-title fs-5 h1 d-flex gap-2" id="exampleModalLabel"><span>{property.name}</span><span className="text-danger">{props.idNumber}</span></div>
                                <button type="button" className="btn-close " data-bs-dismiss="modal" onClick={() => {
                                    props.setIdNumber(null)
                                }}
                                aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                        <div className= 'd-flex gap-2 m-4'>
                                <button className="btn btn-outline-secondary h-75" type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                       </div>
                  <hr className='bg-primary m-4'/>
                  <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '60vh'}}>
                      <table ref={componentPDF}
                           className="table table-hover table-fixed text-center align-middle table-striped table-bordered border-primary bg-white" style={{direction:'rtl' , fontSize:'1vw'}} >
                            <thead className='bg-light'>
                            {(() => {
                                if (props.typeProperty === 'safetyequipment' || props.typeProperty === 'facilityfurniture' || props.typeProperty === 'airportfurniture' || props.typeProperty === 'electronicfurniture' || props.typeProperty === 'officefurniture' || props.typeProperty === 'industrialtool'){
                                    return (
                                        <tr>
                                            <th scope="col">ردیف</th>
                                            <th scope="col">نام تجهیزات</th>
                                            <th scope="col">تاریخ ثبت</th>
                                            <th scope="col">شرح</th>
                                            <th scope="col">کد اموال</th>
                                        </tr>
                                    )
                                }else if (props.typeProperty === 'airportequipment' || props.typeProperty === 'digitalfurniture'){
                                    return (
                                     <tr>
                                            <th scope="col">ردیف</th>
                                            <th scope="col">نام تجهیزات</th>
                                            <th scope="col">نوع تعمیر</th>
                                            <th scope="col">تاریخ ثبت</th>
                                            <th scope="col">شرح</th>
                                            <th scope="col">کد اموال</th>
                                        </tr>
                                    )
                                }else if (props.typeProperty === 'airportvehicle' || props.typeProperty === 'officevehicle'){
                                    return (
                                     <tr>
                                            <th scope="col">ردیف</th>
                                            <th scope="col">نام خودرو</th>
                                            <th scope="col">نوع تعمیر</th>
                                            <th scope="col">کیلومتر</th>
                                            <th scope="col">سال تعویض</th>
                                            <th scope="col">تاریخ ثبت</th>
                                            <th scope="col">شرح</th>
                                            <th scope="col">کد اموال</th>
                                        </tr>
                                    )
                                }
                            })()}

                            </thead>

                            <tbody>
                             {(() => {
                                if (props.typeProperty === 'safetyequipment'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.safety_equipment ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.safety_equipment}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>


                                    )
                                }else if (props.typeProperty === 'airportequipment'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.airport_equipment ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.repaired_type}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.airport_equipment}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'digitalfurniture'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.digital_furniture ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.repaired_type}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.digital_furniture}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'facilityfurniture'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.facility_furniture ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.facility_furniture}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'airportfurniture'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.airport_furniture ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.airport_furniture}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'electronicfurniture'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.electronic_furniture ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.electronic_furniture}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'officefurniture'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.office_furniture ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.office_furniture}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'airportvehicle'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.airport_vehicle ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.repaired_type}</td>
                                                    <td>{data.kilometer}</td>
                                                    <td>{data.year_changed}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.airport_vehicle}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'officevehicle'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.office_vehicle ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.repaired_type}</td>
                                                    <td>{data.kilometer}</td>
                                                    <td>{data.year_changed}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.office_vehicle}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }else if (props.typeProperty === 'industrialtool'){
                                    return (
                                     (repaired.length > 0 && repaired.filter(property => property.industrial_tool ===  props.idNumber).map((data,i) => (
                                                <tr key={data.id}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.industrial_tool}</td>
                                                </tr>
                                        ))) ||

                                      <tr>
                                        <td colSpan="17" className='h3'>داده ای یافت نشد .....</td>
                                      </tr>
                                    )
                                }
                            })()}

                            </tbody>
                        </table>
                </div>
              </div>
                    <div className="modal-footer mx-4">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                                    props.setIdNumber(null)
                                }}><CloseOutlined /></button>
                    </div>
                </div>
            </div>
        </div>
  </Fragment>
  );
};
export default ObserveModal