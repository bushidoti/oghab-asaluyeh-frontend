import React, {Fragment, useContext, useEffect, useState} from "react";
import Modal from "./modal";
import {Link} from "react-router-dom";
import {Toggler} from "./toggler";
import axios from "axios";
import Swal from "sweetalert2";
import Url from "../../config";
import Table from 'react-bootstrap/Table';
import {Context} from "../../../context";
import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";

const Main = (props) => {
    const [contract, setContracts] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const context = useContext(Context)

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/documents/?fields=id,contractNumber,employer,type_form,dateContract,contractPrice,durationContract,prePaidPrice,goodPrice,typeBail1,firstBail,secondBail,commitmentPrice,typeBail2,firstBail2,secondBail2,topicContract,typeContract,clearedDate,receivedDocument,clearedStatus`, {
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
            `${Url}/api/documents/${id}`, {
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
          [])




    return (
        <Fragment>
            <Modal docToggle={context.docToggle} editDocument={context.editDocument} setEditDocument={context.setEditDocument}  modalTitle={context.modalTitle} idNumber={idNumber} setIdNumber={setIdNumber}/>
        <div className= 'plater  m-2 rounded-3 shadow-lg'>
            <div className= 'd-flex justify-content-between m-4' >
                <Toggler handleForm={props.handleForm}/>
                <div className= 'd-flex gap-2'>
                <Link to= '/report'><button id='reportBtn' className= 'btn btn-secondary'>گزارش</button></Link>
                <button className= 'btn btn-primary' id='registrationBtnModal' disabled={context.docToggle === null} data-bs-toggle="modal" data-bs-target="#modalMain"
                        onClick={() => context.setModalTitle('add')}>ثبت قرارداد جدید</button>
                </div>
            </div>

            <div className='m-4'>
                <div className="input-group mb-3">
                    <input type="text"  id='searchBox' className="form-control" value={context.formik.values.employer}
                    onChange={e => context.formik.setFieldValue('employer' , e.target.value)} placeholder={`جستجو براساس نام ${context.docToggle ? "پیمانکار" : "کارفرما"}`}
                    aria-label="searchBox" aria-describedby="search" />
                </div>
            </div>
            {context.docToggle === null ?  null :
                <Fragment>
                    <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                            <Table striped bordered hover className="text-center align-middle border-primary bg-light" style={{fontSize:'1vw'}}>
                                <thead className= 'bg-light'>
                                <tr>
                                    <th scope="col">شماره ثبت</th>
                                    <th scope="col">شماره قرارداد</th>
                                    <th scope="col">نام {context.docToggle ? "پیمانکار" : "کارفرما"}</th>
                                    <th scope="col">موضوع قرارداد</th>
                                    <th scope="col">مبلغ قرارداد</th>
                                    <th scope="col">تاریخ</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {(contract.length > 0 && contract.filter((contract) => {
                                                    if (context.formik.values.employer){
                                                        return contract.type_form === context.docToggle && contract.employer === String(context.formik.values.employer)
                                                    }else {
                                                        return contract.type_form === context.docToggle
                                                    }
                                          }).map((data) => (
                                        <tr key={data.id}>
                                            <th scope="row">{data.id}</th>
                                            <td>{data.contractNumber}</td>
                                            <td>{data.employer}</td>
                                            <td>{data.topicContract}</td>
                                            <td>{data.contractPrice}</td>
                                            <td>{data.dateContract}</td>
                                            <td>
                                                <button id='editBtn' className= 'btn btn-warning'  data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                    context.setModalTitle('edit')
                                                    setIdNumber(data.id)
                                                }}><EditOutlined /></button>
                                                <button id='deleteBtn' className= 'btn btn-danger ms-2' onClick={() =>
                                                  deleteAlert(data.id)
                                                }><CloseOutlined /></button>
                                                <button id='doneBtn' className= 'btn btn-success ms-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                setIdNumber(data.id)
                                                context.setModalTitle('done')
                                                context.handleEditDocument()
                                                }}><CheckOutlined /></button>
                                            </td>
                                        </tr>
                                        ))) ||
                                        <tr>
                                            <td colSpan="7" className='h3'><div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div></td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                </Fragment>
            }

        </div>

        </Fragment>

    )
}

export default Main