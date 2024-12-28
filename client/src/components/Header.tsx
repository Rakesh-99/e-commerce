import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { persistor } from '../app/store/store';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosUserInstances } from "@/axios-instances/userInstance";
import { toast } from "sonner";
import { logout } from "@/app/feature/auth/userAuthSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import logo from '../assets/logo.png';







const Header = () => {

    const [themeMode, setThemeMode] = useState<boolean>(false);
    const { user } = useSelector((state: any) => state.userauth);
    const dispatch = useDispatch();
    const { cart } = useSelector((state: any) => state.cartslice)



    const naviagte = useNavigate();

    const changeThemeMode = () => {
        setThemeMode(!themeMode)
    }

    const logoutHandle = async () => {
        // logout implementation : 
        try {
            const logoutUser = await axiosUserInstances.post("/logout");
            const response = await logoutUser.data;
            if (response.success) {
                toast.success(response.message);

                // remove from redux :
                dispatch(logout());

                // remove local storage:
                persistor.purge();
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message || "Logout failed!")
        }
    }


    return (
        <>
            {/* Navmenu :  */}
            <div className="justify-between bg-white z-50 sticky top-0 left-0 items-center flex shadow-sm h-20 border  px-3">

                {/* Company's logo :  */}
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="logo img"
                        className="w-16 h-16"
                    />
                    <NavLink to={"/"}><h3 className="text-2xl font-extrabold ">ShopEase</h3></NavLink>
                </div>

                {/* Search bar :  */}
                <div className="flex items-center relative ">
                    <Input placeholder="Search for Products, Brands and More .." className="w-96 font-medium py-5 " />
                    <i className="bi bi-search text-gray-500 absolute right-3"></i>
                </div>

                {/* :  */}
                <div className="flex gap-10">

                    {/* About us :  */}
                    <div className="flex gap-1">
                        <i className="bi bi-people"></i>
                        <NavLink to={"/about"}>About us</NavLink>
                    </div>
                    {/* Contact us :  */}
                    <div className="flex gap-1">
                        <i className="bi bi-person-lines-fill"></i>
                        <NavLink to={"/contact"}>Contact</NavLink>
                    </div>
                </div>

                {/* other utils :  */}
                <div className="flex gap-5 items-center">

                    <div className="flex items-center border rounded-full px-1 active:bg-gray-100 transition-all" onClick={changeThemeMode}>
                        {/* day and night toggle button :  */}
                        {
                            themeMode === true ? <i className="bi bi-moon-stars text-lg active:animate-spin"></i> : <i className="bi bi-brightness-high active:animate-spin text-xl"></i>
                        }
                    </div>
                    {/* Cart :  */}
                    <div className="">
                        <i className="bi bi-cart-dash text-xl relative cursor-pointer" onClick={() => naviagte("/cart")}>
                            <span className="text-sm absolute -top-3  left-3 font-bold bg-red-500 text-white rounded-full px-2">
                                {
                                    cart.length
                                }
                            </span>
                        </i>

                    </div>
                </div>


                {/* user profile :  */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {
                            user && (
                                <img
                                    src={user.profilePicture}
                                    alt="profile image"
                                    className="w-9 shadow-sm h-9 border-2 rounded-full"
                                />

                            )
                        }
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>User profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={"position"} >
                            <DropdownMenuRadioItem value="top"><NavLink to={"/profile"}>About</NavLink></DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">Orders</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>




                {/* Get started button :  */}
                <div className="">
                    {
                        user ?
                            <Button
                                type="button"
                                className="bg-red-500 py-5 active:bg-red-600"
                                onClick={logoutHandle}
                            >Logout</Button>
                            :
                            <Button className="py-5"><NavLink to={"/signin"}>Get started</NavLink></Button>
                    }
                </div>

                {/* render profile component dynamically on click : */}


            </div >

            {/* Product categories: */}

        </>
    )
}

export default Header;



