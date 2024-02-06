import axios from "axios"
import { base_url } from "../../../components/constants"

export const getAll=(setPageLoading,setContructors,setOriginalContructors)=>{
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    email:adminData.email,
    password:adminData.password,
  }
  axios.post(base_url+'/admin//contractors/get_all.php',JSON.stringify(data_send))
  .then((res)=>{
    console.log(res.data)
    if(res.data.status=='success'){
      setContructors(res.data.message);
      setOriginalContructors(res.data.message);
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setPageLoading(false)
  })
}
