import { Component, OnInit } from '@angular/core';
import {
  TableColumn,
  UiTableComponent,
} from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';

interface Product {
  name: string;
  cotegory: {
    id: number;
    name: string;
  };
  price: number;
  active: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UiTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  tableColumns: TableColumn<Product>[] = [];
  isLoadingProducts = true;

  ngOnInit(): void {
    this.setTableColumns();
    this.getProducts();
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Product Name',
        def: 'name',
        content: (row) => row.name,
      },
      {
        label: 'Category',
        def: 'cagetory',
        content: (row) => row.cotegory.name,
      },
      {
        label: 'Price',
        def: 'price',
        content: (row) => row.price.toString(),
      },
      {
        label: 'Active',
        def: 'active',
        content: (row) => (row.active ? 'Yes' : 'No'),
      },
    ];
  }

  getProducts() {
    timer(2000).subscribe(() => {
      this.isLoadingProducts = false;
      this.products = [
        {
          name: 'Laptop i7',
          cotegory: {
            id: 1,
            name: 'LAPTOP',
          },
          price: 100,
          active: true,
        },
        {
          name: 'MacBook Air',
          cotegory: {
            id: 1,
            name: 'LAPTOP',
          },
          price: 200,
          active: true,
        },
        {
          name: 'MacBook Pro',
          cotegory: {
            id: 1,
            name: 'LAPTOP',
          },
          price: 300,
          active: true,
        },
        {
          name: 'Monitor 24',
          cotegory: {
            id: 2,
            name: 'MONITOR',
          },
          price: 400,
          active: true,
        },
        {
          name: 'Monitor 32',
          cotegory: {
            id: 2,
            name: 'MONITOR',
          },
          price: 500,
          active: false,
        },
      ];
    });
  }
}
