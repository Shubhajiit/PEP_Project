const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (!token) return res.status(401).json({ message: "Missing token" });
    if (!process.env.JWT_SECRET)
      return res.status(500).json({ message: "JWT_SECRET is not configured" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("_id email isVerified");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


//Rate Limiting restricting how many request of user how many request 

//Rate limiter stored in memory , 

//Ip address->request ->time

//counter increase
//If counter is >max= request block
//After time window ends counter reset

// Rate limiting protect api from brute force attack , spam , client come theme , which is an define time video  , 

// where should rate limiting need apply

// its should be apply globally for protection , and most strictly to sensitive end points


//What is helmet

//helmet is the express , middleware ,  that secure their app  using http reponse header
//security rules send from server and emforced by browser

//helmet protection
// helmet  automatically send header  , obsens 

// x/ content type  //strict transprt security
//force http , content security policy


//