import {request} from './request'
export function getDetailInfo(iid) {
    return request({
        url: 'detail',
        params:{
            iid,
        }
    })
}

export class Goods{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.realPrice = itemInfo.lowNowPrice
        this.discount = itemInfo.discountDesc
        this.discountBgColor = itemInfo.discountBgColor
        this.columns = columns
        this.services = services

    }
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.sells = shopInfo.cSells
        this.goodsCount = shopInfo.cGoods
        this.score = shopInfo.score
    }
}

export class Goodsdec{
    constructor(detailInfo){
        this.desc = detailInfo.desc
        this.key = detailInfo.detailImage[0].key
        this.img = detailInfo.detailImage[0].list
    }
}

export class Itemsize{
    constructor(itemParams){
        this.infos = itemParams.info.set
        this.sizes = itemParams.rule.tables

    }
}