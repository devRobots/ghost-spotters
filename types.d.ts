interface CloudinaryResource {
    url: string;
    public_id: string;
    faces: number[][];
}

interface ImageDiffAPIResponse {
    original: string;
    transformation: string;
    spots: number[][];
}