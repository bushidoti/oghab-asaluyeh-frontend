import React, {Fragment, useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import Modal from "./modal";
import axios from "axios";
import Swal from "sweetalert2";
import Url from "../../../config";
import {Context} from "../../../../context";
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";

const AddPropertyDoc = (props) => {
    const [property, setProperties] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const context = useContext(Context)

    const fetchData = async () => {
        if (context.formikPropertySearch.values.docNumber !== null){
            const response = await fetch(`${Url}/api/properties/?fields=id,typeProperty,type_form,name,docNumber,plateMotor,addressChassis,landlord,modelMeter,madeOf,part1plate,part2plate,part3plate,cityPlate,descriptionLocation,paperDoc,insurancePaper,gasCard,carCard,description,soldDate,buyer,soldStatus&docNumber=${context.formikPropertySearch.values.docNumber}` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setProperties(data)
        }

    }

    const deleteAlert = (id) => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `امکان بازگشت داده با شماره ثبت ${id} وجود نخواهد داشت`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, پاکش کن!'
            }).then((result) => {
              if (result.isConfirmed) {

                Swal.fire(
                  'حذف شد!',
                  'اموال حذف شد.',
                  'success',
                  deleteHandler(id),
                )
              }
            })
      }

      const deleteHandler = async (id) => {
        await axios.delete(
            `${Url}/api/properties/${id}` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              }
          )
            await fetchData()
        }

      useEffect(() => {
            void fetchData()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [context.formikPropertySearch.values.docNumber])

    return (
        <Fragment>
            <Modal propToggle={context.propertyToggle} setEditProperty={context.setEditProperty} editProperty={context.editProperty} ModalTitle={context.modalTitle} idNumber={idNumber} setIdNumber={setIdNumber}/>

        <div className= 'plater  m-2 rounded-3 shadow-lg '>
                    <div className= 'd-flex justify-content-between m-4' >
                        <div className= 'd-flex gap-2'>
                            <div className='d-flex gap-2'>
                                <div className="form-check">
                                    <input className="form-check-input" value='منقول' type="radio"
                                    name="flexRadioDefault" id="manghol" onChange={props.handleFormProp}/>
                                    <label className="form-check-label" htmlFor="manghol">
                                    منقول
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" value='غیر منقول' type="radio"
                                    name="flexRadioDefault" id="gheirManghol" onChange={props.handleFormProp} />
                                    <label className="form-check-label" htmlFor="gheirManghol">
                                    غیر منقول
                                    </label>
                                </div>
                        </div>
                    </div>

                        <div className= 'd-flex gap-2'>
                          <Link to= '/reportpropertydoc'><button className= 'btn btn-secondary'>گزارش</button></Link>
                          <button className= 'btn btn-primary' id='addDocument' data-bs-toggle="modal"
                          data-bs-target="#modalMain" disabled={context.propertyToggle === null} onClick={() => context.setModalTitle('add')}>ثبت سند جدید</button>
                        </div>

                    </div>

            <div className='m-4'>
                <div className="input-group mb-3">
                    <input type="text" id='searchBox' className="form-control" placeholder="جستجو براساس شماره سند"
                    aria-label="searchBox" aria-describedby="search" value={context.formikPropertySearch.values.docNumber}
                    onChange={e => context.formikPropertySearch.setFieldValue('docNumber' , e.target.value)}/>
                </div>
            </div>
               <div className='m-4'>
                    <span className="dot bg-danger"></span><span> به معنی فروخته شده و قفل شده</span>
               </div>
            {context.propertyToggle === null ?  null :
                <Fragment>
                    <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                        <table className="table table-hover text-center align-middle table-bordered border-primary bg-light" style={{direction:'rtl' , fontSize:'1vw'}}>
                            <thead className= 'bg-light'>
                            <tr>
                                <th scope="col">شماره ثبت</th>
                                <th scope="col">نوع</th>
                                <th scope="col">شماره سند</th>
                                {context.propertyToggle ?
                                         <Fragment>
                                            <th scope="col">نام</th>
                                            <th scope="col">آدرس</th>
                                         </Fragment>
                                    :
                                         <Fragment>
                                            <th scope="col">سیستم</th>
                                            <th scope="col">محل استقرار</th>
                                         </Fragment>
                                }
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(property.length > 0 && property.filter(property => property.type_form === !context.propertyToggle).map((data) => (
                            <tr key={data.id} style={{backgroundColor:`${(data.soldStatus ? 'hsl(0, 100%, 80%)' : null) }`}}>
                                <th scope="row">{data.id}</th>
                                <td>{data.typeProperty}</td>
                                <td>{data.docNumber}</td>
                                <td>{data.name}</td>
                                <td>{!context.propertyToggle ? data.descriptionLocation : data.addressChassis }</td>
                                <td>
                                    <button id='editBtn' className= 'btn btn-warning' disabled={data.soldStatus}
                                     data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                     context.setModalTitle('edit')
                                     setIdNumber(data.id)
                                     }}><EditOutlined /></button>
                                    <button id='deleteBtn' className= 'btn btn-danger ms-2' disabled={data.soldStatus} onClick={() =>
                                    deleteAlert(data.id)} ><DeleteOutlined /></button>
                                    <button id='sellBtn' className= 'btn btn-success ms-2' disabled={data.soldStatus}
                                    data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                    setIdNumber(data.id)
                                    context.setModalTitle('done')
                                    context.handleEditProperty()
                                    }}><CheckOutlined /></button>
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
                </Fragment>
            }

        </div>

        </Fragment>
    )
}

export default AddPropertyDoc