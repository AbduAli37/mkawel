import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import axios from "axios";
import { Spinner } from "reactstrap";
import TableLayout from "../../components/table";
import { delIcon, edit, show, hidden } from "../../SvgsIcons/SvgsImages";
import { AiOutlineLoading } from "react-icons/ai";
import Modal from "../../components/modal";
import { toast } from "react-toastify";
// import { getAll } from "";
// import { changeStatus } from "./functions/changeStatus";
import { Loader } from "rsuite";
// import { editCategory } from "./functions/editCategory";
import { useLocation, useNavigate } from "react-router";
import { getAll } from "./functions/getAll";
import { addNewContructor } from "./functions/addNew";
import { editContructor } from "./functions/editContructor";
// import { addNewCompanies } from "./functions/addNew";
// import { editCompany } from "./functions/editCompany";

const Contructors = () => {
  const navigate=useNavigate()
  const [pageLoading, setPageLoading] = useState(false);
  const [contructors, setContructors] = useState();
  const [originalContructors, setOriginalContructors] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [searchHeaderKet, setSearchHeaderKet] = useState("");
  const [newContructor, setnewContructor] = useState({
    email: "",
    name: "",
    phone: "",

  });
  const headers = [
    {
      label: "*",
      dataIndex: "id",
    },
    {
      label: "الإسم",
      dataIndex: "name",
      type:'children',
      children:({row,headers})=>{
        return (
          <div>
            <p
              onClick={()=>{
                navigate("/contworkers",{state:{contructor:row}})
              }}
              style={{
                color:'blue',
                cursor:'pointer',
                fontSize:'20px',
                fontWeight:'600'
              }}
            >{row.name}</p>
          </div>
        )
      }
    },
    {
      label: "رقم الهاتف",
      dataIndex: "phone",
      // sort: true,
      // search: true,
    },
    {
      label: "البريد الإلكترونى",
      dataIndex: "email",
    },
    {
      label: "كلمة السر",
      dataIndex: "password",
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
              }}
              style={{ color: "green", cursor: "pointer" }}
            >
              {edit}
            </span>
            {/* {row.hidden == "1" ? (
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
            )} */}
          </div>
        );
      },
    },
  ];

  const handleSearch = (txt) => {
    let allData = [...originalContructors];
    let pushedData = [];
    if (txt.length == 0) {
      setContructors(allData);
    } else {
      for (let i = 0; i < allData.length; i++) {
        if (
          allData[i].name.toLocaleLowerCase().includes(txt) ||
          allData[i].phone.toLocaleLowerCase().includes(txt) ||
          allData[i].email.toLocaleLowerCase().includes(txt)
        ) {
          pushedData.push(allData[i]);
        }
      }
      setContructors(pushedData);
    }
  };

  useEffect(()=>{
    getAll(setPageLoading,setContructors,setOriginalContructors);
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
                  data={contructors}
                />
              </>
            )}
          </div>

          <Modal
            open={showAddModal}
            toggle={setShowAddModal}
            headerTitle={"إضافه مقاول جديد"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addNewContructor(setChangeLoading,setPageLoading,setContructors,newContructor,setShowAddModal,setOriginalContructors);
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم المقاول:</label>
                    <input placeholder="إسم المقاول" type="text" onChange={(e)=>{
                      setnewContructor({...newContructor,name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> البريد الإلكترونى:</label>
                    <input placeholder="البريد الإلكترونى" type="text" onChange={(e)=>{
                      setnewContructor({...newContructor,email:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> رقم الهاتف :</label>
                    <input placeholder="رقم الهاتف" type="text" onChange={(e)=>{
                      setnewContructor({...newContructor,phone:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> كلمة السر  :</label>
                    <input placeholder="كلمة السر" type="text" onChange={(e)=>{
                      setnewContructor({...newContructor,password:e.target.value})
                    }}/>
                    </div>
                    <button
                      style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                      disabled={changeLoading}
                      className="add_btn"
                    >
                      {changeLoading? <AiOutlineLoading /> : "إضافه"}
                    </button>
                  </form>
                </div>
              </>
            }
          />

          <Modal
            open={showEditModal}
            toggle={setShowEditModal}
            headerTitle={"تعديل المقاول "}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editContructor(setChangeLoading,setPageLoading,setContructors,rowData,setShowEditModal,setOriginalContructors);
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم المقاول:</label>
                    <input placeholder="إسم المقاول" value={rowData.name} type="text" onChange={(e)=>{
                      setRowData({...rowData,name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor="">وصف المقاول:</label>
                      <textarea name="" value={rowData.email} type="text" onChange={(e)=>{
                      setRowData({...rowData,email:e.target.value})
                    }} placeholder="وصف المقاول" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                      <label htmlFor=""> رقم الهاتف :</label>
                    <input value={rowData.phone} placeholder="رقم الهاتف" type="text" onChange={(e)=>{
                      setRowData({...rowData,phone:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> كلمة السر  :</label>
                    <input value={rowData.password} placeholder="كلمة السر" type="text" onChange={(e)=>{
                      setRowData({...rowData,password:e.target.value})
                    }}/>
                    </div>
                    <button
                      style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                      disabled={changeLoading}
                      className="add_btn"
                    >
                      {changeLoading ? <AiOutlineLoading /> : "تعديل"}
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
                  المقاول ({rowData.name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      // changeStatus(setChangeLoading,rowData,setPageLoading,setShowChangeStatusModal,setContructors,setOriginalContructors)
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
      page_name={"المقاوليين"}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default Contructors;
