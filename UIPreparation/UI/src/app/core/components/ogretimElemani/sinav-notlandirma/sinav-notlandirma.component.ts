import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../admin/login/services/auth.service';
import { OgretimElemaniServiceIn } from '../ogretim-elemani-ozluk-bilgileri/services/ogretimElemani.service';
import { OgretimElemaniSinavDto } from './models/ogretimElemaniSinavlarDto';

@Component({
  selector: 'app-sinav-notlandirma',
  templateUrl: './sinav-notlandirma.component.html',
  styleUrls: ['./sinav-notlandirma.component.css']
})
export class SinavNotlandirmaComponent implements OnInit {

  sinavList:OgretimElemaniSinavDto[];


  constructor(private ogretimElemaniService:OgretimElemaniServiceIn,private authService:AuthService) { }

  ngOnInit(): void {
    this.getOgretimElemaniSinavlar();
   
  }



  getOgretimElemaniSinavlar(){
    this.ogretimElemaniService.getOgretimElemaniSinav(this.authService.getUserId()).subscribe(data=>{
      this.sinavList=data;
      console.log(this.sinavList);
    })
  }








}
