const adminAuth = (req, res, next) => {
    console.log("admin auth is checking")
    const token = "xyg11";
    const isAuthorized = token == "xyg";
    console.log(isAuthorized)
    if (!isAuthorized) {
      res.status(404).send("admin not found");
    } else {
      next();
    }
};

const userAuth = (req, res, next) => {
    console.log("admin auth is checking")
    const token = "xyg11";
    const isAuthorized = token == "xyg";
    console.log(isAuthorized)
    if (!isAuthorized) {
      res.status(404).send("admin not found");
    } else {
      next();
    }
};

module.exports = {
    adminAuth,
    userAuth
};
