import {useEffect} from "react";
import axios from "axios";
import Url from '../../config'

export const Logout = () => {

     const prom = async  () => {
          window.location.href = '/'

    }

    const func = async () => {
         await prom().then(res => {
              try { axios.post(`${Url}/logout/`,{
                    refresh_token:localStorage.getItem('refresh_token')
                } ,{headers: {
                    'Content-Type': 'application/json'
                }}, {withCredentials: true});
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
            } catch (e) {
            }

         });
    }

       useEffect(() => {
            void func()
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [])

    return (
        <div></div>
    )
}