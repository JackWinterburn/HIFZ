import { useLayoutEffect, useRef, useState } from "react";
import { Box, Heading, Card, Button, Skeleton, SkeletonText } from "@chakra-ui/react";
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
    const [surahLoading, setSurahLoading] = useState(false);

    const cardRef = useRef<HTMLDivElement | null>(null);

    const loadSurah = async () => {
        const response = await getAyat(currentSurah);
        setAyat(response);
        setSurahLoading(false);
    }
        
    useLayoutEffect(() => {
        setSurahLoading(true);
        // Reset scroll to top immediately when surah changes
        if (cardRef.current) {
            cardRef.current.scrollTop = 0;
        }
        loadSurah();
    }, [currentSurah]);

    return (
        <Box justifyContent={"center"} display="flex">
            <Card.Root
                ref={cardRef}
                h={"100vh"}
                overflowY={"scroll"}
                w={"100vw"}
                lg={{ w: "60vw" }}
            >
                <Card.Header
                    flexDir={"row"}
                    justifyContent={"space-between"}
                    p={"1.4rem"}
                    borderBottomWidth={1}
                    boxShadow={"0px 8px 14px #0000001a"}
                    position="sticky"
                    top={0}
                    bgColor={"whiteAlpha.700"}
                    backdropFilter={"blur(10px)"}
                    zIndex={surahLoading? 0 : 1}
                    display={showSurahNavigator? "none" : "flex"}
                    lg={{ justifyContent: "center", paddingBottom: "1rem"}}
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

                    
                    <Box position="relative" flex={1} display="flex" justifyContent="center" alignItems="center">
                        <Heading
                            size="3xl"
                            lg={{ fontSize: "2.8rem"}}
                        >
                            {surahs.find(surah => surah.number === currentSurah)?.surahNameArabic}
                        </Heading>
                    </Box>

                    {/* Dummy just used for spacing */}
                    <Button
                        opacity={0}
                        _hover={{ cursor: "default" }}
                        lg={{ display: "none" }}
                    >
                        All Surahs
                    </Button>
                </Card.Header>

                <Card.Body pb={10} position="relative">
                    <Box
                        transition="opacity 300ms ease, transform 300ms ease"
                        opacity={surahLoading ? 0 : 1}
                        pointerEvents={surahLoading ? "none" : "auto"}
                    >
                        {ayat.map((ayah: ayahType) => (
                            <Ayah
                                key={ayah.ayahNumber}
                                arabicText={ayah.arabicText}
                                latinText={ayah.latinText}
                                ayahNumber={ayah.ayahNumber}
                                surahNumber={currentSurah}
                            />
                        ))}
                    </Box>

                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        transition="opacity 300ms ease, transform 300ms ease"
                        opacity={surahLoading ? 1 : 0}
                        pointerEvents={surahLoading ? "auto" : "none"}
                    >
                        {[1,2,3,4,5].map((_, idx) => (
                            <Skeleton key={idx} m={7}  h={140} p={4} mb={6} borderRadius={"none"} />
                        ))}
                    </Box>
                </Card.Body>

                <Card.Footer></Card.Footer>
            </Card.Root>
        </Box>
    )
}

export default QuranPage;
