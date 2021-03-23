const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { getAll, createNew, getSingle, update, remove } = require('./controllers/users');

// Enable body parsing for JSON
app.use(express.json());
// Route for /users GET, POST
app.route('/users').get(getAll).post(createNew);
// Route for /users/:id GET, PUT, DELETE
app.route('/users/:id').get(getSingle).put(update).delete(remove);
// Start server
app.listen(port, () => console.log(`Server running in port: ${port}`));
