import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from 'aurelia-fetch-client';
import {MarketdataService} from '../../service/marketdata-service';

@autoinject
@inject(Router, HttpClient, MarketdataService)
export class vaadinListview {
  baseUrl = 'api/generic/v1';
  constructor(router, httpClient, marketdataService) {
    this.router = router;
    this.faEllipsisV = faEllipsisV;
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
  }

  async attached() {
    const grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    // let client = new HttpClient();

    console.log('HELLO!');
    // grid.items = await this.marketdataService.getAllCompanies();
    // console.log(grid.items);
    console.log(await this.marketdataService.getAllCompanies());

    // return this.httpClient.fetch(
    //   `${this.baseUrl}/services/performFind`, {
    //     method: 'post',
    //     body: JSON.stringify(
    //       {
    //         "inputFields": {
    //           "partyId_fld0_op": "greaterThanEqualTo",
    //           "partyId_fld0_value": "10000000",
    //
    //           "partyId_fld1_op": "lessThanEqualTo",
    //           "partyId_fld1_value": "99999999"
    //         },
    //         "entityName": "PartyGroup"
    //       }
    //     )
    //   })
    //   .then(response => grid.items = response.json().listIt.completeList)
    //   .then(response => console.log(response));
    // .then(companies => this.companies = companies)
    // .then((response) => (grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[0].renderer = (root, column, rowData) => {
      const companyName = rowData.item.companyName;
      root.innerHTML = `<a href="javascript:void(0);">${companyName}<a/>`;
      root.addEventListener('click', () => this.handleSelectCompany(companyName));
    };

    const contextMenu = document.querySelector('vaadin-context-menu');
    contextMenu.listenOn = document.querySelector('vaadin-button');
    contextMenu.openOn = 'click';
    contextMenu.renderer = (root) => {
      root.innerHTML = '';
      columns.forEach((column) => {
        const checkbox = window.document.createElement('vaadin-checkbox');
        checkbox.style.display = 'block';
        checkbox.textContent = column.getAttribute('name');
        checkbox.checked = !column.hidden;
        checkbox.addEventListener('change', () => {
          column.hidden = !checkbox.checked;
        });
        // Prevent the context menu from closing when clicking a checkbox
        checkbox.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        root.appendChild(checkbox);
      });
    };
  }

  get tasksSelected() {
    return !!this.grid && this.grid.selectedItems.length > 0;
  }

  handleSelectCompany(companyName) {
    this.router.navigateToRoute('detailed-view', { id: companyName });
  }
}
