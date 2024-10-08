import React, {Fragment, useEffect, useState} from "react";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInputDate} from "../../../../App";
import { NumericFormat } from 'react-number-format';
import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import options from "../../date-option"
import Url from "../../../config";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import fixNumbers from "../../persianNumbers";
import DateObject from "react-date-object";

const Modal = (props) => {
    const [contract, setContracts] = useState([])
    const [lastID, setLastID] = useState([])
    const date = new DateObject({ calendar: persian, locale: persian_fa })


    const formik = useFormik({
    initialValues: {
      id: contract.id || 1,
      type: contract.type || '',
      full_name: contract.full_name || '',
      date: contract.date || '',
      extension:  '',
      expireDate: contract.expireDate || '',
      national_id: contract.national_id || '',
      sex: contract.sex || '',
      office: contract.office || '',
      job: contract.job || '',
      approvedPrice: contract.approvedPrice || '',
      commitmentPrice: contract.commitmentPrice || '',
      caseNumber: contract.caseNumber || '',
      typeBail: contract.typeBail || '',
      firstBail: contract.firstBail || '',
      secondBail: contract.secondBail || '',
      clearedStatus: contract.clearedStatus || '',
      clearedDate: contract.clearedDate || null,
      receivedDocument: contract.receivedDocument || '',
      affidavitStatus: contract.affidavitStatus || '',
    },
    enableReinitialize: true,
    });

     function refreshPage() {
        formik.setFieldValue('type' , '')
        formik.setFieldValue('full_name' , '')
        formik.setFieldValue('date' , '')
        formik.setFieldValue('expireDate' , '')
        formik.setFieldValue('national_id' , '')
        formik.setFieldValue('sex' , '')
        formik.setFieldValue('office' , '')
        formik.setFieldValue('job' , '')
        formik.setFieldValue('approvedPrice' , '')
        formik.setFieldValue('commitmentPrice' , '')
        formik.setFieldValue('caseNumber' , '')
        formik.setFieldValue('typeBail' , '')
        formik.setFieldValue('firstBail' , '')
        formik.setFieldValue('secondBail' , '')
        formik.setFieldValue('clearedStatus' , '')
        formik.setFieldValue('clearedDate' , '')
        formik.setFieldValue('receivedDocument' , '')
        props.setIdNumber('*')
        props.setEditDocumentIndividuals(false)
      }

    const postHandler = async () => {
          await axios.post(
            `${Url}/api/persons/`,
              {
              type: formik.values.type,
              full_name: formik.values.full_name,
              caseNumber: formik.values.caseNumber,
              date: formik.values.date,
              national_id: fixNumbers(formik.values.national_id),
              sex: formik.values.sex,
              expireDate: formik.values.expireDate,
              office: formik.values.office,
              job: formik.values.job,
              approvedPrice: formik.values.approvedPrice,
              commitmentPrice: formik.values.commitmentPrice,
              typeBail: formik.values.typeBail,
              firstBail: formik.values.firstBail,
              secondBail: formik.values.secondBail,
         }, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                            alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 201) {
                            postAlert()
                            setTimeout(
                                refreshPages, 3000)
                        }
                    }

                })

        }
      const alert= (code) => {
            Swal.fire({
                  icon: 'error',
                  title: `کد ارور ${code}`,
                  text: 'لطفا تمام فیلد های مورد نیاز را بصورت صحیح پر کنید.',
                })
    }

    const putHandler = async () => {
         await axios.put(
            `${Url}/api/persons/${props.idNumber}/`,
              {
              type: formik.values.type,
              full_name: formik.values.full_name,
              caseNumber: formik.values.caseNumber,
              date: formik.values.date,
              national_id: fixNumbers(formik.values.national_id),
              sex: formik.values.sex,
              office: formik.values.office,
              job: formik.values.job,
              approvedPrice: formik.values.approvedPrice,
              commitmentPrice: formik.values.commitmentPrice,
              expireDate: formik.values.expireDate,
              typeBail: formik.values.typeBail,
              firstBail: formik.values.firstBail,
              secondBail: formik.values.secondBail,
              clearedStatus: formik.values.clearedStatus,
              clearedDate: formik.values.clearedDate,
              receivedDocument: formik.values.receivedDocument,
         }, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        setTimeout(
                    refreshPages, 3000)
        }
    const putHandlerCleared = async () => {
          await axios.put(
            `${Url}/api/persons/${props.idNumber}/`,
              {
              type: formik.values.type,
              full_name: formik.values.full_name,
              caseNumber: formik.values.caseNumber,
              date: formik.values.date,
              national_id: fixNumbers(formik.values.national_id),
              sex: formik.values.sex,
              office: formik.values.office,
              job: formik.values.job,
              approvedPrice: formik.values.approvedPrice,
              commitmentPrice: formik.values.commitmentPrice,
              typeBail: formik.values.typeBail,
              expireDate: formik.values.expireDate,
              firstBail: formik.values.firstBail,
              secondBail: formik.values.secondBail,
              clearedStatus: true,
              clearedDate: formik.values.clearedDate,
              receivedDocument: formik.values.receivedDocument,
              affidavitStatus: formik.values.receivedDocument,

         }, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        setTimeout(
                    refreshPages, 3000)
        }

      const putHandlerExtension = async () => {
          await axios.put(
            `${Url}/api/persons/${props.idNumber}/`,
              {
              type: formik.values.type,
              full_name: formik.values.full_name,
              caseNumber: formik.values.caseNumber,
              date: formik.values.date,
              national_id: fixNumbers(formik.values.national_id),
              sex: formik.values.sex,
              office: formik.values.office,
              job: formik.values.job,
              approvedPrice: formik.values.approvedPrice,
              commitmentPrice: formik.values.commitmentPrice,
              typeBail: formik.values.typeBail,
              expireDate: formik.values.expireDate,
              firstBail: formik.values.firstBail,
              secondBail: formik.values.secondBail,
              extended: true,
              extension: formik.values.extension,

         }, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        setTimeout(
                    refreshPages, 3000)
        }
    const putAlertCleared = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: ` آیا از تسویه قرارداد ${formik.values.full_name} مطمئنید ؟ `,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, تسویه کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'تسویه شد!',
                  'قرارداد تسویه شد.',
                  'success',
                  putHandlerCleared(),

                )
              }
            })
         }

      const putAlertExtension = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: ` آیا از تسویه قرارداد ${formik.values.full_name} مطمئنید ؟ `,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, تمدید کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'تمدید شد!',
                  'قرارداد تمدید شد.',
                  'success',
                  putHandlerExtension(),

                )
              }
            })
         }

      const putAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: ` آیا از ویرایش قرارداد ${formik.values.full_name} مطمئنید ؟ `,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, ویرایش کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'ویرایش شد!',
                  'قرارداد ویرایش شد.',
                  'success',
                  'ok',
                  putHandler(),
                )
              }
            })
      }

      const postAlert = () => {
                Swal.fire(
                  'ثبت شد!',
                  'قرارداد ثبت شد.',
                  'success',
                  'ok',
                )
      }


    function handleChange(value){
            formik.setFieldValue('date' , fixNumbers(value.format().replaceAll('/' , '-')))

        }

        function handleChangeExpire(value){
            formik.setFieldValue('expireDate' , fixNumbers(value.format().replaceAll('/' , '-')))

        }

    function handleChangeClear(value){
            formik.setFieldValue('clearedDate' , fixNumbers(value.format().toLocaleDateString('fa-IR', options).replaceAll('/' , '-')))
        }



      const fetchData = async () => {
        if (props.idNumber){
            const response = await fetch(`${Url}/api/persons/${props.idNumber}/?fields=id,affidavitStatus,type,extension,expireDate,caseNumber,full_name,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setContracts(data)
        }
      }

      const fetchLastData = async () => {
        const response = await fetch(`${Url}/api/persons/?fields=id,affidavitStatus,type,full_name,caseNumber,extension,expireDate,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setLastID(data)

      }
      useEffect(() => {
            void fetchData()
            void fetchLastData()

          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [props.idNumber])
    const handleSubmit = () => {
        if (props.ModalTitle === 'edit'){
            return putAlert
        }else if (props.ModalTitle === 'done'){
            return putAlertCleared
        }else if (props.ModalTitle === 'extension'){
            return putAlertExtension
        }else {
            return postHandler

        }
    }
   function refreshPages() {
        window.location.reload();
      }
    const [isCommitmentPriceEmpty , setIsCommitmentPriceEmpty] = useState('')
    const [isTypeBail1Empty , setIsTypeBail1Empty] = useState('')

    let firstBail = ''
    let secondBail = ''

    const handleLabelBails1 = () => {
        if (isTypeBail1Empty === 'چک'){
            firstBail = 'شماره چک'
            secondBail = 'بانک'
        } else if (isTypeBail1Empty === 'نقد'){
            firstBail = 'واریز به حساب'
            secondBail = 'شماره حساب'
        }else if (isTypeBail1Empty === 'سفته'){
            firstBail = 'تعداد سفته'
            secondBail = 'مبلغ سفته'
        }else if (isTypeBail1Empty === 'بانک'){
            firstBail = 'ضمانت'
            secondBail = 'شماره تضمین'
        }else if (isTypeBail1Empty === 'تعهد'){
            firstBail = 'موضوع تعهد'
            secondBail = 'شماره تعهد'
        }

    }
    (function () {
                  // Fetch all the forms we want to apply custom Bootstrap validation styles to
                const forms = document.querySelectorAll('form');
                // Loop over them and prevent submission
                  Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                      form.addEventListener('click', function (event) {
                        if (!form.checkValidity()) {
                          event.preventDefault()
                        }

                        form.classList.add('was-validated')
                      }, false)
                    })
                })()
     const handleExtension = (value) => {
        if (value === 'سه ماه'){
            date.add(3, "month");
            formik.setFieldValue('expireDate' , date.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }else  if (value === 'شش ماه'){
            date.add(6, "month");
            formik.setFieldValue('expireDate' , date.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }else  if (value === 'یک سال'){
            date.add(1, "year");
            formik.setFieldValue('expireDate' , date.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }
    }
    handleLabelBails1()

  return (
      <Fragment>
             <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="modalMain" tabIndex="-1" aria-labelledby="modalMainLabel"
             aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {(() => {
                                       if (props.ModalTitle === 'edit'){
                                            return (
                                                'ویرایش مدرک'
                                            )
                                        }else if (props.ModalTitle === 'done'){
                                            return (
                                                'تسویه قرارداد'
                                            )
                                        }else if (props.ModalTitle === 'add'){
                                            return (
                                                'ثبت قرارداد'
                                            )
                                        }else if (props.ModalTitle === 'visit'){
                                            return (
                                                'نمایش اطلاعات'
                                            )
                                        }else if (props.ModalTitle === 'extension'){
                                            return (
                                                'تمدید قرارداد'
                                            )
                                        }

                                })()}
                            </h1>
                            <button type="button" className="btn-close " data-bs-dismiss="modal"
                            aria-label="Close" onClick={refreshPage}></button>
                        </div>

                    <form className='needs-validation' noValidate>
                        <div className="container modal-body">

                            <div className="form-floating justify-content-center mb-5">
                                <input type="text" id="numberId" value={props.ModalTitle === 'add' && lastID.length !==0 ? lastID.slice(-1)[0].id + 1 :formik.values.id} className="w-25 form-control" aria-label="Username"
                                aria-describedby="basic-addon1" disabled required/>
                                <label  htmlFor="numberId">شماره ثبت</label>
                            </div>

                            <div className='d-flex gap-2'>
                                      <div className="form-floating" style={{maxWidth:'200px'}}>
                                            <select className="form-select" id="situationSelector" style={{minWidth:'185px' , maxWidth:'20vw'}}
                                            aria-label="situationSelector" disabled={props.editDocumentIndividuals} name='type' value={formik.values.type}
                                            onChange={formik.handleChange}>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="قراردادی">قراردادی</option>
                                                <option value="بیمه ای">بیمه ای</option>
                                            </select>
                                            <label htmlFor="situationSelector">وضعیت</label>
                                             <div className="invalid-feedback">
                                            لطفا وضعیت  را انتخاب کنید.
                                            </div>
                                      </div>

                                      <div className="col form-floating mb-3">
                                            <input type="text" className="form-control" id="fullName" name='full_name' value={formik.values.full_name}
                                             onChange={formik.handleChange}
                                            placeholder="امیرحسین عباسی" required disabled={props.editDocumentIndividuals}/>
                                            <div className="invalid-feedback">
                                            لطفا نام کامل  را وارد کنید.
                                            </div>
                                            <label htmlFor="fullName">نام و نشان</label>
                                      </div>
                                      <div className="col form-floating mb-3">
                                            <input type="text" className="form-control" id="caseNumber" name='caseNumber' value={formik.values.caseNumber}
                                             onChange={formik.handleChange}
                                            placeholder="123456" required disabled={props.editDocumentIndividuals}/>
                                            <div className="invalid-feedback">
                                            لطفا شماره پرونده  را وارد کنید.
                                            </div>
                                            <label htmlFor="caseNumber">شماره پرونده</label>
                                      </div>
                        </div>


                            <div className='d-flex gap-2 mb-5'>
                                      <div className="col form-floating" >
                                            <select className="form-select" id="sexSelector" name='sex' value={formik.values.sex} style={{minWidth:'11vw' , maxWidth:'20vw'}}
                                             onChange={formik.handleChange}
                                            aria-label="sexSelector" disabled={props.editDocumentIndividuals} required>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="مونث">مونث</option>
                                                <option value="مذکر">مذکر</option>
                                            </select>
                                             <div className="invalid-feedback">
                                            لطفا جنسیت  را انتخاب کنید.
                                            </div>
                                            <label htmlFor="sexSelector">جنسیت</label>
                                      </div>

                                      <div className="col-3">
                                          <DatePicker
                                             animations={[transition()]}
                                             render={<CustomInputDate disabled={props.editDocumentIndividuals}
                                             ids={"date"} names='employedDatePicker' label='تاریخ استخدام'/>}
                                             id="employedDatePicker"
                                             name='date'
                                             value={formik.values.date}
                                             onChange={handleChange}
                                             onOpenPickNewDate={false}
                                             calendar={persian}
                                             locale={persian_fa}
                                             required
                                          />
                                      </div>

                                      <div className="col form-floating mb-3">
                                          <input type="text" className="form-control" id="nationalCard" name='national_id' value={formik.values.national_id} maxLength='10'
                                             onChange={formik.handleChange}
                                          placeholder="1520505142" disabled={props.editDocumentIndividuals}  required/>
                                          <label htmlFor="nationalCard">کد ملی</label>
                                          <div className="invalid-feedback">
                                          کد ملی را وارد کنید.
                                          </div>
                                      </div>

                                  <div className="col-3">
                                          <DatePicker
                                             animations={[transition()]}
                                             render={<CustomInputDate disabled={props.editDocumentIndividuals}
                                             ids={"expireDate"} names='expireDatePicker' label='تاریخ پایان قرارداد'/>}
                                             id="expireDatePicker"
                                             name='expireDate'
                                             value={formik.values.expireDate}
                                             onChange={handleChangeExpire}
                                             onOpenPickNewDate={false}
                                             calendar={persian}
                                             locale={persian_fa}
                                             required
                                          />
                                      </div>
                                </div>

                            <hr className='bg-primary mb-5'/>

                        <div className='d-flex gap-2 mb-5'>
                                <div className="col form-floating ">
                                    <NumericFormat
                                      className='form-control'
                                      id="guaranteeApproved"
                                      allowNegative={false}
                                      value={formik.values.approvedPrice}
                                      onChange={formik.handleChange}
                                      thousandSeparator=","
                                      name="approvedPrice"
                                      placeholder="ریال 1,000"
                                      disabled={props.editDocumentIndividuals}
                                      required/>
                                    <label htmlFor="guaranteeApproved">تضمین مصوب</label>
                                    <div className="invalid-feedback">
                                        مبلغ تضمین مصوب را وارد کنید.
                                    </div>
                                </div>
                            <div className="form-floating" style={{maxWidth:'200px'}}>
                                    <input className="form-control" name='office' type='search' value={formik.values.office} style={{minWidth:'185px' , maxWidth:'20vw'}}
                                      onChange={formik.handleChange} list="workLocationList" id="workLocation" disabled={props.editDocumentIndividuals}
                                    placeholder="دزفول" required/>
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
                                    <div className="invalid-feedback">
                                    محل کار را انتخاب کنید.
                                    </div>
                            </div>
                            <div className="col  form-floating">
                                    <input type="text" className="form-control" id="job" name='job' value={formik.values.job}
                                      onChange={formik.handleChange}
                                    placeholder="حسابدار" disabled={props.editDocumentIndividuals} required/>
                                    <label htmlFor="job">شغل</label>
                                    <div className="invalid-feedback">
                                    شغل را وارد کنید.
                                    </div>
                            </div>
                        </div>


                        <hr className='bg-primary mb-5'/>

                            <div className='d-flex gap-2'>

                                 <div className="col-3 form-floating mb-3">
                                       <NumericFormat
                                          className='form-control'
                                          id="commitmentPrice"
                                          allowNegative={false}
                                          value={formik.values.commitmentPrice}
                                          thousandSeparator=","
                                          name="commitmentPrice"
                                          placeholder="ریال 640,000"
                                          onChange={(e) => {
                                              setIsCommitmentPriceEmpty(e.target.value)
                                              formik.setFieldValue('commitmentPrice', e.target.value)
                                          }}
                                          disabled={props.editDocumentIndividuals}
                                          required/>
                                       <label htmlFor="commitmentPrice">مبلغ تضمین</label>
                                       <div className="invalid-feedback">
                                       مبلغ تضمین  وارد کنید.
                                       </div>
                                 </div>

                                      {(() => {
                                             if (isCommitmentPriceEmpty.length !== 0 || props.editDocumentIndividuals || props.ModalTitle === 'edit') {
                                                return (
                                                         <div className="form-floating" style={{maxWidth:'200px'}}>
                                                             <select className="form-select" name='typeBail' id="typeBail" style={{minWidth:'110px' , maxWidth:'20vw'}}
                                                            value={formik.values.typeBail} placeholder="بانک"
                                                            onChange={(e) => {
                                                                setIsTypeBail1Empty(e.target.value)
                                                                formik.setFieldValue('typeBail', e.target.value)
                                                            }} disabled={props.editDocumentIndividuals} required>
                                                                        <option value='' disabled>یک مورد انتخاب کنید</option>
                                                                        <option value="چک">چک</option>
                                                                        <option value="نقد">نقد</option>
                                                                        <option value="سفته">سفته</option>
                                                                        <option value="بانک">بانک</option>
                                                                        <option value="تعهد">تعهد</option>
                                                                    </select>
                                                             <label htmlFor="typeBail">نوع ضمانت</label>


                                                            <div className="invalid-feedback">
                                                                نوع ضمانت را انتخاب کنید.
                                                            </div>
                                                         </div>
                                                )
                                            }
                                      })()}

                                      {(() => {
                                              if (isTypeBail1Empty.length !==0 || props.editDocumentIndividuals || props.ModalTitle === 'edit') {
                                                  return (
                                                      <Fragment>
                                                            <div className="form-floating " style={{width:'14vw'}}>
                                                                {isTypeBail1Empty === 'تعهد' ?

                                                                    <Fragment>
                                                                           <input type="search" style={{fontSize:'.9vw'}} placeholder={firstBail} list='commitmentList' name='commitment' value={formik.values.firstBail}
                                                                           onChange={(e) => {
                                                                         formik.setFieldValue('firstBail', e.target.value)
                                                                          }} aria-label="First Bail" id='commitment' className="form-control"
                                                                            disabled={props.editDocumentIndividuals} required/>
                                                                            <datalist id="commitmentList" >
                                                                                    <option value="کسر از حقوق بازنشستگی"/>
                                                                            </datalist>
                                                                            <label style={{fontSize:'1vw'}} htmlFor="commitment">{firstBail}</label>
                                                                            <div className="invalid-feedback">
                                                                             {firstBail} را وارد کنید.
                                                                            </div>
                                                                    </Fragment>

                                                                    :
                                                                    <Fragment>
                                                                          <input type="text" placeholder={firstBail} name='firstBail' value={formik.values.firstBail}
                                                                            onChange={formik.handleChange} aria-label="First Bail" id='firstBail' className="form-control"
                                                                            disabled={props.editDocumentIndividuals} required/>
                                                                            <label style={{fontSize:'1vw'}} htmlFor="firstBail">{firstBail}</label>
                                                                            <div className="invalid-feedback">
                                                                             {firstBail} را وارد کنید.
                                                                            </div>
                                                                    </Fragment>
                                                                }
                                                            </div>

                                                             <div className="form-floating mb-3 col">
                                                                <input type="text" placeholder={secondBail} id='secondBail' name='secondBail' value={formik.values.secondBail}
                                                                onChange={formik.handleChange} aria-label="Second Bail" className="form-control"
                                                                disabled={props.editDocumentIndividuals} required/>
                                                                <label style={{fontSize:'1vw'}} htmlFor="secondBail">{secondBail}</label>
                                                                <div className="invalid-feedback">
                                                                 {secondBail} را وارد کنید.
                                                                </div>
                                                             </div>
                                                      </Fragment>

                                                )
                                              }
                                          })()}
                            </div>

                     {props.ModalTitle === 'done' ?
                                <Fragment>
                                                                <hr className='bg-primary mb-5'/>

                            <div className='d-flex gap-2  mb-2 align-items-center '>
                                    <div className='d-flex align-items-center'>
                                          <p className='me-2'>در</p>
                                          <div>
                                             <DatePicker
                                                animations={[transition()]}
                                                render={<CustomInputDate ids={'clearedDatePicker'} names='clearedDate' disabled={props.ModalTitle === 'done' ? false : props.editDocumentIndividuals}
                                                label='تاریخ'/>}
                                                value={formik.values.clearedDate}
                                                onChange={handleChangeClear}
                                                name='clearedDate'
                                                id="clearedDatePicker"
                                                onOpenPickNewDate={false}
                                                calendar={persian}
                                                locale={persian_fa}
                                             />
                                          </div>
                                          <p className='ms-2 w-100'>تسویه شده</p>
                                    </div>

                                    <div className="form-check col">
                                            <input className="form-check-input" type="checkbox" name='receivedDocument' value="مدارک تحویل داده شده" checked={formik.values.receivedDocument}
                                            onChange={() => {
                                                formik.setFieldValue('receivedDocument' , !formik.values.receivedDocument)
                                            }}
                                            id="receivedDocument" disabled={props.ModalTitle === 'done' ? false : props.editDocumentIndividuals}/>
                                            <label className="form-check-label" htmlFor="receivedDocument">
                                            مدارک تحویل داده شده
                                            </label>
                                    </div>
                                   <div className="form-check col ">
                                            <input className="form-check-input" type="checkbox" name='affidavitStatus' value="اقرارنامه تحویل داده شده" checked={formik.values.affidavitStatus}
                                            onChange={() => {
                                                formik.setFieldValue('affidavitStatus' , !formik.values.affidavitStatus)
                                            }}
                                            id="affidavitStatus" disabled={props.ModalTitle === 'done' ? false : props.editDocumentIndividuals}/>
                                            <label className="form-check-label" htmlFor="affidavitStatus">
                                            اقرارنامه تحویل داده شده
                                            </label>
                                    </div>
                                </div>
                                </Fragment> : null}
                            {props.ModalTitle === 'extension' ?
                                <Fragment>
                                    <hr className='bg-primary mb-3'/>
                                    <div className='d-flex gap-3  mb-2 align-items-center '>
                                            <div className="form-floating mb-3" style={{maxWidth:'200px'}}>
                                                    <select className="form-select" id="extension" disabled={props.ModalTitle === 'extension' ? false : props.editDocumentIndividuals} style={{minWidth:'185px' , maxWidth:'20vw'}}
                                                    aria-label="extension"  name='extension' value={formik.values.extension}
                                                    onChange={e => {
                                                        formik.setFieldValue('extension' , e.target.value)
                                                        handleExtension(e.target.value)
                                                    }}>
                                                        <option value='' disabled>یک مورد انتخاب کنید</option>
                                                        <option value="سه ماه">سه ماه</option>
                                                        <option value="شش ماه">شش ماه</option>
                                                        <option value="یک سال">یک سال</option>
                                                        <option value="سایر">سایر</option>
                                                    </select>
                                                    <label htmlFor="situationSelector">مدت تمدید</label>
                                                     <div className="invalid-feedback">
                                                    لطفا مدت تمدید قرارداد را انتخاب کنید.
                                                    </div>
                                              </div>
                                                    {formik.values.extension === 'سایر' ?
                                                               <DatePicker
                                                                     animations={[transition()]}
                                                                     render={<CustomInputDate disabled={props.ModalTitle === 'extension' ? false : props.editDocumentIndividuals}
                                                                     ids={"expireDate"} names='expireDatePicker' label='تاریخ پایان قرارداد'/>}
                                                                     id="expireDatePicker"
                                                                     name='expireDate'
                                                                     value={formik.values.expireDate}
                                                                     onChange={handleChangeExpire}
                                                                     onOpenPickNewDate={false}
                                                                     calendar={persian}
                                                                     locale={persian_fa}
                                                                     required
                                                                  />
                                                    : null}
                                        </div>
                                </Fragment> : null}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={refreshPage} data-bs-dismiss="modal"><CloseOutlined /></button>
                                {props.ModalTitle !== 'visit' ?
                                    <button type="button" className="btn btn-success" onClick={handleSubmit()}><CheckOutlined /></button>
                                 : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </Fragment>
  );
};

export default Modal