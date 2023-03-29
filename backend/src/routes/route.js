const express=require("express")
const router=express.Router()
const userController =require("../controllers/userController")
const postController =require("../controllers/postController")
const middlewares =require('../middlewares/auth')
const commentController =require('../controllers/commentController')

router.get("/",function(req,res){
    res.send({message:"succsessfull"})
})


router.post("/createUser",userController.createUser)
router.post("/login",userController.login)


router.post('/createPost',middlewares.authentication,postController.createPost)
router.delete("/deletePost",middlewares.authentication,postController.deletePost)
router.get("/getposts",middlewares.authentication,postController.getPosts)
router.post("/getPostById",middlewares.authentication,postController.getPostById)

router.post('/createComment',middlewares.authentication,commentController.createComment)
router.put('/editComment',middlewares.authentication,commentController.editComment)
router.delete('/deleteComment',middlewares.authentication,commentController.deleteComment)










module.exports=router