// import {}

class Spu {
    static async getLatest() {

    }

    // 1.一条数据没有 空
    // 2. 最后一条, 还有没有更多的数据
    // 3. 累加 100 1-20, 21-40, ... setData 重新渲染页面
    // 4. 非分页数据: a. 正在加载 loading b. 空
    // 5. 上滑页面触底 加载 避免用户重复发请求 redis 数据锁
    //  按扭 button 防抖 节流 禁用 倒计时 模态 loading
    // start count, 10 0 -> 10, 20
    // 数据 1-20 21-40 41-60
    // 存入数量 1-40 1-60
}