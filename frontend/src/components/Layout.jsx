/* eslint-disable react/prop-types */
// Create a Layout component
import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="flex-1">{children}</main>
    </>
  )
}

export default Layout