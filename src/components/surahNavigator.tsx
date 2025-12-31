import { useLayoutEffect } from "react";
import { getSurahs } from "@/api/getSurahs";
import { surahsState } from "@/atoms/surahsState";
import { currentSurahAtom, showSurahNavigatorAtom, surahCheckboxesAtom } from "@/atoms/surahNavigatorState";
import { memorisedAyatAtom } from "@/atoms/memorisedState";
import { useAtom } from "jotai";
import { Box, Button, Flex, Heading, Stack, Text, Checkbox } from "@chakra-ui/react";
import { getAyat } from "@/api/getAyat";

function SurahNavigator() {
    const [surahs, setSurahs] = useAtom(surahsState);
    const [surahCheckboxes, setSurahCheckboxes] = useAtom(surahCheckboxesAtom);
    const [, setMemorisedAyat] = useAtom(memorisedAyatAtom);
    const [showSurahNavigator, setShowSurahNavigator] = useAtom(
        showSurahNavigatorAtom
    );
    const [currentSurah, setCurrentSurah] = useAtom(currentSurahAtom);

    const setAllAyatAsMemorisedInSurah = async (surahNum: number) => {
        const response = await getAyat(surahNum);
        setMemorisedAyat((prev) => {
            const updated = {...prev};
            response.forEach((ayah: any) => {
                updated[`${surahNum}:${ayah.ayahNumber}`] = {
                    surahNumber: surahNum,
                    ayahNumber: ayah.ayahNumber,
                    arabicText: ayah.arabicText
                };
            });

            return updated;
        })
    }

    useLayoutEffect(() => {
        async function loadSurahs() {
            const response = await getSurahs();
            let s = response;
            s.forEach((surah: any, idx: number) => {
                surah.number = idx + 1;
            })
            setSurahs(s);
        }
        loadSurahs();
    }, []);

    // console.log(Array.from({ length: surahs[0].totalAyah }, (_, i) => `${surahs[0].number}:${i + 1}`));

    return (
        <Box
            w={{ base: "100vw" }}
            h="100vh"
            overflowY="scroll"
            bgColor={"whiteAlpha.700"}
            backdropFilter={"blur(10px)"}
            display={showSurahNavigator ? "block" : "none"}
            pointerEvents={showSurahNavigator ? "auto" : "none"}
            zIndex={2}
            position={{ base: "absolute", lg: "relative" }}
            lg={{
                w: "100%",
                display: "block",
                pointerEvents: "auto",
                bgColor: "Background",
                backdropFilter: "none",
            }}
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                borderBottomWidth={1}
                p={"1.4rem"}
                zIndex={3}
                position="sticky"
                top={0}
                bgColor={"Background"}
                boxShadow={"0px 8px 14px #0000001a"}
                lg={{ bgColor: "whiteAlpha.700", backdropFilter: "blur(10px)" }}
            >
                <Button
                    variant={"surface"}
                    lg={{ display: "none" }}
                    onClick={() => setShowSurahNavigator(!showSurahNavigator)}
                >
                    Return
                </Button>
                <Heading size="2xl">Surahs</Heading>
                <Heading size="2xl" opacity={0} lg={{ display: "none" }}>
                    Surahs
                </Heading>
            </Flex>
            <Stack gap={0}>
                {surahs.map((surah, idx) => (
                    <Box
                        key={idx}
                        p={6}
                        h="100%"
                        borderBottomWidth={1}
                        transition={"all 0.1s ease"}
                        bgColor={currentSurah === surah.number ? "#00000010" : "transparent"}
                        onClick={() => {
                            if(surah.number !== currentSurah){ 
                                setCurrentSurah(surah.number)
                                setShowSurahNavigator(false)
                            }
                        }}
                        _hover={{
                            backgroundColor: "#0000000b",
                            cursor: "pointer",
                        }}
                    >
                        <Flex
                            flexDir={"row"}
                            gapX={2}
                        >
                        <Checkbox.Root 
                            value={surah.number.toString()} 
                            onClick={(e) => e.stopPropagation()} 
                            onCheckedChange={(e) => {
                                if(e.checked){
                                    setAllAyatAsMemorisedInSurah(surah.number);
                                    setSurahCheckboxes((prev) => ({
                                        ...prev,
                                        [surah.number]: true
                                    }) );
                                } else {
                                    setMemorisedAyat((prev) => {
                                        const updated = {...prev}
                                        const ayatList = Array.from({ length: surah.totalAyah }, (_, i) => `${surah.number}:${i + 1}`)
                                        ayatList.forEach(ayahKey => {
                                            if(updated[ayahKey]) {
                                                delete updated[ayahKey];
                                            }
                                        })
                                        return updated;
                                    })
                                    
                                    setSurahCheckboxes((prev) => ({
                                        ...prev,
                                        [surah.number]: false
                                    }) );
                                }
                            }}
                            checked={surahCheckboxes[surah.number]}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control/>
                        </Checkbox.Root>

                        <Text>{surah.number}. {surah.surahName}</Text>
                        </Flex>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default SurahNavigator;
