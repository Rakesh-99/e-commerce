import mongoose from 'mongoose';





interface IUserSchema extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
    profilePicture?: string,
    isAdmin: boolean,
    otpVerificationCode: string,
    otpVerificationCodeExpiresAt: Date,
    isVerified: boolean,
    resetPasswordToken: string,
    resetPasswordTokenExpiresAt: Date
    lastLogin: Date,
}


// User schema : 
const userShcmaa = new mongoose.Schema<IUserSchema>({
    firstname: {
        type: String,
        required: [true, "Firstname is required!"],
    },
    lastname: {
        type: String,
        required: [true, "Last name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    confirmPassword: {
        type: String,
        required: [true, "confirm password is required!"]
    },
    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    otpVerificationCode: {
        type: String,
        required: [true, "OTP is required!"]
    },
    otpVerificationCodeExpiresAt: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTokenExpiresAt: {
        type: Date
    },
    lastLogin: {
        type: Date
    }

}, { timestamps: true });


// User model : 
const userModel = mongoose.model("User", userShcmaa);
export default userModel;