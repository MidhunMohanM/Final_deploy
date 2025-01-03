import { CharityImage, CharityVideo, CharityStory } from "../../models/association.js";
import fs from 'fs/promises';
import path from 'path';

const addCharityContent = async (req, res) => {
  const { type } = req.params;
  const { description, story, title } = req.body;
  const file = req.file;

  try {
    let newItem;

    switch (type) {
      case 'image':
        if (!file) {
          return res.status(400).json({ success: false, message: 'No image file uploaded' });
        }
        newItem = await CharityImage.create({
          image: file.filename,
          description,
          time: new Date()
        });
        break;
      case 'video':
        if (!file) {
          return res.status(400).json({ success: false, message: 'No video file uploaded' });
        }
        newItem = await CharityVideo.create({
          video: file.filename,
          description,
          time: new Date()
        });
        break;
      case 'story':
        if (!title || !story) {
          return res.status(400).json({ success: false, message: 'Title and story are required' });
        }
        newItem = await CharityStory.create({
          title,
          story,
          time: new Date()
        });
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid charity type' });
    }

    res.status(201).json({ 
      success: true, 
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
      data: newItem
    });
  } catch (error) {
    console.error(`Error adding ${type}:`, error);
    
    // If a file was uploaded but an error occurred, delete the file
    if (file) {
      const filePath = path.join(process.cwd(), 'public', 'images', file.filename);
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error deleting file after failed upload:', unlinkError);
      }
    }

    res.status(500).json({ 
      success: false, 
      message: `Error adding ${type}`, 
      error: error.message 
    });
  }
};

export { addCharityContent };

