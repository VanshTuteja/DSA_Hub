import { Network } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import UserProfileDropdown from "./UserProfileDropdown";

const Navbar: React.FC = () => {
    return (
        <div className="sticky top-0 z-50 flex justify-between items-center py-2">
            
                
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg shadow-lg">
                                <Network className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    DSA Assessment Hub
                                </h1>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">AI-Powered Learning System</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="hidden lg:block">
                            <ThemeToggle />
                            </div>
                            <div className="hidden lg:block">
                                <UserProfileDropdown />
                            </div>
                        </div>
                    </div>
          
    )
}

export default Navbar;
