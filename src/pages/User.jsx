import { useEffect, useState } from 'react';
import axios from 'axios';
import { UsersIcon } from '@heroicons/react/outline';


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
                <h1 className="flex text-gray-700 text-xl font-bold">Usuarios</h1>
            </div>
            <div className="resume  grid w-full">
                <div className="flex bg-indigo-400/90 py-2 h-5/6 w-full rounded-md px-2 mx-auto">
                    <div className="items-center p-2 flex justify-start">
                        <div>
                            <h2 className="flex text-white text-4xl font-bold justify-start">
                            {(users && users.length > 0) && users.length}
                            </h2>
                            <p className="flex text-white justify-start">Usuarios</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-xl justify-center">
                <div className="flex justify-start">
                    <h3 className="text-gray-700 font-bold mb-4">Usuarios Registrados</h3>
                </div>
                <div className="w-full overflow-auto">
                    {(users && users.length > 0) ? (
                        <table className="table w-full p-4 border border-gray-300">
                            <thead className="bg-yellow-200">
                                <tr>
                                    <th>No</th>
                                    <th>Identificacion</th>
                                    <th>Nombre</th>
                                    <th>Numero Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user,i) => {
                                        return (
                                            <tr key={user.id_library_user+'tr'}>
                                                <td key={user.id_library_user+'0'} className="reg0 p-2">{i}</td>
                                                <td key={user.id_library_user+'1'} className="reg1 p-2">{user.full_name}</td>
                                                <td key={user.id_library_user+'2'} className="reg2 p-2">{user.identification}</td>
                                                <td key={user.id_library_user+'3'} className="reg3 p-2">{user.phone_number}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <h2>cargando...</h2>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
