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
            href={`${title?.toString().toLowerCase().trim().replaceAll(" ", "-")}-${localNumber}`}
            className="bg-white rounded-xl w-full h-full block shadow-lg px-4 py-2 sm:px-8 sm:py-4 card-hover animate-scale-in"
        >
            <div className="overflow-hidden">
                <AdvancedImage
                    cldImg={cld.image(logo?.toString())}
                    alt={title?.toString()}
                    className="rounded-xl scale-105 aspect-square bg-white object-contain"
                />
            </div>
            <hr />
            {
                localNumber?.toString() ? (
                    <p className="text-2xl text-center text-zinc-700 py-2">
                        Local <b>{localNumber.toString()}</b>
                    </p>
                ) : (
                    <p className="text-2xl text-center text-zinc-700 py-2">
                        Segundo <b>Piso</b>
                    </p>
                )
            }
        </a>
    );
};

export default LocalCard;
