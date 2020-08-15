import { inject } from 'aurelia-dependency-injection';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MarketdataService } from '../../service/marketdata-service';
import { VaadinListView } from '../vaadin-list/vaadin-listview';
import { MarketdataCompanies } from '../../data/MarketdataCompanies';

@autoinject
@inject(VaadinListView, MarketdataService, EventAggregator)
export class Header {
  companies = [];

  constructor(vaadinListView, marketdataService, ea) {
    this.vaadinListView = vaadinListView;
    this.marketdataService = marketdataService;
    this.ea = ea;
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
    let body = this.getFilterFromComponent();
    console.log('body of applyFilter');
    console.log(body);
    let filterResult;
    if (!body) {
      console.log('no body');
      filterResult = await this.marketdataService.getAllCompanies();
      filterResult = filterResult.listIt.completeList;
    } else {
      console.log('body');
      filterResult = await this.marketdataService.getFilteredCompanies(body);
      filterResult = filterResult.result;
    }
    this.ea.publish(new MarketdataCompanies(filterResult));
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
        filter = {
          'fieldName': 'partyId',
          'operation': 'greaterThanEqualTo',
          'value': 10000000
        };
        filterComponent.push(filter);
        filter = {
          'fieldName': 'partyId',
          'operation': 'lessThanEqualTo',
          'value': 99999999
        };
        filterComponent.push(filter);
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            var filter;
            if (data[0] === "createdStamp") {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': Date.parse(data[2]),
                'ignoreCase': true
              };
            } else {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': data[2],
                'ignoreCase': true
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
    'startswith': 'like',
    'endswith': '',
    'contains': 'contains',
    'notcontains': 'notContains',
    'isblank': 'empty',
    'isnotblank': ''
  }
}
