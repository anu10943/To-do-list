//the modules imported
const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require('mongoose');

const app = express();
//you can declare an array or dict const even tho u can push items to it or change vals of keys
//only thing impossible is items=['fds] cannot reassign to a different array
// const items=[];
// const workItems=[];//this is when mongoose was not used,ie DB

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); 
mongoose.connect("mongodb+srv://admin-emily:Create987@cluster0-7y2rw.mongodb.net/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
//mongo Parse error=mongoDB
const itemsSchema=new mongoose.Schema({
    name:{
    type:String,
    required:true
    } 
});
const Item=mongoose.model("Item",itemsSchema)//ususally capital Item

const item1=new Item({
    name:"Welcome to your to-do list"
});
const item2=new Item({
    name:"Add new items by clicking the + button"
});
const item3=new Item({
    name:" <===Click this to delete the item!"
});
//when you create new schema and objects wrt it,you create new collection
const listSchema=new mongoose.Schema({
    name:{
    type:String,
    required:true
    } ,
    items:[itemsSchema]
});
const List=mongoose.model("List",listSchema);//ususally capital Item

const defaultItemList=[item1,item2,item3];
app.get("/", function (req, res) {
    // const day=date.getDay();//date returns ptr,date()calls fn
    
    Item.find({},function(err,items){//{} means everything in db
        
        if(items.length===0){
            Item.insertMany(defaultItemList,function(err){
                if(err)
                {
                    console.log(err);
                }
                else{
                    console.log("successfully saved into db");
                }
                
            });//we can comment insertMany so that after repeated saves,same items wont get logged into db
            //not practical if we write for an actual server
            res.redirect("/");//this is because after inserting there is no render,so if redirected it will go to else cond
            
        }
        else{
            // items.forEach(item => {
            //     console.log(item.name);
            // });        
            // console.log(items); this will give the whole obj in dict format,not name itself
             
            res.render("list", {listTitle: "Today",new_items:items });//item is out of scope,local scope only ,so try global//item wont be def ERR at 1st call since item is got in app.post //looks inside views for a file called list.ejs, the var in ejs file: var here in this file
        }
    })
})
app.post("/",function(req,res){
    // var type=req.body.button;
    var item_name=req.body.todo;
    var listName=req.body.button;
  
    const item=new Item({
        name:item_name
    });
    if (listName==="Today"){
        
        item.save();//not model.save(),but item.save()
            //lolll i forgot
        
        res.redirect("/");//so that it getd item rendered on screen at same timeS
        // }

    }
    else{
        List.findOne({name:listName},function(err,list){
            if(!err){
                 
                list.items.push(item);//prob was u were pushing string=item_name,not document=item
                list.save();//update works
                res.redirect("/"+listName);
            }
            
        });
    }
            //not item name ,it must eb a document
         
        //  singleItemList.save();//is wrong since we have to add to items list inside list
        
    
    
    // console.log(type);
    // console.log(req.body) ,dont forget ===,req.body.value nooo req.body.name =value is 
    // if(type==="Work"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }//we are ignoring there is a work list
    // else{
    
    //togo to get again
    //console.log(item);
    //res.render("list", {new_item:item} ) //here it gives error new_item is not def,this is because every render must contain all datatypes that are rendered at evry stage ie {day_ejs:day,new_tem:item} even at app.get
})

app.get("/:customListTitle",function(req,res){
    const customListTitle=req.params.customListTitle;
    List.findOne({name:customListTitle},function(err,lists){
        if(!err){
            if(!lists){
                const list=new List({
                    name:customListTitle,
                    items:defaultItemList
                });
                list.save();
                res.redirect("/"+customListTitle);
            }
         
            else{
                res.render("list",{listTitle:customListTitle,new_items:lists.items});
        }
    }

    })
                    
  
})
   
// })

 
app.get("/about",function(req,res){
    res.render("about");
})
app.post("/delete",function(req,res){
    // const status=req.body.checkbox;//why do u need status,the checkbox will only submit if ticked,so everything that comes here has to be deleted
    const delItemId=req.body.checkbox;
    const list_name=req.body.nameOfList;
    
     //name doesnt work since if name:Sleep properly, checkbox value saves Sleep ,so we use _id
     //use can use Item.findByIdAndRemove(delItemId,function(err){})   
     if(list_name==="Today"){
        Item.findByIdAndDelete({_id:delItemId},function(err){
            if(err){
                console.log("err item");
            }
            else{
                 
                console.log("deleted item");
                res.redirect("/");//not outside
            }
        });
    }
    else{
        //pull ooperator=search delete an elemaent from array inside document
        List.findOneAndUpdate({name:list_name},{$pull:{items:{_id:delItemId}}},{useFindAndModify:false},function(err,list){
            if(!err){ 
            
            res.redirect("/"+list_name);

            }
        });
    }


    
     //operations preceded by $ is of mongodb
    
    // List.findByIdAndDelete({_id:delItemId},function(err,list){
    //     if(err){
    //         console.log("err list");
    //     }
    //     else{
    //         const list_name=list.name;
    //         console.log("deleted list");
    //         res.redirect("/"+list_name);//not outside
    //     }
    // })
    
   
    
})
app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("the server is running on port 3000");
})//using mongodb server port 27017
//LAYOUTS OR PARTIALS-INCLUDE HEADER
//view engine will goto views to look for pages
//so create folder views
//>5 =switch statement
//<5
//if else,for while loops if you se var i,then scope of i can  be more than just to fn used outside too ,i's val retained
//var x=2;
//const x=5; cannot be changed ever
//let y=3; 
//if created inside a fn, all are local in a fn
//if created outside a fn, all are global in a fn
//for ,while ,do while ,if else var has global,
//let and const will be local to the loops
//db.dropDatabase(),use <dbname>,show dbs,show collections
//db.<collectionname>.drop(),db.items.drop()
//db.lists.dropIndexes()-Bulk Write Error comes up