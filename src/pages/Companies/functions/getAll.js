import axios from "axios"
import { base_url } from "../../../components/constants"

export const getAll=(setPageLoading,setCompanies,setOriginalCompanies)=>{
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    email:adminData.email,
    password:adminData.password,
  }
  axios.post(base_url+'/admin/companies/get_companies.php',JSON.stringify(data_send))
  .then((res)=>{
    console.log(res.data)
    if(res.data.status=='success'){
      setCompanies(res.data.message);
      setOriginalCompanies(res.data.message);
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setPageLoading(false)
  })
}
