export async function GET() {
    const endpoint = new URL(process.env.PIXABAY_API_ENDPOINT!);

    const page = Math.floor(Math.random() * 15);
    endpoint.searchParams.set("per_page", "3");
    endpoint.searchParams.set("page", `${page}`);
    endpoint.searchParams.set("q", "crowd people");
    endpoint.searchParams.set("image_type", "photo");
    endpoint.searchParams.set("orientation", "horizontal");
    endpoint.searchParams.set("key", process.env.PIXABAY_API_KEY!);

    const response = await fetch(endpoint, {
        headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    const images = data.hits.map(
        (result: PixabayImage) => result.largeImageURL
    );

    return new Response(JSON.stringify(images), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}