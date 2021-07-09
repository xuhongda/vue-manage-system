import request from '../utils/request';

/* 获取侧边栏菜单*/
export const fetchData = query => {
    return request({
        url: './sidebar.json',
        method: 'get',
        params: query
    });
};
