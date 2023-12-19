import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/components/admin/login/services/auth.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { DersHavuzu } from './models/DersHavuzu';
import { DersHavuzuService } from './services/DersHavuzu.service';

declare var jQuery: any;

@Component({
	selector: 'app-dersHavuzu',
	templateUrl: './dersHavuzu.component.html',
	styleUrls: ['./dersHavuzu.component.scss']
})
export class DersHavuzuComponent implements AfterViewInit, OnInit {
	
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id','createdDate','updatedDate','deletedDate','dersDiliId','dersSeviyesiId','dersturuId','dersKodu','dersAdi','teorik','uygulama','kredi','eCTS', 'update','delete'];

	dersHavuzuList:DersHavuzu[];
	dersHavuzu:DersHavuzu=new DersHavuzu();

	dersHavuzuAddForm: FormGroup;


	dersHavuzuId:number;

	constructor(private dersHavuzuService:DersHavuzuService, private lookupService:LookUpService,private alertifyService:AlertifyService,private formBuilder: FormBuilder, private authService:AuthService) { }

    ngAfterViewInit(): void {
        this.getDersHavuzuList();
    }

	ngOnInit() {

		this.createDersHavuzuAddForm();
	}


	getDersHavuzuList() {
		this.dersHavuzuService.getDersHavuzuList().subscribe(data => {
			this.dersHavuzuList = data;
			this.dataSource = new MatTableDataSource(data);
            this.configDataTable();
		});
	}

	save(){

		if (this.dersHavuzuAddForm.valid) {
			this.dersHavuzu = Object.assign({}, this.dersHavuzuAddForm.value)

			if (this.dersHavuzu.id == 0)
				this.addDersHavuzu();
			else
				this.updateDersHavuzu();
		}

	}

	addDersHavuzu(){

		this.dersHavuzuService.addDersHavuzu(this.dersHavuzu).subscribe(data => {
			this.getDersHavuzuList();
			this.dersHavuzu = new DersHavuzu();
			jQuery('#dershavuzu').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.dersHavuzuAddForm);

		})

	}

	updateDersHavuzu(){

		this.dersHavuzuService.updateDersHavuzu(this.dersHavuzu).subscribe(data => {

			var index=this.dersHavuzuList.findIndex(x=>x.id==this.dersHavuzu.id);
			this.dersHavuzuList[index]=this.dersHavuzu;
			this.dataSource = new MatTableDataSource(this.dersHavuzuList);
            this.configDataTable();
			this.dersHavuzu = new DersHavuzu();
			jQuery('#dershavuzu').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.dersHavuzuAddForm);

		})

	}

	createDersHavuzuAddForm() {
		this.dersHavuzuAddForm = this.formBuilder.group({		
			id : [0],
dersDiliId : [0, Validators.required],
dersSeviyesiId : [0, Validators.required],
dersturuId : [0, Validators.required],
dersKodu : ["", Validators.required],
dersAdi : ["", Validators.required],
teorik : [0, Validators.required],
uygulama : [0, Validators.required],
kredi : [0, Validators.required],
eCTS : [0, Validators.required]
		})
	}

	deleteDersHavuzu(dersHavuzuId:number){
		this.dersHavuzuService.deleteDersHavuzu(dersHavuzuId).subscribe(data=>{
			this.alertifyService.success(data.toString());
			this.dersHavuzuList=this.dersHavuzuList.filter(x=> x.id!=dersHavuzuId);
			this.dataSource = new MatTableDataSource(this.dersHavuzuList);
			this.configDataTable();
		})
	}

	getDersHavuzuById(dersHavuzuId:number){
		this.clearFormGroup(this.dersHavuzuAddForm);
		this.dersHavuzuService.getDersHavuzuById(dersHavuzuId).subscribe(data=>{
			this.dersHavuzu=data;
			this.dersHavuzuAddForm.patchValue(data);
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
