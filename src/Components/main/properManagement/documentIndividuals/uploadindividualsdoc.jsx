import React, {Fragment, useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import Url from "../../../config";

const UploadIndividualsDoc = () => {
    const [typeDocument , setTypeDocument] = useState('')
    const [search , setSearch] = useState('')
    const [contract, setContracts] = useState([])
    const [allContract, setAllContract] = useState([])
    const [contractId, setContractId] = useState('')
    const formik = useFormik({
    initialValues: {
      id: contract.id,
      type: contract.type,
      full_name: contract.full_name,
      date: contract.date,
      national_id: contract.national_id,
      sex: contract.sex,
      office: contract.office,
      job: contract.job,
      approvedPrice: contract.approvedPrice,
      commitmentPrice: contract.commitmentPrice,
      typeBail: contract.typeBail,
      firstBail: contract.firstBail,
      secondBail: contract.secondBail,
      Birth_certificate1: contract.Birth_certificate1,
      Birth_certificate2: contract.Birth_certificate2,
      Birth_certificate3: contract.Birth_certificate3,
      Birth_certificate4: contract.Birth_certificate4,
      front_card: contract.front_card,
      back_card: contract.back_card,
      driveLicense: contract.driveLicense,
      bail: contract.bail,
      certificateMedic: contract.certificateMedic,
      insurance: contract.insurance,
      police: contract.police,
      retired: contract.retired,
      retired_card: contract.retired_card,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
        console.log(values);
    },
    });

    const fetchDataSpecific = async () => {
        if (contractId !== ''){
            const response = await fetch(`${Url}/api/persons/${contractId}/` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setContracts(data)
        }

      }

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/persons` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setAllContract(data)
      }

    const handleId = (e) => {
            allContract.filter(contract => contract.national_id === e.target.value).map((data) => (
                setContractId(data.id)
            ))
      }

    useEffect(() => {
        void fetchData()
        void fetchDataSpecific()
      },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [contractId])

    const putHandler = async () => {
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: formik.values.national_id,
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          Birth_certificate1: formik.values.Birth_certificate1,
                          Birth_certificate2: formik.values.Birth_certificate2,
                          Birth_certificate3: formik.values.Birth_certificate3,
                          Birth_certificate4: formik.values.Birth_certificate4,
                          front_card: formik.values.front_card,
                          back_card: formik.values.back_card,
                          driveLicense: formik.values.driveLicense,
                          bail: formik.values.bail,
                          certificateMedic: formik.values.certificateMedic,
                          insurance: formik.values.insurance,
                          police: formik.values.police,
                          retired: formik.values.retired,
                          retired_card: formik.values.retired_card,
             }, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        }

    function reader(file, callback) {
              const fr = new FileReader();
              fr.onload = () => callback(null, fr.result);
              fr.onerror = (err) => callback(err);
              fr.readAsDataURL(file);
            }

        function Birth_certificate1(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('Birth_certificate1' , res)
              });
            }

        function Birth_certificate2(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('Birth_certificate2' , res)
              });
            }

        function Birth_certificate3(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('Birth_certificate3' , res)
              });
            }

        function Birth_certificate4(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('Birth_certificate4' , res)
          });
        }

        function front_card(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('front_card' , res)
          });
        }

        function back_card(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('back_card' , res)
          });
        }

         function driveLicense(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('driveLicense' , res)
          });
        }
         function bail(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('bail' , res)
          });
        }
         function certificateMedic(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('certificateMedic' , res)
          });
        }
         function insurance(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('insurance' , res)
          });
        }
         function police(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('police' , res)
          });
        }
         function retired(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('retired' , res)
          });
        }
         function retired_card(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('retired_card' , res)
          });
        }
    return (
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                        <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                            <select className="form-select" id="typeDocumentSelector" defaultValue='' style={{maxWidth:'20vw' , minWidth:'200px'}}
                            aria-label="Floating label select example" onChange={(e) => setTypeDocument(e.target.value)}>
                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                <option value="شناسنامه">شناسنامه</option>
                                <option value="کارت ملی">کارت ملی</option>
                                <option value="تضمین">تضمین</option>
                                <option value="گواهی">گواهی</option>
                                <option value="بازنشستگی">بازنشستگی</option>
                            </select>
                            <label htmlFor="typeDocumentSelector">نوع مدارک</label>
                        </div>

                       <div className='m-4'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="کد ملی" value={search} onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }}
                                aria-label="searchBoxNationalId" aria-describedby="searchDocuments"/>
                                <button className="btn btn-outline-success material-symbols-outlined" type="button" id="searchNationalIdBtn">search</button>
                            </div>
                            {allContract.filter(contract => contract.national_id === search).map((data) => (
                                <div className="alert alert-success" role="alert" key={data.id}>
                                    قرارداد با شماره ثبت {data.id} یافت شد.
                                </div>
                            ))}
                           {(() => {
                               if (allContract.filter(contract => contract.national_id === search)){
                                   return (
                                       <div className= 'mt-5'>
                                              {(() => {
                                                      if (typeDocument === 'شناسنامه'){
                                                          return(
                                                                <Fragment>
                                                                    <div className="input-group mb-3 align-items-center ">
                                                                       <label className='me-4'>صفحه اول</label>
                                                                       <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                       id="firstPageBtn">بارگذاری
                                                                       </button>
                                                                       <input type="file" className="form-control" id="firstPageInp"
                                                                       aria-describedby="firstPageBtn"
                                                                       name='Birth_certificate1'  accept="application/pdf" onChange={Birth_certificate1} aria-label="Upload"/>
                                                                   </div>
                                                                   <div className="input-group mb-3 align-items-center">
                                                                       <label className='me-4'>صفحه دوم</label>
                                                                       <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                        id="secondPageBtn">بارگذاری</button>
                                                                       <input type="file" className="form-control" id="secondPageInp"
                                                                        aria-describedby="secondPageBtn" name='Birth_certificate2'
                                                                        accept="application/pdf" onChange={Birth_certificate2} aria-label="Upload"/>
                                                                   </div>
                                                                   <div className="input-group mb-3 align-items-center">
                                                                      <label className='me-4'>صفحه سوم</label>
                                                                      <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                       id="thirdPageBtn">بارگذاری</button>
                                                                      <input type="file" className="form-control" name='Birth_certificate3'
                                                                        accept="application/pdf" onChange={Birth_certificate3} id="thirdPageInp"
                                                                      aria-describedby="thirdPageBtn" aria-label="Upload"/>
                                                                   </div>
                                                                   <div className="input-group mb-3 align-items-center">
                                                                       <label className='me-4'>صفحه چهارم</label>
                                                                       <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                       id="forthPageBtn">بارگذاری</button>
                                                                       <input type="file" className="form-control" name='Birth_certificate4'
                                                                        accept="application/pdf" onChange={Birth_certificate4} id="forthPageInp"
                                                                       aria-describedby="forthPageBtn" aria-label="Upload"/>
                                                                   </div>
                                                                </Fragment>
                                                              )
                                                     }else if (typeDocument === 'کارت ملی'){
                                                                          return(
                                                                              <Fragment>
                                                                                  <div className="input-group mb-3 align-items-center ">
                                                                                      <label className='me-2'>پشت</label>
                                                                                      <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                      id="backCardBtn">بارگذاری</button>
                                                                                      <input type="file" className="form-control" name='back_card'
                                                                                      accept="application/pdf" onChange={back_card} id="backCardInp"
                                                                                      aria-describedby="backCardBtn" aria-label="Upload"/>
                                                                                  </div>
                                                                                  <div className="input-group mb-3 align-items-center">
                                                                                      <label className='me-4'>رو</label>
                                                                                      <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                      id="frontCardBtn">بارگذاری</button>
                                                                                      <input type="file" className="form-control" name='front_card'
                                                                                      accept="application/pdf" onChange={front_card} id="frontCardInp"
                                                                                      aria-describedby="frontCardBtn" aria-label="Upload"/>
                                                                                  </div>
                                                                              </Fragment>
                                                                          )
                                                                      }else if (typeDocument === 'تضمین'){

                                                                          return(

                                                                              <Fragment>
                                                                                <div className="input-group mb-3 align-items-center ">
                                                                                   <label className='me-4'>تضمین</label>
                                                                                   <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                   id="bailFileBtn">بارگذاری</button>
                                                                                   <input type="file" className="form-control" name='bail'
                                                                                      accept="application/pdf" onChange={bail} id="bailFileInp"
                                                                                   aria-describedby="bailFileBtn" aria-label="Upload"/>
                                                                                </div>
                                                                              </Fragment>
                                                                          )}else if (typeDocument === 'گواهی'){
                                                                          return(
                                                                              <Fragment>
                                                                                <div className="input-group mb-3 align-items-center">
                                                                                    <label className='me-3'>گواهی پزشکی</label>
                                                                                    <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                    id="certificateMedicBtn">بارگذاری</button>
                                                                                    <input type="file" className="form-control" name='certificateMedic'
                                                                                    accept="application/pdf" onChange={certificateMedic} id="certificateMedicInp"
                                                                                    aria-describedby="certificateMedicBtn" aria-label="Upload"/>
                                                                                </div>
                                                                                <div className="input-group mb-3 align-items-center">
                                                                                    <label className='me-4'>گواهی بیمه</label>
                                                                                    <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                    id="insuranceBtn">بارگذاری</button>
                                                                                    <input type="file" className="form-control" name='insurance'
                                                                                    accept="application/pdf" onChange={insurance} id="insuranceInp"
                                                                                    aria-describedby="insuranceBtn" aria-label="Upload"/>
                                                                                </div>
                                                                                <div className="input-group mb-3 align-items-center">
                                                                                    <label className='me-4'>گواهی پلیس</label>
                                                                                    <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                    id="policeBtn">بارگذاری</button>
                                                                                    <input type="file" className="form-control" id="policeInp" name='police'
                                                                                    accept="application/pdf" onChange={police}
                                                                                    aria-describedby="policeBtn" aria-label="Upload"/>
                                                                                </div>
                                                                                <div className="input-group mb-3 align-items-center">
                                                                                  <label className='me-5'>گواهینامه</label>
                                                                                  <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                   id="driveLicenseBtn">بارگذاری</button>
                                                                                  <input type="file" className="form-control" id="driveLicenseInp" name='driveLicense'
                                                                                    accept="application/pdf" onChange={driveLicense}
                                                                                  aria-describedby="driveLicenseBtn" aria-label="Upload"/>
                                                                                </div>
                                                                              </Fragment>
                                                                          )}else if (typeDocument === 'بازنشستگی'){
                                                                             return(
                                                                              <Fragment>
                                                                                <div className="input-group mb-3 align-items-center">
                                                                                      <label className='me-4'>حکم بازنشستگ</label>
                                                                                      <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                      id="retiredBtn">بارگذاری</button>
                                                                                      <input type="file" className="form-control" id="retiredInp" name='retired'
                                                                                    accept="application/pdf" onChange={retired}
                                                                                      aria-describedby="retiredBtn" aria-label="Upload"/>
                                                                                </div>
                                                                                <div className="input-group mb-3 align-items-center">
                                                                                   <label className='me-3'>کارت بازنشستگی</label>
                                                                                   <button className="btn btn-outline-secondary" onClick={putHandler} type="button"
                                                                                   id="retiredCardBtn">بارگذاری</button>
                                                                                   <input type="file" className="form-control" id="retiredCardInp" name='retired_card'
                                                                                    accept="application/pdf" onChange={retired_card}
                                                                                   aria-describedby="retiredCardBtn" aria-label="Upload"/>
                                                                                </div>
                                                                              </Fragment>
                                                                             )
                                                                         }
                                      })()}
                                </div>
                                   )
                               }
                           })()}
                </div>
            </div>
        </Fragment>
    )
}

export default  UploadIndividualsDoc