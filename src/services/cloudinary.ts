import { Cloudinary } from "@cloudinary/url-gen";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity"

export const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.PUBLIC_CLOUDINARY_CLOUD_NAME
    }
});