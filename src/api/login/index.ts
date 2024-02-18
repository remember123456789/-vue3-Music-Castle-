import server from '../api'
import type * as Login from '../login/types/logintypes'

export const Userlogin = (data: Login.LoginInfo) => {
    return server({
        method: 'POST',
        url: "/login/cellphone",
        data
    })
}
