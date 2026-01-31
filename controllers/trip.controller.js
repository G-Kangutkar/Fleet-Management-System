import supabase from "../config/supabase.config.js";

export const createTrip = async(req,res)=>{
    try {
        const {customer_id,vehicle_id,start_date,end_date,location,distance_km,passengers,tripCost} = req.body;

        const {data,error} = await supabase
        .from('users').select('role').eq('role','customer')
        if(error){
            return res.status(400).json({error:error.message})
        }
        if(!data.role){
            return res.status(400).json({error:"Only customer can create"})
        }
        const {data:vehData,error:vehError} = await supabase
        .from('vehicles').select('*').eq('id',vehicle_id).single()
        if(vehError){
            return res.status(400).json({error:vehError.message})
        }
        if(!vehData.isAvailable){
            return res.status(400).json({error:"Vehicle not avaliable"})
        }
        if(vehData.allowed_passengers < passengers){
            return res.status(400).json({error:"Vehicle cannot take this much passengers"})
        }
        const{ data:addTrip,error:tripError}= await supabase
        .from('trips').insert([{customer_id,vehicle_id,start_date,end_date,location,distance_km,passengers,tripCost}]).select();
        if(tripError){
            return res.status(400).json({error:vehError.message})
        }
        const {data:vehUpdate,error:updateError} = await supabase
        .from('vehicles').update({isAvailable: false}).eq('id',vehicle_id).select()
        if(updateError){
            return res.status(400).json({error:updateError.message})
        }
        res.status(200).json({message:"Trip created",
            addTrip
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getTrip = async(req,res)=>{
    try {
        const {tripId} = req.params;
        const {data,error}= await supabase
        .from('trips').select('*').eq('id',tripId).single()
        if(error){
            return res.status(400).json({error:error.message})
        }
        res.status(200).json({
            message:'Trip data',
            data
        })


    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const updateTrip =async(req,res)=>{
    try {
        const {tripId} = req.params;
        const {start_date,location,passengers} = req.body;
        const {data,error}= await supabase
        .from('trips').update({start_date,location,passengers}).eq('id',tripId).select().single()
        if(error){
            return res.status(400).json({error:error.message})
        }
        res.status(200).json({
            message:'Trip data',
            data
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const deleteTrip = async(req,res)=>{
    try {
        const {tripId} = req.params;
        const {data,error}= await supabase
        .from('trips').delete().eq('id',tripId).select().single()
        if(error){
            return res.status(400).json({error:error.message})
        }
        res.status(200).json({
            message:'Trip deleted',
            data
        })
    } catch (error) {
        
    }
}