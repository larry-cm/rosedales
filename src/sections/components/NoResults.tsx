import React from 'react';
import { XSquare } from 'react-feather';

const NoResults: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col lg:flex-row col-span-full min-h-screen gap-6">
            <h4 className="text-3xl text-center md:text-5xl xl:text-7xl order-2 lg:order-1">
                No se encontraron
                <b className="text-green-500"> resultados</b>
            </h4>
            <i className="block order-1 lg:order-2">
                <XSquare strokeWidth="1" className="size-16 sm:size-24 lg:size-32" />
            </i>
        </div>
    );
};

export default NoResults;
