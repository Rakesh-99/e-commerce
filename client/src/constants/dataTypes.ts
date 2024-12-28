export type NavMenuTypes = {
    id: number
    label: string,
    path: string
}[]

export type ProductCategoriesTypes = {
    id: number,
    label: string
}[]

export type ImageSlideTypes = {
    name: string
    slide: string
}[]

export const productCategories = [

    {
        category: "Mobile",
        path: "mobile",
        image: "https://m.media-amazon.com/images/I/71DoeQ838GL._AC_UF1000,1000_QL80_.jpg"
    },

    {
        category: "Laptop",
        path: "laptop",
        image: "https://media.croma.com/image/upload/v1663415318/Croma%20Assets/Computers%20Peripherals/Laptop/Images/245228_0_uyb1zl.png"
    },


    {
        category: "Cloths",
        image: "https://belk.scene7.com/is/image/Belk?layer=0&src=4503185_86M188G_A_088&$DWP_PRODUCT_PLP_MOBILE_t1$",
        path: "cloths"
    },
    {
        category: "Watch",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpS73bWjs46V1Q4ROPHzZZRCGwr3teL57d-Q&s",
        path: "watch",
    },
    {
        category: "Bluetooth Speaker",
        image: "https://www.boat-lifestyle.com/cdn/shop/files/STONE350PRO_Blue_07_1500x.jpg?v=1720589782",
        path: "bluetooth-speaker"
    },
    {
        category: "Television",
        image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1631807418-sony-xr-z9j-1631807407.jpg?crop=1xw:1xh;center,top&resize=980:*",
        path: "television"
    }
]



