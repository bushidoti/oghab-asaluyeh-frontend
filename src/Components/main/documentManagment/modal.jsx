import React, {Fragment, useEffect, useState} from "react";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import transition from "react-element-popper/animations/transition"
import {CustomInputDate} from "../../../App";
import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { NumericFormat } from 'react-number-format';
import options from "../date-option";
import Url from "../../config";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const Modal = (props) => {
    const [contract, setContracts] = useState([])
    const [lastID, setLastID] = useState([])

    const formik = useFormik({
    initialValues: {
      id: contract.id || '',
      contractNumber: contract.contractNumber || '',
      employer: contract.employer || '',
      dateContract: contract.dateContract || '',
      contractPrice: contract.contractPrice || '',
      durationContract: contract.durationContract || '',
      prePaidPrice: contract.prePaidPrice || '',
      goodPrice: contract.goodPrice || '',
      typeBail1: contract.typeBail1 || '',
      firstBail: contract.firstBail || '',
      secondBail: contract.secondBail || '',
      commitmentPrice: contract.commitmentPrice || '',
      typeBail2: contract.typeBail2 || '',
      firstBail2: contract.firstBail2 || '',
      secondBail2: contract.secondBail2 || '',
      topicContract: contract.topicContract || '',
      typeContract: contract.typeContract || '',
      clearedDate: contract.clearedDate || null,
      receivedDocument: contract.receivedDocument || '',
      clearedStatus: contract.clearedStatus || '',
    },
    enableReinitialize: true
    });

     const postHandler = async () => {
          await axios.post(
            `${Url}/api/documents/`,
              {
              contractNumber: formik.values.contractNumber,
              employer: formik.values.employer,
              type_form: props.docToggle,
              dateContract: formik.values.dateContract,
              contractPrice: formik.values.contractPrice,
              durationContract: formik.values.durationContract,
              prePaidPrice: formik.values.prePaidPrice,
              goodPrice: formik.values.goodPrice,
              typeBail1: formik.values.typeBail1,
              firstBail: firstBail1 + ' ' + formik.values.firstBail,
              secondBail: secondBail1 +  ' ' + formik.values.secondBail,
              commitmentPrice: formik.values.commitmentPrice,
              typeBail2: formik.values.typeBail2,
              firstBail2: firstBail2 + ' ' + formik.values.firstBail2,
              secondBail2: secondBail2 + ' ' + formik.values.secondBail2 ,
              topicContract: formik.values.topicContract,
              typeContract: formik.values.typeContract,
         }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
           setTimeout(
                    refreshPages, 3000)
        }

       const putHandler = async () => {
         await axios.put(
            `${Url}/api/documents/${props.idNumber}/`,
              {
              contractNumber: formik.values.contractNumber,
              employer: formik.values.employer,
              dateContract: formik.values.dateContract,
              contractPrice: formik.values.contractPrice,
              durationContract: formik.values.durationContract,
              prePaidPrice: formik.values.prePaidPrice,
              goodPrice: formik.values.goodPrice,
              typeBail1: formik.values.typeBail1,
              firstBail: formik.values.firstBail,
              secondBail: formik.values.secondBail,
              commitmentPrice: formik.values.commitmentPrice,
              typeBail2: formik.values.typeBail2,
              firstBail2: formik.values.firstBail2,
              secondBail2: formik.values.secondBail2,
              topicContract: formik.values.topicContract,
              typeContract: formik.values.typeContract,
              clearedDate: formik.values.clearedDate,
              receivedDocument: formik.values.receivedDocument,
              clearedStatus: formik.values.clearedStatus,

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
            `${Url}/api/documents/${props.idNumber}/`,
              {
              contractNumber: formik.values.contractNumber,
              employer: formik.values.employer,
              dateContract: formik.values.dateContract,
              contractPrice: formik.values.contractPrice,
              durationContract: formik.values.durationContract,
              prePaidPrice: formik.values.prePaidPrice,
              goodPrice: formik.values.goodPrice,
              typeBail1: formik.values.typeBail1,
              firstBail: formik.values.firstBail,
              secondBail: formik.values.secondBail,
              commitmentPrice: formik.values.commitmentPrice,
              typeBail2: formik.values.typeBail2,
              firstBail2: formik.values.firstBail2,
              secondBail2: formik.values.secondBail2,
              topicContract: formik.values.topicContract,
              typeContract: formik.values.typeContract,
              clearedDate: formik.values.clearedDate,
              receivedDocument: formik.values.receivedDocument,
              clearedStatus: true,

         } , {
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
              text: ` آیا از تسویه قرارداد ${formik.values.employer} مطمئنید ؟ `,
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

      const putAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: ` آیا از ویرایش قرارداد ${formik.values.employer} مطمئنید ؟ `,
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
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت این قرارداد مطمئنید ؟",
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
                  'قرارداد ثبت شد.',
                  'success',
                  'ok',
                  postHandler(),

                )
              }
            })
      }

    function handleChange(value){
            formik.setFieldValue('dateContract' , value.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }

    function handleChangeClear(value){
            formik.setFieldValue('clearedDate' , value.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }

    const fetchData = async () => {
        if (props.idNumber !== null){
            const response = await fetch(`${Url}/api/documents/${props.idNumber}/?fields=contractNumber,employer,type_form,dateContract,contractPrice,durationContract,prePaidPrice,goodPrice,typeBail1,firstBail,secondBail,commitmentPrice,typeBail2,firstBail2,secondBail2,topicContract,typeContract,clearedDate,receivedDocument,clearedStatus`, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        } )
            const data = await response.json()
            setContracts(data)
            }
      }

    const fetchLastData = async () => {
        const response = await fetch(`${Url}/api/documents/?fields=contractNumber,employer,type_form,dateContract,contractPrice,durationContract,prePaidPrice,goodPrice,typeBail1,firstBail,secondBail,commitmentPrice,typeBail2,firstBail2,secondBail2,topicContract,typeContract,clearedDate,receivedDocument,clearedStatus` , {
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

     function refreshPage() {
        formik.setFieldValue('id' , '')
        formik.setFieldValue('contractNumber' , '')
        formik.setFieldValue('employer' , '')
        formik.setFieldValue('dateContract' , '')
        formik.setFieldValue('contractPrice' , '')
        formik.setFieldValue('durationContract' , '')
        formik.setFieldValue('prePaidPrice' , '')
        formik.setFieldValue('goodPrice' , '')
        formik.setFieldValue('typeBail1' , '')
        formik.setFieldValue('typeBail2' , '')
        formik.setFieldValue('firstBail' , '')
        formik.setFieldValue('secondBail' , '')
        formik.setFieldValue('commitmentPrice' , '')
        formik.setFieldValue('firstBail2' , '')
        formik.setFieldValue('secondBail2' , '')
        formik.setFieldValue('topicContract' , '')
        formik.setFieldValue('typeContract' , '')
        formik.setFieldValue('clearedDate' , '')
        formik.setFieldValue('receivedDocument' , '')
        props.setIdNumber('')
        props.setEditDocument(false)
      }

    const [isGoodPriceEmpty , setIsGoodPriceEmpty] = useState('')
    const [isCommitmentPriceEmpty , setIsCommitmentPriceEmpty] = useState('')
    const [isTypeBail1Empty , setIsTypeBail1Empty] = useState('')
    const [isTypeBail2Empty , setIsTypeBail2Empty] = useState('')
    let firstBail1 = ''
    let secondBail1 = ''

    let firstBail2 = ''
    let secondBail2 = ''

    const handleLabelBails1 = () => {
        if (isTypeBail1Empty === 'چک'){
            firstBail1 = 'شماره چک'
            secondBail1 = 'بانک'
        } else if (isTypeBail1Empty === 'نقد'){
            firstBail1 = 'واریز به حساب'
            secondBail1 = 'شماره حساب'
        }else if (isTypeBail1Empty === 'سفته'){
            firstBail1 = 'تعداد سفته'
            secondBail1 = 'مبلغ سفته'
        }else if (isTypeBail1Empty === 'بانک'){
            firstBail1 = 'ضمانت'
            secondBail1 = 'شماره تضمین'
        }

    }

       const handleLabelBails2 = () => {
        if (isTypeBail2Empty === 'چک'){
            firstBail2 = 'شماره چک'
            secondBail2 = 'بانک'
        } else if (isTypeBail2Empty === 'نقد'){
            firstBail2 = 'واریز به حساب'
            secondBail2 = 'شماره حساب'
        }else if (isTypeBail2Empty === 'سفته'){
            firstBail2 = 'تعداد سفته'
            secondBail2 = 'مبلغ سفته'
        }else if (isTypeBail2Empty === 'بانک'){
            firstBail2 = 'ضمانت'
            secondBail2 = 'شماره تضمین'
        }

    }
    handleLabelBails2()
    handleLabelBails1()
    const handleSubmit = () => {
        if (props.modalTitle === 'edit'){
            return putAlert
        }else if (props.modalTitle === 'done'){
            return putAlertCleared
        }else {
            return postAlert
        }
    }
    function refreshPages() {
        window.location.reload()
    }
  return (
      <Fragment>
     <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="modalMain" tabIndex="-1" aria-labelledby="modalMainLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg" >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    {(() => {
                                       if (props.modalTitle === 'edit'){
                                            return (
                                                'ویرایش قرارداد'
                                            )
                                        }else if (props.modalTitle === 'done'){
                                            return (
                                                'تسویه قرارداد'
                                            )
                                        }else if (props.modalTitle === 'add'){
                                            return (
                                                'ثبت قرارداد'
                                            )
                                        }else if (props.modalTitle === 'visit'){
                                            return (
                                                'نمایش اطلاعات'
                                            )
                                        }

                                    })()}
                            </h1>
                            <button type="button" id='closeBtn' className="btn-close " data-bs-dismiss="modal"
                                    aria-label="Close" onClick={refreshPage}></button>
                        </div>
                    <form className='needs-validation' noValidate>
                        <div className="container modal-body">

                            <div className="form-floating justify-content-center mb-5">
                                <input type="text" id="idNumber" value={props.modalTitle === 'add' && lastID.length !==0 ? lastID.slice(-1)[0].id + 1 :formik.values.id}
                                       className="form-control w-25" aria-label="idNumber"
                                aria-describedby="basic-addon1" disabled/>
                                <label  htmlFor="idNumber">شماره ثبت</label>
                            </div>

                            <div className='d-flex gap-2'>
                                <div className="col form-floating mb-3 ">
                                    <input type="text" className="form-control" id="contractNumber"
                                    placeholder="35 / پ - 7552"
                                   value={formik.values.contractNumber}
                                   onChange={formik.handleChange}
                                    name='contractNumber'
                                   required disabled={props.editDocument} />
                                    <div className="invalid-feedback">
                                        لطفا شماره قرارداد را وارد کنید.
                                    </div>
                                    <label htmlFor="contractNumber">شماره قرارداد</label>

                                </div>

                                 <div className="col form-floating mb-3">
                                    <input type="text" className="form-control" id="name" autoComplete='off'
                                           name='employer'
                                             value={formik.values.employer}
                                             onChange={formik.handleChange}
                                           placeholder="...." required disabled={props.editDocument}/>
                                        <label htmlFor="name">نام {props.docToggle ? "پیمانکار" : "کارفرما"}</label>
                                     <div className="invalid-feedback">
                                         نام {props.docToggle ? "پیمانکار" : "کارفرما"} را وارد کنید.
                                     </div>
                                 </div>

                                     <div className="col-3">
                                         <DatePicker
                                             animations={[transition()]}
                                             render={<CustomInputDate disabled={props.editDocument} ids={"dateContract"} names='clearedDatePicker' label='تاریخ قرارداد'/>}
                                             id="dateContract"
                                             name='dateContract'
                                             value={formik.values.dateContract}
                                             onChange={handleChange}
                                             onOpenPickNewDate={false}
                                             calendar={persian}
                                             locale={persian_fa}
                                             required
                                         />
                                    </div>

                            </div>


                            <div className='d-flex gap-2 mb-5'>

                                <div className="col form-floating ">
                                   <NumericFormat
                                          className='form-control'
                                          allowNegative={false}
                                          thousandSeparator=","
                                          id="contractPrice"
                                          value={formik.values.contractPrice}
                                          onChange={formik.handleChange}
                                          disabled={props.editDocument}
                                          name="contractPrice"
                                          placeholder="ریال 10,000,000"
                                          required
                                        />
                                        <label htmlFor="contractPrice">مبلغ قرارداد</label>
                                        <div className="invalid-feedback">
                                            مبلغ قرارداد را وارد کنید.
                                        </div>
                                </div>


                                <div className="col  form-floating">
                                        <input type="text" className="form-control"  id="durationContract"
                                        placeholder="12 ماه" required
                                        value={formik.values.durationContract}
                                       onChange={formik.handleChange}
                                        disabled={props.editDocument}/>
                                        <label htmlFor="durationContract">مدت قرارداد</label>
                                        <div className="invalid-feedback">
                                            مدت قرارداد را وارد کنید.
                                        </div>
                                </div>

                                <div className="col form-floating">
                                     <NumericFormat
                                      className='form-control'
                                      id="prePaidPrice"
                                      thousandSeparator=","
                                      disabled={props.editDocument}
                                      value={formik.values.prePaidPrice}
                                      onChange={formik.handleChange}
                                      name="prePaidPrice"
                                      placeholder="ریال 2,500,000"
                                      required/>
                                      <label htmlFor="prePaidPrice">مبلغ پیش پرداخت</label>
                                      <div className="invalid-feedback">
                                        مبلغ پیش پرداخت را وارد کنید.
                                      </div>
                                </div>

                            </div>

                            <hr className='bg-primary mb-5'/>

                            <div className='d-flex gap-2'>
                                 <div className="form-floating mb-3" style={{maxWidth:'200px'}}>
                                         <NumericFormat style={{minWidth:'153px' , maxWidth:'20vw'}}
                                          className='form-control'
                                          id="goodPrice"
                                          thousandSeparator=","
                                          name="goodPrice"
                                          disabled={props.editDocument}
                                          value={formik.values.goodPrice}
                                          placeholder="ریال 50,000,000"
                                          required
                                          onChange={(e) => {
                                              setIsGoodPriceEmpty(e.target.value)
                                              formik.setFieldValue('goodPrice', e.target.value)
                                          }}/>
                                      <label htmlFor="goodPrice">مبلغ حسن انجام کار</label>
                                      <div className="invalid-feedback">
                                      مبلغ حسن انجام کار وارد کنید.
                                      </div>
                                 </div>

                                {(() => {

                                    if (isGoodPriceEmpty.length !== 0 || props.editDocument || props.modalTitle === 'edit') {
                                      return (
                                          <Fragment>
                                                 <div className="form-floating" style={{maxWidth:'200px'}}>
                                                        <input className="form-control" list="typeBailList" type='search' style={{minWidth:'110px' , maxWidth:'20vw'}}
                                                                value={formik.values.typeBail1}
                                                               id="typeBail1" placeholder="چک"
                                                               required disabled={props.editDocument}
                                                        onChange={(e) => {
                                                            setIsTypeBail1Empty(e.target.value)
                                                             formik.setFieldValue('typeBail1', e.target.value)

                                                        }}
                                                        />
                                                        <label htmlFor="typeBail1">نوع ضمانت</label>
                                                        <datalist id="typeBailList" >
                                                            <option value="چک"/>
                                                            <option value="نقد"/>
                                                            <option value="سفته"/>
                                                            <option value="بانک"/>
                                                        </datalist>
                                                        <div className="invalid-feedback">
                                                        نوع ضمانت را انتخاب کنید.
                                                        </div>
                                                 </div>
                                          </Fragment>
                                      )
                                    }

                                })()}

                                {(() => {

                                      if (isTypeBail1Empty.length !== 0 || props.editDocument || props.modalTitle === 'edit') {
                                      return (
                                          <Fragment>
                                              <div className="form-floating">
                                                    <input type="text" placeholder='ضمانت اول' aria-label="firstBail" id='firstBail' className="form-control" style={{minWidth:'90px' , maxWidth:'20vw'}}
                                                     value={formik.values.firstBail}
                                                     onChange={formik.handleChange}
                                                    required disabled={props.editDocument}
                                                    />
                                                    <label htmlFor="firstBail" style={{fontSize:'1vw'}}>{firstBail1}</label>
                                                    <div className="invalid-feedback">
                                                    {firstBail1} را وارد کنید.
                                                    </div>
                                                    </div>
                                                    <div className="col form-floating mb-3">
                                                    <input type="text" placeholder='ضمانت دوم' id='secondBail' aria-label="secondBail" className="form-control" style={{minWidth:'90px' , maxWidth:'20vw'}}
                                                   value={formik.values.secondBail}
                                                     onChange={formik.handleChange}
                                                    required disabled={props.editDocument}
                                                />
                                                    <label htmlFor="secondBail" style={{fontSize:'1vw'}}>{secondBail1}</label>
                                                    <div className="invalid-feedback">
                                                    {secondBail1} را وارد کنید.
                                                    </div>
                                              </div>
                                          </Fragment>
                                      )
                                    }
                                })()}
                            </div>
                            <div className='d-flex gap-2 mb-2'>
                                 <div className="form-floating mb-3" style={{maxWidth:'200px'}}>
                                          <NumericFormat style={{minWidth:'153px' , maxWidth:'20vw'}}
                                           className='form-control'
                                           id="commitmentPrice"
                                           thousandSeparator=","
                                           name="commitmentPrice"
                                           disabled={props.editDocument}
                                           value={formik.values.commitmentPrice}
                                           placeholder="ریال 200,000,000"
                                           required
                                           onChange={(e) =>
                                           {
                                               setIsCommitmentPriceEmpty(e.target.value)
                                               formik.setFieldValue('commitmentPrice', e.target.value)
                                           }}
                                           />
                                       <label htmlFor="commitmentPrice">مبلغ تعهد انجام کار</label>
                                       <div className="invalid-feedback">
                                       مبلغ تعهد انجام کار وارد کنید.
                                       </div>
                                 </div>

                                 {(() => {
                                    if (isCommitmentPriceEmpty.length !== 0 || props.editDocument || props.modalTitle === 'edit') {
                                      return (
                                                 <div className="form-floating" style={{maxWidth:'200px'}}>
                                                        <input className="form-control" type='search' list="typeBailList"
                                                        id="typeBail2" placeholder="نقد" style={{minWidth:'110px' , maxWidth:'20vw'}}
                                                        required disabled={props.editDocument}
                                                        value={formik.values.typeBail2}
                                                        onChange={(e) =>
                                                        {
                                                          setIsTypeBail2Empty(e.target.value)
                                                          formik.setFieldValue('typeBail2', e.target.value)
                                                        }}
                                                        />
                                                        <label htmlFor="typeBail2">نوع ضمانت</label>
                                                        <datalist id="typeBailList">
                                                            <option value="چک"/>
                                                            <option value="نقد"/>
                                                            <option value="سفته"/>
                                                            <option value="بانک"/>
                                                        </datalist>
                                                        <div className="invalid-feedback">
                                                            نوع ضمانت را انتخاب کنید.
                                                        </div>
                                                 </div>
                                      )
                                    }
                                 })()}

                                 {(() => {
                                      if (isTypeBail2Empty.length !==0 || props.editDocument || props.modalTitle === 'edit') {
                                          return (
                                              <Fragment>
                                                    <div className="col form-floating ">
                                                        <input type="text" placeholder='ضمانت اول'
                                                       aria-label="firstBail2" id='firstBail2' name='firstBail2'
                                                       className="form-control" style={{minWidth:'90px' , maxWidth:'20vw'}}
                                                        required disabled={props.editDocument}
                                                         value={formik.values.firstBail2}
                                                        onChange={formik.handleChange}
                                                        />
                                                        <label htmlFor="firstBail" style={{fontSize:'1vw'}}>{firstBail2}</label>
                                                        <div className="invalid-feedback">
                                                        {firstBail2} را وارد کنید.
                                                        </div>
                                                    </div>
                                                    <div className="col form-floating mb-3">
                                                        <input type="text" placeholder='ضمانت دوم' id='secondBail2' aria-label="secondBail2" name='secondBail2' className="form-control" style={{minWidth:'90px' , maxWidth:'20vw'}}
                                                        required disabled={props.editDocument}
                                                        value={formik.values.secondBail2}
                                                        onChange={formik.handleChange}
                                                        />
                                                        <label htmlFor="secondBail" style={{fontSize:'1vw'}}>{secondBail2}</label>
                                                        <div className="invalid-feedback">
                                                        {secondBail2} را وارد کنید.
                                                        </div>
                                                    </div>
                                              </Fragment>
                                      )
                                    }
                                 })()}
                            </div>
                            <hr className='bg-primary mb-5'/>
                            <div className='d-flex gap-2'>
                                    <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="topicContract"
                                        placeholder="حسابداری" required disabled={props.editDocument}
                                       value={formik.values.topicContract}
                                            onChange={formik.handleChange}
                                        />
                                        <label htmlFor="topicContract">موضوع قرارداد</label>
                                        <div className="invalid-feedback">
                                        موضوع قرارداد را وارد کنید.
                                        </div>
                                    </div>

                                <div className="col form-floating">
                                    <input className="form-control" type='search' list="typeContractList" id="typeContract" placeholder="هندلینگ"
                                   required disabled={props.editDocument}
                                       value={formik.values.typeContract}
                                        onChange={formik.handleChange}/>
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
                                    <div className="invalid-feedback">
                                    نوع قرارداد را انتخاب کنید.
                                    </div>
                                </div>
                        </div>

                        <hr className='bg-primary mb-4'/>

                            <div className='d-flex gap-2  mb-2 align-items-center '>
                                        <div className='d-flex col align-items-center'>
                                            <p className='me-2'>در</p>
                                            <div>
                                              <DatePicker
                                              animations={[transition()]}
                                              render={<CustomInputDate disabled={props.modalTitle === 'done' ? false : props.editDocument}
                                               ids={'clearedDatePicker'} names='clearedDate' label='تاریخ'/>}
                                              id="clearedDatePicker"
                                              value={formik.values.clearedDate}
                                              onChange={handleChangeClear}
                                              name='clearedDate'
                                              calendar={persian}
                                              onOpenPickNewDate={false}
                                              locale={persian_fa}
                                              />
                                            </div>
                                            <p className='ms-2 w-100'>تسویه شده</p>
                                        </div>

                                        <div className="form-check col ms-4">
                                            <input className="form-check-input"  name='receivedDocument' type="checkbox" value="مدارک تحویل داده شده"
                                            id="receivedDocument" disabled={props.modalTitle === 'done' ? false : props.editDocument}
                                            checked={formik.values.receivedDocument}
                                            onChange={() => {
                                                formik.setFieldValue('receivedDocument' , !formik.values.receivedDocument)
                                            }}
                                        />
                                            <label className="form-check-label" htmlFor="receivedDocument">
                                            مدارک تحویل داده شده
                                            </label>
                                        </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={refreshPage} data-bs-dismiss="modal"><CloseOutlined /></button>
                            {props.modalTitle !== 'visit' ?
                                 <button type="button" className="btn btn-success"
                                  onClick={handleSubmit()}><CheckOutlined /></button>
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