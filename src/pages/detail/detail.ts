import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';




@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public content;

  details: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, angularFire: AngularFireDatabase) {

    this.details = angularFire.list('/Detail');

    this.content = this.navParams.get('contentSelecionado');

    console.log(this.content);
  }

  addDetail():void{
    let prompt = this.alertCtrl.create({
        title:'Assunto',
        message: 'De sua dica aqui',
        inputs:[
        {
            name:"detailcomment",
            placeholder:"Entre com sua duvida ou dica"
        }
      ],
      buttons: [
        {
            text: "Enviar",
            handler: data =>{
              this.details.push({
                detailcomment:data.detailcomment
              })
            }
        }
      ]


    });
    prompt.present();
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
