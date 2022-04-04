import { Http } from '../utils/http';

class Theme {
    static locationA = 't-1';
    static locationB = 't-2';
    static locationC = 't-3';
    static locationE = 't-5';

    themes = [];

    async getThemeData() {
        const names = `${Theme.locationA},${Theme.locationB},${Theme.locationC}`;
        this.themes = await Http.request({
            url: 'theme/by/names',
            data: { names }
        });
    }

    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA);
    }

    getHomeLocationB() {
        return this.themes.find(t => t.name === Theme.locationB);
    }

    static getLocationESpu() {
        return Theme.getThemeSpuName(Theme.locationE);
    }

    static getThemeSpuName(name) {
        return Http.request({
            url: `theme/name${name}/with_spu`
        });
    }
}

export { Theme };
