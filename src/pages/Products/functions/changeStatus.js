import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify";
import {getFoodsCats } from "./getAll";

export const changeStatus=(setChangeLoading,rowData,setPageLoading,setProducts,setOriginalProducts,setShowChangeStatusModal)=>{
  setChangeLoading(true);
  const data_send={
    // ...rowData,
    category_id:rowData.food_categories_id
  }
  console.log(data_send)
  axios.post(base_url+"/admin/food_categories/show_hide_food_category.php",JSON.stringify(data_send))
  .then((res)=>{
    if(res.data.status=='success'){
      toast.success(res.data.message);
      getFoodsCats(setPageLoading,setProducts,setOriginalProducts);
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
