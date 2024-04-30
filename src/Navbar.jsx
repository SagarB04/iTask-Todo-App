const Navbar = () => {
  return (
    <nav className="w-full flex  justify-between items-center px-3 h-[7vh] bg-blue-950 text-blue-100">
      <h2 className="text-xl hover:cursor-pointer">iTask</h2>
      <ul className="flex space-x-4 text-md ">
        <li className=" hover:font-[500] hover:scale-105 hover:cursor-pointer">Home</li>
        <li className="hover:font-[500] hover:scale-105 hover:cursor-pointer">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
