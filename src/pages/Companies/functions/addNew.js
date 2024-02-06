import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const addNewCompanies=(setChangeLoading,setPageLoading,setCompanies,newCompany,setShowAddModal,setOriginalCompanies)=>{
  setChangeLoading(true)

  let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);
      if(newCompany.email==''){
        toast.warn('أدخل البريد الإلكترونى');
        return
      }

      if(newCompany.phone==''){
        toast.warn('أدخل رقم الهاتف ');
        return
      }

      if(newCompany.name==''){
        toast.warn('أدخل الإسم ');
        return
      }

      if(newCompany.password==''){
        toast.warn('أدخل كلمة المرور');
        return
      }
  const data_send={
    email:adminData.email,
        password:adminData.password,
        comp_email:newCompany.email,
        comp_pass:newCompany.password,
        name:newCompany.name,
        phone:newCompany.phone,
  }
  console.log(data_send)
  axios.post(base_url+"/admin/companies/add_company.php",JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      toast.success(res.data.message);
      setShowAddModal(false)
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
