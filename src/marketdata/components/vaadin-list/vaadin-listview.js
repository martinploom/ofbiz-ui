import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MarketdataService } from '../../service/marketdata-service';
import { MarketdataCompanies } from '../../data/MarketdataCompanies';

@autoinject
@inject(Router, MarketdataService, EventAggregator)
export class VaadinListView {
  constructor(router, marketdataService, ea) {
    this.router = router;
    this.marketdataService = marketdataService;
    this.ea = ea;
    this.faEllipsisV = faEllipsisV;
    // ToDo: Add unsubscribe when it is exited
    this.ea.subscribe(MarketdataCompanies, msg => {
      this.updateTable(msg.listOfCompanies);
    });
  }

  async attached() {
    let companies = await this.marketdataService.getAllCompanies();
    this.updateTable(companies.listIt.completeList);
  }

  updateTable(tableContent) {
    const grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    grid.items = tableContent;
  }

  initGridColumns() {
    customElements.whenDefined('vaadin-grid').then(function() {
      const grid = document.querySelector('vaadin-grid');
      const companyName = document.querySelector('#groupName');
      const registryCode = document.querySelector('#partyId');
      const numberOfEmployees = document.querySelector('#numEmployees');
      const annualRevenue = document.querySelector('#annualRevenue');
      const companyAddress = document.querySelector('#officeSiteName');
      const logoImageUrl = document.querySelector('#logoImageUrl');

      const addBtn = document.querySelector('#add-btn');

      addBtn.addEventListener('click', async function() {
        if (companyName.value && registryCode.value) {
          // let demodata = grid.items.unshift({companyName: companyName.value, registryCode: registryCode.value, numberOfEmployees: numberOfEmployees.value, companyAddress: companyAddress.value, annualRevenue: annualRevenue.value});
          // console.log(registryCode.value);
          const body = JSON.stringify({
            partyId: registryCode.value,
            groupName: companyName.value,
            officeSiteName: companyAddress.value,
            annualRevenue: annualRevenue.value,
            numEmployees: numberOfEmployees.value,
            logoImageUrl: ''
          });
          console.log(body);
          this.addCompany(body);
          // const companies = await this.marketdataService.getAllCompanies();
          // await this.marketdataService.addCompany(body);
          grid.clearCache();
          companyName.value = registryCode.value = companyAddress.value = annualRevenue.value = numberOfEmployees.value = '';
        } else {
          alert('All fields required!');
        }
      });
    });

    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[1].renderer = (root, column, rowData) => {
      const companyName = rowData.item.groupName;
      const registryCode = rowData.item.partyId;
      root.innerHTML = `<a href="javascript:void(0);">${companyName}<a/>`;
      root.addEventListener('click', () => this.handleSelectCompany(registryCode));
    };

    columns[0].renderer = function(root, column, rowData) {
      if (!root.firstElementChild) {
        root.innerHTML = '<img height="25">';
      }
      root.firstElementChild.src = rowData.item.logoImageUrl;
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

  async addCompany() {
    // console.log(this.companyName);
    let company = {
      partyId: this.companyCode,
      groupName: this.companyName,
      officeSiteName: this.companyAddress,
      annualRevenue: this.annualRevenue,
      numEmployees: this.numberOfEmployees,
      logoImageUrl: null
    };
    // console.log(company);
    await this.marketdataService.addCompany(company);
    let companies = await this.marketdataService.getAllCompanies();
    this.updateTable(companies.listIt.completeList);
    // location.reload();
  }

  handleSelectCompany(registryCode) {
    this.router.navigateToRoute('detailed-view', { id: registryCode });
  }

  hello() {
    console.log(this.companies);
  }
}
