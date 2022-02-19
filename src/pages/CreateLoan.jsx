import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import defaultPicture from '../assets/image/default.png';

export default function Balance() {
    const numberUser = useRef(); 
    const typeUser = useRef();
    const { idBook } = useParams();
    const documents = ['CC', 'CE', 'TI'];
    const url = 'http://localhost:3900/api/v1';
    //const [books, setBook] = useHttp(url);
    const [book, setBook] = useState({ book: false, status: '' });
    const [user, setUser] = useState();
    useEffect(() => {
        const getData = () => {
            axios.get('http://localhost:3900/api/v1/books/' + idBook).then(res => {
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
        const identificationUser=typeUser.current.value+'-'+numberUser.current.value;
        //await axios.get("/api/updatecart", { data: { product: this.product } })
        axios.get('http://localhost:3900/api/v1/users/'+identificationUser).then(res => {
            setUser(res.data.result);
        }).catch(error => {
            setUser({
                user: false,
                status: 'success'
            });
        });
    };
    const saveLoan = async (e) => {
        /*e.preventDefault();
        changeState();
        const newArticle = await axios.post(urlApi + '/save', state.article);
        if (newArticle.data.article) {
            setNewArticle({
                article: newArticle.data.article,
                status: 'waiting'
            })
            if (selectedFile !== null) {
                //obtener el id del articulo guardado
                const articleId = newArticle.data.article._id;
                //crear un form data y añadirlo al fichero
                const formData = new FormData();
                formData.append(
                    'file0',
                    selectedFile,
                    selectedFile.name
                );
                //peticion
                axios.post(urlApi + 'upload-image/' + articleId, formData).then((res) => {
                    if (res.data.articleUpdated) {
                        setNewArticle({
                            article: res.data.article,
                            status: 'success'
                        })
                        navigate("/blog", { replace: true });
                    } else {
                        setNewArticle({
                            article: {},
                            status: 'failed'
                        })
                    }
                })
            }else{
                navigate("/blog", { replace: true });
            }
            MySwal.fire('Articulo Creado','El articulo fue creado correctamente','success');
        } else {
            setNewArticle({
                article: {},
                status: 'failed'
            });
        }*/
    }
    return (
        <div className="py-4 px-6 h-full">
            <div className="title-Page flex items-center mb-4">
                <h1 className="flex text-gray-700 text-xl font-bold">Nuevo Prestamo</h1>
            </div>
            <div className="data-records block p-2 bg-white w-full rounded-md shadow-lg h-xl justify-center">
                {(book && book.title) ? (

                    <div className="book-list-item flex h-sm p-2 my-2 h-60 bg-gray-100">
                        <div className="book-image w-1/5">
                            <div className="flex h-60 items-center">
                                <div className="block">
                                    {book.image !== null ? (
                                        <img src={url + '/books/get-image/' + book.image} alt={book.title} className="object-scale-down h-48 w-96" />
                                    ) : (
                                        <img src={defaultPicture} alt="book" className="object-scale-down h-48 w-96" />
                                    )}
                                    <h3 className="text-xl font-bold text-gray-700 text-left">{book.title}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="book-info flex justify-center justify-items-center items-center w-4/5">
                            <div className="block w-full ">
                                <div className=" h-40 px-2 justify-center text-center">
                                    <h3 className="text-xl font-bold mb-5">Formulario de Prestamo</h3>
                                    <form onSubmit={saveLoan}>
                                        <div className="form-group grid grid-cols-2 my-2">
                                            <label htmlFor="title" className="text-gray-700 font-bold">Identificacion</label>
                                            <div className="flex gap-2">
                                                <select className="w-1/5 rounded-md" ref={typeUser}>
                                                    {
                                                        documents.map((document) => {
                                                            return <option value={document}>{document}</option>
                                                        })
                                                    }
                                                </select>
                                                <input className="w-4/5 rounded-md" type="text" name="title" ref={numberUser} onBlur={getUser}/>
                                            </div>
                                        </div>
                                        <div className="form-group grid grid-cols-2 my-2">
                                            <label htmlFor="title" className="text-gray-700 font-bold">Nombre Completo</label>
                                            <input className="w-full rounded-md" type="text" name="title"  value={user.full_name}/>
                                        </div>
                                        <div className="form-grou grid grid-cols-2 my-2 mb-4">
                                            <label htmlFor="title" className="text-gray-700 font-bold">Telefono</label>
                                            <input className="w-full rounded-md" type="text" name="title" value={user.phone_number}/>
                                        </div>
                                        <div className="form-group">
                                            <input className="w-40 rounded-md bg-green-400 text-white font-bold font-xl p-2 px-4 border borde-green-600" type="submit" value="GUARDAR" />
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
