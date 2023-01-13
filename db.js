import mongoose from "mongoose";

const db_url = "mongodb://127.0.0.1:27017/notes";

const db = async () => {
try {
    const con = await mongoose.connect(db_url);
    console.log(`db connected : ${con.connection.host}`);
} catch (error) {
    console.log(error);
}
};

export default db;