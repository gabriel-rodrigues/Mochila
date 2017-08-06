import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable,} from 'angularfire2/database';




@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public contentSelecionado;

  details: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, angularFire: AngularFireDatabase) {

    this.contentSelecionado = this.navParams.get('contentSelecionado');
    this.details = angularFire.list('/Content/'+this.contentSelecionado.$key+'/commentItems');
    //this.details = this.navParams.get('detailcomment')


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
              });
            }
        }
      ]


    });
    prompt.present();
  }


}
