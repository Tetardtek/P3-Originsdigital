import React from "react";
import NavBar from "../../components/NavBar";
import ManageUser from "../../components/admin/ManageUser";

export default function Users() {
  return (
    <>
      <NavBar />
      <main>
        <div className="User-container">
          <ManageUser />
        </div>
      </main>
    </>
  );
}
