/// <reference types="astro/client" />


// Si usas import.meta.env con claves personalizadas, puedes declarar el tipo aquí
interface ImportMetaEnv {
    TURSO_AUTH_TOKEN: string
    TURSO_DATABASE_URL: string
    PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    SITE_URL?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }
declare namespace NodeJS {
    interface ProcessEnv {
        TURSO_AUTH_TOKEN: string;
        TURSO_DATABASE_URL: string;
        PUBLIC_CLOUDINARY_CLOUD_NAME: string;
        SITE_URL?: string;
    }
}