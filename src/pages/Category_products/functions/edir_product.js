import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../../components/constants";
import { getAll } from "./getAll";

export const editProduct=(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,rowData,setShowEditModal,category_id)=>{
console.log(rowData)

  let localData= localStorage.getItem('mkawel_data')
  let adminData=localData&&JSON.parse(localData);
  if(img){
    const formData=new FormData();
    formData.append('image',img)
    axios.post(base_url+'/upload.php',formData)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success('تم الرفع');
        setAddLoading(true)
        setImg(null)
        setImgUrl('')
        const data_send={
          id:rowData.id,
          name:rowData.name,
          image:res.data.message,
          category_id,
          email:adminData.email,
          description:rowData.description,
          password:adminData.password,
        }
        console.log(data_send,'1')
        axios.post(base_url+'/admin/products/update_product.php',JSON.stringify(data_send))
        .then((res)=>{
          if(res.data.status=='success'){
            getAll(setPageLoading,setProducts,setOriginalProducts,category_id)
            toast.success(res.data.message);
            getAll(setPageLoading,setProducts,setOriginalProducts,category_id)
            setShowEditModal(false)
          }
          else if(res.data.status=='error'){
            toast.error(res.data.message)
          }
          else {
            toast.error('حدث خطأ ما')
          }
        }).catch(e=>console.log(e))
        .finally(()=>{
        setAddLoading(false)
        })
      }
    }).catch(e=>console.log(e))
    .finally(()=>{
      setImgLoading(false)
    })
  }
  else {
    const data_send={
      id:rowData.id,
      name:rowData.name,
      image:rowData.image,
      category_id,
      email:adminData.email,
      description:rowData.description,
      password:adminData.password,
      // ...rowData,
    }
    console.log(data_send,"2")

    axios.post(base_url+'/admin/products/update_product.php',JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        getAll(setPageLoading,setProducts,setOriginalProducts,category_id)
        setShowEditModal(false)
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else {
        toast.error('حدث خطأ ما')
      }
    }).catch(e=>console.log(e))
    .finally(()=>{
    setAddLoading(false)
    })
  }
}
