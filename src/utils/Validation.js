const validate = require("validator");

const validateSignupData = (req)=>{
    
       const {firstName,lastName,email,password} = req.body;
       if(!firstName || !lastName){
        throw new Error("ERROR : Name is not Valid");
       }
       else if(!validate.isEmail(email)){
        throw new Error("ERROR : Email is not Valid");
       }
       if(!password){
        throw new Error("ERROR : Please Fill the password");
       }
       else if(!validate.isStrongPassword(password)){
        throw new Error("password is not Strong");
       }
}

module.exports = {
    validateSignupData
}

