import QuranPage from "./components/quran/page"
import SurahNavigator from "./components/surahNavigator"
import MemorisedAyatTracker from "./memorisedAyatTracker"
import { Box } from "@chakra-ui/react"

function App() {
	return (
		<>
		<Box justifyContent={"center"} display="flex" flexDirection="row" gap={0} >
			<Box w={"100vw"} h={"100vh"} position={"absolute"} zIndex={1} pointerEvents="none" lg={{w: "100%", position: "relative", left: 0, height: "100vh", top: 0}}>
				<SurahNavigator/>
			</Box>
			<QuranPage/>
			
			<MemorisedAyatTracker/>
			{/* <Box w={"100vw"} h={"100vh"} position={"absolute"} zIndex={1} pointerEvents="none" lg={{w: "100%", position: "relative", left: 0, height: "100vh", top: 0}}></Box> */}
		</Box>
		</>
	)
}

export default App
