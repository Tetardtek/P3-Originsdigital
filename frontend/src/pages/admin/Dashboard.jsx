import React from "react";
import NavBar from "../../components/NavBar";
import AddVideo from "../../components/admin/AddVideo";
import "../../styles/admin/Dashboard.scss";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <main>
        <h1>Origin's Digital Admin Panel</h1>
        <div className="container-dashboard">
          <AddVideo />
        </div>
      </main>
    </>
  );
}
