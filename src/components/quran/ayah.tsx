import { Box, Text, Stack } from "@chakra-ui/react";
import { type AyahType } from "@/types/quranPage";
import { memorisedAyatAtom } from "@/atoms/memorisedState";
import { LocaleProvider } from "@chakra-ui/react";
import { useAtom } from "jotai";

function Ayah({ arabicText, latinText, ayahNumber, surahNumber }: AyahType) {
    const [memorisedAyat, setMemorisedAyat] = useAtom(memorisedAyatAtom);

    const ayahIsMemorised = (ayahKey: string) => {
        return Object.keys(memorisedAyat).includes(ayahKey);
    };

    const hoverBgColor = ayahIsMemorised(`${surahNumber}:${ayahNumber}`) ? "#a6efb0ff" : "#0000000b";

    return (
        <Box
            p={4}
            mb={6}
            borderBottomWidth={1}
            transition={"all 0.1s ease"}
            bgColor={ayahIsMemorised(`${surahNumber}:${ayahNumber}`) ? "#d3f9d8" :""}
            _hover={{ backgroundColor: hoverBgColor, cursor: "pointer" }}
            onClick={() => {
                if(!Object.keys(memorisedAyat).includes(`${surahNumber}:${ayahNumber}`)) {
                    setMemorisedAyat({...memorisedAyat, [`${surahNumber}:${ayahNumber}`]: {}});
                } else {
                    setMemorisedAyat((prev: any) => {
                        const updated = {...prev};
                        delete updated[`${surahNumber}:${ayahNumber}`];
                        return updated;
                    });
                }
            }}
        >
            <Stack>
                <Box
                    bgColor={"rgba(90, 90, 90, 0.2)"}
                    maxW={20}
                    textAlign={"center"}
                    borderRadius={5}
                >
                    <Text>{`${surahNumber}:${ayahNumber}`}</Text>
                </Box>

                <LocaleProvider locale="ar-Ar">
                    <Box dir="rtl">
                        <Text fontSize={"3xl"}>{arabicText}</Text>
                    </Box>
                </LocaleProvider>

                <Box>
                    <Text>{latinText}</Text>
                </Box>
            </Stack>
        </Box>
    );
}

export default Ayah;
