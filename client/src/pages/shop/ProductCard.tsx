import { useDispatch } from "react-redux";
import { addToCart } from "@/app/feature/cart/CartSlice";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";





const ProductCard = ({ products }: { products: any }) => {

    const dispatch = useDispatch();


    return (
        <>
            <div className="grid grid-cols-4  mt-20 gap-10">
                {
                    Object.keys(products).map((data) => {
                        const product = products[data];
                        return (
                            <NavLink to={`/product-details/${product.id}`} key={product.image} className="h-80 rounded-sm hover:scale-[98%] p-1 transition-all w-60 border">
                                {/* Product image :  */}
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt="product image"
                                        className="w-full rounded-sm h-60 object-cover "
                                    />
                                    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/10 hover:from-black/60   hover:h-40 to-transparent bg-opacity-50  z-10"></div>
                                </div>

                                {/* model :  */}
                                <div className="px-2 flex items-center justify-between mt-1">
                                    <h3 className="font-bold text-lg text-gray-500">{product.brand}</h3>
                                    <i
                                        onClick={
                                            () => dispatch(addToCart(product),
                                                console.log("ProductCard", product),

                                                toast.success("Product has been added to cart")
                                            )}
                                        className="bi bi-cart-plus-fill text-xl text-green-700 cursor-pointer"></i>
                                </div>

                                {/* price :  */}
                                <div className="px-2">
                                    <p className="text-sm font-bold">₹{product.price}</p>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductCard