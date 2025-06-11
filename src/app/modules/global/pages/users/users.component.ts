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
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, CommonModule, CardModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, FloatLabelModule, InputGroupAddonModule,
    InputGroupModule, InputTextModule, ToolbarModule, TableModule, CheckboxModule, RippleModule, LoadingComponent, IconFieldModule, InputIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  isLoadingAllUsers: boolean = true;

  allUsers!: any;

  searchValue: string | undefined;

  userCreateForm!: FormGroup;
  userEditForm!: FormGroup;

  targetToDelete!: any;

  visibleInsertUserDialog: boolean = false;
  visibleEditUserDialog: boolean = false;
  visibleDeleteUserDialog: boolean = false;

  async ngOnInit() {
    this.allUsers = [
      { id: 1, nome: 'Ana', sobrenome: 'Silva', email: 'ana.silva@email.com' },
      { id: 2, nome: 'Bruno', sobrenome: 'Souza', email: 'bruno.souza@email.com' },
      { id: 3, nome: 'Carla', sobrenome: 'Ferreira', email: 'carla.ferreira@email.com' },
      { id: 4, nome: 'Daniel', sobrenome: 'Oliveira', email: 'daniel.oliveira@email.com' },
      { id: 5, nome: 'Eduarda', sobrenome: 'Mendes', email: 'eduarda.mendes@email.com' },
      { id: 6, nome: 'Felipe', sobrenome: 'Lima', email: 'felipe.lima@email.com' },
      { id: 7, nome: 'Gabriel', sobrenome: 'Costa', email: 'gabriel.costa@email.com' },
      { id: 8, nome: 'Helena', sobrenome: 'Martins', email: 'helena.martins@email.com' },
      { id: 9, nome: 'Igor', sobrenome: 'Ramos', email: 'igor.ramos@email.com' },
      { id: 10, nome: 'Julia', sobrenome: 'Pereira', email: 'julia.pereira@email.com' },
      { id: 11, nome: 'Kleber', sobrenome: 'Barros', email: 'kleber.barros@email.com' },
      { id: 12, nome: 'Laura', sobrenome: 'Nascimento', email: 'laura.nascimento@email.com' },
      { id: 13, nome: 'Marcos', sobrenome: 'Azevedo', email: 'marcos.azevedo@email.com' },
      { id: 14, nome: 'Natalia', sobrenome: 'Carvalho', email: 'natalia.carvalho@email.com' },
      { id: 15, nome: 'Otavio', sobrenome: 'Farias', email: 'otavio.farias@email.com' },
      { id: 16, nome: 'Patricia', sobrenome: 'Teixeira', email: 'patricia.teixeira@email.com' },
      { id: 17, nome: 'Rafael', sobrenome: 'Monteiro', email: 'rafael.monteiro@email.com' },
      { id: 18, nome: 'Sabrina', sobrenome: 'Rocha', email: 'sabrina.rocha@email.com' },
      { id: 19, nome: 'Tiago', sobrenome: 'Campos', email: 'tiago.campos@email.com' },
      { id: 20, nome: 'Vanessa', sobrenome: 'Almeida', email: 'vanessa.almeida@email.com' },
      { id: 21, nome: 'William', sobrenome: 'Duarte', email: 'william.duarte@email.com' },
      { id: 22, nome: 'Xavier', sobrenome: 'Vieira', email: 'xavier.vieira@email.com' },
      { id: 23, nome: 'Yasmin', sobrenome: 'Reis', email: 'yasmin.reis@email.com' },
      { id: 24, nome: 'Zeca', sobrenome: 'Gomes', email: 'zeca.gomes@email.com' },
      { id: 25, nome: 'Alice', sobrenome: 'Santos', email: 'alice.santos@email.com' },
      { id: 26, nome: 'Breno', sobrenome: 'Moura', email: 'breno.moura@email.com' },
      { id: 27, nome: 'Camila', sobrenome: 'Lopes', email: 'camila.lopes@email.com' },
      { id: 28, nome: 'Diego', sobrenome: 'Ribeiro', email: 'diego.ribeiro@email.com' },
      { id: 29, nome: 'Emanuelle', sobrenome: 'Castro', email: 'emanuelle.castro@email.com' },
      { id: 30, nome: 'Fabrício', sobrenome: 'Araújo', email: 'fabricio.araujo@email.com' }
    ];

    this.userCreateForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      email: new FormControl('')
    });

    this.userEditForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      email: new FormControl('')
    });

    this.isLoadingAllUsers = false;
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

    openInsertUserDialog(){
    this.visibleInsertUserDialog = true;
  }

  openEditUserDialog(item: any){
    this.userEditForm.setValue({
      id: item.id,
      nome: item.nome,
      sobrenome: item.sobrenome,
      email: item.email,
    })

    this.visibleEditUserDialog = true;
  }

  openDeleteUserDialog(item: any){
    this.targetToDelete = item;

    this.visibleDeleteUserDialog = true;
  }

  closeInsertUserDialog(){
    this.visibleInsertUserDialog = false;
  }

  closeEditUserDialog(){
    this.visibleEditUserDialog = false;
  }

  closeDeleteUserDialog(){
    this.visibleDeleteUserDialog = false;
  }

  createUser(){
    this.visibleInsertUserDialog = false;

    this.isLoadingAllUsers = true;

    this.userCreateForm.patchValue({id: this.allUsers[this.allUsers.length-1].id + 1});

    console.log(this.userCreateForm.value);
    this.allUsers = [...this.allUsers, {...this.userCreateForm.value}];

    this.userCreateForm.setValue({
      id: '',
      nome: '',
      sobrenome: '',
      email: ''
    });

    this.isLoadingAllUsers = false;
  }

  updatetUser(){
    this.isLoadingAllUsers = true;

    this.allUsers.map((item: any) => {
      if (item.id == this.userEditForm.value.id){
        item.id = this.userEditForm.value.id,
        item.nome = this.userEditForm.value.nome,
        item.sobrenome = this.userEditForm.value.sobrenome,
        item.email = this.userEditForm.value.email
      }
    });

    this.visibleEditUserDialog = false;

    this.userEditForm.setValue({
      id: '',
      nome: '',
      sobrenome: '',
      email: ''
    });

    this.isLoadingAllUsers = false;
  }

  deleteUser(){
    this.isLoadingAllUsers = true;

    this.allUsers = this.allUsers.filter((item: any) => item.id != this.targetToDelete.id);

    this.visibleDeleteUserDialog = false;

    this.isLoadingAllUsers = false;
  }
}
