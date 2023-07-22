import React, {Fragment, useEffect, useState} from "react";

import {useFormik} from "formik";
import Url from "../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const AgreementMove = (props) => {
  const [property, setProperty] = useState([])
  const [autoIncrement, setAutoIncrement] = useState([])
  let today = new Date().toLocaleDateString('fa-IR');

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
          year_made: property.year_made || null,
          owner: property.owner || '',
          plate1: property.plate1 || '',
          using_location: property.using_location || '',
          plate2: property.plate2 || '',
          plate3: property.plate3 || '',
          plate4: property.plate4 || '',
          motor: property.motor || '',
          chassis: property.chassis || '',
          year_buy: property.year_buy || null,
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
          message: property.message || '',
          sign_received: property.sign_received || '',

        },
        enableReinitialize: true,
        });

     const fetchDataAutoIncrement = async () => {
        const response = await fetch(`${Url}/api/autoincrementproperty/1`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setAutoIncrement(data)
      }

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
              sign_received: formik.values.sign_received,
              movement_status: 'received',
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        setTimeout(
                    refreshPages, 3000)
        }

     const putHandlerAutoIncrement = async () => {
        if (props.typeProperty === 'airportequipment') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              airport_equipment_01: props.office === 'دفتر مرکزی' ? autoIncrement.airport_equipment_01+1 : autoIncrement.airport_equipment_01,
              airport_equipment_02: props.office === 'چابهار' ? autoIncrement.airport_equipment_02+1 : autoIncrement.airport_equipment_02,
              airport_equipment_03: props.office === 'دزفول' ? autoIncrement.airport_equipment_03+1 : autoIncrement.airport_equipment_03,
              airport_equipment_04: props.office === 'جاسک' ? autoIncrement.airport_equipment_04+1 : autoIncrement.airport_equipment_04,
              airport_equipment_05: props.office === 'بیشه کلا' ? autoIncrement.airport_equipment_05+1 : autoIncrement.airport_equipment_05,
              airport_equipment_06: props.office === 'اورهال تهران' ? autoIncrement.airport_equipment_06+1 : autoIncrement.airport_equipment_06,
              airport_equipment_07: props.office === 'اورهال اصفهان' ? autoIncrement.airport_equipment_07+1 : autoIncrement.airport_equipment_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'safetyequipment') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              safety_equipment_01: props.office === 'دفتر مرکزی' ? autoIncrement.safety_equipment_01+1 : autoIncrement.safety_equipment_01,
              safety_equipment_02: props.office === 'چابهار' ? autoIncrement.safety_equipment_02+1 : autoIncrement.safety_equipment_02,
              safety_equipment_03: props.office === 'دزفول' ? autoIncrement.safety_equipment_03+1 : autoIncrement.safety_equipment_03,
              safety_equipment_04: props.office === 'جاسک' ? autoIncrement.safety_equipment_04+1 : autoIncrement.safety_equipment_04,
              safety_equipment_05: props.office === 'بیشه کلا' ? autoIncrement.safety_equipment_05+1 : autoIncrement.safety_equipment_05,
              safety_equipment_06: props.office === 'اورهال تهران' ? autoIncrement.safety_equipment_06+1 : autoIncrement.safety_equipment_06,
              safety_equipment_07: props.office === 'اورهال اصفهان' ? autoIncrement.safety_equipment_07+1 : autoIncrement.safety_equipment_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'electronicfurniture') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              electronic_furniture_01: props.office === 'دفتر مرکزی' ? autoIncrement.electronic_furniture_01+1 : autoIncrement.electronic_furniture_01,
              electronic_furniture_02: props.office === 'چابهار' ? autoIncrement.electronic_furniture_02+1 : autoIncrement.electronic_furniture_02,
              electronic_furniture_03: props.office === 'دزفول' ? autoIncrement.electronic_furniture_03+1 : autoIncrement.electronic_furniture_03,
              electronic_furniture_04: props.office === 'جاسک' ? autoIncrement.electronic_furniture_04+1 : autoIncrement.electronic_furniture_04,
              electronic_furniture_05: props.office === 'بیشه کلا' ? autoIncrement.electronic_furniture_05+1 : autoIncrement.electronic_furniture_05,
              electronic_furniture_06: props.office === 'اورهال تهران' ? autoIncrement.electronic_furniture_06+1 : autoIncrement.electronic_furniture_06,
              electronic_furniture_07: props.office === 'اورهال اصفهان' ? autoIncrement.electronic_furniture_07+1 : autoIncrement.electronic_furniture_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'officefurniture') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              office_furniture_01: props.office === 'دفتر مرکزی' ? autoIncrement.office_furniture_01+1 : autoIncrement.office_furniture_01,
              office_furniture_02: props.office === 'چابهار' ? autoIncrement.office_furniture_02+1 : autoIncrement.office_furniture_02,
              office_furniture_03: props.office === 'دزفول' ? autoIncrement.office_furniture_03+1 : autoIncrement.office_furniture_03,
              office_furniture_04: props.office === 'جاسک' ? autoIncrement.office_furniture_04+1 : autoIncrement.office_furniture_04,
              office_furniture_05: props.office === 'بیشه کلا' ? autoIncrement.office_furniture_05+1 : autoIncrement.office_furniture_05,
              office_furniture_06: props.office === 'اورهال تهران' ? autoIncrement.office_furniture_06+1 : autoIncrement.office_furniture_06,
              office_furniture_07: props.office === 'اورهال اصفهان' ? autoIncrement.office_furniture_07+1 : autoIncrement.office_furniture_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'facilityfurniture') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              facility_furniture_01: props.office === 'دفتر مرکزی' ? autoIncrement.facility_furniture_01+1 : autoIncrement.facility_furniture_01,
              facility_furniture_02: props.office === 'چابهار' ? autoIncrement.facility_furniture_02+1 : autoIncrement.facility_furniture_02,
              facility_furniture_03: props.office === 'دزفول' ? autoIncrement.facility_furniture_03+1 : autoIncrement.facility_furniture_03,
              facility_furniture_04: props.office === 'جاسک' ? autoIncrement.facility_furniture_04+1 : autoIncrement.facility_furniture_04,
              facility_furniture_05: props.office === 'بیشه کلا' ? autoIncrement.facility_furniture_05+1 : autoIncrement.facility_furniture_05,
              facility_furniture_06: props.office === 'اورهال تهران' ? autoIncrement.facility_furniture_06+1 : autoIncrement.facility_furniture_06,
              facility_furniture_07: props.office === 'اورهال اصفهان' ? autoIncrement.facility_furniture_07+1 : autoIncrement.facility_furniture_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'airportfurniture') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              airport_furniture_01: props.office === 'دفتر مرکزی' ? autoIncrement.airport_furniture_01+1 : autoIncrement.airport_furniture_01,
              airport_furniture_02: props.office === 'چابهار' ? autoIncrement.airport_furniture_02+1 : autoIncrement.airport_furniture_02,
              airport_furniture_03: props.office === 'دزفول' ? autoIncrement.airport_furniture_03+1 : autoIncrement.airport_furniture_03,
              airport_furniture_04: props.office === 'جاسک' ? autoIncrement.airport_furniture_04+1 : autoIncrement.airport_furniture_04,
              airport_furniture_05: props.office === 'بیشه کلا' ? autoIncrement.airport_furniture_05+1 : autoIncrement.airport_furniture_05,
              airport_furniture_06: props.office === 'اورهال تهران' ? autoIncrement.airport_furniture_06+1 : autoIncrement.airport_furniture_06,
              airport_furniture_07: props.office === 'اورهال اصفهان' ? autoIncrement.airport_furniture_07+1 : autoIncrement.airport_furniture_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'digitalfurniture') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              digital_furniture_01: props.office === 'دفتر مرکزی' ? autoIncrement.digital_furniture_01+1 : autoIncrement.digital_furniture_01,
              digital_furniture_02: props.office === 'چابهار' ? autoIncrement.digital_furniture_02+1 : autoIncrement.digital_furniture_02,
              digital_furniture_03: props.office === 'دزفول' ? autoIncrement.digital_furniture_03+1 : autoIncrement.digital_furniture_03,
              digital_furniture_04: props.office === 'جاسک' ? autoIncrement.digital_furniture_04+1 : autoIncrement.digital_furniture_04,
              digital_furniture_05: props.office === 'بیشه کلا' ? autoIncrement.digital_furniture_05+1 : autoIncrement.digital_furniture_05,
              digital_furniture_06: props.office === 'اورهال تهران' ? autoIncrement.digital_furniture_06+1 : autoIncrement.digital_furniture_06,
              digital_furniture_07: props.office === 'اورهال اصفهان' ? autoIncrement.digital_furniture_07+1 : autoIncrement.digital_furniture_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'airportvehicle') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              airport_vehicle_01: props.office === 'دفتر مرکزی' ? autoIncrement.airport_vehicle_01+1 : autoIncrement.airport_vehicle_01,
              airport_vehicle_02: props.office === 'چابهار' ? autoIncrement.airport_vehicle_02+1 : autoIncrement.airport_vehicle_02,
              airport_vehicle_03: props.office === 'دزفول' ? autoIncrement.airport_vehicle_03+1 : autoIncrement.airport_vehicle_03,
              airport_vehicle_04: props.office === 'جاسک' ? autoIncrement.airport_vehicle_04+1 : autoIncrement.airport_vehicle_04,
              airport_vehicle_05: props.office === 'بیشه کلا' ? autoIncrement.airport_vehicle_05+1 : autoIncrement.airport_vehicle_05,
              airport_vehicle_06: props.office === 'اورهال تهران' ? autoIncrement.airport_vehicle_06+1 : autoIncrement.airport_vehicle_06,
              airport_vehicle_07: props.office === 'اورهال اصفهان' ? autoIncrement.airport_vehicle_07+1 : autoIncrement.airport_vehicle_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'officevehicle') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              office_vehicle_01: props.office === 'دفتر مرکزی' ? autoIncrement.office_vehicle_01+1 : autoIncrement.office_vehicle_01,
              office_vehicle_02: props.office === 'چابهار' ? autoIncrement.office_vehicle_02+1 : autoIncrement.office_vehicle_02,
              office_vehicle_03: props.office === 'دزفول' ? autoIncrement.office_vehicle_03+1 : autoIncrement.office_vehicle_03,
              office_vehicle_04: props.office === 'جاسک' ? autoIncrement.office_vehicle_04+1 : autoIncrement.office_vehicle_04,
              office_vehicle_05: props.office === 'بیشه کلا' ? autoIncrement.office_vehicle_05+1 : autoIncrement.office_vehicle_05,
              office_vehicle_06: props.office === 'اورهال تهران' ? autoIncrement.office_vehicle_06+1 : autoIncrement.office_vehicle_06,
              office_vehicle_07: props.office === 'اورهال اصفهان' ? autoIncrement.office_vehicle_07+1 : autoIncrement.office_vehicle_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'noneindustrialtool') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              none_industrial_tools_01: props.office === 'دفتر مرکزی' ? autoIncrement.none_industrial_tools_01+1 : autoIncrement.none_industrial_tools_01,
              none_industrial_tools_02: props.office === 'چابهار' ? autoIncrement.none_industrial_tools_02+1 : autoIncrement.none_industrial_tools_02,
              none_industrial_tools_03: props.office === 'دزفول' ? autoIncrement.none_industrial_tools_03+1 : autoIncrement.none_industrial_tools_03,
              none_industrial_tools_04: props.office === 'جاسک' ? autoIncrement.none_industrial_tools_04+1 : autoIncrement.none_industrial_tools_04,
              none_industrial_tools_05: props.office === 'بیشه کلا' ? autoIncrement.none_industrial_tools_05+1 : autoIncrement.none_industrial_tools_05,
              none_industrial_tools_06: props.office === 'اورهال تهران' ? autoIncrement.none_industrial_tools_06+1 : autoIncrement.none_industrial_tools_06,
              none_industrial_tools_07: props.office === 'اورهال اصفهان' ? autoIncrement.none_industrial_tools_07+1 : autoIncrement.none_industrial_tools_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'industrialtool') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              industrial_tools_01: props.office === 'دفتر مرکزی' ? autoIncrement.industrial_tools_01+1 : autoIncrement.industrial_tools_01,
              industrial_tools_02: props.office === 'چابهار' ? autoIncrement.industrial_tools_02+1 : autoIncrement.industrial_tools_02,
              industrial_tools_03: props.office === 'دزفول' ? autoIncrement.industrial_tools_03+1 : autoIncrement.industrial_tools_03,
              industrial_tools_04: props.office === 'جاسک' ? autoIncrement.industrial_tools_04+1 : autoIncrement.industrial_tools_04,
              industrial_tools_05: props.office === 'بیشه کلا' ? autoIncrement.industrial_tools_05+1 : autoIncrement.industrial_tools_05,
              industrial_tools_06: props.office === 'اورهال تهران' ? autoIncrement.industrial_tools_06+1 : autoIncrement.industrial_tools_06,
              industrial_tools_07: props.office === 'اورهال اصفهان' ? autoIncrement.industrial_tools_07+1 : autoIncrement.industrial_tools_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}else if (props.typeProperty === 'supportitem') {
           await axios.put(
            `${Url}/api/autoincrementproperty/1/`,
              {
              support_item_01: props.office === 'دفتر مرکزی' ? autoIncrement.support_item_01+1 : autoIncrement.support_item_01,
              support_item_02: props.office === 'چابهار' ? autoIncrement.support_item_02+1 : autoIncrement.support_item_02,
              support_item_03: props.office === 'دزفول' ? autoIncrement.support_item_03+1 : autoIncrement.support_item_03,
              support_item_04: props.office === 'جاسک' ? autoIncrement.support_item_04+1 : autoIncrement.support_item_04,
              support_item_05: props.office === 'بیشه کلا' ? autoIncrement.support_item_05+1 : autoIncrement.support_item_05,
              support_item_06: props.office === 'اورهال تهران' ? autoIncrement.support_item_06+1 : autoIncrement.support_item_06,
              support_item_07: props.office === 'اورهال اصفهان' ? autoIncrement.support_item_07+1 : autoIncrement.electronic_furniture_07,
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })}

        }

    const postHandler = async () => {
           await axios.post(
            `${Url}/api/${props.typeProperty}/`,
              {
              code: handleAutoIncrement(),
              name: formik.values.name,
              inventory: props.office,
              install_location: formik.values.install_location,
              user: formik.values.user,
              use_for: formik.values.use_for,
              description: formik.values.description,
              type_register: formik.values.type_register,
              model: formik.values.model,
              year_made: formik.values.year_made,
              owner: formik.values.owner,
              plate1: formik.values.plate1,
              using_location: formik.values.using_location,
              plate2: formik.values.plate2,
              plate3: formik.values.plate3,
              plate4: formik.values.plate4,
              motor: formik.values.motor,
              chassis: formik.values.chassis,
              year_buy: formik.values.year_buy,
              phone_feature: formik.values.phone_feature,
              cpu: formik.values.cpu,
              motherboard: formik.values.motherboard,
              ram: formik.values.ram,
              power: formik.values.power,
              hdd: formik.values.hdd,
              case: formik.values.case,
              type_furniture: formik.values.type_furniture,
              type_item: formik.values.type_item,
              number_type: formik.values.number_type,
              number: formik.values.number,
              date: today.replaceAll('/' , '-'),
         }, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
           setTimeout(
                    refreshPages, 3000)
        }

     const handleAutoIncrement = () => {
         if (props.typeProperty === 'safetyequipment') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.safety_equipment_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.safety_equipment_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.safety_equipment_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.safety_equipment_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.safety_equipment_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.safety_equipment_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.safety_equipment_07
             }
         }else if (props.typeProperty === 'airportequipment') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.airport_equipment_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.airport_equipment_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.airport_equipment_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.airport_equipment_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.airport_equipment_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.airport_equipment_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.airport_equipment_07
             }
         }else if (props.typeProperty === 'electronicfurniture') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.electronic_furniture_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.electronic_furniture_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.electronic_furniture_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.electronic_furniture_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.electronic_furniture_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.electronic_furniture_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.electronic_furniture_07
             }
         }else if (props.typeProperty === 'officefurniture') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.office_furniture_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.office_furniture_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.office_furniture_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.office_furniture_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.office_furniture_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.office_furniture_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.office_furniture_07
             }
         }else if (props.typeProperty === 'facilityfurniture') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.facility_furniture_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.facility_furniture_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.facility_furniture_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.facility_furniture_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.facility_furniture_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.facility_furniture_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.facility_furniture_07
             }
         }else if (props.typeProperty === 'airportfurniture') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.airport_furniture_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.airport_furniture_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.airport_furniture_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.airport_furniture_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.airport_furniture_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.airport_furniture_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.airport_furniture_07
             }
         }else if (props.typeProperty === 'digitalfurniture') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.digital_furniture_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.digital_furniture_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.digital_furniture_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.digital_furniture_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.digital_furniture_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.digital_furniture_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.digital_furniture_07
             }
         }else if (props.typeProperty === 'airportvehicle') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.airport_vehicle_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.airport_vehicle_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.airport_vehicle_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.airport_vehicle_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.airport_vehicle_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.airport_vehicle_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.airport_vehicle_07
             }
         }else if (props.typeProperty === 'officevehicle') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.office_vehicle_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.office_vehicle_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.office_vehicle_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.office_vehicle_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.office_vehicle_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.office_vehicle_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.office_vehicle_07
             }
         }else if (props.typeProperty === 'noneindustrialtool') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.none_industrial_tools_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.none_industrial_tools_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.none_industrial_tools_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.none_industrial_tools_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.none_industrial_tools_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.none_industrial_tools_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.none_industrial_tools_07
             }
         }else if (props.typeProperty === 'industrialtool') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.industrial_tools_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.industrial_tools_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.industrial_tools_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.industrial_tools_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.industrial_tools_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.industrial_tools_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.industrial_tools_07
             }
         }else if (props.typeProperty === 'supportitem') {
             if (props.office === 'دفتر مرکزی') {
                 return autoIncrement.support_item_01
             } else if (props.office === 'چابهار') {
                 return autoIncrement.support_item_02
             } else if (props.office === 'دزفول') {
                 return autoIncrement.support_item_03
             } else if (props.office === 'جاسک') {
                 return autoIncrement.support_item_04
             } else if (props.office === 'بیشه کلا') {
                 return autoIncrement.support_item_05
             } else if (props.office === 'اورهال تهران') {
                 return autoIncrement.support_item_06
             } else if (props.office === 'اورهال اصفهان') {
                 return autoIncrement.support_item_07
             }
         }
    }

     const agreeAlert = () => {
          Swal.fire({
              title: 'مطمئنید?',
              text: `آیا از این جا به جایی مطمئنید ؟`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'انصراف',
              confirmButtonText: 'بله, جا به جا کن!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'جا به جا شد!',
                  'اموال جا به جا شد.',
                  'success',
                  'ok',
                  putHandler(),
                  postHandler(),
                  putHandlerAutoIncrement(),
                )
              }
            })
      }

     useEffect(() => {
            void fetchData()
            void fetchDataAutoIncrement()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [props.typeProperty, formik.values , props.idNumber])

     function refreshPages() {
        window.location.reload()
    }

  return (
      <Fragment>
             <div className="modal fade " data-bs-backdrop="static" data-bs-keyboard="false" id="agreementModal" tabIndex="-1" aria-labelledby="moveModalLabel"
             aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  modal-lg " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">جا به جایی</h1>
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
                                <input type="text" id="register_code" className="w-25 form-control" aria-label="register_code"
                                aria-describedby="register_code" value={formik.values.code} disabled required/>
                                <label  htmlFor="register_code">کد ثبت</label>
                            </div>
                       <div className='d-flex gap-2'>
                              <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="src_inventory" name='src_inventory' disabled
                                               placeholder="ساختمان" value={formik.values.inventory} required/>
                                            <label htmlFor="src_inventory">انبار مبدا</label>
                                         <div className="invalid-feedback">
                                             انبار مبدا را وارد کنید.
                                         </div>
                                 </div>
                                 <div className="col form-floating mb-3">
                                        <input type="text" className="form-control" id="dst_inventory" name='dst_inventory' disabled
                                               placeholder="ساختمان" value={formik.values.dst_inventory} required/>
                                            <label htmlFor="dst_inventory">انبار مقصد</label>
                                         <div className="invalid-feedback">
                                             انبار مقصد را وارد کنید.
                                         </div>
                                 </div>
                        </div>
                                <div className="col form-floating mb-3">
                                    <textarea className="form-control" id="message" name='message' disabled value={formik.values.message}
                                    placeholder="...." required/>
                                    <label htmlFor="message">پیغام</label>
                                    <div className="invalid-feedback">
                                     پیغام را وارد کنید.
                                    </div>
                                </div>

                            <div className="col form-floating">
                                    <textarea className="form-control mb-2" id="sign_received" name='sign_received' onChange={formik.handleChange}
                                    placeholder="...." required/>
                                    <label htmlFor="sign_received">متن تایید</label>
                                    <div className="invalid-feedback">
                                     متن تایید را وارد کنید.
                                    </div>
                                     <div className="alert alert-danger" role="alert">
                                            *
                                            این متن را در قسمت متن تاییدیه بنویسید : دریافت و به اموال این مرکز اضافه گردید. <br/>
                                            دریافت کننده : ....
                                     </div>
                            </div>

                        </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><CloseOutlined /></button>
                            <button type="button" className="btn btn-success" onClick={agreeAlert}><CheckOutlined /></button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
          </Fragment>
  );
};

export default AgreementMove