import { NUM_SPOTS } from "@/consts";
import { v2 as cloudinary } from "cloudinary";


export async function GET() {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });

    const numScene = Math.round(Math.random() * 4);
    const scene = `scene${numScene}`;

    const imageData = await cloudinary.api.resource(scene, { faces: true });
    const { faces } = imageData;
    const spots = faces.splice(faces.length - NUM_SPOTS);

    const transformation = [];
    spots.forEach((faceBounds: number[], index: number) => {
        const ghost = `ghost${index}`
        const [x, y, w, h] = faceBounds;
        transformation.push({
            overlay: ghost,
            width: w, height: h,
            x: x, y: y,
            gravity: "north_west",
            effect: 'blur:50',
            opacity: 90
        });
    });

    transformation.push({ effect: 'enhance' });
    transformation.push({ effect: 'gen_restore' });
    transformation.push({ effect: 'art:incognito' });
    const image = cloudinary.url(scene, { transformation })

    return new Response(JSON.stringify({ image, spots }), { status: 200 });
}