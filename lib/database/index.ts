import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null}; //in case we dont have a mongoose connection we simply set the connection to a null promise

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn; //if a cached connection exists we exist out of function and return it, connection runs for the first time

    //if not having mongodb uri
    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');
    
    //check if we have a cached connection or create one
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'handyhub',
        bufferCommands: false, //disabling buffering for all models asssociated with the connection
    });

    //have a cached connection
    cached.conn = await cached.promise;
    return cached.conn;
}

// everytime we execute server actions
//conectionToDatabase is called everytime and a new connection is created everytime which is inefficient
//therefore we need caching to store the connection and return it if it exists and reuse the same connection everytime