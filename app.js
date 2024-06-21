const express = require("express");
const cors = require("cors");
const supabase = require("./db/supabase");
const {
  createTokenWithEmail,
  createRefreshToken,
  verifyToken,
} = require("./utils");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const { error } = await supabase.from("user-data").insert(data);

    if (error) {
      if (error.code == "23505") {
        return res
          .status(400)
          .json({ status: false, message: "Email sudah terdaftar" });
      }

      return res.status(400).json({ status: false, message: "Gagal register" });
    }

    return res.status(200).json({ status: true, message: "Berhasil register" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("user-data")
      .select()
      .eq("email", req.body.email);

    if (error) {
      return res.status(400).json({ status: false, message: "Gagal login" });
    }

    if (user.length == 0) {
      return res
        .status(400)
        .json({ status: false, message: "Email belum terdaftar" });
    }

    if (user[0].password != req.body.password) {
      return res
        .status(400)
        .json({ status: false, message: "password yang dimasukkan salah" });
    }

    const userData = user[0];
    const token = createTokenWithEmail(userData.email);
    const refreshToken = createRefreshToken(userData.email);

    return res.status(200).json({
      status: true,
      message: "Berhasil login",
      data: userData,
      token,
      refreshToken,
    });
  } catch (error) {
    return { status: false, message: error.message };
  }
});

app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(403).send("Refresh Token is required");

  const newToken = verifyToken(refreshToken);
  console.log(newToken);

  if (!newToken) return res.status(403).send("Invalid Refresh Token");

  res.status(200).json({ token: newToken });
});

app.listen(3000, () => console.log("Server running on port 3000"));
