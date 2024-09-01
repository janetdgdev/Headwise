import express from 'express';
const app = express();
import path from "path";
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import session from 'express-session';
// import formRoutes from './routes/formRoutes';
// import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

// // Middleware
// app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === "production", maxAge: 3600000 },
//   })
// );

// // Routes
// app.use("/api/forms", formRoutes);
// app.use("/api/auth", authRoutes);

const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
};

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/custom-forms-db")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 2121;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
