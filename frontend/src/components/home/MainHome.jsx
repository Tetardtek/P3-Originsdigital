import React, { useContext, useState } from "react";
import { VideoContext } from "../../context/VideoContext";
import { useAuth } from "../../context/AuthContext";

export default function MainHome() {
  const { videos } = useContext(VideoContext);
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, videos.length - 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const filteredVideos = videos.filter((video) =>
    user ? true : video.is_free
  );

  const visibleVideos = filteredVideos.slice(currentIndex, currentIndex + 3);

  return (
    <div className="main-home">
      <h1>Trends of the month</h1>
      <section className="section2-home">
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
