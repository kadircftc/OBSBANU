import { Component, OnInit } from '@angular/core';
import { LookUp } from 'app/core/models/lookUp';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { OzlukBilgileriService } from '../ozluk-bilgileri/services/ozlukBilgileri.service';

@Component({
  selector: 'app-ogrenci-not-bilgisi',
  templateUrl: './ogrenci-not-bilgisi.component.html',
  styleUrls: ['./ogrenci-not-bilgisi.component.css']
})
export class OgrenciNotBilgisiComponent implements OnInit {

  constructor(private ogrenciservice: OzlukBilgileriService, private localStorageService: LocalStorageService) { }
  ogrenciNotList: OgrenciNotBilgisiDto[];
  filteredOgrenciNotList: OgrenciNotBilgisiDto[];
  akademikYilList: LookUp[]
  ogrenciDonemi: string;
  ogrenciSinifi: string;
  baslangicYili: number
  bitisYili: number
  donem: string
  sinifNumarasi: number
  isChange =  false;

  harfNotlari = [
    { harf: 'AA', altSinir: 90, ustSinir: 100, puan: 4.0, durum: 'Başarılı' },
    { harf: 'BA', altSinir: 80, ustSinir: 89, puan: 3.5, durum: 'Başarılı' },
    { harf: 'BB', altSinir: 75, ustSinir: 79, puan: 3.0, durum: 'Başarılı' },
    { harf: 'CB', altSinir: 70, ustSinir: 74, puan: 2.5, durum: 'Başarılı' },
    { harf: 'CC', altSinir: 60, ustSinir: 69, puan: 2.0, durum: 'Başarılı' },
    { harf: 'DC', altSinir: 50, ustSinir: 59, puan: 1.5, durum: 'Koşullu Başarılı - Başarısız' },
    { harf: 'DD', altSinir: 40, ustSinir: 49, puan: 1.0, durum: 'Başarısız' },
    { harf: 'FD', altSinir: 30, ustSinir: 39, puan: 0.5, durum: 'Başarısız' },
  ];

  ngOnInit(): void {
    this.getOgrenciNotList();
    this.getAkademikYil();
  }

  getOgrenciNotList(){
    this.ogrenciservice.getOgrenciNotList(this.localStorageService.getUserId()).subscribe(data=>{
      this.ogrenciNotList = data;
       
      this.ogrenciNotList.forEach(element => {
        element.notOrt = parseFloat(element.notOrt.toFixed(2));
      });
      this.ogrenciNotList.forEach(notlar => {
        if (notlar.notOrt !== null) {
          if (notlar.finalNotu !== null && notlar.finalNotu < 50) {
              notlar.harfNotu = 'FF';
          } else if (notlar.butunlemeNotu !== null && notlar.butunlemeNotu < 50) {
              notlar.harfNotu = 'FF';
          } else{
              for (let i = 0; i < this.harfNotlari.length; i++) {
                  if (notlar.notOrt >= this.harfNotlari[i].altSinir && notlar.notOrt <= this.harfNotlari[i].ustSinir) {
                      notlar.harfNotu = this.harfNotlari[i].harf;
                      break;
                  }
              }
          }
        if (notlar.harfNotu == 'FF' || notlar.notOrt < 50) {
          notlar.durum = false
        }else{
          notlar.durum = true
        }
      } 
      else {
          notlar.harfNotu = null; // Eğer not ortalaması null ise harfNotu'nu da null yap
      }
      })
      this.ogrenciDonemi = this.ogrenciNotList[0].ogrenciDonemi;
      this.ogrenciSinifi = this.ogrenciNotList[0].ogrenciSinifi;
      this.filteredOgrenciNotList = this.ogrenciNotList.filter(d=> d.sinavDonemi === this.ogrenciDonemi)
      if(!this.isChange){
        this.getAkademikYil()
      }
    });
  }

  getGeçmeDurumu(harfNotu) {
    if (harfNotu === 'FF' || harfNotu === 'FD') {
        return 'Kaldı';
    } else {
        return 'Geçti';
    }
  }



  getAkademikYil() {
    const yillar = this.ogrenciDonemi.match(/\d{4}/g);
    console.log(yillar)

    if (yillar && yillar.length === 2) {
      this.baslangicYili = parseInt(yillar[0], 10);
      this.bitisYili = parseInt(yillar[1], 10);
      console.log("çalışşsanaasss")
    }

    const numberMatch = this.ogrenciSinifi.match(/^\d+/);
    this.sinifNumarasi = numberMatch ? parseInt(numberMatch[0], 10) : null;

    

    const seasonMatch = this.ogrenciSinifi.match(/\b(Güz|Bahar)\b$/);
    this.donem = seasonMatch ? seasonMatch[0] : null;

    console.log(this.sinifNumarasi)
    if(this.sinifNumarasi == 1 && this.donem == 'Güz'){
    console.log('1')
      this.akademikYilList  = [{id: 1,label: this.ogrenciDonemi}]
    }
    else if (this.sinifNumarasi == 1 && this.donem == 'Bahar'){
      console.log('2')
      this.akademikYilList = [
        {id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili + '-' + this.bitisYili + 'Güz' + ' Dönemi'},]
    }
    else if ( this.sinifNumarasi == 2 &&  this.donem == 'Güz'){
      console.log('2')
      this.akademikYilList = [{id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Bahar' + ' Dönemi'},
        {id: 3,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Güz' + ' Dönemi'}]
    }
    else if ( this.sinifNumarasi == 2 &&  this.donem == 'Bahar'){
      console.log('3')
      this.akademikYilList = [
        {id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili + '-' + this.baslangicYili + 'Güz' + ' Dönemi'},
        {id: 3,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Bahar' + ' Dönemi'},
        {id: 4,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Güz' + ' Dönemi'}]
    }
    else if ( this.sinifNumarasi == 3 &&  this.donem == 'Güz'){
      console.log('3')
      this.akademikYilList = [{id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Bahar' + ' Dönemi'},
        {id: 3,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Güz' + ' Dönemi'},
        {id: 4,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Bahar' + ' Dönemi'},
        {id: 5,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Güz' + ' Dönemi'}]
    }
    else if ( this.sinifNumarasi == 3 &&  this.donem == 'Bahar'){
      console.log('3')
      this.akademikYilList = [
        {id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili+ '-'+ this.bitisYili + ' Güz' + ' Dönemi'},
        {id: 3,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Bahar' + ' Dönemi'},
        {id: 4,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Güz' + ' Dönemi'},
        {id: 5,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Bahar' + ' Dönemi'},
        {id: 6,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Güz' + ' Dönemi'}]
    }
    else if ( this.sinifNumarasi == 4 &&  this.donem == 'Güz'){
      console.log('4')
      this.akademikYilList = [{id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Bahar' + ' Dönemi'},
        {id: 3,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Güz' + ' Dönemi'},
        {id: 4,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Bahar' + ' Dönemi'},
        {id: 5,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Güz' + ' Dönemi'},
        {id: 6,label: this.baslangicYili-3 + '-' + (this.baslangicYili-2) + ' Bahar' + ' Dönemi'},
        {id: 7,label: this.baslangicYili-3 + '-' + (this.baslangicYili-2) + ' Güz' + ' Dönemi'}]
    }
    else if ( this.sinifNumarasi == 4 &&  this.donem == 'Bahar'){
      console.log('4')
      this.akademikYilList = [
        {id: 1,label: this.ogrenciDonemi},
        {id: 2,label: this.baslangicYili+ '-'+ this.bitisYili + ' Güz' + ' Dönemi'},
        {id: 3,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Bahar' + ' Dönemi'},
        {id: 4,label: this.baslangicYili-1 + '-' + this.baslangicYili + ' Güz' + ' Dönemi'},
        {id: 5,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Bahar' + ' Dönemi'},
        {id: 6,label: this.baslangicYili-2 + '-' + (this.baslangicYili-1) + ' Güz' + ' Dönemi'},
        {id: 7,label: this.baslangicYili-3 + '-' + (this.baslangicYili-2) + ' Bahar' + ' Dönemi'},
        {id: 8,label: this.baslangicYili-3 + '-' + (this.baslangicYili-2) + ' Güz' + ' Dönemi'}]
    }
  }

  filterByAkademikYil(akademikYil){
    if(this.isChange==false){
      this.filteredOgrenciNotList= this.ogrenciNotList.filter(a=>a.sinavDonemi===akademikYil)
      this.isChange=true
    }
    else
    {
      this.filteredOgrenciNotList= this.ogrenciNotList.filter(a=>a.sinavDonemi===akademikYil)
    }
  }

}
