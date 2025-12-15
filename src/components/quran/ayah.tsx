import { Box, Text, Stack } from "@chakra-ui/react";
import { type AyahType } from "@/types/quranPage";
import { LocaleProvider } from "@chakra-ui/react";

function Ayah({ arabicText, latinText, ayahNumber }: AyahType) {
    return (
    <Box p={4} mb={6} borderBottomWidth={1} transition={"all 0.1s ease"} _hover={{"backgroundColor": "#0000000b", "cursor": "pointer"}}>
        <Stack>
            <Box bgColor={"rgba(90, 90, 90, 0.2)"} maxW={20} textAlign={"center"} borderRadius={5}>
                <Text>{`1:${ayahNumber}`}</Text>
            </Box>

            <LocaleProvider locale="ar-Ar">
                <Box dir="rtl">
                    <Text fontSize={"3xl"}>{arabicText}</Text>
                </Box>
            </LocaleProvider>

            <Box>
                <Text>{latinText}</Text>
            </Box>
        </Stack>
    </Box>
    );
}

export default Ayah;