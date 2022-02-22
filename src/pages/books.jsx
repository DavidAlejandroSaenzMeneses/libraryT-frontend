import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilAltIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/react/outline';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import defaultPicture from '../assets/image/default.png';

export default function Books() {
    const MySwal = withReactContent(Swal);
    const urlBase = 'http://localhost:3900/api/v1';
    const [books, setBooks] = useState({
        books: false,
        status: ''
    });
    const getBooks = ()=>{
        axios.get(`${urlBase}/books`).then(res => {
            setBooks(res.data.result);
        }).catch(error => {
            setBooks({
                books: false,
                status: 'success'
            });
        });
    }
    useEffect(() => {
        getBooks();
    }, []);

    const closeLoan = (e) => {
        e.preventDefault();
        const bookForClose=e.target.value;
        MySwal.fire({
            title: 'Generar Devolucion?',
            text: "Desea Registrar la devolucion del libro",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#22c55e',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6b7280',
            
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${urlBase}/loans/${bookForClose}/close`).then(res => {
                    getBooks();
                    MySwal.fire(
                        'Proceso Realizado',
                        'Se registro correctamente la devolucion',
                        'success'
                    )
                }).catch(error => {
                    MySwal.fire(
                        'Error',
                        'Algo salio mal',
                        'error'
                    )
                });
                
            }
        })
    }
    return (
        <div className="py-4 px-6 h-full">
            <div className="title-Page flex items-center mb-4">
                <BookOpenIcon className="h-5 w-5 mr-1 text-gray-700" />
                <h1 className="flex text-gray-700 text-xl font-bold">Libros</h1>
            </div>
            <div className="resume  grid w-full">
                <div className="flex bg-cyan-400/90 py-2 h-5/6 w-full rounded-md px-2 mx-auto">
                    <div className="items-center p-2 flex justify-start">
                        <div>
                            <h2 className="flex text-white text-4xl font-bold justify-start">{books.length}</h2>
                            <p className="flex text-white justify-start">No. Libros</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-xl justify-center">
                <div className="flex justify-start">
                    <h3 className="text-gray-700 font-bold mb-4">Libros registrados</h3>
                </div>
                <div className="books-list w-full overflow-auto">
                    {(books && books.length > 0) ? (
                        books.map((book, i) => {
                            return (
                                <div className="book-list-item flex h-sm p-2 my-2 h-60 bg-gray-100" key={'itemBook' + i}>
                                    <div className="book-image w-1/5">
                                        <div className="flex h-60 items-center">
                                            {book.image !== null ? (
                                                <img src={urlBase + '/books/get-image/' + book.image} alt={book.title} className="object-scale-down h-48 w-96" />
                                            ) : (
                                                <img src={defaultPicture} alt="book" className="object-scale-down h-48 w-96" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="book-info flex justify-start items-center w-3/5">
                                        <div className="block w-full">
                                            <div className="flex items-center">
                                                <h3 className="text-2xl font-bold text-gray-700 text-left">{book.title}</h3>
                                                <h3 className="text-lg font-bold text-gray-500 text-left">-{book.author_name}</h3>
                                            </div>
                                            <div className="h-40">
                                                <div className="overflow-hidden h-32 text-ellipsis text-justify">{book.prologue}
                                                </div>
                                            </div>
                                            {book.loan_book ? (
                                                <div className="font-bold text-red-700 text-left">Prestado</div>
                                            ) : (
                                                <div className="font-bold text-green-700 text-left">Disponible</div>
                                            )
                                            }
                                        </div>
                                    </div>
                                    <div className="w-1/5">
                                        <h3 className="text-lg text-gray-700 h-1/5">Acciones</h3>
                                        <div className="flex items-center justify-center h-4/5">
                                            <div>
                                                <Link to={"/book/edit/" + book.id_book} className="flex items-center w-28 border-2 border-yellow-400 p-2 rounded-md my-1 bg-gray-100 hover:bg-yellow-500 hover:text-white transition duration-500">
                                                    <PencilAltIcon className="h-5 w-5" /> Editar
                                                </Link>
                                                {book.loan_book ? (
                                                    <button className="flex items-center w-28 border-2 border-purple-400 p-2 rounded-md my-1 bg-gray-100 hover:bg-purple-500 hover:text-white transition duration-500" onClick={closeLoan} value={book.id_book}>
                                                        <ChevronDoubleDownIcon className="h5 w-5" />Devolucion
                                                    </button>
                                                ) : (
                                                    <Link to={"/loan/create/" + book.id_book} className="flex items-center w-28 border-2 border-green-400 p-2 rounded-md my-1 bg-gray-100 hover:bg-green-500 hover:text-white transition duration-500">
                                                        <ChevronDoubleUpIcon className="h5 w-5" />Prestamo
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (

                        <h1>Cargando...</h1>

                    )
                    }
                </div>
            </div>
        </div >
    );
}
