import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { MarketdataService } from '../../service/marketdata-service';
import { MarketdataCompanies } from '../../data/MarketdataCompanies';

@autoinject
@inject(MarketdataService, Router, EventAggregator)
export class Cardview {
  constructor(marketdataService, router, eventAggregator) {
    this.marketdataService = marketdataService;
    this.router = router;
    this.ea = eventAggregator;

    this.ea.subscribe(MarketdataCompanies, msg => {
      this.companies = msg.listOfCompanies;
    });
  }

  async bind() {
    const companies = await this.marketdataService.getAllCompanies();
    this.companies = companies;
    for (let i = 0; i < this.companies.length; i++) {
      try {
        this.companies[i].numEmployees = this.companies[i]._toMany_PartyQuarter[0].numberOfEmployees;
        this.companies[i].annualRevenue = this.companies[i]._toMany_PartyQuarter[0].revenue;
        this.companies[i].officeSiteName = this.companies[i]._toMany_PartyContactMech[0]._toOne_PostalAddress.city;
      } catch (e) {

      }
    }
  }

  onSelectCompany(onClick, company) {
    this.router.navigateToRoute('detailed-view', {id: company.partyId});
  }
}
