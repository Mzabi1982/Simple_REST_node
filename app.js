const express=require('express');
const Joi=require('joi');

app = express();

app.use(express.json());

const courses=[
    {
        id:1,name:'one'
    },
    {
        id:2,name:'tow'
    },
    {
        id:3,name:'three'
    }
]

app.post('/courses',(req,res)=>{

    const schema={
        name:Joi.string().min(3).required()
    }

   const result= Joi.validate(req.body,schema)
  // console.log(result);
   if(result.error)
   {
 res.status(400).send(result.error.details[0].message)
 console.log(result.error.details[0].message)

       return;
   }
    let course={
       id:courses.length+1,
       name:req.body.name
    }

    courses.push(course);
    res.send(course);
})

app.get('/',(req,res)=>{
    res.send("hellow world");
})


app.get('/courses',(req,res)=>{
    res.send([1,2,3,4]);
})

app.get('/courses/:id',(req,res)=>{
   
  const course = courses.find(c=>c.id===parseInt(req.params.id))
    //res.send(req.params.id);

    if(!course) res.status(404).send('the course with given id')
    else res.send(course)
    
})




const port = process.env.PORT || 4000
app.listen(port,()=>{
console.log(`server listening on port ${port}....`)
})