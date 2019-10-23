import {request} from './request'
export function getDetailInfo(iid) {
    return request({
        url: 'detail',
        params:{
            iid,
        }
    })
}