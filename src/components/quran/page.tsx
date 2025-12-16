import { Box, Heading, Card, Button, Flex } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { currentQuranPageAtom } from "@/atoms/quranState";
import { currentSurahAtom, showSurahNavigatorAtom } from "@/atoms/surahNavigatorState";
import { surahsState } from "@/atoms/surahsState";
import Ayah from "./ayah";

function QuranPage() {
    const [currentQuranPage, ] = useAtom(currentQuranPageAtom);
    const [currentSurah, ] = useAtom(currentSurahAtom);
    const [showSurahNavigator, setShowSurahNavigator] = useAtom(
        showSurahNavigatorAtom
    );
    const [surahs, ] = useAtom(surahsState);
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
                    <Heading size="4xl">{surahs.find(surah => surah.number === currentSurah)?.name}</Heading>

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
                    {currentQuranPage.ayahs.map((ayah) => (
                        <Ayah
                            key={ayah.ayahNumber}
                            arabicText={ayah.arabicText}
                            latinText={ayah.latinText}
                            ayahNumber={ayah.ayahNumber}
                        />
                    ))}
                </Card.Body>

                <Card.Footer></Card.Footer>
            </Card.Root>
        </Box>
    );
}

export default QuranPage;
