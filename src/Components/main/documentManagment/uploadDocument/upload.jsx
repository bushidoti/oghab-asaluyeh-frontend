import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useFormik} from "formik";
import Url from "../../../config";

const UploadDocuments = () => {
    const [partitionSelect , setPartitionSelect] = useState('')
    const [search , setSearch] = useState('')
    const [contract, setContracts] = useState([])
    const [allContract, setAllContract] = useState([])
    const [contractId, setContractId] = useState('')
    const formik = useFormik({
    initialValues: {
      id: contract.id,
      contractNumber: contract.contractNumber,
      employer: contract.employer,
      dateContract: contract.dateContract,
      contractPrice: contract.contractPrice,
      durationContract: contract.durationContract,
      prePaidPrice: contract.prePaidPrice,
      goodPrice: contract.goodPrice,
      typeBail1: contract.typeBail1,
      firstBail: contract.firstBail,
      secondBail: contract.secondBail,
      commitmentPrice: contract.commitmentPrice,
      typeBail2: contract.typeBail2,
      firstBail2: contract.firstBail2,
      secondBail2: contract.secondBail2,
      topicContract: contract.topicContract,
      typeContract: contract.typeContract,
      doc_1: contract.doc_1,
      doc_2: contract.doc_2,
      doc_3: contract.doc_3,
      doc_4: contract.doc_4,
      doc_bail_1: contract.doc_bail_1,
      doc_bail_2: contract.doc_bail_2,

    },
    enableReinitialize: true,
    onSubmit: (values) => {
        console.log(values);
    },
    });

     const fetchDataSpecific = async () => {
         if (contractId !== ''){
                const response = await fetch(`${Url}/api/documents/${contractId}/`, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
                const data = await response.json()
                setContracts(data)
         }

      }

      const fetchData = async () => {
        const response = await fetch(`${Url}/api/documents`, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
        const data = await response.json()
        setAllContract(data)
      }

      const handleId = (e) => {
            allContract.filter(contract => contract.contractNumber === e.target.value).map((data) => (
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
                `${Url}/api/documents/${contractId}/`,
                  {
                      contractNumber: formik.values.contractNumber,
                      employer: formik.values.employer,
                      dateContract: formik.values.dateContract,
                      contractPrice: formik.values.contractPrice,
                      durationContract: formik.values.durationContract,
                      prePaidPrice: formik.values.prePaidPrice,
                      goodPrice: formik.values.goodPrice,
                      typeBail1: formik.values.typeBail1,
                      firstBail: formik.values.firstBail,
                      secondBail: formik.values.secondBail,
                      commitmentPrice: formik.values.commitmentPrice,
                      typeBail2: formik.values.typeBail2,
                      firstBail2: formik.values.firstBail2,
                      secondBail2: formik.values.secondBail2,
                      topicContract: formik.values.topicContract,
                      typeContract: formik.values.typeContract,
                      doc_1: formik.values.doc_1,
                      doc_2: formik.values.doc_2,
                      doc_3: formik.values.doc_3,
                      doc_4: formik.values.doc_4,
                      doc_5: formik.values.doc_5,
                      doc_6: formik.values.doc_6,
                      doc_7: formik.values.doc_7,
                      doc_8: formik.values.doc_8,
                      doc_9: formik.values.doc_9,
                      doc_10: formik.values.doc_10,
                      doc_bail_1: formik.values.doc_bail_1,
                      doc_bail_2: formik.values.doc_bail_2,
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

        function doc_1(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('doc_1' , res)
              });
            }

        function doc_2(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('doc_2' , res)
              });
            }

        function doc_3(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('doc_3' , res)
              });
            }

        function doc_4(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_4' , res)
          });
        }

        function doc_5(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_5' , res)
          });
        }

        function doc_6(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_6' , res)
          });
        }

        function doc_7(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_7' , res)
          });
        }

        function doc_8(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_8' , res)
          });
        }

        function doc_9(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_9' , res)
          });
        }

        function doc_10(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_10' , res)
          });
        }

        function doc_bail_1(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_bail_1' , res)
          });
        }

        function doc_bail_2(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('doc_bail_2' , res)
          });
        }
    return (
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                     <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                        <select className="form-select" defaultValue='' id="partitionSelect" style={{maxWidth:'20vw' , minWidth:'200px'}}
                        aria-label="partitionSelect" onChange={(e) => setPartitionSelect(e.target.value)}>
                            <option value='' disabled>یک مورد انتخاب کنید</option>
                            <option value="قرارداد">قرارداد</option>
                            <option value="تضامین">تضامین</option>
                        </select>
                        <label htmlFor="partitionSelect">بارگذاری بخش</label>
                     </div>

                     <div className='m-4'>
                            <div className="input-group mb-3">
                                <input type="text" id='documentNumber' className="form-control" value={search} onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }} placeholder="شماره قرارداد"
                                aria-label="searchBox" aria-describedby="searchDocuments"/>
                            </div>
                            {allContract.filter(contract => contract.contractNumber === search).map((data) => (
                                <div className="alert alert-success" role="alert" key={data.id}>
                                    قرارداد با شماره ثبت {data.id} یافت شد.
                                </div>
                            ))}
                         {(() => {
                            if (allContract.filter(contract => contract.contractNumber === search).length !== 0){
                                return (
                                    <div className= 'mt-5'>
                                    {(() => {
                                        if (partitionSelect === 'قرارداد'){
                                            return (
                                                <div className='d-flex flex-wrap gap-3'>
                                                <div className='col'>
                                                  <div className="input-group mb-3 align-items-center">
                                                        <label className='me-2'>صفحه 01</label>
                                                        <button className="btn btn-outline-secondary" type="button" id="firstPageBtn" onClick={putHandler}>بارگذاری</button>
                                                        <input type="file" name='doc_1'  accept="application/pdf" onChange={doc_1} className="form-control" id="firstPageInp"
                                                        aria-describedby="firstPageBtn" aria-label="firstPageInp"/>
                                                  </div>
                                                  <div className="input-group mb-3 align-items-center">
                                                         <label className='me-2'>صفحه 02</label>
                                                         <button className="btn btn-outline-secondary" type="button" id="secondPageBtn" onClick={putHandler}>بارگذاری</button>
                                                         <input type="file" name='doc_2' accept="application/pdf" className="form-control" id="secondPageInp"
                                                         aria-describedby="secondPageBtn" aria-label="secondPageInp" onChange={doc_2}/>
                                                  </div>

                                                  <div className="input-group mb-3 align-items-center">
                                                         <label className='me-2'>صفحه 03</label>
                                                         <button className="btn btn-outline-secondary" type="button" id="thirdPageBtn" onClick={putHandler}>بارگذاری</button>
                                                         <input type="file" className="form-control" accept="application/pdf" name='doc_3' id="thirdPageInp"
                                                         aria-describedby="thirdPageBtn" aria-label="thirdPageInp" onChange={doc_3}/>
                                                  </div>

                                                  <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 04</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_4}/>
                                                  </div>

                                                    <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 05</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_5}/>
                                                  </div>
                                                </div>
                                                <div className='col'>
                                                     <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 06</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_6}/>
                                                  </div>

                                                     <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 07</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_7}/>
                                                  </div>

                                                     <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 08</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_8}/>
                                                  </div>

                                                     <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 09</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_9}/>
                                                  </div>

                                                     <div className="input-group mb-3 align-items-center">
                                                          <label className='me-2'>صفحه 10</label>
                                                          <button className="btn btn-outline-secondary" type="button" id="forthPageBtn" onClick={putHandler}>بارگذاری</button>
                                                          <input type="file" className="form-control" accept="application/pdf" name='doc_4' id="forthPageInp"
                                                          aria-describedby="forthPageBtn" aria-label="forthPageInp" onChange={doc_10}/>
                                                  </div>
                                            </div>
                                        </div>
                                            )
                                        } else if (partitionSelect === 'تضامین'){
                                            return (
                                                <Fragment>
                                                          <div className="input-group mb-3 align-items-center">
                                                              <label className='me-2'>ضمانت اول</label>
                                                              <button className="btn btn-outline-secondary" type="button" id="firstBailBtn" onClick={putHandler}>بارگذاری</button>
                                                              <input type="file" className="form-control" accept="application/pdf" name='doc_bail_1' onChange={doc_bail_1} id="firstBailInp"
                                                              aria-describedby="firstBailBtn" aria-label="firstBailInp"/>
                                                          </div>
                                                          <div className="input-group mb-3 align-items-center">
                                                              <label className='me-2'>ضمانت دوم</label>
                                                              <button className="btn btn-outline-secondary" type="button" id="secondBailBtn" onClick={putHandler}>بارگذاری</button>
                                                              <input type="file" className="form-control" accept="application/pdf" name='doc_bail_2' onChange={doc_bail_2} id="secondBailInp"
                                                              aria-describedby="secondBailBtn" aria-label="secondBailInp"/>
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
export default  UploadDocuments