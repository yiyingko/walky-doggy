const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./router');
const port = 3001;
const eventRouter = require('./router/event.router')
const imageRouter = require('./router/image.router')
const recordRouter = require('./router/record.router')
const locationRouter= require('./router/location.router')
const mongoConnection = require('./models/index')

app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/events',eventRouter );
app.use('/images',imageRouter );
app.use('/records',recordRouter );
app.use('/locations',locationRouter)
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});