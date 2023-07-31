import React, {Fragment, useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import Url from "../../../config";

const UploadPropertyDoc = () => {
    const [search , setSearch] = useState('')
    const [property, setProperties] = useState([])
    const [allContract, setAllContract] = useState([])
    const [contractId, setContractId] = useState('')
    const [partitionSelect , setPartitionSelect] = useState('')

    const formik = useFormik({
    initialValues: {
      id: property.id,
      typeProperty: property.typeProperty,
      name: property.name,
      docNumber: property.docNumber,
      plateMotor: property.plateMotor,
      addressChassis: property.addressChassis,
      landlord: property.landlord,
      modelMeter: property.modelMeter,
      madeOf: property.madeOf,
      part1plate: property.part1plate,
      part2plate: property.part2plate,
      part3plate: property.part3plate,
      cityPlate: property.cityPlate,
      descriptionLocation: property.descriptionLocation,
      paperDoc: property.paperDoc,
      insurancePaper: property.insurancePaper,
      gasCard: property.gasCard,
      carCard: property.carCard,
      description: property.description,
      soldDate: property.soldDate,
      buyer: property.buyer,
      soldStatus: property.soldStatus,
      saleFactorFile: property.saleFactorFile,
      insurancePaperFile: property.insurancePaperFile,
      carCardFile: property.carCardFile,
      greenCardFile: property.greenCardFile,
      gasCardFile: property.gasCardFile,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
        console.log(values);
    },
    });

    const fetchDataSpecific = async () => {
        if (contractId){
            const response = await fetch(`${Url}/api/properties/${contractId}/?fields=id,typeProperty,type_form,name,docNumber,plateMotor,addressChassis,landlord,modelMeter,madeOf,part1plate,part2plate,part3plate,cityPlate,descriptionLocation,paperDoc,insurancePaper,gasCard,carCard,description,soldDate,buyer,soldStatus` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setProperties(data)
        }

      }
      const fetchData = async () => {
        const response = await fetch(`${Url}/api/properties/?fields=id,typeProperty,type_form,name,docNumber,plateMotor,addressChassis,landlord,modelMeter,madeOf,part1plate,part2plate,part3plate,cityPlate,descriptionLocation,paperDoc,insurancePaper,gasCard,carCard,description,soldDate,buyer,soldStatus` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setAllContract(data)
      }

      const handleId = (e) => {
            allContract.filter(contract => contract.docNumber === e.target.value).map((data) => (
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
            `${Url}/api/properties/${contractId}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: formik.values.docNumber,
              plateMotor: formik.values.plateMotor,
              addressChassis: formik.values.addressChassis,
              landlord: formik.values.landlord,
              modelMeter: formik.values.modelMeter,
              madeOf: formik.values.madeOf,
              part1plate: formik.values.part1plate,
              part2plate: formik.values.part2plate,
              part3plate: formik.values.part3plate,
              cityPlate: formik.values.cityPlate,
              descriptionLocation: formik.values.descriptionLocation,
              paperDoc: formik.values.paperDoc,
              insurancePaper: formik.values.insurancePaper,
              gasCard: formik.values.gasCard,
              carCard: formik.values.carCard,
              description: formik.values.description,
              soldDate: formik.values.soldDate,
              buyer: formik.values.buyer,
              soldStatus: formik.values.soldStatus,
              saleFactorFile: formik.values.saleFactorFile,
              insurancePaperFile: formik.values.insurancePaperFile,
              carCardFile: formik.values.carCardFile,
              greenCardFile: formik.values.greenCardFile,
              gasCardFile: formik.values.gasCardFile,
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

        function saleFactorFile(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('saleFactorFile' , res)
              });
            }

        function insurancePaperFile(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('insurancePaperFile' , res)
              });
            }

        function carCardFile(e) {
              reader(e.target.files[0], (err, res) => {
                formik.setFieldValue('carCardFile' , res)
              });
            }

        function greenCardFile(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('greenCardFile' , res)
          });
        }

        function gasCardFile(e) {
          reader(e.target.files[0], (err, res) => {
            formik.setFieldValue('gasCardFile' , res)
          });
        }

    return (
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                     <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                            <select className="form-select" defaultValue='' id="partitionSelect" style={{maxWidth:'20vw' , minWidth:'200px'}}
                            aria-label="Partition Select" onChange={(e) => setPartitionSelect(e.target.value)}>
                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                <option value={'منقول'}>منقول</option>
                                <option value={'غیر منقول'}>غیر منقول</option>
                            </select>
                            <label htmlFor="partitionSelect">بارگذاری اسناد بخش</label>
                     </div>
                     <div className='m-4'>
                        <div className="input-group mb-3">
                                <input type="text" className="form-control" value={search} onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }} placeholder="شماره سند"
                                aria-label="searchBox" aria-describedby="searchDocuments"/>
                            </div>
                             {allContract.filter(contract => contract.docNumber === search && contract.type_form === (partitionSelect === 'منقول')).map((data) => (
                                    <div className="alert alert-success" role="alert" key={data.id}>
                                        سند با شماره ثبت {data.id} یافت شد.
                                    </div>
                             ))}
                         {(() => {
                             if (allContract.filter(contract => contract.docNumber === search && contract.type_form === (partitionSelect === 'منقول')).length !== 0){
                                 return (
                                         <div className= 'mt-5'>
                                               <div className="input-group mb-3">
                                                   <label className='me-4'>فاکتور فروش</label>
                                                   <button className="btn btn-outline-secondary" type="button"
                                                   id="saleFactorBtn" onClick={putHandler}>بارگذاری
                                                   </button>
                                                   <input type="file" className="form-control" name='saleFactorFile'  accept="application/pdf" id="saleFactorInp"
                                                   aria-describedby="saleFactorBtn" aria-label="Upload" onChange={saleFactorFile}/>
                                               </div>
                                               <div className="input-group mb-3 align-items-center">
                                                   <label className='me-5'>بیمه نامه</label>
                                                   <button className="btn btn-outline-secondary" type="button"
                                                   id="insurancePaperBtn" onClick={putHandler}>بارگذاری
                                                   </button>
                                                   <input type="file" className="form-control" name='insurancePaperFile'  accept="application/pdf" id="insurancePaperInp"
                                                   aria-describedby="insurancePaperBtn" aria-label="Upload" onChange={insurancePaperFile}/>
                                               </div>
                                               <div className="input-group mb-3 align-items-center">
                                                   <label className='me-4'>کارت ماشین</label>
                                                   <button className="btn btn-outline-secondary" type="button" id="carCardBtn" onClick={putHandler}>بارگذاری</button>
                                                   <input type="file" className="form-control" id="carCardInp" name='carCardFile'  accept="application/pdf"
                                                   aria-describedby="carCardBtn" aria-label="Upload" onChange={carCardFile}/>
                                               </div>
                                               <div className="input-group mb-3 align-items-center">
                                                   <label className='me-5'>کارت سبز</label>
                                                   <button className="btn btn-outline-secondary" type="button"
                                                   id="greenCardBtn" onClick={putHandler}>بارگذاری
                                                   </button>
                                                   <input type="file" className="form-control" id="greenCardInp" name='greenCardFile'  accept="application/pdf"
                                                   aria-describedby="greenCardBtn" aria-label="Upload" onChange={greenCardFile}/>
                                               </div>
                                               <div className="input-group mb-3 align-items-center">
                                                   <label className='me-4'>کارت سوخت</label>
                                                   <button className="btn btn-outline-secondary" type="button" id="gasCardBtn" onClick={putHandler}>بارگذاری</button>
                                                   <input type="file" className="form-control" id="gasCardInp" name='gasCardFile'  accept="application/pdf"
                                                   aria-describedby="gasCardBtn" aria-label="Upload" onChange={gasCardFile}/>
                                               </div>
                                            </div>
                                 )
                             }
                         })()}
                      </div>
                 </div>
        </Fragment>
    )
}
export default  UploadPropertyDoc