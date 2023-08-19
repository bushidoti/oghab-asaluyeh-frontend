import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import Modal from "./modal";
import ObserveModal from "./uploadDocument/observemodal";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import {CustomInputDate} from "../../../App";
import {Toggler} from "./toggler";
import { useReactToPrint } from "react-to-print";
import fixNumbers from '.././persianNumbers'
import Url from "../../config";
import {Context} from "../../../context";
import {CopyOutlined, InfoOutlined, PrinterOutlined} from "@ant-design/icons";

const Report = (props) => {
      const [contract, setContracts] = useState([])
      const [idNumber, setIdNumber] = useState(null)
      const componentPDF= useRef();
      const context = useContext(Context)

    const fetchData = async () => {
        const response = await
        fetch(`${Url}/api/documents/?fields=id,contractNumber,employer,type_form,dateContract,contractPrice,durationContract,prePaidPrice,goodPrice,typeBail1,firstBail,secondBail,commitmentPrice,typeBail2,firstBail2,secondBail2,topicContract,typeContract,clearedDate,receivedDocument,clearedStatus` , {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
        const data = await response.json()
        setContracts(data)
      }

      useEffect(() => {
            void fetchData()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [])



     function handleChange(value){
            context.formik.setFieldValue('dateContract' , value.format("YYYY-MM-DD"))
        }

     const nameFieldHandler = () => {
         if (props.search === 'شماره ثبت'){
             return 'id'
         }else if (props.search === 'شماره قرارداد'){
             return 'contractNumber'
         }else if (props.search === 'موضوع قرارداد'){
             return 'topicContract'
         }else if (props.search === 'نام کارفرما' || props.search === 'نام پیمانکار'){
             return 'employer'
         }
     }
     const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });
    return (
        <Fragment>
            <ObserveModal/>
            <Modal editDocument={context.editDocument} modalTitle={context.modalTitle} docToggle={context.docToggle} setEditDocument={context.setEditDocument} idNumber={idNumber} setIdNumber={setIdNumber}/>

            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                 <div className= 'd-flex  justify-content-between m-4' >
                                 <div className= 'd-flex gap-2'>
                                      <Toggler handleForm={props.handleForm}/>
                                      <div className="form-check ms-4">
                                      <input className="form-check-input" type="checkbox" name='clearedStatus'
                                      checked={context.formik.values.clearedStatus} onChange={e => e.target.checked ?
                                      context.formik.setFieldValue('clearedStatus' , true) : context.formik.setFieldValue('clearedStatus' , '')}
                                      id="clearedCheck"/>
                                      <label className="form-check-label" htmlFor="clearedCheck">
                                      تسویه شده
                                      </label>
                                      </div>
                                 </div>
                            <div className= 'd-flex gap-2'>
                                <button className="btn btn-danger " type="button" id="observeDocs"  data-bs-toggle="modal"
                                data-bs-target="#observModal"><CopyOutlined /></button>
                                <button className="btn btn-outline-secondary" type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                            </div>
                        </div>

                  <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                        <select className="form-select" style={{maxWidth:'20vw' , minWidth:'200px'}} id="searchSelector"  defaultValue=''
                            aria-label="Search Select" onChange={(e) =>
                        {
                          context.formik.setFieldValue('employer' , '')
                          context.formik.setFieldValue('dateContract' , '')
                          context.formik.setFieldValue('typeContract' , '')
                          context.formik.setFieldValue('topicContract' , '')
                          context.formik.setFieldValue('id' , '')
                          context.formik.setFieldValue('contractNumber' , '')
                          props.setSearch(e.target.value)
                            if (props.search !== 'نوع قرارداد' && props.search !== 'تاریخ قرارداد' ) {
                                document.getElementById('searchBox').value = ''
                            }
                        }
                            }>
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            {(() => {
                                if(context.docToggle != null){
                                    return(
                                        <Fragment>
                                                <option value={`نام ${context.docToggle ? "پیمانکار" : "کارفرما"}`}>نام {context.docToggle ? "پیمانکار" : "کارفرما"}</option>
                                                <option value="نوع قرارداد">نوع قرارداد</option>
                                                <option value="شماره ثبت">شماره ثبت</option>
                                                <option value="شماره قرارداد">شماره قرارداد</option>
                                                <option value="تاریخ قرارداد">تاریخ قرارداد</option>
                                                <option value="موضوع قرارداد">موضوع قرارداد</option>
                                        </Fragment>
                                    )
                                }

                            })()}
                        </select>
                        <label htmlFor="searchSelector">جستجو براساس</label>
                  </div>

                  <div className='m-4'>
                        {(() => {
                            if (props.search === 'تاریخ قرارداد') {
                              return (
                                <DatePicker
                                     animations={[transition()]}
                                     render={<CustomInputDate  ids={"dateContract"} names='clearedDatePicker' label='تاریخ قرارداد'/>}
                                     id="dateContract"
                                     name='dateContract'
                                     onChange={handleChange}
                                     calendar={persian}
                                     onOpenPickNewDate={false}
                                     locale={persian_fa}
                                 />
                              )
                            } else if (props.search === 'نوع قرارداد') {
                                    return (
                                        <div className="col-2 form-floating" style={{maxWidth:'255px'}}>
                                            <input className="form-control" type='search' list="typeContractList" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                                   name='typeContract' onChange={(e) => {
                                                    context.formik.setFieldValue('typeContract' , e.target.value)
                                            }} id="typeContract" placeholder="اجاره"/>
                                            <label htmlFor="typeContract">نوع قرارداد</label>
                                            <datalist id="typeContractList">
                                                <option value="خرید قطعات نظامی"/>
                                                <option value="اجاره"/>
                                                <option value="هندلینگ"/>
                                                <option value="آموزش"/>
                                                <option value="عمرانی"/>
                                                <option value="پلیس"/>
                                                <option value="سپاه"/>
                                                <option value="بیمه"/>
                                            </datalist>
                                        </div>
                                    )
                                } else {
                                    return (
                                         <div className="input-group mb-3">
                                             <input type="search" className="form-control" onChange={(e) => {
                                                    context.formik.setFieldValue(nameFieldHandler() , e.target.value)
                                            }} placeholder={`جستجو براساس ${props.search}`}
                                             aria-label="searchBox" id='searchBox' aria-describedby="searchBox"/>
                                         </div>
                                    )
                                }
                        })()}
                  </div>
                {context.docToggle === null ? null :
                    <div className='m-4 table-responsive text-nowrap rounded-3'  style={{maxHeight: '50vh'}}>
                        <table ref={componentPDF}
                        className="table table-hover table-fixed text-center align-middle table-striped table-bordered border-primary bg-light" style={{direction:'rtl' , fontSize:'1vw'}}>
                            <thead className='bg-light'>
                            <tr>
                                <th scope="col">ردیف</th>
                                <th scope="col">شماره ثبت</th>
                                <th scope="col">شماره قرارداد</th>
                                <th scope="col">نام {context.docToggle ? "پیمانکار" : "کارفرما"}</th>
                                <th scope="col">موضوع قرارداد</th>
                                <th scope="col">نوع قرارداد</th>
                                <th scope="col">تایخ قرارداد</th>
                                <th scope="col">مبلغ قرارداد</th>
                                <th scope="col">مبلغ پیش پرداخت</th>
                                <th scope="col">مدت قرارداد</th>
                                <th scope="col">مبلغ حسن انجام کار</th>
                                <th scope="col">نوع ضمانت</th>
                                <th scope="col">مشخصه ضمانت</th>
                                <th scope="col">مبلغ تعهد انجام کار</th>
                                <th scope="col">نوع ضمانت</th>
                                <th scope="col">مشخصه ضمانت</th>
                                <th className='d-print-none' scope="col">نمایش</th>
                            </tr>
                            </thead>

                            <tbody>
                                {(contract.length > 0 && contract.filter((contract) => {
                                                    if (context.formik.values.employer){
                                                        return contract.type_form === context.docToggle && contract.employer === String(context.formik.values.employer)
                                                    }else if (context.formik.values.typeContract){
                                                        return contract.type_form === context.docToggle && contract.typeContract === String(context.formik.values.typeContract)
                                                    }else if (context.formik.values.id){
                                                        return contract.type_form === context.docToggle && contract.id === Number(context.formik.values.id)
                                                    }else if (context.formik.values.contractNumber){
                                                        return contract.type_form === context.docToggle && contract.contractNumber === String(context.formik.values.contractNumber)
                                                    }else if (context.formik.values.topicContract){
                                                        return contract.type_form === context.docToggle && contract.topicContract === String(context.formik.values.topicContract)
                                                    }else if (context.formik.values.clearedStatus){
                                                        return contract.type_form === context.docToggle && contract.clearedStatus === String(context.formik.values.clearedStatus)
                                                    }else if (context.formik.values.dateContract){
                                                        return contract.type_form === context.docToggle && contract.dateContract === fixNumbers(context.formik.values.dateContract)
                                                    }else {
                                                        return contract.type_form === context.docToggle
                                                    }
                                          }).map((data,i) => (
                                    <tr key={data.id}>
                                        <th scope="row">{i+1}</th>
                                        <td>{data.id}</td>
                                        <td>{data.contractNumber}</td>
                                        <td>{data.employer}</td>
                                        <td>{data.topicContract}</td>
                                        <td>{data.typeContract}</td>
                                        <td>{data.dateContract}</td>
                                        <td>{data.contractPrice}</td>
                                        <td>{data.prePaidPrice}</td>
                                        <td>{data.durationContract}</td>
                                        <td>{data.goodPrice}</td>
                                        <td>{data.typeBail1}</td>
                                        <td>{data.firstBail} _ {data.secondBail}</td>
                                        <td>{data.commitmentPrice}</td>
                                        <td>{data.typeBail2}</td>
                                        <td>{data.firstBail2} _ {data.secondBail2}</td>
                                        <td className='d-print-none'>
                                            <button className='btn btn-warning' id='infoBtn'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalMain" onClick={() => {
                                                context.handleEditDocument()
                                                setIdNumber(data.id)
                                                context.setModalTitle('visit')
                                            }}><InfoOutlined /></button>
                                    </td>
                                </tr>
                            ))) ||

                          <tr>
                            <td colSpan="17" className='h3'><div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div></td>
                          </tr>

                                    }

                            </tbody>
                        </table>
                    </div>
                }
            </div>


        </Fragment>

        )
}



export default Report