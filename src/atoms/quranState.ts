import { atom } from "jotai";
import type { PageType } from "../types/quranPage";

export const currentQuranPageAtom = atom<PageType>({
    pageNumber: 1,
    surahNumber: 1,
    surahName: "الفاتحة",
    ayahs: [
        {
            ayahNumber: 1,
            arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
            latinText: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        },
        {
            ayahNumber: 2,
            arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            latinText: "[All] praise is [due] to Allah, Lord of the worlds -"
        },
        {
            ayahNumber: 3,
            arabicText: "الرَّحْمَـٰنِ الرَّحِيمِ",
            latinText: "The Entirely Merciful, the Especially Merciful,"
        },
        {
            ayahNumber: 4,
            arabicText: "مَالِكِ يَوْمِ الدِّينِ",
            latinText: "Sovereign of the Day of Recompense."
        },
        {
            ayahNumber: 5,
                arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            latinText: "It is You we worship and You we ask for help."
        },
        {
            ayahNumber: 6,
                arabicText: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
            latinText: "Guide us to the straight path -"
        },
        {
            ayahNumber: 7,
                arabicText: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
            latinText: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray."
        }
    ]
});