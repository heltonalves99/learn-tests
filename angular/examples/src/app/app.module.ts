import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextSummaryPipePipe } from './01-text-summary-pipe/text-summary-pipe.pipe';
import { LikeComponent } from './02-like/like.component';
import { VoterComponent } from './03-voter/voter.component';
import { UserComponent } from './04-user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    TextSummaryPipePipe,
    LikeComponent,
    VoterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
