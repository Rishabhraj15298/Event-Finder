import mongoose from 'mongoose'

// Expect environment to be loaded by the application entry (server.ts)
// Trim the value to avoid stray whitespace causing "Invalid scheme" errors
const url = (process.env.MONGO_URI || "").trim()

export const connectDB = async() => {
    try {
        if (!url) {
            console.error("❌MONGO_URI is not set. Make sure your .env file contains MONGO_URI")
            process.exit(1)
        }

        await mongoose.connect(url)
        console.log("✅MongoDB Connected Successfully")
    } catch (error: any) {
        console.error("❌Error occured while connecting to DB", error.message)
        process.exit(1)
    }
}