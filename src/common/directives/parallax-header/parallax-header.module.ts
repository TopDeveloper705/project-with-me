import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ParallaxHeaderDirective } from './parallax-header.directive';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ParallaxHeaderDirective],
  exports: [ParallaxHeaderDirective],
})
export class ParallaxHeaderModule {}
