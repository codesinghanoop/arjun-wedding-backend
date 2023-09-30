import express from 'express';
import 'dotenv/config';
import path from 'path';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import commentRoutes from './routes/commentRoutes.js';
import RateLimit from 'express-rate-limit';
import morgan from 'morgan';

// TODO: See how to getComments with all details instead of IDs in replies... change queries = add aggregations

const __dirname = path.resolve();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

// TODO: Changer * par l'url du deployment du backend
// * to avoid CORS issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

// * Body parser middlewares
app.use(express.urlencoded({ extended: true })); // for input values to be encoded
app.use(express.json());

app.use('/api/', commentRoutes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server started on port ' + port));


