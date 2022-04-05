import { Http } from './http';

class Paging {
    // 不关心细节, 我需要下一页的数据你能给你我吗
    // need save status
    // instance
    // new Paging

    start;
    count;
    req;
    locker = false;
    moreData;

    constructor(req, count = 10, start = 0) {
        this.req = req;
        this.url = req.url;
        this.start = start;
        this.count = count;
        this.locker = locker;
    }

    // Generator
    async getMoreData() {
        // 检测锁状态 避免发送多次请求
        // getLocker
        // request
        // releaseLocker
        if(!this.moreData) return;
        if (!this._getLocker()) return;

        const data = await this._actualGetData();
        
        this._releaseLocker();

        return data;
    }

    async _actualGetData() {
        // v1/spu/latest?start=0&count=10
        const req = this._getCurrentReq();
        const paging = await Http.request(req);
        if (!paging) {
            return null;
        }

        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            };
        }

        const { total_page, page_num, items } = paging;
        this.moreData = Paging._moreData(total_page, page_num);

        if (this.moreData) {
            this.start += this.count;
        }

        this._accumulate(items);
        return {
            items,
            empty: false,
            moreData: this.moreData,
            accumulator: this.accumulator
        };
    }

    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items);
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1;
    }

    _getCurrentReq() {
        let url = this.url;
        // url = v1/spu/latest/ + '?' + params
        // url v1/spu/latest?other=abc + '&' + params

        const params = `start=${this.start}&count=${this.count}`;

        if (url.indexOf('?') !== -1) {
            url += `'&'${params}`;
        } else {
            url += `?${params}`;
        }

        this.req.url = url;
        return this.req;
    }

    _getLocker() {
        if (this.locker) {
            return false;
        }
        this.locker = true;
        return true;
    }

    _releaseLocker() {
        this.locker = false;
    }
}

export { Paging };
