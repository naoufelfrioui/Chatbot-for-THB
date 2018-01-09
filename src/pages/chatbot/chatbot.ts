
import { Component, NgZone  } from '@angular/core';
import { Platform, ToastController  } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare let paltform: any
declare let window: any
declare let ApiAIPlugin: any

@Component({
  selector: 'page-chatbot',
  templateUrl: 'chatbot.html',
})
export class ChatbotPage {
  recognition: any
  isRecognizing: boolean = false
  message: string = ''
  chats: Object[] = []

  constructor(public navCtrl: NavController, platform: Platform, public  _zone: NgZone, public toastCtrl: ToastController) {
    platform = platform    
    platform.ready().then(() => {
      this.initializeApiAI()
      this.initializeSpeechRecognition()      
    })
  }

  initializeApiAI() {
    ApiAIPlugin.init({
          clientAccessToken: "f12cc29f4df14e698da8aa6bceb1e557",
          lang: "de"
      }, result=> {
          console.log(result)
      }, error=> {
        console.log(error)
    })
  }

  initializeSpeechRecognition() {
    if(window.SpeechRecognition) {
      this.recognition = new window.SpeechRecognition()

      this.recognition.continuous = true
      this.recognition.lang = 'de-DE'
      this.recognition.maxAlternatives = 50          

      this.recognition.onstart = (event => {
        this._zone.run(() => {
          this.isRecognizing = true
        })
      })

      this.recognition.onend = (event => {
        this._zone.run(() => {
          this.isRecognizing = false
        })
      })

      this.recognition.onerror = (event => {
        this._zone.run(() => {
          this.isRecognizing = false
          this.presentToast("Error..." + event.error)
        })
      })

      this.recognition.onresult = (event => {
        if (event.results) {
          this._zone.run(() => {
            const result = event.results[0];
            let resultText = result[0].transcript                                  
            this.sendMessage(resultText)               
          })
          this.isRecognizing = false
        }
      })
    }
  }
  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position : "middle",
      duration: 10000
    })
    toast.present()
  }
 
 
  speechToText(){   
    if(!this.isRecognizing) {
      this.recognition.start()
    }
  }

  sendMessage(msg) {    
    if(msg!=='') {
      this.chats = [...this.chats, ({message: msg, from: 'me'})]
      ApiAIPlugin.requestText({
          query: msg
      }, response=> {
        console.log(JSON.stringify(response))
        this._zone.run(()=> {
          let text = response.result.fulfillment.speech;          
          this.chats = [...this.chats, ({message: text, from: 'him'})]
        })            
      }, error=> {
          console.log(error)
      })
               
    }
    this.message=''
  }

}



