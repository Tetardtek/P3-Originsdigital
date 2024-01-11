import HeadHome from "../components/home/HeadHome";
import MainHome from "../components/home/MainHome";
import PartnersHome from "../components/home/PartnersHome";
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
