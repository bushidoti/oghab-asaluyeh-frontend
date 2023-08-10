import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useFormik} from "formik";
import Url from "../../../config";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const Modal = (props) => {
     const [product, setProduct] = useState([])
     const [products, setProducts] = useState([])
     const [autoIncrement, setAutoIncrement] = useState([])
     const [increase, setIncrease] = useState('')

    let today = new Date().toLocaleDateString('fa-IR');
    const formik = useFormik({
    initialValues: {
      code: product.code || "",
      name: product.name || "",
      inventory: product.inventory || "",
      category: product.category || "",
      input: props.modalTitle === 'edit' ? products.input || "" : "",
      output: props.modalTitle === 'edit' ? products.output || "" : "",
      operator: products.operator || "",
      left_stock: product.left_stock || "",
      scale: props.modalTitle === 'edit' ? products.scale || "" : product.scale || "",
      document_type: props.modalTitle === 'edit' ? products.document_type || "" : product.document_type || "",
      document_code: props.modalTitle === 'edit' ? products.document_code  || "" : product.document_code || "",
      consumable: props.modalTitle === 'edit' ? products.consumable || "" : '',
      date: props.modalTitle === 'edit' ? products.date || "" : '',
      buyer: props.modalTitle === 'edit' ? products.buyer || "" : '',
      seller: props.modalTitle === 'edit' ? products.seller || "" : '',
      receiver: props.modalTitle === 'edit' ? products.receiver || "" : '',
      product: null,
      amendment: products.amendment || "",
      factor: '',
      inventory_dst: '',
      inventory_src: '',
      checkBill: '',
    },
    enableReinitialize: true,
    });
     function reader(file, callback) {
              const fr = new FileReader();
              fr.onload = () => callback(null, fr.result);
              fr.onerror = (err) => callback(err);
              fr.readAsDataURL(file);
            }

    function factor(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('factor' , res)
              });
            }

    function checkBill(e) {
          reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('checkBill' , res)
              });
        }

     const postHandler = async () => {
           await axios.post(
            `${Url}/api/product/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.name,
              category: formik.values.category,
              input: formik.values.input,
              inventory: props.office,
              operator: 'ثبت اولیه',
              output: 0,
              date: today.replaceAll('/' , '-'),
              left_stock: formik.values.input,
              scale: formik.values.scale,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
         await axios.post(
            `${Url}/api/allproducts/`,
              {
              input: formik.values.input,
              name: formik.values.name,
              scale: formik.values.scale,
              afterOperator: (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
              - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) + formik.values.input,
              date: today.replaceAll('/' , '-'),
              operator:'ثبت اولیه',
              document_type: formik.values.document_type,
              document_code: formik.values.document_code,
              factor: formik.values.factor,
              receiver:formik.values.receiver,
              buyer:formik.values.buyer,
              product: handleAutoIncrement(),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
           setTimeout(
                    refreshPages, 3000)
        }

    const postAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت اولیه این کالا مطمئنید ؟",
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
                  'کالا ثبت شد.',
                  'success',
                  'ok',
                  postHandler(),
                  putHandlerAutoIncrement(),

                )
              }
            })
      }
      const postHandlerUpdate = async () => {
         if (increase === 'افزایش' && (formik.values.operator === 'ورود' || formik.values.operator === 'ثبت اولیه')){
                  await axios.post(
                    `${Url}/api/allproducts/`,
                      {
                      input: formik.values.input || null,
                      name: formik.values.name,
                      scale: formik.values.scale,
                      afterOperator:(props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
                                    - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) + formik.values.input,
                      date: today.replaceAll('/' , '-'),
                      receiver:formik.values.receiver,
                      operator:'ورود',
                      buyer:formik.values.buyer,
                      seller:formik.values.seller,
                      document_type: products.document_type,
                      document_code: products.document_code,
                      product: formik.values.code,
                      factor: products.factor,
                      amendment: formik.values.amendment,
                       obsolete: true,
                }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
         }else  if (increase === 'کاهش' && (formik.values.operator === 'ورود' || formik.values.operator === 'ثبت اولیه')){
                  await axios.post(
                    `${Url}/api/allproducts/`,
                      {
                      output: formik.values.input || null,
                      name: formik.values.name,
                      scale: formik.values.scale,
                      afterOperator: (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
                                    - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) - formik.values.input,
                      date: today.replaceAll('/' , '-'),
                      receiver:formik.values.receiver,
                      buyer:formik.values.buyer,
                      seller:formik.values.seller,
                      operator:'خروج',
                      document_type: products.document_type,
                      document_code: products.document_code,
                      product: formik.values.code,
                      factor: products.factor,
                      amendment: formik.values.amendment,
                      obsolete: true,

                }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
         }else  if (increase === 'کاهش' && formik.values.operator === 'خروج'){
                  await axios.post(
                    `${Url}/api/allproducts/`,
                      {
                      input: formik.values.output || null,
                      name: formik.values.name,
                      scale: formik.values.scale,
                      afterOperator: (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
                                    - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) + formik.values.output,
                      date: today.replaceAll('/' , '-'),
                      operator:'ورود',
                      document_type: products.document_type,
                      document_code: products.document_code,
                      product: formik.values.code,
                      checkBill: products.checkBill,
                      amendment: formik.values.amendment,
                      obsolete: true,

                }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
         }else  if (increase === 'افزایش' && formik.values.operator === 'خروج'){
                  await axios.post(
                    `${Url}/api/allproducts/`,
                      {
                      output: formik.values.output || null,
                      name: formik.values.name,
                      scale: formik.values.scale,
                      afterOperator: (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
                                    - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) - formik.values.output,
                      date: today.replaceAll('/' , '-'),
                      operator:'خروج',
                      document_type: products.document_type,
                      document_code: products.document_code,
                      product: formik.values.code,
                      checkBill: products.checkBill,
                      amendment: formik.values.amendment,
                      obsolete: true,

                }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
         }



           setTimeout(
                    refreshPages, 3000)
        }
    const putHandlerUpdate = async () => {
           await axios.put(
            `${Url}/api/allproducts/${products.id}/`,
              {
              date: today.replaceAll('/' , '-'),
              buyer:formik.values.buyer,
              seller:formik.values.seller,
              receiver:formik.values.receiver,
              document_type: products.document_type,
              document_code: formik.values.document_code,
              checkBill: products.checkBill,
              factor: products.factor,
              product: formik.values.code,
              amendment: 'اصلاح شده است' ,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }

    const postAlertUpdate = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت تغییرات این کالا مطمئنید ؟",
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
                  'تغییرات کالا ثبت شد.',
                  'success',
                  'ok',
                  postHandlerUpdate(),
                  putHandlerUpdate(),
                )
              }
            })
      }

    const postHandlerProductInput = async () => {
           await axios.post(
            `${Url}/api/allproducts/`,
              {
              input: formik.values.input,
              name: formik.values.name,
              scale: formik.values.scale,
              afterOperator: (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
              - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) + formik.values.input,
              date: today.replaceAll('/' , '-'),
              receiver:formik.values.receiver,
              buyer:formik.values.buyer,
              operator:'ورود',
              document_type: formik.values.document_type,
              document_code: formik.values.document_code,
              product: formik.values.code,
              factor: formik.values.factor,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
           setTimeout(
                    refreshPages, 3000)
        }

    const postHandlerProductOutput = async () => {
           await axios.post(
            `${Url}/api/allproducts/`,
              {
              consumable: formik.values.consumable,
              output: formik.values.output,
              afterOperator: (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.input , 0 ))
                            - (props.products.filter(products => products.product ===  props.idNumber).reduce((a,v) =>   a + v.output , 0 )) - formik.values.output,
              name: formik.values.name,
              scale: formik.values.scale,
              date: today.replaceAll('/' , '-'),
              operator:'خروج',
              receiver:formik.values.receiver,
              document_type: formik.values.document_type,
              document_code: formik.values.document_code,
              product: formik.values.code,
              checkBill: formik.values.checkBill,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
           setTimeout(
                    refreshPages, 3000)
        }

    const postAlertProductsInput = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت ورودی این کالا مطمئنید ؟",
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
                  'کالا ثبت شد.',
                  'success',
                  'ok',
                  postHandlerProductInput(),
                )
              }
            })
      }

    const postAlertProductsOutput = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: "آیا از ثبت خروجی این کالا مطمئنید ؟",
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
                  'کالا ثبت شد.',
                  'success',
                  'ok',
                  postHandlerProductOutput(),
                )
              }
            })
      }

    const fetchData = async () => {
           if (props.idNumber !== null) {
               const response = await fetch(`${Url}/api/product/` + props.idNumber, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
               const data = await response.json()
               setProduct(data)
           }
      }


      const fetchDataAllProducts = async () => {
        if (props.idNumberProduct !== null) {
            const response = await fetch(`${Url}/api/allproducts/${props.idNumberProduct}/?fields=product,seller,input,output,document_code,document_type,date,operator,afterOperator,obsolete,consumable,buyer,receiver,amendment,id` , {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            const data = await response.json()
            setProducts(data)
        }
      }


    const fetchDataAutoIncrement = async () => {
        const response = await fetch(`${Url}/api/autoIncrement/1`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setAutoIncrement(data)
      }

    const putHandlerAutoIncrement = async () => {
           await axios.put(
            `${Url}/api/autoIncrement/1/`,
              {
              oghab101: props.office === 'دفتر مرکزی' ? autoIncrement.oghab101+1 : autoIncrement.oghab101,
              oghab102: props.office === 'چابهار' ? autoIncrement.oghab102+1 : autoIncrement.oghab102,
              oghab103: props.office === 'دزفول' ? autoIncrement.oghab103+1 : autoIncrement.oghab103,
              oghab104: props.office === 'جاسک' ? autoIncrement.oghab104+1 : autoIncrement.oghab104,
              oghab105: props.office === 'بیشه کلا' ? autoIncrement.oghab105+1 : autoIncrement.oghab105,
              oghab106: props.office === 'اورهال تهران' ? autoIncrement.oghab106+1 : autoIncrement.oghab106,
              oghab107: props.office === 'اورهال اصفهان' ? autoIncrement.oghab107+1 : autoIncrement.oghab107,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }

    useEffect(() => {
          void fetchData()
          void fetchDataAutoIncrement()
          void fetchDataAllProducts()
          },
           // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.idNumber , props.idNumberProduct])

    const handleSubmit = () => {
        if (props.modalTitle === 'entry'){
            return postAlertProductsInput
        }else if (props.modalTitle === 'remove'){
            return postAlertProductsOutput
        }else if (props.modalTitle === 'register'){
            return postAlert
        }else if (props.modalTitle === 'edit'){
            return postAlertUpdate
        }
    }

    const [documents , setDocument] = useState('')
    function refreshPages() {
        window.location.reload()
    }
    const handleAutoIncrement = () => {
          if (props.office === 'دفتر مرکزی'){
              return autoIncrement.oghab101
          }else if (props.office === 'چابهار'){
              return autoIncrement.oghab102
          }else if (props.office === 'دزفول'){
              return autoIncrement.oghab103
          }else if (props.office === 'جاسک'){
              return autoIncrement.oghab104
          }else if (props.office === 'بیشه کلا'){
              return autoIncrement.oghab105
          }else if (props.office === 'اورهال تهران'){
              return autoIncrement.oghab106
          }else if (props.office === 'اورهال اصفهان'){
              return autoIncrement.oghab107
          }
    }
    function refreshPage() {
        formik.setFieldValue('name' , '')
        formik.setFieldValue('category' , '')
        formik.setFieldValue('input' , '')
        formik.setFieldValue('output' , '')
        formik.setFieldValue('left_stock' , '')
        formik.setFieldValue('scale' , '')
        formik.setFieldValue('document_type' , '')
        formik.setFieldValue('document_code' , '')
        formik.setFieldValue('consumable' , '')
        formik.setFieldValue('date' , '')
        formik.setFieldValue('buyer' , '')
        formik.setFieldValue('seller' , '')
        formik.setFieldValue('receiver' , '')
        formik.setFieldValue('product' , '')
        formik.setFieldValue('operator' , '')
        formik.setFieldValue('amendment' , '')
        setIncrease('')
        setDocument('')
        document.getElementById("documentType").selectedIndex = '0' ;
        props.setIdNumberProduct(null)
        if (props.modalTitle !== 'edit'){
            props.setIdNumber('')
        }
    }

  return (
      <Fragment>
         <div className="modal fade"  id="modalMain" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalMainLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        {(() => {
                                               if (props.modalTitle === 'register'){
                                                    return (
                                                        'ثبت کالا جدید'
                                                    )
                                                }else if (props.modalTitle === 'remove'){
                                                    return (
                                                        'خروج'
                                                    )
                                                }else if (props.modalTitle === 'entry'){
                                                    return (
                                                        'ورود'
                                                    )
                                                }else if (props.modalTitle === 'edit'){
                                                    return (
                                                        'ویرایش کالا'
                                                    )
                                                }
                                        })()}
                                </h1>
                                <button type="button" className="btn-close " data-bs-dismiss="modal"
                                aria-label="Close" onClick={refreshPage}></button>
                            </div>
                        <form className='needs-validation' noValidate>
                            <div className=" modal-body">
                                <div className="form-floating justify-content-center mb-5">
                                    <input type="text" id="idNumber" className="w-25 form-control"
                                       value={props.modalTitle === 'register' ? handleAutoIncrement() : formik.values.code}
                                       aria-label="Username" aria-describedby="basic-addon1" disabled required/>
                                    <label  htmlFor="idNumber">کد کالا</label>
                                </div>
                            <div className='d-flex gap-2 mb-3'>
                                        {(() => {
                                        if (props.modalTitle === 'register'){
                                                        return (
                                                            <Fragment>
                                                                  <div className="col-6 form-floating">
                                                                        <input type="text" className="form-control" id="name" value={formik.values.name}
                                                                       onChange={formik.handleChange}
                                                                        name='name'
                                                                        placeholder="..." required />
                                                                        <div className="invalid-feedback">
                                                                        لطفا نام کالا را وارد کنید.
                                                                        </div>
                                                                        <label htmlFor="name">نام کالا</label>
                                                                  </div>
                                                                  <div className="form-floating">
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

                                                            </Fragment>
                                                        )
                                                    }
                                        })()}
                            </div>
                            <div className='d-flex gap-2 mb-3'>
                                     {(() => {
                                    if ((props.modalTitle === 'edit')){
                                        return(
                                 <div className="form-floating  col-4">
                                    <select className="form-select" id="increase" name='increase' aria-label="Document Type"
                                    value={increase} onChange={(e) => {
                                    setIncrease(e.target.value)}}>
                                                <option  value='' disabled>انتخاب کنید</option>
                                                <option value="افزایش">افزایش</option>
                                                <option value="کاهش">کاهش</option>
                                            </select>
                                            <label htmlFor="increase">تغییر</label>
                              </div>
                                        )
                                    }
                                })()}
                                  <div className="col-2 form-floating">
                                    <input type="number" className="form-control" id="count"
                                           value={props.modalTitle === 'entry' || formik.values.operator ===  'ورود' || props.modalTitle === 'register' || formik.values.operator === 'ثبت اولیه' ? formik.values.input : formik.values.output }
                                           onChange={formik.handleChange}
                                           name={props.modalTitle === 'entry' || formik.values.operator === 'ورود' || props.modalTitle === 'register' || formik.values.operator === 'ثبت اولیه'? "input" : "output"}
                                           placeholder="560" required/>
                                        <label htmlFor="count">تعداد</label>
                                     <div className="invalid-feedback">
                                         تعداد  را وارد کنید.
                                     </div>
                                   </div>
                                <div className="col-3 form-floating">
                                    <input type="text" className="form-control" id="scale" value={formik.values.scale} disabled={props.modalTitle !== 'register' || props.modalTitle === 'edit' }
                                           onChange={formik.handleChange}
                                          name='scale'
                                           placeholder="560" required/>
                                        <label htmlFor="count">مقیاس</label>
                                     <div className="invalid-feedback">
                                         مقیاس  را انتخاب کنید.
                                     </div>
                                   </div>

                                 {(() => {
                                        if (props.modalTitle === 'remove'){
                                                        return (
                                                            <Fragment>
                                                                   <div className="col form-floating">
                                                                        <input className="form-control" type='search' list="consumeCauseList"
                                                                       id="consumeCause" value={formik.values.consumable}
                                                                       onChange={formik.handleChange} name='consumable'
                                                                        placeholder="اجاره" required/>
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
                                                                           <div className="invalid-feedback">
                                                                         مورد مصرف  را انتخاب کنید.
                                                                     </div>
                                                                    </div>

                                                            </Fragment>
                                                        )
                                                    }
                                        })()}
                                      </div>

                                <div className='d-flex gap-2 mb-3'>
                                    {(() => {
                                            if (props.modalTitle === 'edit'){
                                                return (
                                                      <Fragment>
                                                              {formik.values.operator === 'خروج'?
                                                                      <div className="col form-floating">
                                                                            <input type="text" className="form-control" id="receiver"
                                                                            name='receiver' value={formik.values.receiver} onChange={formik.handleChange}
                                                                            placeholder="560" required/>
                                                                                <label htmlFor="receiver">گیرنده</label>
                                                                             <div className="invalid-feedback">
                                                                                 گیرنده  را وارد کنید.
                                                                             </div>
                                                                      </div>
                                                                :  null}
                                                    {(() => {
                                                        if (formik.values.operator === 'ورود' || formik.values.operator === 'ثبت اولیه' ){
                                                            return (
                                                                <Fragment>
                                                                          <div className="col form-floating">
                                                                                <input type="text" className="form-control" id="receiver"
                                                                                name='receiver' value={formik.values.receiver} onChange={formik.handleChange}
                                                                                placeholder="560" required/>
                                                                                    <label htmlFor="receiver">گیرنده</label>
                                                                                 <div className="invalid-feedback">
                                                                                     گیرنده  را وارد کنید.
                                                                                 </div>
                                                                              </div>
                                                                <div className="col form-floating">
                                                                            <input type="text" className="form-control" id="buyer" name='buyer' value={formik.values.buyer} onChange={formik.handleChange}
                                                                                   placeholder="560" required/>
                                                                                <label htmlFor="buyer">خریدار</label>
                                                                             <div className="invalid-feedback">
                                                                                 خریدار  را وارد کنید.
                                                                             </div>
                                                                        </div>
                                                                       <div className="col form-floating">
                                                                            <input type="text" className="form-control" id="seller" name='seller' value={formik.values.seller} onChange={formik.handleChange}
                                                                                   placeholder="560" required/>
                                                                                <label htmlFor="seller">فروشنده</label>
                                                                             <div className="invalid-feedback">
                                                                                 فروشنده  را وارد کنید.
                                                                             </div>
                                                                        </div>
                                                                </Fragment>
                                                            )
                                                        }
                                                    })()}
                                                </Fragment>
                                                )
                                            }

                                     })()}
                                </div>

                            <hr className='bg-primary my-4'/>
                            <div className='d-flex gap-2 mb-3'>
                                        {(() => {
                                        if (props.modalTitle === 'entry' || props.modalTitle === 'register'){
                                                        return (
                                                            <Fragment>
                                                                  <div className="col form-floating">
                                                                    <input type="text" className="form-control" id="receiver" value={formik.values.receiver}
                                                                   onChange={formik.handleChange} name='receiver' placeholder="560" required/>
                                                                        <label htmlFor="receiver">گیرنده</label>
                                                                     <div className="invalid-feedback">
                                                                         گیرنده  را وارد کنید.
                                                                     </div>
                                                                  </div>
                                                                {documents === 'فاکتور' ?
                                                                      <div className="col form-floating">
                                                                            <input type="text" className="form-control" id="buyer" value={formik.values.buyer}
                                                                               onChange={formik.handleChange} name='buyer' placeholder="560" required/>
                                                                                <label htmlFor="buyer">خریدار</label>
                                                                             <div className="invalid-feedback">
                                                                                 خریدار  را وارد کنید.
                                                                             </div>
                                                                        </div>
                                                                    :  null}
                                                            </Fragment>
                                                        )
                                                    }
                                        })()}
                                {documents === 'حواله' ?
                                          <div className="col form-floating">
                                                    <input type="text" className="form-control" id="receiver"
                                                    name='receiver' value={formik.values.receiver} onChange={formik.handleChange}
                                                    placeholder="560" required/>
                                                        <label htmlFor="receiver">گیرنده</label>
                                                     <div className="invalid-feedback">
                                                         گیرنده  را وارد کنید.
                                                     </div>
                                          </div>
                                        :  null}
                             </div>
                              <div className='d-flex gap-2 mb-3'>
                                <div className="form-floating  col-4">
                                <select className="form-select" id="documentType" name='document_type' aria-label="Document Type" value={formik.values.document_type}
                                disabled={formik.values.operator === 'خروج' || formik.values.operator ===  'ورود' || formik.values.operator === 'ثبت اولیه'} onChange={(e) => {
                                setDocument(e.target.value)
                                formik.setFieldValue('document_type' , e.target.value)}}>
                                            <option  value='' disabled>انتخاب کنید</option>
                                             {(() => {
                                                if (props.modalTitle === 'entry'){
                                                    return(
                                                      <Fragment>
                                                            <option value="فاکتور">فاکتور</option>
                                                            <option value="متفرقه">متفرقه</option>
                                                            <option value="انبارگردانی">انبارگردانی</option>
                                                            <option value="سند">سند</option>
                                                      </Fragment>
                                                    )
                                                }else if (props.modalTitle === 'remove'){
                                                    return(
                                                        <Fragment>
                                                            <option value="حواله">حواله</option>
                                                            <option value="متفرقه">متفرقه</option>
                                                            <option value="سند">سند</option>
                                                            <option value="انبارگردانی">انبارگردانی</option>
                                                        </Fragment>
                                                    )
                                                }else if (props.modalTitle === 'edit'){
                                                    return(
                                                        <Fragment>
                                                          <option value="حواله">حواله</option>
                                                          <option value="فاکتور">فاکتور</option>
                                                          <option value="متفرقه">متفرقه</option>
                                                          <option value="انبارگردانی">انبارگردانی</option>
                                                          <option value="سند">سند</option>
                                                        </Fragment>
                                                    )
                                                }else if (props.modalTitle === 'register'){
                                                    return(
                                                        <Fragment>
                                                          <option value="انبارگردانی">انبارگردانی</option>
                                                          <option value="فاکتور">فاکتور</option>
                                                          <option value="سند">سند</option>
                                                          <option value="متفرقه">متفرقه</option>
                                                        </Fragment>
                                                    )
                                                }
                                            })()}

                                        </select>
                                        <label htmlFor="documentType">مدرک</label>
                              </div>
                             <div className="col form-floating">
                                <input type="text" className="form-control" name='document_code'
                                id="documentId" value={formik.values.document_code}
                                onChange={formik.handleChange}
                                       placeholder="560"/>
                                    <label htmlFor="documentId">شناسه {documents}</label>
                                 <div className="invalid-feedback">
                                     شناسه {documents}  را وارد کنید.
                                 </div>
                               </div>
                                  {(() => {
                                       if (props.modalTitle === 'edit'){
                                                    return (
                                                            <Fragment>
                                                                          {(() => {
                                                        if (formik.values.operator === 'خروج'){
                                                            return (
                                                                   <div className="col form-floating">
                                                                        <input className="form-control" type='search' list="consumeCauseList" id="consumeCause" name='consumable'
                                                                        value={formik.values.consumable} onChange={formik.handleChange}
                                                                        placeholder="اجاره" required/>
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
                                                                         <div className="invalid-feedback">
                                                                         مورد مصرف  را انتخاب کنید.
                                                                     </div>
                                                                    </div>
                                                            )
                                                        }
                                                    })()}
                                                            </Fragment>
                                                    )
                                                }
                                  })()}
                          </div>
                                {(() => {
                                    if (((props.modalTitle === 'entry' || props.modalTitle === 'register') && documents === 'فاکتور') || (props.modalTitle === 'remove' && documents === 'حواله')){
                                        return(
                                            <div className="input-group">
                                                <label className="input-group-text"
                                                       htmlFor="factor-check">فایل {documents}</label>
                                                <input type="file" className="form-control" accept="application/pdf" id="factor-check" onChange={documents === 'حواله' ? checkBill : factor}/>
                                            </div>
                                        )
                                    }
                                })()}
                              {(() => {
                                    if ((props.modalTitle === 'edit')){
                                        return(
                                               <div className="col form-floating">
                                                    <textarea className="form-control" name='amendment' id="amendment" value={formik.values.amendment}
                                                    onChange={formik.handleChange} placeholder="..."/>
                                                        <label htmlFor="amendment">توضیحات</label>
                                                     <div className="invalid-feedback">
                                                         شناسه {documents}  را وارد کنید.
                                                     </div>
                                               </div>
                                        )
                                    }
                                })()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={refreshPage}><CloseOutlined /></button>
                            <button type="button" className="btn btn-success" onClick={handleSubmit()}><CheckOutlined /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  </Fragment>
  );
};
export default Modal