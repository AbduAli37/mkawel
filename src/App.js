// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import Categories from "./pages/Categories/Categories";
import CategoryProducts from "./pages/Category_products/Category_products";
import Companies from "./pages/Companies/Companies";
import Contructors from "./pages/Contructors/Contructors";
import ContWorkers from "./pages/ContWorkers/ContWorkers";
function App() {
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  return (
    <div className="app">
      <Routes>
        {!localStorage?.getItem("mkawel_data") ? (
          <>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Categories />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/contructores" element={<Contructors />} />
            <Route path="/contworkers" element={<ContWorkers />} />
            <Route path="*" element={<Categories />} />
            <Route path="/category_products" element={<CategoryProducts/>}/>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
