import { Component, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import {
  TableColumn,
  UiTableComponent,
} from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

interface Customer {
  id: number;
  name: string;
  lastname: string;
  dob: Date;
  gender: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    UiTableComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  tableColumns: TableColumn<Customer>[] = [];
  isLoadingCustomers = true;
  colActions = viewChild.required<TemplateRef<any>>('colActions');
  colName = viewChild.required<TemplateRef<any>>('colName');
  colLastname = viewChild.required<TemplateRef<any>>('colLastname');
  colDob = viewChild.required<TemplateRef<any>>('colDob');
  colGender = viewChild.required<TemplateRef<any>>('colGender');
  isEditMode = signal(false);
  currentCustomer: Customer | undefined;
  formCustomer = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    dob: new FormControl(),
    gender: new FormControl(),
  });
  genderList: any[] = [
    { value: 'f', viewValue: 'Female' },
    { value: 'm', viewValue: 'Male' },
  ];

  ngOnInit(): void {
    this.getCustomers();
    this.setTableColumns();
  }

  onSaveCustomer() {
    console.log(this.formCustomer.value)
  }

  onEditCustomer(customer: Customer) {
    this.currentCustomer = customer;
    this.isEditMode.set(true);
    this.formCustomer.reset({ ...customer });
  }

  onCancelEdit() {
    this.isEditMode.set(false);
    this.currentCustomer = undefined;
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Name',
        def: 'name',
        content: (row) => row.name,
        template: this.colName(),
      },
      {
        label: 'Lastname',
        def: 'lastname',
        content: (row) => row.lastname,
        template: this.colLastname(),
      },
      {
        label: 'Dob',
        def: 'dob',
        content: (row) => row.dob.toISOString(),
        template: this.colDob(),
      },
      {
        label: 'Gender',
        def: 'gender',
        content: (row) => (row.gender === 'f' ? 'Female' : 'Male'),
        template: this.colGender()
      },
      {
        label: 'Actions',
        def: 'actions',
        content: (row) => null,
        template: this.colActions(),
      },
    ];
  }

  getCustomers() {
    timer(2000).subscribe(() => {
      this.isLoadingCustomers = false;
      this.customers = [
        {
          id: 1,
          name: 'Hola',
          lastname: 'Mundo',
          dob: new Date(1980, 0, 1),
          gender: 'm',
        },
        {
          id: 2,
          name: 'Juan',
          lastname: 'Perez',
          dob: new Date(1981, 1, 1),
          gender: 'm',
        },
        {
          id: 3,
          name: 'Juana',
          lastname: 'Perca',
          dob: new Date(1982, 1, 1),
          gender: 'f',
        },
        {
          id: 4,
          name: 'Ana',
          lastname: 'Pacco',
          dob: new Date(1984, 4, 1),
          gender: 'f',
        },
        {
          id: 5,
          name: 'Luisto',
          lastname: 'Comunica',
          dob: new Date(1985, 5, 1),
          gender: 'm',
        },
      ];
    });
  }
}
