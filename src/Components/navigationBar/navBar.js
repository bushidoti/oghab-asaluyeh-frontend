import React, {Fragment, useContext, useEffect, useState} from "react";
import {Clock} from "./clock/timer";
import {Profile} from "./login/loginBar";
import {Link, Outlet} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Context} from "../../context";
import type { MenuProps } from 'antd';
import {ConfigProvider, Dropdown, Select, Space} from 'antd';
import axios from "axios";
import Url from "../config";


const NavBar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(Context)

    const dropdown1: MenuProps['dropdown1'] = [
      {
        key: '1',
        label: 'قرارداد',
             children: [
          {
            key: '1-1',
            label: (
                context.permission !== 'مشاهده' ? <Link className='text-decoration-none'  to="/main" onClick={() => {
                        context.formik.resetForm()
                        context.setDocToggle(null)
                    }}>ثبت قرارداد</Link> : null
        ),
          },
          {
            key: '1-2',
            label: (
            <Link className='text-decoration-none' to='/report' onClick={() => {
                context.formik.resetForm()
                context.setDocToggle(null)
            }}>گزارش قراداد</Link>
        ),
          },
         {
            key: '1-3',
            label: (
                context.permission !== 'مشاهده' ? <Link className='text-decoration-none' to='/upload'>بارگزاری
            مدارک قرارداد</Link>: null
        ),
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: 'مدارک اشخاص',
           children: [
          {
            key: '2-1',
            label: (
            context.permission !== 'مشاهده' ? <Link className='text-decoration-none' to='/addIndividualsDoc'>ثبت مدارک
            اشخاص</Link> : null
        ),
          },
          {
            key: '2-2',
            label: (
            <Link className='text-decoration-none' to='/reportindividualsdoc'>گزارش
            مدارک اشخاص</Link>
        ),
          },
         {
            key: '2-3',
            label: (
            context.permission !== 'مشاهده' ? <Link className='text-decoration-none' to='/uploadindividualsdoc'>بارگزاری
            مدارک اشخاص</Link> : null
        ),
          },
        ],
      },
    ];

    const dropdown2: MenuProps['items'] = [
      {
        key: '1',
        label: (
            <Link className='text-decoration-none' to='/addpropertydoc'>ثبت اسناد
            اموال</Link>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: (
            <Link className='text-decoration-none' to='/uploadpropertydoc'>بارگزاری
        اسناد اموال</Link>
        ),
      },
        {
        key: '3',
        label: (
            <Link className='text-decoration-none' to='/reportpropertydoc'>گزارش
            اموال</Link>
        ),
      },
    ];

    const dropdown3: MenuProps['dropdown3'] = [
      {
        key: '1',
        label: 'انبار',
               children: [
          {
            key: '1-1',
            label: (
            <Link className='text-decoration-none' to='/warehouse'>ثبت</Link>
        ),
          },
          {
            key: '1-2',
            label: (
            <Link className='text-decoration-none' to='/report-products'>گزارش</Link>
        ),
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: 'اموال',
           children: [
          {
            key: '2-1',
            label: (
            <Link className='text-decoration-none' to='/property'>ثبت</Link>
        ),
          },
          {
            key: '2-2',
            label: (
            <Link className='text-decoration-none' to='/report-properties'>گزارش</Link>
        ),
          },
         {
            key: '2-3',
            label: (
            <Link className='text-decoration-none' to='/pending-products'>ارسالی</Link>
        ),
          },{
            key: '2-4',
            label: (

            context.permission === 'مدیر' ? <Link className='text-decoration-none' to='/pending-recycle'>بایگانی</Link> : null
        ),
          },
        ],
      },
         {
        type:  context.permission === 'مدیر'  ? 'divider' : null,
      },
      {
        key: '3',
        label: (
            context.permission === 'مدیر'  ? <Link className='text-decoration-none'
          to='/warehouse-handling'>انبارگردانی</Link> : null
        ),
      },
    ];

   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        context.setIsAuth(true);
      }
    }, [context, context.isAuth]);



    const handleChange = async (value: string) => {
        if (context.permission === 'مدیر'){
              await axios.put(
                `${Url}/api/employee/1/`,
                {
                    office: value,
                    department: 'مالی',
                    rank: 'مدیر',
                    user: 1,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                })
            setTimeout(
                refreshPages, 1000)
        }else if (context.permission === 'مدیر اداری'){
              await axios.put(
                `${Url}/api/employee/3/`,
                {
                    office: value,
                    department: 'اداری',
                    rank: 'مدیر اداری',
                    user: 3,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                })
            setTimeout(
                refreshPages, 1000)
        }

    };

    function refreshPages() {
        window.location.reload()
    }
    return (
        <Fragment>
          <div className='rounded-top  bg-light mt-2 w-50 ms-2 border-top border-start border-end  border-success' style={{maxWidth: 'max-content'}}><Clock/></div>
          <Navbar collapseOnSelect expand="lg" className="nav rounded-8 shadow-lg p-3 mb-5 mb-2 ms-2 me-2 border border-2 border-success" style={{backgroundColor:'hsl(209, 100%, 95%)'}}>
            <Container fluid>
              <Navbar.Brand href='/'><img src="./favicon.ico" alt="" width="50" height="50"></img></Navbar.Brand>
                <Profile isAuth={context.isAuth} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

              <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="me-auto mb-2 mb-lg-0 gap-3 ms-1">

                      <Link className='nav-link active' to='/'>خانه</Link>
                      <Link className='nav-link text-danger fw-bold'
                      to='https://s31.picofile.com/d/8467362100/068ffe3c-d362-46e1-8754-bf6d4530f643/ScanApps.zip'>دانلود رابط اسکنر</Link>

                     <ConfigProvider  direction="rtl"
                            theme={{
                              token: {
                                colorBgElevated: 'hsl(240, 100%, 95%)',
                                controlItemBgActive: 'hsl(103,100%,80%)',
                                colorSplit: 'blue',
                                fontSize: 15,
                                sizePopupArrow:20,
                                controlPaddingHorizontal:20,
                              },
                            }}
                          >
                    {context.isAuth ?
                        <Fragment>
                            {context.permission === 'مدیر' || context.permission === 'مدیر اداری' ?
                                <Fragment>
                                    <Select className='nav-link active'
                                          defaultValue="انتخاب مرکز"
                                          style={{ width: 150 }}
                                          onChange={handleChange}
                                          options={[
                                            { value: 'دفتر مرکزی', label: 'دفتر مرکزی' },
                                            { value: 'چابهار', label: 'چابهار' },
                                            { value: 'دزفول', label: 'دزفول' },
                                            { value: 'جاسک', label: 'جاسک' },
                                            { value: 'بیشه کلا', label: 'بیشه کلا' },
                                            { value: 'اورهال تهران', label: 'اورهال تهران' },
                                            { value: 'اورهال اصفهان', label: 'اورهال اصفهان' },
                                          ]}
                                        />
                                     <Link className='nav-link active' to='/admin' >پنل مدیریتی</Link>
                                     <Link className='nav-link active' to='/backup' >بکاپ</Link>

                                </Fragment>

                            : null}
                            {context.permission === 'مدیر' ||  context.permission === 'مدیر اداری'  || context.permission === 'اداری' || context.permission === 'مشاهده'?
                                <Fragment>
                                    {context.permission === 'مدیر' || context.permission === 'اداری'  || context.permission === 'مشاهده' ||  context.permission === 'مدیر اداری'  ?
                                           <Dropdown className='nav-link active' placement="bottom" arrow={{ pointAtCenter: true }} orientation="left"
                                            menu={{
                                              items:dropdown1,
                                              selectable: true,
                                            }}
                                          >
                                              <Space>
                                                مدیریت قراردادها
                                              </Space>
                                          </Dropdown>

                                    : null}

                                    {context.permission === 'مدیر' || context.permission === 'اداری' ||  context.permission === 'مدیر اداری' ?


                                        <Dropdown className='nav-link active' placement="bottom" arrow={{ pointAtCenter: true }}
                                            menu={{
                                              items:dropdown2,
                                              selectable: true,
                                            }}
                                          >
                                              <Space>
                                                مدیریت اسناد
                                              </Space>
                                          </Dropdown>

                                    : null}
                            </Fragment>
                             : null}
                            {context.permission === 'انباردار' || context.permission === 'مدیر'?

                                <Dropdown className='nav-link active' placement="bottom" arrow={{ pointAtCenter: true }}
                                            menu={{
                                              items:dropdown3,
                                              selectable: true,
                                            }}
                                          >
                                              <Space>
                                                انبارداری
                                              </Space>
                                          </Dropdown>

                            : null}
                        </Fragment>
                        :
                        null
                    }
                     </ConfigProvider>


                  <li className="nav-item">
                      <Link className='nav-link' to='contactus'>پشتیبانی</Link>
                  </li>

                </Nav>

                  {/*<span className="btn position-relative material-symbols-outlined">
                      <i className="fas fa-bell fa-2x"></i>
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{top:'8px' , right:'10px'}}>
                                 1
                    <span className="visually-hidden">New alerts</span>
                  </span>
                  </span> */}

              </Navbar.Collapse>

            </Container>
          </Navbar>
                  <Outlet/>

        </Fragment>

    )
}
export default NavBar