import {inject} from 'aurelia-dependency-injection';
// import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {MarketdataService} from '../../service/marketdata-service';

@autoinject
@inject(MarketdataService, Router)
export class Cardview {
  // baseUrl = 'api/generic/v1/entities/MarketdataModel';

  constructor(marketdataService, router) {
    // this.httpClient = httpClient;
    this.marketdataService = marketdataService;
    this.router = router;
  }

  async bind() {
    const companies = await this.marketdataService.getAllCompanies();
    this.companies = companies.listIt.completeList;
    // let client = new HttpClient();
    //
    // return client.fetch('data.json')
    //   .then(response => response.json())
    //   .then(companies => this.companies = companies);
  }

  onSelectCompany(onClick, company) {
    this.router.navigateToRoute('detailed-view', {id: company.partyId});
  }
}
