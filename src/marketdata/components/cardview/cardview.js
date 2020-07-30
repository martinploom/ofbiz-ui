import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { MarketdataService } from '../../service/marketdata-service';

@autoinject
@inject(MarketdataService, Router)
export class Cardview {
  constructor(marketdataService, router) {
    this.marketdataService = marketdataService;
    this.router = router;
  }

  async bind() {
    const companies = await this.marketdataService.getAllCompanies();
    this.companies = companies.listIt.completeList;
  }

  onSelectCompany(onClick, company) {
    this.router.navigateToRoute('detailed-view', {id: company.partyId});
  }
}
