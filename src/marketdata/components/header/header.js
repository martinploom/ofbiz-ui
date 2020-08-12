import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import { MarketdataService } from '../../service/marketdata-service';
import {VaadinListView} from '../vaadin-list/vaadin-listview';

@autoinject
@inject(VaadinListView, MarketdataService, EventAggregator)
export class Header {
  companies = [];

  constructor(vaadinListView, marketdataService, navigationService, ) {
    this.vaadinListView = vaadinListView;
    this.marketdataService = marketdataService;
  }

  bind() { }

  attached() { }

  submitData() {
    let company = {
      companyName: this.companyName,
      registryCode: this.registryCode,
      companyStatus: this.companyStatus,
      companyAddress: this.companyAddress,
      city: this.city,
      companyBusinessModel: this.companyBusinessModel,
      companySector: this.companySector,
      employeeNum: this.employeeCount,
      contactEmail: this.contactEmail
    };

    this.companies.unshift(company);
  }

  async applyFilter() {
    var body = this.getFilterFromComponent();
    // console.log(body);
    // const vaadinList = document.querySelectorAll('vaadin-list-view');
    // console.log(vaadinList);
    // this.vaadinListView.hello();
    var filteredCompanies = await this.marketdataService.getFilteredCompanies(body);
    // var filteredCompanies = await this.marketdataService.getAllCompanies();
    console.log(filteredCompanies);
    // var newData = [];
    // var filteredData = await this.opportunityService.filter(body);
    // filteredData["result"].forEach(function (opportunity) {
    //   newData.push(opportunity);
    // });
    // this.store.opportunities = newData;
    //
    // this.separateOpportunities(newData);
  }

  getFilterFromComponent() {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    console.log(queryBuilders);
    let queryBuilder = queryBuilders[0];
    let queryArray = queryBuilder.value;
    console.log(queryArray);
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] === 'object') {
        let filterComponent = [];
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            var filter;
            if (data[0] === "createdStamp") {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': Date.parse(data[2])
              };
            } else {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': data[2]
              };
            }
            filterComponent.push(filter);
          }
        }
        filters.push(filterComponent);
      }
    }
    console.log(filters[0]);
    return filters[0];
  }

  dataOperatorMapping = {
    '<=': 'lessThanEqualTo',
    '<': 'lessThan',
    '>': 'greaterThan',
    '>=': 'greaterThanEqualTo',
    '=': 'equals',
    '<>': 'notEqual',
    'startswith': '',
    'endswith': '',
    'contains': '',
    'notcontains': '',
    'isblank': '',
    'isnotblank': ''
  }
}
