import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { AuthService } from 'app/core/components/admin/login/services/auth.service';
import { OgretimElemani } from './models/OgretimElemani';
import { OgretimElemaniService } from './services/OgretimElemani.service';
import { environment } from 'environments/environment';

declare var jQuery: any;

@Component({
	selector: 'app-ogretimElemani',
	templateUrl: './ogretimElemani.component.html',
	styleUrls: ['./ogretimElemani.component.scss']
})
export class OgretimElemaniComponent implements AfterViewInit, OnInit {
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id','createdDate','updatedDate','deletedDate','bolumId','userId','kurumSicilNo','unvan','adi','soyadi','tCKimlikNo','cinsiyet','dogumTarihi', 'update','delete'];

	ogretimElemaniList:OgretimElemani[];
	ogretimElemani:OgretimElemani=new OgretimElemani();

	ogretimElemaniAddForm: FormGroup;


	ogretimElemaniId:number;

	constructor(private ogretimElemaniService:OgretimElemaniService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getOgretimElemaniList();
    }

	ngOnInit() {

		this.createOgretimElemaniAddForm();
	}


	getOgretimElemaniList() {
		this.ogretimElemaniService.getOgretimElemaniList().subscribe(data => {
			this.ogretimElemaniList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.ogretimElemaniAddForm.valid) {
			this.ogretimElemani = Object.assign({}, this.ogretimElemaniAddForm.value)

			if (this.ogretimElemani.id == 0)
				this.addOgretimElemani();
			else
				this.updateOgretimElemani();
		}

	}

	addOgretimElemani(){

		this.ogretimElemaniService.addOgretimElemani(this.ogretimElemani).subscribe(data => {
			this.getOgretimElemaniList();
			this.ogretimElemani = new OgretimElemani();
			jQuery('#ogretimelemani').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.ogretimElemaniAddForm);

		})

	}

	updateOgretimElemani(){

		this.ogretimElemaniService.updateOgretimElemani(this.ogretimElemani).subscribe(data => {

			var index=this.ogretimElemaniList.findIndex(x=>x.id==this.ogretimElemani.id);
			this.ogretimElemaniList[index]=this.ogretimElemani;
			this.dataSource = new MatTableDataSource(this.ogretimElemaniList);
            this.configDataTable();
			this.ogretimElemani = new OgretimElemani();
			jQuery('#ogretimelemani').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.ogretimElemaniAddForm);

		})

	}

	createOgretimElemaniAddForm() {
		this.ogretimElemaniAddForm = this.formBuilder.group({		
			id : [0],
createdDate : [null, Validators.required],
updatedDate : [null, Validators.required],
deletedDate : [null, Validators.required],
bolumId : [0, Validators.required],
userId : [0, Validators.required],
kurumSicilNo : ["", Validators.required],
unvan : ["", Validators.required],
adi : ["", Validators.required],
soyadi : ["", Validators.required],
tCKimlikNo : ["", Validators.required],
cinsiyet : [false, Validators.required],
dogumTarihi : [null, Validators.required]
		})
	}

	deleteOgretimElemani(ogretimElemaniId:number){
		this.ogretimElemaniService.deleteOgretimElemani(ogretimElemaniId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.ogretimElemaniList=this.ogretimElemaniList.filter(x=> x.id!=ogretimElemaniId);
			this.dataSource = new MatTableDataSource(this.ogretimElemaniList);
			this.configDataTable();
		})
	}

	getOgretimElemaniById(ogretimElemaniId:number){
		this.clearFormGroup(this.ogretimElemaniAddForm);
		this.ogretimElemaniService.getOgretimElemaniById(ogretimElemaniId).subscribe(data=>{
			this.ogretimElemani=data;
			this.ogretimElemaniAddForm.patchValue(data);
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