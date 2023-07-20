const express = require('express');
const app = express();
const port = 3005;
const router = express.Router();
const authRoutes = require('../server/routes/auth');
const cors = require('cors');

router.use(cors({
  origin: 'http://localhost:3000',
}));


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
