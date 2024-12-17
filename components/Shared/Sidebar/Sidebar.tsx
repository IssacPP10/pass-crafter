import Logo from "../Logo/Logo";
import SidebarRoutes from '../SidebarRoutes/SidebarRoutes';

export function Sidebar() {
  return (<>
    <div className="py-6">
        <Logo />
    </div>
    <SidebarRoutes />
  </>
  );
}
