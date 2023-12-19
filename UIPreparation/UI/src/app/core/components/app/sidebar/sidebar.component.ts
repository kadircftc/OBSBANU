import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../admin/login/services/auth.service';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    claim:string;
}
export const ADMINROUTES: RouteInfo[] = [
  { path: '/user', title: 'Users', icon: 'how_to_reg', class: '', claim:"GetUsersQuery" },
  { path: '/group', title: 'Groups', icon:'groups', class: '',claim:"GetGroupsQuery" },
  { path: '/operationclaim', title: 'OperationClaim', icon:'local_police', class: '', claim:"GetOperationClaimsQuery"},
  { path: '/language', title: 'Languages', icon:'language', class: '', claim:"GetLanguagesQuery" },
  { path: '/translate', title: 'TranslateWords', icon: 'translate', class: '', claim: "GetTranslatesQuery" },
  { path: '/log', title: 'Logs', icon: 'update', class: '', claim: "GetLogDtoQuery" },
  { path: '/bolum', title: 'Bolumler', icon: 'update', class: '', claim: "GetBolumsQuery" },
  { path: '/danismanlik', title: 'Danismanlikler', icon: 'update', class: '', claim: "GetDanismanliksQuery" },
  { path: '/degerlendirme', title: 'Degerlendirmeler', icon: 'update', class: '', claim: "GetDegerlendirmesQuery" },
  { path: '/dersAcma', title: 'DersAcma', icon: 'update', class: '', claim: "GetDersAcmasQuery" },
  { path: '/dersAlma', title: 'DersAlma', icon: 'update', class: '', claim: "GetDersAlmasQuery" },
  { path: '/dersHavuzu', title: 'DersHavuzu', icon: 'update', class: '', claim: "GetDersHavuzusQuery" },
  { path: '/derslik', title: 'Derslik', icon: 'update', class: '', claim: "GetDersliksQuery" },
  { path: '/dersProgrami', title: 'DersProgrami', icon: 'update', class: '', claim: "GetLogDtoQuery" },
  { path: '/mufredat', title: 'Mufredat', icon: 'update', class: '', claim: "GetMufredatsQuery" },
  { path: '/ogrenci', title: 'Ogrenci', icon: 'update', class: '', claim: "GetOgrencisQuery" },
  { path: '/ogretimElemani', title: 'OgretimElemani', icon: 'update', class: '', claim: "GetOgretimElemanisQuery" },
  { path: '/sinav', title: 'Sinav', icon: 'update', class: '', claim: "GetSinavsQuery" }
];

export const USERROUTES: RouteInfo[] = [ 
  { path: '/sT_AkademikDonem', title: 'ST_AkademikDonem', icon: 'update', class: '', claim: "GetST_AkademikDonemsQuery" },
  { path: '/sT_AkademikYil', title: 'ST_AkademikYil', icon: 'update', class: '', claim: "GetST_AkademikYilsQuery" },
  { path: '/sT_DersAlmaDurumu', title: 'ST_DersAlmaDurumu', icon: 'update', class: '', claim: "GetST_DersAlmaDurumusQuery" },
  { path: '/sT_DersDili', title: 'ST_DersDili', icon: 'update', class: '', claim: "GetST_DersDilisQuery" },
  { path: '/sT_DersGunu', title: 'ST_DersGunu', icon: 'update', class: '', claim: "GetST_DersGunusQuery" },
  { path: '/sT_DerslikTuru', title: 'ST_DerslikTuru', icon: 'update', class: '', claim: "GetST_DerslikTurusQuery" },
  { path: '/sT_DersSeviyesi', title: 'ST_DersSeviyesi', icon: 'update', class: '', claim: "GetST_DersSeviyesisQuery" },
  { path: '/sT_DersTuru', title: 'ST_DersTuru', icon: 'update', class: '', claim: "GetST_DersTurusQuery" },
  { path: '/sT_OgrenciDurum', title: 'ST_OgrenciDurum', icon: 'update', class: '', claim: "GetST_OgrenciDurumsQuery" },
  { path: '/sT_OgretimDili', title: 'ST_OgretimDili', icon: 'update', class: '', claim: "GetST_OgretimDilisQuery" },
  { path: '/sT_OgretimTuru', title: 'ST_OgretimTuru', icon: 'update', class: '', claim: "GetST_OgretimTurusQuery" },
  { path: '/sT_ProgramTuru', title: 'ST_ProgramTuru', icon: 'update', class: '', claim: "GetST_ProgramTurusQuery" },
  { path: '/sT_SinavTuru', title: 'ST_SinavTuru', icon: 'update', class: '', claim: "GetST_SinavTurusQuery" },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  adminMenuItems: any[];
  userMenuItems: any[];

  constructor(private router:Router, private authService:AuthService,public translateService:TranslateService) {
    
  }

  ngOnInit() {
  
    this.adminMenuItems = ADMINROUTES.filter(menuItem => menuItem);
    this.userMenuItems = USERROUTES.filter(menuItem => menuItem);

    var lang=localStorage.getItem('lang') || 'tr-TR'
    this.translateService.use(lang);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  checkClaim(claim:string):boolean{
    return this.authService.claimGuard(claim)
  }
  ngOnDestroy() {
    if (!this.authService.loggedIn()) {
      this.authService.logOut();
      this.router.navigateByUrl("/login");
    }
  } 
 }

