import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { DetailPage } from '../detail/detail';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  contents: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angularFire: AngularFireDatabase) {

    this.contents = angularFire.list('/Content');

  }

  addContent():void{
    let prompt = this.alertCtrl.create({
        title:'Assunto',
        message: 'De sua dica aqui',
        inputs:[
          {
              name: 'title',
              placeholder:"Diga seu destino"
        },
        {
            name:'comment',
            placeholder:"Entre com sua duvida ou dica"
        }
      ],
      buttons: [
        {
            text: "Enviar",
            handler: data =>{
              this.contents.push({
                title:data.title,
                comment:data.comment
              })
            }
        }
      ]


    });
    prompt.present();
  }

  seleciona(content){

    console.log(content.$key);

    this.navCtrl.push(DetailPage, { contentSelecionado: content});



  }

}
