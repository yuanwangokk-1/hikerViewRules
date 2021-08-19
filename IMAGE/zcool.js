const baseParse = _ => {
    // 初始化
    let d = [];
    const cate_url = "https://www.zcool.com.cn/common/category"
    const empty = "hiker://empty"
    let api_url = MY_URL.split('##')[0]
    let page = MY_URL.split('##')[1]

    // 缓存
    let cate_1st = getVar("tyrantgenesis.zcool.cate_1st_select", "0")
    let cate_2nd = getVar("tyrantgenesis.zcool.cate_2nd_select", "0")
    let cate_sort = getVar("tyrantgenesis.zcool.cate_sort", "0")

    // 一级分类
    const category_json = fetch(cate_url)
    const category = JSON.parse(category_json).data

    // 一级分类
    category.forEach(cate => {
        d.push({
            title: cate_1st === cate.id.toString() ? '‘‘’’<strong><font color="red">'+cate.name+'</font></strong>' : cate.name,
            url: $(empty).lazyRule(params => {
                putVar("tyrantgenesis.zcool.cate_1st_select", params.cate_id.toString())
                putVar("tyrantgenesis.zcool.cate_2nd_select", "0")
                refreshPage(true)
                return "hiker://empty"
            }, {
                cate_id: cate.id,
            }),
            col_type: 'scroll_button'
        })
    })
    d.push({
        col_type: 'blank_block',
    })

    // 二级分类
    let sub_category = category.find(item => item.id.toString() === cate_1st).subCateList
    d.push({
        title: cate_2nd === "0" ? '‘‘’’<strong><font color="red">全部</font></strong>' : '全部',
        url: $(empty).lazyRule(params => {
            putVar("tyrantgenesis.zcool.cate_2nd_select", "0")
            refreshPage(true)
            return "hiker://empty"
        }),
        col_type: 'scroll_button'
    })
    sub_category.forEach(cate => {
        d.push({
            title: cate_2nd === cate.id.toString() ? '‘‘’’<strong><font color="red">'+cate.name+'</font></strong>' : cate.name,
            url: $(empty).lazyRule(params => {
                putVar("tyrantgenesis.zcool.cate_2nd_select", params.cate_id.toString())
                refreshPage(true)
                return "hiker://empty"
            }, {
                cate_id: cate.id
            }),
            col_type: 'scroll_button'
        })
    })
    d.push({
        col_type: 'blank_block',
    })


    setResult(d);
}


const secParse = _ => {
    let d = [];


    setResult(d);
}