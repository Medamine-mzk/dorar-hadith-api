require('dotenv').config();

const app = require('./app');
const config = require('./config/config');

const port = process.env.PORT || config.port;

// Only start server in development (local)
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(port, () =>
    console.log(`Server is listening at http://localhost:${port}`),
  );

  // Handle unhandled rejections
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
}

// Export for Vercel serverless functions
module.exports = app;
