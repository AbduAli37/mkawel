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
// import { changeStatus } from "./functions/changeStatus";
import { Loader } from "rsuite";
// import { editCategory } from "./functions/editCategory";
import { useLocation, useNavigate } from "react-router";
import { addNewCompanies } from "./functions/addNew";
import { editCompany } from "./functions/editCompany";

const Companies = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [companies, setCompanies] = useState();
  const [originalCompanies, setOriginalCompanies] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [searchHeaderKet, setSearchHeaderKet] = useState("");
  const [newCompany, setnewCompany] = useState({
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
    let allData = [...originalCompanies];
    let pushedData = [];
    if (txt.length == 0) {
      setCompanies(allData);
    } else {
      for (let i = 0; i < allData.length; i++) {
        if (
          allData[i].name.toLocaleLowerCase().includes(txt) ||
          allData[i].email.toLocaleLowerCase().includes(txt)
        ) {
          pushedData.push(allData[i]);
        }
      }
      setCompanies(pushedData);
    }
  };

  useEffect(()=>{
    getAll(setPageLoading,setCompanies,setOriginalCompanies);
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
                  data={companies}
                />
              </>
            )}
          </div>

          <Modal
            open={showAddModal}
            toggle={setShowAddModal}
            headerTitle={"إضافه شركه جديد"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addNewCompanies(setChangeLoading,setPageLoading,setCompanies,newCompany,setShowAddModal,setOriginalCompanies);
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم الشركه:</label>
                    <input placeholder="إسم الشركه" type="text" onChange={(e)=>{
                      setnewCompany({...newCompany,name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> البريد الإلكترونى:</label>
                    <input placeholder="البريد الإلكترونى" type="text" onChange={(e)=>{
                      setnewCompany({...newCompany,email:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> رقم الهاتف :</label>
                    <input placeholder="رقم الهاتف" type="text" onChange={(e)=>{
                      setnewCompany({...newCompany,phone:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> كلمة السر  :</label>
                    <input placeholder="كلمة السر" type="text" onChange={(e)=>{
                      setnewCompany({...newCompany,password:e.target.value})
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
            headerTitle={"تعديل الشركه "}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editCompany(setChangeLoading,setPageLoading,setCompanies,rowData,setShowEditModal,setOriginalCompanies);
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم الشركه:</label>
                    <input placeholder="إسم الشركه" value={rowData.name} type="text" onChange={(e)=>{
                      setRowData({...rowData,name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor="">وصف الشركه:</label>
                      <textarea name="" value={rowData.email} type="text" onChange={(e)=>{
                      setRowData({...rowData,email:e.target.value})
                    }} placeholder="وصف الشركه" id="" cols="30" rows="10"></textarea>
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
                  الشركه ({rowData.name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      // changeStatus(setChangeLoading,rowData,setPageLoading,setShowChangeStatusModal,setCompanies,setOriginalCompanies)
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
      page_name={"الشركات"}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default Companies;
