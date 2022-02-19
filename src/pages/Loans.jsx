import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { FolderAddIcon, SearchCircleIcon, UsersIcon } from '@heroicons/react/outline';


export default function Balance() {
    const url = 'http://localhost:3900/api/v1';
    //const [users, setUsers] = useHttp(url);
    const [users, setUsers] = useState({
        users: false,
        status: ''
    });
    useEffect(() => {
        const getData = () => {
            axios.get('http://localhost:3900/api/v1/users').then(res => {
                setUsers(res.data.result);
            }).catch(error => {
                setUsers({
                    users: false,
                    status: 'success'
                });
            });
        }
        getData();
    }, []);
    return (
        <div className="py-4 px-6 h-full">
            <div className="title-Page flex items-center mb-4">
                <UsersIcon className="h-5 w-5 mr-1 text-gray-700" />
                <h1 className="flex text-gray-700 text-xl font-bold">Historial prestamos</h1>
            </div>
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-xl justify-center">
                <div className="flex w-full justify-between mb-3 px-2">
                    <div className="w-1/3"></div>
                    <div className="flex w-1/3 items-center">
                        <input type="text" className="buscador w-5/6 border border-gray-400 rounded-md my-1" placeholder="Buscar"></input>
                        <SearchCircleIcon className="h-7 w-7 text-gray-700 transition-all transform -rotate-90 " />
                    </div>
                    <div className="flex w-1/3 w-red-200 justify-end">
                        
                    </div>
                </div>
                <div className="w-full overflow-auto">
                    <table className="table w-full p-4 border border-gray-300">
                        <thead className="bg-yellow-200">
                            <tr>
                                <th>No</th>
                                <th>Codigo de Tarjeta</th>
                                <th>Movimiento</th>
                                <th>Saldo Actual</th>
                                <th>Cliente</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="reg1 p-2">1</td>
                                <td className="reg2 p-2">ASD123</td>
                                <td className="reg3 p-2">5.000</td>
                                <td className="reg4 p-2">45.000</td>
                                <td className="reg5 p-2">Juan Perez</td>
                            </tr>
                            <tr>
                                <td className="reg1 p-2">2</td>
                                <td className="reg2 p-2">ASD123</td>
                                <td className="reg3 p-2">5.000</td>
                                <td className="reg4 p-2">45.000</td>
                                <td className="reg5 p-2">Juan Perez</td>
                            </tr>
                            <tr>
                                <td className="reg1 p-2">3</td>
                                <td className="reg2 p-2">ASD123</td>
                                <td className="reg3 p-2">5.000</td>
                                <td className="reg4 p-2">45.000</td>
                                <td className="reg5 p-2">Juan Perez</td>
                            </tr>
                            <tr>
                                <td className="reg1 p-2">4</td>
                                <td className="reg2 p-2">ASD123</td>
                                <td className="reg3 p-2">5.000</td>
                                <td className="reg4 p-2">45.000</td>
                                <td className="reg5 p-2">Juan Perez</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
