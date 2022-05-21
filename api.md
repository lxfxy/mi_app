```
code = 0 => 成功
code = 1 => 失败
codeText => 返回信息
```
1. 首页
```
获取每日最新商品
url: /home/news
data: {
    code,
    codeText,
    data
}

获取热销商品
url: /home/hots
data: {
    code,
    codeText,
    data
}

获取限购商品
url: /home/limitTimeShop
data: {
    code,
    codeText,
    data,
    time
}

获取展示商品
url: /home/shops
data: {
    code,
    codeText,
    data,
    pages,
    page,
    total,
}
```

