import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify";
import {getAll } from "./getAll";

export const changeStatus=(setChangeLoading,rowData,setPageLoading,setShowChangeStatusModal,setCategories,setOriginalCategories)=>{
  setChangeLoading(true);
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    ...rowData,
    category_id:rowData.id,
    email:adminData.email,
    password:adminData.password,
  }
  axios.post(base_url+"/admin/categories/change_status.php",JSON.stringify(data_send))
  .then((res)=>{
    if(res.data.status=='success'){
      toast.success(res.data.message);
      getAll(setPageLoading,setCategories,setOriginalCategories);
      setShowChangeStatusModal(false)
    }
    else if(res.data.status=='error'){
      toast.error(res.data.message)
    }
    else {
      toast.error('حدث خطأ ما');
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setChangeLoading(false)
  })
}
