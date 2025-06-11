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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, CommonModule, CardModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputGroupAddonModule,
    InputGroupModule, InputTextModule, ToolbarModule, TableModule, CheckboxModule, RippleModule, LoadingComponent, IconFieldModule, InputIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  isLoadingAllProducts: boolean = true;

  allProducts!: any;

  searchValue: string | undefined;

  productCreateForm!: FormGroup;
  productEditForm!: FormGroup;

  targetToDelete!: any;

  visibleInsertProductDialog: boolean = false;
  visibleEditProductDialog: boolean = false;
  visibleDeleteProductDialog: boolean = false;

  async ngOnInit() {
    this.allProducts = [
      { id: 1, nome: 'Paracetamol 500mg', descricao: 'Analgésico e antitérmico', fabricante: 'MedPharma', classificacao: 'Analgésico', especificacao: 'Comprimido' },
      { id: 2, nome: 'Amoxicilina 875mg + Clavulanato', descricao: 'Antibiótico de amplo espectro', fabricante: 'BioGen', classificacao: 'Antibiótico', especificacao: 'Comprimido Revestido' },
      { id: 3, nome: 'Ibuprofeno 400mg', descricao: 'Anti-inflamatório não esteroidal (AINE)', fabricante: 'FarmaPlus', classificacao: 'Anti-inflamatório', especificacao: 'Comprimido' },
      { id: 4, nome: 'Losartana 50mg', descricao: 'Anti-hipertensivo - bloqueador de receptor da angiotensina II', fabricante: 'CardioLife', classificacao: 'Anti-hipertensivo', especificacao: 'Comprimido' },
      { id: 5, nome: 'Sinvastatina 20mg', descricao: 'Redução de colesterol LDL', fabricante: 'ColestMed', classificacao: 'Hipolipemiante', especificacao: 'Comprimido Revestido' },
      { id: 6, nome: 'Metformina 850mg', descricao: 'Controle glicêmico em diabéticos tipo 2', fabricante: 'GlycoBio', classificacao: 'Antidiabético oral', especificacao: 'Comprimido' },
      { id: 7, nome: 'Omeprazol 20mg', descricao: 'Inibidor de bomba de prótons - tratamento de úlcera', fabricante: 'GastroPharm', classificacao: 'Antiulceroso', especificacao: 'Cápsula' },
      { id: 8, nome: 'Levotiroxina 100mcg', descricao: 'Reposição hormonal para hipotireoidismo', fabricante: 'HormoLabs', classificacao: 'Hormonal', especificacao: 'Comprimido' },
      { id: 9, nome: 'Clonazepam 2mg', descricao: 'Ansiolítico e anticonvulsivante', fabricante: 'NeuroPlus', classificacao: 'Benzodiazepínico', especificacao: 'Comprimido Sublingual' },
      { id: 10, nome: 'Dipirona Sódica 1g', descricao: 'Analgésico e antitérmico potente', fabricante: 'PainAway', classificacao: 'Analgésico', especificacao: 'Comprimido' },
      { id: 11, nome: 'Salbutamol Spray', descricao: 'Broncodilatador de ação rápida', fabricante: 'RespiraMed', classificacao: 'Beta2-agonista', especificacao: 'Aerossol dosimetrado' },
      { id: 12, nome: 'Cefalexina 500mg', descricao: 'Antibiótico para infecções respiratórias e urinárias', fabricante: 'InfectoPharma', classificacao: 'Antibiótico', especificacao: 'Cápsula' },
      { id: 13, nome: 'Sertralina 50mg', descricao: 'Inibidor seletivo da recaptação de serotonina (ISRS)', fabricante: 'NeuroBalance', classificacao: 'Antidepressivo', especificacao: 'Comprimido' },
      { id: 14, nome: 'Ranitidina 150mg', descricao: 'Bloqueador H2 para refluxo gástrico', fabricante: 'GastroCare', classificacao: 'Antiácido', especificacao: 'Comprimido Revestido' },
      { id: 15, nome: 'Lorazepam 1mg', descricao: 'Ansiolítico de ação rápida', fabricante: 'Tranquilix', classificacao: 'Ansiolítico', especificacao: 'Comprimido Sublingual' },
      { id: 16, nome: 'Prednisona 20mg', descricao: 'Corticóide sistêmico', fabricante: 'ImunoPharma', classificacao: 'Corticosteroide', especificacao: 'Comprimido' },
      { id: 17, nome: 'Furosemida 40mg', descricao: 'Diurético de alça - controle de edema', fabricante: 'CardioMed', classificacao: 'Diurético', especificacao: 'Comprimido' },
      { id: 18, nome: 'Vitamina D3 1000UI', descricao: 'Suplemento vitamínico para ossos e imunidade', fabricante: 'NutriVita', classificacao: 'Suplemento', especificacao: 'Cápsula mole' },
      { id: 19, nome: 'Ácido Fólico 5mg', descricao: 'Essencial na gravidez e prevenção de anemia megaloblástica', fabricante: 'GestarPharma', classificacao: 'Vitamina', especificacao: 'Comprimido' },
      { id: 20, nome: 'Insulina NPH', descricao: 'Insulina de ação intermediária', fabricante: 'DiabetMed', classificacao: 'Hormonal', especificacao: 'Suspensão injetável' },
      { id: 21, nome: 'Loratadina 10mg', descricao: 'Antialérgico para rinite e urticária', fabricante: 'AllergoPharm', classificacao: 'Anti-histamínico', especificacao: 'Comprimido' },
      { id: 22, nome: 'Cetoconazol Creme', descricao: 'Antifúngico tópico', fabricante: 'DermaFarma', classificacao: 'Antifúngico', especificacao: 'Creme dermatológico' },
      { id: 23, nome: 'Isotretinoína 20mg', descricao: 'Tratamento de acne grave', fabricante: 'DermaControl', classificacao: 'Retinoide', especificacao: 'Cápsula mole' },
      { id: 24, nome: 'Hidroclorotiazida 25mg', descricao: 'Diurético tiazídico', fabricante: 'CardioPlus', classificacao: 'Anti-hipertensivo', especificacao: 'Comprimido' },
      { id: 25, nome: 'Clopidogrel 75mg', descricao: 'Antiagregante plaquetário', fabricante: 'ThromboMed', classificacao: 'Antitrombótico', especificacao: 'Comprimido Revestido' },
      { id: 26, nome: 'Escitalopram 10mg', descricao: 'ISRS para depressão e ansiedade', fabricante: 'NeuroZen', classificacao: 'Antidepressivo', especificacao: 'Comprimido' },
      { id: 27, nome: 'Fluconazol 150mg', descricao: 'Antifúngico sistêmico', fabricante: 'MicoPharm', classificacao: 'Antifúngico', especificacao: 'Cápsula' },
      { id: 28, nome: 'Azitromicina 500mg', descricao: 'Antibiótico macrolídeo', fabricante: 'ZydoPharma', classificacao: 'Antibiótico', especificacao: 'Comprimido Revestido' },
      { id: 29, nome: 'Enalapril 10mg', descricao: 'IECA para hipertensão e insuficiência cardíaca', fabricante: 'VasculoCare', classificacao: 'Anti-hipertensivo', especificacao: 'Comprimido' },
      { id: 30, nome: 'Buscopan Composto', descricao: 'Espasmolítico e analgésico para cólicas', fabricante: 'GastroAlívio', classificacao: 'Antiespasmódico', especificacao: 'Comprimido Revestido' }
    ];

    this.productCreateForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      descricao: new FormControl(''),
      fabricante: new FormControl(''),
      classificacao: new FormControl(''),
      especificacao: new FormControl('')
    });

    this.productEditForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      descricao: new FormControl(''),
      fabricante: new FormControl(''),
      classificacao: new FormControl(''),
      especificacao: new FormControl('')
    });

    this.isLoadingAllProducts = false;
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

  openInsertProductDialog(){
    this.visibleInsertProductDialog = true;
  }

  openEditProductDialog(item: any){
    this.productEditForm.setValue({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      fabricante: item.fabricante,
      classificacao: item.classificacao,
      especificacao: item.especificacao,
    })

    this.visibleEditProductDialog = true;
  }

  openDeleteProductDialog(item: any){
    this.targetToDelete = item;

    this.visibleDeleteProductDialog = true;
  }

  closeInsertProductDialog(){
    this.visibleInsertProductDialog = false;
  }

  closeEditProductDialog(){
    this.visibleEditProductDialog = false;
  }

  closeDeleteProductDialog(){
    this.visibleDeleteProductDialog = false;
  }

  createProduct(){
    this.visibleInsertProductDialog = false;

    this.isLoadingAllProducts = true;

    this.productCreateForm.patchValue({id: this.allProducts[this.allProducts.length-1].id + 1});

    console.log(this.productCreateForm.value);
    this.allProducts = [...this.allProducts, {...this.productCreateForm.value}];

    this.productCreateForm.setValue({
      id: '',
      nome: '',
      descricao: '',
      fabricante: '',
      classificacao: '',
      especificacao: ''
    });

    this.isLoadingAllProducts = false;
  }

  updatetProduct(){
    this.isLoadingAllProducts = true;

    this.allProducts.map((item: any) => {
      if (item.id == this.productEditForm.value.id){
        item.id = this.productEditForm.value.id,
        item.nome = this.productEditForm.value.nome,
        item.descricao = this.productEditForm.value.descricao,
        item.fabricante = this.productEditForm.value.fabricante,
        item.classificacao = this.productEditForm.value.classificacao,
        item.especificacao = this.productEditForm.value.especificacao
      }
    });

    this.visibleEditProductDialog = false;

    this.productEditForm.setValue({
      id: '',
      nome: '',
      descricao: '',
      fabricante: '',
      classificacao: '',
      especificacao: ''
    });

    this.isLoadingAllProducts = false;
  }

  deleteProduct(){
    this.isLoadingAllProducts = true;

    this.allProducts = this.allProducts.filter((item: any) => item.id != this.targetToDelete.id);

    this.visibleDeleteProductDialog = false;

    this.isLoadingAllProducts = false;
  }
}
