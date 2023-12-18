import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { AuthService } from 'app/core/components/admin/login/services/auth.service';
import { Bolum } from './models/Bolum';
import { BolumService } from './services/Bolum.service';
import { environment } from 'environments/environment';

declare var jQuery: any;

@Component({
	selector: 'app-bolum',
	templateUrl: './bolum.component.html',
	styleUrls: ['./bolum.component.scss']
})
export class BolumComponent implements AfterViewInit, OnInit {
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id','createdDate','updatedDate','deletedDate','programTuruId','ogretimTuruId','ogretimDiliId','bolumAdi','webAdresi', 'update','delete'];

	bolumList:Bolum[];
	bolum:Bolum=new Bolum();

	bolumAddForm: FormGroup;


	bolumId:number;

	constructor(private bolumService:BolumService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getBolumList();
    }

	ngOnInit() {

		this.createBolumAddForm();
	}


	getBolumList() {
		this.bolumService.getBolumList().subscribe(data => {
			this.bolumList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.bolumAddForm.valid) {
			this.bolum = Object.assign({}, this.bolumAddForm.value)

			if (this.bolum.id == 0)
				this.addBolum();
			else
				this.updateBolum();
		}

	}

	addBolum(){

		this.bolumService.addBolum(this.bolum).subscribe(data => {
			this.getBolumList();
			this.bolum = new Bolum();
			jQuery('#bolum').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.bolumAddForm);

		})

	}

	updateBolum(){

		this.bolumService.updateBolum(this.bolum).subscribe(data => {

			var index=this.bolumList.findIndex(x=>x.id==this.bolum.id);
			this.bolumList[index]=this.bolum;
			this.dataSource = new MatTableDataSource(this.bolumList);
            this.configDataTable();
			this.bolum = new Bolum();
			jQuery('#bolum').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.bolumAddForm);

		})

	}

	createBolumAddForm() {
		this.bolumAddForm = this.formBuilder.group({		
			id : [0],
createdDate : [null, Validators.required],
updatedDate : [null, Validators.required],
deletedDate : [null, Validators.required],
programTuruId : [0, Validators.required],
ogretimTuruId : [0, Validators.required],
ogretimDiliId : [0, Validators.required],
bolumAdi : ["", Validators.required],
webAdresi : ["", Validators.required]
		})
	}

	deleteBolum(bolumId:number){
		this.bolumService.deleteBolum(bolumId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.bolumList=this.bolumList.filter(x=> x.id!=bolumId);
			this.dataSource = new MatTableDataSource(this.bolumList);
			this.configDataTable();
		})
	}

	getBolumById(bolumId:number){
		this.clearFormGroup(this.bolumAddForm);
		this.bolumService.getBolumById(bolumId).subscribe(data=>{
			this.bolum=data;
			this.bolumAddForm.patchValue(data);
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