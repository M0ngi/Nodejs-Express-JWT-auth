const Users = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { errorResp } = require('../utils/apiResponse');

const createAccessToken = async (user) => {
    const time = Date.now();

    const access_token = jwt.sign({
        id: user._id,
        time,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
    const refresh_token = jwt.sign({
        id: user._id,
        time,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    user.accessToken = time;
    user.refreshToken = time;

    await user.save();
    return {access_token, refresh_token}
}

const logoutUser = async (user) => {
    user.accessToken = null;
    user.refreshToken = null;
    await user.save();
    return null
}

const createNewUser = async (userData) => {
    const { password, ...userInfo } = userData;
    if(password.length < 6 && !userInfo.oauthToken) return errorResp(res, 400, "Password must be at least 6 characters.")
    
    const newUser = new Users(userInfo)
    await newUser.updatePassword(password)

    await newUser.save()
    return newUser;
}

const updateUserInfo = async (user, data) => {
    const { fullname, email } = data

    user.fullname = fullname ?? user.fullname;
    user.email = email ?? user.email;
    await user.save();
    const userData = user._doc;
    return {user: userData}
}

module.exports = {
    createAccessToken,
    logoutUser,
    createNewUser,
    updateUserInfo,
}
