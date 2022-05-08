import logo from './logo.svg';
import './App.css';
import Quiz from "./components/quiz";
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
      <ChakraProvider>
        <Quiz/>
      </ChakraProvider>
  );
}

export default App;
