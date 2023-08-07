import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Url from "../../../config";
import {CloseOutlined} from "@ant-design/icons";

const ObserveModal = () => {
    const [search , setSearch] = useState('')
    const [allContract, setAllContract] = useState([])
    const [contract, setContracts] = useState([])
    const [contractId, setContractId] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [partitionSelect , setPartitionSelect] = useState('')

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/documents`, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
        const data = await response.json()
        setAllContract(data)
      }

     const fetchDataSpecific = async () => {
        if (contractId){
            const response = await fetch(`${Url}/api/documents/${contractId}/`, {
             headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
        })
            const data = await response.json()
            setContracts(data)
        }

      }

     const handleId = (e) => {
            allContract.filter(contract => contract.contractNumber === e.target.value).map((data) => (
                setContractId(data.id)
            ))
      }

    const handleOpenFile = () => {
        if (selectedFile === 'doc_1'){
            return contract.doc_1
        }else if (selectedFile === 'doc_2'){
            return contract.doc_2
        }else if (selectedFile === 'doc_3'){
            return contract.doc_3
        }else if (selectedFile === 'doc_4'){
            return contract.doc_4
        }else if (selectedFile === 'doc_5'){
            return contract.doc_5
        }else if (selectedFile === 'doc_6'){
            return contract.doc_6
        }else if (selectedFile === 'doc_7'){
            return contract.doc_7
        }else if (selectedFile === 'doc_8'){
            return contract.doc_8
        }else if (selectedFile === 'doc_9'){
            return contract.doc_9
        }else if (selectedFile === 'doc_10'){
            return contract.doc_10
        }else if (selectedFile === 'doc_bail_1'){
            return contract.doc_bail_1
        }else if (selectedFile === 'doc_bail_2'){
            return contract.doc_bail_2
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
         <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false"  id="observModal" tabIndex="-1" aria-labelledby="observModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered  modal-lg " >
                        <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">نمایش مدارک</h1>
                                <button type="button" className="btn-close " data-bs-dismiss="modal"
                                aria-label="Close"></button>
                            </div>

                        <form className='needs-validation' noValidate>
                            <div className="container modal-body">

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id='documentNumber' placeholder="شماره قرارداد"
                                           aria-label="documentNumber" aria-describedby="documentNumber" onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }}/>
                                </div>
                                 {allContract.filter(contract => contract.contractNumber === search).map((data) => (
                                  <div className="alert alert-success" role="alert" key={data.id}>
                                    قرارداد با شماره ثبت {data.id} یافت شد.
                                        </div>
                                    ))}

                                <hr className='bg-primary my-5'/>


                                {(() => {
                                    if (allContract.filter(contract => contract.contractNumber === search).length !== 0){
                                        return (
                                           <Fragment>
                                                <div className="form-floating col-4 mb-5">
                                                        <select className="form-select" id="partitionSelect" defaultValue=''
                                                        aria-label="partitionSelect" onChange={(e) => setPartitionSelect(e.target.value)}>
                                                            <option value='' disabled>یک مورد انتخاب کنید</option>
                                                            <option value="قرارداد">قرارداد</option>
                                                            <option value="تضامین">تضامین</option>
                                                        </select>
                                                        <label htmlFor="partitionSelect">بخش</label>
                                                </div>
                                                <div className='row'>
                                                    <div className="input-group mb-3">
                                                        <Link className='text-decoration-none link-dark' download='document.jpg'
                                                              rel="noreferrer" to={handleOpenFile()} >
                                                        <button className="btn btn-outline-success"  type="button">
                                                        نمایش</button></Link>
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
                                                </Fragment>
                                        )
                                    }
                                })()}
                              </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><CloseOutlined /></button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
  </Fragment>
  );
};
export default ObserveModal