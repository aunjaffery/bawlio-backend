import utils from "./utils";
// usually: "Authorization: Bearer [token]" or "token: [token]"

let auth = (req, res, next) => {
  let tokenToVerify;
  if (req.header("Authorization")) {
    const parts = req.header("Authorization").split(" ");

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({
            success: false,
            msg: "Format for Authorization: Bearer [token]",
          });
      }
    } else {
      return res
        .status(401)
        .json({
          success: false,
          msg: "Format for Authorization: Bearer [token]",
        });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, msg: "No Authorization was found" });
  }

  return utils.verifyToken(tokenToVerify, (err, thisToken) => {
    if (err) return res.status(401).json({ err });
    req.token = thisToken;
    return next();
  });
};

export default auth;
