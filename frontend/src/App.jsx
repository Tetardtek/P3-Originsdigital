import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "./styles/App.scss";

export default function App() {
  return (
    <>
      <NavBar />
      <div>
        <Home />
      </div>
    </>
  );
}
