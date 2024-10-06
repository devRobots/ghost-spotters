import { shuffle } from "@/lib/utils";

export async function getImages(numImages: number): Promise<string[]> {
    const response = await fetch("/api/image")
    const data = await response.json();
    const shuffled = shuffle(data);
    const images = shuffled.splice(0, numImages);
    return images;
}