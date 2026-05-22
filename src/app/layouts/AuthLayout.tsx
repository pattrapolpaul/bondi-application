import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Status bar space */}
      <div className="h-11" />
      <div className="px-5 pb-10">
        <Outlet />
      </div>
    </div>
  );
}
