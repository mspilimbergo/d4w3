import { supabase } from "./SupabaseCLient";

export async function getPostById(id) {
    let query = supabase
        .from('formatted_jobs')
        .select('*')
        .eq('id', id)

    const {data, error} = await query;

    if (!error) {
        return data;
    }
}

export async function getPosts() {
    let query = supabase
        .from('formatted_jobs')
        .select('*')
        .order('inserted_at')
        .limit(10)

    const {data, error} = await query;
    if (!error) {
        return data;
    }
}

export async function getPostData(id) {
    const jobData = await getPostById(id);
    console.log(jobData)
    return {
        id, 
        ...jobData[0],
    }
} 

export async function getAllPostIds() {
    const data = await getPosts();
    return data.map((job) => {
        return {
            params: {
                id: job.id.toString()
            }
        }
    })
}