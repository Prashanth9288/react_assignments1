import { Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import FeedbackForm from "./features/feedback/FeedbackForm";
import FeedbackList from "./features/feedback/FeedbackList";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Container maxW="4xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" color="teal.500">
          Advanced Feedback System
        </Heading>
      </Box>

      <Tabs variant="enclosed" colorScheme="teal" isFitted>
        <TabList mb="1em">
          <Tab>Submit Feedback</Tab>
          <Tab>View Feedback</Tab>
          <Tab>Dashboard</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FeedbackForm />
          </TabPanel>
          <TabPanel>
            <FeedbackList />
          </TabPanel>
          <TabPanel>
            <Dashboard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default App;
