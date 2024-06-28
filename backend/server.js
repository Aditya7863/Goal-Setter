import express from 'express';
import goalRoutes from './routes/goalRoutes.js';
import { errorHandler } from './middleware/error.js';
import { notFound } from './middleware/notFound.js';
const port = process.env.PORT || 5000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));