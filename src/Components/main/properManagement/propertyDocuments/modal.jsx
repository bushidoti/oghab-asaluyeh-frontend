import React, {Fragment, useEffect, useState} from "react";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInputDate} from "../../../../App";
import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import options from "../../date-option";
import Url from "../../../config";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const Modal = (props) => {
    const [property, setProperties] = useState([])
    const [lastID, setLastID] = useState([])

    const formik = useFormik({
    initialValues: {
      id: property.id || '',
      typeProperty: property.typeProperty || '',
      name: property.name || '',
      docNumber: property.docNumber || '',
      plateMotor: property.plateMotor || '',
      addressChassis: property.addressChassis || '',
      landlord: property.landlord || '',
      modelMeter: property.modelMeter || '',
      madeOf: property.madeOf || '',
      part1plate: property.part1plate || '',
      part2plate: property.part2plate || '',
      part3plate: property.part3plate || '',
      cityPlate: property.cityPlate || '',
      descriptionLocation: property.descriptionLocation || '',
      paperDoc: property.paperDoc || '',
      insurancePaper: property.insurancePaper || '',
      gasCard: property.gasCard || '',
      carCard: property.carCard || '',
      description: property.description || '',
      soldDate: property.soldDate || null,
      buyer: property.buyer || '',
      soldStatus: property.soldStatus || null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
        console.log(values);
    },
    });

    function refreshPage() {
        formik.setFieldValue('id' , '')
        formik.setFieldValue('typeProperty' , '')
        formik.setFieldValue('name' , '')
        formik.setFieldValue('docNumber' , '')
        formik.setFieldValue('plateMotor' , '')
        formik.setFieldValue('addressChassis' , '')
        formik.setFieldValue('landlord' , '')
        formik.setFieldValue('modelMeter' , '')
        formik.setFieldValue('madeOf' , '')
        formik.setFieldValue('part1plate' , '')
        formik.setFieldValue('part2plate' , '')
        formik.setFieldValue('part3plate' , '')
        formik.setFieldValue('cityPlate' , '')
        formik.setFieldValue('descriptionLocation' , '')
        formik.setFieldValue('paperDoc' , '')
        formik.setFieldValue('insurancePaper' , '')
        formik.setFieldValue('gasCard' , '')
        formik.setFieldValue('carCard' , '')
        formik.setFieldValue('description' , '')
        formik.setFieldValue('soldDate' , '')
        formik.setFieldValue('buyer' , '')
        formik.setFieldValue('soldStatus' , '')
        props.setIdNumber('')
        props.setEditProperty(false)
      }

    const postHandler = async () => {
           await axios.post(
            `${Url}/api/properties/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              type_form: !props.propToggle,
              docNumber: formik.values.docNumber,
              plateMotor: formik.values.plateMotor,
              addressChassis: formik.values.addressChassis,
              landlord: formik.values.landlord,
              modelMeter: formik.values.modelMeter,
              madeOf: formik.values.madeOf,
              part1plate: formik.values.part1plate,
              part2plate: formik.values.part2plate,
              part3plate: formik.values.part3plate,
              cityPlate: formik.values.cityPlate,
              descriptionLocation: formik.values.descriptionLocation,
              paperDoc: formik.values.paperDoc,
              insurancePaper: formik.values.insurancePaper,
              gasCard: formik.values.gasCard,
              carCard: formik.values.carCard,
              description: formik.values.description,
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
            `${Url}/api/properties/${props.idNumber}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: formik.values.docNumber,
              plateMotor: formik.values.plateMotor,
              addressChassis: formik.values.addressChassis,
              landlord: formik.values.landlord,
              modelMeter: formik.values.modelMeter,
              madeOf: formik.values.madeOf,
              part1plate: formik.values.part1plate,
              part2plate: formik.values.part2plate,
              part3plate: formik.values.part3plate,
              cityPlate: formik.values.cityPlate,
              descriptionLocation: formik.values.descriptionLocation,
              paperDoc: formik.values.paperDoc,
              insurancePaper: formik.values.insurancePaper,
              gasCard: formik.values.gasCard,
              carCard: formik.values.carCard,
              description: formik.values.description,
              soldDate: formik.values.soldDate,
              buyer: formik.values.buyer,
              soldStatus: formik.values.soldStatus,
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
            `${Url}/api/properties/${props.idNumber}/`,
              {
                      typeProperty: formik.values.typeProperty,
                      name: formik.values.name,
                      docNumber: formik.values.docNumber,
                      plateMotor: formik.values.plateMotor,
                      addressChassis: formik.values.addressChassis,
                      landlord: formik.values.landlord,
                      modelMeter: formik.values.modelMeter,
                      madeOf: formik.values.madeOf,
                      part1plate: formik.values.part1plate,
                      part2plate: formik.values.part2plate,
                      part3plate: formik.values.part3plate,
                      cityPlate: formik.values.cityPlate,
                      descriptionLocation: formik.values.descriptionLocation,
                      paperDoc: formik.values.paperDoc,
                      insurancePaper: formik.values.insurancePaper,
                      gasCard: formik.values.gasCard,
                      carCard: formik.values.carCard,
                      description: formik.values.description,
                      soldDate: formik.values.soldDate,
                      buyer: formik.values.buyer,
                      soldStatus: true,
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
              text: ` آیا از ثبت فروش اموال با شماره سند${formik.values.docNumber} مطمئنید ؟ `,
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
                  'اموال ثبت فروش شد.',
                  'success',
                  putHandlerCleared(),

                )
              }
            })
         }

      const putAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: ` آیا از ویرایش اموال با شماره سند${formik.values.docNumber} مطمئنید ؟ `,
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
                  'اموال ویرایش شد.',
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

                )
              }
            })
      }


    function handleChangeSold(value){
            formik.setFieldValue('soldDate' , value.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }

    const fetchData = async () => {
        if (props.idNumber !== null){
            const response = await fetch(`${Url}/api/properties/`+ props.idNumber , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setProperties(data)
        }
      }

    const fetchLastData = async () => {
        const response = await fetch(`${Url}/api/properties` , {
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

   function refreshPages() {
        window.location.reload();
      }
   const handleSubmit = () => {
        if (props.ModalTitle === 'edit'){
            return putAlert
        }else if (props.ModalTitle === 'done'){
            return putAlertCleared
        }else {
            return postAlert
        }
    }
  return (
      <Fragment>
         <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false"  id="modalMain" tabIndex="-1" aria-labelledby="modalMainLabel"
         aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {(() => {
                                       if (props.ModalTitle === 'edit'){
                                            return (
                                                'ویرایش سند'
                                            )
                                        }else if (props.ModalTitle === 'done'){
                                            return (
                                                'فروش'
                                            )
                                        }else if (props.ModalTitle === 'add'){
                                            return (
                                                'ثبت سند'
                                            )
                                        }else if (props.ModalTitle === 'visit'){
                                            return (
                                                'نمایش اطلاعات'
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
                                <input type="text" id="numberId" value={props.ModalTitle === 'add' && lastID.length !==0 ? lastID.slice(-1)[0].id + 1 :formik.values.id} className="w-25 form-control" aria-label="ID"
                                aria-describedby="REGISTER ID" disabled required/>
                                <label  htmlFor="numberId">شماره ثبت</label>
                            </div>

                            <div className='d-flex gap-2'>
                                    <div className="form-floating  col">
                                            <select className="form-select" id="typePropertySelector"
                                                    aria-label="Type Property Selector" name='typeProperty' value={formik.values.typeProperty}
                                                    onChange={formik.handleChange} disabled={props.editProperty}>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                {props.propToggle ?
                                                    <Fragment>
                                                              <option value="ملک تجاری">ملک تجاری</option>
                                                              <option value="ملک غیرتجاری">ملک غیرتجاری</option>
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                            <option value="خودرو سواری">خودرو سواری</option>
                                                            <option value="خودرو فرودگاهی">خودرو فرودگاهی</option>
                                                    </Fragment>
                                                }
                                            </select>
                                            <label htmlFor="typePropertySelector">نوع</label>
                                    </div>

                                <div className="col form-floating mb-3">
                                    <input type="text" className="form-control" id="name" name='name' value={formik.values.name} autoComplete='off'
                                    onChange={formik.handleChange} placeholder="وانت" disabled={props.editProperty} required />
                                    <div className="invalid-feedback">
                                    لطفا {props.propToggle?'نام':'سیستم'} را وارد کنید.
                                    </div>
                                    <label htmlFor="name">{props.propToggle?'نام':'سیستم'}</label>
                                </div>
                        </div>


                            <div className='d-flex gap-2 mb-5'>
                                <div className="col form-floating mb-3" style={{maxWidth:'200px'}}>
                                    <input type="text" className="form-control" name='docNumber' value={formik.values.docNumber} style={{minWidth:'100px' , maxWidth:'20vw'}}
                                    onChange={formik.handleChange} id="docNumber"
                                    placeholder="12/پ-7532" disabled={props.editProperty} required/>
                                    <label htmlFor="docNumber">شماره سند</label>
                                    <div className="invalid-feedback">
                                    شماره سند را وارد کنید.
                                    </div>
                                </div>
                                <div className="form-floating" style={{maxWidth:'200px'}}>
                                    <input type="text" className="form-control" id="plateMotor" style={{minWidth:'100px' , maxWidth:'20vw'}}
                                    placeholder="26/د" name='plateMotor' value={formik.values.plateMotor}
                                    onChange={formik.handleChange} disabled={props.editProperty} required/>
                                    <label htmlFor="plateMotor">{props.propToggle ? 'پلاک' :  'شماره موتور'}</label>
                                    <div className="invalid-feedback">
                                    {props.propToggle ? 'پلاک' :  'شماره موتور'} را وارد کنید.
                                    </div>
                                </div>
                                <div className="form-floating" style={{maxWidth:'200px'}}>
                                    <input type="text" className="form-control" name='addressChassis' value={formik.values.addressChassis} style={{minWidth:'100px' , maxWidth:'20vw'}}
                                    onChange={formik.handleChange} id="addressChassis"
                                    placeholder="افسریه قصرفیروزه 1" disabled={props.editProperty} required/>
                                    <label htmlFor="addressChassis">{props.propToggle ? 'آدرس' :  'شماره شاسی'}</label>
                                    <div className="invalid-feedback">
                                    {props.propToggle ? 'آدرس' :  'شماره شاسی'} را وارد کنید.
                                    </div>
                                </div>
                                <div className="col  form-floating" style={{maxWidth:'200px'}}>
                                    <input type="text" className="form-control" id="landlord" name='landlord' value={formik.values.landlord} style={{minWidth:'100px' , maxWidth:'20vw'}}
                                    onChange={formik.handleChange} placeholder="علی عبدلی" disabled={props.editProperty} required/>
                                    <label htmlFor="landlord">نام مالک</label>
                                    <div className="invalid-feedback">
                                    نام مالک را وارد کنید.
                                    </div>
                                </div>
                            </div>
                            <hr className='bg-primary mb-5'/>
                            <div className='d-flex gap-2 mb-5'>
                                 <div className="col  form-floating">
                                    <input type="text" className="form-control" id="modelMeter" name='modelMeter' value={formik.values.modelMeter}
                                    onChange={formik.handleChange} placeholder="1000 هکتار" disabled={props.editProperty} required/>
                                    <label htmlFor="modelMeter">{props.propToggle ? 'متراژ' :  'مدل'}</label>
                                    <div className="invalid-feedback">
                                    {props.propToggle ? 'متراژ' :  'مدل'} را وارد کنید.
                                    </div>
                                 </div>

                                 <div className="col  form-floating">
                                      {props.propToggle ?
                                          <Fragment>
                                            <input type="text" className="form-control" id="madeOf" name='madeOf' value={formik.values.madeOf}
                                            onChange={formik.handleChange} placeholder="1399" disabled={props.editProperty} required/>
                                            <label htmlFor="madeOf">سال ساخت</label>
                                            <div className="invalid-feedback">
                                            سال ساخت را وارد کنید.
                                            </div>
                                          </Fragment>
                                          :

                                          <div className="mt-2 input-group">
                                            <input className="form-control c-form__input c-form__car-plate-input__section4" name='cityPlate' value={formik.values.cityPlate} disabled={props.ModalTitle === 'done' ? false : props.editProperty}
                                            onChange={formik.handleChange} type="tel" maxLength='2' placeholder="⚊ ⚊"
                                            id="carPlateSection4"/>
                                            <span className="c-form__car-plate-input__iran">ایران</span>
                                            <input type="tel"  id="carPlateSection3" name='part3plate' value={formik.values.part3plate} disabled={props.ModalTitle === 'done' ? false : props.editProperty}
                                            onChange={formik.handleChange} placeholder="⚊ ⚊ ⚊" aria-label="First name"
                                            maxLength='3' className="c-form__input form-control"/>
                                            <select id="carPlateSection2" className="c-form__combo c-form__car-plate-input__section2" disabled={props.ModalTitle === 'done' ? false : props.editProperty}
                                            name='part2plate' value={formik.values.part2plate} onChange={formik.handleChange}>
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
                                            <input type="tel" placeholder="⚊ ⚊"  id="carPlateSection1" disabled={props.ModalTitle === 'done' ? false : props.editProperty}
                                            name='part1plate' value={formik.values.part1plate} onChange={formik.handleChange}
                                            maxLength='2' className="c-form__input form-control"/>
                                            <span className="input-group-text c-form__car-plate-input rounded-8"></span>
                                          </div>
                                      }
                                 </div>
                            </div>
                            <div className="col form-floating">
                                <textarea  className="form-control" id="descriptionLocation"
                                name='descriptionLocation' value={formik.values.descriptionLocation} onChange={formik.handleChange}
                                placeholder="تهران ....." disabled={props.editProperty} required/>
                                <label htmlFor="descriptionLocation">{props.propToggle ? 'توضیحات' :  'محل استقرار'}</label>
                                <div className="invalid-feedback">
                                {props.propToggle ? 'توضیحات' :  'محل استقرار'} را وارد کنید.
                                </div>
                            </div>
                            <hr className='bg-primary mb-5'/>
                            {props.propToggle ?
                                    <>
                                    </>
                                :
                                    <Fragment>
                                        <div className='d-flex gap-2 mb-5'>
                                              <div className="col  form-floating">
                                                <input type="text" className="form-control" id="paperDoc"
                                                name='paperDoc' value={formik.values.paperDoc} onChange={formik.handleChange}
                                                placeholder="....." disabled={props.editProperty} required/>
                                                <label htmlFor="paperDoc">برگه سند</label>
                                                <div className="invalid-feedback">
                                                برگه سند را وارد کنید.
                                                </div>
                                              </div>
                                        <div className="col  form-floating">
                                               <input type="text" className="form-control" id="insurancePaper"
                                               name='insurancePaper' value={formik.values.insurancePaper} onChange={formik.handleChange}
                                               placeholder="....." disabled={props.editProperty} required/>
                                               <label htmlFor="insurancePaper">بیمه نامه</label>
                                               <div className="invalid-feedback">
                                               بیمه نامه را وارد کنید.
                                               </div>
                                        </div>
                                        <div className="col  form-floating">
                                            <input type="text" className="form-control" id="gasCard"
                                            name='gasCard' value={formik.values.gasCard} onChange={formik.handleChange}
                                            placeholder="....." disabled={props.editProperty} required/>
                                            <label htmlFor="gasCard">کارت سوخت</label>
                                            <div className="invalid-feedback">
                                            کارت سوخت را وارد کنید.
                                            </div>
                                        </div>
                                        <div className="col  form-floating">
                                            <input type="text" className="form-control" id="carCard"
                                            name='carCard' value={formik.values.carCard} onChange={formik.handleChange}
                                            placeholder="....." disabled={props.editProperty} required/>
                                            <label htmlFor="carCard">کارت ماشین</label>
                                            <div className="invalid-feedback">
                                            کارت ماشین را وارد کنید.
                                            </div>
                                        </div>
                            </div>
                                        <div className="col  form-floating">
                                            <textarea  className="form-control" id="description"
                                            name='description' value={formik.values.description} onChange={formik.handleChange}
                                            placeholder="....." disabled={props.editProperty} required/>
                                            <label htmlFor="description">توضیحات</label>
                                            <div className="invalid-feedback">
                                            توضیحات را وارد کنید.
                                            </div>
                                        </div>
                                        <hr className='bg-primary mb-5'/>
                                </Fragment>
                            }
                              <div className='d-flex mb-2'>
                                        <div className='d-flex col align-items-center'>
                                             <p className='me-2'>در</p>
                                             <div>
                                             <DatePicker
                                                 animations={[transition()]}
                                                 render={<CustomInputDate disabled={props.ModalTitle === 'done' ? false : props.editProperty} ids={"soldDate"} names='soldDatePicker' label='تاریخ'/>}
                                                 id="soldDatePicker"
                                                 name='soldDate'
                                                 value={formik.values.soldDate}
                                                 onChange={handleChangeSold}
                                                 onOpenPickNewDate={false}
                                                 calendar={persian}
                                                 locale={persian_fa}
                                             />
                                             </div>
                                             <p className='ms-2'>فروخته شده</p>
                                        </div>
                                        <div className="col  form-floating">
                                            <input type="text" className="form-control" id="buyer"
                                            name='buyer' value={formik.values.buyer} onChange={formik.handleChange}
                                            placeholder="محمد حسنی" disabled={props.ModalTitle === 'done' ? false : props.editProperty} required/>
                                            <label htmlFor="buyer">نام خریدار</label>
                                            <div className="invalid-feedback">
                                            نام خریدار را وارد کنید.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={refreshPage}><CloseOutlined /></button>
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