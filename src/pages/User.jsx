import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PencilAltIcon, UsersIcon, PlusIcon } from '@heroicons/react/outline';


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
                <div className="flex justify-between p-2">
                    <h3 className="text-gray-700 font-bold mb-4">Usuarios Registrados</h3>
                    <div></div>
                    <div>
                        <Link to={"/users/create/"} className="flex items-center w-40 border-2 border-gray-200 p-2 text-gray-700 rounded-md my-1 bg-gray-100 transition duration-500 truncate">
                            <PlusIcon className="h5 w-5 mr-1" />Añadir Ususario
                        </Link>
                    </div>
                </div>
                <div className="w-full overflow-auto">
                    {(users && users.length > 0) ? (
                        <div className="rounded-lg">
                            <div className="grid grid-cols-4 bg-indigo-400 rounded-t-lg font-bold text-white">
                                <div className="w-full p-2">Identificacion</div>
                                <div className="w-full p-2">Nombre</div>
                                <div className="w-full p-2">Numero Telefono</div>
                                <div className="w-full p-2">Modificar</div>
                            </div>
                            {
                                users.map((user, i) => {
                                    return (
                                        <div key={i} className="w-full grid grid-cols-4 bg-gray-100">
                                            <div className="w-full p-2">{user.full_name}</div>
                                            <div className="w-full p-2">{user.identification}</div>
                                            <div className="w-full p-2">{user.phone_number}</div>
                                            <div className="flex justify-center items-center w-full p-2 ">
                                                <Link to={`/users/edit/${user.id_library_user}`}>
                                                    <PencilAltIcon className="h-5 w-5 hover:text-indigo-700 hover:scale-125 transition duration-500" />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    ) : (
                        <h2>cargando...</h2>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
