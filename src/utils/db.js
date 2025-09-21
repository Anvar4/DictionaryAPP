const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const ImageSchema = new mongoose.Schema({
  filename: String,
  used: Boolean,
});

const ImageModel = mongoose.model('Image', ImageSchema);

async function getUnusedImages() {
  try {
    const unusedImages = await ImageModel.find({ used: false });
    return unusedImages.map((img) => ({
      location: `https://s3.twcstorage.ru/${process.env.AWS_BUCKET_NAME}/dictionary/${img.filename}`,
    }));
  } catch (err) {
    console.error(' Error fetching unused images from DB:', err);
    return [];
  }
}

module.exports = { getUnusedImages };
