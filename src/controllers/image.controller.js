const { HttpException } = require('../utils/http-exception.js');
const { getUnusedImages } = require('../utils/db.js');
const { deleteFileS3 } = require('../utils/s3.js');

async function deleteUnusedImages(req, res, next) {
  try {
    const unusedImages = await getUnusedImages();

    if (!unusedImages.length) {
      throw new HttpException(404, "O'chiriladigan ishlatilmayotgan rasm topilmadi");
    }

    for (const img of unusedImages) {
      await deleteFileS3(img.location);
      console.log(` Deleted: ${img.location}`);
    }

    res.status(200).json({
      success: true,
      msg: `${unusedImages.length} ta ishlatilmayotgan rasm o'chirildi`,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { deleteUnusedImages };
