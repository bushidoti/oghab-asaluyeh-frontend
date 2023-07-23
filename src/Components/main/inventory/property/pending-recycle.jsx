import React, {Fragment, useEffect, useState} from "react";
import Modal from "./modal";
import Url from "../../../config";
import axios from "axios";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import {Thead} from "./thead";
import {CheckOutlined, InfoOutlined} from "@ant-design/icons";

const PendingRecycle = () => {
    const [typeProperty , setTypeProperty] = useState('')
    const [property, setProperty] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const [typeDigital , setTypeDigital] = useState('')
    const [typeCommunication , setTypeCommunication] = useState('')
    const [editStatus, setEditStatus] = useState(false)
    const [viewOnly, setViewOnly] = useState(false)

    const formik = useFormik({
        initialValues: {
              code: property.code || '',
              name: property.name || '',
              inventory: property.inventory || '',
              dst_inventory: property.dst_inventory || '',
              install_location: property.install_location || '',
              user: property.user || '',
              use_for: property.use_for || '',
              description: property.description || '',
              type_register: property.type_register || '',
              model: property.model || '',
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
              message: property.message || '',

            },
            enableReinitialize: true,
            });


    const fetchData = async () => {
        if (typeProperty !== ''){
                const response = await fetch(`${Url}/api/${typeProperty}/`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
                const data = await response.json()
                setProperty(data)
        }
    }

    const putHandler = async (id) => {
         await axios.put(
            `${Url}/api/${typeProperty}/${id}/`,
              {
              code: id,
              cancel_status: 'agreed',
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        setTimeout(
                    refreshPages, 3000)
        }

    const closeAlert = (id) => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `آیا از تایید درخواست و بایگانی این اموال مطمئنید ؟`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, بایگانی کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'بایگانی شد!',
                  'مورد بایگانی شد.',
                  'success',
                  'ok',
                  putHandler(id),
                )
              }
            })
      }

     function refreshPages() {
        window.location.reload()
    }

     useEffect(() => {
            void fetchData()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [typeProperty, formik.values])

    const prom = async  (id) => {
     return  closeAlert(id)

    }
    const func = async (id) => {
         await prom(id).then(() => {
             setIdNumber(id)
         });
    }
    return (
        <Fragment>
            <Modal setTypeCommunication={setTypeCommunication} typeCommunication={typeCommunication}  typeProperty={typeProperty} editStatus={editStatus} setEditStatus={setEditStatus} viewOnly={viewOnly} setViewOnly={setViewOnly} idNumber={idNumber} setIdNumber={setIdNumber} setTypeDigital={setTypeDigital} typeDigital={typeDigital}/>
            <div className= 'plater  m-2 rounded-3 shadow-lg mb-4'>
                 <div className= 'd-flex  justify-content-between m-4' >
                        <div className= 'd-flex gap-2  align-items-center'>
                        <div className="form-floating">
                                <select className="form-select" id="typeProperty" defaultValue=''
                                aria-label="Type Property" onChange={(e) => {
                                  setTypeProperty(e.target.value)
                                } }>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="safetyequipment">تجهیزات ایمنی</option>
                                                <option value="airportequipment">تجهیزات فرودگاهی</option>
                                                <option value="electronicfurniture">اثاثه الکترونیکی</option>
                                                <option value="officefurniture">اثاثه اداری</option>
                                                <option value="facilityfurniture">اثاثه تاسیساتی</option>
                                                <option value="airportfurniture">اثاثه فرودگاهی</option>
                                                <option value="digitalfurniture">اثاثه دیجیتالی</option>
                                                <option value="airportvehicle">خودرو فرودگاهی</option>
                                                <option value="officevehicle">خودرو اداری</option>
                                                <option value="noneindustrialtool">ابزار آلات غیر صنعتی</option>
                                                <option value="industrialtool">ابزار آلات صنعتی</option>
                                                <option value="supportitem">اقلام پشتیبانی</option>
                                </select>
                                <label htmlFor="typeProperty">نوع اموال</label>
                        </div>
                    </div>
                        </div>
                <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '37vh'}}>
                    <table className="table table-hover table-fixed text-center align-middle table-striped table-bordered border-primary" style={{direction:'rtl' , fontSize:'1vw'}}>
                          <Thead typeProperty={typeProperty} newth={<th scope="col">دلیل درخواست</th>}/>
                        <tbody>
                             {(() => {
                                    if (typeProperty === 'airportequipment'){
                                        return (
                                          (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                           <tr key={data.code}>
                                                <th scope="row">{i}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.model}</td>
                                                <td>{data.year_made}</td>
                                                <td>{data.user}</td>
                                                <td>{data.owner}</td>
                                                <td>{data.install_location}</td>
                                                <td>{data.canceled_describe}</td>
                                                <td>
                                                    <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                    <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                </td>
                                           </tr>
                                             )))
                                        )
                                    }else if (typeProperty === 'safetyequipment'){
                                        return (
                                          (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                            <tr key={data.code}>
                                                <th scope="row">{i}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.use_for}</td>
                                                <td>{data.user}</td>
                                                <td>{data.install_location}</td>
                                                <td>{data.canceled_describe}</td>
                                                <td>
                                                    <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                    <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                </td>
                                            </tr>
                                                     )))
                                        )
                                    }else if (typeProperty === 'digitalfurniture'){
                                        return (
                                          (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                            <tr key={data.code}>
                                                <th scope="row">{i}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.model}</td>
                                                <td>{data.canceled_describe}</td>
                                                <td>
                                                    <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                            setTypeDigital(data.type_furniture)
                                                            setTypeCommunication(data.name)
                                                        }}><InfoOutlined /></button>
                                                    <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                </td>
                                            </tr>
                                                     )))
                                        )
                                    }else if (typeProperty === 'electronicfurniture' || typeProperty === 'facilityfurniture'){
                                        return (
                                          (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.install_location}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                             )))
                                        )
                                    }else if (typeProperty === 'officefurniture'){
                                        return (
                                           (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.year_made}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))
                                        )
                                    }else if (typeProperty === 'airportfurniture'){
                                        return (
                                           (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.install_location}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))
                                        )
                                    }else if (typeProperty === 'airportvehicle' || typeProperty === 'officevehicle' ){
                                        return (
                                           (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.plate4} / {data.plate3} - {data.plate2} - {data.plate1}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.motor}</td>
                                                    <td>{data.chassis}</td>
                                                    <td>{data.year_made}</td>
                                                    <td>{data.owner}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning '  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))
                                        )
                                    }else if (typeProperty === 'noneindustrialtool'){
                                        return (
                                           (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning ' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success  ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))
                                        )
                                    }else if (typeProperty === 'industrialtool'){
                                        return (
                                           (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))
                                        )
                                    }else if (typeProperty === 'supportitem'){
                                        return (
                                           (property.length > 0 && property.filter(property =>  property.cancel_status === "pending").map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.type_item}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.canceled_describe}</td>
                                                    <td>
                                                        <button className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-success ms-2' onClick={async () => {
                                                            await func(data.code)
                                                        }}>
                                                            <CheckOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))
                                        )
                                    }
                                })()}
                    </tbody>
                </table>
            </div>
        </div>
    </Fragment>
    )
}
export default PendingRecycle;