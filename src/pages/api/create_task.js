
import { createClient } from '@supabase/supabase-js'

const create_task = async (request, response) => {
    try {
        const param = request.body;
        const result = await createTask(param); // 使用 await 等待 Promise 解析
        if (result.success === false) {
            // 假设 createTask 返回一个对象，其中包含 success 属性来标示操作是否成功
            response.status(400).send({"message": result.error.message}); // 使用 400 状态码表示请求错误
            return; // 结束函数执行，以防止发送多个响应
        }
        // 如果一切正常，发送成功消息
        response.status(200).send({"message": "success"});
    } catch (error) {
        // 处理任何在 createTask 过程中抛出的异常
        response.status(500).send({"message": error.message}); // 使用 500 状态码表示服务器内部错误
    }
}

export default create_task;

export async function createTask(param) {
    const supabaseUrl = 'https://awycpgzkubjcbbkwomgv.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Received parameters:', param);

    try {
        const { data, error } = await supabase
            .from('t_task_info')
            .insert([
                {
                    platform: param['platform'], 
                    work_type: param['work_type'], 
                    search_param: param['search_param'],
                }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
            return { success: false, error };
        }

        console.log('Inserted data:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Exception when calling Supabase:', error);
        return { success: false, error: error.message };
    }
}