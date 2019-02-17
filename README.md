# ionic-sqlite-sdcard
使用ionic3从sdCard内打开sqlite数据库，查询内容解密后显示在页面

# 解释
- 因为ionic-native(cordova)无法直接从sdCard打开数据库文件，所以，在app启动的时候使用了DBCopy把数据库copy到了软件内存路径下
