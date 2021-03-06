import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HomeComponent } from './components/home/home.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ChatroomListComponent } from './components/chatroom-list/chatroom-list.component';
import { ChatroomItemComponent } from './components/chatroom-item/chatroom-item.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'matches',
    component: MatchListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chats',
    component: ChatroomListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chats/:id',
    component: ChatroomItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'result/:id',
    component: ResultPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'impressum',
    component: ImpressumPageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
