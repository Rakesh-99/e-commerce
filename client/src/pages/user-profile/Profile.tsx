import { deleteUserError, deleteUserPending, deleteUserSuccess } from "@/app/feature/auth/userAuthSlice";
import { persistor } from "@/app/store/store";
import { axiosUserInstances } from "@/axios-instances/userInstance";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Profile = () => {

    const { user } = useSelector((state: any) => state.userauth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const deleteProfile = async () => {
        // Delete user api call: 
        try {
            dispatch(deleteUserPending());
            const deleteUserProfile = await axiosUserInstances.delete("/delete-user");
            const response = await deleteUserProfile.data;
            if (response.success) {
                dispatch(deleteUserSuccess());
                toast.success(response.message || "Profile has been deleted permanently");
                persistor.purge();
                navigate("/");
            }
        } catch (error) {
            if (error) {
                dispatch(deleteUserError());
                console.log(error);
                toast.error("Could not delete profile !");
            }
        }
    }



    return (
        <>
            <div className="flex items-center justify-center flex-col gap-2">

                <div className="w-1/2 mt-20 border shadow rounded-md py-10">
                    {/* top content :  */}
                    <div className="flex flex-col  items-center justify-center">
                        <img
                            src={user && user.profilePicture}
                            alt="avatar"
                            className="border w-20 h-20 rounded-full"
                        />
                        <Separator className="border mt-2 w-52" />
                    </div>

                    {/* buttom content :  */}
                    <div className="">

                        <div className="flex gap-3 mt-2 justify-center">

                            {/* Name :  */}
                            <div className="">
                                <div className="flex py-2 gap-2">
                                    <Label className="text-base mr-2">Name : </Label>
                                    <i className="bi text-blue-500 bi-person-bounding-box"></i>
                                    <p className="font-medium">{user && user.firstname}</p>
                                    <p className="font-medium">{user && user.lastname}</p>
                                </div>
                                {/* Email address :  */}
                                <Separator />
                                <div className="flex py-2 items-center gap-2">
                                    <Label className="text-base mr-2">Email address :</Label>

                                    <div className="flex gap-1">
                                        <i className="bi text-blue-500 bi-envelope-at"></i>
                                        <p className="">{user && user.email}</p>
                                    </div>

                                </div>
                                <Separator />

                                {/* User Role */}
                                <div className="flex items-center gap-2 py-2">
                                    <Label className="text-base mr-2">Role : </Label >
                                    <div className="flex items-center gap-1">
                                        <i className="bi text-blue-500 bi-person-vcard"></i>
                                        <p className="">{user && user.isAdmin === false ? "User" : "Admin"}</p>
                                    </div>
                                </div>

                                <Separator />
                                {/* User verified status :  */}
                                <div className="flex py-2 gap-3">
                                    <Label className="text-base mr-2">Email verified status :</Label >

                                    <div className="flex gap-1">
                                        <i className="bi text-green-500 bi-person-fill-check"></i>
                                        <p className="">{user && user.isVerified === false ? "Not verified" : "Verified"}</p>
                                    </div>

                                </div>
                                <Separator />
                                {/* Profile created at :  */}
                                <div className="py-2 items-center gap-2 flex ">
                                    <Label className="text-base mr-2">Profile created at :</Label>
                                    <p className="">{user && new Date((user.createdAt)).toLocaleString()}</p>
                                </div>
                                <Separator />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end px-5 mt-5 gap-5">
                        <Button className="bg-blue-500 py-5">
                            <NavLink to={"/edit-profile"} className='flex items-center gap-2'>
                                <i className="bi bi-pencil-square text-xs"></i>
                                <p className="text-sm">Edit profile</p>
                            </NavLink></Button>
                        {/* <Button
                            onClick={showDeletePopupModal}
                            className="bg-red-500 py-5">Delete account</Button> */}

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className=" py-5">
                                    <i className="bi bi-trash text-xs"></i>
                                    <p className="text-sm font-medium">Delete Account</p>
                                </Button>

                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteProfile}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile