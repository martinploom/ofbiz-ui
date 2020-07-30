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
  }

  activate(params) {
    this.registryCode = params.id;
  }

  async bind() {
    let company = await this.marketdataService.getCompany(this.registryCode);
    this.company = company[0];

    let timeperiodInfo = await this.marketdataService.getCompanyTimeperiodInfo(this.registryCode);
    this.companyTimeperiodInfo = timeperiodInfo.listIt.completeList;
    // console.log(this.companyTimeperiodInfo);
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

  async deleteCompany() {
    await this.marketdataService.deleteCompany(this.registryCode);
    this.router.navigateToRoute('marketdata');
  }

  resetState() {
    this.value = 'Edit';
    this.canEdit = false;
    this.showSaveAndClose = false;
  }
}
