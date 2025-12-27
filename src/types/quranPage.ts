export type AyahType = {
    ayahNumber: number;
    arabicText: string;
    latinText: string;
    surahNumber: number;
}

export type PageType = {
    pageNumber: number;
    surahNumber: number;
    surahName: string;
    ayahs: AyahType[];
}