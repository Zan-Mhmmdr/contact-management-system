import { Outlet } from "react-router";

const Layout: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4">
            <Outlet />
        </div>

    );
}

export default Layout;