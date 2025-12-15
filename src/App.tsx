import { Container } from "./components/Container";
import { MachineContextProvider } from "./context/MachineContextProvider";

function App() {
  return (
    <MachineContextProvider>
      <Container />
    </MachineContextProvider>
  );
}

export default App;
