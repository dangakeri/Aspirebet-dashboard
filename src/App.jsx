import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import AppLayout from "./pages/AppLayout";
import Bets from "./pages/Bets";
import { ConfigProvider } from "antd";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 100,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#52B9BC",
            fontFamily: "Montserrat, sans-serif",
          },
          components: {
            Button: {
              colorPrimary: "#FF3B3B",
              colorPrimaryHover: "#3aa1a4",
              colorPrimaryActive: "#2a7c7e",
            },
          },
        }}
        modal={{
          centered: true,
          transitionName: "",
          maskTransitionName: "",
        }}
      >
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="dashboard" element={<DashboardHome />} />
                  <Route path="users" element={<Users />} />
                  <Route path="bets" element={<Bets />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ConfigProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "red",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
