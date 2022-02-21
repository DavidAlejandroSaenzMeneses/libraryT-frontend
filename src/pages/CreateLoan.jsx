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
    const numberUserRef = useRef();
    const typeUserRef = useRef();
    const nameUserRef = useRef();
    const phoneUserRef = useRef();



    const documents = ['CC', 'CE', 'TI'];
    const url = 'http://localhost:3900/api/v1';
    const urlBase = "http://localhost:3900/api/v1";
    //const [books, setBook] = useHttp(url);
    const [book, setBook] = useState({ book: false, status: '' });
    const [userData, setUser] = useState({ status: 'pending', user: false, message: '' });
    useEffect(() => {
        const getData = () => {
            axios.get(`${urlBase}/books/${idBook}`).then(res => {
                setBook(res.data.result);
            }).catch(error => {
                setBook({
                    book: false,
                    status: 'success'
                });
            });
        }
        getData();
    }, []);
    const getUser = async (e) => {
        e.preventDefault();
        if (numberUserRef.current.value !== '') {
            const identificationUser = `${typeUserRef.current.value}-${numberUserRef.current.value}`;
            axios.get(`${urlBase}/users?identification=${identificationUser}`).then(res => {
                setUser(res.data.result);
                setUser({
                    status: 'success',
                    user: res.data.result,
                    message: 'Usuario Registrado Previamente'
                });
                nameUserRef.current.value = res.data.result.full_name;
                phoneUserRef.current.value = res.data.result.phone_number;
            }).catch(error => {
                setUser({
                    status: 'success',
                    user: false,
                    message: 'Usuario Nuevo'
                });
                nameUserRef.current.value = '';
                phoneUserRef.current.value = '';
            });
        }
    };
    const saveLoan = async (e) => {
        e.preventDefault();
        if (numberUserRef.current.value === '' || nameUserRef.current.value === '' || phoneUserRef.current.value === '') {
            MySwal.fire('Error', 'Datos incompletos', 'error');
            return false;
        }
        const formDataUser = {
            id_library_user: (userData.user.id_library_user?userData.user.id_library_user:null),
            identification: `${typeUserRef.current.value}-${numberUserRef.current.value}`,
            full_name: nameUserRef.current.value,
            phone_number: phoneUserRef.current.value
        };
        try {
            let updatedUserData = false;
            let libraryUser= false;
            if (userData.user.id_library_user !== false && userData.user.id_library_user!==undefined) {
               updatedUserData = await axios.put(`${urlBase}/users/${userData.user.id_library_user}`, formDataUser);
               libraryUser=userData.user.id_library_user;
            } else {
               updatedUserData = await axios.post(`${urlBase}/users`, formDataUser);
               libraryUser=updatedUserData.data.result.id_library_user;
            }
            if(updatedUserData!==false){
                const loansData={id_library_user:libraryUser,id_book:idBook};
                updatedUserData = await axios.post(`${urlBase}/loans`, loansData);
            }
            MySwal.fire('Proceso Realizado', 'Prestamo realizado correctamente', 'success');
            navigate("/books", { replace: true });
        } catch (error) {
            MySwal.fire('Error', 'Algo salio mal', 'error');
        }
    }
    return (
        <div className="py-4 px-6 h-full">
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-4/5 justify-center">
                {
                    (book && book.title) ? (

                        <div className="book h-sm p-2 my-2 h-full items-center">
                            <h3 className="text-xl font-bold mb-5 text-gray-700">Formulario de Prestamo</h3>
                            <div className="flex justify-center">
                                <div className="book-image w-1/5">
                                    <div className="flex h-60 items-center">
                                        <div className="block border border-gray-300 rounded-md">
                                            {book.image !== null ? (
                                                <img src={`${urlBase}/books/get-image/${book.image}`} alt={book.title} className="object-scale-down h-48 w-96" />
                                            ) : (
                                                <img src={defaultPicture} alt="book" className="object-scale-down h-48 w-96" />
                                            )}
                                            <h3 className="text-xl font-bold text-gray-700 text-center bg-gray-200">{book.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="book-info flex justify-center justify-items-center items-center w-3/5">
                                    <div className="flex h-full px-2 justify-center text-center items-center">
                                        <form onSubmit={saveLoan}>
                                            <div className="form-group grid grid-cols-2 my-2">
                                                <label htmlFor="title" className="text-left text-gray-700 font-bold">Identificacion</label>
                                                <div className="block">
                                                    <div className="w-full flex gap-2">
                                                        <select className="border border-gray-500 w-1/5 rounded-md" ref={typeUserRef}>
                                                            {
                                                                documents.map((document, i) => {
                                                                    return <option key={i} value={document}>{document}</option>
                                                                })
                                                            }
                                                        </select>
                                                        <input className="border border-gray-500 p-1 w-4/5 rounded-md" type="text" name="title" ref={numberUserRef} onBlur={getUser} />
                                                    </div>
                                                    <div className="w-full text-center mb-2">
                                                        {(userData && userData.message !== '' && userData.user !== false) &&
                                                            <p className="text-md text-green-700">{userData.message}</p>
                                                        }
                                                        {(userData && userData.message !== '' && userData.user === false) &&
                                                            <p className="text-md text-yellow-700">{userData.message}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid grid-cols-2 my-2">
                                                <label htmlFor="title" className="text-left text-gray-700 font-bold">Nombre Completo</label>
                                                <input className="border border-gray-500 p-1 w-full rounded-md" type="text" name="title" ref={nameUserRef} />
                                            </div>
                                            <div className="form-grou grid grid-cols-2 my-2 mb-4">
                                                <label htmlFor="title" className="text-left text-gray-700 font-bold">Telefono</label>
                                                <input className="border border-gray-500 p-1 w-full rounded-md" type="text" name="title" ref={phoneUserRef} />
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
