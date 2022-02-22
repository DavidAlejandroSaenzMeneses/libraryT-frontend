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
    const [book, setBook] = useState({ book: false, status: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const getData = () => {
            axios.get(`${urlBase}/books/${idBook}`).then(res => {
                setBook(res.data.result);
                tituloRef.current.value = res.data.result.title;
                autorRef.current.value = res.data.result.author_name;
                genreRef.current.value = res.data.result.genre;
                prologueRef.current.value = res.data.result.prologue;
            }).catch(error => {
                setBook({
                    book: false,
                    status: 'success'
                });
            });
        }
        getData();
    }, []);
    const updateBookData = async (e) => {
        e.preventDefault();
        if (tituloRef.current.value === '' || autorRef.current.value === '' || genreRef.current.value === '' || prologueRef.current.value === '') {
            MySwal.fire('Error', 'Datos incompletos', 'error');
            return false;
        }
        const bookData = await axios.put(`${urlBase}/books/${idBook}`, {
            title: tituloRef.current.value,
            author_name: autorRef.current.value,
            prologue: prologueRef.current.value,
            genre: genreRef.current.value
        });
        if (bookData.data.result.length > 0) {
            if (selectedFile !== null) {
                //crear un form data para añadir la informacion del fichero
                const formData = new FormData();
                formData.append(
                    'file0',
                    selectedFile,
                    selectedFile.name
                );
                //Sube imagen y actualiza el registro para enlazarlos
                axios.post(`${urlBase}/book/upload-image/${idBook}`, formData).then((res) => {
                    if (res.data.articleUpdated) {
                        navigate("/blog", { replace: true });
                    } else {
                        MySwal.fire('Error', 'Algo salio mal', 'error');
                    }
                })
            } else {
                navigate("/blog", { replace: true });
            }
            MySwal.fire('Proceso Realizado', 'El Libro fue actualizado correctamente', 'success');
        } else {
            MySwal.fire('Error', 'Algo salio mal', 'error');
        }
    }
    const fileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    /*const saveLoan = async (e) => {
        e.preventDefault();
        if (tituloRef.current.value === '' || autorRef.current.value === '' || genreRef.current.value === '' || prologueRef.current.value === '') {
            MySwal.fire('Error', 'Datos incompletos', 'error');
            return false;
        }
        const formDataUser = {
            id_library_user: (userData.user.id_library_user ? userData.user.id_library_user : null),
            identification: `${typeUserRef.current.value}-${numberUserRef.current.value}`,
            full_name: nameUserRef.current.value,
            phone_number: phoneUserRef.current.value
        };
        try {
            let updatedUserData = false;
            let libraryUser = false;
            if (userData.user.id_library_user !== false && userData.user.id_library_user !== undefined) {
                updatedUserData = await axios.put(`${urlBase}/users/${userData.user.id_library_user}`, formDataUser);
                libraryUser = userData.user.id_library_user;
            } else {
                updatedUserData = await axios.post(`${urlBase}/users`, formDataUser);
                libraryUser = updatedUserData.data.result.id_library_user;
            }
            if (updatedUserData !== false) {
                const loansData = { id_library_user: libraryUser, id_book: idBook };
                updatedUserData = await axios.post(`${urlBase}/loans`, loansData);
            }
            MySwal.fire('Proceso Realizado', 'Prestamo realizado correctamente', 'success');
            navigate("/books", { replace: true });
        } catch (error) {
            MySwal.fire('Error', 'Algo salio mal', 'error');
        }
    }*/
    return (
        <div className="py-4 px-6 h-full">
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-4/5 justify-center">
                {
                    (book && book.title) ? (

                        <div className="book h-sm p-2 my-2 h-full items-center">
                            <h3 className="text-xl font-bold mb-5 text-gray-700">Datos de Libro</h3>
                            <div className="flex justify-center">
                                <div className="book-image w-1/3">
                                    <div className="flex h-60 items-center">
                                        <div className="block border border-gray-300 rounded-md h-64">
                                            <div className="h-4/5">
                                                {selectedFile !== null ? (
                                                    <h3 className="py-3">Imagen En Proceso de Remplazo...</h3>
                                                ) : book.image !== null ? (
                                                    <img src={`${urlBase}/books/get-image/${book.image}`} alt={book.title} className="object-scale-down h-48 w-96" />
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
                                        <form onSubmit={updateBookData}>
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
                                            <div className="form-group">
                                                <input className="border-2 border-gray-300 w-40 rounded-md bg-green-400 text-white font-bold font-xl p-2 px-4 box-content transition delay-150 hover:bg-green-500 hover:border-gray-400 duration-300" type="submit" value="GUARDAR" />
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1>Cargando...</h1>
                    )
                }
            </div>
        </div>
    );
}