import BannerImg from '../assets/banner images/bannerIMage8.jpg';
import { Button } from './ui/button';


type BannerInfoType = {
    offer: string
    title: string,
    content1: string,
    content2: string,
    content3: string
}[]


const Bannner = ({ info }: { info: BannerInfoType }) => {




    return (
        <>
            <div className="w-[95%] relative m-auto">

                {/* Banner image :  */}
                <div className="">
                    <img src="" alt="" />
                    <img src={BannerImg}
                        alt="banner image"
                        className='h-96 object-cover w-full'
                    />
                </div>

                {/* banner content :  */}
                <div className="">

                    {
                        info.map((data, idx) => {

                            return (
                                <div className="absolute right-96 top-4" key={idx}>
                                    <div className="flex gap-10 flex-col">
                                        {/* title :  */}
                                        <div className="">
                                            <h2 className='font-Playwrite text-white '>{data.title}</h2>
                                        </div>

                                        {/* offer :  */}
                                        <div className="">
                                            <h1 className='font-dancing text-yellow-400'>{data.offer}</h1>
                                        </div>

                                        {/* content 1:  */}
                                        <div className="">
                                            <h3 className='font-extrabold text-white text-5xl font-pacifico'>{data.content1}</h3>
                                        </div>
                                        {/* content 2:  */}
                                        <div className="flex items-center justify-between font-dancing font-thin text-gray-300">
                                            <h3 className=' w-full'>{data.content2}</h3>
                                            <h3 className=' w-full'>{data.content3}</h3>
                                        </div>

                                        <div className="flex gap-5">
                                            <Button className='w-40 py-5 bg-blue-900 font-bold'>
                                                <i className="bi bi-bag-check-fill"></i>
                                                Shop now</Button>
                                            <Button className='w-40 py-5 bg-blue-900 font-bold'>
                                                <i className="bi bi-cart-dash-fill"></i>
                                                Checkout Cart
                                            </Button>

                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Bannner