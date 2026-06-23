import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import PredictOrders from "./pages/preditctorders.jsx";
import PublicPageLayout from "./components/publicPageLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import History from "./pages/history.jsx";
import ApiKeyPage from "./pages/apikey.jsx";
import UsagePage from "./pages/usage.jsx";
import Pricing from "./pages/pricing.jsx";
import Admin from "./pages/admin.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Privacy from "./pages/privacy.jsx";
import Terms from "./pages/terms.jsx";
import ForgotPassword from "./pages/forgotpassword.jsx";
import NotFound from "./pages/NotFound";
import WhatsAppDashboard from "./pages/whatsapp/WhatsAppDashboard.jsx";
import VerificationOrders from "./pages/whatsapp/VerificationOrders.jsx";
import OrderDetails from "./pages/whatsapp/OrderDetails.jsx";
import WhatsAppAnalytics from "./pages/whatsapp/Analytics.jsx";
import WhatsAppBrands from "./pages/whatsapp/Brands.jsx";
import BrandSettings from "./pages/whatsapp/BrandSettings.jsx";
import Account from "./pages/account.jsx";
import ApiIntegration from "./pages/apiintegration.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminRoute from "./pages/AdminRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <PredictOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp"
          element={
            <ProtectedRoute>
              <WhatsAppDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp/orders"
          element={
            <ProtectedRoute>
              <VerificationOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp/analytics"
          element={
            <ProtectedRoute>
              <WhatsAppAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp/brands"
          element={
            <ProtectedRoute>
              <WhatsAppBrands />
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp/brands/:id"
          element={
            <ProtectedRoute>
              <BrandSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/api-access"
          element={
            <ProtectedRoute>
              <ApiKeyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usage"
          element={
            <ProtectedRoute>
              <UsagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/api"
          element={
            <ProtectedRoute>
              <ApiIntegration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
