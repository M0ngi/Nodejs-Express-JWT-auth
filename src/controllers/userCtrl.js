const Users = require('../models/userModel')
const { successResp, errorResp } = require('../utils/apiResponse');
const userService = require('../services/userService')

const userCtrl = {
    deleteUser: async (req, res) => {
        try {
            const email = req.user.email;
            const t = Date.now()
            req.user.email = `${req.user.email}.DEL.${t}`
            await req.user.save();
            successResp(res, 200, {...req.user, email})
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    getUser: async (req, res) => {
        try {
            if(!req.params.id){
                return successResp(res, 200, req.user)
            }
            const user = await Users.findById(req.params.id)
            if(!user) return errorResp(res, 404, "User does not exist.")
            
            return successResp(res, 200, user)
        } catch (err) {
            console.log(err)
            return errorResp(res, 500, err.message)
        }
    },
    updateUser: async (req, res) => {
        try {
            const {user} = await userService.updateUserInfo(req.user, req.body);

            return successResp(res, 200, user)
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
    updateUserPassword: async (req, res) => {
        try {
            const { password, currentPass } = req.body
            if(!password) return errorResp(res, 400, "Password is required.")
            if(password.length < 6) return errorResp(res, 400, "Password must be at least 6 characters.")

            const user = await Users.findById(req.user._id).select("+password");
            if(!(await user.verifyPassword(currentPass))) return errorResp(res, 400, "Current password is incorrect.");

            await user.updatePassword(password);

            return successResp(res, 200, req.user)
        } catch (err) {
            return errorResp(res, 500, err.message)
        }
    },
}

module.exports = userCtrl
