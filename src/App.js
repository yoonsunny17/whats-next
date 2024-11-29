import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { MovieDetail } from "./routes/MovieDetail";
import "../src/index.css";
import { Layout } from "./components/Layouts/Layout";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <MovieProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
