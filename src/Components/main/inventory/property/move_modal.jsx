import React, {Fragment, useEffect, useState} from "react";

import {useFormik} from "formik";
import Url from "../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const MoveModal = (props) => {
  const [property, setProperty] = useState([])

  const formik = useFormik({
    initialValues: {
          code: property.code || '',
          name: property.name || '',
          inventory: property.inventory || '',
          dst_inventory: property.dst_inventory || '',
          install_location: property.install_location || '',
          user: property.user || '',
          use_for: property.use_for || '',
          description: property.description || '',
          type_register: property.type_register || '',
          model: property.model || '',
          year_made: property.year_made || '',
          owner: property.owner || '',
          plate1: property.plate1 || '',
          using_location: property.using_location || '',
          plate2: property.plate2 || '',
          plate3: property.plate3 || '',
          plate4: property.plate4 || '',
          motor: property.motor || '',
          chassis: property.chassis || '',
          year_buy: property.year_buy || '',
          phone_feature: property.phone_feature || '',
          cpu: property.cpu || '',
          motherboard: property.motherboard || '',
          ram: property.ram || '',
          power: property.power || '',
          hdd: property.hdd || '',
          case: property.case || '',
          type_furniture: property.type_furniture || '',
          type_item: property.type_item || '',
          number_type: property.number_type || '',
          number: property.number || '',
          message: property.message || '',

        },
        enableReinitialize: true,
        });

     const fetchData = async () => {
        if (props.typeProperty !== '' && props.idNumber !== null){
                const response = await fetch(`${Url}/api/${props.typeProperty}/${props.idNumber}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
                const data = await response.json()
                setProperty(data)
        }
    }

    const putHandler = async () => {
         await axios.put(
            `${Url}/api/${props.typeProperty}/${props.idNumber}/`,
              {
              code: formik.values.code,
              dst_inventory: formik.values.dst_inventory,
              message: formik.values.message,
              movement_status: 'pending',
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        setTimeout(
                    refreshPages, 3000)
        }

     const putAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `آیا از این جا به جایی مطمئنید ؟`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, جا به جا کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'ویرایش شد!',
                  'اموال جا به جا شد.',
                  'success',
                  'ok',
                  putHandler(),
                )
              }
            })
      }

     useEffect(() => {
            void fetchData()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [props.typeProperty, formik.values , props.idNumber])

     function refreshPages() {
        window.location.reload()
    }

  return (
      <Fragment>
             <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="moveModal" tabIndex="-1" aria-labelledby="moveModalLabel"
             aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">جا به جایی</h1>
                            <button type="button" className="btn-close " data-bs-dismiss="modal"
                            aria-label="Close" onClick={() => {
                                props.setIdNumber('')
                                formik.resetForm()
                                props.setEditStatus(false)
                            }}></button>
                        </div>
                    <form className='needs-validation' noValidate>
                        <div className="container modal-body">
                            <div className="form-floating justify-content-center mb-5">
                                <input type="text" id="register_code" className="w-25 form-control" aria-label="register_code"
                                aria-describedby="register_code" value={formik.values.code} disabled required/>
                                <label  htmlFor="register_code">کد ثبت</label>
                            </div>
                       <div className='d-flex gap-2'>
                              <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="src_inventory" name='src_inventory' disabled
                                               placeholder="ساختمان" value={formik.values.inventory} required/>
                                            <label htmlFor="src_inventory">انبار مبدا</label>
                                         <div className="invalid-feedback">
                                             انبار مبدا را وارد کنید.
                                         </div>
                                 </div>
                                 <div className="col form-floating mb-3">
                                        <select className="form-select" defaultValue='' id="dst_inventory" name='dst_inventory' onChange={formik.handleChange} aria-label="Type Add" required>
                                            <option value='' disabled>یک مورد انتخاب کنید</option>
                                            <option value='دفتر مرکزی'>دفتر مرکزی</option>
                                            <option value='چابهار'>چابهار</option>
                                            <option value='دزفول'>دزفول</option>
                                            <option value='جاسک'>جاسک</option>
                                            <option value='بیشه کلا'>بیشه کلا</option>
                                            <option value='اورهال تهران'>اورهال تهران</option>
                                            <option value='اورهال اصفهان'>اورهال تهران</option>
                                        </select>
                                    <label htmlFor="dst_inventory">انبار مقصد</label>
                                     <div className="invalid-feedback">
                                         انبار مقصد را وارد کنید.
                                     </div>
                            </div>
                        </div>
                                <div className="col form-floating">
                                    <textarea className="form-control" id="message" name='message' onChange={formik.handleChange}
                                    placeholder="...." required/>
                                    <label htmlFor="message">پیغام</label>
                                    <div className="invalid-feedback">
                                     پیغام را وارد کنید.
                                    </div>
                                </div>
                        </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><CloseOutlined /></button>
                            <button type="button" className="btn btn-success" onClick={putAlert}><CheckOutlined /></button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
          </Fragment>
  );
};

export default MoveModal