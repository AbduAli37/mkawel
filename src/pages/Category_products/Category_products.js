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
import { useLocation, useNavigate } from "react-router";
import { getAll } from "./functions/getAll";
import { AddNewProduct } from "./functions/addNewProduct";
import { changeStatus } from "./functions/changeStatus";
import { editProduct } from "./functions/edir_product";
// import { getAll } from "../Categories/functions/getAll";
// import { getFoodsCats } from "./functions/getAll";
// import { changeStatus } from "./functions/changeStatus";
// import { AddNewCatFoods } from "./functions/handleAddNewCat";
// import { editFoodCat } from "./functions/editCat";
const CategoryProducts = () => {
  const location=useLocation();
  // console.log(location)
  const navigate=useNavigate();
  const [imgUrl,setImgUrl]=useState('');
  const [originalProducts,setOriginalProducts]=useState([])
  const [showAddModal, setShowAddModal] = useState(false);
  const [products,setProducts]=useState([])
  const [imgLoading, setImgLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [newEle,setNewEle]=useState({
    name:'',
    description:'',
  })
  const [searchHeaderKet,setSearchHeaderKet]=useState('')
  const headers = [
    {
      label: "*",
      dataIndex: "id",
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
              src={row.image}
              alt=""
            />
          </div>
        );
      },
      // search: true,
    },
    {
      label: "إسم العنصر",
      dataIndex: "name",
      // sort: true,
      // search: true,
    },
    {
      label: "وصف العنصر",
      dataIndex: "description",
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
                setImgUrl(row.image);
                console.log(row)
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
        if (allData[i].name.toLocaleLowerCase().includes(txt)||allData[i].description.toLocaleLowerCase().includes(txt)) {
          pushedData.push(allData[i]);
        }
      }
      setProducts(pushedData);
    }
  };
  if(!location?.state){
    navigate(-1)
  }
  useEffect(()=>{
    getAll(setPageLoading,setProducts,setOriginalProducts,location?.state?.category?.id)
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
                    className="form-control"
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
            headerTitle={"إضافه عنصر جديد"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      AddNewProduct(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,newEle,setShowAddModal,location?.state?.category?.id)
                      // handleAddProduct();
                    }}
                    className="add_form"
                    action=""
                  >
                      {
                      imgUrl&&<img style={{width:'100%',height:'100px'}} src={imgUrl} alt="" />
                    }
                    <div>
                      <label htmlFor="">
                        <span>صوره العنصر:</span>
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
                    <div>
                      <label htmlFor="">إسم العنصر</label>
                      <input type="text" placeholder="إسم العنصر" onChange={(e)=>{
                        setNewEle({...newEle,name:e.target.value})
                      }}/>
                    </div>
                    <div>
                      <label htmlFor="">وصف العنصر</label>
                      <textarea name="" placeholder="وصف العنصر" onChange={(e)=>{
                        setNewEle({...newEle,description:e.target.value})
                      }} id="" cols="30" rows="10"></textarea>
                    </div>
                    <button
                      onClick={()=>{
                        // AddNewCatFoods(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,newEle,setShowAddModal)
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
            headerTitle={"تعديل العنصر"}
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
                      <label htmlFor="">إسم العنصر:</label>
                      <input
                        value={rowData.name}
                        onChange={(e) => {
                          setRowData({
                            ...rowData,
                            name: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="إسم العنصر"
                      />
                    </div>
                    <div>
                      <label htmlFor="">وصف العنصر:</label>
                      <textarea name=""
                        value={rowData.description}
                        onChange={(e) => {
                          setRowData({
                            ...rowData,
                            description: e.target.value,
                          });
                        }} id="" cols="30" rows="10"></textarea>
                    </div>

                      {
                      imgUrl&&<img style={{width:'100%',height:'100px'}} src={imgUrl} alt="" />
                    }
                    <div>
                      <label htmlFor="">
                        <span>صوره العنصر:</span>
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
                        editProduct(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,rowData,setShowEditModal,location?.state?.category?.id)
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
                  هل تريد {rowData.hidden == "1" ? "إظهار" : "إخفاء"} هذا العنصر
                  ({rowData.name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      changeStatus(setChangeLoading,rowData,setPageLoading,setProducts,setOriginalProducts,setShowChangeStatusModal,location?.state?.category?.id)
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
      page_name={"عناصر البنود"}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default CategoryProducts;
