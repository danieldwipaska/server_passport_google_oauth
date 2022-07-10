import mongoose from 'mongoose';

//MONGOOSE CONNECT
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to DB!!!'))
  .catch((err) => {
    console.log(err);
  });

export default mongoose;
