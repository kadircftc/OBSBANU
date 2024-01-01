import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../admin/login/services/auth.service';
import { OgrenciOzlukBilgileriDto } from '../../admin/ogrenci/models/ogrenciOzlukBilgileriDto';
import { OzlukBilgileriService } from './services/ozlukBilgileri.service';

@Component({
  selector: 'app-ozluk-bilgileri',
  templateUrl: './ozluk-bilgileri.component.html',
  styleUrls: ['./ozluk-bilgileri.component.css']
})
export class OzlukBilgileriComponent implements OnInit {



  ozlukBilgisi: OgrenciOzlukBilgileriDto;


  ogrenciId: number;

  @Input() data: any;

  ozlukBilgileriform: FormGroup;
  userId : number;



  constructor(private ozlukBilgileriService: OzlukBilgileriService, private fb: FormBuilder,private authService:AuthService) {

  }




  ngOnInit(): void {
    this.getUserId();
    this.getOzlukBilgileri(this.userId);
    this.createOzlukBilgilerForm();
  }



  getUserId(){
    this.userId = this.authService.getUserId();
  }

  getOzlukBilgileri(id:number) {
    this.ozlukBilgileriService.getOgrenciOzlukBilgileri(id).subscribe(data => {
      this.ozlukBilgisi = data
      console.log(this.ozlukBilgisi);
      this.ozlukBilgileriform.patchValue(this.ozlukBilgisi[0]);
    })
  }


  createOzlukBilgilerForm() {
		this.ozlukBilgileriform = this.fb.group({
      adi: [{ value: '', disabled: true }],
      soyadi: [{ value: '', disabled: true }],
      tcKimlikNo: [{ value: '', disabled: true }],
      dogumTarihi: [{ value: '', disabled: true }],
      bolumAdi: [{ value: '', disabled: true }],
      ogrNo: [{ value: '', disabled: true }],
      kayitTarihi: [{ value: '', disabled: true }],
      durum: [{ value: '', disabled: true }],
      ayrilmaTarihi: [{ value: '', disabled: true }],
      danismanAdi: [{ value: '', disabled: true }],
      danismanSoyadi: [{ value: '', disabled: true }],
      adres: [{ value: '', disabled: true }],
      telefonNo: [{ value: '', disabled: true }]
    });
	}

  clearFormGroup(group: FormGroup) {
		group.reset();
		Object.keys(group.controls).forEach(key => {
			group.get(key).setErrors(null);
			if (key == 'id')
				group.get(key).setValue(0);
		});
	}







}
