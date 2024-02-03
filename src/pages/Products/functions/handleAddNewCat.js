import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../../components/constants";

export const AddNewCatFoods=(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,newEle,setShowAddModal)=>{
  if(img){
    const formData=new FormData();
    formData.append('image',img)
    axios.post(base_url+'/upload_images.php',formData)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success('تم الرفع');
        if(newEle.name==''){
          toast.warn('إختر إسم أولا')
          return
        }
        setAddLoading(true)
        setImg(null)
        setImgUrl('')
        const data_send={
          ...newEle,
          image:res.data.message,
        }
        axios.post(base_url+'/admin/food_categories/add_food_category.php',JSON.stringify(data_send))
        .then((res)=>{
          if(res.data.status=='success'){
            toast.success(res.data.message);
            setShowAddModal(false)
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
    toast.warn('أختر صوره')
    return;
  }
}
