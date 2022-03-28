import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './core/services/auth-service.service';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UsersComponent } from './pages/users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { UsercardComponent } from './shared/usercard/usercard.component';
import { HttpTokenInterceptor } from './core/interceptors/http-interceptor.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { BannerComponent } from './shared/layout/banner.component';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsercardComponent,
    ProfileComponent,
    BannerComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
