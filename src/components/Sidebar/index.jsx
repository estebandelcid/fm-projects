export const Sidebar = () => {
    return (
    <div className="h-full w-52 flex flex-col justify-between fixed left-0 top-0 bottom-0 z-20 py-4 px-2 bg-[#2e3a44] ">
    <div className="flex-grow">
      <img src="/logo_white.png" alt="logo" className="w-full"/>
      <ul className="space-y-2">
        <li className="px-6 py-2 ml-4 mr-0 text-sm text-right text-white bg-black/60">Pedidos</li>
      </ul>
    </div>

    <div className="mt-4">
      <p className="text-sm text-gray-600 hover:text-gray-800">© 2024 Empresa XYZ</p>
    </div>
  </div>
    )
}