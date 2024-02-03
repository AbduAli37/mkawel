import axios from "axios"
import { base_url } from "../../../components/constants"

export const getAll=(setPageLoading,setCategories,setOriginalCategories)=>{
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    email:adminData.email,
    password:adminData.password,
  }
  axios.post(base_url+'/admin/categories/getall.php',JSON.stringify(data_send))
  .then((res)=>{
    console.log(res.data)
    if(res.data.status=='success'){
      setCategories(res.data.message);
      setOriginalCategories(res.data.message);
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setPageLoading(false)
  })
}
