const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const User = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://mernTestadmin:mernTestadmin@unc-bc-merntest-cluster.4q8ii.mongodb.net/dubosews_C18?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

mongoose.set('debug', true);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
