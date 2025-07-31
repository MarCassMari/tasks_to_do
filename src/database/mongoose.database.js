const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercloud.bushdtq.mongodb.net/?retryWrites=true&w=majority&appName=taskManagerCloud`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log("Connected to MongoDB");
};
module.exports = connectToDatabase;
