import React, {Fragment, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Modal from "./modal";
import axios from "axios";
import Swal from "sweetalert2";
import Url from "../../../config";
import {Context} from "../../../../context";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";


const AddIndividualsDoc = () => {
    const [contract, setContracts] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const context = useContext(Context)
    const date = new DateObject({ calendar: persian})


    const fetchData = async () => {
        const response = await fetch(`${Url}/api/persons/?fields=affidavitStatus,id,type,full_name,expireDate,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument&full_name=${context.formikPersonalSearch.values.full_name}` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setContracts(data)
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
                  'قرارداد حذف شد.',
                  'success',
                  deleteHandler(id),
                )
              }
            })
      }
       const deleteHandler = async (id) => {
          await axios.delete(
            `${Url}/api/persons/${id}` , {
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
           [context.formikPersonalSearch.values.full_name])

    return (
     <Fragment>
            <Modal ModalTitle={context.modalTitle} setEditDocumentIndividuals={context.setEditDocumentIndividuals} editDocumentIndividuals={context.editDocumentIndividuals} idNumber={idNumber} setIdNumber={setIdNumber}/>

             <div className= 'plater  m-2 rounded-3 shadow-lg '>

                <div className= 'd-flex justify-content-end m-4' >
                    <div className= 'd-flex gap-2'>
                      <Link to= '/reportindividualsdoc'><button className= 'btn btn-secondary'>گزارش</button></Link>
                      <button className= 'btn btn-primary' id='modalAddBtn' data-bs-toggle="modal"
                          data-bs-target="#modalMain" onClick={() => context.setModalTitle('add')}>ثبت قرارداد جدید</button>
                    </div>

                </div>
                  <div className="form-check m-4">
                        <input className="form-check-input" type="checkbox" name='expireDate' checked={context.formikPersonalSearch.values.expireDate} onChange={e => e.target.checked ?
                          context.formikPersonalSearch.setFieldValue('expireDate' , true) : context.formikPersonalSearch.setFieldValue('expireDate' , '')}
                        id="clearedCheck"/>
                        <label className="form-check-label" htmlFor="expireDate">
                        قرارداد های پایان یافته
                        </label>
                  </div>

             <div className='m-4'>
                <div className="input-group mb-3">
                    <input type="text" id='searchBox' className="form-control" placeholder="جستجو براساس نام و نشان"
                    aria-label="searchBox" aria-describedby="search" value={context.formikPersonalSearch.values.full_name}
                    onChange={e => context.formikPersonalSearch.setFieldValue('full_name' , e.target.value)}/>
                </div>
             </div>
               <div className='m-4'>
                    <span className="dot" style={{backgroundColor: 'hsl(0, 100%, 80%)'}}></span><span> به معنی تسویه شده و قفل شده</span>
                    <span className="ms-5 dot" style={{backgroundColor: 'hsla(48,100%,50%,0.6)'}}></span><span> به معنی پایان قرارداد</span>
               </div>
            <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                <table className="table table-hover text-center align-middle table-bordered border-primary bg-light" style={{fontSize:'1vw'}}>
                    <thead className= 'bg-light'>
                    <tr>
                        <th scope="col">شماره ثبت</th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">نام و نشانی</th>
                        <th scope="col">شغل</th>
                        <th scope="col">محل کار</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {(contract.length > 0 && contract.filter((value) => {
                                if (context.formikPersonalSearch.values.expireDate){
                                    return date.format().replaceAll('/' , '-') >  value.expireDate
                                }else {
                                    return contract
                                }
                                }).map((data) => (
                        <tr key={data.id} style={{backgroundColor:`${(data.clearedStatus ? 'hsl(0, 100%, 80%)' : null) || ( date.format().replaceAll('/' , '-') >  data.expireDate  ? 'hsla(48,100%,50%,0.6)'  : null) }`}}>
                            <th scope="row">{data.id}</th>
                            <td>{data.type}</td>
                            <td>{data.full_name}</td>
                            <td>{data.job}</td>
                            <td>{data.office}</td>
                            <td>
                                <button id='editBtn' className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" disabled={data.clearedStatus} onClick={() => {
                                    setIdNumber(data.id)
                                    context.setModalTitle('edit')
                                }}><EditOutlined /></button>
                                <button id='deleteBtn' className= 'btn btn-danger ms-2' disabled={data.clearedStatus} onClick={() =>
                                deleteAlert(data.id)}><DeleteOutlined /></button>
                                <button id='doneBtn' className= 'btn btn-info ms-2' disabled={data.clearedStatus} data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                    setIdNumber(data.id)
                                    context.setModalTitle('extension')
                                    context.handleEditDocumentIndividuals()
                                }}>تمدید</button>
                                <button id='doneBtn' className= 'btn btn-success ms-2' disabled={data.clearedStatus && data.receivedDocument && data.affidavitStatus} data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                    setIdNumber(data.id)
                                    context.setModalTitle('done')
                                    context.handleEditDocumentIndividuals()
                                }}>تسویه</button>
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

export default AddIndividualsDoc