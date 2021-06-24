import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import firebase from "../Firestore";

const DashboardPage = ({ history }) => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default withRouter(DashboardPage);
