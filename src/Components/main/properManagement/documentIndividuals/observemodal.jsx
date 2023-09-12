import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Url from "../../../config";
import {CloseOutlined} from "@ant-design/icons";
import fixNumbers from "../../persianNumbers";


const ObserveModal = () => {
    const [search , setSearch] = useState('')
    const [allContract, setAllContract] = useState([])
    const [contract, setContracts] = useState([])
    const [contractId, setContractId] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [typeDocument , setTypeDocument] = useState('')

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/persons/?fields=id,type,expireDate,full_name,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setAllContract(data)
      }

     const fetchDataSpecific = async () => {
        if (contractId){
            const response = await fetch(`${Url}/api/persons/${contractId}/` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setContracts(data)
        }
      }

     const handleId = (e) => {
            allContract.filter(contract => contract.national_id === fixNumbers(e.target.value)).map((data) => (
                setContractId(data.id)
            ))
      }

    const handleOpenFile = () => {
        if (selectedFile === 'Birth_certificate1'){
            return contract.Birth_certificate1
        }else if (selectedFile === 'Birth_certificate2'){
            return contract.Birth_certificate2
        }else if (selectedFile === 'Birth_certificate3'){
            return contract.Birth_certificate3
        }else if (selectedFile === 'Birth_certificate4'){
            return contract.Birth_certificate4
        }else if (selectedFile === 'front_card'){
            return contract.front_card
        }else if (selectedFile === 'back_card'){
            return contract.back_card
        }else if (selectedFile === 'driveLicense'){
            return contract.driveLicense
        }else if (selectedFile === 'bail'){
            return contract.bail
        }else if (selectedFile === 'certificateMedic'){
            return contract.certificateMedic
        }else if (selectedFile === 'insurance'){
            return contract.insurance
        }else if (selectedFile === 'police'){
            return contract.police
        }else if (selectedFile === 'retired'){
            return contract.retired
        }else if (selectedFile === 'retired_card'){
            return contract.retired_card
        }else if (selectedFile === 'degreeEducation'){
            return contract.degreeEducation
        }else if (selectedFile === 'personalPhoto'){
            return contract.personalPhoto
        }else if (selectedFile === 'certificateSecurity'){
            return contract.certificateSecurity
        }else if (selectedFile === 'retired_insurance'){
            return contract.retired_insurance
        }
    }
        useEffect(() => {
            void fetchData()
            void fetchDataSpecific()

          },
             // eslint-disable-next-line react-hooks/exhaustive-deps
            [contractId])

  return (
      <Fragment>
        <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false"  id="observModal" tabIndex="-1" aria-labelledby="observModalLabel"
        aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">نمایش مدارک</h1>
                            <button type="button" className="btn-close " data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                    <div className="container modal-body">

                        <div className="input-group mb-3">
                            <input type="text"  id='searchBox' className="form-control" placeholder="کد ملی را وارد کنید" onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }}
                            aria-label="searchBox" aria-describedby="search"/>
                        </div>
                        {allContract.filter(contract => contract.national_id === search).map((data) => (
                                  <div className="alert alert-success" role="alert" key={data.id}>
                                    قرارداد با شماره ثبت {data.id} یافت شد.
                                  </div>
                        ))}
                        {(() => {
                            if (allContract.filter(contract => contract.national_id === search).length !== 0){
                                return (
                                               <Fragment>
                                                    <div className="form-floating  col-4">
                                                        <select className="form-select" id="typeDocument" defaultValue=''
                                                                aria-label="Type Document" onChange={(e) => setTypeDocument(e.target.value)}>
                                                            <option value='' disabled>یک مورد انتخاب کنید</option>
                                                            <option value="شناسنامه">شناسنامه</option>
                                                            <option value="کارت ملی">کارت ملی</option>
                                                            <option value="عکس پرسنلی">عکس پرسنلی</option>
                                                            <option value="مدرک تحصیلی">مدرک تحصیلی</option>
                                                            <option value="تضمین">تضمین</option>
                                                            <option value="گواهی">گواهی</option>
                                                            <option value="بازنشستگی">بازنشستگی</option>
                                                        </select>
                                                        <label htmlFor="typeDocument">نوع مدارک</label>
                                                    </div>

                                                    <hr className='bg-primary my-5'/>

                                                    <div className='row'>
                                                            <div className="input-group mb-3">
                                                                <Link className='text-decoration-none link-dark' download='document.jpg'
                                                                      rel="noreferrer" to={handleOpenFile()} >
                                                                <button className="btn btn-outline-success"  type="button">
                                                                نمایش</button></Link>
                                                                        <select className="form-select" id="checkFileList" onChange={e => setSelectedFile(e.target.value)} defaultValue=''
                                                                aria-label="checkFileList">
                                                                <option value='' disabled>فایل مورد نظر را انتخاب کنید</option>
                                                                  {(() => {

                                                                      if (typeDocument === 'شناسنامه'){
                                                                          return(
                                                                              <Fragment>
                                                                                    <option value="Birth_certificate1">صفحه 1</option>
                                                                                    <option value="Birth_certificate2">صفحه 2</option>
                                                                                    <option value="Birth_certificate3">صفحه 3</option>
                                                                                    <option value="Birth_certificate4">صفحه 4</option>
                                                                              </Fragment>
                                                                          )
                                                                      }else if (typeDocument === 'کارت ملی'){
                                                                          return(
                                                                              <Fragment>
                                                                                    <option value="back_card">پشت</option>
                                                                                    <option value="front_card">رو</option>
                                                                              </Fragment>
                                                                          )
                                                                      }else if (typeDocument === 'تضمین'){
                                                                          return(
                                                                              <Fragment>
                                                                                    <option value="bail">تضمین</option>
                                                                              </Fragment>
                                                                          )
                                                                      }else if (typeDocument === 'گواهی'){
                                                                          return(
                                                                              <Fragment>
                                                                                    <option value="certificateMedic">گواهی پزشکی</option>
                                                                                    <option value="insurance">گواهی بیمه</option>
                                                                                    <option value="police">گواهی پلیس</option>
                                                                                    <option value="certificateSecurity">گواهی حفاظتی</option>
                                                                                    <option value="driveLicense">گواهینامه</option>
                                                                              </Fragment>
                                                                          )
                                                                      }else if (typeDocument === 'بازنشستگی'){
                                                                          return(
                                                                              <Fragment>
                                                                                    <option value="retired">حکم بازنشستگی</option>
                                                                                    <option value="retired_card">کارت بازنشستگی</option>
                                                                                     <option value="retired_insurance">دفترچه بیمه بازنشستگی</option>

                                                                              </Fragment>
                                                                          )
                                                                      }else if (typeDocument === 'عکس پرسنلی') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="personalPhoto">عکس پرسنلی</option>
                                                                        </Fragment>
                                                                    )
                                                                }else if (typeDocument === 'مدرک تحصیلی') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="degreeEducation">مدرک تحصیلی</option>
                                                                        </Fragment>
                                                                    )
                                                                }
                                                                  })()}
                                                                </select>
                                                            </div>
                                                        </div>
                                                     </Fragment>
                                )
                            }
                        })()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><CloseOutlined /></button>
                        </div>
            </div>
        </div>
    </div>
  </Fragment>
  );
};
export default ObserveModal