import React from 'react';
import { BookOpenIcon } from '@heroicons/react/outline';

export default function Logo(props) {
    return (
        <div className="w-full logo flex items-center justify-center">
            <div className="block py-2">
                <div className="flex justify-center">
                    <BookOpenIcon className="h-8 w-8 text-indigo-500" />
                </div>
                <div className="Name flex relative -top-3">
                    <h6 className={"font-bold flex text-md lg:text-xl text-cyan-600 -top-2"} >Libr</h6>
                    <h6 className={"font-bold flex text-md lg:text-xl text-blue-600 "} >aryT</h6>
                </div>
            </div>
        </div>
    )
}
