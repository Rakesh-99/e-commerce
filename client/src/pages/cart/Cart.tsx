import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux"


const Cart = () => {
    const { cart } = useSelector((state: any) => state.cartslice);


    return (
        <>
            <div className="w-[80%] m-auto">
                {
                    cart && cart.map((data: any) => {
                        console.log(data);

                        return (
                            <div className="w-1/2  " key={data.id}>
                                {/* image :  */}
                                <div className="flex items-center">
                                    <img src={data.image} alt="product image" className="w-28 h-28 object-cover p-2 rounded-md" />
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-medium">{data.category}</h3>
                                        <h3 className="text-sm bg-gray-500 py-1 text-white px-2 rounded-sm">{data.brand}</h3>
                                    </div>
                                </div>
                                <Separator />
                                <div className="">

                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </>
    )
}

export default Cart