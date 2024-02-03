// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import Categories from "./pages/Categories/Categories";
import CategoryProducts from "./pages/Category_products/Category_products";
function App() {
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  return (
    <div className="app">
      <Routes>
        {!localStorage?.getItem("mkawel_data") ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Categories />} />
            <Route path="*" element={<Categories />} />
            <Route path="/category_products" element={<CategoryProducts/>}/>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
