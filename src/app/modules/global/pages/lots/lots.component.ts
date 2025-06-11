import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { Table, TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { LoadingComponent } from '../../components/loading/loading.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-lots',
  standalone: true,
  imports: [HeaderComponent, CommonModule, CardModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputGroupAddonModule,
    InputGroupModule, InputTextModule, ToolbarModule, TableModule, CheckboxModule, RippleModule, LoadingComponent, IconFieldModule, InputIconModule, DatePickerModule, FormsModule, FluidModule],
  templateUrl: './lots.component.html',
  styleUrl: './lots.component.scss'
})
export class LotsComponent implements OnInit{
  isLoadingAllLots: boolean = true;

  allLots!: any;

  searchValue: string | undefined;

  lotsCreateForm!: FormGroup;
  lotsEditForm!: FormGroup;

  targetToDelete!: any;

  visibleInsertLotsDialog: boolean = false;
  visibleEditLotsDialog: boolean = false;
  visibleDeleteLotsDialog: boolean = false;

  async ngOnInit() {
    this.allLots = [
      { id: 1, codigoBarra: '7891234560011', dataFabricacao: '2024-01-15', dataValidade: '2026-01-15', quantidade: 100, fornecedor: 'PharmaSupreme', produtoId: 1 },
      { id: 2, codigoBarra: '7891234560012', dataFabricacao: '2023-12-10', dataValidade: '2025-12-10', quantidade: 80, fornecedor: 'MediStock', produtoId: 2 },
      { id: 3, codigoBarra: '7891234560013', dataFabricacao: '2024-03-20', dataValidade: '2026-03-20', quantidade: 150, fornecedor: 'Distribuidora Vida', produtoId: 3 },
      { id: 4, codigoBarra: '7891234560014', dataFabricacao: '2023-10-05', dataValidade: '2025-10-05', quantidade: 60, fornecedor: 'BioDistribui', produtoId: 4 },
      { id: 5, codigoBarra: '7891234560015', dataFabricacao: '2024-05-01', dataValidade: '2026-05-01', quantidade: 120, fornecedor: 'SaudeMax', produtoId: 5 },
      { id: 6, codigoBarra: '7891234560016', dataFabricacao: '2024-04-18', dataValidade: '2026-04-18', quantidade: 200, fornecedor: 'FarmaDistribui', produtoId: 6 },
      { id: 7, codigoBarra: '7891234560017', dataFabricacao: '2024-02-28', dataValidade: '2026-02-28', quantidade: 90, fornecedor: 'PharmaGlobal', produtoId: 7 },
      { id: 8, codigoBarra: '7891234560018', dataFabricacao: '2024-03-12', dataValidade: '2026-03-12', quantidade: 75, fornecedor: 'ClinMed', produtoId: 8 },
      { id: 9, codigoBarra: '7891234560019', dataFabricacao: '2024-01-07', dataValidade: '2026-01-07', quantidade: 110, fornecedor: 'UniFarma', produtoId: 9 },
      { id: 10, codigoBarra: '7891234560020', dataFabricacao: '2023-11-25', dataValidade: '2025-11-25', quantidade: 130, fornecedor: 'MaxDistribuidora', produtoId: 10 },
      { id: 11, codigoBarra: '7891234560021', dataFabricacao: '2024-06-01', dataValidade: '2026-06-01', quantidade: 60, fornecedor: 'VidaPharma', produtoId: 11 },
      { id: 12, codigoBarra: '7891234560022', dataFabricacao: '2023-09-15', dataValidade: '2025-09-15', quantidade: 85, fornecedor: 'GenPharma', produtoId: 12 },
      { id: 13, codigoBarra: '7891234560023', dataFabricacao: '2024-02-01', dataValidade: '2026-02-01', quantidade: 45, fornecedor: 'BioSaude', produtoId: 13 },
      { id: 14, codigoBarra: '7891234560024', dataFabricacao: '2023-10-30', dataValidade: '2025-10-30', quantidade: 100, fornecedor: 'MediPlus', produtoId: 14 },
      { id: 15, codigoBarra: '7891234560025', dataFabricacao: '2024-04-10', dataValidade: '2026-04-10', quantidade: 70, fornecedor: 'DistribuiFarma', produtoId: 15 },
      { id: 16, codigoBarra: '7891234560026', dataFabricacao: '2024-01-20', dataValidade: '2026-01-20', quantidade: 200, fornecedor: 'Farmacorp', produtoId: 16 },
      { id: 17, codigoBarra: '7891234560027', dataFabricacao: '2024-02-14', dataValidade: '2026-02-14', quantidade: 50, fornecedor: 'GlobalMed', produtoId: 17 },
      { id: 18, codigoBarra: '7891234560028', dataFabricacao: '2023-12-01', dataValidade: '2025-12-01', quantidade: 65, fornecedor: 'SaudeTotal', produtoId: 18 },
      { id: 19, codigoBarra: '7891234560029', dataFabricacao: '2024-03-05', dataValidade: '2026-03-05', quantidade: 140, fornecedor: 'BemEstar', produtoId: 19 },
      { id: 20, codigoBarra: '7891234560030', dataFabricacao: '2024-05-10', dataValidade: '2026-05-10', quantidade: 95, fornecedor: 'SaudeExpress', produtoId: 20 },
      { id: 21, codigoBarra: '7891234560031', dataFabricacao: '2024-01-22', dataValidade: '2026-01-22', quantidade: 100, fornecedor: 'FarmaNova', produtoId: 21 },
      { id: 22, codigoBarra: '7891234560032', dataFabricacao: '2023-08-30', dataValidade: '2025-08-30', quantidade: 80, fornecedor: 'DistribuiBrasil', produtoId: 22 },
      { id: 23, codigoBarra: '7891234560033', dataFabricacao: '2024-02-17', dataValidade: '2026-02-17', quantidade: 120, fornecedor: 'PharmaGo', produtoId: 23 },
      { id: 24, codigoBarra: '7891234560034', dataFabricacao: '2023-09-28', dataValidade: '2025-09-28', quantidade: 130, fornecedor: 'FarmaTop', produtoId: 24 },
      { id: 25, codigoBarra: '7891234560035', dataFabricacao: '2024-03-15', dataValidade: '2026-03-15', quantidade: 70, fornecedor: 'BioAtiva', produtoId: 25 },
      { id: 26, codigoBarra: '7891234560036', dataFabricacao: '2024-04-25', dataValidade: '2026-04-25', quantidade: 150, fornecedor: 'VitaDistribui', produtoId: 26 },
      { id: 27, codigoBarra: '7891234560037', dataFabricacao: '2023-11-11', dataValidade: '2025-11-11', quantidade: 60, fornecedor: 'SaudePharma', produtoId: 27 },
      { id: 28, codigoBarra: '7891234560038', dataFabricacao: '2024-01-05', dataValidade: '2026-01-05', quantidade: 90, fornecedor: 'FarmaMed', produtoId: 28 },
      { id: 29, codigoBarra: '7891234560039', dataFabricacao: '2023-12-22', dataValidade: '2025-12-22', quantidade: 110, fornecedor: 'BioDistribuidor', produtoId: 29 },
      { id: 30, codigoBarra: '7891234560040', dataFabricacao: '2024-02-08', dataValidade: '2026-02-08', quantidade: 125, fornecedor: 'NovaSaude', produtoId: 30 }
    ];

    this.lotsCreateForm = new FormGroup({
      id: new FormControl(''),
      codigoBarra: new FormControl(''),
      dataFabricacao: new FormControl(''),
      dataValidade: new FormControl(''),
      quantidade: new FormControl(''),
      fornecedor: new FormControl(''),
      produtoId: new FormControl(''),
    });

    this.lotsEditForm = new FormGroup({
      id: new FormControl(''),
      codigoBarra: new FormControl(''),
      dataFabricacao: new FormControl(''),
      dataValidade: new FormControl(''),
      quantidade: new FormControl(''),
      fornecedor: new FormControl(''),
      produtoId: new FormControl('')
    });

    this.isLoadingAllLots = false;
  }

  // Método de filtro:
  filterGlobal(event: Event, table: Table): void {
    const inputElement = event.target as HTMLInputElement; // Fazendo a verificação de tipo
    const value = inputElement?.value || ''; // Obtendo o valor do input

    // Chama o método de filtro
    table.filterGlobal(value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

    openInsertLotsDialog(){
    this.visibleInsertLotsDialog = true;
  }

  openEditLotsDialog(item: any){
    this.lotsEditForm.setValue({
      id: item.id,
      codigoBarra: item.codigoBarra,
      dataFabricacao: new Date(item.dataFabricacao),
      dataValidade: new Date(item.dataValidade),
      quantidade: item.quantidade,
      fornecedor: item.fornecedor,
      produtoId: item.produtoId
    })

    this.visibleEditLotsDialog = true;
  }

  openDeleteLotsDialog(item: any){
    this.targetToDelete = item;

    this.visibleDeleteLotsDialog = true;
  }

  closeInsertLotsDialog(){
    this.visibleInsertLotsDialog = false;
  }

  closeEditLotsDialog(){
    this.visibleEditLotsDialog = false;
  }

  closeDeleteLotsDialog(){
    this.visibleDeleteLotsDialog = false;
  }

  createLot(){
    this.visibleInsertLotsDialog = false;

    this.isLoadingAllLots = true;

    this.lotsCreateForm.patchValue({id: this.allLots[this.allLots.length-1].id + 1});

    console.log(this.lotsCreateForm.value);
    this.allLots = [...this.allLots, {...this.lotsCreateForm.value}];

    this.lotsCreateForm.setValue({
      id: '',
      codigoBarra: '',
      dataFabricacao: '',
      dataValidade: '',
      quantidade: '',
      fornecedor: '',
      produtoId: ''
    });

    this.isLoadingAllLots = false;
  }

  updatetLot(){
    this.isLoadingAllLots = true;

    this.allLots.map((item: any) => {
      if (item.id == this.lotsEditForm.value.id){
        item.id = this.lotsEditForm.value.id,
        item.codigoBarra = this.lotsEditForm.value.codigoBarra,
        item.dataFabricacao = this.lotsEditForm.value.dataFabricacao,
        item.dataValidade = this.lotsEditForm.value.dataValidade,
        item.quantidade = this.lotsEditForm.value.quantidade,
        item.fornecedor = this.lotsEditForm.value.fornecedor,
        item.produtoId = this.lotsEditForm.value.produtoId
      }
    });

    this.visibleEditLotsDialog = false;

    this.lotsEditForm.setValue({
      id: '',
      codigoBarra: '',
      dataFabricacao: '',
      dataValidade: '',
      quantidade: '',
      fornecedor: '',
      produtoId: ''
    });

    this.isLoadingAllLots = false;
  }

  deleteLot(){
    this.isLoadingAllLots = true;

    this.allLots = this.allLots.filter((item: any) => item.id != this.targetToDelete.id);

    this.visibleDeleteLotsDialog = false;

    this.isLoadingAllLots = false;
  }
}
