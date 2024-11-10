import { Component, OnInit } from '@angular/core';
import {
  TableColumn,
  UiTableComponent,
} from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';

interface Product {
  name: string;
  category: {
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

  getSortingDataAccessor() {
    return (data: Product, sortHeaderId: string) => {
      if (sortHeaderId === 'category') {
        return data.category.name;
      }

      return (data as unknown as Record<string, any>)[sortHeaderId];
    };
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Product Name',
        def: 'name',
        content: (row) => row.name,
        isSortable: true,
      },
      {
        label: 'Category',
        def: 'category',
        content: (row) => row.category.name,
        isSortable: true,
      },
      {
        label: 'Price',
        def: 'price',
        content: (row) => row.price.toString(),
        isSortable: true,
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
          category: {
            id: 1,
            name: 'LAPTOP',
          },
          price: 100,
          active: true,
        },
        {
          name: 'MacBook Air',
          category: {
            id: 1,
            name: 'LAPTOP',
          },
          price: 200,
          active: true,
        },
        {
          name: 'MacBook Pro',
          category: {
            id: 1,
            name: 'LAPTOP',
          },
          price: 300,
          active: true,
        },
        {
          name: 'Monitor 24',
          category: {
            id: 2,
            name: 'MONITOR',
          },
          price: 400,
          active: true,
        },
        {
          name: 'Monitor 32',
          category: {
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
