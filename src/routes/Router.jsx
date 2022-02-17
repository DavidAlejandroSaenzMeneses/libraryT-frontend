import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//my components
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Home from '../pages/home/Home.jsx';
import Balance from '../pages/balance/Balance.jsx';



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
                        <Route path="/balance" element={<Balance />} />
                    </Routes>
                </div>

            </section>

        </BrowserRouter>
    );
}
