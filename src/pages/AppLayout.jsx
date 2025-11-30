import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AppLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  useEffect(
    function () {
      if (!user) navigate("/login");
    },
    [user, navigate]
  );
  return <Outlet />;
}

export default AppLayout;
