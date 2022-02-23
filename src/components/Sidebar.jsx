import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpenIcon, UsersIcon, ClipboardListIcon } from '@heroicons/react/outline';

//my components
import Logo from './Logo.jsx';

export default function Sidebar() {
    return (
        <aside className="left hidden  sm:block h-full w-1/12 sm:w-1/5 lg:w-1/6 sidebar bg-gradient-to-r from-indigo-600 to-blue-400 container">
            <div className="flex bg-white w-full h-14 items-center">
                <Logo styleText="text-white" styleIcon="text-white" />
            </div>
            <div className="menu flex py-6 w-full h-4/5 pl-6">
                <div className="option-list block w-full my-4">
                    <ul className="block w-full">
                        <li className="item1 item-menu group">
                            <NavLink to="/books" className="flex">
                                <div className="item-menu-container">
                                    <BookOpenIcon className="item-menu-icon" />
                                </div>
                                <p className="item-menu-text">Libros</p>
                            </NavLink>
                        </li>
                        <li className="item3 item-menu group">
                            <NavLink to="/users" className="flex">
                                <div className="item-menu-container">
                                    <UsersIcon className="item-menu-icon" />
                                </div>
                                <p className="item-menu-text">Usuarios</p>
                            </NavLink>
                        </li>
                        <li className="item2 item-menu group">
                            <NavLink to="/loans" className="flex">
                                <div className="item-menu-container rounded-br-lg">
                                    <ClipboardListIcon className="item-menu-icon" />
                                </div>
                                <p className="item-menu-text">Historial Prestamos</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}
