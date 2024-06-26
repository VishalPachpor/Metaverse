import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://eglkxepsbbjqqofsrrzb.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const checkAddress = async (addressToCheck) => {
    try {
        const { data, error } = await supabase
            .from('user_data')
            .select('address') // Select the 'id' field
            .eq('address', addressToCheck); // Check if 'id' equals the value

        if (error) {
            throw error;
        }

        // If data is empty, the value does not exist in the 'id' field
        if (data.length > 0) {
            console.log('supabase data found', data)
            return true;
        }
        else {
            console.log('supabase data not found', data)
            return false;
        }
    } catch (error) {
        console.error('Supabase error:', error);
        return false;
    }
};

// add address and email for newsletter
export const newsletterData = async (addressToAdd, emailToAdd) => {
    try {
        const { data, error } = await supabase
            .from('newsletter')
            .insert([
                { address: addressToAdd, email: emailToAdd }
            ]);

        if (error) {
            throw error;
        }

        console.log('supabase data added', data)
        return true;
    } catch (error) {
        console.error('Supabase error:', error);
        return false;
    }
}

export const addBetaAccess = async (formData) => {
    try {
        const { data, error } = await supabase
            .from('beta_access')
            .insert([
                {
                    address: formData.address,
                    email: formData.email,
                    name: formData.name,
                    social: formData.twitter,
                    country: formData.country,
                },
            ])
            .select()

        if (error) {
            throw error;
        }

        console.log("Supabase data added", data)
    }
    catch (error) {
        console.error('Supabase error:', error);
    }
}