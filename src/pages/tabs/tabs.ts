import { Component } from '@angular/core';

// import { HomePage } from '../home/home';
import { Bot } from "../bot/bot";
import { ChatbotPage } from "../chatbot/chatbot";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChatbotPage;
  
  tab2Root: any = Bot;

  constructor() {

  }
}
