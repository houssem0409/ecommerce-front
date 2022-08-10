//import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
//import { Form, Button, Row, Col } from 'react-bootstrap'
//import axios from 'axios'
import React , {useState} from "react";
import Layout from '../core/layout';
import {Link} from 'react-router-dom'
import {signup} from '../auth'
const Signup = () => {
    const [values , setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name , email , password , success , error } = values
    const handleChange = name => event => {

        setValues({...values , error: false, [name]: event.target.value});

    };
    
    const clickSubmit = (e) =>{
        e.preventDefault()
        setValues({...values , error:false })
        signup({name , email , password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            }else {
                setValues({

                    ...values,
                    name: '',
                    email: '',
                    password : '',
                    error: '' ,
                    success: true

                })
            }
        })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
               <label className="text-muted"> Name</label>
               <input 
               onChange={handleChange('name')} 
               type="text" 
               className="form-control"
               value={name}
               >
               </input>
            </div>
            <div className="form-group">
               <label className="text-muted"> Email</label>
               <input onChange={handleChange('email')}  
               type="text"
                className="form-control"
                value={email}
                >
                </input>
            </div>
            <div className="form-group">
               <label className="text-muted"> Password</label>
               <input onChange={handleChange('password')}  
               type="password"
                className="form-control"
                value={password}
                >
                </input>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );
    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>

            {error}
        </div>
    )
    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
               New Accout was created, please <Link to="/signin">SignIn</Link>
        </div>
    )

    return (
        <Layout title='Home Page ' description='Signup to Node React E-commerce App' className="container col-md-8 offset-md-2 ">

         {showSuccess()}
         {showError()}
        {signUpForm()}     
        {JSON.stringify(values)}     
        </Layout>
        )
  };
/*
const Signup = (location , history) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    
 
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    useEffect(() => {
    
    }, [history, redirect])
    
    const submitHandler = (e) => {
      e.preventDefault()
      if (!password) {
        setMessage('Password is empty !')
      } else {
        try {
        
            const config = {
              headers: {
                'Content-Type': 'application/json',
              },
            }
        
            const { data } =  axios.post(
              'http://localhost:8000/api/signup',
              { name, email, password },
              config
            )
            localStorage.setItem('userInfo', JSON.stringify(data))
          } catch (error) {
          setMessage("not available ")
          }
        }
      }
    
    
    return (
      <>
        <h1>Sign Up</h1>
        { <div variant='danger'></div>}
        { <div variant='danger'></div>}
        
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
    
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
    
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
    
    
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>
    
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </>
    )
}

*/
export default Signup;