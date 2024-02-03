import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";
import { AiOutlineLoading } from "react-icons/ai";
import { base_url } from "../../components/constants";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const loginFunc = () => {
    if(loginData.email==''){
      toast.warn('أدخل البريد الإلكترونى')
      return
    }
    if(loginData.password==''){
      toast.warn('أدخل كلمة السر')
      return
    }
    setLoginLoading(true);
    const data_send={
      ...loginData
    }
    axios.post(base_url+"/admin/login/login.php",JSON.stringify(data_send))
    .then((res)=>{
      console.log(res)
      if(res.data.status=='success'){
        toast.success('تم التسجيل مرحبا بك')
        localStorage.setItem('mkawel_data',JSON.stringify(res.data.message))
        navigate('/')
        window.location.reload()
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else{
        toast.error('حدث خطأ ما فى السرفر')
      }
    }).catch(e=>console.log(e))
    .finally(()=>{
      setLoginLoading(false)
    })
  };
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  if(localStorage.getItem('mkawel_data')){
    navigate("/")
  }
  return (
    <div className="login">
      <div className="login_form">
        <form onSubmit={(e)=>{
          e.preventDefault();
          loginFunc()
        }} action="">
          <img
            src={
              "https://res.cloudinary.com/duovxefh6/image/upload/v1700918823/Screenshot_2023-11-25_152447-removebg-preview_wfmkrf.png"
            }
            alt=""
          />
          <input
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
            type="text"
            placeholder="أدخل البريد الإلكترونى"
          />
          <input
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
            type="text"
            placeholder="أدخل كلمة السر"
          />
          <button
            disabled={loginLoading}
            style={{ cursor: loginLoading ? "no-drop" : "pointer" }}
          >
            {loginLoading ? <AiOutlineLoading /> : "تسجيل"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
