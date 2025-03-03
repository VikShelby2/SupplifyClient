import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, Progress } from "@chakra-ui/react";
import { useMultiStep} from '../../../../hooks/useMultiStep'
import logo from '../../../../assets/public/home/home-logo-purple.svg';


export function MultiStepCard({ children, click }) {
  const steps = React.Children.toArray(children);
  let progress;
  const {
    step,
    isFirstStep,
    isLastStep,
    next,
    skipAll,
    back,
    currentStepIndex,
  } = useMultiStep(steps);

  const handleNext = () => {
    if (isLastStep) {
      click(); // Activate the click prop
    } else {
      next();
    }
  };

  if (currentStepIndex === 0) {
    progress = 10;
  } else if (currentStepIndex === 1) {
    progress = 40;
  } else if (currentStepIndex === 2) {
    progress = 75;
  } else if (currentStepIndex === 3) {
    progress = 87;
  } else {
    progress = 0;
  }
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <Center height="100vh" w="865px">
      <Box
        p="4"
        borderWidth="1px"
        borderRadius="md"
        maxW="865px"
        w="100%"
        maxH="776px"
        h="100%"
        background="white"
        display="flex"
        flexDirection="column"
       
      >
        <Center >
          <div>
            <Heading>
              <img src={logo} height={"100px"} style={{ height: '100px' }} alt="logo" />
            </Heading>
          </div>
        </Center>

        <div style={{ paddingTop: '1rem', paddingRight: '30px', paddingLeft: '30px' }}  >
          <Progress
            value={progress}
            style={{
              width: 'auto'
            }}
            size="sm"
            colorScheme="purple"
            sx={{
              '& > div': {
                transition: 'width 0.5s ease-in-out',
                width: '100%' // Add transition property to inner div
              },
            }}
          />
          <div style={{ display: 'flex', paddingTop: '2rem', justifyContent: 'center' }}>
            {step}
          </div>
        </div>

        <Box
          mt="auto"
          display="flex"
          justifyContent="space-between"
          style={{ paddingLeft: '20px', paddingRight: '40px', position: 'relative', top: '-2rem' }}
        >
          <Box>
            <Button ml="4" style={{ color: '' }} onClick={back} isDisabled={isFirstStep}>
              Back
            </Button>
          </Box>
          <Box>
            <Button ml="4" onClick={skipAll} style={{ color: '' }}>
              Skip All
            </Button>
            <Button ml="4" style={{ background: '#5f5d66', color: 'white' }} onClick={handleNext}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
const fadeInAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    animation: slideFadeIn 6s ease-in-out;
  }
`;

// Inject CSS into the document head
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(fadeInAnimation));
document.head.appendChild(style);