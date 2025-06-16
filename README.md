# YouTube Video Downloader

A modern web application for downloading YouTube videos in various formats.

## Features

- Paste YouTube URL and preview video information
- Download videos in different qualities (360p, 720p, 1080p)
- Download audio in MP3 format
- Modern UI with Tailwind CSS
- TypeScript support
- Secure backend with Express

## Tech Stack

### Frontend
- React with TypeScript
- Vite
- Tailwind CSS
- Axios
- Radix UI components

### Backend
- Node.js with Express
- TypeScript
- youtube-dl-exec
- CORS and Helmet for security

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Paste a YouTube URL in the input field
3. Click "Get Info" to preview the video
4. Select your desired format
5. Click "Download" to save the video/audio

## Development

### Frontend
- The frontend runs on port 3000
- Uses Vite for fast development
- Hot module replacement enabled

### Backend
- The backend runs on port 5000
- Uses ts-node-dev for development
- API endpoints:
  - GET `/api/video-info?url=...` - Get video information
  - POST `/api/download` - Download video/audio

## Deployment

### Frontend
The frontend can be deployed to Vercel:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`

### Backend
The backend can be deployed to Render, Railway, or Fly.io:
1. Push your code to GitHub
2. Create a new service on your chosen platform
3. Configure environment variables
4. Set build command: `cd server && npm install && npm run build`
5. Set start command: `cd server && npm start`

## License

This project is for educational purposes only. Please respect YouTube's terms of service and copyright laws.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 