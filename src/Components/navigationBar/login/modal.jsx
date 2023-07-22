import React, {Fragment, useState} from "react";
import axios from "axios";
import Url from '../../config'

const Modal = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [found, setFound] = useState(null);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

    const submit = async e => {
         e.preventDefault();

        try {

         const user = {
            username: props.username,
            password: props.password,
          };

        const {data} = await axios.post(`${Url}/token/`, user ,{headers: {
            'Content-Type': 'application/json'
        }}, {withCredentials: true});
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        window.location.href = '/'
        setFound(true)
        }catch(e) {
            setFound(false)
        }
    }

    (function () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

  return (
      <Fragment>
     <div className="modal fade "  id="modalLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalMainLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered   " >
                    <div className="modal-content" style={{backgroundColor:'hsl(105, 100%, 92%)'}}>
                        <div className="modal-header">
                            <button type="button" className="btn-close " data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                    <form className='needs-validation' onSubmit={submit} noValidate>
                        <div className="container modal-body">
                          <div className="col input-group  mb-3 has-validation">
                              <span className="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" id="userName" autoComplete="on"
                                           name='username' value={props.username} onChange={e => props.setUsername(e.target.value)}
                                           placeholder="نام کاربری" required/>
                                    <div className="invalid-feedback">
                                        <div className="alert alert-danger" role="alert">
                                            نام کاربری را وارد کنید.
                                        </div>
                                    </div>
                          </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text material-symbols-outlined" id="addon-wrapping">lock</span>
                                <input type={passwordShown ? "text" : "password"} name='password' autoComplete="on" className="form-control" id="password"
                                    placeholder="رمز عبور" value={props.password} onChange={e => props.setPassword(e.target.value)} required/>
                                   <button className="btn btn-outline-secondary material-symbols-outlined rounded-end" type='button' onClick={togglePassword} id="button-addon1">{passwordShown ? "visibility" : "visibility_off"}
                                </button>
                                    <div className="invalid-feedback">
                                         <div className="alert alert-danger" role="alert">
                                            رمز عبور را وارد کنید.
                                        </div>
                                    </div>
                          </div>
                            {found === false?
                                <div className="alert alert-danger" role="alert">
                                     نام کاربری یا رمز عبور اشتباه است.
                                </div>
                            : null}

                              {found ?
                                <div className="alert alert-success" role="alert">
                                     وارد شدید .......
                                </div>
                            : null}


                        </div>
                        <div className="modal-footer justify-content-center">
                                <button type="submit" id='signInBtn' className="btn btn-primary mb-4 align-middle">وارد شدن</button>
                        </div>
                </form>
            </div>
        </div>
    </div>
  </Fragment>
  );
};


export default Modal