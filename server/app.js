import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import './config';

const PORT = process.env.PORT || 2000;
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routing
app.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: "I am alive at this port"
  })
});
app.use('/v1', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
