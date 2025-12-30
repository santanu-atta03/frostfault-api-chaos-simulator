import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MockApis from "./pages/MockApis";
import CreateMockApi from "./pages/CreateMockApi";
import Logs from "./pages/Logs";
import CreateGraphqlMock from "./pages/CreateGraphqlMock";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mock-apis" element={<MockApis />} />
        <Route path="/create" element={<CreateMockApi />} />
        <Route path="/logs" element={<Logs />} />

        <Route path="/mock/create-graphql" element={<CreateGraphqlMock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
