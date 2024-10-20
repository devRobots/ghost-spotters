import { NUM_SPOTS } from "@/consts";
import { shuffle } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const seed = parseFloat(searchParams.get("seed")!);

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });

    const numScene = Math.round(Math.random() * seed * 4);
    const scene = `scene${numScene}`;

    const imageData = await cloudinary.api.resource(scene, { faces: true });
    const { faces } = imageData;
    const spots = shuffle(faces).slice(0, NUM_SPOTS) as number[][];

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