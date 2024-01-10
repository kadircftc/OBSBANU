import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OzlukBilgileriService } from '../ozluk-bilgileri/services/ozlukBilgileri.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../admin/login/services/auth.service';
import { AlertifyService } from 'app/core/services/alertify.service';

@Component({
  selector: 'app-ogrenci-ders-alma',
  templateUrl: './ogrenci-ders-alma.component.html',
  styleUrls: ['./ogrenci-ders-alma.component.css']
})
export class OgrenciDersAlmaComponent implements OnInit ,AfterViewInit {

  dataSource: MatTableDataSource<any>;
  dataSourceSelected: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[] = ['dersKodu','dersAdi', 'secmeliZorunlu', 'kredi', 'ects', 'sinif','delete'];


  constructor(private ogrenciService : OzlukBilgileriService, private localStorageService: LocalStorageService,private authService:AuthService, private alertifyService: AlertifyService) { }

  acilanDerslerList: OgrenciAcilanDerslerDto[];
  secilenDersList: OgrenciAcilanDerslerDto[]=[];
  bolumAdi : string;
  ogrenciSinifi: string;
  dersSinifi: string;
  eklenenDers:OgrenciAcilanDerslerDto;
  cikarilanDers: OgrenciAcilanDerslerDto;
  eklenenDersIds: number[] = []

  // ngOnInit(): void {
  //   this.getAcilmisDersler();
    
  // }
  ngOnInit():void{
  }
ngAfterViewInit(): void {
  this.getAcilmisDerslerList();
}

  getAcilmisDerslerList() {
		this.ogrenciService.getAcilmisDerslerList(this.localStorageService.getUserId()).subscribe(data => {
			this.acilanDerslerList = data.filter(d => d.ogrenciSinifi == d.dersVerildigiSinif);
			this.dataSource = new MatTableDataSource(this.acilanDerslerList);
			this.configDataTable();
		});
	}

	getSecilmisDerslerList() {
		this.dataSourceSelected = new MatTableDataSource(this.secilenDersList);
		this.configDataTable();
	}

	dersiSec(id:number){
		var index =this.acilanDerslerList.findIndex(a=>a.dersAcmaId==id)
		this.eklenenDers=this.acilanDerslerList[index];
		this.secilenDersList.push(this.eklenenDers);
		this.acilanDerslerList=this.acilanDerslerList.filter(a=>a.dersAcmaId!=this.eklenenDers.dersAcmaId);
		this.dataSource = new MatTableDataSource(this.acilanDerslerList);
		this.configDataTable();
		this.getSecilmisDerslerList();
	}

	dersiCikar(id:number){
		var index =this.secilenDersList.findIndex(a=>a.dersAcmaId==id)
		this.cikarilanDers=this.secilenDersList[index];
		this.acilanDerslerList.push(this.cikarilanDers);
		this.secilenDersList=this.secilenDersList.filter(a=>a.dersAcmaId!=this.cikarilanDers.dersAcmaId);
		this.dataSourceSelected = new MatTableDataSource(this.secilenDersList);
		this.configDataTable();
	}

	dersKaydiniOnayla(){
		var ids = this.secilenDersList.map(function(x){
			return x.dersAcmaId as number;
		});
		this.ogrenciService.saveAlinanDersler(this.localStorageService.getUserId(), 1,ids).subscribe(
			(x) => {
			  this.alertifyService.success(x);
			},
			(error) => {
			  this.alertifyService.error(error.error);
			}
		  );
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
