import { Box, Heading, Card } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { currentQuranPageAtom } from "@/atoms/quranState";
import Ayah from "./ayah";

function QuranPage() {
  const [currentQuranPage, _] = useAtom(currentQuranPageAtom);

  return (
    <Box justifyContent={"center"} display="flex">
      <Card.Root h={"100vh"} overflowY="scroll" maxW={"800px"}>
        <Card.Header alignItems="center" pb={4} borderBottomWidth={1} boxShadow={"0px 8px 14px #0000001a"} position="sticky" top={0} bgColor={"whiteAlpha.700"} backdropFilter={"blur(10px)"}>
          <Heading size="4xl">{currentQuranPage.surahName}</Heading>
        </Card.Header>

        {/* <Box alignItems="center" pb={4} borderBottomWidth={1} boxShadow={"0px 8px 14px #000000"} position="sticky" top={0}>
          <Heading size="3xl">{currentQuranPage.surahName}</Heading>
        </Box> */}

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
