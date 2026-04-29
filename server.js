const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PORT FIX (VERY IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

// ==========================
// MOCK DATABASE
// ==========================

const users = [
  {
    email: "test@voxvpn.net",
    password: "123456",
    plan: "pro"
  }
];

const servers = [
  { id: 1, name: "US Chicago" },
  { id: 2, name: "US New York" },
  { id: 3, name: "UK London" },
  { id: 4, name: "Germany Frankfurt" },
  { id: 5, name: "Netherlands Amsterdam" },
  { id: 6, name: "Canada Toronto" },
  { id: 7, name: "Singapore" },
  { id: 8, name: "Australia Sydney" },
  { id: 9, name: "South Africa Johannesburg" },
  { id: 10, name: "Japan Tokyo" }
];

const prices = {
  free: { duration: "3 days", price: 0, servers: 3 },
  basic: { price: 2.79, servers: 10 },
  advanced: { price: 3.59, servers: 20 },
  pro: { price: 5.99, servers: 999 }
};

// ==========================
// ROUTES
// ==========================

app.get("/", (req, res) => {
  res.send("VoxVPN API running");
});

// ✅ SERVERS API
app.get("/api/servers", (req, res) => {
  res.json({
    success: true,
    servers
  });
});

// ✅ PRICING API
app.get("/api/pricing", (req, res) => {
  res.json({
    success: true,
    prices
  });
});

// ✅ LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid login"
    });
  }

  res.json({
    success: true,
    token: "voxvpn_" + Date.now(),
    plan: user.plan
  });
});

// ==========================
// START SERVER
// ==========================

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
