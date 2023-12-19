import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/components/admin/login/services/auth.service';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LookUpService } from 'app/core/services/lookUp.service';
import { DersAcma } from './models/DersAcma';
import { DersAcmaService } from './services/DersAcma.service';

declare var jQuery: any;

@Component({
	selector: 'app-dersAcma',
	templateUrl: './dersAcma.component.html',
	styleUrls: ['./dersAcma.component.scss']
})
export class DersAcmaComponent implements AfterViewInit, OnInit {

	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['id', 'createdDate', 'updatedDate', 'deletedDate', 'akademikYilId', 'akademikDonemId', 'mufredatId', 'ogrElmId', 'kontenjan', 'update', 'delete'];

	dersAcmaList: DersAcma[];
	dersAcma: DersAcma = new DersAcma();

	dersAcmaAddForm: FormGroup;


	dersAcmaId: number;

	constructor(private dersAcmaService: DersAcmaService, private lookupService: LookUpService, private alertifyService: AlertifyService, private formBuilder: FormBuilder, private authService: AuthService) { }

	ngAfterViewInit(): void {
		this.getDersAcmaList();
	}

	ngOnInit() {

		this.createDersAcmaAddForm();
	}


	getDersAcmaList() {
		this.dersAcmaService.getDersAcmaList().subscribe(data => {
			this.dersAcmaList = data;
			this.dataSource = new MatTableDataSource(data);
			this.configDataTable();
		});
	}

	save() {

		if (this.dersAcmaAddForm.valid) {
			this.dersAcma = Object.assign({}, this.dersAcmaAddForm.value)

			if (this.dersAcma.id == 0)
				this.addDersAcma();
			else
				this.updateDersAcma();
		}

	}

	addDersAcma() {

		this.dersAcmaService.addDersAcma(this.dersAcma).subscribe(data => {
			this.getDersAcmaList();
			this.dersAcma = new DersAcma();
			jQuery('#dersacma').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.dersAcmaAddForm);

		})

	}

	updateDersAcma() {

		this.dersAcmaService.updateDersAcma(this.dersAcma).subscribe(data => {

			var index = this.dersAcmaList.findIndex(x => x.id == this.dersAcma.id);
			this.dersAcmaList[index] = this.dersAcma;
			this.dataSource = new MatTableDataSource(this.dersAcmaList);
			this.configDataTable();
			this.dersAcma = new DersAcma();
			jQuery('#dersacma').modal('hide');
			this.alertifyService.success(data);
			this.clearFormGroup(this.dersAcmaAddForm);

		})

	}

	createDersAcmaAddForm() {
		this.dersAcmaAddForm = this.formBuilder.group({
			id: [0],
			akademikYilId: [0, Validators.required],
			akademikDonemId: [0, Validators.required],
			mufredatId: [0, Validators.required],
			ogrElmId: [0, Validators.required],
			kontenjan: [0, Validators.required]
		})
	}

	deleteDersAcma(dersAcmaId: number) {
		this.dersAcmaService.deleteDersAcma(dersAcmaId).subscribe(data => {
			this.alertifyService.success(data.toString());
			this.dersAcmaList = this.dersAcmaList.filter(x => x.id != dersAcmaId);
			this.dataSource = new MatTableDataSource(this.dersAcmaList);
			this.configDataTable();
		})
	}

	getDersAcmaById(dersAcmaId: number) {
		this.clearFormGroup(this.dersAcmaAddForm);
		this.dersAcmaService.getDersAcmaById(dersAcmaId).subscribe(data => {
			this.dersAcma = data;
			this.dersAcmaAddForm.patchValue(data);
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

	checkClaim(claim: string): boolean {
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
