import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { AuthService } from 'app/core/components/admin/login/services/auth.service';
import { Sinav } from './models/Sinav';
import { SinavService } from './services/Sinav.service';
import { environment } from 'environments/environment';

declare var jQuery: any;

@Component({
	selector: 'app-sinav',
	templateUrl: './sinav.component.html',
	styleUrls: ['./sinav.component.scss']
})
export class SinavComponent implements AfterViewInit, OnInit {
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id','createdDate','updatedDate','deletedDate','dersAcmaId','sinavTuruId','derslikId','ogrElmID','etkiOrani','sinavTarihi', 'update','delete'];

	sinavList:Sinav[];
	sinav:Sinav=new Sinav();

	sinavAddForm: FormGroup;


	sinavId:number;

	constructor(private sinavService:SinavService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getSinavList();
    }

	ngOnInit() {

		this.createSinavAddForm();
	}


	getSinavList() {
		this.sinavService.getSinavList().subscribe(data => {
			this.sinavList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.sinavAddForm.valid) {
			this.sinav = Object.assign({}, this.sinavAddForm.value)

			if (this.sinav.id == 0)
				this.addSinav();
			else
				this.updateSinav();
		}

	}

	addSinav(){

		this.sinavService.addSinav(this.sinav).subscribe(data => {
			this.getSinavList();
			this.sinav = new Sinav();
			jQuery('#sinav').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.sinavAddForm);

		})

	}

	updateSinav(){

		this.sinavService.updateSinav(this.sinav).subscribe(data => {

			var index=this.sinavList.findIndex(x=>x.id==this.sinav.id);
			this.sinavList[index]=this.sinav;
			this.dataSource = new MatTableDataSource(this.sinavList);
            this.configDataTable();
			this.sinav = new Sinav();
			jQuery('#sinav').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.sinavAddForm);

		})

	}

	createSinavAddForm() {
		this.sinavAddForm = this.formBuilder.group({		
			id : [0],
createdDate : [null, Validators.required],
updatedDate : [null, Validators.required],
deletedDate : [null, Validators.required],
dersAcmaId : [0, Validators.required],
sinavTuruId : [0, Validators.required],
derslikId : [0, Validators.required],
ogrElmID : [0, Validators.required],
etkiOrani : [0, Validators.required],
sinavTarihi : [null, Validators.required]
		})
	}

	deleteSinav(sinavId:number){
		this.sinavService.deleteSinav(sinavId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.sinavList=this.sinavList.filter(x=> x.id!=sinavId);
			this.dataSource = new MatTableDataSource(this.sinavList);
			this.configDataTable();
		})
	}

	getSinavById(sinavId:number){
		this.clearFormGroup(this.sinavAddForm);
		this.sinavService.getSinavById(sinavId).subscribe(data=>{
			this.sinav=data;
			this.sinavAddForm.patchValue(data);
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
