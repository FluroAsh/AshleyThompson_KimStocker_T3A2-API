const { app, PORT } = require('./server');

// Listen for server running on 'PORT'
app.listen(PORT, () => {
  console.log(`
    Express Server is now running!
    Listening on port ${PORT}
  `);
});
