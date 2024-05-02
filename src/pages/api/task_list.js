import { createClient } from '@supabase/supabase-js'

const task_list = async (request, response) => {
    const supabaseUrl = 'https://awycpgzkubjcbbkwomgv.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let {data: task_info, error } = await supabase
        .from('t_task_info')
        .select(`*`);
    if (error) { 
        response.status(200).send({"message":error.message});
        return
    }
    response.status(200).send({"data": task_info, "message": "success"});
}

export default task_list;