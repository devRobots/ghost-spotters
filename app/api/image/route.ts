import { shuffle } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const numSpots = searchParams.get("spots");

    if (!numSpots) return new Response(JSON.stringify({
        error: "No spots provided"
    }), { status: 400 });

    cloudinary.config({
        cloud_name: 'devrobot',
        api_key: '658115591999624',
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });

    const scene = Math.floor(1 + (Math.random() * 4));
    const resource = await cloudinary.uploader.upload(
        `public/scenes/scene${scene}.jpg`, { faces: true }
    );

    const { faces } = resource;
    const shuffledFaces = shuffle(faces) as number[][];
    const spots = shuffledFaces.slice(0, parseInt(numSpots!));

    const image = cloudinary.url(resource.public_id, {
        transformation: spots.map(spot => {
            const [x, y, w, h] = spot;
            return { effect: `gen_remove:region_(x_${x};y_${y};w_${w};h_${h})` }
        })
    });

    return new Response(JSON.stringify({ image, spots }), { status: 200 });
}