const cron = require('node-cron');
const { deleteUnusedImages } = require('../controllers/image.controller.js');

function startCronJob() {
  cron.schedule('59 23 * * *', async () => {
    console.log('Cron job started at 23:59');

    try {
      await deleteUnusedImages();
      console.log('Cron job finished');
    } catch (err) {
      console.error('Cron job error:', err);
    }
  });

  console.log('Cron job scheduled: will run every day at 23:59');
}

const { getUnusedImages } = require('./db.js');
const { deleteFileS3 } = require('./s3.js');

async function deleteUnusedImagesCron() {
  const unusedImages = await getUnusedImages();
  for (const img of unusedImages) {
    await deleteFileS3(img.location);
    console.log(`Deleted: ${img.location}`);
  }
}

module.exports = { startCronJob };
