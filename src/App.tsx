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

                           
                     <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button variant="outline" size="sm">
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
                                    That's {countWordsMemorised()} out of 82,011
                                    words/word parts.
                                </p>
                                <p>
                                    This is{" "}
                                    {(
                                        (countWordsMemorised() / 82011) *
                                        100
                                    ).toFixed(3)}
                                    % of the Quran.
                                </p>
                                <Progress.Root
                                    value={
                                        (countWordsMemorised() / 82011) * 100
                                    }
                                    colorPalette={"green"}
                                    striped
                                    animated
                                >
                                    <Progress.Track>
                                        <Progress.Range />
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
