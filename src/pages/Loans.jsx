import { useEffect, useState } from 'react';
import { SearchCircleIcon, UsersIcon } from '@heroicons/react/outline';
import axios from 'axios';
import {DateTime} from 'luxon'; 


export default function Balance() {
    const urlBase = 'http://localhost:3900/api/v1';
    const [loans, setLoans] = useState({
        status: '',
        loans: false
    });
    useEffect(() => {
        const getData = () => {
            axios.get(`${urlBase}/loans`).then(res => {
                setLoans(res.data.result);
            }).catch(error => {
                setLoans({
                    status: 'success',
                    loans: false
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
                    {(loans && loans.length > 0) ? (
                        <table className="table w-full p-4 border border-gray-300">
                            <thead className="bg-yellow-200">
                                <tr>
                                    <th>No</th>
                                    <th>Libro</th>
                                    <th>Usuario</th>
                                    <th>Fecha Entrega</th>
                                    <th>Fecha Devolucion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="reg1 p-2">{(i+1)}</td>
                                            <td className="reg2 p-2">{loan.loan_book.title}</td>
                                            <td className="reg3 p-2">{loan.loan_library_user.full_name}</td>
                                            <td className="reg4 p-2">{loan.date_record?DateTime.fromISO(loan.date_record).toFormat('yyyy-MM-dd'):''}</td>
                                            <td className="reg5 p-2">{loan.date_return?DateTime.fromISO(loan.date_return).toFormat('yyyy-MM-dd'):''}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <h2>Cargando...</h2>
                    )}

                </div>
            </div>
        </div>
    );
}
