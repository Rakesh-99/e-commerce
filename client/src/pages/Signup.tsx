import { Input } from '@/components/ui/input';
import signupImage from '../assets/auth images/signupImage.jpg';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { UserSignupSchema, UserSingupDataTypes } from '@/validation/user-schema/schema.user';
import { Separator } from '../components/ui/separator';
import { axiosUserInstances } from '@/axios-instances/userInstance';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Loader from '@/utils/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { signupError, signupPending, signupSuccess } from '@/app/feature/auth/userAuthSlice';


const Signup = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state: any) => state.userauth);

    const [formData, setFormData] = useState<UserSingupDataTypes>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [formError, setFormError] = useState<Partial<UserSingupDataTypes>>({});



    const inputChnageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name }: { value: string, name: string } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const formSubmitHandle = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Form validation configuration using zod :
        const validateForm = UserSignupSchema.safeParse(formData);
        if (validateForm.success) {
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        } else {
            const catchErr = validateForm.error.formErrors.fieldErrors;
            setFormError(catchErr as Partial<UserSingupDataTypes>)
            return false;
        }

        // Signup api implementation : 
        try {
            dispatch(signupPending(loading))
            const addUser = await axiosUserInstances.post("/signup", formData);
            const resposne = await addUser.data;
            if (resposne.success) {
                toast.success(`OTP has been sent to your email address`)
                dispatch(signupSuccess({ firstname: formData.firstname, lastname: formData.lastname }));

                // Navigating to verify email route on the successful response : 
                navigate("/verify-email");
            }
        } catch (error: any) {
            dispatch(signupError(loading));
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <>
            <div className="w-full my-5 flex justify-center  items-center ">
                {/* left section :  */}
                <div className="">
                    <img src={signupImage} alt="signup image" className='w-96 min-h-screen object-cover' />
                </div>


                {/* Right section :  */}
                <div className="">
                    <form
                        className='border px-4  flex flex-col min-h-screen gap-5 justify-center  shadow w-[500px]'
                        onSubmit={formSubmitHandle}
                    >
                        {/* Title :  */}
                        <div className="flex items-center justify-center gap-2">
                            <h2 className='font-bold text-center mt-2'>Signup</h2>
                            <Separator className='w-32 border border-yellow-400' />
                        </div>

                        {/* username  */}
                        <div className="flex gap-2  justify-between ">
                            <div className="flex gap-1 flex-col">
                                <label>First name *</label>
                                <Input
                                    placeholder='First name'
                                    className={`py-5 w-52 ${formError.firstname && "border border-red-500"}`}
                                    onChange={inputChnageHandle}
                                    value={formData.firstname}
                                    name="firstname"
                                />
                                {/* conditionally show the form Error :  */}
                                {
                                    formError.firstname && <span className='text-red-500 text-xs'>{formError.firstname}</span>
                                }
                            </div>

                            <div className="flex gap-1 flex-col">
                                <label>Last name *</label>
                                <Input
                                    placeholder='Last name'
                                    className={`py-5 w-52 ${formError.lastname && "border border-red-500"}`}
                                    onChange={inputChnageHandle}
                                    value={formData.lastname}
                                    name="lastname"
                                />
                                {/* conditionally show the form Error :  */}
                                {
                                    formError.lastname && <span className='text-red-500 text-xs'>{formError.lastname}</span>
                                }
                            </div>
                        </div>

                        {/* Email :  */}

                        <div className="">
                            <label>Email *</label>
                            <Input
                                placeholder='Email address'
                                className={`py-5 ${formError.email && " border-red-500"}`}
                                type='email'
                                onChange={inputChnageHandle}
                                value={formData.email}
                                name='email'
                            />
                            {/* conditionally show the form Error :  */}
                            {
                                formError.email && <span className='text-red-500 text-xs'>{formError.email}</span>
                            }
                        </div>

                        {/* Password :  */}
                        <div className="flex flex-col">
                            <label>Password *</label>
                            <Input
                                placeholder='Passowrd'
                                type='password'
                                className={`py-5 ${formError.password && " border-red-500"}`}
                                onChange={inputChnageHandle}
                                value={formData.password}
                                name='password'
                            />
                            {/* conditionally show the form Error :  */}
                            {
                                formError.password && <span className='text-red-500 text-xs'>{formError.password}</span>
                            }
                        </div>

                        {/* Conform password :  */}
                        <div className="flex flex-col">
                            <label>Confirm password *</label>
                            <Input
                                className={`py-5 ${formError.confirmPassword && " border-red-500"}`}
                                type='password'
                                placeholder='Confirm password'
                                onChange={inputChnageHandle}
                                value={formData.confirmPassword}
                                name='confirmPassword'
                            />
                            {/* conditionally show the form Error :  */}
                            {
                                formError.confirmPassword && <span className='text-red-500 text-xs'>{formError.confirmPassword}</span>
                            }
                        </div>

                        <div className="w-full ">
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
                                        type='submit' >Register
                                    </Button>
                            }
                        </div>

                        <div className=" text-sm flex items-center gap-2">
                            <p className=''>Already have an account ? </p>
                            <NavLink
                                className={`text-blue-500 hover:underline`}
                                to={"/signin"}>Login</NavLink>
                        </div>

                        {/* other signup methods :  */}
                        <div className="">
                            <h3 className='text-xl text-center font-medium'>OR</h3>
                            {/* google signup :  */}
                            <div className="flex justify-center items-center gap-5 mt-1">
                                <i className="bi bi-google text-2xl hover:shadow-green-500 transition-all cursor-pointer shadow border rounded-full px-2 py-1"></i>
                                <i className="bi bi-github text-2xl hover:shadow-green-500 transition-all cursor-pointer shadow border rounded-full px-2 py-1"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup