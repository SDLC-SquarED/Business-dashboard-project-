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

//endpoints go here
//ex. app.get("/express_backend", cors(corsOptions), (req, res) => {
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
