import React, {Fragment, useEffect, useRef, useState} from "react";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import {CustomInputDate} from "../../../../App";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {useReactToPrint} from "react-to-print";
import options from '../../date-option'
import fixNumbers from "../../persianNumbers"
import Url from "../../../config";
import {EditOutlined} from "@ant-design/icons";

const ObserveModal = (props) => {
  const [search , setSearch] = useState('')
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const componentPDF= useRef();


  const fetchData = async () => {
      if (props.idNumber !== null){
            const response = await fetch(`${Url}/api/product/`+ props.idNumber, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            const data = await response.json()
            setProduct(data)
      }
  }

  const fetchDataProducts = async () => {
        const response = await fetch(`${Url}/api/allproducts/?fields=product,input,output,document_code,document_type,date,operator,afterOperator,obsolete,consumable,buyer,receiver,amendment,id,scale&date=${fixNumbers(props.formik.values.date)}&consumable=${props.formik.values.consumable}&operator=${props.formik.values.operator}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProducts(data)
      }


  function handleChange(value){
            props.formik.setFieldValue('date' , value.toDate().toLocaleDateString('fa-IR', options).replaceAll('/' , '-'))
        }

  useEffect(() => {
          void fetchData()
          void fetchDataProducts()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.idNumber , props.formik.values])

   const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });

  return (
      <Fragment>
         <div className="modal fade"  data-bs-backdrop="static" data-bs-keyboard="false" id="observeModal" tabIndex="-1" aria-labelledby="observeModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen" >
                        <div className="modal-content" style={{backgroundColor:'hsl(169,85%,92%)'}}>
                            <div className="modal-header mx-4">
                                <div className="modal-title fs-5 h1 d-flex gap-2" id="exampleModalLabel"><span>{product.name}</span><span className="text-danger">{props.idNumber}</span></div>
                                <button type="button" className="btn-close " data-bs-dismiss="modal"
                                aria-label="Close" onClick={() => {
                                    props.handleProduct()
                                    setSearch('')
                                    props.setIdNumber('')
                                }}></button>
                            </div>
                            <div className="modal-body">
                                <div className='d-flex justify-content-between'>
                                      <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                                            <select className="form-select" defaultValue='' id="searchSelectorModal" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                                aria-label="Search Select" onChange={(e) => {
                                                    props.formik.setFieldValue('consumable' , '')
                                                    props.formik.setFieldValue('date' , '')
                                                    props.formik.setFieldValue('operator' , '')
                                                    setSearch(e.target.value)
                                            }}>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="تاریخ ثبت">تاریخ ثبت</option>
                                                <option value="مورد مصرف">مورد مصرف</option>
                                                <option value="عملیات">عملیات</option>
                                            </select>
                                            <label htmlFor="searchSelectorModal">جستجو براساس</label>
                                      </div>
                                   <div className= 'd-flex gap-2 m-4'>
                                        <button className="btn btn-outline-secondary material-symbols-outlined h-75" type="button" id="print" onClick={generatePDF}>print</button>
                                   </div>
                                </div>
                    <div className='m-4'>
                        <span className="dot bg-success"></span><span> به معنی اصلاح بدلیل کسری</span>
                        <span className="dot bg-danger ms-4"></span><span> به معنی اصلاح بدلیل اضافه بودن</span>
                    </div>
                    <div className='m-4'>
                        {(() => {
                            if (search === 'تاریخ ثبت') {
                              return (
                                <DatePicker
                                 animations={[transition()]}
                                 render={<CustomInputDate  ids={"date"} names='date' label='تاریخ ثبت'  />}
                                 id="date"
                                 name='date'
                                 onChange={handleChange}
                                 calendar={persian}
                                 onOpenPickNewDate={false}
                                 locale={persian_fa}
                             />
                              )
                            }else if (search === 'عملیات') {
                                    return (
                                        <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                                            <select className="form-select" defaultValue='' id="searchOperation" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                            onChange={e => props.formik.setFieldValue('operator' , e.target.value)}
                                                aria-label="Search Operation">
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="ورود">ورود</option>
                                                <option value="خروج">خروج</option>
                                                <option value="ثبت اولیه">ثبت اولیه</option>
                                            </select>
                                            <label htmlFor="searchOperation">جستجو براساس</label>
                                      </div>
                                    )
                                }else if (search === 'مورد مصرف') {
                                    return (
                                        <div className="form-floating" style={{maxWidth:'255px'}}>
                                            <input className="form-control" type='search' value={props.formik.values.consumable} style={{maxWidth:'20vw' , minWidth:'200px'}}
                                            onChange={e => props.formik.setFieldValue('consumable' , e.target.value)} list="consumeCauseList" id="consumeCause" placeholder="اجاره"/>
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
                                }
                        })()}
                  </div>
                  <hr className='bg-primary m-4'/>
                  <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '60vh'}}>
                    <table ref={componentPDF} className="table table-hover text-center align-middle table-bordered border-primary bg-white" style={{direction:'rtl' , fontSize:'1vw'}}>
                        <thead className= 'bg-light'>
                        <tr>
                            <th scope="col">ردیف</th>
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
                            <th scope="col" className='d-print-none'></th>
                        </tr>
                        </thead>
                        <tbody>

                    {(products.length > 0 && products.filter(products => products.product ===  props.idNumber).map((data , i) => (
                        <tr key={data.id} style={{backgroundColor:`${data.obsolete === true  ? data.operator === 'ورود' ?  'hsl(120, 61%, 80%)' : 'hsl(0, 100%, 80%)' : '' }`}}>
                            <th scope="row">{i}</th>
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
                            <td className='d-print-none'>
                                <button id='editBtn' className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalMain" title="ویرایش" onClick={() => {
                                   props.setIdNumberProduct(data.id)
                                   props.setModalTitle('edit')
                                }}><EditOutlined /></button>
                            </td>
                        </tr>
                               ))) ||
                        <tr>
                            <td colSpan="12" className='h3'>داده ای یافت نشد .....</td>
                        </tr>
                    }
                        </tbody>
                    </table>
                </div>
              </div>
                </div>
            </div>
        </div>
  </Fragment>
  );
};
export default ObserveModal