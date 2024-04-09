const  express = require("express");
const  apiController = require("./API/controllers/api-controller");

const  app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",apiController);



app.get("/",(eq, res) => {
   res.set('Content-type','text-html');
   res.send("<p>some <strong>html</strong></p>")
});



app.post("/user",(req,res) =>{
   console.log(req.body);
   res.send("Send user");

});


app.listen(port, () => {
   console.log(`Server is listening at ${port}`);
});