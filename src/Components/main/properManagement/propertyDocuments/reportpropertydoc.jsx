import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import Modal from "./modal";
import ObserveModal from "./observemodal";
import {useReactToPrint} from "react-to-print";
import Url from "../../../config";
import {Context} from "../../../../context";
import {CopyOutlined, InfoOutlined, PrinterOutlined} from "@ant-design/icons";

const ReportPropertyDoc = (props) => {
    const [property, setProperties] = useState([])
    const [idNumber, setIdNumber] = useState('')
    const componentPDF= useRef();
    const context = useContext(Context)

    const fetchData = async () => {
        const response = await
        fetch(`${Url}/api/properties/?fields=id,typeProperty,type_form,name,docNumber,plateMotor,addressChassis,landlord,modelMeter,madeOf,part1plate,part2plate,part3plate,cityPlate,descriptionLocation,paperDoc,insurancePaper,gasCard,carCard,description,soldDate,buyer,soldStatus&name=${context.formikPropertySearch.values.name}&docNumber=${context.formikPropertySearch.values.docNumber}
        &landlord=${context.formikPropertySearch.values.landlord}&madeOf=${context.formikPropertySearch.values.madeOf}
        &plateMotor=${context.formikPropertySearch.values.plateMotor}&id=${context.formikPropertySearch.values.id}&typeProperty=${context.formikPropertySearch.values.typeProperty}
        &part1plate=${context.formikPropertySearch.values.part1plate}&part2plate=${context.formikPropertySearch.values.part2plate}&part3plate=${context.formikPropertySearch.values.part3plate}
        &cityPlate=${context.formikPropertySearch.values.cityPlate}&addressChassis=${context.formikPropertySearch.values.addressChassis}&modelMeter=${context.formikPropertySearch.values.modelMeter}
        &descriptionLocation=${context.formikPropertySearch.values.descriptionLocation}&soldStatus=${context.formikPropertySearch.values.soldStatus}` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setProperties(data)
      }
      useEffect(() => {
            void fetchData()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [context.formikPropertySearch.values])


     const nameFieldHandler = () => {
         if (props.search === 'شماره ثبت'){
             return 'id'
         }else if (props.search === 'نام' || props.search === 'سیستم' ){
             return 'name'
         }else if (props.search === 'نوع ملک' || props.search === 'نوع خودرو' ){
             return 'typeProperty'
         }else if (props.search === 'نام مالک'){
             return 'landlord'
         }else if (props.search === 'سال ساخت'){
             return 'madeOf'
         }else if (props.search === 'پلاک ملک' || props.search === 'شماره موتور'){
             return 'plateMotor'
         }else if (props.search === 'شماره سند'){
             return 'docNumber'
         }else if (props.search === 'محل استقرار'){
             return 'descriptionLocation'
         }else if (props.search === 'شماره شاسی'){
             return 'addressChassis'
         }else if (props.search === 'پلاک'){
             return 'part1plate'
         }
     }

     const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });

    return (
        <Fragment>
            <ObserveModal/>
            <Modal editProperty={context.editProperty} setEditProperty={context.setEditProperty} ModalTitle={context.modalTitle} propToggle={context.propertyToggle} idNumber={idNumber} setIdNumber={setIdNumber}/>

            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                 <div className= 'd-flex  justify-content-between m-4' >
                                <div className= 'd-flex gap-2'>
                                    <div className='d-flex gap-2'>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="manghol"
                                            value='منقول' onChange={props.handleFormPropertyreport}/>
                                            <label className="form-check-label" htmlFor="manghol">
                                            منقول
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="gheirManghol"
                                            value='غیر منقول' onChange={props.handleFormPropertyreport}/>
                                                <label className="form-check-label" htmlFor="gheirManghol">
                                                غیر منقول
                                                </label>
                                        </div>
                                        <div className="form-check ms-4">
                                            <input className="form-check-input" type="checkbox" value="فروخته شده" id="soldCheck" name='soldStatus'
                                            checked={context.formikPropertySearch.values.soldStatus} onChange={e => e.target.checked ?
                                            context.formikPropertySearch.setFieldValue('soldStatus' , true) : context.formikPropertySearch.setFieldValue('soldStatus' , '')} />
                                            <label className="form-check-label" htmlFor="soldCheck">
                                            فروخته شده
                                            </label>
                                        </div>


                                    </div>
                                </div>
                                <div className= 'd-flex gap-2'>
                                    <button className="btn btn-danger " type="button" id="observeDocs"
                                    data-bs-toggle="modal" data-bs-target="#observModal"><CopyOutlined /></button>
                                    <button className="btn btn-outline-secondary"
                                    type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                                </div>
                        </div>

                        <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                                <select className="form-select" id="searchSelector" defaultValue='' style={{maxWidth:'20vw' , minWidth:'200px'}}
                                aria-label="Search Selector" onChange={(e) =>
                                {
                                  context.formikPropertySearch.setFieldValue('name' , '')
                                  context.formikPropertySearch.setFieldValue('docNumber' , '')
                                  context.formikPropertySearch.setFieldValue('landlord' , '')
                                  context.formikPropertySearch.setFieldValue('madeOf' , '')
                                  context.formikPropertySearch.setFieldValue('plateMotor' , '')
                                  context.formikPropertySearch.setFieldValue('id' , '')
                                  context.formikPropertySearch.setFieldValue('typeProperty' , '')
                                  context.formikPropertySearch.setFieldValue('part1plate' , '')
                                  context.formikPropertySearch.setFieldValue('part2plate' , '')
                                  context.formikPropertySearch.setFieldValue('part3plate' , '')
                                  context.formikPropertySearch.setFieldValue('cityPlate' , '')
                                  context.formikPropertySearch.setFieldValue('addressChassis' , '')
                                  context.formikPropertySearch.setFieldValue('modelMeter' , '')
                                  context.formikPropertySearch.setFieldValue('descriptionLocation' , '')
                                  props.setSearch(e.target.value)
                                 if (props.search !== 'نوع ملک' && props.search !== 'نوع خودرو' && props.search !== 'پلاک') {
                                        document.getElementById('searchBoxProp').value = ''
                            }
                                }
                                    }>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>

                                              {(() => {
                                                  if (context.propertyToggle === true){
                                                      return(
                                                      <Fragment>
                                                        <option value="نام">نام</option>
                                                        <option value="شماره سند">شماره سند</option>
                                                        <option value="نوع ملک">نوع ملک</option>
                                                        <option value="نام مالک">نام مالک</option>
                                                        <option value="شماره ثبت">شماره ثبت</option>
                                                        <option value="سال ساخت">سال ساخت</option>
                                                        <option value="پلاک ملک">پلاک ملک</option>
                                                      </Fragment>
                                                      )
                                                  }else if (context.propertyToggle === false){
                                                      return (
                                                           <Fragment>
                                                        <option value="سیستم">سیستم</option>
                                                        <option value="شماره سند">شماره سند</option>
                                                        <option value="نوع خودرو">نوع خودرو</option>
                                                        <option value="نام مالک">نام مالک</option>
                                                        <option value="شماره ثبت">شماره ثبت</option>
                                                        <option value="محل استقرار">محل استقرار</option>
                                                        <option value="پلاک">پلاک</option>
                                                        <option value="شماره شاسی">شماره شاسی</option>
                                                        <option value="شماره موتور">شماره موتور</option>
                                                </Fragment>
                                                      )
                                                  }
                                              })()}
                                </select>
                                <label htmlFor="searchSelector">جستجو براساس</label>
                        </div>

                        <div className='m-4'>
                                {(() => {
                                    if(props.search === 'نوع خودرو'){
                                        return (
                                             <div className="col-3 form-floating" style={{maxWidth:'255px'}}>
                                                <input className="form-control" type='search' list="typeCarList" id="typeCar" name='typeCar' style={{maxWidth:'20vw' , minWidth:'200px'}} onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue('typeProperty' , e.target.value)
                                            }} placeholder="خودرو سواری"/>
                                                <label htmlFor="typeCar">نوع خودرو</label>
                                                <datalist id="typeCarList">
                                                    <option value="خودرو سواری"/>
                                                    <option value="خودرو فرودگاهی"/>
                                                </datalist>
                                             </div>
                                        )
                                    }else if (props.search === 'نوع ملک'){
                                        return (
                                              <div className="col-3 form-floating">
                                                    <input className="form-control" type='search' list="typeEstateList" id="typeEstate" name='typeEstate' onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue('typeProperty' , e.target.value)
                                            }} placeholder="ملک تجاری"/>
                                                    <label htmlFor="typeEstate">نوع ملک</label>
                                                    <datalist id="typeEstateList">
                                                        <option value="ملک غیرتجاری"/>
                                                        <option value="ملک تجاری"/>
                                                    </datalist>
                                                </div>
                                        )
                                    }else if (props.search === 'پلاک'){
                                        return (
                                              <div className="mt-2 input-group">
                                                <input className="form-control c-form__input c-form__car-plate-input__section4" onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue('cityPlate' , e.target.value)
                                            }} type="tel" maxLength='2' placeholder="⚊ ⚊"
                                                id="carPlateSection4"/>
                                                <span className="c-form__car-plate-input__iran">ایران</span>
                                                <input type="tel"  id="carPlateSection3" onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue('part3plate' , e.target.value)
                                            }} placeholder="⚊ ⚊ ⚊" aria-label="First name"
                                                maxLength='3' className="c-form__input form-control"/>
                                                <select id="carPlateSection2" defaultValue=''  className="c-form__combo c-form__car-plate-input__section2" onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue('part2plate' , e.target.value)
                                            }}>
                                                    <option value="" disabled>انتخاب کنید</option>
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
                                                <input type="tel" placeholder="⚊ ⚊"  id="carPlateSection1" maxLength='2' onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue('part1plate' , e.target.value)
                                            }} className="c-form__input form-control"/>
                                                <button className="btn input-group-text c-form__car-plate-input rounded-8"></button>
                                          </div>
                                        )
                                    } else {
                                        return (
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" id='searchBoxProp' onChange={(e) => {
                                                    context.formikPropertySearch.setFieldValue(nameFieldHandler() , e.target.value)
                                            }} placeholder={`جستوجو براساس ${props.search}`} aria-label="searchBoxProp" aria-describedby="searchBoxProp"/>
                                            </div>
                                        )
                                    }
                            })()}
            </div>
            <div className='m-4'>
                <span className="dot bg-danger"></span><span> به معنی فروخته شده و قفل شده</span>
            </div>
            {context.propertyToggle === null ? null :
                <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                    <table className="table table-hover table-fixed text-center align-middle table-bordered border-primary bg-light" ref={componentPDF} style={{direction:'rtl'}}>
                         <thead className= 'bg-light'>
                            <tr>
                                {context.propertyToggle ?
                                    <Fragment>
                                        <th scope="col">ردیف</th>
                                        <th scope="col">شماره ثبت</th>
                                        <th scope="col">نوع</th>
                                        <th scope="col">نام</th>
                                        <th scope="col">شماره سند</th>
                                        <th scope="col">پلاک</th>
                                        <th scope="col">آدرس</th>
                                        <th scope="col">مالک</th>
                                        <th scope="col">متراژ</th>
                                        <th scope="col">سال ساخت</th>
                                        <th scope="col">نمایش</th>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <th scope="col">ردیف</th>
                                        <th scope="col">شماره ثبت</th>
                                        <th scope="col">نوع</th>
                                        <th scope="col">سیستم</th>
                                        <th scope="col">شماره سند</th>
                                        <th scope="col">شماره موتور</th>
                                        <th scope="col">شماره شاسی</th>
                                        <th scope="col">مالک</th>
                                        <th scope="col">مدل</th>
                                        <th scope="col">پلاک</th>
                                        <th scope="col">محل استقرار</th>
                                        <th scope="col">برگ سند</th>
                                        <th scope="col">بیمه نامه</th>
                                        <th scope="col">کارت سوخت</th>
                                        <th scope="col">کارت ماشین</th>
                                        <th className='d-print-none' scope="col">نمایش</th>
                                    </Fragment>
                                }
                            </tr>
                         </thead>
                        <tbody>
                            {(property.length > 0 && property.filter(property => property.type_form === !context.propertyToggle).map((data) => (
                                <tr key={data.id} style={{backgroundColor:`${(data.soldStatus ? 'hsl(0, 100%, 80%)' : null) }`}}>
                                    <th scope="row">1</th>
                                    <td>{data.id}</td>
                                    <td>{data.typeProperty}</td>
                                    <td>{data.name}</td>
                                    <td>{data.docNumber}</td>
                                    <td>{data.plateMotor}</td>
                                    <td>{data.addressChassis}</td>
                                    <td>{data.landlord}</td>
                                    <td>{data.modelMeter}</td>

                                    {context.propertyToggle ?
                                        <Fragment>
                                            <td>{data.madeOf}</td>
                                            <td>
                                                <button className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                            context.handleEditProperty()
                                            setIdNumber(data.id)
                                            context.setModalTitle('visit')
                                        }}><InfoOutlined /></button>
                                            </td>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <td>{data.part3plate}/{data.cityPlate} - {data.part2plate} -{data.part1plate}</td>
                                            <td>{data.descriptionLocation}</td>
                                            <td>{data.paperDoc}</td>
                                            <td>{data.insurancePaper}</td>
                                            <td>{data.gasCard}</td>
                                            <td>{data.carCard}</td>
                                            <td className='d-print-none'>
                                                <button className= 'btn btn-warning' id='infoBtn'
                                                data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                            context.handleEditProperty()
                                            setIdNumber(data.id)
                                            context.setModalTitle('visit')
                                        }}><InfoOutlined /></button>
                                    </td>
                                </Fragment>
                            }
                        </tr>
                        ))) ||
                        <tr>
                            <td colSpan="16" className='h3'><div className="spinner-border text-primary" role="status">
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
export default ReportPropertyDoc