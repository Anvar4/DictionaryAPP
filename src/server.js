const express = require('express');
const cors = require('cors');
const { PORT } = require('./utils/secret.js');
const main_router = require('./routes/index.js');
const errorMiddleware = require('./middleware/error.middleware.js');
const { startCronJob } = require('./utils/cron-job.js');
const ConnectDB = require('./utils/config.database.js');

ConnectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: false, 
  })
);


startCronJob();

app.get('/', (req, res) => res.json({ success: true, msg: 'Server ishlayapti ✅' }));

main_router.forEach((r) => app.use(r.path, r.router));

app.use(errorMiddleware);

app.use((req, res) => res.status(404).json({ success: false, msg: 'Route not found' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
