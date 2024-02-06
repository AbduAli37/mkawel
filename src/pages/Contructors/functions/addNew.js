import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const addNewContructor=(setChangeLoading,setPageLoading,setContructors,newContructor,setShowAddModal,setOriginalContructors)=>{
  setChangeLoading(true)

  let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);
      if(newContructor.email==''){
        toast.warn('أدخل البريد الإلكترونى');
        return
      }

      if(newContructor.phone==''){
        toast.warn('أدخل رقم الهاتف ');
        return
      }

      if(newContructor.name==''){
        toast.warn('أدخل الإسم ');
        return
      }

      if(newContructor.password==''){
        toast.warn('أدخل كلمة المرور');
        return
      }
  const data_send={
    email:adminData.email,
        password:adminData.password,
        cont_email:newContructor.email,
        cont_pass:newContructor.password,
        name:newContructor.name,
        phone:newContructor.phone,
  }
  console.log(data_send)
  axios.post(base_url+"/admin/contractors/add_contrator.php",JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      toast.success(res.data.message);
      setShowAddModal(false)
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
