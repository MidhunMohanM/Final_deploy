import { CharityImage, CharityVideo, CharityStory } from "../../models/association.js";
import fs from 'fs/promises';
import path from 'path';

const getCharityData = async (req, res) => {
  try {
    const images = await CharityImage.findAll({
      attributes: ['image_id', 'time', 'image', 'description'],
      order: [['time', 'DESC']]
    });

    const videos = await CharityVideo.findAll({
      attributes: ['video_id', 'time', 'video', 'description'],
      order: [['time', 'DESC']]
    });

    const stories = await CharityStory.findAll({
      attributes: ['story_id', 'time', 'story', 'title'],
      order: [['time', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        images,
        videos,
        stories
      }
    });
  } catch (error) {
    console.error('Error fetching charity data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching charity data',
      error: error.message
    });
  }
};

const updateCharityItem = async (req, res) => {
  const { type, id } = req.params;
  const { description, story, title, keepExisting } = req.body;
  const file = req.file;

  try {
    let model, updateData;
    const keepExistingFile = keepExisting === 'true';

    switch (type) {
      case 'image':
        model = CharityImage;
        updateData = { description };
        if (file && !keepExistingFile) {
          updateData.image = file.filename;
          updateData.time = new Date(); // Update the time when a new image is uploaded
        }
        break;
      case 'video':
        model = CharityVideo;
        updateData = { description };
        if (file && !keepExistingFile) {
          updateData.video = file.filename;
          updateData.time = new Date(); // Update the time when a new video is uploaded
        }
        break;
      case 'story':
        model = CharityStory;
        updateData = { story, title, time: new Date() }; // Always update the time for stories
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid charity type' });
    }

    const item = await model.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Only delete the old file if we're uploading a new one
    if (file && !keepExistingFile && (type === 'image' || type === 'video')) {
      const oldFilePath = path.join(process.cwd(), 'public', 'images', item[type]);
      try {
        await fs.access(oldFilePath);
        await fs.unlink(oldFilePath);
      } catch (err) {
        console.error(`Failed to delete old ${type}:`, err);
        // Continue with update even if file deletion fails
      }
    }

    await item.update(updateData);

    res.json({ 
      success: true, 
      message: 'Item updated successfully',
      data: await item.reload()
    });
  } catch (error) {
    console.error(`Error updating ${type}:`, error);
    res.status(500).json({ 
      success: false, 
      message: `Error updating ${type}`, 
      error: error.message 
    });
  }
};

const deleteCharityItem = async (req, res) => {
  const { type, id } = req.params;

  try {
    let model;

    switch (type) {
      case 'image':
        model = CharityImage;
        break;
      case 'video':
        model = CharityVideo;
        break;
      case 'story':
        model = CharityStory;
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid charity type' });
    }

    const item = await model.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Delete the file if it's an image or video
    if (type === 'image' || type === 'video') {
      const filePath = path.join(process.cwd(), 'public', 'images', item[type]);
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (err) {
        console.error(`Failed to delete ${type} file:`, err);
        // Continue with deletion even if file removal fails
      }
    }

    await item.destroy();

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ${type}:`, error);
    res.status(500).json({ 
      success: false, 
      message: `Error deleting ${type}`, 
      error: error.message 
    });
  }
};

export { getCharityData, updateCharityItem, deleteCharityItem };

