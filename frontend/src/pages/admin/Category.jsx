import NavBarAdmin from "../../components/admin/NavBarAdmin";
import AddCategory from "../../components/admin/category/AddCategory";
import CategoryList from "../../components/admin/category/CategoryList";
import ManageCategory from "../../components/admin/category/ManageCategory";
import "../../styles/admin/Category.scss";

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
