import request from '../utils/request';

/* 获取路由列表*/
export const fetchRoutes = query => {
    return request({
        url: './routes.json',
        method: 'get',
        params: query
    });
};
