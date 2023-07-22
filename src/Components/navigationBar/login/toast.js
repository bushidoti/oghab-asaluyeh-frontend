import React, {useEffect, useState} from 'react';
import Toast from 'react-bootstrap/Toast';
import axios from "axios";
import Url from '../../config'

function ToastLogin(props) {
  const [showA, setShowA] = useState(true);
  const [fullName, setFullName] = useState('');
  const [office, setOffice] = useState('');

    useEffect(() => {
            (async () => {
                const {data} = await (await axios.get(`${Url}/name/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              }));
              setFullName(data.message);
        })()
    }, []);

      useEffect(() => {
            (async () => {

                const {data} = await (await axios.get(`${Url}/home/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              }));
              setOffice(data.message);
        })()
    }, []);

  const toggleShowA = () => setShowA(!showA);
  return (
        <Toast className='toast end-1 position-fixed m-2  align-items-center text-white bg-success border-0' style={{bottom: '75px'}} show={showA} autohide={true} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">با موفقیت وارد شدید</strong>
          </Toast.Header>
          <Toast.Body>خوش آمدید {fullName + ' ' + office} !</Toast.Body>
        </Toast>
  )
}

export default ToastLogin;