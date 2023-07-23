import React, {Fragment, useEffect, useState} from "react";

import {useFormik} from "formik";
import Url from "../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const RecycleModal = (props) => {
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
          canceled_describe: property.canceled_describe || '',

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
              canceled_describe: formik.values.canceled_describe,
              cancel_status: 'pending',
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
              text: `آیا از این ثبت این درخواست مطمئنید ؟`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, درخواست را ثبت کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'ثبت شد!',
                  'درخواست ثبت شد.',
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
             <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="recycleModal" tabIndex="-1" aria-labelledby="recycleModalLabel"
             aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">درخواست بایگانی</h1>
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
                                <input type="text" id="register_code_recycle" className="w-25 form-control" aria-label="register_code_recycle"
                                aria-describedby="register_code_recycle" value={formik.values.code} disabled required/>
                                <label  htmlFor="register_code_recycle">کد ثبت</label>
                            </div>
                                <div className="col form-floating">
                                    <textarea className="form-control" id="canceled_describe" name='canceled_describe' onChange={formik.handleChange}
                                    placeholder="...." required/>
                                    <label htmlFor="canceled_describe">دلیل ثبت درخواست حذف این کالا را بنویسید</label>
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

export default RecycleModal