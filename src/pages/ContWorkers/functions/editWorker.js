import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const editContructor=(setChangeLoading,setPageLoading,setContWorkers,rowData,setShowEditModal,setOriginalContWorkers)=>{
  setChangeLoading(true)

  let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);

      if(rowData.worker_phone==''){
        toast.warn('أدخل رقم الهاتف ');
        return
      }

      if(rowData.worker_name==''){
        toast.warn('أدخل الإسم ');
        return
      }

  const data_send={
    email:adminData.email,
        password:adminData.password,
        worker_name:rowData.worker_name,
        worker_phone:rowData.worker_phone,
        cont_id:rowData.contructor_id,
        id:rowData.id,
  }
  console.log(data_send)
  axios.post(base_url+"/admin/workers/edit_worker.php",JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      toast.success(res.data.message);
      setShowEditModal(false)
      getAll(setPageLoading,setContWorkers,setOriginalContWorkers,rowData.contructor_id);
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
