import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button,Modal} from 'react-bootstrap'

function Home() {

    const [data,setData] = React.useState([])
    const [isShow,setIsShow] = React.useState(false)
    const [show1,setShow1] = React.useState(false)
    const [image,setImage]=React.useState(null)
    const [comments,setComments]=React.useState([])
    const [postIdforComment,setPostIdforComment]=React.useState("")
    const[replyTo,setReplyTo]=React.useState("")
    const[replyToName,setReplyToName]=React.useState("")
    const navigate = useNavigate()
    let token = ""
    let userId=""
    if (localStorage.getItem('login')) {
        token = JSON.parse(localStorage.getItem('login')).token
        userId= JSON.parse(localStorage.getItem('login')).userId
    }

    React.useEffect(() => {


        fetch("http://localhost:4000/getposts", {
            headers: {

                'x-api-key': token
            }

        })
            .then((result) => {
                result.json()
                    .then((res) => {
                        console.log(res)
                        if (res.status == true) {
                            setData(res.data)
                        }
                        else {
                            navigate('/login')
                        }

                    })

            })
    }, [])

    function createPost(){
        let data1 = new FormData();
        data1.append('img',image)
        data1.append('userId',userId)
        fetch("http://localhost:4000/createPost",{
            method:'POST',
            headers:{
                // 'Content-type': 'multipart/form-data',
                // 'Accept':"application/json",
                // 'Content-type': 'application/json',
                
                
                'x-api-key':token

            },
            body: data1
            // files:[fileImage]
            
            
        }).then((result)=>result.json())
            .then((res)=>{
                // console.log(res)
                if(res.status==true) {
                    
                    setIsShow(false)
                    alert("post added successfully")
                    window.location.reload(true)
                }

                else{
                    alert(res.message)
                }

            })
    }

    function deletePost(postId){
        console.log(postId)
        let data1={postId}
        fetch("http://localhost:4000/deletePost",{
            method:'DELETE',
            headers:{
                // 'Content-type': 'multipart/form-data',
                'Accept':"application/json",
                'Content-type': 'application/json',
                
                
                'x-api-key':token

            },
            body: JSON.stringify(data1)
            // files:[fileImage]
            
            
        }).then((result)=>result.json())
            .then((res)=>{
                // console.log(res)
                if(res.status==true) {
    
                    alert("post Deleted successfully")
                    window.location.reload(true)
                }

                else{
                    alert(res.message)
                }

            })
    }

    function commentsfunc(postId){
        
        let data1={"postId":postId}
        fetch("http://localhost:4000/getPostById", {
            method:"POST",
            headers: {
                'Accept':"application/json",
                'Content-type': 'application/json',
                'x-api-key': token
            },
            body:JSON.stringify(data1)

        })
            .then((result) => {
                result.json()
                    .then((res) => {
                        console.log(res)
                        if (res.status == true) {
                            setComments(res.data.comment)
                            console.log("comments",comments)
                            setShow1(true)
                            setPostIdforComment(postId)
                        }
                        else {
                            alert(res.message)
                        }

                    })

            })
    }

    const [msg,setMsg]=React.useState("")
    function addComment(){
        let data1={'postId':postIdforComment,"message":msg,"userId":userId,"replyTo":replyTo}
        fetch("http://localhost:4000/createComment",{
            method:"POST",
            headers:{
                'Content-type': 'application/json',
                'x-api-key':token

            },
            body: JSON.stringify(data1)

        })
        .then((result)=>result.json())
        .then(res=>{
            if(res.status==true){
                console.log(res)

                window.location.reload(true)

                
            }
            else if(res.status==false){
                
                
                alert(res.message)
            }

            
        })
    }
    function deleteComment(commentId,postId){
        let data1={"commentId":commentId,"postId":postId}
        fetch("http://localhost:4000/deleteComment",{
            method:'DELETE',
            headers:{
                // 'Content-type': 'multipart/form-data',
                'Accept':"application/json",
                'Content-type': 'application/json',
                
                
                'x-api-key':token

            },
            body: JSON.stringify(data1)
            // files:[fileImage]
            
            
        }).then((result)=>result.json())
            .then((res)=>{
                // console.log(res)
                if(res.status==true) {
    
                    alert("comment Deleted successfully")
                    window.location.reload(true)
                }

                else{
                    alert(res.message)
                }

            })

    }

    return (
        <>
        {
            !show1?
            <div>
            <nav class="navbar navbar-inverse navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">miniInstagram</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li ><a href="#">Your Profile</a></li>
                        <li><a><button type="button" onClick={() => setIsShow(true)}>create post</button></a></li>



                    </ul>
                </div>
            </nav>
            {
                    !isShow ?
                    <div className="container"  >
                        <h1 style={{ textAlign: "center", marginTop: 50 }}>Posts</h1>
                        <div className="row g-3 mt-5 mb-5" style={{ display: "grid" }}>
                            {
                                data.map(x =>
                                    <div className="col-md-4" style={{ margin: "auto", marginBottom: 40 }}>
                                        <div className="card">

                                            <div className="card-img-top image-card image-card-1">
                                                <img src={x.postImage} alt="..." />

                                            </div>
                                            <div className="card-body">
                                                <span className="text-uppercase text-danger fw-bold fs-6">Post by: {x.userId.name}</span>
                                                {
                                                    x.userId._id==userId?<button style={{float:"right"}} onClick={()=>deletePost(x._id)}>Delete</button>:<></>
                                                }
                                                <br />
                                                <a onClick={()=>{commentsfunc(x._id)}} style={{cursor: "pointer"}}><span className="text-uppercase text-danger fw-bold fs-6">Comments: {x.totalComment}</span></a>

                                                <div className="mt-4 about d-flex justify-content-between align-items-center"><span>Posted on: {x.dateTime}</span>  </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div> :
                        <Modal.Dialog style={{marginTop:200}}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Your Post</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Upload Your Image</p>
                                <input type="file" id="myFile" name="filename" onChange={(e)=>setImage(e.target.files[0])}/>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>setIsShow(false)}>Close</Button>
                                <Button variant="primary" onClick={()=>createPost()}>Add Post</Button>
                            </Modal.Footer>
                        </Modal.Dialog>

            }
            </div>:
                <section style={{backgroundColor: "#eee"}}>
                <div class="container my-5 py-5">
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-12 col-lg-10 col-xl-8">
                      <div class="card">
                        {
                            
                            comments.map(x=>
                                
                                !x.isReply && !x.isDeleted?
                                <>
                                <div class="card-body" style={{borderStyle:"outset"}}>
                                    <div class="d-flex flex-start align-items-center">
                                    
                                    <div>
                                        <h5 class="fw-bold text-primary mb-1">{x.userId.name}</h5>
                                        <p class="text-muted small mb-0">{x.dateTime}</p>
        
                                    </div>
                                    </div>
                    
                                    <p class="mt-3 mb-4 pb-2">{x.message}</p>
                                    <div class="small d-flex justify-content-start" style={{display :"flex"}}>
                                        {
                                            userId==x.userId._id?
                                            <a onClick={()=>deleteComment(x._id,x.postId)} class="d-flex align-items-center me-3"  style={{cursor: "pointer"}}>
                                                <i class="fas fa-share me-2"></i>
                                                <p class="mb-0" style={{marginRight:10}}>delete</p>
                                            </a>:<></>
                                        }
                                        <a onClick={()=>{setReplyTo(x._id);setReplyToName(x.userId.name)}} class="d-flex align-items-center me-3" style={{cursor: "pointer"}}>
                                            <i class="fas fa-share me-2"></i>
                                            <p class="mb-0">reply</p>
                                        </a>
                                    </div>
                                 </div>
                                 {
                                    comments.map(y=>
                                        y.isReply && !y.isDeleted?
                                            x._id==y.replyTo?
                                            <div class="card-body" style={{borderStyle:"outset" , marginLeft:50}}>
                                                <div class="d-flex flex-start align-items-center">
                                                
                                                <div>
                                                <h5 class="fw-bold text-primary mb-1">Reply To: {x.userId.name}</h5>
                                                    <h5 class="fw-bold text-primary mb-1">{y.userId.name}</h5>
                                                    <p class="text-muted small mb-0">{y.dateTime}</p>
                    
                                                </div>
                                                </div>
                            
                                                <p class="mt-3 mb-4 pb-2">{y.message}</p>
                                                <div class="small d-flex justify-content-start" style={{display :"flex"}}>
                                                    {
                                                        userId==y.userId._id?
                                                        <a onClick={()=>deleteComment(y._id,y.postId)} class="d-flex align-items-center me-3" style={{cursor: "pointer"}}>
                                                            <i class="fas fa-share me-2"></i>
                                                            <p class="mb-0" style={{marginRight:10}}>delete</p>
                                                        </a>:<></>
                                                    }

                                                </div>
                                        </div>:<></>
                                        :<></>
                                    )
                                 }
                                 </>
                                 :<></>
       
                                
                            
                            )
                        }
                        <div class="card-footer py-3 border-0" style={{backgroundColor: "#f8f9fa"}}>
                          <div class="d-flex flex-start w-100">

                            <div class="form-outline w-100">
                              <textarea class="form-control" placeholder={"comment to "+replyTo+","+replyToName} rows="4" style={{background: "#fff"}} onChange={(e)=>{setMsg(e.target.value)}}/>
                              <label class="form-label" for="textAreaExample">Comment</label>
                            </div>
                          </div>
                          <div class="float-end mt-2 pt-1">
                            <button type="button" class="btn btn-primary btn-sm" onClick={()=>addComment()}>Post comment</button>
                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={()=>setShow1(false)}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        }
        </>
    )
}

export default Home