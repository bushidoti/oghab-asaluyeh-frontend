import React, {Fragment, useEffect, useRef, useState} from "react";
import Url from "../../../../config";
import ObserveModal from "../observemodal";
import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import {useReactToPrint} from "react-to-print";
import {CheckOutlined, InfoOutlined, PrinterOutlined} from "@ant-design/icons";

export const Product = (props) => {
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [idNumber, setIdNumber] = useState(null)
    const [setCode] = useState('')
    const [setIdNumberProduct] = useState(null)
    const [count, setCount] = useState({})
    const [search , setSearch] = useState('')

    let today = new Date().toLocaleDateString('fa-IR');
    const componentPDF= useRef();
    const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });

   const options = {
              year: "numeric",
            };
    const formik = useFormik({
    initialValues: {
      result: "",
      code: "",
      name: "",
      category: "",
    },
    enableReinitialize: true,
    });

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/product/?code=${formik.values.code}&name=${formik.values.name}&category=${formik.values.category}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProduct(data)
        const quantities = data.reduce((a, b) => ({ ...a, [b.code]: b.count}), {})
        setCount(quantities)

      }

    const fetchDataProducts = async () => {
        const response = await fetch(`${Url}/api/allproducts`, {
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

          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [formik.values.code , formik.values.name, formik.values.category])

    const postHandler = async (id) => {
         await axios.post(
            `${Url}/api/handling-product/`,
              {
              product: id,
              date: today.replaceAll('/' , '-'),
              result: formik.values.result,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }

       const putHandler = async (id) => {
         await axios.put(
            `${Url}/api/product/${id}/`,
              {
              code: id,
              yearly_handling: new Date().toLocaleDateString('fa-IR' , options ),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
          await fetchData()
        }

    const closeAlert = (id) => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `آیا از ثبت نتیجه انبارگردانی این کالا مطمئنید ؟`,
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
                  'نتیجه ثبت و در بازه یک ساله در قسمت انبارگردانی قفل شد.',
                  'success',
                  'ok',
                  postHandler(id),
                  putHandler(id),
                )
              }
            })
      }

    const prom = async  (id) => {
     return  closeAlert(id)

    }
    const func = async (id) => {
         await prom(id).then(() => {
             setCode(id)
         });
    }


    return (
           <Fragment>
            <ObserveModal setModalTitle={props.setModalTitle} handleProduct={props.handleProduct} idNumber={idNumber}
            setIdNumberProduct={setIdNumberProduct} setIdNumber={setIdNumber} formik={props.formik} />
                 <div className='m-4'>
                     <div className= 'my-2'>
                                <button className="btn btn-outline-secondary" type="button" id="print" onClick={generatePDF}><PrinterOutlined /></button>
                     </div>
                 <div className="form-floating my-2" style={{maxWidth:'255px'}}>
                        <select className="form-select" defaultValue='' id="searchSelector" style={{maxWidth:'20vw' , minWidth:'200px'}} onChange={(e) => {
                            formik.setFieldValue('code' , '')
                            formik.setFieldValue('name' , '')
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
                            <input className="form-control" type='search' value={formik.values.category}
                           onChange={formik.handleChange} name='category' list="groupProductList" id="groupProduct"
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
                            <input type="text"  id='searchBox' className="form-control" value={search === 'نام کالا' ? formik.values.name : formik.values.code}
                            onChange={e => search === 'نام کالا' ? formik.setFieldValue('name' , e.target.value) : formik.setFieldValue('code' , e.target.value)} placeholder={`جستجو براساس ${search}`}
                            aria-label="searchBox" aria-describedby="search" />
                        </div>
                }

                </div>
                   <div className='m-4'>
                        <span className="dot bg-warning ms-4"></span><span> به معنی انبارگردانی شده و به مدت یک سال در این بخش قفل شده.</span>
                   </div>
                <div className='d-flex'>
                    <div className= 'm-4 table-responsive rounded-3 col' style={{maxHeight : '40vh'}}>
                          <table className="table table-hover text-center align-middle table-bordered border-primary bg-light" ref={componentPDF} style={{direction:'rtl' , fontSize:'1vw'}}>
                                <thead className= 'bg-light'>
                                <tr>
                                    <th scope="col">کد</th>
                                    <th scope="col">نام</th>
                                    <th scope="col">گروه</th>
                                    <th scope="col">ورود</th>
                                    <th scope="col">خروج</th>
                                    <th scope="col" className='d-print-none'></th>
                                    <th scope="col">مانده</th>
                                    <th scope="col">شمارش</th>
                                    <th scope="col">کسری/اضافه</th>
                                    <th scope="col">نتیجه</th>

                                </tr>
                                </thead>
                                <tbody>
                                {(product.length > 0 && product.filter(product => product.inventory ===  props.inventory).map((data , i) => (
                                    <tr key={data.code}
                                    style={{backgroundColor:`${(data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options) ? 'hsl(60, 100%, 90%)' : null)}`}}>
                                        <th scope="row">{data.code}</th>
                                        <td>{data.name}</td>
                                        <td>{data.category}</td>
                                        <td>{(products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.input , 0 ))}</td>
                                        <td>{(products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.output , 0 ))}</td>
                                        <td className='d-print-none'>
                                             <button id='visibilityBtn' className= 'btn btn-warning'
                                             data-bs-toggle="modal" disabled={data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)} data-bs-target="#observeModal"
                                                title="کاردکس" onClick={() => {
                                                    setIdNumber(data.code)
                                                }}><InfoOutlined /></button>
                                        </td>
                                        <td>{(products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.input , 0 ))
                                                - (products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.output , 0 ))
                                        }</td>

                                        <td><input type="number"  id={`count${i}`} name={`count`}  style={{direction:'rtl' , fontSize:'1vw'}}
                                       onChange={e => setCount({...count, [data.code]: e.target.value})}
                                       disabled={data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)}
                                        value={count[data.code] || ''} className="form-control" placeholder='تعداد شمارش شده را وارد کنید'
                                        aria-label="count" aria-describedby="count" /></td>

                                        <td style={{direction:'ltr'}}>{count[data.code] ? count[data.code] - ((products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.input , 0 ))
                                                - (products.filter(products => products.product ===  data.code).reduce((a,v) =>   a + v.output , 0 ))) : 0}</td>
                                        <td>
                                            <div className="input-group">
                                                <input type="text"  id={`resultInp${i}`} style={{direction:'rtl' , fontSize:'1vw'}} disabled={data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)}
                                                onChange={e => formik.setFieldValue('result' , e.target.value)} className="form-control" placeholder='نتیجه را بنویسید'
                                                aria-label="result" aria-describedby="result"/>
                                                <button className="btn btn-outline-success d-print-none"
                                                disabled={data.yearly_handling === new Date().toLocaleDateString('fa-IR' , options)} type="button" id="resultBtn" onClick={async () => {
                                                    await func(data.code)
                                                }}><CheckOutlined /></button>
                                            </div>
                                        </td>
                                    </tr>
                                         ))) ||
                                         <tr>
                                            <td colSpan="10" className='h3'><div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                     </div>
                </div>

            </Fragment>
    )
}