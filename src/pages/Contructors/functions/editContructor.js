import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const editContructor=(setChangeLoading,setPageLoading,setContructors,rowData,setShowEditModal,setOriginalContructors)=>{
  setChangeLoading(true)

  let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);
      if(rowData.email==''){
        toast.warn('أدخل البريد الإلكترونى');
        return
      }

      if(rowData.phone==''){
        toast.warn('أدخل رقم الهاتف ');
        return
      }

      if(rowData.name==''){
        toast.warn('أدخل الإسم ');
        return
      }

      if(rowData.password==''){
        toast.warn('أدخل كلمة المرور');
        return
      }
  const data_send={
    email:adminData.email,
        password:adminData.password,
        cont_email:rowData.email,
        cont_pass:rowData.password,
        name:rowData.name,
        phone:rowData.phone,
        id:rowData.id,
  }
  console.log(data_send)
  axios.post(base_url+"/admin/contractors/edit_contructor.php",JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      toast.success(res.data.message);
      setShowEditModal(false)
      getAll(setPageLoading,setContructors,setOriginalContructors);
    }
    else if(res.data.status=='error'){
      toast.error(res.data.message);
    }
    else {
      toast.error('حدث خطأ ما');
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setChangeLoading(false)
  })
}
