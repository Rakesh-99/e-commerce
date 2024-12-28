import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";





// implement lazy loading routes: 
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Contact = lazy(() => import("./pages/Contact"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/user-profile/Profile"));
const EditProfile = lazy(() => import("./pages/user-profile/EditProfile"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CategoryProductListing = lazy(() => import("./pages/CategoryProductsListing"));


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        )
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={<Loader />}>
            <Signin />
          </Suspense>
        )
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loader />} >
            <Signup />
          </Suspense>
        )
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgetPassword />
          </Suspense>
        )
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: "verify-email",
        element: (
          <Suspense fallback={<Loader />}>
            <VerifyEmail />
          </Suspense>
        )
      },
      {
        path: "user/api/reset-password-instruction/:passwordToken",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        )
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        )
      },
      {
        path: "edit-profile",
        element: (
          <Suspense fallback={<Loader />}>
            <EditProfile />
          </Suspense>
        )
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: "product-details/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        )
      },
      {
        path: "/category-product-listing/:getCategory",
        element: (
          <Suspense fallback={<Loader />}>
            <CategoryProductListing />
          </Suspense>
        )
      }
    ]
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App