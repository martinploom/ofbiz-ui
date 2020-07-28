import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {MarketdataService} from '../../service/marketdata-service';
import {Router} from 'aurelia-router';

@inject(HttpClient, MarketdataService, Router)
export class DetailedView {
  // baseUrl = 'api/generic/v1/entities/MarketdataModel';

  constructor(httpClient, marketdataService, router) {
    // this.httpClient = httpClient;
    this.marketdataService = marketdataService;
    this.router = router;
    this.canEdit = false;
    this.value = 'Edit';
  }

  async activate(params) {
    // console.log(params.id);
    this.company = params.id;

  }

  openEdit(company) {
    console.log(company);
    if (this.value === 'Edit') {
      this.value = 'Close editing';
      this.showSaveAndClose = true;
      this.canEdit = true;
    } else  {
      this.resetState();
    }
  }

  resetState() {
    this.value = 'Edit';
    this.canEdit = false;
    this.showSaveAndClose = false;
  }

  bind() {
    let company = await this.marketdataService.getCompany()



    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies)
      .then((response) => (this.company = response[0]));
  }
}
