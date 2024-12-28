
import { useParams } from "react-router-dom"
import productData from '../data/product.json'





const CategoryProductsListing = () => {

    const params = useParams();
    const { getCategory } = params;
    const { products } = productData;




    return (
        <>
            <div className="">
                {
                    products.filter((data) => data.category === getCategory).map((getProd) => {
                        console.log(getProd);

                        return (
                            <div className="" key={getProd.id}>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CategoryProductsListing