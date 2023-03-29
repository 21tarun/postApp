import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'

function Signup() {
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [name,setName]=React.useState("")
    const navigate =useNavigate()
    let data={name,email,password}
    function createAccount(){
        fetch("http://localhost:4000/createUser",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',

            },
            body: JSON.stringify(data)

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.status==true){
                data={email,password}
                fetch("http://localhost:4000/login",{
                    method:"POST",
                    headers:{
                        'Content-type': 'application/json',
        
                    },
                    body: JSON.stringify(data)
        
                })
                .then((result)=>result.json())
                .then(res=>{
                    if(res.status==true){
                        console.log(res)
                        localStorage.setItem('login',JSON.stringify({
                            login:true,
                            token:res.token,
                            userId:res.userId
        
                        }))
                        navigate("/")
                        
        
                        
                    }
                    else if(res.status==false){
                        
                        if(res.message=="email id or password is worng") alert("invalid email or password")
                        else alert(res.message)
                    }
        
                    
                })
                

                
            }
            else if(res.status==false){
                alert(res.message)
            }

            
        })
    }
  return (
    <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">

                  <h4 className="mt-1 mb-5 pb-1">We are miniInstagram (post manager)</h4>
                </div>

                <div>
                  <p>Please Create your account</p>

                  <div className="form-outline mb-4">
                    <input type="text"  className="form-control" onChange={(e)=>{setName(e.target.value)}} placeholder="your name" />
                    <label className="form-label" for="form2Example11">name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email"  className="form-control" onChange={(e)=>{setEmail(e.target.value)}} placeholder=" email address" />
                    <label className="form-label" for="form2Example11">UserId</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password"  className="form-control" onChange={(e)=>{setPassword(e.target.value)}}  />
                    <label className="form-label" for="form2Example22">Password</label>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={createAccount}>Create</button>
                    
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <button type="button" className="btn btn-outline-danger" onClick={()=>{navigate('/login')}}>Sign In</button>
                  </div>

                </div>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Signup