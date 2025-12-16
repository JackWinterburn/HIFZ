import { type ayahType } from "../types/ayah";

export async function getAyat(surahNumber: number): Promise<Array<ayahType>> {
    let response: any = await fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`);
    response = await response.json();
    let ayat = [];

    for(let i = 0; i < response.totalAyah; i++) {
        ayat.push({
            ayahNumber: i + 1,
            arabicText: response.arabic1[i],
            latinText: response.english[i]
        });
    }

    return ayat;
}