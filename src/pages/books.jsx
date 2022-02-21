import { BookOpenIcon, PencilAltIcon, HandIcon } from '@heroicons/react/outline';
import { useHttp } from '../hooks/useHttp';
import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultPicture from '../assets/image/default.png';
import { Link } from 'react-router-dom';
export default function Books() {
    const url = 'http://localhost:3900/api/v1';
    //const [books, setBooks] = useHttp(url);
    const [books, setBooks] = useState({
        books: false,
        status: ''
    });
    useEffect(() => {
        const getData = () => {
            axios.get('http://localhost:3900/api/v1/books').then(res => {
                setBooks(res.data.result);
            }).catch(error => {
                setBooks({
                    books: false,
                    status: 'success'
                });
            });
        }
        getData();
    }, []);
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
                        books.map((book,i) => {
                            return (
                                <div className="book-list-item flex h-sm p-2 my-2 h-60 bg-gray-100" key={'itemBook'+i}>
                                    <div className="book-image w-1/5">
                                        <div className="flex h-60 items-center">
                                            {book.image !== null ? (
                                                <img src={url + '/books/get-image/' + book.image} alt={book.title} className="object-scale-down h-48 w-96" />
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
                                            <div className="font-bold text-green-700 text-left">Disponible</div>
                                        </div>
                                    </div>
                                    <div className="w-1/5">
                                        <h3 className="text-lg text-gray-700 h-1/5">Acciones</h3>
                                        <div className="flex items-center justify-center h-4/5">
                                            <div>
                                                <Link to={"/loan/create/" + book.id_book} className="flex items-center w-24 border-2 border-yellow-400 p-2 rounded-md my-1 bg-gray-100 hover:bg-yellow-500 hover:text-white transition duration-500">
                                                    <PencilAltIcon className="h-5 w-5" /> Editar
                                                </Link>
                                                <Link to={"/loan/create/" + book.id_book} className="flex items-center w-24 border-2 border-blue-400 p-2 rounded-md my-1 bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-500">
                                                    <HandIcon className="h-5 w-5" /> Prestar
                                                </Link>
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
        </div>
    );
}
