const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const apiRoutes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { sendError } = require('./utils/response');

const app = express();

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin tidak diizinkan oleh CORS.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files - Uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Mount API Routes
app.use('/api', apiRoutes);

// Catch-all 404 for unknown routes
app.use((req, res) => {
  return sendError(res, 'Endpoint tidak ditemukan.', 404);
});

// Centralized Error Handling
app.use(errorMiddleware);

module.exports = app;
