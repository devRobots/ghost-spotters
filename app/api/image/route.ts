import sharp from "sharp"
import { Readable } from "stream";
import { NUM_SPOTS } from "@/consts";
import { shuffle } from "@/lib/utils";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

async function uploadStream(buffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((res, rej) => {
        const stream = cloudinary.uploader.upload_stream(
            (err, result) => {
                if (err) rej(err);
                res(result!);
            }
        );
        const str = Readable.from(buffer);
        str.pipe(stream);
    });
}

export async function GET() {
    cloudinary.config({
        cloud_name: 'devrobot',
        api_key: '658115591999624',
        api_secret: process.env.CLOUDINARY_API_SECRET!
    });

    const numScene = Math.floor(1 + (Math.random() * 4));
    const scene = `public/scenes/scene${numScene}.jpg`;
    const resource = await cloudinary.uploader.upload(scene, { faces: true });

    const { faces } = resource;
    const shuffledFaces = shuffle(faces) as number[][];
    const spots = shuffledFaces.slice(0, NUM_SPOTS);

    const ghosts = [];
    for (let index = 0; index < spots.length; index++) {
        const [x, y, w, h] = spots[index];
        const ghost = sharp(`public/ghosts/ghost-${index}.webp`).resize(w, h)
        const ghostOverlay = await ghost.toBuffer()
        ghosts.push({
            input: ghostOverlay, top: y, left: x
        })
    }
    const composition = sharp(scene).composite(ghosts);

    const imageUpload = await composition.toBuffer()
    const upload = await uploadStream(imageUpload);
    const image = cloudinary.url(upload.public_id, {
        transformation: [
            { effect: 'gen_restore' },
            { effect: 'art:incognito' }
        ],
        quality: "auto"
    })

    return new Response(JSON.stringify({ image, spots }), { status: 200 });
}