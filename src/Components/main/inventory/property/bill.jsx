import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import {Link} from "react-router-dom";
import Url from "../../../config";
import {Context} from "../../../../context";
import {DownloadOutlined, PrinterOutlined} from "@ant-design/icons";
import fixNumbers from "../../persianNumbers";

const BillProperty = () => {
  const [product, setProduct] = useState([])
  const context = useContext(Context)



  const componentPDF= useRef();

  const generatePDF= useReactToPrint({
        content: ()=>componentPDF.current,
        documentTitle:"Data",
    });

  const fetchData = async () => {
        const response = await fetch(`${Url}/api/factors/?document_code=${fixNumbers(context.factor)}&systemID=${context.systemIDFactorProperty}&document_type=فاکتور&inventory=${context.office}`, {
                 headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        const data = await response.json()
        setProduct(data)
      }

   useEffect(() => {
            void fetchData()
          },
        // eslint-disable-next-line react-hooks/exhaustive-deps
       [])


   const handleOpenFile = () => {
       if (context.modalTitle === 'factor') {
           return product[0].factor || ''
       }
   }

      const onButtonClick = () => {
        fetch(`${handleOpenFile()}`).then(response => {
            response.blob().then(() => {
                let alink = document.createElement('a');
                alink.href = handleOpenFile();
                alink.download = `${FileNameHandler()}.jpg`
                alink.click();
            })
        })
    }

  const FileNameHandler = () => {
      return  `فایل فاکتور ${context.factor || context.factorNumberProperty}`
  }

    return (
      <Fragment>
                <div className="plater m-2 rounded-3 shadow-lg" >
                        <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                            <div className="modal-header mx-4">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"> {(() => {
                                        return  `شماره فاکتور ${context.factor || context.factorNumberProperty}`
                                })()}</h1>
                                <Link to= '/report-properties'>
                                <button type="button" className="btn-close "
                                aria-label="Close" onClick={() => {
                                    context.setBillCheck('')
                                    context.setModalTitle('')
                                    context.setFactor('')
                                    context.setSystemIDFactorProperty('')
                                }}></button></Link>
                            </div>
                            <div className="modal-body">
                                 <div className= 'd-flex mx-4 my-2 gap-2'>
                                <button className= 'btn btn-primary'  id='export&print' onClick={generatePDF}><PrinterOutlined /></button>
                                     <button className= 'btn btn-warning' id='export&print' onClick={onButtonClick}><DownloadOutlined /></button>
                                </div>
                                <hr className='bg-primary mx-4'/>
                                  <div className= 'mx-4 table-responsive text-nowrap rounded-3' style={{maxHeight : '50vh'}}>
                                    <table ref={componentPDF} className="table table-hover text-center table-striped align-middle table-bordered border-primary" style={{direction:'rtl' , fontSize:'1vw'}}>
                                        <thead className= 'bg-light'>
                                        <tr>
                                            <td colSpan='8'>
                                                {(() => {
                                                        return  `${context.systemIDFactorProperty ? `فاکتور با شماره ثبت رایانه ${context.systemIDFactorProperty} و شماره فاکتور ${context.factorNumberProperty || context.factorNumberProperty} در مورخه ${context.dateProperty.replaceAll('-' , '/')} ثبت شده است ` : `شماره فاکتور ${context.factor}` }`
                                                })()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col">ردیف</th>
                                            <th scope="col">کد اموال</th>
                                            <th scope="col">نام اموال</th>
                                            <th scope="col">تاریخ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                    {(product.length > 0 &&
                                    product.filter(product => product.inventory === context.office).map((data , i) => (
                                        <tr key={data.id}>
                                                <th scope="row">{i+1}</th>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.date}</td>
                                        </tr>
                                        ))) ||

                                       <tr>
                                          <td colSpan="4" className='h3'>داده ای یافت نشد .....</td>
                                       </tr>
                                    }
                                    <tr className='bg-light'>
                                         {context.modalTitle === 'factor' ?
                                             <Fragment>
                                                   <td colSpan="2">مهر و امضای خریدار</td>
                                                   <td colSpan="2">مهر و امضای گیرنده</td>
                                             </Fragment>
                                             :
                                             null
                                         }
                                    </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                </div>
            </div>
  </Fragment>
  );
};

export default BillProperty