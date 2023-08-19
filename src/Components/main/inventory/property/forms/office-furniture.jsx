import React, {Fragment, useContext, useEffect, useState} from "react";
import {Contextform} from "../contextform";
import {useFormik} from "formik";
import Url from "../../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import fixNumbers from "../../../persianNumbers";

export const OfficeFurniture = () => {
    const form = useContext(Contextform)
    const [property, setProperty] = useState([])
    const [getName, setGetName] = useState([])
    const [autoIncrementFactor, setAutoIncrementFactor] = useState([])
    let today = new Date().toLocaleDateString('fa-IR');
    const formik = useFormik({
        initialValues: {
              code: "",
              name: "",
              inventory: "",
              property_number: "",
              using_location: "",
              user: "",
              factor: "",
              document_code: "",
              systemID: "",
              year_made: "",
              description: "",
              type_register: "",
            },
            enableReinitialize: true,
            });

    function refreshPages() {
        window.location.reload()
    }

    const fetchDataName = async () => {
        const response = await fetch(`${Url}/api/officefurniture/${formik.values.code}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setGetName(data)
      }


    const postHandler = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/officefurniture/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.name,
              user: formik.values.user,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              property_number: formik.values.property_number,
              year_made: formik.values.year_made,
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

         const postAlertLoading = () => {
            Swal.fire({
                  title: 'در حال ثبت کردن!',
                  icon: 'warning',
                  html:   `<div class="spinner-border text-danger" role="status">
                     <span class="visually-hidden">Loading...</span>
                    </div>`,
                  showConfirmButton: false,
            })}

    const postHandlerEnd = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/officefurniture/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.name,
              user: formik.values.user,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              property_number: formik.values.property_number,
              year_made: formik.values.year_made,
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

          const fetchDataProperty = async () => {
        const response = await fetch(`${Url}/api/safetyequipment`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProperty(data)
      }


     const postHandlerFactor = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/factors/`,
              {
              code: formik.values.type_register === 'ثبت اولیه' ? handleAutoIncrement() : formik.values.code,
              name: formik.values.type_register === 'ثبت اولیه' ? formik.values.name : getName.name,
              factor: form.scan,
              inventory: form.office,
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
              code: formik.values.type_register === 'ثبت اولیه' ? handleAutoIncrement() : formik.values.code,
              name: formik.values.type_register === 'ثبت اولیه' ? formik.values.name : getName.name,
              factor: form.scan,
              inventory: form.office,
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

       useEffect(() => {
          void fetchDataAutoIncrementFactor()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    const putHandlerAutoIncrement = async () => {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              office_furniture_01: form.office === 'دفتر مرکزی' ? form.autoIncrement.office_furniture_01+1 : form.autoIncrement.office_furniture_01,
              office_furniture_02: form.office === 'چابهار' ? form.autoIncrement.office_furniture_02+1 : form.autoIncrement.office_furniture_02,
              office_furniture_03: form.office === 'دزفول' ? form.autoIncrement.office_furniture_03+1 : form.autoIncrement.office_furniture_03,
              office_furniture_04: form.office === 'جاسک' ? form.autoIncrement.office_furniture_04+1 : form.autoIncrement.office_furniture_04,
              office_furniture_05: form.office === 'بیشه کلا' ? form.autoIncrement.office_furniture_05+1 : form.autoIncrement.office_furniture_05,
              office_furniture_06: form.office === 'اورهال تهران' ? form.autoIncrement.office_furniture_06+1 : form.autoIncrement.office_furniture_06,
              office_furniture_07: form.office === 'اورهال اصفهان' ? form.autoIncrement.office_furniture_07+1 : form.autoIncrement.office_furniture_07,
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


    const postHandlerRepair = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/repairedofficefurniture/`,
              {
              office_furniture: formik.values.code,
              name: getName.name,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              description: formik.values.description,
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

     const postHandlerRepairEnd = async () => {
        postAlertLoading()
           await axios.post(
            `${Url}/api/repairedofficefurniture/`,
              {
              office_furniture: formik.values.code,
              name: getName.name,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              description: formik.values.description,
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



    const handleAutoIncrement = () => {
        if (form.office === 'دفتر مرکزی') {
            return form.autoIncrement.office_furniture_01
        } else if (form.office === 'چابهار') {
            return form.autoIncrement.office_furniture_02
        } else if (form.office === 'دزفول') {
            return form.autoIncrement.office_furniture_03
        } else if (form.office === 'جاسک') {
            return form.autoIncrement.office_furniture_04
        } else if (form.office === 'بیشه کلا') {
            return form.autoIncrement.office_furniture_05
        } else if (form.office === 'اورهال تهران') {
            return form.autoIncrement.office_furniture_06
        } else if (form.office === 'اورهال اصفهان') {
            return form.autoIncrement.office_furniture_07
        }
    }


     useEffect(() => {
          void fetchDataProperty()
          void fetchDataName()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [formik.values.code])

     const handleSubmit = () => {
        if (formik.values.type_register === 'ثبت اولیه'){
            return postHandler
        }else  if (formik.values.type_register === 'تعمیرات'){
            return postHandlerRepair
        }
    }

    const handleSubmitEnd = () => {
        if (formik.values.type_register === 'ثبت اولیه'){
            return postHandlerEnd
        }else  if (formik.values.type_register === 'تعمیرات'){
            return postHandlerRepairEnd
        }
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

    return(
     <form className='needs-validation' noValidate>
        <Fragment>
           <div className='d-flex gap-2'>
               {formik.values.type_register === 'ثبت اولیه' || form.editStatus ?
                   <Fragment>
                       <div className="form-floating justify-content-center mb-5">
                        <input type="text" id="register_code" className="form-control" aria-label="Username"
                        aria-describedby="register_code" value={form.editStatus ?  form.idNumber :handleAutoIncrement()} disabled required/>
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
                   </Fragment>
             : null}
            {formik.values.type_register || form.editStatus ?
                       <Fragment>
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
                         </Fragment>
                       : null}
                                          </div>

               <div className='d-flex gap-2'>
                   {form.editStatus === false ?
                    <div className="col form-floating mb-3 ">
                        <select className="form-select" defaultValue='' id="typeAdd" aria-label="Type Add" onChange={(e) => {
                           form.setIsRepair(e.target.value)
                            formik.setFieldValue('type_register' , e.target.value)
                        }} required>
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            <option value="ثبت اولیه">ثبت اولیه / خرید</option>
                            <option value="تعمیرات">تعمیرات</option>
                        </select>
                        <label htmlFor="typeAdd">نوع ثبت</label>
                           <div className="invalid-feedback">
                             نوع ثبت را انتخاب کنید.
                         </div>
                    </div>
                   : null}
                   {(() => {
                       if(form.isRepair === 'تعمیرات'){
                           return(
                               <Fragment>
                                       <div className="col form-floating mb-3">
                                                <select className="form-select" defaultValue='' id="register_code"
                                                    onChange={e => formik.setFieldValue('code' , e.target.value)} name='register_code' aria-label="Type Add" required>
                                                    <option value='' disabled>یک مورد انتخاب کنید</option>
                                                    {(property.filter(property => property.inventory ===  form.office).map((data) => (
                                                        <option key={data.code} value={data.code}>{data.code} - {data.name}</option>
                                                    )))}
                                                </select>
                                            <label htmlFor="register_code">کد</label>
                                             <div className="invalid-feedback">
                                                 کد را وارد کنید.
                                             </div>
                                       </div>
                               </Fragment>
                           )
                       }else if(form.isRepair === 'ثبت اولیه' || form.editStatus){
                           return(
                               <Fragment>
                                     <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="nameFurniture" name='name' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.name : formik.values.name}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="لپ تاپ" required/>
                                            <label htmlFor="nameFurniture">نام اثاث</label>
                                         <div className="invalid-feedback">
                                             نام اثاث را وارد کنید.
                                         </div>
                                     </div>

                                     <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="year" name='year_made' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.year_made : formik.values.year_made}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="1400" required/>
                                            <label htmlFor="year">سال خرید</label>
                                         <div className="invalid-feedback">
                                             سال خرید را وارد کنید.
                                         </div>
                                     </div>
                               </Fragment>
                           )
                       }
                   })()}
                </div>
                    {formik.values.type_register ?
                        <Fragment>
                               <div className='d-flex'>
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
                    : null}
                    {(() => {
                       if(form.isRepair === 'تعمیرات'){
                           return(
                               <Fragment>
                                   <hr className='bg-primary mb-5'/>
                                   <div className='d-flex gap-2'>
                                       <div className="col form-floating">
                                            <textarea className="form-control" id="describeRepair" name='description' onChange={formik.handleChange}
                                            placeholder="...." required/>
                                            <label htmlFor="describeRepair">شرح تعمیرات</label>
                                            <div className="invalid-feedback">
                                            شرح تعمیرات را وارد کنید.
                                            </div>
                                       </div>
                                   </div>
                               </Fragment>
                           )
                       }else if(form.isRepair === 'ثبت اولیه' || form.editStatus){
                           return(
                               <Fragment>
                                   <hr className='bg-primary mb-5'/>
                                   <div className='d-flex gap-2'>
                                       <div className="col form-floating">
                                            <input type="text" className="form-control" id="locationUse" name='using_location' disabled={form.viewOnly}
                                                   value={form.editStatus ? form.formik.values.using_location : formik.values.using_location}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                            placeholder="شرکت" required/>
                                                <label htmlFor="locationUse">محل استفاده</label>
                                                <div className="invalid-feedback">
                                                محل استفاده را وارد کنید.
                                                </div>
                                       </div>
                                       <div className="col form-floating">
                                            <input type="text" className="form-control" id="user" name='user' disabled={form.viewOnly}
                                                   value={form.editStatus ? form.formik.values.user : formik.values.user}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                            placeholder="فرودگاه" required/>
                                                <label htmlFor="user">یوزر</label>
                                                <div className="invalid-feedback">
                                                یوزر را وارد کنید.
                                                </div>
                                       </div>
                                   </div>
                               </Fragment>
                           )
                       }
                   })()}
                     {form.viewOnly || !formik.values.type_register ? null :
                      <div className='d-flex flex-column mt-2'>
                          <div className='d-flex gap-2 align-self-end'>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit()} disabled={form.scan.length > 5000000}>بعدی</button>
                            <button type="button" className="btn btn-success" onClick={handleSubmitEnd()} disabled={form.scan.length > 5000000}>اتمام</button>
                          </div>

                     </div>
                 }
        </Fragment>
    </form>

    )
}