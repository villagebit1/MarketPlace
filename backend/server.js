const app = require('./app');
const mongoConnect = require('./util/database').mongoConnect;

const port = 4000;

mongoConnect(() => {
    app.listen(port);
    console.log(`Server running on port ${port}`);
})