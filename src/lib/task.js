
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://awycpgzkubjcbbkwomgv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function createTask (param) {
    const {data, error} = await supabase
        .from('t_task_info')
        .insert([
            {
                platform: param['platform'], 
                work_type: param['work_type'], 
                search_param: param['search_param']
            }
        ])
        .select()
    return error
}