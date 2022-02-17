import { PresentationChartLineIcon } from '@heroicons/react/outline';
import React from 'react';

export default function Balance() {
    return (
        <div className="py-4 px-6 h-full">
            <div className="title-Page flex items-center mb-4">
                <PresentationChartLineIcon className="h-5 w-5 mr-1 text-gray-700" />
                <h1 className="flex text-gray-700 text-xl font-bold">Balance</h1>
            </div>
            <div className="resume  grid w-full grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex bg-cyan-400/90 py-2 h-5/6 w-full rounded-md px-2 mx-auto">
                    <div className="items-center p-2 flex justify-start">
                        <div>
                            <h2 className="flex text-white text-4xl font-bold justify-start">+83</h2>
                            <p className="flex text-white justify-start">Nuevos Clientes</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-sky-400/80 py-2 h-5/6 w-full rounded-md px-2 mx-auto">
                    <div className="items-center p-2 flex justify-start">
                        <div>
                            <h2 className="flex text-white text-4xl font-bold justify-start">$ 4'000.000</h2>
                            <p className="flex text-white justify-start">Ingresos del Dia</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-indigo-400/90 py-2 h-5/6 w-full rounded-md px-2 mx-auto">
                    <div className="items-center p-2 flex justify-start">
                        <div>
                            <h2 className="flex text-white text-4xl font-bold justify-start">+83</h2>
                            <p className="flex text-white justify-start">Nuevos Clientes</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-blue-400/80 py-2 h-5/6 w-full rounded-md px-2 mx-auto">
                    <div className="items-center p-2 flex justify-start">
                        <div>
                            <h2 className="flex text-white text-4xl font-bold justify-start">+83</h2>
                            <p className="flex text-white justify-start">Nuevos Clientes</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-xl justify-center">
                <div className="flex justify-start">
                    <h3 className="text-gray-700 font-bold mb-4">Registro de Movimientos</h3>
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
