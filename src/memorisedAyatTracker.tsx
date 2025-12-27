import { Box } from "@chakra-ui/react";
import { memorisedAyatAtom } from "./atoms/memorisedState";
import { useAtom } from "jotai";

function MemorisedAyatTracker() {
    const [memorisedAyat, ] = useAtom(memorisedAyatAtom);

    return (
        <Box w="100%" h="100vh">
            {/* Memorised Ayat Tracker Component */}
            {Object.entries(memorisedAyat).map(([key, value]) => (
                <Box key={key}>
                    Ayah {key}: {value ? "Memorised" : "Not Memorised"}
                </Box>
            ))}
        </Box>
    )
}

export default MemorisedAyatTracker;