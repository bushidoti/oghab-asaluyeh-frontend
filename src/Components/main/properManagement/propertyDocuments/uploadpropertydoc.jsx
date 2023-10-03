import React, {Fragment, useContext, useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import Url from "../../../config";
import {Context} from "../../../../context";
import Swal from "sweetalert2";
import fixNumbers from "../../persianNumbers";

const UploadPropertyDoc = () => {
    const [search , setSearch] = useState('')
    const [property, setProperties] = useState([])
    const [allContract, setAllContract] = useState([])
    const [contractId, setContractId] = useState('')
    const [partitionSelect , setPartitionSelect] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const context = useContext(Context)
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
            allContract.filter(contract => contract.docNumber === fixNumbers(e.target.value)).map((data) => (
                setContractId(data.id)
            ))
      }

      useEffect(() => {
        void fetchData()
        void fetchDataSpecific()

      },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [contractId])

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
            `${Url}/api/properties/${contractId}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: fixNumbers(formik.values.docNumber),
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
              saleFactorFile: context.scan,
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
                            postAlert('فاکتور فروش')
                            context.setScan('')

                        }
                    }

                })
        }

    const putHandler2 = async () => {
        postAlertLoading()
       await axios.put(
            `${Url}/api/properties/${contractId}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: fixNumbers(formik.values.docNumber),
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
              insurancePaperFile: context.scan,
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
                            postAlert('برگ بیمه')
                            context.setScan('')

                        }
                    }

                })
        }

    const putHandler3 = async () => {
        postAlertLoading()
       await axios.put(
            `${Url}/api/properties/${contractId}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: fixNumbers(formik.values.docNumber),
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
              carCardFile: context.scan,
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
                            postAlert('کارت ماشین')
                            context.setScan('')

                        }
                    }

                })
        }

    const putHandler4 = async () => {
        postAlertLoading()
       await axios.put(
            `${Url}/api/properties/${contractId}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: fixNumbers(formik.values.docNumber),
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
              greenCardFile: context.scan,
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
                            postAlert('کارت سبز')
                            context.setScan('')

                        }
                    }

                })
        }

     const putHandler5 = async () => {
        postAlertLoading()
       await axios.put(
            `${Url}/api/properties/${contractId}/`,
              {
              typeProperty: formik.values.typeProperty,
              name: formik.values.name,
              docNumber: fixNumbers(formik.values.docNumber),
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
              gasCardFile: context.scan,
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
                            postAlert('کارت سوخت')
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

      function scanImage() {
           window.ws.send("1100");
       }

       const handleSubmit = () => {
        if (selectedFile === 'saleFactorFile'){
            return putHandler1
        }else if (selectedFile === 'insurancePaperFile'){
            return putHandler2
        }else if (selectedFile === 'carCardFile'){
            return putHandler3
        }else if (selectedFile === 'greenCardFile'){
            return putHandler4
        }else if (selectedFile === 'gasCardFile'){
            return putHandler5
        }
    }

    return (
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                     <div className='m-4'>
                        <div className="input-group mb-3">
                                <input type="text" className="form-control" value={search} onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }} placeholder="شماره سند"
                                aria-label="searchBox" aria-describedby="searchDocuments"/>
                            </div>
                             {allContract.filter(contract => contract.docNumber === fixNumbers(search) && contract.type_form === (partitionSelect === 'منقول')).map((data) => (
                                    <div className="alert alert-success" role="alert" key={data.id}>
                                        سند با شماره ثبت {data.id} یافت شد.
                                    </div>
                             ))}
                         {(() => {
                             if (allContract.filter(contract => contract.docNumber === fixNumbers(search) && contract.type_form === (partitionSelect === 'منقول')).length !== 0){
                                 return (
                                     <Fragment>
                                           <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                                                <select className="form-select" defaultValue='' id="partitionSelect" style={{maxWidth:'20vw' , minWidth:'200px'}}
                                                aria-label="Partition Select" onChange={(e) => setPartitionSelect(e.target.value)}>
                                                    <option value='' disabled>یک مورد انتخاب کنید</option>
                                                    <option value={'منقول'}>منقول</option>
                                                    <option value={'غیر منقول'}>غیر منقول</option>
                                                </select>
                                                <label htmlFor="partitionSelect">بارگذاری اسناد بخش</label>
                                         </div>
                                         <div className= 'mt-5'>
                                             <div className='row'>
                                                    <div className="input-group mb-3">
                                                        <button className="btn btn-warning" type="button" id="firstPageBtn" onClick={scanImage}>اسکن</button>
                                                        <button className="btn btn-success" type="button" id="firstPageBtn" disabled={!context.scan || context.scan.length > 5000000} onClick={handleSubmit()}>بارگذاری</button>
                                                        <select className="form-select" defaultValue='' id="checkFileBtn" onChange={e => setSelectedFile(e.target.value)}
                                                        aria-label="checkFileBtn">
                                                            <option value=''>فایل مورد نظر را انتخاب کنید</option>
                                                            <option value="saleFactorFile">فاکتور فروش</option>
                                                            <option value="insurancePaperFile">برگه بیمه</option>
                                                            <option value="carCardFile">کارت ماشین</option>
                                                            <option value="gasCardFile">کارت سوخت</option>
                                                            <option value="greenCardFile">کارت سبز</option>
                                                        </select>
                                                    </div>
                                                 </div>
                                            </div>
                                          {context.scan.length > 5000000 ?
                                                <div className="alert alert-danger my-2" role="alert">
                                                   حجم فایل بیشتر از 5 مگابایت است (در رابط اسکنر DPI را 100 قرار دهید).
                                                </div>
                                            : null}
                                        <img width={'500px'} height={'350px'} src={context.preview} alt={'تصویری اسکن نشده است'}/>
                                         </Fragment>
                                 )
                             }
                         })()}
                      </div>
                 </div>
        </Fragment>
    )
}
export default  UploadPropertyDoc