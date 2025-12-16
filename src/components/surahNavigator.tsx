import { useLayoutEffect } from "react";
import { getSurahs } from "@/api/getSurahs";
import { surahsState } from "@/atoms/surahsState";
import { currentSurahAtom, showSurahNavigatorAtom } from "@/atoms/surahNavigatorState";
import { useAtom } from "jotai";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

function SurahNavigator() {
    const [surahs, setSurahs] = useAtom(surahsState);
    const [showSurahNavigator, setShowSurahNavigator] = useAtom(
        showSurahNavigatorAtom
    );
    const [currentSurah, setCurrentSurah] = useAtom(currentSurahAtom);

    useLayoutEffect(() => {
        async function loadSurahs() {
            const response = await getSurahs();
            console.log(response);
            setSurahs(response.data.surahs.references);
        }
        loadSurahs();
    }, []);

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
                position="sticky"
                top={0}
                bgColor={"Background"}
                boxShadow={"0px 8px 14px #0000001a"}
                lg={{ bgColor: "whiteAlpha.700", backdropFilter: "blur(10px)" }}
            >
                <Heading size="2xl" opacity={0} lg={{ display: "none" }}>
                    Surahs
                </Heading>
                <Heading size="2xl">Surahs</Heading>
                <Button
                    variant={"surface"}
                    lg={{ display: "none" }}
                    onClick={() => setShowSurahNavigator(!showSurahNavigator)}
                >
                    Return
                </Button>
            </Flex>
            <Stack gap={0}>
                {surahs.map((surah, idx) => (
                    <Box
                        key={idx}
                        p={3}
                        h="100%"
                        borderBottomWidth={1}
                        transition={"all 0.1s ease"}
                        bgColor={currentSurah === surah.number ? "#00000010" : "transparent"}
                        onClick={() => {
                            if(surah.number !== currentSurah) setCurrentSurah(surah.number)
                        }}
                        _hover={{
                            backgroundColor: "#0000000b",
                            cursor: "pointer",
                        }}
                    >
                        <Text>{surah.englishName}</Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default SurahNavigator;
