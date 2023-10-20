const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

const HttpError = require("../helpers/HttpError.js");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        return HttpError(res, 401, "Not authorised");
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token || user.token !== token) {
            return HttpError(res, 401, "Not authorised");
        }
        req.user = user;
        next();
    }
    catch {
        return HttpError(res, 401, "Not authorised");
    }
}

module.exports = authenticate;