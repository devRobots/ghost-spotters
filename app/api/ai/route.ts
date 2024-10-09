import { shuffle } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
    const formData = await request.formData();
    const image = formData.get("image") as string;
    const numSpots = formData.get("numSpots") as string;

    cloudinary.config({
        cloud_name: 'devrobot',
        api_key: '658115591999624',
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });

    const uploadedImage = await cloudinary.uploader.upload(
        image!, { faces: true }
    );

    const { coordinates } = uploadedImage;
    const { faces } = coordinates;
    const shuffledFaces = shuffle(faces) as number[][];
    const spots = shuffledFaces.slice(0, parseInt(numSpots!));

    const result = cloudinary.url(uploadedImage.public_id, {
        transformation: spots.map(spot => {
            const [x, y, w, h] = spot;
            return { effect: `gen_remove:region_(x_${x};y_${y};w_${w};h_${h})` }
        })
    });
    return new Response(JSON.stringify({
        image: result,
        spots
    }), { status: 200 });
}