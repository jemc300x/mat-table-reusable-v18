import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  computed,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';

export interface TableColumn<T> {
  label: string;
  def: string;
  content: (row: T) => string | null | undefined;
}

export interface TableConfig {
  isSelectable?: boolean;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, NgClass],
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss',
})
export class UiTableComponent<T> implements OnChanges {
  dataSource = new MatTableDataSource<T>([]);
  data = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);
  displayedColumns = computed(() => {
    const columns = this.columns().map((col) => col.def);
    const config = this.config();

    if (config?.isSelectable) {
      columns.unshift('select');
    }

    return columns;
  });
  isLoading = input(false);
  config = input<TableConfig>();
  selection = new SelectionModel<T>(true, []);
  selectRowEvent = output<T[]>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.setData();
    }
  }

  onSelectRow(row: T, isChecked: boolean) {
    if (isChecked) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
    console.log('onSelectRow: ', this.selection.selected);
    this.selectRowEvent.emit(this.selection.selected);
  }

  onToggleAll(isChecked: boolean) {
    if (isChecked) {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    } else {
      this.selection.clear();
    }

    console.log('OnToggleAll: ', this.selection.selected);
    this.selectRowEvent.emit(this.selection.selected);
  }

  private setData() {
    this.dataSource.data = this.data();
  }
}
