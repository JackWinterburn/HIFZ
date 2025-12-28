import QuranPage from "./components/quran/page";
import SurahNavigator from "./components/surahNavigator";
// import MemorisedToast from "./memorisedToast"
import MemorisedAyatTracker from "./memorisedAyatTracker";
import { Box, Button, CloseButton, Dialog, Portal, Progress } from "@chakra-ui/react";
import { memorisedAyatAtom } from "./atoms/memorisedState";
import { useAtom } from "jotai";

function App() {
    const [memorisedAyat, ] = useAtom(memorisedAyatAtom);

    const countWordsMemorised = () => {
        let words = 0;
        Object.entries(memorisedAyat).forEach(([ , value]: [string, any]) => {
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
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button
                        position="fixed"
                        bottom={{ base: "1rem", md: "1.5rem" }}
                        right={{ base: "1rem", md: "1.5rem" }}
                        variant={"outline"}
                        zIndex={9999}
                        pointerEvents="auto"
                        boxShadow="lg"
                        size="lg"
                        aria-label="Calculate"
                    >
                        Calculate
                    </Button>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />

                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Hifz Calc</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <p>
                                    You have memorised{" "}
                                    {Object.entries(memorisedAyat).length} out
                                    of 6,236 ayat.
                                </p>
                                <p>
									That's {countWordsMemorised()} out of 82,011 words/word parts.
								</p>
                                <p>
                                    This is{" "}
                                    {(
                                        (countWordsMemorised() / 82011) *
                                        100
                                    ).toFixed(3)}
                                    % of the Quran.
                                </p>
								<Progress.Root value={(countWordsMemorised() / 82011) * 100} colorPalette={"green"} striped animated>
								<Progress.Track>
									<Progress.Range/>
								</Progress.Track>
								<Progress.Label />
								</Progress.Root>
                            </Dialog.Body>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

export default App;
