const logout = async(res,req)=>{
    res.clearCookie("token",{//token name should match with the cookie we sent at login time ex res.cookie ("token",jwtToken)

        httpOnly: true,
        sameSite:"Strict",
        secure:true
    });
    res.json({
        message:"logged out successfully"});
    // redirect to login page
    }
module.exports = {
    logout
}