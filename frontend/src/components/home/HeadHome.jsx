import { useContext, useState } from "react";
import { VideoContext } from "../../context/VideoContext";

export default function HeadHome() {
  const { videos } = useContext(VideoContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = () => window.innerWidth <= 768;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, videos.length - 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleVideos = videos.slice(
    currentIndex,
    currentIndex + (isMobile() ? 1 : 3)
  );

  return (
    <div className="head-home">
      <h1>Latest additions this week</h1>
      <section className="section1-home">
        <div className="videos-home">
          <div className="videos-card-home">
            <button type="button" className="carousel" onClick={prevSlide}>
              Prev
            </button>
            {visibleVideos.map((video) => (
              <div
                key={video.id}
                className={video.id === currentIndex ? "active" : "inactive"}
              >
                <h3>{video.title}</h3>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg"
                    alt="Logo YouTube"
                    height="30"
                  />
                </a>{" "}
                <p>{video.description}</p>
              </div>
            ))}
            <button type="button" className="carousel" onClick={nextSlide}>
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
