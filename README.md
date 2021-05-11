# listwithrouter

由Node.js 和 Express 建構的網站，可依照不同的字眼來搜尋餐廳，可使用CRUD (增删改查) 功能。

# 功能
- 按圖片查詢餐廳資料 (包括類別、地址、電話、評分、圖片及 Google Map)
- 按**編輯**更改餐廳資料
- 按**刪除**刪除餐廳資料
- 按**增加餐廳**新增 (包括類別、地址、電話、評分、圖片及 Google Map) 等資料

# 安裝
1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/fredunit/restaurant_list.git
```

2.啟動

```
cd restaurant_list //切換到這個資料夾
```
```
npm install //安裝套件
```

3.產生餐廳資料至 MongoDB
```
npm run node models/seeds/restaurantSeeder.js  //執行增加資料至 MongoDB
```

4.開啟程式
```
npm run start  //執行程式
```
終端顯示 db is connected! 即啟動完成，請至http://localhost:3000開始使用程式

# User Interface
![image](https://github.com/fredunit/listwithrouter/blob/3694aa68abfb9c3d72a1f3ee22e7166c5511014d/rl1.jpg)
![image](https://github.com/fredunit/listwithrouter/blob/3694aa68abfb9c3d72a1f3ee22e7166c5511014d/rl2.jpg)
![image](https://github.com/fredunit/listwithrouter/blob/3694aa68abfb9c3d72a1f3ee22e7166c5511014d/rl3.jpg)
