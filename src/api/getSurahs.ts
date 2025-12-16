export async function getSurahs() {
    const response = await fetch("https://api.alquran.cloud/v1/meta");
    return response.json();
}