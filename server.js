const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/download", (req, res) => {
  const key = req.query.key;

  if (key !== "voxdigits2026") {
    return res.status(403).send("Access Denied");
  }

  res.redirect("https://voxvpn.net/downloads/VoxVPN-Setup.exe");
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "public", "VoxVPN-Setup.exe"));
});

const users = [
  {
    email: "test@voxvpn.net",
    password: "123456",
    plan: "Pro"
  }
];

app.get("/", (req, res) => {
  res.send("VoxVPN API running");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid login"
    });
  }

  return res.json({
    success: true,
    token: "voxvpn_" + Date.now(),
    plan: user.plan
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("VoxVPN API running on port " + PORT);
});
