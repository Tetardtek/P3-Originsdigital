import React, { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const VideoContext = createContext();

function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsMap, setPlaylistsMap] = useState([]);

  const getFilteredVideos = (loggedIn) => {
    if (loggedIn) {
      return videos;
    }
    return videos.filter((video) => video.is_free);
  };

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else if (response.status === 401) {
          setData([]);
        } else {
          console.error(
            `Error fetching data from ${url}: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error}`);
      }
    };

    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/videos`, setVideos);
    fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/api/playlists`,
      setPlaylists
    );
    fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/api/playlists_maps`,
      setPlaylistsMap
    );
  }, []);

  const deleteVideo = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete video. ${id}`);
      }

      setVideos(videos.filter((video) => video.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists/${playlistId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Impossible to delete playlist ${playlistId} ! Video(s) still linked to it.`
        );
      }

      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const addVideo = async (video) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...video,
            is_free: video.isFree ? 1 : 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add video. ${JSON.stringify(video)}`);
      }

      const data = await response.json();
      setVideos([...videos, data]);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const addPlaylist = async (playlist) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlist),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add playlist. ${JSON.stringify(playlist)}`);
      }

      const data = await response.json();
      setPlaylists([...playlists, data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const value = useMemo(
    () => ({
      videos,
      playlists,
      playlistsMap,
      deleteVideo,
      deletePlaylist,
      addVideo,
      addPlaylist,
      getFilteredVideos,
    }),
    [videos, playlists, playlistsMap]
  );

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}

VideoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { VideoContext, VideoProvider };
