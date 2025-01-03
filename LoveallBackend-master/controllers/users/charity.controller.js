import { CharityImage, CharityVideo, CharityStory } from "../../models/association.js";

const charity = async (req, res, next) => {
  try {
    console.log("Fetching charity data...");

    const images = await CharityImage.findAll({
      attributes: ['image_id', 'time', 'image', 'description'],
      order: [['time', 'DESC']]
    });
    console.log(`Fetched ${images.length} images`);

    const videos = await CharityVideo.findAll({
      attributes: ['video_id', 'time', 'video', 'description'],
      order: [['time', 'DESC']]
    });
    console.log(`Fetched ${videos.length} videos`);

    const stories = await CharityStory.findAll({
      attributes: ['story_id', 'time', 'story', 'title'],
      order: [['time', 'DESC']]
    });
    console.log(`Fetched ${stories.length} stories`);

    return res.status(200).json({ 
      success: true, 
      data: { 
        images, 
        videos, 
        stories 
      }, 
      error: null 
    });
  } catch (error) {
    console.error("Error in charity controller:", error);
    return res.status(500).json({ 
      success: false, 
      data: null, 
      error: `Internal Server Error: ${error.message}` 
    });
  }
};

export default charity;

