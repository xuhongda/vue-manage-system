import request from '../utils/request';

/* 获取路由列表*/
export const fetchData = query => {
    return request({
        url: './routes.json',
        method: 'get',
        params: query
    });
};