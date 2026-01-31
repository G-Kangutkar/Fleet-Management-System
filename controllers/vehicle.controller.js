import supabase from "../config/supabase.config.js";

export const addVehicles = async(req,res)=>{
    try {
        const {name,registration_number,allowed_passengers,driver_id,rate_per_km,owner_id} = req.body;

        const {data,error} = await supabase
        .from('users').select('role').eq('role','owner')
        if(error){
            return res.status(400).json({error:error.message})
        }
        if(!data.role){
            return res.status(400).json({error:"Only owner can create"})
        }
        const {data:addVeh, error:vehError}= await supabase
        .from('vehicles').insert([{name,registration_number,allowed_passengers,driver_id,rate_per_km,owner_id}]).select()

        if(vehError){
            return res.status(400).json({error:vehError.message})
        }

        res.status(200).json({
            message:'Vehicle created successfully',
            addVeh
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getVehicle = async(req,res)=>{
    try {
        const {vehicleId} = req.params;
        const {data,error}= await supabase
        .from('vehicles').select('*').eq('id',vehicleId).single()
        if(error){
            return res.status(400).json({error:error.message})
        }
        res.status(200).json({
            message:'Vehicle data',
            data
        })


    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const addDriver =async(req,res)=>{
    try {
        const {vehicleId} = req.params;
        const {driver_id} = req.body;
        const {data,error}= await supabase
        .from('vehicles').update({driver_id:driver_id}).eq('id',vehicleId).single()
        if(error){
            return res.status(400).json({error:error.message})
        }
        res.status(200).json({
            message:'Vehicle data',
            data
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}