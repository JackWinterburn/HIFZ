import { useLayoutEffect } from "react";
import { Box, Heading, Card, Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { currentSurahAtom, showSurahNavigatorAtom } from "@/atoms/surahNavigatorState";
import { surahsState } from "@/atoms/surahsState";
import { ayatAtom } from "@/atoms/ayatState";
import { getAyat } from "@/api/getAyat";
import Ayah from "./ayah";
import type { ayahType } from "@/types/ayah";

function QuranPage() {
    const [currentSurah, ] = useAtom(currentSurahAtom);
    const [showSurahNavigator, setShowSurahNavigator] = useAtom(
        showSurahNavigatorAtom
    );
    const [surahs, ] = useAtom(surahsState);
    const [ayat, setAyat] = useAtom(ayatAtom);

    const loadSurah = async () => {
        const response = await getAyat(currentSurah);
        setAyat(response);
    }
        
    useLayoutEffect(() => {
        loadSurah();
    }, [currentSurah]);

    console.log(ayat);

    return (
        <Box justifyContent={"center"} display="flex">
            <Card.Root
                h={"100vh"}
                overflowY="scroll"
                w={"100vw"}
                lg={{ w: "50rem" }}
            >
                <Card.Header
                    display={"flex"}
                    flexDir={"row"}
                    justifyContent={"space-between"}
                    p={"1rem"}
                    borderBottomWidth={1}
                    boxShadow={"0px 8px 14px #0000001a"}
                    position="sticky"
                    top={0}
                    bgColor={"whiteAlpha.700"}
                    backdropFilter={"blur(10px)"}
                    lg={{ justifyContent: "center" }}
                >
                    <Button
                        variant={"surface"}
                        lg={{ display: "none" }}
                        onClick={() =>
                            setShowSurahNavigator(!showSurahNavigator)
                        }
                    >
                        All Surahs
                    </Button>
                    <Heading size="4xl">{surahs.find(surah => surah.number === currentSurah)?.surahNameArabic}</Heading>

                    {/* Dummy just used for spacing */}
                    <Button
                        opacity={0}
                        _hover={{ cursor: "default" }}
                        lg={{ display: "none" }}
                    >
                        All Surahs
                    </Button>
                </Card.Header>

                <Card.Body>
                    {ayat.map((ayah: ayahType) => (
                        <Ayah
                            key={ayah.ayahNumber}
                            arabicText={ayah.arabicText}
                            latinText={ayah.latinText}
                            ayahNumber={ayah.ayahNumber}
                            surahNumber={currentSurah}
                        />
                    ))}
                </Card.Body>

                <Card.Footer></Card.Footer>
            </Card.Root>
        </Box>
    );
}

export default QuranPage;
