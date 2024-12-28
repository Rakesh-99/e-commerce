import { useState } from 'react';
import imageSlider1 from '../assets/banner images/bannerImage1.jpg'
import imageSlider2 from '../assets/banner images/bannerImage2.jpg';
import imageSlider3 from '../assets/banner images/bannerImage3.jpg';
import imageSlider4 from '../assets/banner images/bannerImage4.jpg';
import imageSlider5 from '../assets/banner images/bannerImage5.jpg';
import imageSlider6 from '../assets/banner images/bannerImage6.jpg';
import imageSlider7 from '../assets/banner images/bannerImage7.jpg';
import { ImageSlideTypes } from '@/constants/dataTypes';



const Slider = () => {

    const [count, setCount] = useState(0);

    const imageSliders: ImageSlideTypes = [
        {
            name: "Riding gears",
            slide: imageSlider1
        },
        {
            name: "Cloths",
            slide: imageSlider2
        },
        {
            name: "Makeup",

            slide: imageSlider3
        },
        {
            name: "Daily needs",

            slide: imageSlider4
        },
        {
            name: "Bluetooth",

            slide: imageSlider5
        },
        {
            name: "Smartphone",

            slide: imageSlider6
        },
        {
            name: "Men's Cloth",
            slide: imageSlider7
        }
    ]

    const prevImage = () => {

        // setInterval(() => {
        //     console.log("Hello");
        // }, 1000)
        setCount(count === 0 ? imageSliders.length - 1 : count - 1);
    }

    const nextImage = () => {
        setCount(count === imageSliders.length - 1 ? 0 : count + 1)  //[1,2,3,4,5,6,7]
    }

    // Set interval : 
    // setInterval(nextImage, 4000);
    return (
        <>
            <div className="flex  my-5 relative justify-center flex-col items-center">
                {
                    imageSliders.map((values: { slide: string, name: string }, idx: number) =>
                        count === idx && (
                            <div className="w-full  flex justify-center" key={idx}>
                                {/* Product image :  */}
                                <img src={values.slide} alt="banner image" className='w-[95%] h-96   object-cover  duration-1000 ease-in-out' />

                                {/* Product title :  */}
                                <div className="absolute bottom-10">
                                    <h3 className='font-semibold text-3xl text-white'>{values.name}</h3>
                                </div>
                            </div>
                        )
                    )
                }

                {/* Left Slider button :  */}

                <div className="absolute left-10">
                    <i className="bi bi-arrow-left-circle z-50 text-3xl shadow-2xl text-white ml-10" onClick={prevImage}></i>
                </div>


                {/* Right Slider button :  */}

                <div className="absolute right-20">
                    <i className="bi bi-arrow-right-circle z-50 text-3xl shadow-2xl text-white ml-10" onClick={nextImage}></i>
                </div>
            </div>



        </>
    )
}

export default Slider