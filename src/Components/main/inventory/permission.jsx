import {useEffect} from "react";
import axios from "axios";
import Url from "../../config";

export const Permission = (props) => {
     useEffect(() => {
            (async () => {
                    const {data} = await axios.get(`${Url}/permission/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              });
              props.setRank(data.message);
        })()
    }, [props]);
             useEffect(() => {
            (async () => {
                    const {data} = await axios.get(`${Url}/home/`, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
              });
              props.setOffice(data.message);
        })()
    }, [props]);
}