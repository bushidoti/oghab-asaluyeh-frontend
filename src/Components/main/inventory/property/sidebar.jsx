import React, {Fragment} from "react";
export const SideBar = (props) => {
    return(
        <Fragment>
            <div className="flex-shrink-0 p-3 bg-white m-4 rounded" style={{width:'280px'}} >
                <a href="/property  "
                   className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                    <span className="fs-5 fw-bold">منو</span>
                </a>
                <ul className="list-unstyled ps-0" id="autoClose">
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                data-bs-toggle="collapse" data-bs-target="#equipmentsCollapse" aria-expanded="false">
                            تجهیزات
                        </button>
                        <div className="collapse  mt-2" id="equipmentsCollapse" data-bs-parent="#autoClose">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><button  className='btn  d-flex gap-2 dropdown-item'  value='safetyEquipment' onClick={(e) => {
                                        props.setShowForm(e.target.value)
                                        props.setIsRepair('')
                                    }}>
                                    <span className="material-symbols-outlined">health_and_safety</span>
                                    تجهیزات ایمنی</button></li>
                                    <li><button className='btn  d-flex gap-2 dropdown-item' value='airportEquipment' onClick={(e) => {
                                      props.setShowForm(e.target.value)
                                           props.setIsRepair('')
                                    } }><span
                                    className="material-symbols-outlined">mode_fan</span>تجهیزات فرودگاهی</button></li>
                                </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                data-bs-toggle="collapse" data-bs-target="#vehicleCollapse" aria-expanded="false">
                            وسایل نقلیه
                        </button>
                        <div className="collapse mt-2" id="vehicleCollapse" data-bs-parent="#autoClose">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                    <li><button className='btn d-flex gap-2 dropdown-item' value='airportCar' data-bs-toggle="collapse"
                                                data-bs-target="#collapse" onClick={(e) => {
                                                    props.setShowForm(e.target.value)
                                                    props.setIsRepair('')
                                    } }><span
                                                className="material-symbols-outlined">airport_shuttle</span>خودرو فرودگاهی</button></li>

                                    <li><button className='btn d-flex gap-2 dropdown-item' value='personalCar' data-bs-toggle="collapse"
                                    data-bs-target="#collapse" onClick={(e) => {
                                       props.setShowForm(e.target.value)
                                       props.setIsRepair('')
                                    } }><span className="material-symbols-outlined">directions_car</span>
                                    خودرو اداری</button></li>

                                    <li><button className='btn d-flex gap-2 dropdown-item' value='airplane' data-bs-toggle="collapse"
                                    data-bs-target="#collapse" onClick={(e) => {
                                       props.setShowForm(e.target.value)
                                       props.setIsRepair('')
                                    } }><span className="material-symbols-outlined">travel</span>
                                    هواپیما</button></li>

                                </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                data-bs-toggle="collapse" data-bs-target="#furnitureCollapse" aria-expanded="false">
                            اثاث
                        </button>
                        <div className="collapse mt-2" id="furnitureCollapse" data-bs-parent="#autoClose">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><button className='btn d-flex  gap-2 dropdown-item' value='electronicFurniture'
                                    onClick={(e) => {
                                        props.setShowForm(e.target.value)
                                        props.setIsRepair('')
                                    }}><span className="material-symbols-outlined">ev_station</span>
                                    اثاثه الکترونیکی</button></li>
                                    <li><button className='btn d-flex  gap-2 dropdown-item' value='officeFurniture' onClick={(e) => {
                                        props.setShowForm(e.target.value)
                                        props.setIsRepair('')
                                    } }>
                                    <span className="material-symbols-outlined">desk</span>اثاثه اداری</button></li>
                                     <li><button className='btn d-flex gap-2 dropdown-item' value='furniture' onClick={(e) => {
                                         props.setShowForm(e.target.value)
                                         props.setIsRepair('')
                                     } }>
                                     <span className="material-symbols-outlined">luggage</span>اثاثه تاسیساتی</button></li>
                                    <li><button className='btn d-flex  gap-2 dropdown-item' value='airportFurniture' onClick={(e) => {
                                        props.setShowForm(e.target.value)
                                        props.setIsRepair('')
                                    } }>
                                    <span className="material-symbols-outlined">flight</span>اثاثه فرودگاهی</button></li>
                                    <li><button className='btn d-flex  gap-2 dropdown-item' value='digitalFurniture' onClick={(e) => {
                                        props.setShowForm(e.target.value)
                                        props.setIsRepair('')
                                    } }>
                                    <span className="material-symbols-outlined">devices</span>اثاثه دیجیتال</button></li>
                              </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                data-bs-toggle="collapse" data-bs-target="#propertyCollapse" aria-expanded="false">
                            اموال منقول
                        </button>
                        <div className="collapse mt-2" id="propertyCollapse" data-bs-parent="#autoClose">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><button className='btn d-flex gap-2 dropdown-item' value='industrialEquipment' onClick={(e) => {
                                    props.setShowForm(e.target.value)
                                    props.setIsRepair('')
                                }}>
                                <span className="material-symbols-outlined">construction</span>ابزار آلات غیر صنعتی</button></li>
                                <li><button className='btn d-flex  gap-2 dropdown-item' value='supportItems' onClick={(e) => {
                                    props.setShowForm(e.target.value)
                                    props.setIsRepair('')
                                }}>
                                <span className="material-symbols-outlined float-end">storage</span>اقلام پشتیبانی</button></li>
                                 <li><button className='btn d-flex gap-2 dropdown-item' value='benefits' onClick={(e) => {
                                     props.setShowForm(e.target.value)
                                     props.setIsRepair('')
                                 }}>
                                 <span className="material-symbols-outlined">deskphone</span>امتیازات</button></li>
                                <li><button className='btn d-flex gap-2 dropdown-item' value='dustrialEquipment' onClick={(e) => {
                                    props.setShowForm(e.target.value)
                                    props.setIsRepair('')
                                }}>
                                <span className="material-symbols-outlined">engineering</span>
                                ابزار آلات صنعتی</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}