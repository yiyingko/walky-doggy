const express = require('express');
const app = express();
const cors = require('cors')
const eventRouter = require('./router/event.router')
const imageRouter = require('./router/image.router')
const recordRouter = require('./router/record.router')
const mongoConnection = require('./models/index')

app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/events',eventRouter );
app.use('/images',imageRouter );
app.use('/records',recordRouter );

app.listen(3001, () => {
  console.log("Listening");
});