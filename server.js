const uri = 'mongodb+srv://ayushSharma:siuuuRony@mycluster.o5frq.mongodb.net/postmanhackathon?retryWrites=true&w=majority'
const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors')
const ACCOUNTSARRAY = ['LGBTLabour','LGBTPartnership','LGBTindia2','LALGBTCenter','LGBTCenterNYC']
let ID_ARRAY = [];
let TWEET_IDS = [];
let TWEET_IDS_SEND = []



const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

mongoose.connect(uri);
mongoose.connection.on('connected', ()=>{
    console.log('connected successfully');
});
let allDocuments = {}
let isLoggedIn = false;



const signupSchema = new mongoose.Schema({
    userName: String,
    emailID: String,
    password: String,

})

const blogschema  = new mongoose.Schema({
    blogTitle: String,
    blogAuthor: String,
    blogBody: String,

})

const User = mongoose.model('User', signupSchema);
const BlogPost = new mongoose.model('BlogPost', blogschema);

async function getList(){
    allDocuments = await BlogPost.find()
    console.log(allDocuments);

    

};

getList();

app.post('/signup',function(req, res){

    const userName = req.body.userName
    const emailID = req.body.emailID
    const password = md5(req.body.password)
    console.log(password);
    const newUser = new User({
        userName : userName,
        emailID : emailID,
        password : String(password)
    })
    newUser.save();
    isLoggedIn = true
    res.redirect('http://localhost:3000/feeds');

})

app.post('/login', (req, res) => {
    async function checkUser()
    {
        let activeUser;
        activeUser = await User.find({ name: req.body.userName, password: md5(req.body.password)})
        
        if(activeUser.length!=0)
        {

            isLoggedIn = true;
            res.redirect('http://localhost:3000/feeds')
        } else{
            isLoggedIn = false;
            res.redirect('http://localhost:3000')
        }

    }
    checkUser();
    

})

app.get('/', function(req,res){
    res.send("Hello world");
    console.log('Hello')

})

app.post('tweetids',(req,res) => {

})

app.post('/blogpost', (req, res) => {
    const blogTitle = req.body.blogTitle
    const blogBody = req.body.blogBody
    const blogAuthor = req.body.blogAuthor

    const newBlogPost = new BlogPost({
        blogTitle: blogTitle,
        blogAuthor: blogAuthor,
        blogBody: blogBody

    })
    newBlogPost.save()
    getList();

    res.redirect('http://localhost:3000/blog')

})

app.listen(5000, ()=>{
    console.log('listening to port 5000');

})

app.get('/blogs', (req, res) => {
    res.send(allDocuments);

})

for(let i = 0;i<5;i++)
{      

    var config = {
        method: 'get',
        url: `https://api.twitter.com/2/users/by/username/${ACCOUNTSARRAY[i]}`,
        headers: { 
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANwkbAEAAAAAmnZPLaZN0zMDHNLwlBZalWtghC8%3DGSF8yLPGfaf4MKaY0xV13RkipGaEa4vj3GTh2BGh5kYd1zNCbU', 
          'Cookie': 'guest_id=v1%3A164888193947364684'
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data.data);
        ID_ARRAY.push(response.data.data.id);
        if(ID_ARRAY.length == 5){

            console.log(ID_ARRAY)
            for(let i = 0;i<5;i++)
            {               

                var config = {
                    method: 'get',
                    url: `https://api.twitter.com/2/users/${ID_ARRAY[i]}/tweets/?max_results=5`,
                    headers: { 
                    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANwkbAEAAAAAmnZPLaZN0zMDHNLwlBZalWtghC8%3DGSF8yLPGfaf4MKaY0xV13RkipGaEa4vj3GTh2BGh5kYd1zNCbU', 
                    'Cookie': 'guest_id=v1%3A164888193947364684'
                    }
                };
                
                axios(config)
                .then(function (response) {
                    for(let j = 0;j<5;j++)
                    {
                        // console.log(response.data.data)
                        // console.log(response.data.data[j].id)
                        
                        TWEET_IDS.push(response.data.data[j].id)
                        if(TWEET_IDS.length == 25)
                        {
                            app.get('/tweetids',(req,res) =>{
                                res.send(TWEET_IDS);
                            })
                            console.log(TWEET_IDS);
                        }                     
                                                
                        // console.log(TWEET_IDS);
                    }
                    
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

app.get('/tweetids',(req, res)=>{
    res.send(TWEET_IDS_SEND);
})

setTimeout(()=>{
    console.log(TWEET_IDS)
    TWEET_IDS_SEND = TWEET_IDS;
},3000)





















