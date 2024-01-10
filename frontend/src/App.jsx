import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "./styles/App.scss";

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
