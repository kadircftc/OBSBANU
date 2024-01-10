import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AdminLayoutComponent } from './core/components/app/layouts/admin-layout/admin-layout.component';
import { OgrenciLayoutComponent } from './core/components/app/layouts/ogrenci-layout/ogrenci-layout.component';
import { OgrenciMufredatComponent } from './core/components/ogrenci/ogrenci-mufredat/ogrenci-mufredat.component';
import { OgretimElemaniMufredatComponent } from './core/components/ogretimElemani/ogretim-elemani-mufredat/ogretim-elemani-mufredat.component';
import { OgretimElemaniOzlukBilgileriComponent } from './core/components/ogretimElemani/ogretim-elemani-ozluk-bilgileri/ogretim-elemani-ozluk-bilgileri.component';
import { SinavNotlandirmaComponent } from './core/components/ogretimElemani/sinav-notlandirma/sinav-notlandirma.component';
import { LoginGuard } from './core/guards/login-guard';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { ComponentsModule } from './core/modules/components.module';
import { HttpEntityRepositoryService } from './core/services/http-entity-repository.service';
import { TranslationService } from './core/services/Translation.service';
import { OgrenciAlinanDerslerComponent } from './core/components/ogrenci/ogrenci-alinan-dersler/ogrenci-alinan-dersler.component';
import { OgrenciDersProgramiComponent } from './core/components/ogrenci/ogrenci-ders-programi/ogrenci-ders-programi.component';
import { OgrenciNotBilgisiComponent } from './core/components/ogrenci/ogrenci-not-bilgisi/ogrenci-not-bilgisi.component';
import { OgrenciDersAlmaComponent } from './core/components/ogrenci/ogrenci-ders-alma/ogrenci-ders-alma.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';


// i18 kullanıclak ise aşağıdaki metod aktif edilecek

//  export function HttpLoaderFactory(http: HttpClient) {
//    
//    var asd=new TranslateHttpLoader(http, '../../../../assets/i18n/', '.json'); 
//    return asd;
//  }


export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    SweetAlert2Module,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        //useFactory:HttpLoaderFactory, //i18 kullanılacak ise useClass kapatılıp yukarıda bulunan HttpLoaderFactory ve bu satır aktif edilecek
        useClass: TranslationService,
        deps: [HttpClient]
      }

    })

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    OgrenciMufredatComponent,
    OgrenciLayoutComponent,
    OgretimElemaniOzlukBilgileriComponent,
    SinavNotlandirmaComponent,
    OgretimElemaniMufredatComponent,
    OgrenciAlinanDerslerComponent,
    OgrenciDersProgramiComponent,
    OgrenciNotBilgisiComponent,
    OgrenciDersAlmaComponent,
  ],

  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },    
    HttpEntityRepositoryService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
