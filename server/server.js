const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
const MONGO_URI =
'mongodb+srv://lmercedes03:kWfRIlNOecaTp8rU@cluster0.wssqiab.mongodb.net/business_dashboard?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

//Endpoints go here
//ex. app.get("/express_backend", cors(corsOptions), (req, res) => {
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
