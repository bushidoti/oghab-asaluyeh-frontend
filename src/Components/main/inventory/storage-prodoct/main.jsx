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
import {InfoOutlined, PrinterOutlined} from "@ant-design/icons";

const WarHouse = () => {
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
        const response = await fetch(`${Url}/api/product/`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProduct(data)
      }

    const fetchDataProducts = async () => {
        const response = await fetch(`${Url}/api/allproducts/?fields=product,input,output,document_code,document_type,systemID,date,operator,afterOperator,obsolete,consumable,buyer,inventory,receiver,amendment,id`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProducts(data)
      }




    useEffect(() => {
            void fetchData()
            void fetchDataProducts()
                 handleCheckFactor()
                 handleHandling()
                 handleCheck()
                 handleSystem()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [idNumberProduct , context.factor , context.systemIDFactor , context.billCheck , context.handling])


    const handleCheckFactor = () => {
        if (products.filter(product => product.document_code === context.factor && product.document_code !== '' && product.document_type === 'فاکتور' && product.inventory === context.office)[0]){
            return setFactorBtn(false)
        }else return setFactorBtn(true)
    }
    const handleCheck = () => {
        if (products.filter(product => product.document_code === context.billCheck && product.document_code !== '' && product.document_type ===  'حواله'  && product.inventory === context.office)[0]){
            return setCheckBtn(false)
        }else return setCheckBtn(true)
    }

     const handleHandling = () => {
        if (products.filter(product => product.document_code === context.handling && product.document_code !== '' && product.document_type === 'انبارگردانی')[0]){
            return setHandleBtn(false)
        }else return setHandleBtn(true)
    }

     const handleSystem = () => {
        if (products.filter(product => product.systemID === context.systemIDFactor && product.document_type === 'فاکتور' && product.inventory === context.office)[0]){
            return setSystemIDBtn(false)
        }else return setSystemIDBtn(true)
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
                <div className='d-flex flex-lg-nowrap gap-3 flex-wrap'>
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
                     <button className= 'btn btn-primary'  id='registrationBtnModal' data-bs-toggle="modal"
                    style={{maxWidth:'20vw' , minWidth:'150px' , maxHeight:'10vh'}}
                data-bs-target="#manualModal">ثبت</button>
                </div>
            </div>

            <div className='m-4'>
                <div className="form-floating my-2" style={{maxWidth:'255px'}}>
                        <select className="form-select" defaultValue='' id="searchSelector" style={{maxWidth:'20vw' , minWidth:'200px'}}  onChange={(e) => {
                            context.formikProductSearch.setFieldValue('code' , '')
                            context.formikProductSearch.setFieldValue('name' , '')
                            context.formikProductSearch.setFieldValue('category' , '')
                            setSearch(e.target.value)
                        }}
                            aria-label="Search Select">
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            <option value="کد">کد</option>
                            <option value="گروه">گروه</option>
                            <option value="نام کالا">نام کالا</option>
                        </select>
                        <label htmlFor="searchSelector">جستجو براساس</label>
                </div>
                {search === 'گروه' ?
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
                    :

                      <div className="input-group mb-3">
                            <input type="text"  id='searchBox' className="form-control" value={search === 'نام کالا' ? context.formikProductSearch.values.name : context.formikProductSearch.values.code}
                            onChange={e => search === 'نام کالا' ? context.formikProductSearch.setFieldValue('name' , e.target.value) : context.formikProductSearch.setFieldValue('code' , e.target.value)} placeholder={`جستجو براساس ${search}`}
                            aria-label="searchBox" aria-describedby="search" />
                        </div>
                }


            </div>

            <div className= 'm-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                <table ref={componentPDF} className="table table-hover text-center table-striped align-middle table-bordered border-primary" style={{direction:'rtl' , fontSize:'1vw'}}>
                    <thead className= 'bg-light'>
                    <tr>
                        <th scope="col">کد</th>
                        <th scope="col">نام</th>
                        <th scope="col">گروه</th>
                        <th scope="col">ورود</th>
                        <th scope="col">خروج</th>
                        <th scope="col">مانده</th>
                        <th scope="col" className='d-print-none'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {(product.length > 0 && product.filter(product => {if (rank === 'مدیر'){
                                           if (context.formikProductSearch.values.code){
                                                    return product.code === Number(context.formikProductSearch.values.code)
                                            }else if (context.formikProductSearch.values.category){
                                                    return product.category === String(context.formikProductSearch.values.category)
                                            }else if (context.formikProductSearch.values.name) {
                                           return product.name === String(context.formikProductSearch.values.name)
                                           }else {
                                                  return product.inventory
                                           }
                                          }else{
                                              return (product.inventory === context.office)
                                          }}).map((data) => (
                    <tr key={data.code}>
                        <th scope="row">{data.code}</th>
                        <td>{data.name}</td>
                        <td>{data.category}</td>
                        <td>{(products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.input , 0 ))}</td>
                        <td>{(products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.output , 0 ))}</td>
                        <td>{(products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.input , 0 ))
                            - (products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.output , 0 ))}</td>
                        <td className='d-print-none'>
                            <button id='visibilityBtn' className= 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#observeModal"
                            title="کاردکس" onClick={() => {
                                setIdNumber(data.code)
                            }}><InfoOutlined /></button>
                        </td>
                    </tr>
                         ))) ||
                         <tr>
                            <td colSpan="7" className='h3'>داده ای یافت نشد .....</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
        </Fragment>
    )
}

export default memo(WarHouse)