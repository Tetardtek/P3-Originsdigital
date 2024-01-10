import HeadHome from "../components/HeadHome";
import MainHome from "../components/MainHome";
import PartnersHome from "../components/PartnersHome";
import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <HeadHome />
      <MainHome />
      <PartnersHome />
    </div>
  );
}
