import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject
@inject(Router)
export class vaadinListview {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';
  constructor(router) {
    this.router = router;
    this.faEllipsisV = faEllipsisV;
  }

  attached() {
    const grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies)
      .then((response) => (grid.items = response));
  }

  initGridColumns() {
    customElements.whenDefined('vaadin-grid').then(function() {
      const grid = document.querySelector('vaadin-grid');
      const companyName = document.querySelector('#companyName');
      const registryCode = document.querySelector('#registryCode');
      const companyStatus = document.querySelector('#companyStatus');
      const companyAddress = document.querySelector('#companyAddress');
      const city = document.querySelector('#city');

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
