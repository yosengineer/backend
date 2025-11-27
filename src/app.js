import express from 'express';

const app = express();  // Create an Express application instance

app.use(express.json()); // Middleware to parse JSON request bodies

// import routes
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

// declare routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// root route
app.get('/', (req, res) => {
	res.send('API is running');
});

// example route: http://localhost:4000/api/v1/users/register

export default app;