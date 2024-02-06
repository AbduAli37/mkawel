import axios from "axios"
import { base_url } from "../../../components/constants"

export const getAll=(setPageLoading,setContWorkers,setOriginalContWorkers,cont_id)=>{
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    email:adminData.email,
    password:adminData.password,
    cont_id
  }
  axios.post(base_url+'/admin/workers/get_cont_workers.php',JSON.stringify(data_send))
  .then((res)=>{
    console.log(res.data)
    if(res.data.status=='success'){
      setContWorkers(res.data.message);
      setOriginalContWorkers(res.data.message);
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setPageLoading(false)
  })
}
