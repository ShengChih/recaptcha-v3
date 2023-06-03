# recaptcha-v3
fork from https://github.com/abinnovision/recaptcha-v3


# 新增
1. 同一頁的 recaptcha，每次點擊都會換新的 g-recaptcha-response
2. 預設使用 script async (應該沒有做錯吧阿拉)

# 注意事項
1. recaptcha v3 需要申請 sitekey & secret key (似乎沒有 test sitekey)
2. 申請 sitekey 可以填入 (localhost / 127.0.0.1) 做為開發