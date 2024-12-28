import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavLink } from 'react-router-dom';
import backgroundImage from '../../assets/background.jpg';
import { axiosUserInstances } from '@/axios-instances/userInstance';
import { updateUserError, updateUserPending, updateUserSuccess } from '@/app/feature/auth/userAuthSlice';
import { UseDispatch } from 'react-redux';
import { toast } from 'sonner';
import Loader from '@/utils/Loader';



type EditUserInfo = {
    firstname: string,
    lastname: string,
    email: string,
    profilePicture: File | string
}




const EditProfile = () => {

    const { user, loading } = useSelector((state: any) => state.userauth)
    const inputImageRef = useRef<HTMLInputElement>(null);
    const [currentSelectedImage, setCurrentSelectedImage] = useState<string>("");
    const dispatch = useDispatch();


    const [userInfo, setUserInfo] = useState<EditUserInfo>({
        firstname: "",
        lastname: "",
        email: "",
        profilePicture: ""
    })

    const inputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCurrentSelectedImage(URL.createObjectURL(file))
            setUserInfo({
                ...userInfo,
                profilePicture: file
            })
        }
    }


    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const submitHandle = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // update user api implementation : 

        const formData = new FormData();
        formData.append("firstname", userInfo.firstname);
        formData.append("lastname", userInfo.lastname);
        formData.append("email", userInfo.email);
        if (userInfo.profilePicture) {
            formData.append("profilePicture", userInfo.profilePicture);
        }


        try {
            dispatch(updateUserPending());
            const editUserProfile = await axiosUserInstances.put("/update-user", formData, {
                headers: {
                    "Content-Type": "multipart/json"
                }
            });
            const resposne = await editUserProfile.data;
            if (resposne.success) {
                dispatch(updateUserSuccess(resposne.user));
                toast.success(resposne.message);
            }
        } catch (error: any) {
            if (error) {
                dispatch(updateUserError(error?.response?.data.message));
                toast.error(error?.response?.data.message);
            }
        }
    }

    useEffect(() => {
        if (user) {
            setUserInfo({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
                profilePicture: user.profilePicture || ""
            })
        }
    }, [user])





    return (
        <>
            <div className="flex">

                {/* left content :  */}
                <div className=" w-1/3">
                    <img
                        src={backgroundImage}
                        alt="image"
                        className='min-h-screen bg-cover object-cover'
                    />
                </div>

                {/* Right content :  */}
                <div className="w-1/2">

                    <div className="flex items-center flex-col justify-center">
                        <h3 className='font-bold text-blue-500 text-2xl text-center mt-10'>Update profile</h3>
                        <Separator className='w-20 border-blue-400 mt-2 border' />
                    </div>



                    <form className='mt-10 flex flex-col justify-center items-center' onSubmit={submitHandle}>

                        {/* Profile picture :  */}
                        <div className="">

                            <input
                                type="file"
                                name="profilePicture"
                                accept='image/*'
                                ref={inputImageRef}
                                className='hidden'
                                onChange={inputFileChange}
                            />
                            <img src={currentSelectedImage || user && user.profilePicture}
                                alt="User image"
                                onClick={() => inputImageRef.current?.click()}
                                className='w-14 h-14 border rounded-full cursor-pointer transition-all hover:shadow duration-100'
                            />
                        </div>


                        {/* first name :  */}
                        <div className="my-1">
                            <label htmlFor="">First name </label>
                            <Input
                                value={userInfo.firstname}
                                name='firstname'
                                placeholder='First name'
                                className="w-96 py-5"
                                onChange={inputChangeHandle}
                            />
                        </div>

                        {/* last name :  */}
                        <div className="my-1">
                            <label htmlFor="">Last name </label>
                            <Input
                                value={userInfo.lastname}
                                name='lastname'
                                placeholder='Last name'
                                className="w-96 py-5"
                                onChange={inputChangeHandle}
                            />
                        </div>

                        {/* Email address :  */}
                        <div className="my-1">
                            <label htmlFor="">Email </label>
                            <Input
                                disabled
                                value={userInfo.email}
                                name='email'
                                type='email'
                                placeholder='Email address'
                                className="w-96 py-5"
                                onChange={inputChangeHandle}
                            />
                        </div>

                        {/* Dynamically Rendering the loading :  */}
                        <div className="border mt-2">
                            {
                                loading ?
                                    <Button disabled className="w-96 flex items-center justify-center py-5">
                                        <p className=' font-medium'>Loading</p>
                                        <Loader />
                                    </Button>
                                    :
                                    <Button
                                        className='py-5 w-96'
                                        type='submit' >Update Chnages
                                    </Button>
                            }
                        </div>


                        <div className="flex items-center gap-1 hover:text-blue-500 w-96 justify-end mt-4">
                            <i className="bi bi-arrow-left-short"></i>
                            <NavLink className="font-medium " to={"/profile"}>Back</NavLink>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default EditProfile