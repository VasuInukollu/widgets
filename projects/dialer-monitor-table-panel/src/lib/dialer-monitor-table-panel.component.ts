import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerConnection } from 'jema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'xe-dialer-monitor-table-panel',
  templateUrl: './dialer-monitor-cards-panel.component.html',
  styleUrls: ['./dialer-monitor-cards-panel.component.scss'],
})
export class DialerMonitorTablePanelComponent implements OnInit, OnDestroy {
  @Input() serverConnection: ServerConnection;

  @ViewChild(MatSort) sort: MatSort;

  dialerUpdateSubscription: any;
  dialerStates: any;

  dataSource: any;
  displayedColumns = [
    'name',
    'active',
    'speed',
    'activeQueue',
    'completed',
  ];

  constructor() { }

  ngOnDestroy(): void {
    this.dialerUpdateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dialerUpdateSubscription = this.serverConnection.dialerStates.subscribe((dialerStates) => {
      this.dialerStates = dialerStates;
      this.dataSource = new MatTableDataSource(dialerStates);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
