import React, { useEffect, useState } from 'react'
import {Today} from "./currentDate";
export const Clock = ({h24=true}) => {

    const [hour  , setHour  ] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    useEffect(()=> {

        const update = () => {
            const date = new Date();
            let hour = date.getHours();
            if(!h24) {
                hour = (hour % 12) || 12;
            }
            setHour(hour);
            setMinute(date.getMinutes());
            setSecond(date.getSeconds());

        }

        update();

        const interval = setInterval(()=> {
            update();
        }, 1000);

        return ()=>clearInterval(interval);
    }, [h24]);

    return (
        <div className='clock'>
            <div className='col'>

                  <div>
                    <span className= 'hour p-2'>
                        {hour}:{minute}:{second}
                    </span>

                    <span className= 'hour p-2'>
                        <Today/>
                    </span>
                  </div>

            </div>
        </div>
    )

}