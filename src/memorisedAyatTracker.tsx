import { Box, VStack, Heading, Flex, Text } from "@chakra-ui/react";
import { memorisedAyatAtom } from "./atoms/memorisedState";
import { useAtom } from "jotai";

function MemorisedAyatTracker() {
    const [memorisedAyat, ] = useAtom(memorisedAyatAtom);

    return (
        <VStack w="100%" h="100vh" overflowY={"scroll"} top={0}>
            <Flex
                            w="100%"
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
                            <Heading size="2xl">Selected Ayat</Heading>
                            <Heading size="2xl" opacity={0} lg={{ display: "none" }}>
                                Surahs
                            </Heading>
                        </Flex>

            {Object.entries(memorisedAyat).map(([key, value]) => (
                <Box key={key} w={"100%"}
                        p={1}
                        borderBottomWidth={1}
                        textAlign={"center"}
                        transition={"all 0.1s ease"}
                    >
                    <Text>
                        {value.surahNumber}:{value.ayahNumber}
                    </Text>
                    {/* Ayah {key}: {value ? "Memorised" : "Not Memorised"} */}
                </Box>
            ))}
        </VStack>
    )
}

export default MemorisedAyatTracker;