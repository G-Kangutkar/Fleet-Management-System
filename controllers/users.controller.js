import supabase from "../config/supabase.config.js";

export const addUser = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const {data,error} = await supabase
        .from('users').select().eq('email',email);

        if(error){
            return res.status(400).json({error:error.message})
        }
        if(data){
            return res.status(409).json({error:"email already exist"})
        }
        const {data:addUser,error:userError} = await supabase
        .from("users").insert([{name,email,password,role}]).select()
        if(userError){
            return res.status(400).json({error:userError.message})
        }
        res.status(200).json({
            message:"Sigup success ",
            addUser
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

