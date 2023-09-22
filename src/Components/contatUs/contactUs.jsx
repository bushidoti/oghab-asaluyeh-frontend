import React from "react";
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
import {Helmet, HelmetProvider} from "react-helmet-async";
const SERVICE_ID = "service_cu99qpv";
const TEMPLATE_ID = "template_27khoqf";
const USER_ID = "fzWdo3mvBl-JiKkz2";

export const ContactUS =  () => {

    const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'پیغام شما با موفقیت ارسال شد'
        })
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    e.target.reset()
  };
    return (
        <HelmetProvider>
               <Helmet>
                    <title>پشتیبانی</title>
                    <meta name='description' content='پشتیبان سامانه مدیریتی شرکت فرودگاهی عقاب عسلویه' />
                </Helmet>
            <div className='justify-content-center row m-3'>
                     <div className= 'div-contact shadow-lg col' style={{backgroundColor:'hsl(0, 0%, 90%)' , borderRadius:'10px'}}>
                      <form onSubmit={handleOnSubmit}>
                         <div className='m-4'>
                         <div className='d-flex gap-4'>
                              <div className="col-5 form-floating mb-3">
                                    <input type="text" className="form-control" autoComplete='on' id='form-input-control-last-name' name='name'
                                           placeholder="رضا احمدآبادی" required/>
                                        <label htmlFor="form-input-control-last-name">نام کامل</label>
                                     <div className="invalid-feedback">
                                         نام کامل را وارد کنید.
                                     </div>
                                </div>
                               <div className="col form-floating mb-3">
                                    <input type="text" className="form-control" autoComplete='on' id='email' name='email'
                                           placeholder="name@example.com" required/>
                                        <label htmlFor="email">آدرس ایمیل</label>
                                     <div className="invalid-feedback">
                                         آدرس ایمیل را وارد کنید.
                                     </div>
                                </div>
                             </div>
                              <div className="col form-floating mb-3">
                                    <input type="text" className="form-control" id="topic" name='topic'
                                           placeholder="عدم ثبت قرارداد" required/>
                                        <label htmlFor="topic">موضوع</label>
                                     <div className="invalid-feedback">
                                         موضوع را وارد کنید.
                                     </div>
                                </div>
                             <div className="col form-floating mb-3">
                                    <textarea className="form-control h-50" name='message' id='message'
                                    placeholder="......." required/>
                                        <label htmlFor="message">توضیحات</label>
                                     <div className="invalid-feedback">
                                         توضیحات را وارد کنید.
                                     </div>
                                </div>

                                 <button type="submit" id='sendMessageBtn' className="btn  btn-success mt-2">ارسال پیغام</button>
                              <hr className='bg-primary my-5'/>
                             <div className='d-flex'>

                             <div className="d-flex align-items-center m-4">
                                     <span className="material-symbols-outlined">call</span><a className=' text-decoration-none link-dark ms-2' href="tel://09123389256">09123389256</a>
                             </div>
                             <div className="d-flex align-items-center m-4">
                                     <span className="material-symbols-outlined">mail</span><a className=' text-decoration-none link-dark ms-2' href="mailto:titanxl79@gmail.com">titanxl79@gmail.com</a>
                             </div>
                             </div>
                     </div>
                  </form>

                 </div>
            </div>
        </HelmetProvider>
    )
}