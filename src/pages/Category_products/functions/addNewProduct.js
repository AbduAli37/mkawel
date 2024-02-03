import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../../components/constants";
import { getAll } from "./getAll";

export const AddNewProduct=(setPageLoading,setProducts,setOriginalProducts,img,setImg,setImgUrl,setImgLoading,setAddLoading,newEle,setShowAddModal,category_id)=>{
  if(img){
    const formData=new FormData();
    formData.append('image',img)
    axios.post(base_url+'/upload.php',formData)
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success('تم الرفع');
        if(newEle.name==''){
          toast.warn('إختر إسم أولا')
          return
        }
        if(newEle.description==''){
          toast.warn('أدخل وصف أولا')
          return
        }
        setAddLoading(true)

        let localData= localStorage.getItem('mkawel_data')
        let adminData=localData&&JSON.parse(localData);
        const data_send={
          ...newEle,
          image:res.data.message,
          email:adminData.email,
          password:adminData.password,
          category_id
        }
        console.log(data_send)
        axios.post(base_url+'/admin/products/add_product.php',JSON.stringify(data_send))
        .then((res)=>{
          if(res.data.status=='success'){
            toast.success(res.data.message);
            setImg(null)
        setImgUrl('')
            setShowAddModal(false)
            getAll(setPageLoading,setProducts,setOriginalProducts,category_id)
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
