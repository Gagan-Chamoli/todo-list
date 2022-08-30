const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const taskRouter = require('./routes/task');
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000 ;

//DB connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database connection successful'))
.catch((error)=>console.log(error));

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.listen(PORT,()=>console.log(`Listening at port ${PORT}`));
