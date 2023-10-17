import service from "./api";

//获取轮播图
export const getbanner = () => {
    return service({
        url: '/banner',
        method: 'get'
    })
}
//获取歌单
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

export const selectMenu = () => {
    return service({
        url: '/playlist/hot',
        method: "get"
    })
}

//新碟上架
export const getAblum = ({ limit }) => {
    return service({
        url: '/top/album',
        method: 'get',
        params: {
            limit
        }
    })
}

//获取全部歌单
export const getmusicMenu = () => {
    return service({
        url: '/toplist',
        method: 'get'
    })
}
//获取歌单详情：需要传入歌单id
export const getmusicContent = (id) => {
    return service({
        url: '/playlist/detail',
        method: 'get',
        params: {
            id
        }
    })
}