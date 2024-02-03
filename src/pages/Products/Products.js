import React, { useEffect } from "react";
import Layout from "../../Layouts/Layout";
import { useState } from "react";
import TableLayout from "../../components/table";
import { delIcon, edit, hidden, show } from "../../SvgsIcons/SvgsImages";
import Modal from "../../components/modal";
import { toast } from "react-toastify";
// import './home.css'
// import './foods.css'
import axios from "axios";
import {
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlinePlus,
} from "react-icons/ai";
import { Spinner } from "reactstrap";
import { useNavigate } from "react-router";
import { getFoodsCats } from "./functions/getAll";
import { changeStatus } from "./functions/changeStatus";
import { AddNewCatFoods } from "./functions/handleAddNewCat";
import { editFoodCat } from "./functions/editCat";
const Products = () => {
  const navigate = useNavigate();
  const [imgUrl,setImgUrl]=useState('');
  const [originalProducts,setOriginalProducts]=useState([])
  const [showAddModal, setShowAddModal] = useState(false);
  const [ingredients, setIngredients] = useState([
    {
      ingradinat_id: 0,
      ingradinat_name: "",
    },
  ]);
  const [wayPrep, setWayPrep] = useState([
    {
      way_id: "",
      way_text: "",
    },
  ]);

  const [products, setProducts] = useState([]);
  const [searchHeaderKet, setSearchHeaderKey] = useState("");
  const [newEle, setNewEle] = useState({
    name: "",
    image: "",
    for:1,
    product_price: "",
    description: "",
  });
  const [imgLoading, setImgLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showDelModal, setShowDelModal] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const headers = [
    {
      label: "*",
      dataIndex: "food_categories_id",
      // sort: true,
      // search: true,
    },
    {
      label: "صورة",
      // sort: true,
      type: "children",
      children: ({ headers, row }) => {
        return (
          <div>
            <img
              onClick={() => {
                // console.log(row)
                navigate("/foods", { state: { category: row } });
              }}
              style={{ width: "60px",height:'60px',cursor:'pointer' }}
              src={row.food_categories_image}
              alt=""
            />
          </div>
        );
      },
      // search: true,
    },
    {
      label: "إسم الفئه",
      dataIndex: "food_categories_name",
      // sort: true,
      // search: true,
    },

    {
      label: "أوامر",
      type: "children",
      children: ({ headers, row }) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span
              onClick={() => {
                setShowEditModal(true);
                setRowData(row);
                setImgUrl(row.food_categories_image);
                setIngredients(row.ingrediants);
                console.log(row)
                setWayPrep(row.wayprep);
              }}
              style={{ color: "green", cursor: "pointer" }}
            >
              {edit}
            </span>
            {row.hidden == "1" ? (
              <span
                onClick={() => {
                  setShowChangeStatusModal(true);
                  setRowData(row);
                }}
                style={{ color: "red", cursor: "pointer" }}
              >
                {hidden}
              </span>
            ) : (
              <span
                onClick={() => {
                  setShowChangeStatusModal(true);
                  setRowData(row);
                }}
                style={{ color: "green", cursor: "pointer" }}
              >
                {show}
              </span>
            )}
          </div>
        );
      },
    },
  ];



  const handleSearch = (txt) => {
    let allData = [...originalProducts];
    let pushedData = [];
    if (txt.length == 0) {
      setProducts(allData);
    } else {
      for (let i = 0; i < allData.length; i++) {
        if (allData[i].food_categories_name.toLocaleLowerCase().includes(txt)) {
          pushedData.push(allData[i]);
        }
      }
      setProducts(pushedData);
    }
  };
  useEffect(()=>{
    getFoodsCats(setPageLoading,setProducts,setOriginalProducts)
  },[])
  return (
    <Layout
      children={
        <div>
          <div className="home">
            {pageLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="search_component">
                  <input
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    type="text"
                    placeholder="إبحث هنا...."
                  />
                </div>
                <TableLayout
                  searchHeaderKet={searchHeaderKet}
                  headers={headers}
                  data={products}
                />
              </>
            )}
          </div>

          <Modal
            open={showAddModal}
            toggle={setShowAddModal}
            headerTitle={"إضافه فئه جديد"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // handleAddProduct();
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم الفئه:</label>
                      <input
                        onChange={(e) => {
                          setNewEle({
                            ...newEle,
                            name: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="إسم الفئه"
                      />
                    </div>

                    <div>
                        <label htmlFor="">لمن:</label>
                        <select value={newEle.for} onChange={(e)=>{
                          setNewEle({...newEle,for:e.target.value})
                        }} className="form-control">
                          <option value={1}>الأم</option>
                          <option value={2}>الإبن</option>
                        </select>
                      </div>
                      {
                      imgUrl&&<img style={{width:'100%',height:'100px'}} src={imgUrl} alt="" />
                    }
                    <div>
                      <label htmlFor="">
                        <span>صوره الفئه:</span>
                        {
                          imgLoading?
                          (
                            <Spinner/>
                          )
                          :
                          (
                            null
                          )
                        }
                      </label>
                      <input
                        onChange={(e) => {
                          setImgUrl(URL.createObjectURL(e.target.files[0]))
                          setImg(e.target.files[0]);
                        }}
                        type="file"
                        name=""
                        id=""
                      />
                    </div>
                    <button
                      onClick={()=>{
                        AddNewCatFoods(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,newEle,setShowAddModal)
                      }}
                      style={{ cursor: addLoading||imgLoading ? "no-drop" : "pointer" }}
                      disabled={addLoading||imgLoading}
                      className="add_btn"
                    >
                      {addLoading||imgLoading ? <AiOutlineLoading /> : "إضافه"}
                    </button>
                  </form>
                </div>
              </>
            }
          />

          <Modal
            open={showEditModal}
            toggle={setShowEditModal}
            headerTitle={"تعديل الفئه"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // handleAddProduct();
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم الفئه:</label>
                      <input
                        value={rowData.food_categories_name}
                        onChange={(e) => {
                          setRowData({
                            ...rowData,
                            food_categories_name: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="إسم الفئه"
                      />
                    </div>

                      {
                      imgUrl&&<img style={{width:'100%',height:'100px'}} src={imgUrl} alt="" />
                    }
                    <div>
                      <label htmlFor="">
                        <span>صوره الفئه:</span>
                        {
                          imgLoading?
                          (
                            <Spinner/>
                          )
                          :
                          (
                            null
                          )
                        }
                      </label>
                      <input
                        onChange={(e) => {
                          setImgUrl(URL.createObjectURL(e.target.files[0]))
                          setImg(e.target.files[0]);
                        }}
                        type="file"
                        name=""
                        id=""
                      />
                    </div>
                    <button
                      onClick={()=>{
                        editFoodCat(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,rowData,setShowEditModal)
                        // AddNewCatFoods(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,newEle,setShowAddModal)
                      }}
                      style={{ cursor: addLoading||imgLoading ? "no-drop" : "pointer" }}
                      disabled={addLoading||imgLoading}
                      className="add_btn"
                    >
                      {addLoading||imgLoading ? <AiOutlineLoading /> : "تعديل"}
                    </button>
                  </form>
                </div>
              </>
            }
          />


          <Modal
            open={showChangeStatusModal}
            toggle={setShowChangeStatusModal}
            headerTitle={`تغيير الحاله`}
            children={
              <>
                <h5>
                  هل تريد {rowData.hidden == "1" ? "إظهار" : "إخفاء"} هذا الفئه
                  ({rowData.food_categories_name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      changeStatus(setChangeLoading,rowData,setPageLoading,setProducts,setOriginalProducts,setShowChangeStatusModal)
                      // handleChangeStatus();
                    }}
                  >
                    {changeLoading ? <AiOutlineLoading /> : "نعم"}
                  </button>

                  <button
                    className="btn btn-primary"
                    width={"fit-content"}
                    onClick={() => {
                      setShowChangeStatusModal(false);
                    }}
                  >
                    لا
                  </button>
                </div>
              </>
            }
          />
        </div>
      }
      page_name={"فئات الطعام"}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default Products;
