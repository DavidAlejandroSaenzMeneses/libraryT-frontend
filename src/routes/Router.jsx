import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//my components
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Home from '../pages/home/Home.jsx';
import Books from '../pages/Books.jsx'
import EditBook from '../pages/EditBook.jsx';
import CreateBook from '../pages/CreateBook.jsx';
import Users from '../pages/User.jsx';
import CreateUser from '../pages/CreateUser';
import EditUser from '../pages/EditUser.jsx';
import Loans from '../pages/Loans.jsx';
import CreateLoan from '../pages/CreateLoan.jsx';


export default function Router() {
    return (
        <BrowserRouter>
            
            <section className="flex w-screen h-screen">
                <Sidebar className="left" />
                <div className="right h-full w-full sm:w-4/5 lg:w-5/6 text-center bg-gray-200 overflow-auto">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Books />} />
                        <Route path="/home" element={<Books />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/create/" element={<CreateUser />} />
                        <Route path="/users/edit/:idUser" element={<EditUser />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/books/create" element={<CreateBook />} />
                        <Route path="/book/edit/:idBook" element={<EditBook />} />
                        <Route path="/loans" element={<Loans />} />
                        <Route path="/loan/create/:idBook" element={<CreateLoan />} />
                    </Routes>
                </div>

            </section>

        </BrowserRouter>
    );
}
