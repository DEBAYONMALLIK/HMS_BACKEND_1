
const contactusmodel=require("../models/contactus.model.js")




async function contactus(req,res){
     const{name,email,message}=req.body;
    try{
       
        const new_message=await contactusmodel.create({name,email,message});

        const view_message={
         email:new_message.email,
         name:new_message.name,
         message:new_message.message,
         createdAt:new_message. createdAt,
         updatedAt:new_message.updatedAt
        }
        console.log("new_message",view_message);
        res.status(201).json({
            success:true,
            view_message:view_message,
        })
        return ;

    }
    catch(error){
            console.log(error)
               console.log("error in submitting form ",error.message);
               res.status(500).json({message:error.message});
    }

}

module.exports={
    contactus,
}