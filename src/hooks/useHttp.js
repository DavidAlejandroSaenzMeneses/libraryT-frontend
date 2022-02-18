import { useState, useEffect } from 'react';
import axios from 'axios';

export function useHttp(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = () => {
            axios.get(url).then(res => {
                if(!res.data.result){
                    setData({
                        status: 'error',
                        data: false
                    });
                }
                setData({
                    status: 'success',
                    data: res.data.result
                });
            }).catch(error => {
                setData({
                    status: 'error',
                    data: false
                });
            });
        }
        getData();
    }, [url]);
    return [data];
}