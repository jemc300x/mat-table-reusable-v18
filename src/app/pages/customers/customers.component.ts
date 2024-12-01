import { Component, OnInit } from '@angular/core';
import {
  TableColumn,
  TableConfig,
  UiTableComponent,
} from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

interface Customer {
  name: string;
  lastname: string;
  dob: Date;
  gender: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [UiTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  tableColumns: TableColumn<Customer>[] = [];
  isLoadingCustomers = true;
  tableConfig!: TableConfig;

  ngOnInit(): void {
    this.setTableConfig();
    this.getCustomers();
    this.setTableColumns();
  }

  onPageEventTable(event: PageEvent) {
    console.log('PageEvent: ', event);
  }

  setTableConfig() {
    this.tableConfig = {
      paginator: {
        show: true,
        showFirstLastButtons: true,
        // totalRecords: 0,
      },
    };
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Name',
        def: 'name',
        content: (row) => row.name,
      },
      {
        label: 'Lastname',
        def: 'lastname',
        content: (row) => row.lastname,
      },
      {
        label: 'Dob',
        def: 'dob',
        content: (row) => row.dob.toISOString(),
      },
      {
        label: 'Gender',
        def: 'gender',
        content: (row) => (row.gender === 'f' ? 'Female' : 'Male'),
      },
    ];
  }

  getCustomers() {
    timer(2000).subscribe(() => {
      this.tableConfig.paginator.totalRecords = 300000;
      this.isLoadingCustomers = false;
      this.customers = [
        {
          name: 'Hola',
          lastname: 'Mundo',
          dob: new Date(1980, 0, 1),
          gender: 'm',
        },
        {
          name: 'Juan',
          lastname: 'Perez',
          dob: new Date(1981, 1, 1),
          gender: 'm',
        },
        {
          name: 'Juana',
          lastname: 'Perca',
          dob: new Date(1982, 1, 1),
          gender: 'f',
        },
        {
          name: 'Ana',
          lastname: 'Pacco',
          dob: new Date(1984, 4, 1),
          gender: 'f',
        },
        {
          name: 'Luisto',
          lastname: 'Comunica',
          dob: new Date(1985, 5, 1),
          gender: 'm',
        },
        {
          name: 'Hola2',
          lastname: 'Mundo',
          dob: new Date(1980, 0, 1),
          gender: 'm',
        },
        {
          name: 'Juan2',
          lastname: 'Perez',
          dob: new Date(1981, 1, 1),
          gender: 'm',
        },
        {
          name: 'Juana2',
          lastname: 'Perca',
          dob: new Date(1982, 1, 1),
          gender: 'f',
        },
        {
          name: 'Ana2',
          lastname: 'Pacco',
          dob: new Date(1984, 4, 1),
          gender: 'f',
        },
        {
          name: 'Luisto2',
          lastname: 'Comunica',
          dob: new Date(1985, 5, 1),
          gender: 'm',
        },
      ];
    });
  }
}
