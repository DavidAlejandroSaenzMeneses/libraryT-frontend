import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//my components
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Books from '../pages/Books.jsx'

//import Menu from '../components/Menu.jsx';
import Home from '../pages/home/Home.jsx';
import Users from '../pages/User.jsx';
import Loans from '../pages/Loans.jsx';
import CreateLoan from '../pages/CreateLoan.jsx';
import EditBook from '../pages/EditBook.jsx';

export default function Router() {
    return (
        <BrowserRouter>
            
            <section className="flex w-screen h-screen">
                <Sidebar className="left" />
                <div className="right h-full w-full sm:w-3/4 lg:w-5/6 text-center bg-gray-200 container overflow-auto">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/book/edit/:idBook" element={<EditBook />} />
                        <Route path="/loans" element={<Loans />} />
                        <Route path="/loan/create/:idBook" element={<CreateLoan />} />
                    </Routes>
                </div>

            </section>

        </BrowserRouter>
    );
}
