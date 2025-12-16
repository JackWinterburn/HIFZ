import { atom } from "jotai";
import type { SurahType } from "../types/surah";

export const surahsState = atom<SurahType[]>([]);