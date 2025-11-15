import React from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import type { Row } from "@libsql/client";

interface LocalCardProps {
    local: Row;
    cld: Cloudinary;
}

const LocalCard: React.FC<LocalCardProps> = ({ local, cld }) => {
    const { title, local: localNumber, logo } = local;

    return (
        <a
            key={localNumber?.toString() ?? title?.toString()}
            href={`${title?.toString().toLowerCase().trim().replaceAll(" ", "-")}-${localNumber ?? 'local'}`}
            className="bg-white group/cardLine border border-zinc-300 rounded-xl w-full h-full block shadow-lg px-4 py-2 sm:px-8 sm:py-4 card-hover animate-scale-in"
        >
            <div className="overflow-hidden" >
                <AdvancedImage
                    cldImg={cld.image(logo?.toString())}
                    alt={title?.toString()}
                    className="rounded-xl scale-105 aspect-square min-h-64 bg-white object-contain"
                />
            </div>
            <div className='group-hover/cardLine:w-full sm:w-3xs w-full mx-auto duration-300 h-[1px] bg-zinc-700'></div>
            {
                localNumber?.toString() ? (
                    <p className="text-2xl text-center text-zinc-700 py-2 ">
                        Local <b className='text-zinc-700 group-hover/cardLine:text-green-500  transition duration-300'>{localNumber.toString()}</b>
                    </p>
                ) : (
                    <p className="text-2xl text-center text-zinc-700 py-2">
                        Segundo <b className='text-zinc-700 group-hover/cardLine:text-green-500  transition duration-300'>Piso</b>
                    </p>
                )
            }
        </a>
    );
};

export default LocalCard;
