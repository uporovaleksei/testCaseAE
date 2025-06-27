import express from 'express';
import cors from 'cors';
import usersRoute from './routes/users';
import eventsRoute from './routes/events';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);


app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});
