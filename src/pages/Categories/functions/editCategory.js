import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify";
import { getAll } from "./getAll";

export const editCategory=(setChangeLoading,setPageLoading,setCategories,rowData,setShowEditModal,img,setImgLoading,setOriginalCategories)=>{
  if(img){
    setImgLoading(true)
    const formData=new FormData();
    formData.append('image',img);
    axios.post(base_url+'/upload.php',formData)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success('تم رفع الصوره')
        // setRowData({...rowData,banner_image:res.data.message})
        let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);
        const data_send={
          ...rowData,
          category_id:rowData.id,
          category_name:rowData.category_name,
          category_description:rowData.category_description,
          category_image:res.data.message,
          email:adminData.email,
          password:adminData.password,
        }
        console.log(data_send)
        axios.post(base_url+'/admin/categories/update_category.php',JSON.stringify(data_send))
        .then((res)=>{
          if(res.data.status=='success'){
            toast.success(res.data.message);
            setShowEditModal(false)
            getAll(setPageLoading,setCategories,setOriginalCategories);
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
      else if(res.data.status=='error'){
        toast.error(res.data.message);
      }
      else {
        toast.error('حدث خطأ فى الرفع')
      }
    }).catch(e=>console.log(e))
    .finally(()=>{
      setImgLoading(false)
    })
  }
  else {
    let localData= localStorage.getItem('mkawel_data')
    let adminData=localData&&JSON.parse(localData);
    const data_send={
      ...rowData,
      category_id:rowData.id,
      category_name:rowData.category_name,
      category_description:rowData.category_description,
      category_image:rowData.category_image,
      email:adminData.email,
      password:adminData.password,
    }
    console.log(data_send)
    axios.post(base_url+'/admin/categories/update_category.php',JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        setShowEditModal(false)
        getAll(setPageLoading,setCategories,setOriginalCategories);
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
}
