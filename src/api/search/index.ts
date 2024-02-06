import service from "../api";
import type * as Search from './types/searchTypes'

export const getSearchMusic = (keywords: string) => {
    return service<Search.SearchKeywordsType>({
        method: 'get',
        url: '/search',
        params: {
            keywords,
            limit: 5
        }
    })
}