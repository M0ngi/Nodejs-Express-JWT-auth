const userService = require('../services/userService')
const { successResp, errorResp } = require('../utils/apiResponse');
const Users = require('../models/userModel');

const authCtrl = {
    register: async (req, res) => {
        try {
            const newUser = await userService.createNewUser(req.body);
            const user = newUser._doc;
            delete user.password;
            return successResp(res, 201, {
                user,
            })
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({email}).select("+password");
            if(!user) return errorResp(res, 404, "This email does not exist.");

            if(!(await user.verifyPassword(password))) return errorResp(res, 400, "Password is incorrect.");

            const {access_token, refresh_token} = await userService.createAccessToken(user)
            
            return successResp(res, 200, {
                access_token,
                refresh_token,
            })
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    logout: async (req, res) => {
        try {
            await userService.logoutUser(req.user);
            return successResp(res, 200, null);
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    refreshToken: async (req, res) => {
        try {
            const {access_token, refresh_token} = await userService.createAccessToken(req.user)

            return successResp(res, 200, {
                access_token,
                refresh_token
            })
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    }
}

module.exports = authCtrl
