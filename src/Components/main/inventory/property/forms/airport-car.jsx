import React, {Fragment, useContext, useEffect, useState} from "react";
import {Contextform} from "../contextform";
import {useFormik} from "formik";
import Url from "../../../../config";
import axios from "axios";
import Swal from "sweetalert2";

export const AirportCar = () => {
    const form = useContext(Contextform)
    const [property, setProperty] = useState([])
    const [getName, setGetName] = useState([])
    let today = new Date().toLocaleDateString('fa-IR');
    const [autoIncrementFactor, setAutoIncrementFactor] = useState([])
    const formik = useFormik({
        initialValues: {
              code: "",
              name: "",
              model: "",
              year_made: "",
              owner: "",
              inventory: "",
              factor: "",
              document_code: "",
              systemID: "",
              install_location: "",
              property_number: "",
              user: "",
              plate1: "",
              plate2: "",
              plate3: "",
              plate4: "",
              motor: "",
              chassis: "",
              kilometer: "",
              year_changed: "",
              description: "",
              type_register: "",
              repaired_type: "",
            },
            enableReinitialize: true,
    });

    function refreshPages() {
        window.location.reload()
    }

    const fetchDataName = async () => {
            const response = await fetch(`${Url}/api/airportvehicle/${formik.values.code}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            const data = await response.json()
            setGetName(data)
          }

    const fetchDataProperty = async () => {
            const response = await fetch(`${Url}/api/airportvehicle`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            const data = await response.json()
            setProperty(data)
      }

    const postHandler = async () => {
           await axios.post(
            `${Url}/api/airportvehicle/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.name,
              user: formik.values.user,
              model: formik.values.model,
              year_made: formik.values.year_made,
              property_number: formik.values.property_number,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              motor: formik.values.motor,
              plate1: formik.values.plate1,
              plate2: formik.values.plate2,
              plate3: formik.values.plate3,
              plate4: formik.values.plate4,
              chassis: formik.values.chassis,
              owner: formik.values.owner,
              inventory: form.office,
              type_register: 'ثبت اولیه',
              date: today.replaceAll('/' , '-'),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
           setTimeout(
                    refreshPages, 3000)
        }

    const putHandlerAutoIncrement = async () => {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              airport_vehicle_01: form.office === 'دفتر مرکزی' ? form.autoIncrement.airport_vehicle_01+1 : form.autoIncrement.airport_vehicle_01,
              airport_vehicle_02: form.office === 'چابهار' ? form.autoIncrement.airport_vehicle_02+1 : form.autoIncrement.airport_vehicle_02,
              airport_vehicle_03: form.office === 'دزفول' ? form.autoIncrement.airport_vehicle_03+1 : form.autoIncrement.airport_vehicle_03,
              airport_vehicle_04: form.office === 'جاسک' ? form.autoIncrement.airport_vehicle_04+1 : form.autoIncrement.airport_vehicle_04,
              airport_vehicle_05: form.office === 'بیشه کلا' ? form.autoIncrement.airport_vehicle_05+1 : form.autoIncrement.airport_vehicle_05,
              airport_vehicle_06: form.office === 'اورهال تهران' ? form.autoIncrement.airport_vehicle_06+1 : form.autoIncrement.airport_vehicle_06,
              airport_vehicle_07: form.office === 'اورهال اصفهان' ? form.autoIncrement.airport_vehicle_07+1 : form.autoIncrement.airport_vehicle_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
    }

    const postAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت این اموال مطمئنید ؟",
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
                  'اموال ثبت شد.',
                  'success',
                  'ok',
                  postHandler(),
                  putHandlerAutoIncrement(),
                  postHandlerFactor(),
                )
              }
            })
      }

    const postHandlerRepair = async () => {
           await axios.post(
            `${Url}/api/repairedairportvehicle/`,
              {
              airport_vehicle: formik.values.code,
              year_changed: formik.values.year_changed,
              repaired_type: formik.values.repaired_type,
              kilometer: formik.values.kilometer,
              document_code: formik.values.document_code,
              systemID: handleAutoIncrementFactor(),
              name: getName.name,
              description: formik.values.description,
              date: today.replaceAll('/' , '-'),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
           setTimeout(
                    refreshPages, 3000)
        }

    const postAlertRepair = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت تعمیر این اموال مطمئنید ؟",
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
                  'اموال ثبت شد.',
                  'success',
                  'ok',
                  postHandlerRepair(),
                  postHandlerFactor(),
                )
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

         useEffect(() => {
          void fetchDataAutoIncrementFactor()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [])


        const postHandlerFactor = async () => {
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
            })
           setTimeout(
                    refreshPages, 3000)
        }

      const postAlertEnd = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت این اموال مطمئنید ؟",
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
                  'اموال ثبت شد.',
                  'success',
                  'ok',
                  postHandler(),
                  postHandlerFactor(),
                  putHandlerAutoIncrement(),
                  putHandlerAutoIncrementFactor(),
                )
              }
            })
      }

      const postAlertRepairEnd = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت تعمیر این اموال مطمئنید ؟",
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
                  'اموال ثبت شد.',
                  'success',
                  'ok',
                  postHandlerRepair(),
                  postHandlerFactor(),
                  putHandlerAutoIncrementFactor(),
                )
              }
            })
      }
    const handleAutoIncrement = () => {
        if (form.office === 'دفتر مرکزی') {
            return form.autoIncrement.airport_vehicle_01
        } else if (form.office === 'چابهار') {
            return form.autoIncrement.airport_vehicle_02
        } else if (form.office === 'دزفول') {
            return form.autoIncrement.airport_vehicle_03
        } else if (form.office === 'جاسک') {
            return form.autoIncrement.airport_vehicle_04
        } else if (form.office === 'بیشه کلا') {
            return form.autoIncrement.airport_vehicle_05
        } else if (form.office === 'اورهال تهران') {
            return form.autoIncrement.airport_vehicle_06
        } else if (form.office === 'اورهال اصفهان') {
            return form.autoIncrement.airport_vehicle_07
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
            return postAlert
        }else  if (formik.values.type_register === 'تعمیرات'){
            return postAlertRepair
        }
    }

     const handleSubmitEnd = () => {
        if (formik.values.type_register === 'ثبت اولیه'){
            return postAlertEnd
        }else  if (formik.values.type_register === 'تعمیرات'){
            return postAlertRepairEnd
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
                          event.stopPropagation()
                        }

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

             {formik.values.type_register === 'ثبت اولیه' || form.editStatus?
                 <Fragment>
                       <div className="form-floating justify-content-center mb-5">
                        <input type="text" id="idNumber" className="form-control" aria-label="Username"
                        aria-describedby="basic-addon1" value={form.editStatus ?  form.idNumber :handleAutoIncrement()} disabled required/>
                        <label  htmlFor="idNumber">کد ثبت</label>
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
                                           value={form.editStatus ? form.formik.values.document_code : formik.values.document_code} id="document_code" onChange={formik.handleChange}
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
                        <select className="form-select" id="typeAdd" defaultValue='' aria-label="Type Add" onChange={(e) => {
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
                       if (form.isRepair === 'تعمیرات'){
                           return (
                               <Fragment>
                                         <div className="col form-floating mb-3 ">
                                            <select className="form-select" defaultValue='' id="typeRepair"
                                            aria-label="Type Repair" name='repaired_type' onChange={formik.handleChange} required>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="تعویض روغن">تعویض روغن</option>
                                                <option value="تعویض باتری">تعویض باتری</option>
                                                <option value="تعویض قطعات">تعویض قطعات</option>
                                                <option value="تعویض لاستیک">تعویض لاستیک</option>
                                                <option value="سایر">سایر</option>
                                            </select>
                                            <label htmlFor="typeAdd">نوع تعمیر</label>
                                               <div className="invalid-feedback">
                                                 نوع تعمیر را انتخاب کنید.
                                             </div>
                                     </div>
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
                       }else if (form.isRepair === 'ثبت اولیه' || form.editStatus){
                           return (
                               <Fragment>
                                     <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="nameCar" name='name' disabled={form.viewOnly} autoComplete='off'
                                               value={form.editStatus ? form.formik.values.name : formik.values.name}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="شاتر" required/>
                                            <label htmlFor="nameCar">نام خودرو</label>
                                         <div className="invalid-feedback">
                                             نام خودرو را وارد کنید.
                                         </div>
                                     </div>
                                     <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="modelCar" name='model' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.model : formik.values.model}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="x55" required/>
                                            <label htmlFor="modelCar">مدل</label>
                                         <div className="invalid-feedback">
                                             مدل را وارد کنید.
                                         </div>
                                     </div>
                                       <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="made" name='year_made' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.year_made : formik.values.year_made}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="1388" required/>
                                            <label htmlFor="made`">سال ساخت</label>
                                         <div className="invalid-feedback">
                                             سال ساخت را وارد کنید.
                                         </div>
                                     </div>
                               </Fragment>
                           )
                       }
                   })()}
                </div>
                     {formik.values.type_register ?
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
                            : null}
                     {(() => {
                       if (form.isRepair === 'تعمیرات') {
                           return (
                               <Fragment>
                                   <hr className='bg-primary mb-5'/>
                                    <div className='d-flex gap-2'>
                                     <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="yearChange" name='year_changed' onChange={formik.handleChange}
                                               placeholder="1401" required/>
                                            <label htmlFor="yearChange`">سال تعویض</label>
                                         <div className="invalid-feedback">
                                             سال تعویض را وارد کنید.
                                         </div>
                                     </div>
                                     <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="kilometer" name='kilometer' onChange={formik.handleChange}
                                               placeholder="1401" required/>
                                            <label htmlFor="kilometer`">کیلومتر</label>
                                         <div className="invalid-feedback">
                                             کیلومتر را وارد کنید.
                                         </div>
                                     </div>
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
                       }else if (form.isRepair === 'ثبت اولیه' || form.editStatus) {
                           return (
                               <Fragment>
                                   <hr className='bg-primary mb-5'/>
                                    <div className='d-flex gap-2'>
                                     <div className="col  form-floating">
                                         <div className="mt-1 input-group">
                                                            <input className="form-control c-form__input c-form__car-plate-input__section4" disabled={form.viewOnly}
                                                            type="tel" name='plate4' value={form.editStatus ? form.formik.values.plate4 : formik.values.plate4}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                                            maxLength='2' placeholder="⚊ ⚊"
                                                            id="carPlateSection4" required/>
                                                            <span className="c-form__car-plate-input__iran">ایران</span>
                                                            <input type="tel"  id="carPlateSection3" placeholder="⚊ ⚊ ⚊" disabled={form.viewOnly}
                                                            aria-label="First name" name='plate3' value={form.editStatus ? form.formik.values.plate3 : formik.values.plate3}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                                            maxLength='3' className="c-form__input form-control" required/>
                                                            <select id="carPlateSection2" disabled={form.viewOnly}
                                                            className="c-form__combo c-form__car-plate-input__section2" name='plate2' value={form.editStatus ? form.formik.values.plate2 : formik.values.plate2}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange} required>
                                                                <option value="" disabled>انتخاب</option>
                                                                <option value="الف">الف</option>
                                                                <option value="ب">ب</option>
                                                                <option value="پ">پ</option>
                                                                <option value="ت">ت</option>
                                                                <option value="ث">ث</option>
                                                                <option value="ج">ج</option>
                                                                <option value="د">د</option>
                                                                <option value="ز">ز</option>
                                                                <option value="س">س</option>
                                                                <option value="ش">ش</option>
                                                                <option value="ص">ص</option>
                                                                <option value="ط">ط</option>
                                                                <option value="ع">ع</option>
                                                                <option value="ف">ف</option>
                                                                <option value="ق">ق</option>
                                                                <option value="ک">ک</option>
                                                                <option value="گ">گ</option>
                                                                <option value="ل">ل</option>
                                                                <option value="م">م</option>
                                                                <option value="ن">ن</option>
                                                                <option value="و">و</option>
                                                                <option value="ه">ه</option>
                                                                <option value="ی">ی</option>
                                                                <option value="ژ">معلولین</option>
                                                                <option value="تشریفات">تشریفات</option>
                                                                <option value="D">D</option>
                                                                <option value="S">S</option>
                                                            </select>
                                                            <input type="tel" placeholder="⚊ ⚊"  id="carPlateSection1" maxLength='2' disabled={form.viewOnly}
                                                            className="c-form__input form-control" name='plate1' value={form.editStatus ? form.formik.values.plate1 : formik.values.plate1}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange} required/>
                                                            <span className="input-group-text c-form__car-plate-input rounded-8"></span>
                                                          </div>
                                                          </div>
                                      <div className="col-2 form-floating">
                                        <input type="text" className="form-control" id="userCar" name='user' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.user : formik.values.user}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="فرودگاه مهراباد" required/>
                                            <label htmlFor="userCar">یوزر</label>
                                         <div className="invalid-feedback">
                                             یوزر را وارد کنید.
                                         </div>
                                     </div>
                                            <div className="col-2 form-floating mb-3">
                                        <input type="text" className="form-control" id="ownerCar" name='owner' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.owner : formik.values.owner}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="فرودگاه مهراباد" required/>
                                            <label htmlFor="ownerCar">مالکیت</label>
                                         <div className="invalid-feedback">
                                             مالکیت را وارد کنید.
                                         </div>
                                     </div>
                                     </div>
                               </Fragment>
                           )
                       }
                     })()}
            {(() => {
              if (form.isRepair === 'ثبت اولیه' || form.editStatus){
                  return(
                      <Fragment>
                            <hr className='bg-primary mb-5'/>
                            <div className='d-flex gap-2'>
                                <div className="col form-floating">
                                        <input type="text" className="form-control" id="motorNumber" name='motor' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.motor : formik.values.motor}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="IN-12345678" required/>
                                            <label htmlFor="motorNumber">شماره موتور</label>
                                         <div className="invalid-feedback">
                                             شماره موتور را وارد کنید.
                                         </div>
                                     </div>
                                    <div className="col form-floating">
                                        <input type="text" className="form-control" id="chassisNumber" name='chassis' disabled={form.viewOnly}
                                               value={form.editStatus ? form.formik.values.chassis : formik.values.chassis}
                                               onChange={form.editStatus ? form.formik.handleChange : formik.handleChange}
                                               placeholder="123456789052314" required/>
                                            <label htmlFor="chassisNumber">شماره شاسی</label>
                                         <div className="invalid-feedback">
                                             شماره شاسی را وارد کنید.
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
                            <button type="button" className="btn btn-primary" onClick={handleSubmit()}>بعدی</button>
                            <button type="button" className="btn btn-success" onClick={handleSubmitEnd()}>اتمام</button>
                          </div>

                     </div>
                 }
        </Fragment>
      </form>
    )
}