import {inject} from 'aurelia-dependency-injection';
import {MarketdataService} from '../../service/marketdata-service';
import {Router} from 'aurelia-router';

@inject(MarketdataService, Router)
export class DetailedView {
  constructor(marketdataService, router) {
    this.marketdataService = marketdataService;
    this.router = router;
    this.canEdit = false;
    this.value = 'Edit';
    this.close = 'Delete';
    this.avgEmployees = 0;
    this.totalRevenue = 0;
  }

  activate(params) {
    this.registryCode = params.id;
  }

  async bind() {
    let company = await this.marketdataService.getCompanyWithAddress(this.registryCode);
    this.company = company[0];

    let timeperiodInfo = await this.marketdataService.getCompanyTimeperiodInfo(this.registryCode);
    this.companyTimeperiodInfo = timeperiodInfo.listIt.completeList;
    for (let i = 0; i < this.companyTimeperiodInfo.length; i++) {
      this.avgEmployees += this.companyTimeperiodInfo[i].numberOfEmployees / this.companyTimeperiodInfo.length;
      this.totalRevenue += this.companyTimeperiodInfo[i].revenue;
    }

    let partyRelationship = await this.marketdataService.getPartyRelationship(this.registryCode);

    let persons = [];

    for (let i = 0; i < partyRelationship.length; i++) {
      persons.push(await this.marketdataService.getPartyInfo(partyRelationship[i].partyIdTo));
    }

    this.persons = persons;
    console.log(this.persons);
  }

  openEdit(company) {
    if (this.value === 'Edit') {
      this.value = 'Save and close';
      this.close = 'Close';
      this.showSaveAndClose = true;
      this.canEdit = true;
    } else  {
      this.resetState();
    }
  }

  resetState() {
    this.value = 'Edit';
    this.close = 'Delete';
    this.canEdit = false;
    this.showSaveAndClose = false;
  }

  async deleteCompany() {
    if (this.close === 'Delete') {
      await this.marketdataService.deleteCompany(this.registryCode);
      this.router.navigateToRoute('marketdata');
    } else {
      this.resetState();
    }
  }

  async updateCompany(company) {
    if (this.value === 'Save and close') {
      let body = { partyId: this.company.partyId, numEmployees: this.company.numEmployees, officeSiteName: this.company.officeSiteName, annualRevenue: this.company.annualRevenue };
      await this.marketdataService.updateCompany(body);
      this.resetState();
    } else {
      this.value = 'Save and close';
      this.close = 'Close';
      this.showSaveAndClose = true;
      this.canEdit = true;
    }
  }
}
