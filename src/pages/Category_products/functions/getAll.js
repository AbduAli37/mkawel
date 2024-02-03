import axios from "axios"
import { base_url } from "../../../components/constants"

export const getAll=(setPageLoading,setProducts,setOriginalProducts,category_id)=>{
  setPageLoading(true)
  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  const data_send={
    email:adminData.email,
    password:adminData.password,
    category_id
  }
  // console.log(data_send)
  axios.post(base_url+'/admin/categories/products.php',JSON.stringify(data_send))
  .then((res)=>{
    // console.log(res.data)
    if(res.data.status=='success'){
      setProducts(res.data.message)
      setOriginalProducts(res.data.message)
    }
  }).finally(()=>{
    setPageLoading(false)
  }).catch(e=>console.log(e))
}
