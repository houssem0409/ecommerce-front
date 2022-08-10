import React, { useEffect, useState } from "react";
import Layout from "../core/layout";
import { isAuthenticated } from "../auth";
import { Link, Navigate, useParams } from "react-router-dom";
import {read , update , updateUser} from './apiUser'


const Profile = () => {

    let params = useParams()
    const [values , setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const {token} = isAuthenticated()
    const {name , email , password , error , success } = values
    const init = (userId) => {
        //console.log(userId)
            read(userId , token ).then(data => {
                if(data.error){
                    setValues({...values , error: true})
                }else {
                    setValues({...values , name: data.name , email: data.email  })
                }
            })

    }
    const handleChange = (name) => e => {
         setValues( { ...values , error: false , [name]: e.target.value})
    }
    const clickSubmit = e => {
        e.preventDefault()
        update(params.userId , token , {name , email , password}).then(data => {
            if(data.error){
               console.log(data.error) 
            }else {
                updateUser(data , () => {
                    setValues({
                        ...values ,
                         name: data.name ,
                          email: data.email ,
                           success: true
                        });
                })
            }
        })

    }
    const redirectUser = (success) => {
        if(success){
            return <Navigate to="/cart"/>
        }
    }
    const profileUpdate = (name , email , password ) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text"  onChange={handleChange("name")} 
                className="form-control"
                value={name}
                />

            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text"  onChange={handleChange("email")} 
                className="form-control"
                value={email}
                />

            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password"  onChange={handleChange("password")} 
                className="form-control"
                value={password}
                />

            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )
    useEffect(() => {
        init(params.userId)
    } , [])
    
    return (
    <Layout title='Profile ' description='NUpdate Your Profile ' className="container-fluid">
       <h2 className="mb-4"> Profile update</h2>
        {profileUpdate(name , email , password)}
        {redirectUser(success)}
    </Layout>)
};

export default Profile;