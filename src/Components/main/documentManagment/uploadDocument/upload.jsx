import React, {Fragment, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useFormik} from "formik";
import Url from "../../../config";
import {Context} from "../../../../context";
import Swal from "sweetalert2";

const UploadDocuments = () => {
    const [partitionSelect , setPartitionSelect] = useState('')
    const [search , setSearch] = useState('')
    const [contract, setContracts] = useState([])
    const context = useContext(Context)
    const [selectedFile, setSelectedFile] = useState('')

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
      doc_1: '',
      doc_2: '',
      doc_3: '',
      doc_4: '',
      doc_5: '',
      doc_6: '',
      doc_7: '',
      doc_8: '',
      doc_9: '',
      doc_10: '',
      doc_bail_1: contract.doc_bail_1,
      doc_bail_2: contract.doc_bail_2,

    },
    enableReinitialize: true,
    onSubmit: (values) => {
        console.log(values);
    },
    });

     const fetchDataSpecific = async () => {
         if (contractId){
                const response = await fetch(`${Url}/api/documents/${contractId}/?fields=id,contractNumber,employer,type_form,dateContract,contractPrice,durationContract,prePaidPrice,goodPrice,typeBail1,firstBail,secondBail,commitmentPrice,typeBail2,firstBail2,secondBail2,topicContract,typeContract,clearedDate,receivedDocument,clearedStatus`, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
                const data = await response.json()
                setContracts(data)
         }

      }

      const fetchData = async () => {
        const response = await fetch(`${Url}/api/documents/?fields=id,contractNumber,employer,type_form,dateContract,contractPrice,durationContract,prePaidPrice,goodPrice,typeBail1,firstBail,secondBail,commitmentPrice,typeBail2,firstBail2,secondBail2,topicContract,typeContract,clearedDate,receivedDocument,clearedStatus`, {
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



     const postAlertLoading = () => {
            Swal.fire({
                  title: 'در حال ثبت کردن!',
                  icon: 'warning',
                  html:   `<div class="spinner-border text-danger" role="status">
                     <span class="visually-hidden">Loading...</span>
                    </div>`,
                  showConfirmButton: false,
            })}

        const putHandler1 = async () => {
              postAlertLoading()
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
                      doc_1: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه یک')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler2 = async () => {
              postAlertLoading()
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
                      doc_2: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه دو')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler3 = async () => {
              postAlertLoading()
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
                      doc_3: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه سه')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler4 = async () => {
              postAlertLoading()
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
                      doc_4: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه چهار')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler5 = async () => {
              postAlertLoading()
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
                      doc_5: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه پنج')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler6 = async () => {
              postAlertLoading()
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
                      doc_6: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه شش')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler7 = async () => {
              postAlertLoading()
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
                      doc_7: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه هفت')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler8 = async () => {
              postAlertLoading()
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
                      doc_8: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه هشت')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler9 = async () => {
              postAlertLoading()
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
                      doc_9: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه نه')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler10 = async () => {
              postAlertLoading()
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
                      doc_10: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('صفحه ده')
                            context.setScan('')


                        }
                    }

                })
        }
         const putHandler11 = async () => {
              postAlertLoading()
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
                      doc_bail_1: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('ضمانت اول')
                            context.setScan('')
                        }
                    }
                })
        }

         const putHandler12 = async () => {
              postAlertLoading()
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
                      doc_bail_2: context.scan,
             }, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        }).then(response => {
     return response
          }).then(async data => {
                    try {
                        if (data.response.status === 400) {
                                alert(data.response.status)
                        }
                    } catch (e) {
                        if (data.status === 200) {
                            postAlert('ضمانت دوم')
                            context.setScan('')

                        }
                    }

                })
        }

   const postAlert = (file) => {
                Swal.fire(
                  'ثبت شد!',
                  `${file} ثبت شد.`,
                  'success',
                  'ok',
                )
      }


    const alert= (code) => {
            Swal.fire({
                  icon: 'error',
                  title: `کد ارور ${code}`,
                })
    }



          function scanImage() {
           window.ws.send("1100");
       }

  const handleSubmit = () => {
        if (selectedFile === 'doc_1'){
            return putHandler1
        }else if (selectedFile === 'doc_2'){
            return putHandler2
        }else if (selectedFile === 'doc_3'){
            return putHandler3
        }else if (selectedFile === 'doc_4'){
            return putHandler4
        }else if (selectedFile === 'doc_5'){
            return putHandler5
        }else if (selectedFile === 'doc_6'){
            return putHandler6
        }else if (selectedFile === 'doc_7'){
            return putHandler7
        }else if (selectedFile === 'doc_8'){
            return putHandler8
        }else if (selectedFile === 'doc_9'){
            return putHandler9
        }else if (selectedFile === 'doc_10'){
            return putHandler10
        }else if (selectedFile === 'doc_bail_1'){
            return putHandler11
        }else if (selectedFile === 'doc_bail_2'){
            return putHandler12
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
            <div className= 'plater  m-2 rounded-3 shadow-lg '>


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
                                    <Fragment>
                                             <div className="form-floating" style={{maxWidth:'255px'}}>
                                                    <select className="form-select" defaultValue='' id="partitionSelect" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                                    aria-label="partitionSelect" onChange={(e) => setPartitionSelect(e.target.value)}>
                                                        <option value='' disabled>یک مورد انتخاب کنید</option>
                                                        <option value="قرارداد">قرارداد</option>
                                                        <option value="تضامین">تضامین</option>
                                                    </select>
                                                    <label htmlFor="partitionSelect">بارگذاری بخش</label>
                                                 </div>
                                    <div className= 'mt-5'>
                                                  <div className='row'>
                                                    <div className="input-group mb-3">
                                                        <button className="btn btn-warning" type="button" id="firstPageBtn" onClick={scanImage}>اسکن</button>
                                                        <button className="btn btn-success" type="button" id="firstPageBtn" disabled={!context.scan} onClick={handleSubmit()}>بارگذاری</button>
                                                        <select className="form-select" defaultValue='' id="checkFileBtn" onChange={e => setSelectedFile(e.target.value)}
                                                        aria-label="checkFileBtn">
                                                            <option value=''>فایل مورد نظر را انتخاب کنید</option>
                                                            {(() => {
                                                                if (partitionSelect === 'قرارداد'){
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="doc_1">صفحه اول</option>
                                                                            <option value="doc_2">صفحه دوم</option>
                                                                            <option value="doc_3">صفحه سوم</option>
                                                                            <option value="doc_4">صفحه چهارم</option>
                                                                            <option value="doc_5">صفحه پنجم</option>
                                                                            <option value="doc_6">صفحه ششم</option>
                                                                            <option value="doc_7">صفحه هفتم</option>
                                                                            <option value="doc_8">صفحه هشتم</option>
                                                                            <option value="doc_9">صفحه نهم</option>
                                                                            <option value="doc_10">صفحه دهم</option>
                                                                        </Fragment>
                                                                    )
                                                                }else if (partitionSelect === 'تضامین') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="doc_bail_1">ضمانت اول</option>
                                                                            <option value="doc_bail_2">ضمانت دوم</option>
                                                                        </Fragment>
                                                                    )
                                                                }
                                                            })()}
                                                        </select>
                                                    </div>
                                                 </div>
                                         </div>
                                     <img width={'500px'} height={'350px'} src={context.scan} alt={'تصویری اسکن نشده است'}/>
                                    </Fragment>
                                )
                            }
                         })()}
                    </div>
                 </div>
        </Fragment>
    )
}
export default  UploadDocuments