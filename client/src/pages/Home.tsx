import Categories from "@/components/product-categories/Categories"
import Slider from "@/components/Slider"
import Bannner from "@/components/Bannner";
import Shop from "./shop/Shop";




const Home = () => {


    const bannerInfo = [
        {
            offer: "Discount upto 30% off",
            title: "Sale is live",
            content1: "Mega sale",
            content2: "SPECIAL DISCOUNT",
            content3: "ITS'S SALE, YOU CAN'T RESIST"
        }
    ]


    return (
        <>
            {/* Slider component :  */}
            <Slider />
            {/* Featured categories :  */}
            <Categories />

            {/* Banner :  */}
            <div className="mt-20">
                <Bannner
                    info={bannerInfo}
                />
            </div>

            {/* shop page :  */}
            <Shop />
        </>
    )
}

export default Home