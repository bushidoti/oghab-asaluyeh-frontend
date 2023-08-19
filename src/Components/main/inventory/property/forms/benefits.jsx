import React, {Fragment, useContext, useEffect, useState} from "react";
import {Contextform} from "../contextform";
import {useFormik} from "formik";
import axios from "axios";
import Url from "../../../../config";
import Swal from "sweetalert2";
import fixNumbers from "../../../persianNumbers";

export const Benefits = () => {
    const form = useContext(Contextform)
    let today = new Date().toLocaleDateString('fa-IR');
    const [autoIncrementFactor, setAutoIncrementFactor] = useState([])
    const formik = useFormik({
        initialValues: {
              code: "",
              number_type: "",
              inventory: "",
              property_number: "",
              factor: "",
              document_code: "",
              systemID: "",
              using_location: "",
              number: "",
              type_register: "",
            },
            enableReinitialize: true,
            });

    function refreshPages() {
        window.location.reload()
    }

        const postAlertLoading = () => {
            Swal.fire({
                  title: 'در حال ثبت کردن!',
                  icon: 'warning',
                  html:   `<div class="spinner-border text-danger" role="status">
                     <span class="visually-hidden">Loading...</span>
                    </div>`,
                  showConfirmButton: false,
            })}


    const postHandler = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/benefit/`,
              {
              code: handleAutoIncrement(),
              number_type: formik.values.number_type,
              number: formik.values.number,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              property_number: formik.values.property_number,
              using_location: formik.values.using_location,
              inventory: form.office,
              type_register: 'ثبت اولیه',
              date: today.replaceAll('/' , '-'),
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
                             await postHandlerFactor()

                        }
                    }
                })
        }

    const postHandlerEnd = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/benefit/`,
              {
              code: handleAutoIncrement(),
              number_type: formik.values.number_type,
              number: formik.values.number,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              property_number: formik.values.property_number,
              using_location: formik.values.using_location,
              inventory: form.office,
              type_register: 'ثبت اولیه',
              date: today.replaceAll('/' , '-'),
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
                             await postHandlerFactorEnd()

                        }
                    }
                })
        }

    const putHandlerAutoIncrement = async () => {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              benefit_01: form.office === 'دفتر مرکزی' ? form.autoIncrement.benefit_01+1 : form.autoIncrement.benefit_01,
              benefit_02: form.office === 'چابهار' ? form.autoIncrement.benefit_02+1 : form.autoIncrement.benefit_02,
              benefit_03: form.office === 'دزفول' ? form.autoIncrement.benefit_03+1 : form.autoIncrement.benefit_03,
              benefit_04: form.office === 'جاسک' ? form.autoIncrement.benefit_04+1 : form.autoIncrement.benefit_04,
              benefit_05: form.office === 'بیشه کلا' ? form.autoIncrement.benefit_05+1 : form.autoIncrement.benefit_05,
              benefit_06: form.office === 'اورهال تهران' ? form.autoIncrement.benefit_06+1 : form.autoIncrement.benefit_06,
              benefit_07: form.office === 'اورهال اصفهان' ? form.autoIncrement.benefit_07+1 : form.autoIncrement.benefit_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }

    const postAlert = () => {
                Swal.fire(
                  'ثبت شد!',
                  'اموال ثبت شد.',
                  'success',
                  'ok',
                )
      }

    const handleAutoIncrement = () => {
        if (form.office === 'دفتر مرکزی') {
            return form.autoIncrement.benefit_01
        } else if (form.office === 'چابهار') {
            return form.autoIncrement.benefit_02
        } else if (form.office === 'دزفول') {
            return form.autoIncrement.benefit_03
        } else if (form.office === 'جاسک') {
            return form.autoIncrement.benefit_04
        } else if (form.office === 'بیشه کلا') {
            return form.autoIncrement.benefit_05
        } else if (form.office === 'اورهال تهران') {
            return form.autoIncrement.benefit_06
        } else if (form.office === 'اورهال اصفهان') {
            return form.autoIncrement.benefit_07
        }
    }

     const fetchDataAutoIncrementFactor = async () => {
        const response = await fetch(`${Url}/api/autoincrementfactorproperty/1`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setAutoIncrementFactor(data)
      }

    const handleAutoIncrementFactor = () => {
        if (form.office === 'دفتر مرکزی') {
            return autoIncrementFactor.systemID_01
        } else if (form.office === 'چابهار') {
            return autoIncrementFactor.systemID_02
        } else if (form.office === 'دزفول') {
            return autoIncrementFactor.systemID_03
        } else if (form.office === 'جاسک') {
            return autoIncrementFactor.systemID_04
        } else if (form.office === 'بیشه کلا') {
            return autoIncrementFactor.systemID_05
        } else if (form.office === 'اورهال تهران') {
            return autoIncrementFactor.systemID_06
        } else if (form.office === 'اورهال اصفهان') {
            return autoIncrementFactor.systemID_07
        }
    }
       const putHandlerAutoIncrementFactor = async () => {
                 await axios.put(
                    `${Url}/api/autoincrementfactorproperty/1/`,
                      {
                      systemID_01: form.office === 'دفتر مرکزی' ? autoIncrementFactor.systemID_01+1 : autoIncrementFactor.systemID_01,
                      systemID_02: form.office === 'چابهار' ? autoIncrementFactor.systemID_02+1 : autoIncrementFactor.systemID_02,
                      systemID_03: form.office === 'دزفول' ? autoIncrementFactor.systemID_03+1 : autoIncrementFactor.systemID_03,
                      systemID_04: form.office === 'جاسک' ? autoIncrementFactor.systemID_04+1 : autoIncrementFactor.systemID_04,
                      systemID_05: form.office === 'بیشه کلا' ? autoIncrementFactor.systemID_05+1 : autoIncrementFactor.systemID_05,
                      systemID_06: form.office === 'اورهال تهران' ? autoIncrementFactor.systemID_06+1 : autoIncrementFactor.systemID_06,
                      systemID_07: form.office === 'اورهال اصفهان' ? autoIncrementFactor.systemID_07+1 : autoIncrementFactor.systemID_07,
                 }, {
                         headers: {
                          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                })
        }

    const postHandlerFactor = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/factors/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.number,
              inventory: form.office,
              factor: form.scan,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              date: today.replaceAll('/' , '-'),
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
                            await putHandlerAutoIncrement()
                               setTimeout(
                                     refreshPages, 3000)
                        }
                    }
                })
        }

     const postHandlerFactorEnd = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/factors/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.number,
              inventory: form.office,
              factor: form.scan,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              date: today.replaceAll('/' , '-'),
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
                            await putHandlerAutoIncrement()
                            await putHandlerAutoIncrementFactor()
                               setTimeout(
                                     refreshPages, 3000)
                        }
                    }
                })
        }





            (function () {
                  // Fetch all the forms we want to apply custom Bootstrap validation styles to
                const forms = document.querySelectorAll('form');
                // Loop over them and prevent submission
                  Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                      form.addEventListener('click', function () {
                        form.classList.add('was-validated')
                      }, false)
                    })
                })()

    function scanImage() {
               window.ws.send("1100");
           }

    useEffect(() => {
          void fetchDataAutoIncrementFactor()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return(
     <form className='needs-validation' noValidate>
        <Fragment>
            <div className='d-flex gap-2'>
              <div className="form-floating justify-content-center mb-5">
                <input type="text" id="register_code" className="form-control" aria-label="register_code"
                aria-describedby="register_code" value={form.editStatus ?  form.idNumber : handleAutoIncrement() || ''} disabled required/>
                <label  htmlFor="register_code">کد ثبت</label>
              </div>
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='property_number' autoComplete='off' disabled={form.viewOnly}
                               value={form.editStatus ? form.formik.values.property_number : formik.values.property_number} id="property_number" onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                               placeholder="کلاه ایمنی" required/>
                            <label  htmlFor="property_number">شماره اموال</label>
                         <div className="invalid-feedback">
                             شماره اموال را وارد کنید.
                         </div>
                </div>
                 <div className="form-floating justify-content-center mb-5" style={{maxWidth:'255px'}}>
                                    <input type="text" id="systemID" className="form-control" value={form.editStatus ? form.formik.values.systemID : handleAutoIncrementFactor()} aria-label="systemID" placeholder="کلاه ایمنی" style={{maxWidth:'20vw' , minWidth:'110px'}}
                                    aria-describedby="systemID" disabled required/>
                                    <label  htmlFor="systemID">شماره ثبت سیستم</label>
                            </div>
                            <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name='document_code' autoComplete='off' disabled={form.viewOnly}
                                           value={form.editStatus ? form.formik.values.document_code : formik.values.document_code} id="document_code" onChange={e => formik.setFieldValue('document_code' , fixNumbers(e.target.value))}
                                           placeholder="کلاه ایمنی" required/>
                                        <label  htmlFor="document_code">شماره فاکتور</label>
                                     <div className="invalid-feedback">
                                         شماره فاکتور را وارد کنید.
                                     </div>
                           </div>
            </div>
               <div className='d-flex gap-2'>
                       <div className="col form-floating">
                        <select className="form-select" id="typeLine" name='number_type' value={form.editStatus ? form.formik.values.number_type : formik.values.number_type} disabled={form.viewOnly}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange} aria-label="Type Add" required>
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            <option value="سیم کارت">سیم کارت</option>
                            <option value="ثابت">ثابت</option>
                        </select>
                        <label htmlFor="typeLine">نوع خط</label>
                           <div className="invalid-feedback">
                             نوع خط را انتخاب کنید.
                         </div>
                    </div>
                        <div className="col-4 form-floating">
                            <input type="text" className="form-control" id="locationUse" name='using_location' value={form.editStatus ? form.formik.values.using_location : formik.values.using_location} disabled={form.viewOnly}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                            placeholder="شرکت" required/>
                                <label htmlFor="locationUse">محل استفاده</label>
                                <div className="invalid-feedback">
                                محل استفاده را وارد کنید.
                                </div>
                       </div>
                      <div className="col form-floating">
                        <input type="text" className="form-control" id="number" name='number' value={form.editStatus ? form.formik.values.number : formik.values.number} disabled={form.viewOnly}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                               placeholder="تاسیسات" required/>
                            <label htmlFor="number">شماره</label>
                         <div className="invalid-feedback">
                             شماره را وارد کنید.
                         </div>
                     </div>
                </div>
                  {form.viewOnly ? null :
                      <Fragment>
                      <div className='d-flex my-4'>
                        <div className="input-group h-25">
                            <label className="input-group-text"
                                   htmlFor="factor-check">فایل فاکتور</label>
                            <button className="btn btn-warning" type="button" id="firstPageBtn" onClick={scanImage}>اسکن</button>
                            <div className="invalid-feedback">
                                    فایل را کنید.
                            </div>
                        </div>
                        <img width={'250px'} height={'250px'} src={form.scan} alt={'تصویری اسکن نشده است'}/>
                    </div>
                        {form.scan.length > 5000000 ?
                            <div className="alert alert-danger my-2" role="alert">
                               حجم فایل بیشتر از 5 مگابایت است (در رابط اسکنر DPI را 100 قرار دهید).
                            </div>
                        : null}
                        </Fragment>
                  }

               {form.viewOnly ? null :
                      <div className='d-flex flex-column mt-2'>
                          <div className='d-flex gap-2 align-self-end'>
                            <button type="button" className="btn btn-primary" onClick={postHandler} disabled={form.scan.length > 5000000}>بعدی</button>
                            <button type="button" className="btn btn-success" onClick={postHandlerEnd} disabled={form.scan.length > 5000000}>اتمام</button>
                          </div>

                     </div>
                 }
        </Fragment>
    </form>
    )
}