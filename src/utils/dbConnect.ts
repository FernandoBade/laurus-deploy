import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log(MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

// Declaração do cache global para a conexão do Mongoose
const globalAny: any = global;

let cached = globalAny.mongoose;

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log(cached);
  console.log(cached.conn);
  console.log(cached.promise);
  return cached.conn;
}

export default dbConnect;
