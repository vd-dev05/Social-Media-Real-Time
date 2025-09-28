import mongoose from 'mongoose';

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected MongoDB successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
export async function disconnectMongo() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

