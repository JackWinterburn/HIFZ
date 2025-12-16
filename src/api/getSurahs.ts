export async function getSurahs() {
    const response = await fetch("https://quranapi.pages.dev/api/surah.json");
    return response.json();
}