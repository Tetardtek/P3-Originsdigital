import NavBar from "./components/NavBar";
import "./App.scss";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <NavBar />
      <h1>Origin's Digital</h1>
      <div>
        <Home />
      </div>
    </>
  );
}
