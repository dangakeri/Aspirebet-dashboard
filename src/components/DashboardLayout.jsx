import { useState, useCallback } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMenu,
  FiChevronLeft,
} from "react-icons/fi";
import { Box2, Coin1, Logout } from "iconsax-react";
import { useAuthState } from "../context/AuthContext";
import { useGetSecondaryWallet } from "../hooks/useTransfer";
import { useFormatCurrency } from "../hooks/useFormatCurrency";
import { Modal } from "antd";

function DashboardLayout() {
  const { formatCurrency } = useFormatCurrency();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { logout } = useAuthState();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { secondaryWalletBalance } = useGetSecondaryWallet();

  const handleLogout = () => setIsModalVisible(true);
  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  const isMobile = () => window.innerWidth < 768;

  // Close menu after click on mobile
  const handleItemClick = useCallback(() => {
    if (isMobile()) setMobileMenuOpen(false);
  }, []);

  const getPageTitle = () => {
    if (location.pathname.startsWith("/dashboard")) return "Dashboard";
    if (location.pathname.startsWith("/users")) return "Users";
    if (location.pathname.startsWith("/bets")) return "Bets";
    if (location.pathname.startsWith("/transactions")) return "Transactions";
    if (location.pathname.startsWith("/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 bg-white border-r border-gray-100 z-20 transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4">
          {sidebarOpen ? (
            <Link to="/">
              <img src="/logo.svg" className="h-10 w-auto" alt="Logo" />
            </Link>
          ) : (
            <h5 className="text-base font-bold"></h5>
          )}
          <div
            onClick={() =>
              isMobile()
                ? setMobileMenuOpen(false)
                : setSidebarOpen(!sidebarOpen)
            }
            className="p-1 hover:cursor-pointer"
          >
            {sidebarOpen ? (
              <FiChevronLeft size={20} color="#000" />
            ) : (
              <FiMenu size={20} color="#000" />
            )}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="mt-6">
          <ul>
            <SidebarItem
              icon={<FiHome size={20} />}
              text="Dashboard"
              to="/dashboard"
              sidebarOpen={sidebarOpen}
              onNavigate={handleItemClick}
            />
            <SidebarItem
              icon={<FiUsers size={20} />}
              text="Users"
              to="/users"
              sidebarOpen={sidebarOpen}
              onNavigate={handleItemClick}
            />
            <SidebarItem
              icon={<Box2 size="20" color="#000" />}
              text="Bets"
              to="/bets"
              sidebarOpen={sidebarOpen}
              onNavigate={handleItemClick}
            />
            <SidebarItem
              icon={<Coin1 size="20" color="#000" />}
              text="Transactions"
              to="/transactions"
              sidebarOpen={sidebarOpen}
              onNavigate={handleItemClick}
            />
            <SidebarItem
              icon={<FiSettings size={20} />}
              text="Settings"
              to="/settings"
              sidebarOpen={sidebarOpen}
              onNavigate={handleItemClick}
            />
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10 relative">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex bg-white items-center space-x-4">
              <button
                className="md:hidden bg-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FiMenu className="text-black" size={22} />
              </button>
              <h2 className="hidden lg:block text-lg font-semibold bg-white text-gray-800">
                {getPageTitle()}
              </h2>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                {formatCurrency(secondaryWalletBalance?.wallet?.balance ?? 0)}
              </div>
              <div
                onClick={handleLogout}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#00ff7f]/20 flex items-center justify-center">
                  <Logout size="20" color="#00ff7f" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white py-4 px-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-700">
            {`AspireBet © ${new Date().getFullYear()}  ASPIRE PRODUCT LIMITED. All rights reserved.`}
          </div>
        </footer>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={confirmLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

function SidebarItem({ icon, text, to, sidebarOpen, onNavigate }) {
  return (
    <li className="px-4 py-2">
      <NavLink
        to={to}
        end
        onClick={onNavigate}
        style={{ color: "#000" }}
        className={({ isActive }) =>
          `flex items-center rounded-lg p-2 transition-colors duration-200 ${
            isActive
              ? "bg-[#00ff7f]/20 text-[#00ff7f]"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <span className="mr-3 text-black">{icon}</span>
        {sidebarOpen && <span className="text-sm font-medium">{text}</span>}
      </NavLink>
    </li>
  );
}

export default DashboardLayout;
