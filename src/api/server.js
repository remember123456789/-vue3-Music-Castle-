import service from "./api";

//获取轮播图
export const getbanner = () => {
    return service({
        url: '/banner',
        method: 'get'
    })
}

export const selectmusic = ({ limit, order, cat }) => {
    return service({
        url: '/top/playlist',
        params: {
            limit,
            order,
            cat
        }
    })
}