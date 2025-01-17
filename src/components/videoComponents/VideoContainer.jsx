import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { toggleMenuTrue } from "../../utils/toggleSlice";
import { addVideos } from "../../utils/videos.slice";
import { useDispatch, useSelector } from "react-redux";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.videos);

  const getData = async () => {
    try {
      const response = await axios.get("/api/videos/allVideos");
      if (response?.data?.data?.length > 0) {
        dispatch(addVideos(response?.data?.data));
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    dispatch(toggleMenuTrue());
    if (!videos) {
      getData();
    }
  }, [videos]);

  if(!videos || videos?.length === 0 ){
    return (
      <div className="flex justify-center mt-[20vh]">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon className="text-5xl" icon={faVideo} />
          <h1 className="text-2xl font-semibold mt-4">No Videos Available</h1>
          <p className="text-gray-200 mt-3">
            There are no videos here available. Please try to search something else.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden mt-5">
      <div className="flex flex-wrap md:ml-2">
        {videos?.map((video, index) => (
          <div className="" key={video?._id ?? index}>
            <VideoCard index={index} video={video} />
          </div>
        ))}
      </div>
    </div>
  ) 
};

export default VideoContainer;
