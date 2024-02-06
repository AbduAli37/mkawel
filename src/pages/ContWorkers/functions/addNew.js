import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const addNewWorker=(setChangeLoading,setPageLoading,setContWorkers,newWorker,setShowAddModal,setOriginalContWorkers,cont_id)=>{
  setChangeLoading(true)

  let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);

      if(newWorker.phone==''){
        toast.warn('أدخل رقم الهاتف ');
        return
      }

      if(newWorker.name==''){
        toast.warn('أدخل الإسم ');
        return
      }
  const data_send={
    email:adminData.email,
        password:adminData.password,
        worker_name:newWorker.name,
        worker_phone:newWorker.phone,
        cont_id
  }
  console.log(data_send)
  axios.post(base_url+"/admin/workers/add_worker.php",JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      toast.success(res.data.message);
      setShowAddModal(false)
      getAll(setPageLoading,setContWorkers,setOriginalContWorkers,cont_id);
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
