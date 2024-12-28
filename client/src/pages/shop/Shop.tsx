import { Separator } from "@/components/ui/separator"
import productData from '../../data/product.json';
import ProductCard from "./ProductCard";






const Shop = () => {

    const { products } = productData;

    return (
        <>
            <div className="w-[80%] m-auto mt-20">

                <div className="flex flex-col justify-center items-center gap-5">
                    <h2 className="font-bold">Featured Product</h2>
                    <Separator className="w-32 border border-yellow-400 t" />
                </div>

                <ProductCard products={products} />

            </div>
        </>
    )
}

export default Shop