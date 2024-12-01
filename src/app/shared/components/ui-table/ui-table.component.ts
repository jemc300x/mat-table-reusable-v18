import {
  AfterViewInit,
  Component,
  computed,
  input,
  OnChanges,
  output,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface TableColumn<T> {
  label: string;
  def: string;
  content: (row: T) => string | null | undefined;
}

export interface TableConfig {
  paginator: {
    show?: boolean;
    pageSizeOptions?: number[];
    showFirstLastButtons?: boolean;
    totalRecords?: number;
  };
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
})
export class UiTableComponent<T> implements OnChanges, AfterViewInit {
  dataSource = new MatTableDataSource<T>([]);
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  displayedColumns = computed(() => this.columns().map((col) => col.def));
  isLoading = input(false);
  config = input<TableConfig>();
  pageEvent = output<PageEvent>();

  private readonly paginator = viewChild(MatPaginator);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.setData();
    }
  }

  ngAfterViewInit(): void {
    if (this.config()?.paginator.totalRecords !== undefined) {
      return;
    }

    this.dataSource.paginator = this.paginator() ?? null;
  }

  private setData() {
    this.dataSource.data = this.data();
  }
}
