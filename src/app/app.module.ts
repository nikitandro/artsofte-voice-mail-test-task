import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageItem } from './components/message-item/message-item.component';
import {
  VOICE_MESSAGE_SERVICE_TOKEN,
  VoiceMessageService,
} from './services/voice-message.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatePipe } from './pipes/paginate.pipe';

@NgModule({
  declarations: [AppComponent, MessageItem],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginatePipe,
  ],
  providers: [
    { provide: VOICE_MESSAGE_SERVICE_TOKEN, useClass: VoiceMessageService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
