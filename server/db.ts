// server/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.error("⚠️  WARNING: DATABASE_URL is not defined. Server will run without database.");
} else {
    mongoose.connect(DATABASE_URL)
        .then(() => console.log('✅ Database connection successful!'))
        .catch(err => {
            console.error('❌ Database connection error:', err);
            console.log('⚠️  Server will continue running without database connection.');
        });
}
export default mongoose.connection;