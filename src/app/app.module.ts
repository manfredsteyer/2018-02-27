import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';
import { FlightService } from './flight-booking/flight-search/flight.service';
import { CityPipe } from './shared/pipes/city.pipe';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { FlightLookaheadComponent } from './lookahead/flight-lookahead.component';
import { EventService } from './event.service';
import { BasketComponent } from './basket/basket.component';
import { SharedModule } from './shared/shared.module';
import { CustomPreloadingStrategy } from './shared/preload/custom-preloading-strategy';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    
    // FlightBookingModule, // Would prevent LazyLoading
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES,
      { preloadingStrategy: CustomPreloadingStrategy }
    )
  ],
  declarations: [
    FlightLookaheadComponent,
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [
    // { provide: FlightService, useClass: FlightService}
    // FlightService
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

