import { Input } from '@/components/ui/input';
import signinImage from '../assets/auth images/loginImage.jpg';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { LoginUserDataType, LoginUserSchema } from '@/validation/user-schema/schema.user';
import { Separator } from '@/components/ui/separator';
import { axiosUserInstances } from '@/axios-instances/userInstance';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginPending, loginError } from '@/app/feature/auth/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '@/utils/Loader';


const Signin = () => {

    const [formData, setFormData] = useState<LoginUserDataType>({
        email: "",
        password: ""
    });
    const { loading } = useSelector((state: any) => state.userauth)




    const [formError, setFormError] = useState<Partial<LoginUserDataType>>({})
    const dispatch = useDispatch();
    const naviagte = useNavigate();

    // Input handler : 
    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string, value: string } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }


    // Submit Handler : 
    const submitHandle = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();


        // Validate form using zod : 
        const validateForm = LoginUserSchema.safeParse(formData);

        if (validateForm.success) {
            setFormData({
                email: "",
                password: ""
            })
        } else {
            const catchErr = validateForm.error.formErrors.fieldErrors;
            setFormError(catchErr as Partial<LoginUserDataType>)
        }

        // Login api implementation : 
        try {
            dispatch(loginPending());
            const addLoginUser = await axiosUserInstances.post("/login", formData);
            const response = await addLoginUser.data;
            if (response.success) {
                // sending the data to store using dispatch : 
                dispatch(loginSuccess(response.user));
                toast.success(response.message);
                // Navigate to the home page on success resposne : 
                naviagte("/");
            }
        } catch (error: any) {
            if (error.response) {
                dispatch(loginError(error.response.data.message));
                toast.error(error.response.data.message);
            }
        }
    }



    return (
        <>
            <div className="w-full my-5 flex justify-center items-center ">
                {/* left section :  */}
                <div className="">
                    <img
                        src={signinImage}
                        alt="signup image"
                        className='w-96 h-[500px] object-cover' />
                </div>


                {/* Right section :  */}
                <div className="">
                    <form
                        className='border px-4  justify-center flex flex-col gap-3 shadow w-[500px] h-[500px]'
                        onSubmit={submitHandle}
                    >
                        {/* Title :  */}
                        <div className="flex items-center justify-center gap-2">
                            <h2 className='font-bold text-center mt-2'>Login</h2>
                            <Separator className='w-32 border-yellow-300 border' />
                        </div>

                        {/* Email :  */}
                        <div className="">
                            <label>Email *</label>
                            <Input
                                className={`py-5 ${formError.email && "border border-red-500"}`}
                                type='email'
                                placeholder='Enter email address'
                                onChange={inputChangeHandle}
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
                                placeholder='Enter your passowrd'
                                type='password'
                                className='py-5'
                                onChange={inputChangeHandle}
                                value={formData.password}
                                name='password'
                            />
                            {/* conditionally show the form Error :  */}
                            {
                                formError.password && <span className='text-red-500 text-xs'>{formError.password}</span>
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
                                        type='submit' >Login
                                    </Button>
                            }
                        </div>

                        <div className=" text-sm flex items-center gap-2">
                            <p className=''>Don't have an account ? </p>
                            <NavLink className={`text-blue-500 hover:underline`} to={"/signup"}>Signup</NavLink>
                        </div>

                        <div className=" text-sm flex items-center gap-2">
                            <p className=''>Don't remember passowrd ? </p>
                            <NavLink className={`text-blue-500 hover:underline`} to={"/forget-password"}>Forget</NavLink>
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

export default Signin;