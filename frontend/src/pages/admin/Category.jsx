import AddCategory from "../../components/admin/AddCategory";
import NavBarAdmin from "../../components/admin/NavBarAdmin";
import "../../styles/admin/Category.scss";
import CategoryList from "../../components/admin/CategoryList";
import ManageCategory from "../../components/admin/ManageCategory";

export default function Category() {
  return (
    <>
      <NavBarAdmin />
      <main>
        <h1>Origin's Digital category Panel</h1>
        <div className="category-container">
          <AddCategory />
          <div className="category-list-container">
            <CategoryList />
          </div>
          <div className="category-manage-container">
            <ManageCategory />
          </div>
        </div>
      </main>
    </>
  );
}
