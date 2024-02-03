import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../../components/constants";
import { getFoodsCats } from "./getAll";

export const editFoodCat=(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,rowData,setShowEditModal)=>{
  if(img){
    const formData=new FormData();
    formData.append('image',img)
    axios.post(base_url+'/upload_images.php',formData)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success('تم الرفع');
        setAddLoading(true)
        setImg(null)
        setImgUrl('')
        const data_send={
          category_id:rowData.food_categories_id,
          name:rowData.food_categories_name,
          image:res.data.message,
        }
        axios.post(base_url+'/admin/food_categories/update_food_category.php',JSON.stringify(data_send))
        .then((res)=>{
          if(res.data.status=='success'){
            getFoodsCats(setPageLoading,setProducts,setOriginalProducts)
            toast.success(res.data.message);
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
      category_id:rowData.food_categories_id,
      name:rowData.food_categories_name,
      image:rowData.food_categories_image,
      // ...rowData,
    }
    axios.post(base_url+'/admin/food_categories/update_food_category.php',JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        getFoodsCats(setPageLoading,setProducts,setOriginalProducts)
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
