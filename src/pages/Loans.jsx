import { useEffect, useState } from 'react';
import { SearchCircleIcon, UsersIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { DateTime } from 'luxon';


export default function Balance() {
    const urlBase = 'http://localhost:3900/api/v1';
    const [loanData, setLoans] = useState({
        status: '',
        loans: false
    });
    useEffect(() => {
        const getData = () => {
            axios.get(`${urlBase}/loans`).then(res => {
                if (res.data.result) {
                    setLoans({
                        status: 'success',
                        loans: res.data.result
                    });
                } else {
                    setLoans({
                        status: 'success',
                        loans: false
                    });
                }
            }).catch(error => {
                setLoans({
                    status: 'error',
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
                <div className="w-full">
                    {(loanData.loans!==false && loanData.loans.length > 0) ? (
                        <div className="rounded-lg overflow-auto">
                            <div className="grid grid-cols-4 bg-cyan-400 rounded-t-lg font-bold text-white">
                                <div>Libro</div>
                                <div>Usuario</div>
                                <div>Fecha Entrega</div>
                                <div>Fecha Devolucion</div>
                            </div>
                            {loanData.loans.map((loan, i) => {
                                return (
                                    <div key={i} className="grid grid-cols-4 w-full bg-gray-100">
                                        <div className="reg2 p-2">{loan.loan_book.title}</div>
                                        <div className="reg3 p-2">{loan.loan_library_user.full_name}</div>
                                        <div className="reg4 p-2">{loan.date_record ? DateTime.fromISO(loan.date_record).toFormat('yyyy-MM-dd') : ''}</div>
                                        <div className="reg5 p-2">{loan.date_return ? DateTime.fromISO(loan.date_return).toFormat('yyyy-MM-dd') : ''}</div>
                                    </div>
                                )
                            })}

                        </div>
                    ) : (loanData.status=='success' && loanData.loans!==false) ?(
                        <h2 className="font-bold text-gray-700">Sin Registro</h2>
                    ):(
                        <h2>Cargando...</h2>
                    )}

                </div>
            </div>
        </div>
    );
}
