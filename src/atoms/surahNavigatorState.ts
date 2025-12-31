import { atom } from "jotai";

export const showSurahNavigatorAtom = atom(false);
export const currentSurahAtom = atom<number>(1);

const initialSurahCheckboxes: Record<number, boolean> = Object.fromEntries(
  Array.from({ length: 114 }, (_, i) => [i + 1, false])
) as unknown as Record<number, boolean>;

export const surahCheckboxesAtom = atom<Record<number, boolean>>(initialSurahCheckboxes);