import React, {Fragment, useEffect, useRef, useState} from "react";
import Url from "../../../../config";
import Modal from "../modal";
import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import {useReactToPrint} from "react-to-print";
import {CheckOutlined, InfoOutlined, PrinterOutlined} from "@ant-design/icons";

export const PropertyHandling = (props) => {
    const [property, setProperty] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const [typeProperty , setTypeProperty] = useState('')
    const [editStatus, setEditStatus] = useState(false)
    const [viewOnly, setViewOnly] = useState(true)
    const [typeDigital , setTypeDigital] = useState('')
    const [setCode] = useState('')
    const [search , setSearch] = useState('')
    const componentPDF= useRef();
    const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });

    const [typeCommunication , setTypeCommunication] = useState('')
    let today = new Date().toLocaleDateString('fa-IR');
    const options = {
              year: "numeric",
            };
    const formik = useFormik({
        initialValues: {
          last_handling_result: "",
          code: "",
          name: "",
        },
        enableReinitialize: true,
        });

    const fetchData = async () => {
        if (typeProperty !== ''){
                const response = await fetch(`${Url}/api/${typeProperty}/?code=${formik.values.code}&name=${formik.values.name}`, {
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
        [typeProperty , formik.values.code, formik.values.name])

    const putHandler = async (id) => {
         await axios.put(
            `${Url}/api/${typeProperty}/${id}/`,
              {
              code: id,
              last_handling_result: formik.values.last_handling_result,
              last_handling_date: today.replaceAll('/' , '-'),
              yearly_handling: new Date().toLocaleDateString('fa-IR' , options ),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
          await fetchData()
        }

    const putHandlerExist = async (id) => {
         await axios.put(
            `${Url}/api/${typeProperty}/${id}/`,
              {
              code: id,
              last_handling_result: 'بدون مشکل رویت شده است',
              last_handling_date: today.replaceAll('/' , '-'),
              yearly_handling: new Date().toLocaleDateString('fa-IR' , options ),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
          await fetchData()
        }

    const closeAlert = (id) => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `آیا از ثبت نتیجه انبارگردانی این کالا مطمئنید ؟`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, ثبت کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'ثبت شد!',
                  'نتیجه ثبت و در بازه یک ساله در قسمت انبارگردانی قفل شد.',
                  'success',
                  'ok',
                  putHandler(id),
                )
              }
            })
      }

      const closeAlertExist = (id) => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `آیا از ثبت نتیجه انبارگردانی این کالا مطمئنید ؟`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, ثبت کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'ثبت شد!',
                  'نتیجه ثبت و در بازه یک ساله در قسمت انبارگردانی قفل شد.',
                  'success',
                  'ok',
                  putHandlerExist(id),
                )
              }
            })
      }

    const prom = async  (id) => {
     return  closeAlert(id)

    }
     const promExist = async  (id) => {
     return  closeAlertExist(id)

    }
    const func = async (id) => {
         await prom(id).then(() => {
             setCode('code' , id)
         });
    }

     const funcExist = async (id) => {
         await promExist(id).then(() => {
             setCode('code' , id)
         });
    }

    return (
           <Fragment>
            <Modal setTypeCommunication={setTypeCommunication} typeCommunication={typeCommunication} viewOnly={viewOnly} setViewOnly={setViewOnly}  typeProperty={typeProperty} editStatus={editStatus} setEditStatus={setEditStatus} idNumber={idNumber} setIdNumber={setIdNumber} setTypeDigital={setTypeDigital} typeDigital={typeDigital}/>
                 <div className='m-4'>
                     <div className= 'd-flex gap-2  align-items-center mb-2'>
                        <div className="form-floating">
                                <select className="form-select" id="typeProperty" defaultValue=''
                                aria-label="Type Property" onChange={(e) => {
                                  setTypeProperty(e.target.value)
                                }}>
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
                                        <option value="benefit">امتیازات</option>
                                </select>
                                <label htmlFor="typeProperty">نوع اموال</label>
                        </div>
                    </div>
                     <div className= 'my-2'>
                                <button className="btn btn-outline-secondary" type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                     </div>
                 <div className="form-floating my-2" style={{maxWidth:'255px'}}>
                        <select className="form-select" defaultValue='' id="searchSelector" style={{maxWidth:'20vw' , minWidth:'200px'}} onChange={(e) => {
                            formik.setFieldValue('code' , '')
                            formik.setFieldValue('name' , '')
                            setSearch(e.target.value)
                        }}
                            aria-label="Search Select">
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            <option value="کد">کد</option>
                            <option value="نام کالا">نام کالا</option>
                        </select>
                        <label htmlFor="searchSelector">جستجو براساس</label>
                </div>
                <div className="input-group mb-3">
                    <input type="text"  id='searchBox' className="form-control" value={search === 'نام کالا' ? formik.values.name : formik.values.code}
                    onChange={e => search === 'نام کالا' ? formik.setFieldValue('name' , e.target.value) : formik.setFieldValue('code' , e.target.value)} placeholder={`جستجو براساس ${search}`}
                    aria-label="searchBox" aria-describedby="search" />
                </div>
                    <div className='m-4'>
                        <span className="dot bg-danger"></span><span> به معنی جا به جا شده و قفل شده</span>
                        <span className="dot bg-warning ms-4"></span><span> به معنی یک بار انبارگردانی شده و به مدت یک سال در این بخش قفل شده.</span>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className= 'm-4 table-responsive rounded-3 col' style={{maxHeight : '35vh'}}>
                          <table className="table table-hover text-center align-middle table-bordered border-primary bg-light" ref={componentPDF} style={{direction:'rtl' , fontSize:'1vw'}}>
                                <thead className= 'bg-light'>
                                <tr>
                                    <th scope="col">کد</th>
                                    <th scope="col">نام</th>
                                    <th scope="col" className='d-print-none'></th>
                                    <th scope="col" className='d-print-none'></th>
                                    <th scope="col">نتیجه</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(property.length > 0 && property.filter(product => product.inventory ===  props.inventory).map((data) => (
                                    <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options) ? 'hsl(60, 100%, 90%)' : null) }`}} key={data.code}>
                                        <th scope="row">{data.code}</th>
                                        <td>{data.name || data.number}</td>
                                        <td className='d-print-none'>
                                           <button className= 'btn btn-warning mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                    setEditStatus(true)
                                                     setViewOnly(true)
                                                    setIdNumber(data.code)
                                                     setTypeDigital(data.type_furniture)
                                                     setTypeCommunication(data.name)
                                                }}><InfoOutlined /></button>
                                        </td>
                                         <td className='d-print-none'>
                                           <button className="btn btn-success d-print-none" type="button" id="resultBtn"
                                                disabled={data.movement_status === 'received' || data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)} onClick={async () => {
                                                    await funcExist(data.code)
                                                }}><CheckOutlined /></button>
                                        </td>
                                        <td>
                                            <div className="input-group">
                                                <input type="text"  id='last_handling_result' name='last_handling_result' className="form-control" placeholder='نتیجه را بنویسید' value={data.last_handling_result}
                                                disabled={data.movement_status === 'received' || data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)} onChange={formik.handleChange}
                                                aria-label="last_handling_result" aria-describedby="last_handling_result"/>
                                                <button className="btn btn-outline-success d-print-none" type="button" id="resultBtn"
                                                disabled={data.movement_status === 'received' || data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)} onClick={async () => {
                                                    await func(data.code)
                                                }}><CheckOutlined /></button>
                                            </div>
                                        </td>
                                    </tr>
                                         ))) ||
                                         <tr>
                                            <td colSpan="6" className='h3'><div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                     </div>
                </div>

            </Fragment>
    )
}