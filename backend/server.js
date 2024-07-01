import express from 'express';
import colors from 'colors';
import {connectDB} from './config/db.js'
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/error.js';
import { notFound } from './middleware/notFound.js';
const port = process.env.PORT || 5000;

connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));