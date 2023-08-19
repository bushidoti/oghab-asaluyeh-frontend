import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import Modal from "./modal";
import Url from "../../../config";
import {useReactToPrint} from "react-to-print";
import {useFormik} from "formik";
import MoveModal from "./move_modal";
import ObserveModal from "./observemodal";
import {Permission} from "../permission";
import {Thead} from "./thead";
import {DeleteOutlined, InfoOutlined, PrinterOutlined, SwapOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Context} from "../../../../context";
import RecycleModal from "./recycle_modal";

const ReportProperty = () => {
    const [factors, setFactors] = useState([])
    const [typeProperty , setTypeProperty] = useState('')
    const [searchFor , setSearchFor] = useState('')
    const [property, setProperty] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const [systemIDBtn, setSystemIDBtn] = useState(true)
    const [typeDigital , setTypeDigital] = useState('')
    const [typeCommunication , setTypeCommunication] = useState('')
    const [viewOnly, setViewOnly] = useState(false)
    const [rank, setRank] = useState('');
    const [office, setOffice] = useState('');
    const context = useContext(Context)
    const [editStatus, setEditStatus] = useState(false)
    const componentPDF= useRef();
    const [factorBtn, setFactorBtn] = useState(true)
    const formik = useFormik({
            initialValues: {
                  code: '',
                  name: '',
                  user: '',
                  install_location: '',
                  model: '',
                  year_made: '',
                  owner: '',
                  use_for: '',
                  chassis: '',
                  motor: '',
                  plate1: '',
                  plate2: '',
                  plate3: '',
                  plate4: '',
                  year_buy: '',
                  using_location: '',
                  number_type: '',
                  number: '',
                  type_item: '',
            },
            enableReinitialize: true,
        });

    const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current, documentTitle:"Data",pageStyle:''
    });

    const fetchData = async () => {
        if (typeProperty !== ''){
                const response = await fetch(`${Url}/api/${typeProperty}/?code=${formik.values.code}&name=${formik.values.name}&user=${formik.values.user}&install_location=${formik.values.install_location}&use_for=${formik.values.use_for}&year_buy=${formik.values.year_buy}&model=${formik.values.model}&using_location=${formik.values.using_location}&year_made=${formik.values.year_made}&motor=${formik.values.motor}&chassis=${formik.values.chassis}&owner=${formik.values.owner}&plate1=${formik.values.plate1}&plate2=${formik.values.plate2}&plate3=${formik.values.plate3}&plate4=${formik.values.plate4}&type_item=${formik.values.type_item}&number_type=${formik.values.number_type}&number=${formik.values.number}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
                const data = await response.json()
                setProperty(data)
        }
    }
    
      
    const handleSearch = () => {
        if (searchFor === 'کد ثبت'){
            return 'code'
        }else if (searchFor === 'مورد استفاده'){
            return 'use_for'
        }else if (searchFor === 'یوزر'){
            return 'user'
        }else if (searchFor === 'محل نصب'){
            return 'install_location'
        }else if (searchFor === 'محل استفاده'){
            return 'using_location'
        }else if (searchFor === 'سال خرید'){
            return 'year_buy'
        }else if (searchFor === 'مدل'){
            return 'model'
        }else if (searchFor === 'نام اثاث'){
            return 'name'
        }else if (searchFor === 'سال ساخت'){
            return 'year_made'
        }else if (searchFor === 'نام خودرو'){
            return 'name'
        }else if (searchFor === 'شماره شاسی'){
            return 'chassis'
        }else if (searchFor === 'شماره موتور'){
            return 'motor'
        }else if (searchFor === 'مالکیت'){
            return 'owner'
        }else if (searchFor === 'نام ابزار'){
            return 'name'
        }else if (searchFor === 'مکان استفاده'){
            return 'using_location'
        }else if (searchFor === 'نام اقلام'){
            return 'name'
        }else if (searchFor === 'نوع قلم'){
            return 'type_item'
        }else if (searchFor === 'شماره'){
            return 'number'
        }
      
    }
      
     const handleSystem = () => {
        if (factors.filter(product => product.systemID === context.systemIDFactorProperty && product.inventory === context.office)[0]){
            return setSystemIDBtn(false)
        }else return setSystemIDBtn(true)
    }

    const handleCheckFactor = () => {
        if (factors.filter(product => product.document_code === context.factor && product.document_code !== '' && product.inventory === context.office)[0]){
            return setFactorBtn(false)
        }else return setFactorBtn(true)
    }

     const fetchDataFactors = async () => {
        const response = await fetch(`${Url}/api/factors/?fields=document_code,inventory,systemID,date`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setFactors(data)
      }

     useEffect(() => {
            void fetchData()
             handleSystem()
            void fetchDataFactors()
             handleCheckFactor()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [typeProperty, formik.values , context.systemIDFactorProperty, context.factor ])

    return (
        <Fragment>
            <Permission setRank={setRank} setOffice={setOffice}/>
            <Modal setTypeCommunication={setTypeCommunication} scan={context.scan} typeCommunication={typeCommunication} viewOnly={viewOnly} setViewOnly={setViewOnly}  typeProperty={typeProperty} editStatus={editStatus} setEditStatus={setEditStatus} idNumber={idNumber} setIdNumber={setIdNumber} setTypeDigital={setTypeDigital} typeDigital={typeDigital}/>
            <MoveModal setTypeCommunication={setTypeCommunication} typeCommunication={typeCommunication}  typeProperty={typeProperty} editStatus={editStatus} setEditStatus={setEditStatus} idNumber={idNumber} setIdNumber={setIdNumber} setTypeDigital={setTypeDigital} typeDigital={typeDigital}/>
            <RecycleModal setTypeCommunication={setTypeCommunication} typeCommunication={typeCommunication}  typeProperty={typeProperty} editStatus={editStatus} setEditStatus={setEditStatus} idNumber={idNumber} setIdNumber={setIdNumber} setTypeDigital={setTypeDigital} typeDigital={typeDigital}/>
            <ObserveModal setTypeCommunication={setTypeCommunication} typeCommunication={typeCommunication}  typeProperty={typeProperty} editStatus={editStatus} setEditStatus={setEditStatus} idNumber={idNumber} setIdNumber={setIdNumber} setTypeDigital={setTypeDigital} typeDigital={typeDigital}/>
            <div className= 'plater  m-2 rounded-3 shadow-lg mb-4'>
                 <div className= 'd-flex  justify-content-between m-4' >
                        <div className= 'd-flex gap-2  align-items-center'>
                        <div className="form-floating">
                                <select className="form-select" id="typeProperty" defaultValue=''
                                aria-label="Type Property" onChange={(e) => {
                                  formik.resetForm()
                                  if (searchFor !== 'نام تجهیزات' && searchFor !== 'پلاک' && searchFor !== 'نوع خط') {
                                        document.getElementById('searchBox').value = ''
                                    }
                                  setTypeProperty(e.target.value)
                                  document.getElementById("searchList").selectedIndex = "0";
                                  setSearchFor('')
                                }}>
                                        <option value='' disabled>یک مورد انتخاب کنید</option>
                                        <option value="safetyequipment">تجهیزات ایمنی</option>
                                        <option value="airportequipment">تجهیزات فرودگاهی</option>
                                        <option value="electronicfurniture">اثاثه الکترونیکی</option>
                                        <option value="officefurniture">اثاثه اداری</option>
                                        <option value="facilityfurniture">اثاثه تاسیساتی</option>
                                        <option value="airportfurniture">اثاثه فرودگاهی</option>
                                        <option value="digitalfurniture">اثاثه دیجیتالی</option>
                                        <option value="airportvehicle">خودرو فرودگاهی</option>
                                        <option value="officevehicle">خودرو اداری</option>
                                        <option value="airplane">هواپیما</option>
                                        <option value="noneindustrialtool">ابزار آلات غیر صنعتی</option>
                                        <option value="industrialtool">ابزار آلات صنعتی</option>
                                        <option value="supportitem">اقلام پشتیبانی</option>
                                        <option value="benefit">امتیازات</option>
                                </select>
                                <label htmlFor="typeProperty">نوع اموال</label>
                        </div>
                          <div className='d-flex gap-3 ms-4'>
                                <div className="input-group">
                                    <Link to= '/billproperty'  style={{pointerEvents:factorBtn ? 'none' : ''}}>
                                    <button className="btn btn-info" type="button" id="billBtn" disabled={factorBtn} style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}}
                                          onClick={() => context.setModalTitle('factor')}>مشاهده فاکتور</button></Link>
                                    <input type="text" className="form-control" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}} onChange={e => {
                                         context.setFactor(e.target.value)
                                        context.setModalTitle('factor')
                                    }} placeholder="شماره فاکتور" value={context.factor}
                                    aria-label="مشاهده انبار" id="billInp" aria-describedby="billBtn"/>
                                </div>
                                <div className="input-group">
                                    <Link to= '/billproperty' style={{pointerEvents:systemIDBtn ? 'none' : ''}}>
                                    <button className="btn btn-info" type="button" id="systemInpBtn" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}}
                                            disabled={systemIDBtn} onClick={() => context.setModalTitle('factor')}>مشاهده گزارش رایانه</button></Link>
                                    <input type="text" className="form-control" id="systemInp"
                                       style={{maxWidth:'20vw' , minWidth:'10px' , maxHeight:'10vh' , fontSize:'1vw'}} onChange={e => context.setSystemIDFactorProperty(e.target.value)} value={context.systemIDFactorProperty} placeholder="شماره رایانه"
                                    aria-label="شماره رایانه" aria-describedby="systemInp"/>
                            </div>
                      </div>
                    </div>
                    <div className= 'd-flex gap-2'>
                        <button className="btn btn-outline-secondary h-75" type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                    </div>
                        </div>

                    <hr className='bg-primary mb-5'/>

                        <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                                <select className="form-select" id="searchList" defaultValue='' style={{maxWidth:'20vw' , minWidth:'200px'}}
                                aria-label="Search List" onChange={(e) =>
                        {
                          formik.resetForm()
                          setSearchFor(e.target.value)
                          if (searchFor !== 'نام تجهیزات' && searchFor !== 'پلاک' && searchFor !== 'نوع خط') {
                                document.getElementById('searchBox').value = ''
                            }


                        }}
                           >
                                    <option value='' disabled>یک مورد انتخاب کنید</option>
                                    {(() => {
                                        if (typeProperty === 'safetyequipment'){
                                            return(
                                                <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام تجهیزات">نام تجهیزات</option>
                                                    <option value="مورد استفاده">مورد استفاده</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="محل نصب">محل نصب</option>
                                                </Fragment>
                                            )
                                        }else if (typeProperty === 'airportequipment'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام تجهیزات">نام تجهیزات</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="سال ساخت">سال ساخت</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="مالکیت">مالکیت</option>
                                                    <option value="محل نصب">محل نصب</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'digitalfurniture'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام اثاث">نام اثاث</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="محل نصب">محل نصب</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'electronicfurniture'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام اثاث">نام اثاث</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="سال خرید">سال خرید</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="محل نصب">محل نصب</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'officefurniture'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام اثاث">نام اثاث</option>
                                                    <option value="سال ساخت">سال ساخت</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="محل استفاده">محل استفاده</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'facilityfurniture'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام اثاث">نام اثاث</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="سال خرید">سال خرید</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="محل نصب">محل نصب</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'airportfurniture'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام اثاث">نام اثاث</option>
                                                    <option value="سال خرید">سال خرید</option>
                                                    <option value="محل نصب">محل نصب</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'airportvehicle' || typeProperty === 'officevehicle' ){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام خودرو">نام خودرو</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="پلاک">پلاک</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="شماره موتور">شماره موتور</option>
                                                    <option value="شماره شاسی">شماره شاسی</option>
                                                    <option value="سال ساخت">سال ساخت</option>
                                                    <option value="مالکیت">مالکیت</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'airplane' ){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام هواپیما">نام هواپیما</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="شماره موتور">شماره موتور</option>
                                                    <option value="شماره شاسی">شماره شاسی</option>
                                                    <option value="سال ساخت">سال ساخت</option>
                                                    <option value="مالکیت">مالکیت</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'noneindustrialtool'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام ابزار">نام ابزار</option>
                                                    <option value="یوزر">یوزر</option>
                                                    <option value="سال خرید">سال خرید</option>
                                                    <option value="مکان استفاده">مکان استفاده</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'industrialtool'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نام ابزار">نام ابزار</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="سال خرید">سال خرید</option>
                                                    <option value="مکان استفاده">مکان استفاده</option>
                                                    <option value="یوزر">یوزر</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'supportitem'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نوع قلم">نوع قلم</option>
                                                    <option value="نام اقلام">نام اقلام</option>
                                                    <option value="مدل">مدل</option>
                                                    <option value="مکان استفاده">مکان استفاده</option>
                                                    <option value="یوزر">یوزر</option>
                                                  </Fragment>
                                            )
                                        }else if (typeProperty === 'benefit'){
                                            return(
                                                  <Fragment>
                                                    <option value="کد ثبت">کد ثبت</option>
                                                    <option value="نوع خط">نوع خط</option>
                                                    <option value="مکان استفاده">مکان استفاده</option>
                                                    <option value="شماره">شماره</option>
                                                  </Fragment>
                                            )
                                        }
                                    })()}
                                </select>
                                <label htmlFor="searchList">جستجو براساس</label>
                        </div>
                        <div className='m-4'>
                                {(() => {
                                    if(searchFor === 'نام تجهیزات'){
                                        return (
                                             <div className="col-3 form-floating" style={{maxWidth:'255px'}}>
                                                <input className="form-control" type='search' list="nameEquipmentList"
                                                   id="nameEquipment" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                                   name='name' onChange={formik.handleChange} placeholder="نقاله" required/>
                                                <label htmlFor="nameEquipment">نام تجهیزات</label>
                                                <datalist id="nameEquipmentList">
                                                    <option value="X RAY"/>
                                                    <option value="نقاله"/>
                                                    <option value="کانتر"/>
                                                    <option value="ایرکاندیشن"/>
                                                </datalist>
                                                <div className="invalid-feedback">
                                                نام تجهیزات را وارد کنید.
                                                </div>
                                             </div>
                                        )
                                    }else if (searchFor === 'نوع خط'){
                                        return (
                                              <div className="form-floating" style={{maxWidth:'255px'}}>
                                                    <input className="form-control" type='search' list="typeLineList"
                                                       style={{maxWidth:'20vw' , minWidth:'200px'}} name='number_type'
                                                       onChange={formik.handleChange} id="typeLine" placeholder="02133229964" required/>
                                                    <label htmlFor="typeLine">نوع خط</label>
                                                    <datalist id="typeLineList">
                                                        <option value="سیم کارت"/>
                                                        <option value="ثابت"/>
                                                    </datalist>
                                                    <div className="invalid-feedback">
                                                    نوع خط را انتخاب کنید.
                                                    </div>
                                                </div>
                                        )
                                    }else if (searchFor === 'پلاک'){
                                        return (
                                              <div className="mt-2 input-group">
                                                <input className="form-control c-form__input c-form__car-plate-input__section4" name='plate4' onChange={formik.handleChange} type="tel" maxLength='2' placeholder="⚊ ⚊"
                                                id="carPlateSection4"/>
                                                <span className="c-form__car-plate-input__iran">ایران</span>
                                                <input type="tel"  id="carPlateSection3" placeholder="⚊ ⚊ ⚊" name='plate3' onChange={formik.handleChange} aria-label="First name"
                                                maxLength='3' className="c-form__input form-control"/>
                                                <select id="carPlateSection2" defaultValue='' name='plate2' onChange={formik.handleChange} className="c-form__combo c-form__car-plate-input__section2">
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
                                                <input type="tel" placeholder="⚊ ⚊" name='plate1' onChange={formik.handleChange} id="carPlateSection1" maxLength='2' className="c-form__input form-control"/>
                                                <button className="btn input-group-text c-form__car-plate-input rounded-8"></button>
                                          </div>
                                        )
                                    } else {
                                        return (
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" name={handleSearch()} onChange={formik.handleChange} placeholder={`جستوجو براساس ${searchFor}`}
                                                aria-label="searchBox" id='searchBox' aria-describedby="search"/>
                                            </div>
                                        )
                                    }
                            })()}
            </div>
                    <div className='m-4'>
                        <span className="dot bg-danger"></span><span> به معنی جا به جا شده و قفل شده</span>
                        <span className="dot bg-warning ms-4"></span><span> به معنی ارسال شده برای تعمیر و موقتاً قفل شده</span>
                        <span className="dot bg-success ms-4"></span><span> به معنی در انتظار تایید جا به جایی در مقصد</span>
                        <span className="dot ms-4" style={{backgroundColor:'hsla(240,38%,63%,0.59)'}}></span><span> به معنی بایگانه شده</span>
                    </div>
                <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '35vh'}}>
                    <table className="table table-hover table-fixed text-center align-middle table-bordered border-primary bg-light" style={{direction:'rtl' , fontSize:'1vw'}} ref={componentPDF}>
                            <Thead typeProperty={typeProperty}/>
                        <tbody>
                             {(() => {
                                    if (typeProperty === 'airportequipment'){
                                        return (
                                          (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                           <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                <th scope="row">{i+1}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.model}</td>
                                                <td>{data.year_made}</td>
                                                <td>{data.user}</td>
                                                <td>{data.owner}</td>
                                                <td>{data.install_location}</td>
                                                <td className='d-print-none'>
                                                    <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                    }}>
                                                        construction</button>
                                                    <button className= 'btn btn-warning mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                           setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                    <button className='btn btn-secondary' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                    <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                </td>
                                           </tr>
                                             ))) ||

                                              <tr>
                                                <td colSpan="9" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'safetyequipment'){
                                        return (
                                          (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                            <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                <th scope="row">{i+1}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.use_for}</td>
                                                <td>{data.user}</td>
                                                <td>{data.install_location}</td>
                                                <td className='d-print-none'>
                                                    <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                    }}>
                                                        construction</button>
                                                    <button className= 'btn btn-warning  mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                    <button className='btn btn-secondary ' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                    <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                </td>
                                            </tr>
                                                     ))) ||

                                              <tr>
                                                <td colSpan="7" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'digitalfurniture'){
                                        return (
                                          (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                            <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                <th scope="row">{i+1}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.model}</td>
                                                <td className='d-print-none'>
                                                    <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                    }}>
                                                        construction</button>
                                                    <button className= 'btn btn-warning  mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setTypeDigital(data.type_furniture)
                                                            setTypeCommunication(data.name)
                                                             setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                    <button className='btn btn-secondary ' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                    <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                </td>
                                            </tr>
                                                     ))) ||

                                              <tr>
                                                <td colSpan="5" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'electronicfurniture' || typeProperty === 'facilityfurniture'){
                                        return (
                                          (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.install_location}</td>
                                                    <td className='d-print-none'>
                                                        <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                          }}>
                                                        construction</button>
                                                        <button className= 'btn btn-warning  mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary ' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                             ))) ||
                                              <tr>
                                                <td colSpan="8" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'officefurniture'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.year_made}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.using_location}</td>
                                                    <td className='d-print-none'>
                                                        <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                          }}>
                                                        construction</button>
                                                        <button className= 'btn btn-warning  mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary ' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="7" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'airportfurniture'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.install_location}</td>
                                                    <td className='d-print-none'>
                                                        <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                          }}>
                                                        construction</button>
                                                        <button className= 'btn btn-warning  mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary ' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="6" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'airportvehicle' || typeProperty === 'officevehicle' ){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.plate4} / {data.plate3} - {data.plate2} - {data.plate1}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.motor}</td>
                                                    <td>{data.chassis}</td>
                                                    <td>{data.year_made}</td>
                                                    <td>{data.owner}</td>
                                                    <td className='d-print-none'>
                                                        <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                          }}>
                                                        construction</button>
                                                        <button className= 'btn btn-warning mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="11" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'airplane'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.motor}</td>
                                                    <td>{data.chassis}</td>
                                                    <td>{data.year_made}</td>
                                                    <td>{data.owner}</td>
                                                    <td className='d-print-none'>
                                                        <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                          }}>
                                                        construction</button>
                                                        <button className= 'btn btn-warning mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="10" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'noneindustrialtool'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.user}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.using_location}</td>
                                                    <td className='d-print-none'>
                                                        <button className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="7" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'industrialtool'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.year_buy}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.user}</td>
                                                    <td className='d-print-none'>
                                                        <button className='btn btn-primary material-symbols-outlined' data-bs-toggle="modal" data-bs-target="#observeModal" onClick={() => {
                                                        setIdNumber(data.code)
                                                          }}>
                                                        construction</button>
                                                        <button className= 'btn btn-warning  mx-2' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary ' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="8" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'supportitem'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr style={{backgroundColor:`${(data.movement_status === 'received' ? 'hsl(0, 100%, 80%)' : null) || (data.movement_status === 'pending' ? 'hsl(120, 59%, 70%)' : null) || (data.cancel_status === 'agreed' ? 'hsla(240,38%,63%,0.59)' : null) }`}} key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.type_item}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.model}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.user}</td>
                                                    <td className='d-print-none'>
                                                        <button className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setIdNumber(data.code)
                                                            setViewOnly(true)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-secondary  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#moveModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}>
                                                            <SwapOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           ))) ||
                                              <tr>
                                                <td colSpan="8" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }else if (typeProperty === 'benefit'){
                                        return (
                                           (property.length > 0 && property.filter(property => {if (rank === 'مدیر'){
                                              return property.inventory
                                          }else{
                                              return (property.inventory === office)
                                          }}).map((data,i) => (
                                                <tr key={data.code}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{data.code}</td>
                                                    <td>{data.number_type}</td>
                                                    <td>{data.using_location}</td>
                                                    <td>{data.number}</td>
                                                    <td className='d-print-none'>
                                                        <button className= 'btn btn-warning ' data-bs-toggle="modal" data-bs-target="#modalMain" onClick={() => {
                                                            setEditStatus(true)
                                                            setViewOnly(true)
                                                            setIdNumber(data.code)
                                                        }}><InfoOutlined /></button>
                                                        <button className='btn btn-danger  ms-2' disabled={data.movement_status === 'received' || data.cancel_status === 'agreed'} data-bs-toggle="modal" data-bs-target="#recycleModal" onClick={() => {
                                                            setIdNumber(data.code)
                                                        }}><DeleteOutlined /></button>
                                                    </td>
                                                </tr>
                                           )))  ||
                                              <tr>
                                                <td colSpan="6" className='h3'>
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div></td>
                                              </tr>
                                        )
                                    }
                                })()}
                    </tbody>
                </table>
            </div>
        </div>
    </Fragment>
    )
}
export default ReportProperty;