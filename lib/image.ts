import { shuffle } from "@/lib/utils";

export async function getImage() {
    const response = await fetch("/api/image")
    const data = await response.json();
    const shuffled = shuffle(data);
    return shuffled[0];
}