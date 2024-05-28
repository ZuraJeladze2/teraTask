import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableFacade {
  tableViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  tableView$: Observable<boolean> = this.tableViewSubject.asObservable();

  tableViewOn(): void {
    this.tableViewSubject.next(true)
    localStorage.setItem('tableView', 'true')
  }
  tableViewOff(): void {
    this.tableViewSubject.next(false)
    localStorage.removeItem('tableView')
  }
  getTableView(): Observable<boolean> {
    this.tableViewSubject.next(!!localStorage.getItem('tableView'))
    return this.tableView$;
  }
}