require("dotenv").config();
const jwt = require("jsonwebtoken")
function generateValue(token) {
    if (!token) return null;

    return jwt.verify(token, process.env.JWT_SECRET);
}


const checkAuthentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next()
    }
    token = authHeader.split(' ')[1];
    const user_value = generateValue(token)
    // console.log(user_value)
    req.user = user_value
    return next()
}

const authenticateTo = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({
            message: "user not authenticate!"
        })
        if (!roles.includes(req.user.role)) return res.status(403).json({
            message: "user not authorized to access this resource!"
        })
        return next()
    }
}

module.exports = {
    checkAuthentication,
    authenticateTo
}















// header based authentication
// const checkAuthentication = (req, res, next) => {
//     // Define a middleware function to check if the user is authenticated by verifying the token in the cookies.
//     const token_cookie = req.cookies.authToken
//     // Retrieve the 'authToken' cookie from the incoming request.
//     // console.log(`Cookie: ${token_cookie}`);
//     if (!token_cookie) return next()
//     // If the token does not exist, call next() to pass control to the next middleware or route handler.
//     const user_value = generateValue(token_cookie)
//     // Use the generateValue function to extract user information from the token.
//     req.user = user_value
//     // Assign the extracted user information to the req.user property, making it accessible in subsequent middleware or route handlers.
//     // console.log(`Token value: ${JSON.stringify(req.user)}`);
//     return next()
//     // Call next() to pass control to the next middleware or route handler after the user has been authenticated.
// }


// role based authorization
// const authenticateTo = (roles=[]) => {
//     // console.log(roles);
//     return (req, res, next) => {
//         // console.log(req.user.role);
//         if(!req.user){
//             return res.status(401).json({
//                 message:"user not authenticate"
//             })
//         }

//         if(!roles.includes(req.user.role)){
//             return res.status(403).json({
//                 message:"user not authorized to access this resource"
//             })
//         }
//         return next()
//     }
// }