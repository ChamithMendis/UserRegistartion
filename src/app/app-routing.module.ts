import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistartionComponent } from './pages/registartion/registartion.component';
import { UserdataComponent } from './pages/userdata/userdata.component';

const routes: Routes = [
  { path: '', component: UserdataComponent },
  { path: 'registartion', component: RegistartionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
