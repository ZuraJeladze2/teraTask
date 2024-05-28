import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * Facade service for managing table-related state.
 * @remarks This service provides methods to control whether the table view is enabled or disabled.
 */
@Injectable({
  providedIn: 'root'
})
export class TableFacade {
  /**
   * Subject for managing the table view state.
   */
  tableViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  /**
   * Observable representing the table view state.
   */
  tableView$: Observable<boolean> = this.tableViewSubject.asObservable();

  /**
   * Enables the table view.
   */
  tableViewOn(): void {
    this.tableViewSubject.next(true)
    localStorage.setItem('tableView', 'true')
  }

  /**
   * Disables the table view.
   */
  tableViewOff(): void {
    this.tableViewSubject.next(false)
    localStorage.removeItem('tableView')
  }

  /**
   * Retrieves the table view state.
   * @returns An observable emitting the current table view state.
   */
  getTableView(): Observable<boolean> {
    this.tableViewSubject.next(!!localStorage.getItem('tableView'))
    return this.tableView$;
  }
}
