interface CloudinaryResource {
    url: string;
    public_id: string;
    faces: number[][];
}

interface ImageDiffAPIResponse {
    image: string;
    spots: number[][];
}