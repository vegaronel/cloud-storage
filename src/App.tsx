import { BrowserRouter } from "react-router";
import MainRoute from "./routes/MainRoute";
function App() {
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;
