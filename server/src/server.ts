import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { videoInfoRouter } from './routes/videoInfo';
import downloadRouter from './routes/download';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(express.json());

// Routes
app.use('/api/video-info', videoInfoRouter);
app.use('/api/download', downloadRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 