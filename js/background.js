/**
 * 嗨网解析 http://tv.138hi.com/
 * https://api.47ks.com/webcloud/?v=
 * http://www.vipjiexi.com/yun.php?url=
 * http://www.wmxz.wang/video.php?url=
 * 
 * 全民解析 http://www.qmaile.com/
 * http://jx.drgxj.com/?url=
 * 
 * 
 * 牛巴巴VIP解析 http://mv.688ing.com/
 * http://mv.688ing.com/player?url=
 * 
 */


let urls = {
    '嗨网解析': {
        '⑩vip引擎系统【稳定通用】':'http://www.vipjiexi.com/yun.php?url=',
        '⑨vip引擎系统【稳定通用】':'http://www.wmxz.wang/video.php?url=',
        '⑧vip引擎系统【爱奇艺完美】':'http://player.gakui.top/?url=',
        '⑦号vip引擎系统【搜狐、乐视】':'http://qtzr.net/s/?qt=',
        '⑥号vip引擎系统【腾讯稳定】':'http://jx.71ki.com/qqvip.php?url=',
        '⑤号vip引擎系统【腾讯超清】':'http://v.72du.com/api/?url=',
        '④号vip引擎系统【腾讯推荐】':'http://minevideo.sxl.me/qq.php?vid=',
        '③号vip引擎系统【乐视推荐】':'http://doudiapi.duapp.com/letv.php?url=',
        '②号通用vip引擎系统【稳定通用】':'https://api.47ks.com/webcloud/?v=',
        '①号通用vip引擎系统【稳定通用】':'https://api.47ks.com/webcloud/?v='
    },
    '全民解析': {
        '⑤号通用vip引擎系统【稳定通用】':'http://jx.du2.cc/?url=',
        '④号通用vip引擎系统【超级稳定通用】':'http://jx.drgxj.com/?url=',
        '③号通用vip引擎系统【稳定通用】':'http://jx.618ge.com/?url=',
        '②号通用vip引擎系统【稳定通用】':'http://vip.jlsprh.com/?url=',
        '①号通用vip引擎系统【稳定通用】':'http://jx.598110.com/?url='
    },
    '牛巴巴VIP解析':'http://mv.688ing.com/player?url='
}

function createMenu(k, v){
    chrome.contextMenus.create({
        id: k + '1',
        title: k,
        contexts: ['link'],
        onclick: function(params)
        {
            chrome.tabs.create({url: v + encodeURI(params.linkUrl)});
        }
    });

    chrome.contextMenus.create({
        id: k + '2',
        title: k,
        contexts: ['selection'],
        onclick: function(params)
        {
            chrome.tabs.create({url: v + encodeURI(params.selectionText)});
        }
    });
}

function createParentMenu(k){
    chrome.contextMenus.create({
        id: k + '1',
        title: k,
        contexts: ['link']
    });

    chrome.contextMenus.create({
        id: k + '2',
        title: k,
        contexts: ['selection']
    });
}

function createChildrenMenu(pid, k, v){
    chrome.contextMenus.create({
        id: pid + '-'+ k + '1',
        title: k,
        contexts: ['link'],
        parentId: pid + '1',
        onclick: function(params)
        {
            chrome.tabs.create({url: v + encodeURI(params.linkUrl)});
        }
    });

    chrome.contextMenus.create({
        id: pid + '-'+ k + '2',
        title: k,
        parentId: pid + '2',
        contexts: ['selection'],
        onclick: function(params)
        {
            chrome.tabs.create({url: v + encodeURI(params.selectionText)});
        }
    });
}

for(let k in urls){
    if(typeof(urls[k])=='string'){
        createMenu(k, urls[k])
    }else{
        createParentMenu(k)
        let d = urls[k]
        for(let ck in d){
            createChildrenMenu(k, ck, d[ck])
        }
    }
}
