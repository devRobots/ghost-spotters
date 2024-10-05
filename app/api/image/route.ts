export async function GET() {
    const auth = `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`;
    const endpoint = new URL(process.env.UNSPLASH_API_ENDPOINT!);
    endpoint.searchParams.set("query", "crowd");
    endpoint.searchParams.set("page", "1");
    endpoint.searchParams.set("orientation", "landscape");

    const response = await fetch(endpoint, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    });
    const data = await response.json();
    const images = data.results.map(
        (result: UnsplashPhoto) => result.urls.regular
    );

    return new Response(JSON.stringify(images), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}