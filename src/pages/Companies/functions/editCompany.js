import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const editCompany=(setChangeLoading,setPageLoading,setCompanies,rowData,setShowEditModal,setOriginalCompanies)=>{
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
        comp_email:rowData.email,
        comp_pass:rowData.password,
        name:rowData.name,
        phone:rowData.phone,
        id:rowData.id,
        // ...rowData
  }
  console.log(data_send)
  axios.post(base_url+"/admin/companies/edit_company.php",JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      toast.success(res.data.message);
      setShowEditModal(false)
      getAll(setPageLoading,setCompanies,setOriginalCompanies);
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
