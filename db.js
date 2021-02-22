import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    // 여기에 이렇게 적는 이유는 새로운 버전의 Mongoose는 이런식으로 Configiguration을 보낼 수 있다.
    // + 여기에 적는것들이 무슨 역할을 하는지 알아서 적는게 아니라, MongoDB를 사용할때마다 Configuration 설정에 대해 Mongoose가 물어보기때문에, 이런식으로 설정 해놓은것
    useNewUrlParser: true, 
    useFindAndModify:false,
    useUnifiedTopology:true
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);