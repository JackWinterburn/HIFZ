import { AbsoluteCenter, Box, Heading, Card } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"

const floatAnim = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`

const glowAnim = keyframes`
  0%, 100% { text-shadow: 0 0 6px rgba(255, 255, 255, 0.4), 0 0 18px rgba(255, 255, 255, 0.2); }
`

function HifzCard() {
    return (
            <>
                <Box>
                    <AbsoluteCenter>	
                        <Card.Root maxW="sm" overflow="hidden">
                            <Card.Header bgColor="#36827F" pb={3}>
                            <Heading
                                size="6xl"
                                textAlign="center"
                                color="white"
                                animation={`${floatAnim} 4s ease-in-out infinite, ${glowAnim} 3s ease-in-out infinite`}
                                // sx={{ display: "inline-block", willChange: "transform, filter" }}
                            >
                                حفظ
                            </Heading>
                        </Card.Header>
                        <Card.Body gap="2">
                            <Card.Title>HIFZ | Quran Memorisation Calculator</Card.Title>
                            <Card.Description>
                            This web app aims to help people track how much Quran they have memorised.
                            It will be the most accurate way to track your progress Insha'Allah.
                            </Card.Description>
                        </Card.Body>
                        </Card.Root>
                    </AbsoluteCenter>
                </Box>
            </>
        )
}

export default HifzCard;