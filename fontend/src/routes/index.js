import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PromotionPage from "../pages/PromotionPgae/PromotionPage";
import ProductsManagentPage from "../pages/ProductsManagentPage/ProductsManagentPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import FemaleProductPage from "../pages/FemaleProductPage/FemaleProductPage";
import DiscoverShoePage from "../pages/DiscoverShoePage/DiscoverShoePage";
import AdminManagentPage from "../pages/AdminManagentPage/AdminManagentPage";
import ProductsTypePage from "../pages/ProductTypePage/ProductTypePage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccessPage/OrderSuccessPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import MyOrderPage from "../pages/MyOrder/MyOrder";

export const routes = [
    {
        path: '/',
        page: HomePage,
        showHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        showHeader: true,
    },
    {
        path: '/type-products/:type',
        page: ProductsTypePage,
        showHeader: true,
    },
    {
        path: '/female-products',
        page: FemaleProductPage,
        showHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        showHeader: true,
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        showHeader: true,
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        showHeader: true,
    },
    {
        path: '/order-success',
        page: OrderSuccess,
        showHeader: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        showHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        showHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        showHeader: false,
    },
    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        showHeader: true,
    },
    {
        path: '/promotion',
        page: PromotionPage,
        showHeader: true,
    },
    {
        path: '/discover',
        page: DiscoverShoePage,
        showHeader: true,
    },
    // {
    //     path: '/user-managent',
    //     page: UserManagementComponent,
    //     showHeader: true,
    // },
    {
        path: '/products-managent',
        page: ProductsManagentPage,
        showHeader: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        showHeader: true,
    },
    {
        path: '/manage',
        page: AdminManagentPage,
        showHeader: false,
    },
]
