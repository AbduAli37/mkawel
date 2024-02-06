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
import { addNewWorker } from "./functions/addNew";
import { editContructor } from "./functions/editWorker";
// import { addnewWorker } from "./functions/addNew";
// import { editContructor } from "./functions/editContructor";
// import { addNewCompanies } from "./functions/addNew";
// import { editCompany } from "./functions/editCompany";

const ContWorkers = () => {
  const location=useLocation();
  const navigate=useNavigate()
  const [pageLoading, setPageLoading] = useState(false);
  const [contWorkers, setContWorkers] = useState();
  const [originalContWorkers, setOriginalContWorkers] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [searchHeaderKet, setSearchHeaderKet] = useState("");
  const [newWorker, setnewWorker] = useState({
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
      dataIndex: "worker_name",
      type:'children',
      children:({row,headers})=>{
        return (
          <div>
            <p
            >{row.worker_name}</p>
          </div>
        )
      }
    },
    {
      label: "رقم الهاتف",
      dataIndex: "worker_phone",
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
    let allData = [...originalContWorkers];
    let pushedData = [];
    if (txt.length == 0) {
      setContWorkers(allData);
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
      setContWorkers(pushedData);
    }
  };
  if(!location.state){
    navigate(-1);
  }
  useEffect(()=>{
    getAll(setPageLoading,setContWorkers,setOriginalContWorkers,location?.state?.contructor?.id);
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
                  data={contWorkers}
                />
              </>
            )}
          </div>

          <Modal
            open={showAddModal}
            toggle={setShowAddModal}
            headerTitle={"إضافه عامل جديد"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addNewWorker(setChangeLoading,setPageLoading,setContWorkers,newWorker,setShowAddModal,setOriginalContWorkers,location?.state?.contructor?.id);
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم العامل:</label>
                    <input placeholder="إسم العامل" type="text" onChange={(e)=>{
                      setnewWorker({...newWorker,name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> رقم الهاتف :</label>
                    <input placeholder="رقم الهاتف" type="text" onChange={(e)=>{
                      setnewWorker({...newWorker,phone:e.target.value})
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
            headerTitle={"تعديل العامل "}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editContructor(setChangeLoading,setPageLoading,setContWorkers,rowData,setShowEditModal,setOriginalContWorkers);
                    }}
                    className="add_form"
                    action=""
                  >
                      <div>
                      <label htmlFor="">إسم العامل:</label>
                    <input value={rowData.worker_name} placeholder="إسم العامل" type="text" onChange={(e)=>{
                      setRowData({...rowData,worker_name:e.target.value})
                    }}/>
                    </div>
                    <div>
                      <label htmlFor=""> رقم الهاتف :</label>
                    <input value={rowData.worker_phone} placeholder="رقم الهاتف" type="text" onChange={(e)=>{
                      setRowData({...rowData,worker_phone:e.target.value})
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
                  العامل ({rowData.name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      // changeStatus(setChangeLoading,rowData,setPageLoading,setShowChangeStatusModal,setContWorkers,setOriginalContWorkers)
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
      page_name={`عمال العامل (${location?.state?.contructor.name})`}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default ContWorkers;
