import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom"
import { ResetPasswordSchema, ResetPasswordDataType } from "@/validation/user-schema/schema.user";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "@/utils/Loader";
import { axiosUserInstances } from "@/axios-instances/userInstance";
import { toast } from "sonner";

const ResetPassword = () => {

    const params = useParams();
    const navigate = useNavigate();


    const [password, setPassword] = useState<ResetPasswordDataType>("");
    const [formError, setFormError] = useState<ResetPasswordDataType>("")
    const { loading } = useSelector((state: any) => state.userauth);

    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
    }

    const submitHandle = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate email field using zod : 
        const validateForm = ResetPasswordSchema.safeParse(password);
        if (validateForm.success) {
            setPassword("");
            setFormError("");
        } else {
            const catchErr = validateForm.error.errors[0].message;
            setFormError(catchErr);
            return false;
        }

        // Reset password api implementation : 
        try {
            const createNewPassword = await axiosUserInstances.post(`/reset-password-instruction/${params.passwordToken}`, { newPassword: password });

            const response = await createNewPassword.data;
            if (response.success) {
                toast.message(response.message);
                navigate("/signin")
            }
        } catch (error: any) {
            if (error) {
                toast.error(error.response.data.message);
                console.log(error.response.data.message);
            }
        }
    }


    return (
        <>
            <div className="flex justify-center">
                <form
                    className="w-96 border mt-20 shadow px-5 py-5 flex flex-col gap-2"
                    onSubmit={submitHandle}
                >
                    <label>New password</label>
                    <Input
                        value={password}
                        name="password"
                        onChange={inputChangeHandle}
                        placeholder="Enter your new password"
                        className={`py-5 text-center font-medium ${formError && "border-red-500"}`}
                    />

                    {/* conditionally show the form Error :  */}
                    {
                        formError && <span className='text-red-500 text-xs'>{formError}</span>
                    }
                    {/* Dynamically Rendering the loading :  */}
                    {
                        loading ?
                            <Button disabled className="w-full flex items-center justify-center py-5">
                                <p className=' font-medium'>Loading</p>
                                <Loader />
                            </Button>
                            :
                            <Button
                                className='py-5 w-full'
                                type='submit' >Create new password
                            </Button>
                    }
                </form>
            </div>
        </>
    )
}

export default ResetPassword