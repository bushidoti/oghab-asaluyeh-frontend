import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import Modal from "./modal";
import ObserveModal from "./observemodal";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInputDate} from "../../../../App";
import {useReactToPrint} from "react-to-print";
import options from "../../date-option"
import fixNumbers from "../../persianNumbers"
import Url from "../../../config";
import {Context} from "../../../../context";
import {CopyOutlined, InfoOutlined, PrinterOutlined} from "@ant-design/icons";

const ReportIndividualsDoc = () => {
    const [search , setSearch] = useState('')
    const [contract, setContracts] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const componentPDF= useRef();
    const context = useContext(Context)

    const fetchData = async () => {
        const response = await
        fetch(`${Url}/api/persons/?fields=id,type,full_name,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument&full_name=${context.formikPersonalSearch.values.full_name}
        &sex=${context.formikPersonalSearch.values.sex}&id=${context.formikPersonalSearch.values.id}&office=${context.formikPersonalSearch.values.office}
        &date=${fixNumbers(context.formikPersonalSearch.values.date)}&national_id=${context.formikPersonalSearch.values.national_id}
        &clearedStatus=${context.formikPersonalSearch.values.clearedStatus}&type=${context.formikPersonalSearch.values.type}&job=${context.formikPersonalSearch.values.job}` , {
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
          [context.formikPersonalSearch.values])

      function handleChange(value){
            context.formikPersonalSearch.setFieldValue('date' , value.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }



        const nameFieldHandler = () => {
         if (search === 'شماره ثبت'){
             return 'id'
         }else if (search === 'نام و نشان'){
             return 'full_name'
         }else if (search === 'وضعیت'){
             return 'type'
         }else if (search === 'جنسیت'){
             return 'sex'
         }else if (search === 'کد ملی'){
             return 'national_id'
         }else if (search === 'محل کار'){
             return 'office'
         }else if (search === 'شغل'){
             return 'job'
         }else if (search === 'تاریخ استخدام'){
             return 'date'
         }
     }

     const generatePDF= useReactToPrint({

        content: ()=>componentPDF.current,
        documentTitle:"Data",
     });

    return (
        <Fragment>
            <ObserveModal/>
            <Modal editDocumentIndividuals={context.editDocumentIndividuals}  setEditDocumentIndividuals={context.setEditDocumentIndividuals} ModalTitle={context.modalTitle} idNumber={idNumber} setIdNumber={setIdNumber}/>

            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                 <div className= 'd-flex  justify-content-end m-4' >
                    <div className= 'd-flex gap-2'>
                        <button className="btn btn-danger " type="button" id="observeDocModal"
                        data-bs-toggle="modal" data-bs-target="#observModal"><CopyOutlined /></button>
                        <button className="btn btn-outline-secondary" type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                    </div>
                 </div>

                <div className='d-flex gap-2 align-items-center'>
                  <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                    <select className="form-select" id="searchSelect" defaultValue='' style={{maxWidth:'20vw' , minWidth:'200px'}}
                        aria-label="Floating label select example"  onChange={(e) =>
                        {
                          context.formikPersonalSearch.setFieldValue('full_name' , '')
                          context.formikPersonalSearch.setFieldValue('date' , '')
                          context.formikPersonalSearch.setFieldValue('id' , '')
                          context.formikPersonalSearch.setFieldValue('national_id' , '')
                          context.formikPersonalSearch.setFieldValue('job' , '')
                          context.formikPersonalSearch.setFieldValue('sex' , '')
                          context.formikPersonalSearch.setFieldValue('type' , '')
                          context.formikPersonalSearch.setFieldValue('office' , '')

                          setSearch(e.target.value)
                            if (search !== 'جنسیت' && search !== 'وضعیت' && search !== 'تاریخ استخدام' && search !== 'محل کار') {
                                document.getElementById('searchBoxPersonal').value = ''
                            }
                        }
                            }>
                        <option value='' disabled>یک مورد انتخاب کنید</option>
                        <option value="نام و نشان">نام و نشان</option>
                        <option value="شماره ثبت">شماره ثبت</option>
                        <option value="وضعیت">وضعیت</option>
                        <option value="جنسیت">جنسیت</option>
                        <option value="کد ملی">کد ملی</option>
                        <option value="محل کار">محل کار</option>
                        <option value="شغل">شغل</option>
                        <option value="تاریخ استخدام">تاریخ استخدام</option>
                    </select>
                    <label htmlFor="searchSelect">جستجو براساس</label>
                  </div>
                  <div className="form-check ms-4">
                    <input className="form-check-input" type="checkbox" name='clearedStatus' checked={context.formikPersonalSearch.values.clearedStatus} onChange={e => e.target.checked ?
                      context.formikPersonalSearch.setFieldValue('clearedStatus' , true) : context.formikPersonalSearch.setFieldValue('clearedStatus' , '')}
                    id="clearedCheck"/>
                    <label className="form-check-label" htmlFor="clearedCheck">
                    تسویه شده
                    </label>
                  </div>
                </div>

                <div className='m-4'>
                       {(() => {
                                 if (search === 'تاریخ استخدام') {
                                     return (
                                         <div>
                                             <DatePicker
                                                 animations={[transition()]}
                                                 render={<CustomInputDate ids={"clearedDatePicker"} names='date' label='تاریخ استخدام' />}
                                                 id="clearedDatePicker"
                                                 name='date'
                                                 onChange={handleChange}
                                                 onOpenPickNewDate={false}
                                                 calendar={persian}
                                                 locale={persian_fa}
                                             />
                                        </div>
                                     )
                                 }else if (search === 'جنسیت'){
                                     return (
                                            <div className="form-floating  col-2" style={{maxWidth:'255px'}}>
                                                <select className="form-select" id="sexSelector" defaultValue=''
                                                    style={{maxWidth:'20vw' , minWidth:'200px'}} onChange={(e) => {
                                                    context.formikPersonalSearch.setFieldValue('sex' , e.target.value)
                                            }} name='sex' aria-label="Floating label select example">
                                                    <option value='' disabled>یک مورد انتخاب کنید</option>
                                                    <option value="مونث">مونث</option>
                                                    <option value="مذکر">مذکر</option>
                                                </select>
                                                <label htmlFor="sexSelector">جنسیت</label>
                                            </div>

                                     )

                                 }else if (search === 'محل کار'){
                                     return (
                                            <div className="col-2 form-floating" style={{maxWidth:'255px'}}>
                                                    <input className="form-control" type='search' list="workLocationList" id="workLocation" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                                    onChange={(e) => {
                                                    context.formikPersonalSearch.setFieldValue('office' , e.target.value)
                                                    }} name='office' placeholder="جاسک" required/>
                                                    <label htmlFor="workLocation">محل کار</label>
                                                    <datalist id="workLocationList">
                                                                <option value="جاسک"/>
                                                                <option value="اورهال تهران"/>
                                                                <option value="اورهال اصفهان"/>
                                                                <option value="دفتر مرکزی"/>
                                                                <option value="دزفول"/>
                                                                <option value="بیشه کلا"/>
                                                                <option value="چابهار"/>
                                                    </datalist>
                                            </div>
                                     )}else if (search === 'وضعیت'){
                                         return (
                                              <div className="form-floating  col-2" style={{maxWidth:'255px'}}>
                                                    <select className="form-select" defaultValue='' id="typeSelector" style={{maxWidth:'20vw' , minWidth:'200px'}} onChange={(e) => {
                                                    context.formikPersonalSearch.setFieldValue('type' , e.target.value)
                                                    }} name='type' aria-label="Floating label select example">
                                                        <option value='' disabled>یک مورد انتخاب کنید</option>
                                                        <option value="قراردادی">قراردادی</option>
                                                        <option value="بیمه ای">بیمه ای</option>
                                                    </select>
                                                    <label htmlFor="typeSelector">وضعیت</label>
                                                </div>
                                         )}else {
                                                return (
                                                  <div className="input-group mb-3">
                                                    <input type="search" id='searchBoxPersonal' className="form-control" onChange={(e) => {
                                                    context.formikPersonalSearch.setFieldValue(nameFieldHandler() , e.target.value)
                                                   }} placeholder={`جستجو براساس ${search}`} aria-label="searchBox" aria-describedby="searchBox"/>
                                                  </div>
                                                 )
                                             }
                                  })()}
                </div>
                       <div className='m-4'>
                            <span className="dot bg-danger"></span><span> به معنی تسویه شده و قفل شده</span>
                       </div>
                <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                    <table className="table table-hover table-fixed text-center align-middle table-bordered border-primary bg-light"
                           ref={componentPDF} style={{direction:'rtl' , fontSize:'1vw'}}>
                         <thead className= 'bg-light'>
                            <tr>
                                <th scope="col">ردیف</th>
                                <th scope="col">شماره ثبت</th>
                                <th scope="col">وضعیت</th>
                                <th scope="col">نام و نشان</th>
                                <th scope="col">جنسیت</th>
                                <th scope="col">تاریخ استخدام</th>
                                <th scope="col">کد ملی</th>
                                <th scope="col">محل کار</th>
                                <th scope="col">شغل</th>
                                <th scope="col">تضمین مصوب</th>
                                <th scope="col">مبلغ تضمین</th>
                                <th scope="col">وثیقه تضمین</th>
                                <th scope="col">مشخصه وثیقه</th>
                                <th scope="col">وضعیت تسویه</th>
                                <th scope="col">تاریخ تسویه</th>
                                <th scope="col">وضعیت مدرک</th>
                                <th scope="col" className='d-print-none'>نمایش</th>
                            </tr>
                         </thead>

                        <tbody>
                            {(contract.length > 0 && contract.map((data,i) => (
                                <tr key={data.id} style={{backgroundColor:`${(data.clearedStatus ? 'hsl(0, 100%, 80%)' : null) }`}}>
                                    <th scope="row">{i+1}</th>
                                    <td>{data.id}</td>
                                    <td>{data.type}</td>
                                    <td>{data.full_name}</td>
                                    <td>{data.sex}</td>
                                    <td>{data.date}</td>
                                    <td>{data.national_id}</td>
                                    <td>{data.office}</td>
                                    <td>{data.job}</td>
                                    <td>{data.approvedPrice}</td>
                                    <td>{data.commitmentPrice}</td>
                                    <td>{data.typeBail}</td>
                                    <td>{data.firstBail} _ {data.secondBail}</td>
                                    <td>{data.clearedStatus ? 'تسویه شده' : 'تسویه نشده'}</td>
                                    <td>{data.clearedDate}</td>
                                    <td>{data.receivedDocument ? 'تحویل داده شده' : 'تحویل داده نشده'}</td>
                                    <td className='d-print-none'>
                                        <button className= 'btn btn-warning'  data-bs-toggle="modal" id='infoModalBtn' data-bs-target="#modalMain"
                                        onClick={() => {
                                            context.handleEditDocumentIndividuals()
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
            </div>


        </Fragment>

        )
}

export default ReportIndividualsDoc