import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"
import { ForgetPasswodSchema, ForgetPasswordDataType } from "@/validation/user-schema/schema.user"
import { useDispatch, useSelector } from "react-redux"
import Loader from "@/utils/Loader"
import { axiosUserInstances } from "@/axios-instances/userInstance"
import { toast } from "sonner"
import { forgetPasswordPending, forgetPasswordSuccess, forgetPasswordError } from "@/app/feature/auth/userAuthSlice"





const ForgetPassword = () => {


    const [email, setEmail] = useState<ForgetPasswordDataType>("");
    const [formError, setFormError] = useState<Partial<ForgetPasswordDataType>>("");
    const { loading } = useSelector((state: any) => state.userauth);
    const dispatch = useDispatch();
    const [successMesage, setSuccessMessage] = useState<string>("");


    // Input change handle : 
    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    }

    // Form submit handle : 
    const submitHandle = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // form validation using zod : 
        const validateForm = ForgetPasswodSchema.safeParse(email);
        if (validateForm.success) {
            setEmail("")
        } else {
            const catchErr = validateForm.error.errors[0].message;
            setFormError(catchErr);
            return false;
        }

        // Forget password Api implementation : 
        try {
            dispatch(forgetPasswordPending());
            const sendForgetPassword = await axiosUserInstances.post("/forget-password", { email: email });
            const response = await sendForgetPassword.data;
            if (response.success) {
                dispatch(forgetPasswordSuccess());
                toast.success(response.message);
                setSuccessMessage(response.message)
                console.log(response);
            }
        } catch (error: any) {
            if (error) {
                dispatch(forgetPasswordError(error.resposnse.data.message));
                toast.error(error.resposnse.data.message)
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="flex justify-center mt-10">
                <form className="w-96 flex border shadow px-5 py-5 rounded-md flex-col gap-4" onSubmit={submitHandle}>
                    {/* Email :  */}
                    <div className="">
                        <label>Email *</label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            onChange={inputChangeHandle}
                            placeholder="Enter your email address"
                            className={`py-5 font-medium ${formError && " border-red-500"}`}
                        />
                        {
                            successMesage &&
                            <div className="flex  gap-2">
                                <i className="bi bi-check-all text-green-500 text-2xl"></i>
                                <p className="mt-1 text-green-500 text-xs" >{successMesage}</p>
                            </div>

                        }
                        {/* conditionally show the form Error :  */}
                        {
                            formError && <span className='text-red-500 text-xs'>{formError}</span>
                        }
                    </div>
                    {/* Dynamically Rendering the Button :  */}
                    {
                        loading ?
                            <Button disabled className="w-full flex items-center justify-center py-5">
                                <p className=' font-medium'>Loading</p>
                                <Loader />
                            </Button>
                            :
                            <Button
                                className='py-5  w-full'
                                type='submit' >Submit OTP
                            </Button>
                    }
                </form>
            </div>
        </>
    )
}

export default ForgetPassword