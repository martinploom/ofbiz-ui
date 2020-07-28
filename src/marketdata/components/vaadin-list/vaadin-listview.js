import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from 'aurelia-fetch-client';
import { MarketdataService } from '../../service/marketdata-service';

@autoinject
@inject(Router, MarketdataService)
export class vaadinListview {
  // baseUrl = 'api/generic/v1/entities/MarketdataModel';
  constructor(router, marketdataService) {
    this.router = router;
    this.marketdataService = marketdataService;
    // this.faEllipsisV = faEllipsisV;
  }

  async attached() {
    const grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    // let client = new HttpClient();

    // return client.fetch('data.json')
    //   .then(response => response.json())
    //   .then(companies => this.companies = companies)
    //   .then((response) => (grid.items = response));

    const companies = await this.marketdataService.getAllCompanies();
    // console.log('Hi!');
    console.log(companies);
    this.companies = companies.listIt.completeList;
    grid.items = this.companies;


    // return await this.marketdataService.getAllCompanies()
    //   .then(console.log(response => response))
    //   .then(console.log(response => response))
    //   .then(console.log("Hello!")
      // .then(response => this.companies = companies)
      // .then((response) => (grid.items = response));
  }

  initGridColumns() {
    customElements.whenDefined('vaadin-grid').then(function() {
      const grid = document.querySelector('vaadin-grid');
      const companyName = document.querySelector('#groupName');
      const registryCode = document.querySelector('#partyId');
      const companyStatus = document.querySelector('#officeSiteName');
      const companyAddress = document.querySelector('#officeSiteName');
      const city = document.querySelector('#officeSiteName');

      const addBtn = document.querySelector('#add-btn');

      addBtn.addEventListener('click', function() {
        if (companyName.value && registryCode.value) {
          grid.items.unshift({companyName: companyName.value, registryCode: registryCode.value, companyStatus: companyStatus.value, companyAddress: companyAddress.value, city: city.value});
          grid.clearCache();
          companyName.value = registryCode.value = '';
        } else {
          alert('All fields required!');
        }
      });
    });

    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[0].renderer = (root, column, rowData) => {
      const companyName = rowData.item.groupName;
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

  // get tasksSelected() {
  //   return !!this.grid && this.grid.selectedItems.length > 0;
  // }

  handleSelectCompany(companyName) {
    this.router.navigateToRoute('detailed-view', { id: companyName });
  }
}
