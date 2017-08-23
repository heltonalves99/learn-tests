import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextSummaryPipePipe } from './01-text-summary-pipe/text-summary-pipe.pipe';
import { LikeComponent } from './02-like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    TextSummaryPipePipe,
    LikeComponent
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
