import {
  Component,
  computed,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface TableColumn<T> {
  label: string;
  def: string;
  content: (row: T) => string | null | undefined;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
})
export class UiTableComponent<T> implements OnChanges {
  dataSource = new MatTableDataSource<T>([]);
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  displayedColumns = computed(() => this.columns().map((col) => col.def));
  isLoading = input(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.setData();
    }
  }

  private setData() {
    this.dataSource.data = this.data();
  }
}
