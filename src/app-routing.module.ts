import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoeIndexComponent } from './app/pages/shoe-index/shoe-index.component';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { AboutPageComponent } from './app/pages/about-page/about-page.component';
import { ShoeDetailsComponent } from './app/pages/shoe-details/shoe-details.component';
import { ShoeEditComponent } from './app/pages/shoe-edit/shoe-edit.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  {
    path: 'shoe', component: ShoeIndexComponent, children: [
      { path: 'edit', component: ShoeEditComponent },
      { path: 'edit/:id', component: ShoeEditComponent },

    ]
  },
  { path: 'shoe/:id', component: ShoeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
