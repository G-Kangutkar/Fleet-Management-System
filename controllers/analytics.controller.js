
export const getanalytic = async (req, res) => {
    try {
        const { data: customer, count, error: customerError } = await supabase
            .from('users').select('*', { count: 'exact' }).eq('role', 'customer')
        if (customerError) {
            return res.status(400).json({ error: customerError.message })
        }

        const { data: owners, count: OwnerCount, error: ownerError } = await supabase
            .from('users').select('*', { count: 'exact' }).eq('role', 'owner')
        if (ownerError) {
            return res.status(400).json({ error: customerError.message })
        }

        const { data: driver, count: driverCount, error: driverrError } = await supabase
            .from('users').select('*', { count: 'exact' }).eq('role', 'driver')
        if (driverrError) {
            return res.status(400).json({ error: customerError.message })
        }
        const { data: vehicle, count: vehCount, error: Vehicleserror } = await supabase
            .from('vehicles').select('*', { count: 'exact' })
        if (Vehicleserror) {
            return res.status(400).json({ error: customerError.message })
        }
        const { data: trips, count: tripCount, error: Triperror } = await supabase
            .from('trips').select('*', { count: 'exact' })
        if (Triperror) {
            return res.status(400).json({ error: customerError.message })
        }


        res.status(200).json({
            Totalcustomers:count,
            Totalowners:OwnerCount,
            Totaldrivers:driverCount,
            Totalvehicles:vehCount,
            Totaltrips:tripCount
        })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}