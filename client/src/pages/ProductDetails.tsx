import { NavLink, useParams } from "react-router-dom"
import productData from '../data/product.json';
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/feature/cart/CartSlice";
import { useDispatch } from "react-redux";


const ProductDetails = () => {

    const { id } = useParams();
    const { products } = productData;
    const dispatch = useDispatch

    let fetchProd;
    if (id && products) {
        fetchProd = products.filter((product) => product.id === Number(id));
    }


    const addToCartBtn = (product: any) => {
        console.log("Product Details", product);

    }






    return (
        <>
            <div className="flex items-center w-full ">
                {
                    fetchProd && fetchProd.map((product) => {
                        return (

                            <div className="flex mt-5" key={product.id}>

                                {/* left content : */}
                                <div className="w-1/3  sticky top-20 mx-20">
                                    <img src={product.image} className=" w-full h-full object-cover" alt="product image" />
                                </div>

                                {/* Right content :  */}
                                <div className="flex-1  pr-5 flex flex-col items-start gap-3 mt-10 overflow-y-hidden">

                                    {/* Title :  */}
                                    <div className="flex items-center bg-gray-50 px-2 py-1 gap-1">
                                        <Label className="">{product.brand}</Label>
                                        <Label>{product.category}</Label>
                                    </div>
                                    <h3 className="text-2xl font-poppins font-light">{product.model ? product.model : product.category}</h3>



                                    {/* ratings :  */}
                                    <span className="bg-green-600 px-3 rounded-sm text-sm font-bold py-1 inline text-white">
                                        {product.ratings}
                                        <i className="bi ml-2 bi-star-fill"></i>
                                    </span>

                                    {/* price :  */}

                                    <h3 className="font-extrabold text-xl">₹{product.price}</h3>

                                    {/* Available offers :  */}
                                    <div className="">
                                        <h3 className="font-semibold font-poppins">Available offers</h3>
                                        {
                                            product.offers?.map((offer, idx) => {
                                                console.log(offer);

                                                return (
                                                    <div className="flex items-center gap-2 my-1 font-poppins" key={idx}>
                                                        <i className="bi bi-tag-fill"></i>
                                                        <p>{offer}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    {/* Available color :  */}
                                    <div className="flex items-center gap-2">
                                        <Label>Color :</Label>
                                        <span className="bg-gray-500 text-white px-2 text-sm rounded-sm">{product.color}</span>
                                    </div>

                                    {/* Storage option :  */}

                                    <div className="flex items-center gap-2">
                                        <Label>Size or Storgae option :</Label>
                                        <NavLink className=" text-xs" to={"#"}>{product.size || product["storage option"]}</NavLink>
                                    </div>

                                    {/* About Produt :  */}

                                    <div className="mt-2">
                                        <h3 className="font-semibold font-poppins mb-2">About Product</h3>
                                        <p className="text-base">{product.description}</p>
                                    </div>

                                    {/* cart and buy buttons */}
                                    <div className="flex items-center gap-5">

                                        <div className="flex gap-5 mt-2 ">
                                            <Button className="py-5 bg-blue-700 font-bold" onClick={() => addToCartBtn(product)}>
                                                <i className="bi bi-bag-plus-fill"></i>
                                                <Label>Add to Cart</Label>
                                            </Button>
                                            <Button className="py-5 bg-green-700 font-bold">
                                                <i className="bi bi-heptagon"></i>
                                                <Label>Buy product</Label>
                                            </Button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductDetails;

