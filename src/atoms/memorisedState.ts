import { atom } from "jotai";

export const memorisedAyatAtom = atom<Record<string, { surahNumber: number, ayahNumber: number, arabicText: string }>>({
    "1:1": {
        surahNumber: 1,
        ayahNumber: 1,
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
    },
    "1:2": {
        surahNumber: 1,
        ayahNumber: 2,
        arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"
    },
    "1:3": {
        surahNumber: 1,
        ayahNumber: 3,
        arabicText: "الرَّحْمَنِ الرَّحِيمِ"
    }
})

