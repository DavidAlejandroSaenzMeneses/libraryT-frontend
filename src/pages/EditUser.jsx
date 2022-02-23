import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CreateLoan() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const { idUser } = useParams();
    const typeUserRef = useRef();
    const numberUserRef = useRef();
    const nameUserRef = useRef();
    const phoneUserRef = useRef();

    const documents = ['CC', 'CE', 'TI'];
    const urlBase = "http://localhost:3900/api/v1";
    const [userData, setUser] = useState({ status: 'pending', user: false, message: '' });
    useEffect(() => {
        const getData = () => {
            axios.get(`${urlBase}/users/${idUser}`).then(res => {
                const [tipoID, numeroID] = res.data.result.identification.split('-');
                typeUserRef.current.selected = tipoID;
                numberUserRef.current.value = numeroID;
                nameUserRef.current.value = res.data.result.full_name;
                phoneUserRef.current.value = res.data.result.phone_number;
            }).catch(error => {
                nameUserRef.current.value = '';
                phoneUserRef.current.value = '';
            });
        }
        getData();
    }, []);
    const updateUser = async (e) => {
        e.preventDefault();
        if (numberUserRef.current.value === '' || nameUserRef.current.value === '' || phoneUserRef.current.value === '') {
            MySwal.fire('Error', 'Datos incompletos', 'error');
            return false;
        }
        try {
            const userDataUpdate={
                identification: `${typeUserRef.current.value}-${numberUserRef.current.value}`,
                full_name: nameUserRef.current.value,
                phone_number: phoneUserRef.current.value
            };
            const updatedUserData = await axios.put(`${urlBase}/users/${idUser}`, userDataUpdate);
            MySwal.fire('Proceso Realizado', 'Usuario Actualizado Correctamente', 'success');
            navigate("/users", { replace: true });
        } catch (error) {
            MySwal.fire('Error', 'Algo salio mal', 'error');
        }
    }
    const deleteUser = (e)=>{
        e.preventDefault();
        MySwal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar el Usuario permanentamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#22c55e',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6b7280',
            
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${urlBase}/users/${idUser}`).then(res => {
                    MySwal.fire(
                        'Proceso Realizado',
                        'El Usuario fue eliminado correctamente',
                        'success'
                    )
                    navigate("/users", { replace: true });
                }).catch(error => {
                    MySwal.fire(
                        'Error',
                        'El Usuario no fue eliminado, por favor verifique que no tenga registro de prestamos',
                        'error'
                    )
                });          
            }
        });
    }
    return (
        <div className="py-4 px-6 h-full">
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-4/5 justify-center">
                <div className="book h-sm p-2 my-2 h-full items-center">
                    <h3 className="text-xl font-bold mb-5 text-gray-700">Datos del Usuario</h3>
                    <div className="flex justify-center">
                        <div className="book-info flex justify-center justify-items-center items-center w-2/3">
                            <div className="flex h-full px-2 justify-center text-center items-center">
                                <form onSubmit={updateUser}>
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
                                                <input className="border border-gray-500 p-1 w-4/5 rounded-md" type="text" name="title" ref={numberUserRef} />
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
                                    <div className="flex justify-between">
                                    <input className="border-2 border-green-400 w-40 rounded-md text-gray-700 font-bold font-xl p-2 px-4 box-content transition delay-150 hover:bg-green-500 hover:text-white duration-300" type="submit" value="GUARDAR" />
                                        <button className="border-2 border-red-400 w-40 rounded-md text-gray-700 font-bold font-xl p-2 px-4 box-content transition delay-150 hover:bg-red-500 hover:text-white duration-300" onClick={deleteUser}>ELIMINAR</button>
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