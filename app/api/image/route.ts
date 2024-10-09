import { shuffle } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const numSpots = searchParams.get("spots");

    // if no numSpots is provided, return error
    if (!numSpots) return new Response(JSON.stringify({
        error: "No spots provided"
    }), { status: 400 });

    cloudinary.config({
        cloud_name: 'devrobot',
        api_key: '658115591999624',
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });

    const img1 = await cloudinary.uploader.upload(
        "public/scenes/scene1.jpg", { faces: true }
    );
    const resourceFetch = [img1];
    const resources = shuffle(resourceFetch).slice(0, 3)

    const result = resources.map((resource: CloudinaryResource) => {
        const { faces } = resource;
        const shuffledFaces = shuffle(faces) as number[][];
        const spots = shuffledFaces.slice(0, parseInt(numSpots!));

        const transformation = cloudinary.url(resource.public_id, {
            transformation: spots.map(spot => {
                const [x, y, w, h] = spot;
                return { effect: `gen_remove:region_(x_${x};y_${y};w_${w};h_${h})` }
            })
        });

        return {
            original: resource.url,
            transformation,
            spots
        }
    });

    return new Response(JSON.stringify(result), { status: 200 });
}