import { z } from 'zod';


// Signup schema  : 
export const UserSignupSchema = z.object({

    // Firstname validation : 
    firstname: z.string()

        .max(30, "Firstname can not exceed 30 char!")
        .min(2, "Firstname can not be less then 2 char!"),

    // Lastname validation : 
    lastname: z.string()

        .max(30, "Lastname can not exceed 30 char!")
        .min(2, "Lastname can not be less than 2 char!"),

    // Email validation : 
    email: z.string()
        .email("Invalid email address!"),

    // Passsowrd validation : 
    password: z.string()

        .min(8, "Password can not be less than 8 char!")
        .max(20, "Password length can not excced 20 char!")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase!")
        .regex(/[a-z]/, "Password must contain at least 1 lowercase!")
        .regex(/[0-9]/, "Password must contain atleast one numeric value"),

    // Confirm password : 

    confirmPassword: z.string()
        .nonempty("Confirm password can not empty!")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passsowrd does not match!",
    path: ["confirmPassword"]
})

// Signup data type : 
export type UserSingupDataTypes = z.infer<typeof UserSignupSchema>



// Login schema : 
export const LoginUserSchema = z.object({
    email: z.string()
        .email("Invalid email address !"),
    password: z.string()
        .min(8, "Passowrd must conatin at least 8 char !")
        .max(30, "Passowrd can not excced 30 char !")
        .regex(/[A-Z]/, "Password must contain at least 1 uppercase!")
        .regex(/[a-z]/, "Passowrd must contain at least 1 lowercase!")
        .regex(/[0-9]/, "Password must contain at least 1 numeric value!")
});
export type LoginUserDataType = z.infer<typeof LoginUserSchema>

//Forget password : 
export const ForgetPasswodSchema = z.string().email("Invalid email address!")

// Verify email address : 
export const OtpSchema = z.string()
    .regex(/^\d{6}$/, "OTP must be a 6-digit number");
export type OtpDataType = z.infer<typeof OtpSchema>


// Forget password : 
export const ForgetPasswordSchema = z.string()
    .email("Invalid email address!")
export type ForgetPasswordDataType = z.infer<typeof ForgetPasswodSchema>

// Reset password : 
export const ResetPasswordSchema = z.string()
    .min(8, "Passowrd must conatin at least 8 char !")
    .max(30, "Passowrd can not excced 30 char !")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase!")
    .regex(/[a-z]/, "Passowrd must contain at least 1 lowercase!")
    .regex(/[0-9]/, "Password must contain at least 1 numeric value!")
export type ResetPasswordDataType = z.infer<typeof ResetPasswordSchema>