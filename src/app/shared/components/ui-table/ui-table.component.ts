import {
  AfterViewInit,
  Component,
  computed,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface TableColumn<T> {
  label: string;
  def: string;
  content: (row: T) => string | null | undefined;
  isSortable?: boolean;
}

type DataAccessor<T> = (data: T, sortHeaderId: string) => string | number;

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
})
export class UiTableComponent<T> implements OnChanges, AfterViewInit {
  dataSource = new MatTableDataSource<T>([]);
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  displayedColumns = computed(() => this.columns().map((col) => col.def));
  isLoading = input(false);
  matSort = viewChild.required(MatSort);
  sortingDataAccessor = input<DataAccessor<T>>();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort();
    if (this.sortingDataAccessor() !== undefined) {
      this.dataSource.sortingDataAccessor =
        this.sortingDataAccessor() as DataAccessor<T>;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.setData();
    }
  }

  private setData() {
    this.dataSource.data = this.data();
  }
}
