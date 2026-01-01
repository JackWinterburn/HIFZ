import QuranPage from "./components/quran/page";
import SurahNavigator from "./components/surahNavigator";
// import MemorisedToast from "./memorisedToast"
import MemorisedAyatTracker from "./memorisedAyatTracker";
import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Portal,
    Progress,
    ActionBar,
    Heading,
    Flex,
    Stat,
    HStack,
    Badge,
    FormatNumber,
} from "@chakra-ui/react";
import { memorisedAyatAtom } from "./atoms/memorisedState";
import { surahCheckboxesAtom } from "./atoms/surahNavigatorState";
import { useAtom } from "jotai";

function App() {
    const [memorisedAyat, setMemorisedAyat] = useAtom(memorisedAyatAtom);
    const [_, setSurahCheckboxes] = useAtom(surahCheckboxesAtom);

    const countWordsMemorised = () => {
        let words = 0;
        Object.entries(memorisedAyat).forEach(([, value]: [string, any]) => {
            words += value.arabicText.split(" ").length;
        });

        return words;
    };

    return (
        <>
            {/* <MemorisedToast /> */}
            <Box
                justifyContent={"center"}
                display="flex"
                flexDirection="row"
                gap={0}
            >
                <Box
                    w={"100vw"}
                    h={"100vh"}
                    position={"absolute"}
                    zIndex={1}
                    pointerEvents="none"
                    lg={{
                        w: "100%",
                        position: "relative",
                        left: 0,
                        height: "100vh",
                        top: 0,
                    }}
                >
                    <SurahNavigator />
                </Box>
                <QuranPage />

                <MemorisedAyatTracker />
                {/* <Box w={"100vw"} h={"100vh"} position={"absolute"} zIndex={1} pointerEvents="none" lg={{w: "100%", position: "relative", left: 0, height: "100vh", top: 0}}></Box> */}
            </Box>

            <ActionBar.Root open={true}>
                <Portal>
                    <ActionBar.Positioner>
                        <ActionBar.Content>
                            <ActionBar.SelectionTrigger>
                                {Object.entries(memorisedAyat).length} selected
                            </ActionBar.SelectionTrigger>

                            <ActionBar.Separator />

                            <Dialog.Root size={"cover"}>
                                <Dialog.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        Calculate
                                    </Button>
                                </Dialog.Trigger>

                                <Portal>
                                    <Dialog.Backdrop />

                                    <Dialog.Positioner>
                                        <Dialog.Content overflowY={"scroll"}>
                                            <Dialog.Body
                                                textAlign={"center"}
                                                p={"3rem"}
                                            >
                                                <Heading
                                                    size={"4xl"}
                                                    mb={"1rem"}
                                                >
                                                    You have memorised{" "}
                                                    {/* {Object.entries(memorisedAyat).length} out
                                    of 6,236 ayat. */}
                                                </Heading>
                                                <Heading
                                                    size={"6xl"}
                                                    mb={"1rem"}
                                                >
                                                    {(
                                                        (countWordsMemorised() /
                                                            82011) *
                                                        100
                                                    ).toFixed(3)}
                                                    %
                                                </Heading>
                                                <Progress.Root
                                                    value={
                                                        (countWordsMemorised() /
                                                            82011) *
                                                        100
                                                    }
                                                    colorPalette={"green"}
                                                    maxW={"20rem"}
                                                    mx={"auto"}
                                                    size={"xl"}
                                                    striped
                                                    animated
                                                >
                                                    <Progress.Track>
                                                        <Progress.Range />
                                                    </Progress.Track>
                                                    <Progress.Label />
                                                </Progress.Root>
                                                <Heading
                                                    size={"4xl"}
                                                    mb={"1rem"}
                                                >
                                                    Of the Quran!
                                                </Heading>

                                                <Flex
                                                    maxW={"35rem"}
                                                    justifyContent={
                                                        "space-around"
                                                    }
                                                    mx="auto"
                                                    mb={"1rem"}
                                                    wrap={"wrap"}
                                                >
                                                    <Stat.Root
                                                        maxW="240px"
                                                        minW="210px"
                                                        borderWidth="1px"
                                                        p="4"
                                                        rounded="md"
                                                        m={1}
                                                    >
                                                        <Stat.Label>
                                                            Ayat Memorised
                                                        </Stat.Label>
                                                        <HStack justify="space-around">
                                                            <Stat.ValueText>
                                                                <FormatNumber
                                                                    value={
                                                                        Object.entries(
                                                                            memorisedAyat
                                                                        ).length
                                                                    }
                                                                />
                                                            </Stat.ValueText>

                                                            <Badge
                                                                colorPalette="green"
                                                                gap="0"
                                                            >
                                                                {/* <Stat.UpIndicator /> */}
                                                                <FormatNumber
                                                                    value={
                                                                        6236 -
                                                                        Object.entries(
                                                                            memorisedAyat
                                                                        ).length
                                                                    }
                                                                />{" "}
                                                                to go!
                                                            </Badge>
                                                        </HStack>
                                                    </Stat.Root>

                                                    <Stat.Root
                                                        maxW="240px"
                                                        minW="210px"
                                                        borderWidth="1px"
                                                        p="4"
                                                        rounded="md"
                                                        m={1}
                                                    >
                                                        <Stat.Label>
                                                            Words/Word Parts
                                                            Memorised
                                                        </Stat.Label>
                                                        <HStack justify="space-around">
                                                            <Stat.ValueText>
                                                                <FormatNumber
                                                                    value={countWordsMemorised()}
                                                                />
                                                                {/* {countWordsMemorised()} */}
                                                            </Stat.ValueText>

                                                            <Badge
                                                                colorPalette="green"
                                                                gap="0"
                                                            >
                                                                {/* <Stat.UpIndicator /> */}
                                                                <FormatNumber
                                                                    value={
                                                                        82011 -
                                                                        countWordsMemorised()
                                                                    }
                                                                />{" "}
                                                                to go!
                                                            </Badge>
                                                        </HStack>
                                                    </Stat.Root>
                                                </Flex>
                                            </Dialog.Body>

                                            <Dialog.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>

                            <Button
                                variant="surface"
                                colorPalette="red"
                                size="sm"
                                onClick={() => {
                                    setMemorisedAyat({});
                                    setSurahCheckboxes(
                                        Object.fromEntries(
                                            Array.from(
                                                { length: 114 },
                                                (_, i) => [i + 1, false]
                                            )
                                        )
                                    );
                                }}
                            >
                                Clear ayat
                            </Button>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>
        </>
    );
}

export default App;
