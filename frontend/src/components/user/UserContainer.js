import React from "react";
import Widgets from "../user/Widgets/Widgets";
import Featured from "../user/FeaturedCharts/FeaturedChart";

const UserContainer = () => {
  return (
    <div className="UserContainer" style={{ backgroundColor: " #1e1e2f" }}>
      <div className="Widgets">
        <Widgets />
      </div>

      <div className="charts">
        <Featured />
      </div>
    </div>
  );
};

export default UserContainer;
