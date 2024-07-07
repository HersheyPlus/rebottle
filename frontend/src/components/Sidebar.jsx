import { Link } from "react-router-dom";
import { FaWineBottle } from "react-icons/fa";
import { sideBarItems } from "../constants/sideItem";

const Sidebar = () => {
  return (
    <section id="sidebar">
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-2 shadow-lg"
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-8 overflow-y-auto bg-gray-50">
          <Link to="/" className="block font-bold text-4xl text-center mb-6">
            <h1 className="inline-flex items-center gap-2">
              <FaWineBottle />
              <span>Re-Bottle</span>
            </h1>
          </Link>
          <ul className="space-y-2 font-medium text-lg lg:text-xl">
            {sideBarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center px-2 py-4 rounded-lg group hover:bg-gray-200"
                >
                  <item.icon />
                  <span className="ms-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
