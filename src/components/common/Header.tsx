import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOutUser } from "../../services/firebase";
import { ShoppingBag, User, LogOut, ChevronDown, Bookmark } from "lucide-react";
import { getGreeting } from "../../utils/greeting";

export const Header = () => {
  const { currentUser, userData, shortlist, favorites } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-black italic text-[#0D3356]">
              FashionHub
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 ml-12">
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Category
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Brand
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              FAQ's
            </Link>
          </nav>

          {/* Spacer to push user section to the right */}
          <div className="flex-1"></div>

          {/* User Section */}
          {currentUser && (
            <div className="flex items-center space-x-6">
              {/* Shopping Cart */}
              <div className="relative">
                <button
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  aria-label="Shopping cart (3 items)"
                  title="Shopping cart"
                >
                  <ShoppingBag className="w-5 h-5 text-amber-700" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">3</span>
                  </div>
                </button>
              </div>
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    aria-label="Profile"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {currentUser?.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs text-gray-500">{getGreeting()}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {userData?.name || "User"}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        isProfileOpen ? "rotate-180" : ""
                      } hidden lg:block`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {userData?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentUser.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        View Profile
                      </Link>

                      <Link
                        to="/my-lists"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 mr-3" />
                        My Lists ({favorites.length + shortlist.length})
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
