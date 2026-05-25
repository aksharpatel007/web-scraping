import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PageLayout from "./components/layout/PageLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderTrackingPage = lazy(() => import("./pages/OrderTrackingPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AdminPanelPage = lazy(() => import("./pages/admin/AdminPanelPage"));
const StaticPage = lazy(() => import("./pages/StaticPage"));

const App = () => (
    <PageLayout>
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ProductListingPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/order-tracking"
                    element={
                        <ProtectedRoute>
                            <OrderTrackingPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <WishlistPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <NotificationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <AccountPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminPanelPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/categories" element={<StaticPage title="Categories" />} />
                <Route path="/new-arrivals" element={<StaticPage title="New Arrivals" />} />
                <Route path="/trending-products" element={<StaticPage title="Trending Products" />} />
                <Route path="/deals" element={<StaticPage title="Deals" />} />
                <Route path="/collections" element={<StaticPage title="Collections" />} />
                <Route path="/brands" element={<StaticPage title="Brands" />} />
                <Route path="/about" element={<StaticPage title="About Us" />} />
                <Route path="/blog" element={<StaticPage title="Blog" />} />
                <Route path="/contact" element={<StaticPage title="Contact" />} />
                <Route path="/faq" element={<StaticPage title="FAQ" />} />
                <Route path="/support" element={<StaticPage title="Support" />} />
                <Route path="/track-order" element={<StaticPage title="Track Order" description="Check your latest order status, delivery updates, and shipment progress." />} />
                <Route path="/support-center" element={<StaticPage title="Support Center" description="Find help articles, service options, and quick answers for common shopping questions." />} />
                <Route path="/returns" element={<StaticPage title="Returns & Exchanges" description="Start a return, check exchange eligibility, or review your refund status from one simple help page." />} />
                <Route path="/shipping" element={<StaticPage title="Shipping Info" description="See delivery timelines, shipping options, and order tracking guidance in one place." />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    </PageLayout>
);

export default App;
