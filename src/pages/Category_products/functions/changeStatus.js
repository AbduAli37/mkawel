import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify";
import {getAll, getFoodsCats } from "./getAll";

export const changeStatus=(setChangeLoading,rowData,setPageLoading,setProducts,setOriginalProducts,setShowChangeStatusModal,category_id)=>{
  setChangeLoading(true);
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    // ...rowData,
    id:rowData.id,
    email:adminData.email,
    password:adminData.password,
  }
  console.log(data_send)
  axios.post(base_url+"/admin/products/change_status.php",JSON.stringify(data_send))
  .then((res)=>{
    if(res.data.status=='success'){
      toast.success(res.data.message);
      getAll(setPageLoading,setProducts,setOriginalProducts,category_id);
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
