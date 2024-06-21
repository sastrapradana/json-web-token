const jwt = require("jsonwebtoken");

const SECRET_KEY = "SPONTAN_UHHUYY";
const REFRESH_SECRET_KEY = "SPONTAN_UHHUYY_REFRESH";

const createTokenWithEmail = (email) => {
  const payload = { email };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5m" });
  return token;
};

const createRefreshToken = (email) => {
  const payload = { email };
  const token = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "10m" });
  return token;
};

const verifyToken = (refreshToken) => {
  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const newToken = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "5m",
    });
    console.log({ user, newToken });
    return newToken;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { createTokenWithEmail, createRefreshToken, verifyToken };
