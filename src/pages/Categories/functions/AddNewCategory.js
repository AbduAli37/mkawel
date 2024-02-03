import axios from "axios"
import { base_url } from "../../../components/constants"
import { toast } from "react-toastify"
import { getAll } from "./getAll"

export const addNewCategory=(setChangeLoading,setPageLoading,setCategories,newCategory,setShowAddModal,img,setImgLoading,setOriginalCategories)=>{
  if(img==null){
    toast.warn('إختر صوره أولا');
    return;
  }
  setImgLoading(true)
  const formData=new FormData();
  formData.append('image',img);
  axios.post(base_url+'/upload.php',formData)
  .then((res)=>{
    if(res.data.status=='success'){
      toast.success('تم رفع الصوره')
      if(newCategory.category_name==''){
        toast.warn('أكتب إسم له');
        return;
      }
      if(newCategory.category_description==''){
        toast.warn('أكتب محتوى الواجهه')
        return
      }
      setChangeLoading(true)
      let localData= localStorage.getItem('mkawel_data')
      let adminData=localData&&JSON.parse(localData);
      const data_send={
        ...newCategory,
        category_image:res.data.message,
        email:adminData.email,
        password:adminData.password,
      }
      console.log(data_send)
      axios.post(base_url+"/admin/categories/add_category.php",JSON.stringify(data_send))
      .then((res)=>{
        console.log(res)
        if(res.data.status=='success'){
          toast.success(res.data.message);
          setShowAddModal(false)
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
