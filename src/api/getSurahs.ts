export async function getSurahs() {
    const response = await fetch("http://api.alquran.cloud/v1/meta");
    return response.json();
}