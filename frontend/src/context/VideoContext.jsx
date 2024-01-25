import React, { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const VideoContext = createContext();

function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsMap, setPlaylistsMap] = useState([]);

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

  const updateVideo = async (id, video) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(video),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update video. ${JSON.stringify(video)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const updateVideos = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos`
      );

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error(`Error fetching videos: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching videos: ${error}`);
    }
  };

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

      await updateVideos();
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

      const addedVideo = await response.json();

      if (video.playlistId) {
        const responseMap = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/playlists_maps`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              playlists_id: video.playlistId,
              videos_id: addedVideo.id,
            }),
          }
        );

        if (!responseMap.ok) {
          throw new Error(
            `Failed to associate video with playlist. ${JSON.stringify(video)}`
          );
        }
      }

      setVideos([...videos, addedVideo]);
      return addedVideo;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const updatePlaylists = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/playlists`
      );

      if (response.ok) {
        const data = await response.json();
        setPlaylists(data);
      } else {
        console.error(`Error fetching playlists: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching playlists: ${error}`);
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
          `Impossible to delete playlist ${playlistId}! Video(s) still linked to it.`
        );
      }

      await updatePlaylists();
    } catch (error) {
      console.error(error.message);
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

      await updatePlaylists();

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const setPlaylistsData = (data) => {
    setPlaylists(data);
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
      updateVideo,
      updateVideos,
      updatePlaylists,
      setPlaylists: setPlaylistsData,
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
