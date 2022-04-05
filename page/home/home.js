import { SpuPaging } from "../../model/spu-paging";

class Home {
    async initAllData() {
        const theme = new Theme();
        await theme.getThemes();

        const themeA = theme.getHomeLocationA()
        const themeE = theme.getHomeLocationE()

        let themeESpu = [];

        if(themeE.online) {
            const data = await Theme.getLocationESpu()
            if(data) {
                themeESpu = data.sup_list.slice(0, 8)
            }
        }

        const bannerB = await Banner.getHomeLocationA()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()

        this.setData({
            grid,
            themeA,
            themeE,
            bannerB,
            themeESpu,
            activityD
        })
    }

    async onLoad(options) {
        this.initAllData()
    }

    async initBottomSupList() {
        const paging = await SpuPaging.getLatestPaging()
        const data = paging.getMoreData();
        if(!data) {
            return
        }
    }
}

export {
    Home
}