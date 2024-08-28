// type Menu = {
//     menus: {
//         id: string,
//         title: string,
//     }[],
//     activeMenu: string,
//     setActiveMenu: Function,
// };

// const TabMenu = ({ menus, activeMenu, setActiveMenu }: Menu) => {
//     const handleClick = (e: React.MouseEvent<HTMLElement>) => {
//         const { id } = e.target as HTMLElement;
//         setActiveMenu(id);
//     };

//   return (
//     <ul onClick={handleClick} className="flex text-center border-t-2 border-middle-gray bg-white">
//     {menus.map((menu) => {
//         return (
//             <li key={menu.id} id={menu.id} className={`${activeMenu === menu.id ? 'text-main-purple border-b-2 border-main-purple' : ''} flex-grow py-[14px]`}>{menu.title}</li>
//         )
//     })}
//   </ul>
//   )
// }
// export default TabMenu

const TabMenu = ({label}: {label: string}) => {
    return (
        <span>{label}</span>
    )
}

export default TabMenu;