import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import axios from "axios";
import { Spinner } from "reactstrap";
import TableLayout from "../../components/table";
import { delIcon, edit, show, hidden } from "../../SvgsIcons/SvgsImages";
import { AiOutlineLoading } from "react-icons/ai";
import Modal from "../../components/modal";
import { toast } from "react-toastify";
import { getAll } from "./functions/getAll";
import { changeStatus } from "./functions/changeStatus";
import { addNewCategory } from "./functions/AddNewCategory";
import { Loader } from "rsuite";
import { editCategory } from "./functions/editCategory";
import { useLocation, useNavigate } from "react-router";

const Categories = () => {
const navigate=useNavigate()
  const [img,setImg]=useState(null)
  const [imgUrl,setImgUrl]=useState('')
  const [imgLoading,setImgLoading]=useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [originalCategories, setOriginalCategories] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showDelModal, setShowDelModal] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [searchHeaderKet, setSearchHeaderKet] = useState("");
  const [newCategory, setNewCategory] = useState({
    category_description: "",
    category_name: "",

  });
  const headers = [
    {
      label: "*",
      dataIndex: "id",
    },
    {
      label: "الصوره",
      dataIndex:'category_image',
      type: "children",
      children: ({ headers, row }) => {
        return (
          <div>
            <img style={{ width:'50px' }} src={row.category_image} alt="" />
          </div>
        );
      },
    },
    {
      label: "الإسم",
      dataIndex: "category_name",
      type:'children',
      children:({row,header})=>{
        return(
          <p
            style={{
            color:'blue',
            cursor:'pointer'
            }}
            onClick={()=>{
              navigate("/category_products",{state:{category:row}})
            }}
          >
            {row.category_name}
          </p>
        )
      }
      // sort: true,
      // search: true,
    },
    {
      label: "الوصف",
      dataIndex: "category_description",
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
                setImgUrl(row.category_image)
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
  const handleEdit = () => {
    setEditLoading(true);
    const data_send = {
      ...rowData,
    };
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowEditModal(false);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setEditLoading(false);
      });
  };
  const handleAddNoti = () => {
    setEditLoading(true);
    const data_send = {
      ...newCategory,
    };
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowAddModal(false);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setEditLoading(false);
      });
  };



  const handleSearch = (txt) => {
    let allData = [...originalCategories];
    let pushedData = [];
    if (txt.length == 0) {
      setCategories(allData);
    } else {
      for (let i = 0; i < allData.length; i++) {
        if (
          allData[i].category_name.toLocaleLowerCase().includes(txt) ||
          allData[i].category_description.toLocaleLowerCase().includes(txt)
        ) {
          pushedData.push(allData[i]);
        }
      }
      setCategories(pushedData);
    }
  };

  useEffect(()=>{
    getAll(setPageLoading,setCategories,setOriginalCategories);
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
                    className="form-control"
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
                  data={categories}
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
                      addNewCategory(setChangeLoading,setPageLoading,setCategories,newCategory,setShowAddModal,img,setImgLoading,setOriginalCategories);
                    }}
                    className="add_form"
                    action=""
                  >
                    {
                      imgUrl&&<img style={{width:'100%',height:'100px'}} src={imgUrl} alt="" />
                    }
                      <div>
                      <label htmlFor="">
                        <span>صورة الفئه:</span>
                        {
                          imgLoading?(<Loader/>):(
                            null
                          )
                        }
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setImgUrl(URL.createObjectURL(e.target.files[0]))
                          setImg(e.target.files[0])
                        }}
                        placeholder="تصنيف الواجهه"
                      />
                    </div>
                    <div>
                      <label htmlFor="">إسم الفئه:</label>
                    <input placeholder="إسم الفئه" type="text" onChange={(e)=>{
                      setNewCategory({...newCategory,category_name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor="">وصف الفئه:</label>
                      <textarea name="" onChange={(e)=>{
                      setNewCategory({...newCategory,category_description:e.target.value})
                    }} placeholder="وصف الفئه" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button
                      style={{ cursor: changeLoading||imgLoading ? "no-drop" : "pointer" }}
                      disabled={changeLoading||imgLoading}
                      className="add_btn"
                    >
                      {changeLoading||imgLoading ? <AiOutlineLoading /> : "إضافه"}
                    </button>
                  </form>
                </div>
              </>
            }
          />

          <Modal
            open={showEditModal}
            toggle={setShowEditModal}
            headerTitle={"تعديل الفئه "}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editCategory(setChangeLoading,setPageLoading,setCategories,rowData,setShowEditModal,img,setImgLoading,setOriginalCategories);
                    }}
                    className="add_form"
                    action=""
                  >
                    {
                      imgUrl&&<img style={{width:'100%',height:'100px'}} src={imgUrl} alt="" />
                    }
                      <div>
                      <label htmlFor="">
                        <span>صورة الفئه:</span>
                        {
                          imgLoading?(<Loader/>):(
                            null
                          )
                        }
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setImgUrl(URL.createObjectURL(e.target.files[0]))
                          setImg(e.target.files[0])
                        }}
                        placeholder="تصنيف الواجهه"
                      />
                    </div>
                    <div>
                      <label htmlFor="">إسم الفئه:</label>
                    <input placeholder="إسم الفئه" value={rowData.category_name} type="text" onChange={(e)=>{
                      setRowData({...rowData,category_name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor="">وصف الفئه:</label>
                      <textarea name="" value={rowData.category_description} type="text" onChange={(e)=>{
                      setRowData({...rowData,category_description:e.target.value})
                    }} placeholder="وصف الفئه" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button
                      style={{ cursor: changeLoading||imgLoading ? "no-drop" : "pointer" }}
                      disabled={changeLoading||imgLoading}
                      className="add_btn"
                    >
                      {changeLoading||imgLoading ? <AiOutlineLoading /> : "تعديل"}
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
                  هل تريد {rowData.category_hidden == "1" ? "إظهار" : "إخفاء"} هذه
                  الفئه ({rowData.category_name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      changeStatus(setChangeLoading,rowData,setPageLoading,setShowChangeStatusModal,setCategories,setOriginalCategories)
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
      page_name={"الفئات"}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default Categories;
