import NavBar from "./components/NavBar";
import "./styles/App.scss";
import Home from "./pages/Home";

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
