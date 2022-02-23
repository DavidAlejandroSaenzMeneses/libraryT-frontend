import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import defaultPicture from '../assets/image/default.png';

export default function CreateLoan() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const { idBook } = useParams();
    const tituloRef = useRef();
    const autorRef = useRef();
    const genreRef = useRef();
    const prologueRef = useRef();

    const urlBase = "http://localhost:3900/api/v1";
    const [selectedFile, setSelectedFile] = useState(null);
    const fileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const createBook = async (e) => {
        e.preventDefault();
        if (tituloRef.current.value === '' || autorRef.current.value === '' || genreRef.current.value === '' || prologueRef.current.value === '') {
            MySwal.fire('Error', 'Datos incompletos', 'error');
            return false;
        }
        const bookData = await axios.post(`${urlBase}/books`, {
            title: tituloRef.current.value,
            author_name: autorRef.current.value,
            prologue: prologueRef.current.value,
            genre: genreRef.current.value
        });
        if (bookData.data.result.id_book) {
            if (selectedFile !== null) {
                //crear un form data para añadir la informacion del fichero
                const formData = new FormData();
                formData.append(
                    'file0',
                    selectedFile,
                    selectedFile.name
                );
                //Sube imagen y actualiza el registro para enlazarlos
                axios.post(`${urlBase}/books/upload-image/${bookData.data.result.id_book}`, formData).then((res) => {
                    if (res.data.result.length > 0) {
                        navigate("/books", { replace: true });
                    } else {
                        MySwal.fire('Error', 'Algo salio mal', 'error');
                    }
                })
            } else {
                navigate("/books", { replace: true });
            }
            MySwal.fire('Proceso Realizado', 'El Libro Fue Registrado Correctamente', 'success');
        } else {
            MySwal.fire('Error', 'Algo Salio Mal', 'error');
        }
    }
    return (
        <div className="py-4 px-6 h-full">
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-4/5 justify-center">
                <div className="book h-sm p-2 my-2 h-full items-center">
                    <h3 className="text-xl font-bold mb-5 text-gray-700">Datos del Libro</h3>
                    <div className="flex justify-center">
                        <div className="book-image w-1/3">
                            <div className="flex h-60 items-center">
                                <div className="block border border-gray-300 rounded-md h-64">
                                    <div className="h-4/5">
                                        {selectedFile !== null ? (
                                            <h3 className="py-3">Imagen En Proceso De Carga...</h3>
                                        ) : (
                                            <img src={defaultPicture} alt="book" className="object-scale-down h-48 w-96" />
                                        )}
                                    </div>
                                    <div className="bg-gray-100 h-1/5">
                                        <input className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-br-lg file:border-0
                                            file:text-sm file:font-bold
                                            file:bg-indigo-200 file:text-indigo-700
                                            hover:file:bg-indigo-500 hover:file:text-white" type="file" name="file0" onChange={fileChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="book-info flex justify-center justify-items-center items-center w-2/3">
                            <div className="flex h-full px-2 justify-center text-center items-center">
                                <form onSubmit={createBook}>
                                    <div className="form-group grid grid-cols-2 my-2">
                                        <label htmlFor="title" className="text-left text-gray-700 font-bold">Titulo</label>
                                        <input className="border border-gray-500 p-1 w-full rounded-md" type="text" name="title" ref={tituloRef} />
                                    </div>
                                    <div className="form-group grid grid-cols-2 my-2 mb-4">
                                        <label htmlFor="title" className="text-left text-gray-700 font-bold">Autor</label>
                                        <input className="border border-gray-500 p-1 w-full rounded-md" type="text" name="title" ref={autorRef} />
                                    </div>
                                    <div className="form-group grid grid-cols-2 my-2 mb-4">
                                        <label htmlFor="title" className="text-left text-gray-700 font-bold">Genero</label>
                                        <input className="border border-gray-500 p-1 w-full rounded-md" type="text" name="title" ref={genreRef} />
                                    </div>
                                    <div className="form-group my-2 mb-4">
                                        <textarea className="border border-gray-500 p-1 w-full rounded-md" placeholder="Prologo" ref={prologueRef} ></textarea>
                                    </div>
                                    <div className="form-group my-2">
                                        <input className="border-2 border-green-400 w-40 rounded-md text-gray-700 font-bold font-xl p-2 px-4 box-content transition delay-150 hover:bg-green-500 hover:text-white duration-300" type="submit" value="GUARDAR" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}