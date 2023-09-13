import React, {Fragment, useContext, useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import Url from "../../../config";
import {Context} from "../../../../context";
import Swal from "sweetalert2";
import fixNumbers from "../../persianNumbers";

const UploadIndividualsDoc = () => {
    const [typeDocument , setTypeDocument] = useState('')
    const [search , setSearch] = useState('')
    const [contract, setContracts] = useState([])
    const [allContract, setAllContract] = useState([])
    const [selectedFile, setSelectedFile] = useState('')

    const [contractId, setContractId] = useState('')
    const context = useContext(Context)
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
        if (contractId){
            const response = await fetch(`${Url}/api/persons/${contractId}/?fields=id,type,full_name,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
            const data = await response.json()
            setContracts(data)
        }

      }

    const fetchData = async () => {
        const response = await fetch(`${Url}/api/persons/?fields=id,type,full_name,date,national_id,sex,office,job,approvedPrice,commitmentPrice,typeBail,firstBail,secondBail,clearedStatus,clearedDate,receivedDocument` , {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              })
        const data = await response.json()
        setAllContract(data)
      }

    const handleId = (e) => {
            allContract.filter(contract => contract.national_id === fixNumbers(e.target.value)).map((data) => (
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
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          Birth_certificate1: context.scan,
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
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          Birth_certificate2: context.scan,
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
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          Birth_certificate3: context.scan,
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
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          Birth_certificate4: context.scan,
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
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          back_card: context.scan,
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
                            postAlert('پشت کارت')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler6 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          front_card: context.scan,
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
                            postAlert('روی کارت')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler7 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          bail: context.scan,
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
                            postAlert('ضمانت')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler8 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          retired: context.scan,
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
                            postAlert('حکم بازنشستگی')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler9 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          retired_card: context.scan,
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
                            postAlert('کارت بازنشستگی')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler10 = async () => {
                postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          driveLicense: context.scan,
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
                            postAlert('گواهینامه')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler11 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          certificateMedic: context.scan,
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
                            postAlert('گواهی پزشکی')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler12 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          police: context.scan,
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
                            postAlert('گواهی پلیس')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler13 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          insurance: context.scan,
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
                            postAlert('گواهی بیمه')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler14 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          degreeEducation: context.scan,
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
                            postAlert('مدرک تحصیلی')
                            context.setScan('')

                        }
                    }

                })
        }

     const putHandler15 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          personalPhoto: context.scan,
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
                            postAlert('عکس پرسنلی')
                            context.setScan('')

                        }
                    }

                })
        }

       const putHandler16 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          certificateSecurity: context.scan,
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
                            postAlert('گواهی حفاظتی')
                            context.setScan('')

                        }
                    }

                })
        }

         const putHandler17 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          retired_insurance: context.scan,
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
                            postAlert('دفترچه بیمه بازنشستگی')
                            context.setScan('')

                        }
                    }

                })
        }

       const putHandler18 = async () => {
            postAlertLoading()
            await axios.put(
                `${Url}/api/persons/${contractId}/`,
                  {
                          id: formik.values.id,
                          type: formik.values.type,
                          full_name: formik.values.full_name,
                          date: formik.values.date,
                          national_id: fixNumbers(formik.values.national_id),
                          sex: formik.values.sex,
                          office: formik.values.office,
                          job: formik.values.job,
                          approvedPrice: formik.values.approvedPrice,
                          commitmentPrice: formik.values.commitmentPrice,
                          typeBail: formik.values.typeBail,
                          firstBail: formik.values.firstBail,
                          secondBail: formik.values.secondBail,
                          affidavitDoc: context.scan,
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
                            postAlert('دفترچه بیمه بازنشستگی')
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



    const handleSubmit = () => {
        if (selectedFile === 'Birth_certificate1'){
            return putHandler1
        }else if (selectedFile === 'Birth_certificate2'){
            return putHandler2
        }else if (selectedFile === 'Birth_certificate3'){
            return putHandler3
        }else if (selectedFile === 'Birth_certificate4'){
            return putHandler4
        }else if (selectedFile === 'back_card'){
            return putHandler5
        }else if (selectedFile === 'front_card'){
            return putHandler6
        }else if (selectedFile === 'bail'){
            return putHandler7
        }else if (selectedFile === 'retired'){
            return putHandler8
        }else if (selectedFile === 'retired_card'){
            return putHandler9
        }else if (selectedFile === 'driveLicense'){
            return putHandler10
        }else if (selectedFile === 'certificateMedic'){
            return putHandler11
        }else if (selectedFile === 'police'){
            return putHandler12
        }else if (selectedFile === 'insurance'){
            return putHandler13
        }else if (selectedFile === 'degreeEducation'){
            return putHandler14
        }else if (selectedFile === 'personalPhoto'){
            return putHandler15
        }else if (selectedFile === 'certificateSecurity'){
            return putHandler16
        }else if (selectedFile === 'retired_insurance'){
            return putHandler17
        }else if (selectedFile === 'affidavitDoc'){
            return putHandler18
        }
    }

  function scanImage() {
           window.ws.send("1100");
       }

    return (
        <Fragment>
            <div className= 'plater  m-2 rounded-3 shadow-lg '>
                       <div className='m-4'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="کد ملی" value={search} onChange={e => {
                                    setSearch(e.target.value)
                                     handleId(e)
                                }}
                                aria-label="searchBoxNationalId" aria-describedby="searchDocuments"/>
                                <button className="btn btn-outline-success material-symbols-outlined" type="button" id="searchNationalIdBtn">search</button>
                            </div>
                            {allContract.filter(contract => contract.national_id === fixNumbers(search)).map((data) => (
                                <div className="alert alert-success" role="alert" key={data.id}>
                                    قرارداد با شماره ثبت {data.id} یافت شد.
                                </div>
                            ))}
                           {(() => {
                               if (allContract.filter(contract => contract.national_id === fixNumbers(search)).length !== 0){
                                   return (
                                       <Fragment>
                                        <div className="form-floating m-4" style={{maxWidth:'255px'}}>
                                            <select className="form-select" id="typeDocumentSelector" defaultValue='' style={{maxWidth:'20vw' , minWidth:'200px'}}
                                            aria-label="Floating label select example" onChange={(e) => setTypeDocument(e.target.value)}>
                                                <option value='' disabled>یک مورد انتخاب کنید</option>
                                                <option value="شناسنامه">شناسنامه</option>
                                                <option value="عکس پرسنلی">عکس پرسنلی</option>
                                                <option value="مدرک تحصیلی">مدرک تحصیلی</option>
                                                <option value="کارت ملی">کارت ملی</option>
                                                <option value="تضمین">تضمین</option>
                                                <option value="گواهی">گواهی</option>
                                                <option value="بازنشستگی">بازنشستگی</option>
                                                <option value="اقرارنامه">اقرارنامه</option>
                                            </select>
                                            <label htmlFor="typeDocumentSelector">نوع مدارک</label>
                                        </div>
                                       <div className= 'mt-5'>
                                              <div className='row'>
                                                    <div className="input-group mb-3">
                                                        <button className="btn btn-warning" type="button" id="firstPageBtn" onClick={scanImage}>اسکن</button>
                                                        <button className="btn btn-success" type="button" id="firstPageBtn" disabled={!context.scan || context.scan.length > 5000000} onClick={handleSubmit()}>بارگذاری</button>
                                                        <select className="form-select" defaultValue='' id="checkFileBtn" onChange={e => setSelectedFile(e.target.value)}
                                                        aria-label="checkFileBtn">
                                                            <option value=''>مدرک مورد نظر را که میخواهید اسکن کنید انتخاب کنید</option>
                                                            {(() => {
                                                                if (typeDocument === 'شناسنامه'){
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="Birth_certificate1">صفحه اول</option>
                                                                            <option value="Birth_certificate2">صفحه دوم</option>
                                                                            <option value="Birth_certificate3">صفحه سوم</option>
                                                                            <option value="Birth_certificate4">صفحه چهارم</option>
                                                                        </Fragment>
                                                                    )
                                                                }else if (typeDocument === 'کارت ملی') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="back_card">پشت</option>
                                                                            <option value="front_card">رو</option>
                                                                        </Fragment>
                                                                    )
                                                                }else if (typeDocument === 'تضمین') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="bail">ضمانت اول</option>
                                                                        </Fragment>
                                                                    )
                                                                }else if (typeDocument === 'بازنشستگی') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="retired">حکم بازنشستگی</option>
                                                                            <option value="retired_card">کارت بازنشستگی</option>
                                                                            <option value="retired_insurance">دفترچه بیمه بازنشستگی</option>
                                                                        </Fragment>
                                                                    )
                                                                }else if (typeDocument === 'گواهی') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="driveLicense">گواهینامه</option>
                                                                            <option value="certificateMedic">گواهی پزشکی</option>
                                                                            <option value="certificateSecurity">گواهی حفاظتی</option>
                                                                            <option value="police">گواهی پلیس</option>
                                                                            <option value="insurance">گواهی بیمه</option>
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
                                                                }else if (typeDocument === 'اقرارنامه') {
                                                                    return (
                                                                        <Fragment>
                                                                            <option value="affidavitDoc">اقرارنامه</option>
                                                                        </Fragment>
                                                                    )
                                                                }
                                                            })()}
                                                        </select>
                                                    </div>
                                                 </div>
                                        </div>
                                            {context.scan.length > 5000000 ?
                                            <div className="alert alert-danger my-2" role="alert">
                                               حجم فایل بیشتر از 5 مگابایت است (در رابط اسکنر DPI را 100 قرار دهید).
                                            </div>
                                        : null}
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

export default  UploadIndividualsDoc