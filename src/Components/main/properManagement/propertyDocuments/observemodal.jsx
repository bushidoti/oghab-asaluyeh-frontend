import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Url from "../../../config";
import {CloseOutlined} from "@ant-design/icons";

const ObserveModal = () => {
    const [search , setSearch] = useState('')
    const [allContract, setAllContract] = useState([])
    const [property, setProperties] = useState([])
    const [contractId, setContractId] = useState('')
    const [selectedFile, setSelectedFile] = useState('')

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/properties` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setAllContract(data)
      }

     const fetchDataSpecific = async () => {
        if (contractId !== ''){
            const response = await fetch(`${Url}/api/properties/${contractId}/` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setProperties(data)
        }
      }

     const handleId = (e) => {
            allContract.filter(contract => contract.docNumber === e.target.value).map((data) => (
                setContractId(data.id)
            ))
      }

     const handleOpenFile = () => {
        if (selectedFile === 'saleFactorFile'){
            return property.saleFactorFile
        }else if (selectedFile === 'insurancePaperFile'){
            return property.insurancePaperFile
        }else if (selectedFile === 'carCardFile'){
            return property.carCardFile
        }else if (selectedFile === 'greenCardFile'){
            return property.greenCardFile
        }else if (selectedFile === 'gasCardFile'){
            return property.gasCardFile
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
        <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="observModal" tabIndex="-1" aria-labelledby="observModalLabel"
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
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" id='searchBox' value={search} onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }} placeholder="شماره سند"
                                aria-label="searchBox" aria-describedby="searchDocuments"/>
                            </div>
                            </div>
                              {allContract.filter(contract => contract.docNumber === search).map((data) => (
                                    <div className="alert alert-success" role="alert" key={data.id}>
                                        سند با شماره ثبت {data.id} یافت شد.
                                    </div>
                             ))}
                            <hr className='bg-primary my-5'/>
                            <div className='row'>
                                <div className="input-group mb-3">
                                    <Link className='text-decoration-none link-dark' download='document.pdf'
                                                  rel="noreferrer" to={handleOpenFile()} >
                                            <button className="btn btn-outline-success"  type="button">
                                            نمایش</button></Link>
                                    <select className="form-select" id="checkFileSelector" defaultValue='' onChange={e => setSelectedFile(e.target.value)}
                                    aria-label="checkFileBtn">
                                        <option value='' disabled>فایل مورد نظر را انتخاب کنید</option>
                                        <option value="greenCardFile">کارت سبز</option>
                                        <option value="carCardFile">کارت ماشین</option>
                                        <option value="gasCardFile">کارت سوخت</option>
                                        <option value="insurancePaperFile">بیمه نامه</option>
                                        <option value="saleFactorFile">فاکتور فروش</option>
                                    </select>
                                </div>
                            </div>
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