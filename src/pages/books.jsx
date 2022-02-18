import { BookOpenIcon } from '@heroicons/react/outline';
import { useHttp } from '../hooks/useHttp';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Books() {
    const url = 'localhost:3900/api/v1/books';
    //const [books, setBooks] = useHttp(url);
    const [books, setBooks] = useState({
        books: false,
        status: ''
    });
    useEffect(() => {
        const getArticle = () => {
            axios.get('http://localhost:3900/api/v1/books').then(res => {
                setBooks(res.data.result);
            }).catch(error => {
                setBooks({
                    books: false,
                    status: 'success'
                });
            });
        }
        getArticle();
    }, []);
    return (
        <div className="py-4 px-6 h-full">
            <div className="title-Page flex items-center mb-4">
                <BookOpenIcon className="h-5 w-5 mr-1 text-gray-700" />
                <h1 className="flex text-gray-700 text-xl font-bold">Libros</h1>
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
                    {(books && books.length > 0 )? (
                        <table className="table w-full p-4 border border-gray-300">
                            <thead className="bg-yellow-200">
                                <tr>
                                    <th>titulo</th>
                                    <th>Codigo de Tarjeta</th>
                                    <th>Movimiento</th>
                                    <th>Saldo Actual</th>
                                    <th>Cliente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.map(book => {
                                        return (
                                            <tr>
                                                <td>{book.title}</td>
                                                <td>{book.id_author}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (

                        <h1>No hay libros</h1>

                    )
                    }
                </div>
            </div>
        </div>
    );
}
