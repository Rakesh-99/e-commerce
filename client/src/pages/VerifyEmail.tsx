import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChangeEvent, useState } from "react"
import { axiosUserInstances } from "@/axios-instances/userInstance"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { otpVerifyError, otpVerifyPending, otpVerifySuccess } from "@/app/feature/auth/userAuthSlice"
import Loader from "../utils/Loader";;
import { OtpDataType, OtpSchema } from "@/validation/user-schema/schema.user"






const VerifyEmail = () => {

    const [otp, setOtp] = useState<OtpDataType>("");
    const [formError, setFormError] = useState<OtpDataType>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state: any) => state.userauth);

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setOtp(value);
    }

    const submitHandle = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validate otp form : 
        const validateForm = OtpSchema.safeParse(otp);

        if (validateForm.error) {
            const catchErr = validateForm.error.errors[0].message;
            setFormError(catchErr);
            return false
        }

        // OTP api implementation : 
        try {
            dispatch(otpVerifyPending());
            const verifyOtp = await axiosUserInstances.post("/verify-email", { otp: otp });
            const resposne = await verifyOtp.data;

            if (resposne.success) {
                dispatch(otpVerifySuccess())
                toast.success(resposne.message);
                navigate("/signin");
            }
        } catch (error: any) {
            if (error) {
                dispatch(otpVerifyError(error.response.data.message));
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <>
            <div className="flex flex-col  items-center mt-10 justify-center">

                {/* Top section :  */}
                <div className="w-1/2 shadow-lg min-h-40 bg-blue-600">
                    <div className="flex items-center justify-center gap-2">
                        <Separator />
                        <i className="bi bi-envelope-check text-white text-2xl"></i>
                        <Separator />
                    </div>
                    {/* Greet message : */}
                    <div className="">
                        <h3 className="text-center my-4 text-white  text-base">THANKS FOR SIGNING UP !</h3>
                    </div>

                    <div className="">
                        <h3 className="text-white text-center mt-5 font-semibold text-3xl">Verify your E-Mail Address</h3>
                    </div>
                </div>
                {/* Button section :  */}

                <div className="min-h-40 justify-center  px-2 flex flex-col  py-2 shadow-sm border w-1/2">

                    <div className="flex items-center justify-between">

                        <div className="">

                            <div className="">
                                <p className="my-1 ">Hello <span className="font-semibold ">{user?.firstname} {user?.lastname}</span> ,</p>
                                <p className="mt-1 text-sm mb-4 text-start">Please use the following One Time Password (OTP)</p>
                            </div>

                            <div className="">
                                <form action="" onSubmit={submitHandle}>
                                    <div className="">
                                        <Input
                                            name="otp"
                                            value={otp}
                                            onChange={inputChangeHandle}
                                            className={`py-5 text-center font-medium ${formError && " border-red-500"}`}
                                            maxLength={6}
                                            placeholder="Enter Six Digit OTP"
                                        />

                                        {/* conditionally show the form Error :  */}
                                        {
                                            formError && <span className='text-red-500 text-xs'>{formError}</span>
                                        }
                                    </div>

                                    <div className="w-full ">
                                        {/* Dynamically Rendering the Button :  */}
                                        {
                                            loading ?
                                                <Button disabled className="w-full my-3 flex items-center justify-center py-5">
                                                    <p className=' font-medium'>Loading</p>
                                                    <Loader />
                                                </Button>
                                                :
                                                <Button
                                                    className='py-5 my-3 w-full'
                                                    type='submit' >Submit OTP
                                                </Button>
                                        }
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail