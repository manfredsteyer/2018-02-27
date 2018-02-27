import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { CustomPreloadingStrategy } from './preload/custom-preloading-strategy';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe
  ],
  providers: [
    CustomPreloadingStrategy
  ],
  exports: [
    CityPipe
  ]
})
export class SharedModule { }
