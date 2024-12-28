import { Separator } from "../../components/ui/separator";
import { productCategories } from "@/constants/dataTypes";
import { Label } from '../../components/ui/label';
import { NavLink } from "react-router-dom";



const Categories = () => {




    return (
        <>
            <div className="flex mt-10 mb-20 items-center justify-center flex-col">
                <h2 className="font-bold">Featured Category</h2>
                <Separator className="w-32 mt-5 border border-yellow-400" />
            </div>

            {/* Show product category :  */}
            <div className="grid grid-cols-6 duration-100  gap-10 place-items-center w-[90%] m-auto">
                {
                    productCategories.map((category) => {

                        return (
                            <NavLink to={`category-product-listing/${category.path}`} className="flex flex-col gap-5" key={category.path}>

                                {/* image : */}
                                <div className="w-28 h-28  p-3 hover:scale-105 transition-all rounded-full  shadow-sm">
                                    <img
                                        src={category.image}
                                        alt="product image"
                                        className=""
                                    />

                                </div>

                                {/* cataegory name :  */}
                                <div className=" text-center">
                                    <Label className="">{category.category}</Label>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div >
        </>
    )
}

export default Categories