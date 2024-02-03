import React from "react";
import Layout from "../../Layouts/Layout";
import { useState } from "react";
import TableLayout from "../../components/table";
import { delIcon, edit, hidden, show } from "../../SvgsIcons/SvgsImages";
import Modal from "../../components/modal";
import { toast } from "react-toastify";
import "./home.css";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { Spinner } from "reactstrap";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [foodCategories, setFoodCategories] = useState([
    {
      category_id: 1,
      hidden: "1",
      food_category_name: "traditional",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 2,
      hidden: "0",
      food_category_name: "instant pot",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 3,
      hidden: "1",
      food_category_name: "slow cooker",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 4,
      hidden: "0",
      food_category_name: "real food",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 5,
      hidden: "1",
      food_category_name: "paleo",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 6,
      hidden: "0",
      food_category_name: "keto",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 7,
      hidden: "1",
      food_category_name: "diet",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 8,
      hidden: "0",
      food_category_name: "vegeterian",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 9,
      hidden: "1",
      food_category_name: "Gluten & dairy free",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 10,
      hidden: "1",
      food_category_name: "diabetes friendly",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 11,
      hidden: "1",
      food_category_name: "allergen",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 12,
      hidden: "1",
      food_category_name: "traditional",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 13,
      hidden: "1",
      food_category_name: "instant pot",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 14,
      hidden: "1",
      food_category_name: "slow cooker",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 15,
      hidden: "1",
      food_category_name: "real food",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 16,
      hidden: "1",
      food_category_name: "paleo",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 17,
      hidden: "1",
      food_category_name: "keto",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 18,
      food_category_name: "diet",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 19,
      hidden: "1",
      food_category_name: "vegeterian",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 20,
      food_category_name: "Gluten & dairy free",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 21,
      food_category_name: "diabetes friendly",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 22,
      food_category_name: "allergen",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    // {
    //   food_category_name: "allergen",
    //   food_category_pic: require('./images/fasolia.jpg'),
    // },
  ]);
  const [originalFoodCategories, setOriginalFoodCategories] = useState([
    {
      category_id: 1,
      hidden: "1",
      food_category_name: "traditional",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 2,
      hidden: "0",
      food_category_name: "instant pot",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 3,
      hidden: "1",
      food_category_name: "slow cooker",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 4,
      hidden: "0",
      food_category_name: "real food",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 5,
      hidden: "1",
      food_category_name: "paleo",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 6,
      hidden: "0",
      food_category_name: "keto",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 7,
      hidden: "1",
      food_category_name: "diet",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 8,
      hidden: "0",
      food_category_name: "vegeterian",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 9,
      hidden: "1",
      food_category_name: "Gluten & dairy free",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 10,
      hidden: "1",
      food_category_name: "diabetes friendly",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 11,
      hidden: "1",
      food_category_name: "allergen",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 12,
      hidden: "1",
      food_category_name: "traditional",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 13,
      hidden: "1",
      food_category_name: "instant pot",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 14,
      hidden: "1",
      food_category_name: "slow cooker",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 15,
      hidden: "1",
      food_category_name: "real food",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 16,
      hidden: "1",
      food_category_name: "paleo",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 17,
      hidden: "1",
      food_category_name: "keto",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 18,
      food_category_name: "diet",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      category_id: 19,
      hidden: "1",
      food_category_name: "vegeterian",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 20,
      food_category_name: "Gluten & dairy free",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 21,
      food_category_name: "diabetes friendly",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    {
      hidden: "1",
      category_id: 22,
      food_category_name: "allergen",
      food_category_pic: require("../../assets/images/kushari.jpeg"),
    },
    // {
    //   food_category_name: "allergen",
    //   food_category_pic: require('./images/fasolia.jpg'),
    // },
  ]);
  const [searchHeaderKet, setSearchHeaderKey] = useState("");
  const [newCat, setNewCat] = useState({
    category_name: "",
    image: "",
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
      dataIndex: "category_id",
      // sort: true,
      // search: true,
    },
    {
      label: "صورة الفئه",
      // sort: true,
      type: "children",
      children: ({ headers, row }) => {
        return (
          <div>
            <img
              onClick={() => {
                navigate("/foods", { state: { category: row } });
              }}
              style={{ width: "60px", cursor: "pointer" }}
              src={row.food_category_pic}
              alt=""
            />
          </div>
        );
      },
      // search: true,
    },
    {
      label: "إسم الفئه",
      dataIndex: "food_category_name",
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
            <span
              onClick={() => {
                setShowDelModal(true);
                setRowData(row);
              }}
              style={{ color: "red", cursor: "pointer" }}
            >
              {delIcon}
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

  const handleAddFile = () => {
    if (img == "") {
      toast.warn("إختر صوره أولا");
      return;
    }
    setImgLoading(true);
    const formData = new FormData();
    formData.append("image", img);
    axios
      .post("", formData)
      .then((res) => {
        if (res.data != "") {
          setNewCat({ ...newCat, image: res.data });
        } else if (res.data == "") {
          toast.error("لم يتم الرفع");
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setImgLoading(false);
      });
  };

  const handleAddFileAffEdit = () => {
    if (img == "") {
      toast.warn("إختر صوره أولا");
      return;
    }
    setImgLoading(true);
    const formData = new FormData();
    formData.append("image", img);
    axios
      .post("", formData)
      .then((res) => {
        if (res.data != "") {
          setRowData({ ...rowData, image: res.data });
        } else if (res.data == "") {
          toast.error("لم يتم الرفع");
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setImgLoading(false);
      });
  };

  const handleAddCategory = () => {
    setAddLoading(true);
    const data_send = {
      ...newCat,
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
        setAddLoading(false);
      });
  };
  const getCategories = () => {
    setPageLoading(true);
    axios
      .get("")
      .then((res) => {
        if (Array.isArray(res.data.message)) {
          setFoodCategories(res.data.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setPageLoading(true);
      });
  };

  const handleDelCategory = () => {
    setDelLoading(true);
    const data_send = {
      ...rowData,
    };
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowDelModal(false);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDelLoading(false);
      });
  };

  const handleChangeStatus = () => {
    setChangeLoading(true);
    const data_send = {
      ...rowData,
      hidden: rowData.hidden == "1" ? "0" : "1",
    };
    axios
      .post("", JSON.stringify(data_send))
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowChangeStatusModal(false);
        } else if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setChangeLoading(false);
      });
  };

  const handleEditCategory = () => {
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

  const handleSearch = (txt) => {
    let allData = [...originalFoodCategories];
    let pushedData = [];
    if (txt.length == 0) {
      setFoodCategories(allData);
    } else {
      for (let i = 0; i < allData.length; i++) {
        if (allData[i].food_category_name.toLocaleLowerCase().includes(txt)) {
          pushedData.push(allData[i]);
        }
      }
      setFoodCategories(pushedData);
    }
  };

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
                  data={foodCategories}
                />
              </>
            )}
          </div>

          <Modal
            open={showAddModal}
            toggle={setShowAddModal}
            headerTitle={"إضافه قسم جديد"}
            children={
              <>
                <h5>
                  {/* {"Are You Sure To Ban User - " + banId?.student_name + " ?"} */}
                </h5>
                <div className="flex-box">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddCategory();
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم الفئه:</label>
                      <input
                        onChange={(e) => {
                          setNewCat({
                            ...newCat,
                            category_name: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder="إسم الفئه"
                      />
                    </div>
                    <div>
                      <label htmlFor="">صوره الفئه:</label>
                      <input
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                        }}
                        type="file"
                        name=""
                        id=""
                      />
                      <button
                        disabled={imgLoading}
                        style={{ cursor: imgLoading ? "no-drop" : "pointer" }}
                        onClick={() => {
                          handleAddFile();
                        }}
                      >
                        {imgLoading ? <AiOutlineLoading /> : "رفع"}
                      </button>
                    </div>
                    <button
                      style={{ cursor: addLoading ? "no-drop" : "pointer" }}
                      disabled={addLoading}
                      className="add_btn"
                    >
                      {addLoading ? <AiOutlineLoading /> : "إضافه"}
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
                      handleEditCategory();
                    }}
                    className="add_form"
                    action=""
                  >
                    <div>
                      <label htmlFor="">إسم الفئه:</label>
                      <input
                        onChange={(e) => {
                          setRowData({
                            ...rowData,
                            food_category_name: e.target.value,
                          });
                        }}
                        value={rowData.food_category_name}
                        type="text"
                        placeholder="إسم الفئه"
                      />
                    </div>
                    <div>
                      <label htmlFor="">صوره الفئه:</label>
                      <input
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                        }}
                        type="file"
                        name=""
                        id=""
                      />
                      <button
                        disabled={imgLoading}
                        style={{ cursor: imgLoading ? "no-drop" : "pointer" }}
                        onClick={() => {
                          handleAddFileAffEdit();
                        }}
                      >
                        {imgLoading ? <AiOutlineLoading /> : "رفع"}
                      </button>
                    </div>
                    <button
                      style={{ cursor: editLoading ? "no-drop" : "pointer" }}
                      disabled={addLoading}
                      className="add_btn"
                    >
                      {editLoading ? <AiOutlineLoading /> : "تعديل"}
                    </button>
                  </form>
                </div>
              </>
            }
          />

          <Modal
            open={showDelModal}
            toggle={setShowDelModal}
            headerTitle={`مسح فئه`}
            children={
              <>
                <h5>{`هل تريد مسح الفئه  ${rowData.food_category_name}`}</h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={delLoading}
                    style={{ cursor: delLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      toast.success("Success");
                      handleDelCategory();
                    }}
                  >
                    {delLoading ? <AiOutlineLoading /> : "نعم"}
                  </button>

                  <button
                    className="btn btn-primary"
                    width={"fit-content"}
                    onClick={() => {
                      setShowDelModal(false);
                    }}
                  >
                    لا
                  </button>
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
                  هل تريد {rowData.hidden == "1" ? "إظهار" : "إخفاء"} هذه الفئه
                  ({rowData.food_category_name})
                </h5>
                <div className="flex-box del_btns">
                  <button
                    disabled={changeLoading}
                    style={{ cursor: changeLoading ? "no-drop" : "pointer" }}
                    className="btn btn-danger"
                    onClick={() => {
                      toast.success("Success");
                      handleChangeStatus();
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
      page_name={"الأقسام"}
      have_add={true}
      handleShowAdd={() => {
        setShowAddModal(true);
      }}
    />
  );
};

export default Home;
