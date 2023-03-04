const express = require('express');
const app = express();
const cors = require('cors')
const eventRouter = require('./router/event.router')
const mongoConnection = require('./models/index')

app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/events',eventRouter )


app.listen(3001, () => {
  console.log("Listening");
});