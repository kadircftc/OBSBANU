import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { AuthService } from 'app/core/components/admin/login/services/auth.service';
import { Ogrenci } from './models/Ogrenci';
import { OgrenciService } from './services/Ogrenci.service';
import { environment } from 'environments/environment';

declare var jQuery: any;

@Component({
	selector: 'app-ogrenci',
	templateUrl: './ogrenci.component.html',
	styleUrls: ['./ogrenci.component.scss']
})
export class OgrenciComponent implements AfterViewInit, OnInit {
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id','createdDate','updatedDate','deletedDate','bolumId','ogrenciNo','durumId','ayrilmaTarihi','adi','soyadi','tcKimlikNo','cinsiyet','dogumTarihi','userId', 'update','delete'];

	ogrenciList:Ogrenci[];
	ogrenci:Ogrenci=new Ogrenci();

	ogrenciAddForm: FormGroup;


	ogrenciId:number;

	constructor(private ogrenciService:OgrenciService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getOgrenciList();
    }

	ngOnInit() {

		this.createOgrenciAddForm();
	}


	getOgrenciList() {
		this.ogrenciService.getOgrenciList().subscribe(data => {
			this.ogrenciList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.ogrenciAddForm.valid) {
			this.ogrenci = Object.assign({}, this.ogrenciAddForm.value)

			if (this.ogrenci.id == 0)
				this.addOgrenci();
			else
				this.updateOgrenci();
		}

	}

	addOgrenci(){

		this.ogrenciService.addOgrenci(this.ogrenci).subscribe(data => {
			this.getOgrenciList();
			this.ogrenci = new Ogrenci();
			jQuery('#ogrenci').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.ogrenciAddForm);

		})

	}

	updateOgrenci(){

		this.ogrenciService.updateOgrenci(this.ogrenci).subscribe(data => {

			var index=this.ogrenciList.findIndex(x=>x.id==this.ogrenci.id);
			this.ogrenciList[index]=this.ogrenci;
			this.dataSource = new MatTableDataSource(this.ogrenciList);
            this.configDataTable();
			this.ogrenci = new Ogrenci();
			jQuery('#ogrenci').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.ogrenciAddForm);

		})

	}

	createOgrenciAddForm() {
		this.ogrenciAddForm = this.formBuilder.group({		
			id : [0],
createdDate : [null, Validators.required],
updatedDate : [null, Validators.required],
deletedDate : [null, Validators.required],
bolumId : [0, Validators.required],
ogrenciNo : ["", Validators.required],
durumId : [0, Validators.required],
ayrilmaTarihi : [null, Validators.required],
adi : ["", Validators.required],
soyadi : ["", Validators.required],
tcKimlikNo : ["", Validators.required],
cinsiyet : [false, Validators.required],
dogumTarihi : [null, Validators.required],
userId : [0, Validators.required]
		})
	}

	deleteOgrenci(ogrenciId:number){
		this.ogrenciService.deleteOgrenci(ogrenciId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.ogrenciList=this.ogrenciList.filter(x=> x.id!=ogrenciId);
			this.dataSource = new MatTableDataSource(this.ogrenciList);
			this.configDataTable();
		})
	}

	getOgrenciById(ogrenciId:number){
		this.clearFormGroup(this.ogrenciAddForm);
		this.ogrenciService.getOgrenciById(ogrenciId).subscribe(data=>{
			this.ogrenci=data;
			this.ogrenciAddForm.patchValue(data);
		})
	}


	clearFormGroup(group: FormGroup) {

		group.markAsUntouched();
		group.reset();

		Object.keys(group.controls).forEach(key => {
			group.get(key).setErrors(null);
			if (key == 'id')
				group.get(key).setValue(0);
		});
	}

	checkClaim(claim:string):boolean{
		return this.authService.claimGuard(claim)
	}

	configDataTable(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  }
