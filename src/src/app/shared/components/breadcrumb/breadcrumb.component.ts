import { Component } from '@angular/core';
import {BreadcrumbDefinition, BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  breadcrumbs: BreadcrumbDefinition[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    breadcrumbService.breadcrumbs$.subscribe(value => {
      this.breadcrumbs = value;
    });
  }
}

