import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import ObserveModal from "./observemodal";
import Modal from "./main_modal";
import { memo } from "react";
import Url from "../../../config";
import {useReactToPrint} from "react-to-print";
import {Permission} from "../permission";
import {Context} from "../../../../context";
import ManualModal from "./manual_register_modal";
import {Link} from "react-router-dom";
import {PrinterOutlined} from "@ant-design/icons";
import fixNumbers from "../../persianNumbers"
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import {CustomInputDate} from "../../../../App";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ReportProducts = () => {
    const [product, setProduct] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const [idNumberProduct, setIdNumberProduct] = useState(null)
    const [factorBtn, setFactorBtn] = useState(true)
    const [checkBtn, setCheckBtn] = useState(true)
    const [handleBtn, setHandleBtn] = useState(true)
    const [systemIDBtn, setSystemIDBtn] = useState(true)
    const [rank, setRank] = useState('');
    const [products, setProducts] = useState([])
    const [search , setSearch] = useState('')
    const [office, setOffice] = useState('');
    const componentPDF= useRef();
    const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });
    const context = useContext(Context)

      const fetchData = async () => {
        const response = await fetch(`${Url}/api/allproducts/?fields=product,input,output,systemID,document_code,document_type,date,operator,inventory,afterOperator,obsolete,consumable,buyer,receiver,amendment,id`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProduct(data)
      }

    const fetchDataProducts = async () => {
        const response = await fetch(`${Url}/api/allproducts/?fields=product,input,name,category,systemID,scale,inventory,output,document_code,document_type,date,operator,afterOperator,obsolete,consumable,buyer,receiver,amendment,id`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProducts(data)
      }

    useEffect(() => {
            void fetchDataProducts()
            void fetchData()
                 handleCheckFactor()
                 handleHandling()
                 handleCheck()
                 handleSystem()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [context.systemIDFactor ,idNumberProduct , context.factor , context.billCheck , context.handling])


    const handleCheckFactor = () => {
        if (product.filter(product => product.document_code === context.factor && product.document_code !== '' && product.document_type === 'فاکتور' && product.inventory === context.office)[0]){
            return setFactorBtn(false)
        }else return setFactorBtn(true)
    }
    const handleCheck = () => {
        if (product.filter(product => product.document_code === context.billCheck && product.document_code !== '' && product.document_type === 'حواله' && product.inventory === context.office)[0]){
            return setCheckBtn(false)
        }else return setCheckBtn(true)
    }

     const handleHandling = () => {
        if (product.filter(product => product.document_code === context.handling && product.document_code !== '' && product.document_type === 'انبارگردانی' && product.inventory === context.office)[0]){
            return setHandleBtn(false)
        }else return setHandleBtn(true)
    }


  function handleChange(value){
            context.formikProductSearch.setFieldValue('date' , value.format("YYYY-MM-DD"))
        }

  const handleSystem = () => {
        if (product.filter(product => product.systemID === context.systemIDFactor && product.document_type === 'فاکتور' && product.inventory === context.office)[0]){
            return setSystemIDBtn(false)
        }else return setSystemIDBtn(true)
    }
  const handleValues = () => {
        if (search === 'نام کالا'){
              return context.formikProductSearch.values.name
        }else  if (search === 'کد'){
              return context.formikProductSearch.values.product
        }else  if (search === 'نام خریدار'){
              return context.formikProductSearch.values.buyer
        }else  if (search === 'نام گیرنده'){
              return context.formikProductSearch.values.recevier
        }
  }
    return (
        <Fragment>
        <Permission setRank={setRank} setOffice={setOffice}/>
        <ObserveModal setModalTitle={context.setModalTitle} handleProduct={context.handleProduct} idNumber={idNumber}
        setIdNumberProduct={setIdNumberProduct} setIdNumber={setIdNumber} formik={context.formikProductSearch} />
        <Modal modalTitle={context.modalTitle} idNumber={idNumber} office={office} setIdNumber={setIdNumber}
        products={products} setIdNumberProduct={setIdNumberProduct} idNumberProduct={idNumberProduct}/>
        <ManualModal modalTitle={context.modalTitle} idNumber={idNumber} office={office} setIdNumber={setIdNumber}
        products={products} setIdNumberProduct={setIdNumberProduct} idNumberProduct={idNumberProduct}/>
        <div className= 'plater m-2 rounded-3 shadow-lg'>
            <div className= 'd-flex justify-content-between m-4' >
                <div className='d-flex flex-lg-nowrap gap-2 flex-wrap'>
                    <div className="input-group mb-3">
                        <Link to= '/billcheck'  style={{pointerEvents:factorBtn ? 'none' : ''}}>
                        <button className="btn btn-info" type="button" id="billBtn" disabled={factorBtn} style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}}
                              onClick={() => context.setModalTitle('factor')}>مشاهده فاکتور</button></Link>
                        <input type="text" className="form-control" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}} onChange={e => {
                             context.setFactor(e.target.value)
                            context.setModalTitle('factor')
                        }} placeholder="شماره فاکتور" value={context.factor}
                        aria-label="مشاهده انبار" id="billInp" aria-describedby="billBtn"/>
                    </div>
                    <div className="input-group mb-3">
                        <Link to= '/billcheck' style={{pointerEvents:checkBtn ? 'none' : ''}}>
                        <button className="btn btn-info" type="button" id="checkBtn" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}}
                                disabled={checkBtn} onClick={() => context.setModalTitle('check')}>مشاهده حواله</button></Link>
                        <input type="text" className="form-control" id="checkInp" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}} onChange={e => context.setBillCheck(e.target.value)} value={context.billCheck} placeholder="شماره حواله"
                        aria-label="مشاهده حواله" aria-describedby="checkBtn"/>
                    </div>
                    <div className="input-group mb-3">
                        <Link to= '/billcheck' style={{pointerEvents:handleBtn ? 'none' : ''}}>
                        <button className="btn btn-info" type="button" id="handlingBtn" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}}
                                disabled={handleBtn} onClick={() => context.setModalTitle('handling')}>مشاهده گزارش انبارگردانی</button></Link>
                        <input type="text" className="form-control" id="handlingInp"
                           style={{maxWidth:'20vw' , minWidth:'10px' , maxHeight:'10vh' , fontSize:'1vw'}} onChange={e => context.setHandling(e.target.value)} value={context.handling} placeholder="شناسه انبارگردانی"
                        aria-label="شناسه انبارگردانی" aria-describedby="handlingBtn"/>
                    </div>
                    <div className="input-group mb-3 me-3">
                        <Link to= '/billcheck' style={{pointerEvents:systemIDBtn ? 'none' : ''}}>
                        <button className="btn btn-info" type="button" id="systemInpBtn" style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh' , fontSize:'1vw'}}
                                disabled={systemIDBtn} onClick={() => context.setModalTitle('factor')}>مشاهده گزارش رایانه</button></Link>
                        <input type="text" className="form-control" id="systemInp"
                           style={{maxWidth:'20vw' , minWidth:'10px' , maxHeight:'10vh' , fontSize:'1vw'}} onChange={e => context.setSystemIDFactor(e.target.value)} value={context.systemIDFactor} placeholder="شماره رایانه"
                        aria-label="شماره رایانه" aria-describedby="systemInp"/>
                    </div>
                </div>
                <div className= 'd-flex gap-2' style={{maxWidth:'255px'}}>
                <button className="btn btn-outline-secondary h-100 ms-2"
                    style={{maxWidth:'20vw' , minWidth:'50px' , maxHeight:'10vh'}} type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                </div>
            </div>

            <div className='m-4'>
                <div className="form-floating my-2" style={{maxWidth:'255px'}}>
                        <select className="form-select" defaultValue='' id="searchSelector" style={{maxWidth:'20vw' , minWidth:'200px'}}  onChange={(e) => {
                            context.formikProductSearch.setFieldValue('product' , '')
                            context.formikProductSearch.setFieldValue('name' , '')
                            context.formikProductSearch.setFieldValue('category' , '')
                            context.formikProductSearch.setFieldValue('receiver' , '')
                            context.formikProductSearch.setFieldValue('buyer' , '')
                            context.formikProductSearch.setFieldValue('consumable' , '')
                            context.formikProductSearch.setFieldValue('date' , '')
                            context.formikProductSearch.setFieldValue('operator' , '')
                            setSearch(e.target.value)
                        }}
                            aria-label="Search Select">
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            <option value="کد">کد</option>
                            <option value="عملیات">عملیات</option>
                            <option value="گروه">گروه</option>
                            <option value="نام کالا">نام کالا</option>
                            <option value="نام گیرنده">نام گیرنده</option>
                            <option value="نام خریدار">نام خریدار</option>
                            <option value="مورد مصرف">مورد مصرف</option>
                            <option value="تاریخ ثبت">تاریخ ثبت</option>
                        </select>
                        <label htmlFor="searchSelector">جستجو براساس</label>
                </div>
                {(() => {
                            if (search === 'تاریخ ثبت') {
                              return (
                                <DatePicker
                                 animations={[transition()]}
                                 render={<CustomInputDate  ids={"date"} names='date' label='تاریخ ثبت'  />}
                                 id="date"
                                 name='date'
                                 onChange={handleChange}
                                 format={'YYYY/MM/DD'}
                                 calendar={persian}
                                 onOpenPickNewDate={false}
                                 locale={persian_fa}
                             />
                              )
                            }else if (search === 'عملیات') {
                                    return (
                                        <div className="form-floating" style={{maxWidth:'255px'}}>
                                            <select className="form-select" defaultValue='' id="searchOperation" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                            onChange={e => context.formikProductSearch.setFieldValue('operator' , e.target.value)}
                                                aria-label="Search Operation">
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="ورود">ورود</option>
                                                <option value="خروج">خروج</option>
                                                <option value="ثبت اولیه">ثبت اولیه</option>
                                            </select>
                                            <label htmlFor="searchOperation">نوع عملیات</label>
                                      </div>
                                    )
                                }else if (search === 'مورد مصرف') {
                                    return (
                                        <div className="form-floating" style={{maxWidth:'255px'}}>
                                            <input className="form-control" type='search' value={context.formikProductSearch.values.consumable} style={{maxWidth:'20vw' , minWidth:'200px'}}
                                            onChange={e => context.formikProductSearch.setFieldValue('consumable' , e.target.value)} list="consumeCauseList" id="consumeCause" placeholder="اجاره"/>
                                            <label htmlFor="consumeCause">مورد مصرف</label>
                                            <datalist id="consumeCauseList">
                                                <option value="اداری"/>
                                                <option value="موتور پول"/>
                                                <option value="مهندسی"/>
                                                <option value="مالی"/>
                                                <option value="آموزش"/>
                                                <option value="ایستگاه"/>
                                                <option value="حقوقی"/>
                                                <option value="بازرگانی"/>
                                                <option value="تدارکات"/>
                                                <option value="حراست"/>
                                                <option value="آبدارخانه"/>
                                                <option value="مدیریت"/>
                                                <option value="عملیات"/>
                                                <option value="خدمات فرودگاهی"/>
                                                <option value="پشتیبانی"/>
                                                <option value="ایمنی"/>
                                                <option value="سپاه"/>
                                                <option value="دیسپج"/>
                                                <option value="پلیس"/>
                                            </datalist>
                                        </div>
                                    )
                                }else if (search === 'گروه') {
                                    return (
                                        <div className="form-floating" style={{maxWidth:'255px'}}>
                                                <input className="form-control" type='search' value={context.formikProductSearch.values.category}
                                               onChange={context.formikProductSearch.handleChange} name='category' list="groupProductList" id="groupProduct"
                                                placeholder="اداری" required/>
                                                <label htmlFor="groupProduct">گروه</label>
                                                <datalist id="groupProductList">
                                                    <option value="اداری"/>
                                                    <option value="ترابری"/>
                                                    <option value="تاسیسات"/>
                                                    <option value="تجهیزات"/>
                                                    <option value="آشپزخانه"/>
                                                    <option value="آبدارخانه"/>
                                                    <option value="بهداشتی"/>
                                                    <option value="پشتیبانی"/>
                                                </datalist>
                                                   <div className="invalid-feedback">
                                                 گروه  را انتخاب کنید.
                                             </div>
                                          </div>
                                    )
                            }else {
                                return (
                                     <div className="input-group mb-3">
                                        <input type="text"  id='searchBox' className="form-control" value={handleValues()}
                                        onChange={e => {
                                            if (search === 'نام کالا'){
                                                  context.formikProductSearch.setFieldValue('name' , e.target.value)
                                            }else  if (search === 'کد'){
                                                  context.formikProductSearch.setFieldValue('product' , e.target.value)
                                            }else  if (search === 'نام خریدار'){
                                                  context.formikProductSearch.setFieldValue('buyer' , e.target.value)
                                            }else  if (search === 'نام گیرنده'){
                                                  context.formikProductSearch.setFieldValue('receiver' , e.target.value)
                                            }
                                        }} placeholder={`جستجو براساس ${search}`}
                                        aria-label="searchBox" aria-describedby="search" />
                                    </div>
                                )
                            }
                        })()}

            </div>

            <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                <table ref={componentPDF} className="table table-hover text-center table-striped align-middle table-bordered border-primary" style={{direction:'rtl' , fontSize:'1vw'}}>
                    <thead className= 'bg-light'>
                     <tr>
                            <th scope="col">ردیف</th>
                            <th scope="col">کد کالا</th>
                            <th scope="col">نام کالا</th>
                            <th scope="col">گروه</th>
                            <th scope="col">سند</th>
                            <th scope="col">شناسه سند</th>
                            <th scope="col">تاریخ</th>
                            <th scope="col">عملیات</th>
                            <th scope="col">مقیاس</th>
                            <th scope="col">تعداد</th>
                            <th scope="col">موجودی</th>
                            <th scope="col">مورد مصرف</th>
                            <th scope="col">خریدار</th>
                            <th scope="col">گیرنده</th>
                            <th scope="col">اصلاحیه</th>
                     </tr>
                    </thead>
                    <tbody>
                        {(products.length > 0 && products.filter((value) => {if (rank === 'مدیر'){
                                                    if (context.formikProductSearch.values.product){
                                                        return value.product === Number(context.formikProductSearch.values.product)
                                                    }else if (context.formikProductSearch.values.category){
                                                        return value.category === String(context.formikProductSearch.values.category)
                                                    }else if (context.formikProductSearch.values.consumable){
                                                        return value.consumable === String(context.formikProductSearch.values.consumable)
                                                    }else if (context.formikProductSearch.values.name){
                                                        return value.name === String(context.formikProductSearch.values.name)
                                                    }else if (context.formikProductSearch.values.buyer){
                                                        return value.buyer === String(context.formikProductSearch.values.buyer)
                                                    }else if (context.formikProductSearch.values.receiver){
                                                        return value.receiver === String(context.formikProductSearch.values.receiver)
                                                    }else if (context.formikProductSearch.values.operator){
                                                        return value.operator === String(context.formikProductSearch.values.operator)
                                                    }else if (context.formikProductSearch.values.date){
                                                        return value.date === fixNumbers(context.formikProductSearch.values.date)
                                                    }else {
                                                        return value.inventory
                                                    }
                                          }else{
                                                if (context.formikProductSearch.values.product){
                                                    return value.inventory === context.office && value.product === Number(context.formikProductSearch.values.product)
                                                }else if (context.formikProductSearch.values.category){
                                                    return value.inventory === context.office && value.category === String(context.formikProductSearch.values.category)
                                                }else if (context.formikProductSearch.values.consumable){
                                                        return value.inventory === context.office && value.consumable === String(context.formikProductSearch.values.consumable)
                                                }else if (context.formikProductSearch.values.name){
                                                        return value.inventory === context.office && value.name === String(context.formikProductSearch.values.name)
                                                }else if (context.formikProductSearch.values.buyer){
                                                        return value.inventory === context.office && value.buyer === String(context.formikProductSearch.values.buyer)
                                                }else if (context.formikProductSearch.values.receiver){
                                                        return value.inventory === context.office && value.receiver === String(context.formikProductSearch.values.receiver)
                                                }else if (context.formikProductSearch.values.operator){
                                                        return value.inventory === context.office && value.operator === String(context.formikProductSearch.values.operator)
                                                }else if (context.formikProductSearch.values.date){
                                                        return value.inventory === context.office && value.date === fixNumbers(context.formikProductSearch.values.date)
                                                }else {
                                                    return value.inventory === context.office
                                                }
                                          }}).map((data , i) => (
                            <tr key={data.id} style={{backgroundColor:`${data.obsolete === true  ? data.operator === 'ورود' ?  'hsl(120, 61%, 80%)' : 'hsl(0, 100%, 80%)' : '' }`}}>
                                <th scope="row">{i}</th>
                                <td>{data.product}</td>
                                <td>{data.name}</td>
                                <td>{data.category}</td>
                                <td>{data.document_type}</td>
                                <td>{data.document_code}</td>
                                <td>{data.date}</td>
                                <td>{data.operator}</td>
                                <td>{data.scale}</td>
                                <td>{data.operator === 'خروج' ? data.output : data.input }</td>
                                <td>{data.afterOperator}</td>
                                <td>{data.consumable}</td>
                                <td>{data.buyer}</td>
                                <td>{data.receiver}</td>
                                <td>{data.amendment}</td>
                            </tr>
                                   ))) ||
                            <tr>
                                <td colSpan="15" className='h3'>داده ای یافت نشد .....</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </Fragment>
    )
}

export default memo(ReportProducts)