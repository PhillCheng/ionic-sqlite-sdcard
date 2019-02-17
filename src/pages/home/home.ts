import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public sqlite: SQLite,
              public sqliteDbCopy: SqliteDbCopy) { }

  items = [];

  // copy 数据库到安装程序目录
  ionViewDidLoad(){
    this.items.push({NAMEINDEX:1,XINGMING:'aa'});
    this.sqliteDbCopy.copyDbFromStorage('ionic.db',0,'/storage/emulated/0/appUser/ionic.db',false)
      .then((res: any) =>{ console.log(res); alert("copy success"); this.selectData()})
      .catch((error: any) => {console.error(error)});
  }

  ionViewDidEnter(){
    this.items.push({NAMEINDEX:2,XINGMING:'bb'});
    // let temp_xingming = this.decrypt_AES("WUpwctMaUb4DQKRIz/dT6Q==","JeF8U9wHFOMfs2Y8");
    // alert(temp_xingming);
  }

  // 查询数据
  selectData(){
    this.sqlite.create({
      name: 'ionic.db',
      location: 'default'
      // iosDatabaseLocation: 'Documents' //ios数据库位置，Documents子目录 - 对iTunes可见并由iCloud备份
      // createFromLocation：1 // 使用www目录下的预装数据库
    })
    .then((db: SQLiteObject) => {
      db.executeSql('select * from TB_USER ', [])
        .then((res) => {
          this.items.push({NAMEINDEX:3,XINGMING:'cc'});
          alert("select success");
          //this.items = res.rows; //不好使
          // 数据转换
          let len1 = res.rows.length;
          len1 = 20;
          for(var i=0; i < len1; i++) {
            let temp_xingming = this.decrypt_AES(res.rows.item(i).XINGMING,"1234567890123456");
            // alert(temp_xingming);
            this.items.push({NAMEINDEX:res.rows.item(i).NAMEINDEX,XINGMING:temp_xingming})
          }
        })
        .catch(e => {
          alert("select error");
          console.log(e);
        });
    })
    .catch(e => console.log(e));

  }

  // 数据解密方法
  decrypt_AES(ciphertext,secret_key){
    secret_key = CryptoJS.enc.Utf8.parse(secret_key);
    let bytes  = CryptoJS.AES.decrypt(ciphertext, secret_key,{
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
