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
        method: 'get'
    })
}
