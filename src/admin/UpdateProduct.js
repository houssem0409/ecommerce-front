import React , { useState , useEffect }from "react";
import Layout from "../core/layout";
import { isAuthenticated } from "../auth";
import { Link, Navigate, useParams } from "react-router-dom";
import {getProduct , getProducts , updateProduct, getCategories} from './apiAdmin'

const UpdateProduct = () => {
    const params = useParams();

        const [values , setValues] = useState({
            name : '',
            description: '',
            price: '',
            categories: [],
            category: '',
            shipping: '',
            quantity: '',
            photo: '',
            loading: false,
            error: '',
            createdProduct: '',
            redirectToProfile: false,
            formData: ''
        })


        const {
            name ,
            description,
            price,
            categories,
            category,
            shipping,
            quantity,
            loading,
            error,
            createdProduct,
            redirectToProfile,
            formData

        } =values;
        const init = (productId)=> {
            getProduct(productId).then(data => {
                if(data.error){
                    setValues({...values , error: data.error})

                }else {
                    // populate the state 
                    //load categories 
                    setValues({...values , name: data.name , 
                        description: data.description,
                         price: data.price,
                        category: data.category._id,
                        shipping: data.shipping,
                        quantity: data.shipping,
                        quantity: data.quantity,
                        formData: new FormData()
                        });
                    initCategories()
                }
            })

        }
            // load categories and set from data 
            const initCategories = () => {
                getCategories().then(data => {
                    if(data.error) {
                        setValues({...values, error: data.error })
                    }else {
                        setValues({
                             categories: data, 
                             formData: new FormData()
                            })
                    }
                })
            };


        useEffect(() => {
           init(params.productId);

        } , []);

        const handleChange = name => event => {
                const value = name === 'photo' ? event.target.files[0] : event.target.value
                formData.set(name, value)
                setValues({...values, [name] : value})
        }
        const {user , token} = isAuthenticated();

        const clickSubmit = event =>{
            event.preventDefault()
            setValues({...values , error:'' ,loading:true})
            updateProduct(params.productId,user._id , token , formData)
            .then(data => {
                if(data.error){
                    setValues({...values , error: data.error})
                } else {
                    setValues({
                        
                            ...values ,  
                             name : '',
                            description: '',
                            price: '',
                            quantity: '',
                            photo: '',
                            loading: false,
                            error: false,
                            redirectToProfile:true,
                            createdProduct: data.name,
                    
                    })            
                    }
            })

        };
        let cat = (categories) => {
         
            for (let i in categories) {
                console.log('the'+categories[i].data)
               
            }
            
            
        }
        const newPostForm = () => (
            <form className="mb-3" onSubmit={clickSubmit}>
                    <h4>Post Photo</h4>
                    <div className="form-group">
                    <label className="btn btn-secondary">
                        <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
                     </label>

                     </div>
                     <div className="form-group">
                         <label className="text-muted">
                             Name
                         </label>
                         <input onChange={handleChange('name')} 
                         type="text" 
                         className="form-control" value={name} />

                     </div>
                     <div className="form-group">
                         <label className="text-muted">
                             Description
                         </label>
                         <textarea onChange={handleChange('description')} 
                         className="form-control" 
                         value={description} />

                     </div>
                     <div className="form-group">
                         <label className="text-muted">
                             Price
                         </label>
                         <input onChange={handleChange('price')} 
                         type="number" 
                         className="form-control" 
                         value={price} />

                     </div>
                     <div className="form-group">
                         <label className="text-muted">
                             Category
                         </label>
                         <select onChange={handleChange('category')} 
                         className="form-control" 
                         >
                             <option >Please Select</option>
                            
                            
                            
                            
                             {categories && categories?.data?.
                             map((c, i) => (
                                  <option key={i} value={c._id}>{c.name}</option>
                                  
                             ))}
                            

                            </select>
                     </div>
                     <div className="form-group">
                         <label className="text-muted">
                             Shipping
                         </label>
                         <select onChange={handleChange('shipping')} 
                         className="form-control" 
                         >
                             <option>Please Select </option>
                             <option value="0">No</option>
                             <option value="1">Yes</option>


                            </select>
                     </div>

                     <div className="form-group">
                         <label className="text-muted">
                             Quantity
                         </label>
                         <input onChange={handleChange('quantity')} 
                         type="number" 
                         className="form-control" value={quantity} />

                     </div>
                     <button className="btn btn-outline-primary">
                            Update Product
                     </button>
            </form>
        )
            const showError = () =>(
                <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                    {error}
                </div>
            )
            const showSuccess = () =>(
                <div className="alert alert-info" style={{display: createdProduct ? '': 'none'}}>
                    <h2>{`${createdProduct}`} is Updated </h2>
                </div>
            )
            const showLoading = () =>(
               loading && (
                   <div className="alert alert-success">
                       <h2> Loading ...</h2>
                   </div>
               )
            )
            const redirectUser = () => {
                if(redirectToProfile){
                    if(!error){
                        return <Navigate to="/home"/>
                    }
                }

            }
    return (
        <Layout title="Add a new Product " description={`Hello  ${user.name}, ready to add a new Product ?`} >
          
        <div className="row">
           
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                 {showSuccess()}
                 {showError()}
                {newPostForm()}
                {redirectUser()}
            </div>

        </div>
     </Layout>

    )
}
export default UpdateProduct;