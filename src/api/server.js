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
//获取最新mv
// 可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
export const getmusicMV = ({ area }) => {
    return service({
        url: "/mv/first",
        method: "get",
        params: {
            area
        }
    })
}

// 热门电台
export const gethotDj = ({ limit }) => {
    return service({
        url: '/dj/hot',
        method: 'get',
        params: {
            limit
        }
    })
}

// 获取热门歌手
export const hostSonger = () => {
    return service({
        url: 'top/artists',
        method: "get"
    })
}

// 获取所有榜单详情
export const getAllRankList = () => {
    return service({
        url: '/toplist/detail',
        method: "get"
    })
}

// 获取歌单详情传递一个id值
export const getMenuId = ({ id }) => {
    return service({
        url: `/playlist/detail?id=${id}`,
        method: 'get',
    })
}

// 获取歌单内全部歌曲
export const getMenuSongList = ({ id }) => {
    return service({
        url: `/playlist/track/all?id=${id}&limit=20`,
        method: 'get',
    })
}