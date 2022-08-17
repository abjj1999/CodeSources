import React from "react";
import UserRoutes from "../../components/routes/UserRoutes";
const Dashboard = () => {
  return (
    <UserRoutes>
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center">DashBoard Page</h1>
        </div>
      </div>
    </UserRoutes>
  );
};

export default Dashboard;
