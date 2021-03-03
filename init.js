import dotenv from "dotenv";
dotenv.config();
import "./db";
import app from "./app";


import "./models/Video";
import "./models/Comment";
import "./models/User";


// process.env.PORT 라는 대상을 못찾으면 4000으로
const PORT = process.env.PORT || 4000; 

const handleListening = () => {
    console.log(`✅ Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);