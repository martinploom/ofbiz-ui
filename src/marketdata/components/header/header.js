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

  bind() {
    //let importedFile = document.getElementById('uploadFile');
    //document.getElementById('uploadFile').addEventListener('uploadFile', csvJSON, false);
  }

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
    let listOfFilters = this.getFilterFromComponent();
    console.log('List of filters from builder');
    console.log(listOfFilters);
    let filterResult;

    // if (!body) {
    //   console.log('no body');
    //   filterResult = await this.marketdataService.getAllCompanies();
    //   filterResult = filterResult.listIt.completeList;
    // } else {
    //   console.log('body');
    //   filterResult = await this.marketdataService.getFilteredCompanies(body);
    //   filterResult = filterResult.result;
    // }
    filterResult = await this.marketdataService.getFilteredCompanies(listOfFilters);
    this.ea.publish(new MarketdataCompanies(filterResult));
  }

  getFilterFromComponent() {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    // console.log(queryBuilders);
    let queryBuilder = queryBuilders[0];
    let queryArray = queryBuilder.value;
    // console.log(queryArray);
    let sequenceHolder = {
      'partyId': 2,
      'groupName': 0,
      'city': 0,
      'numberOfEmployees': 0,
      'revenue': 0
    };
    let partyGroupFilters = {
      'partyId_fld0_op': 'greaterThanEqualTo',
      'partyId_fld0_value': '10000000',
      'partyId_fld1_op': 'lessThanEqualTo',
      'partyId_fld1_value': '99999999'
    };
    let cityFilters = {};
    let partyQuarterFilters = {
      'periodType_fld0_op': 'like',
      'periodType_fld0_value': 'year',
      'year__fld0_op': 'equals',
      'year__fld0_value': '2019'
    };

    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] === 'object') {
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            let filter = {};
            let base = `${data[0]}` + '_fld' + `${sequenceHolder[data[0]]}`;
            let op = `${base}` + '_op';
            let value = base + '_value';
            let ic = base + '_ic';

            filter[op] = this.dataOperatorMapping[data[1]];
            filter[value] = data[2];
            filter[ic] = 'Y';

            switch (data[0]) {
              case 'partyId':
                partyGroupFilters[op] = this.dataOperatorMapping[data[1]];
                partyGroupFilters[value] = data[2];
                partyGroupFilters[ic] = 'Y';
                break;
              case 'groupName':
                partyGroupFilters[op] = this.dataOperatorMapping[data[1]];
                partyGroupFilters[value] = data[2];
                partyGroupFilters[ic] = 'Y';
                break;
              case 'city':
                cityFilters[op] = this.dataOperatorMapping[data[1]];
                cityFilters[value] = data[2];
                cityFilters[ic] = 'Y';
                break;
              case 'numberOfEmployees':
                partyQuarterFilters[op] = this.dataOperatorMapping[data[1]];
                partyQuarterFilters[value] = data[2];
                break;
              case 'revenue':
                partyQuarterFilters[op] = this.dataOperatorMapping[data[1]];
                partyQuarterFilters[value] = data[2];
                break;
              default:
                console.log('default method of switch');
            }
            // console.log('This is filter');
            // console.log(filter);

            sequenceHolder[data[0]] = sequenceHolder[data[0]] + 1;

            // filterComponent.push(filter);
          }
        }
        // filters.push(filterComponent);
      }
    }
    console.log(filters[0]);
    return [partyGroupFilters, cityFilters, partyQuarterFilters];
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
  /*
  csvJSON(e) {
    let file = e + '';
    let lines = file.split('\n');

    let result = [];

    let headers = lines[0].split('\t');

    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split('\t');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //console.log(result);
    return JSON.stringify(result);
  } */

  /*
  upload(e) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      let csvData = event.target.result;

      let parsedCSV = d3.csv.parseRows(csvData);

      parsedCSV.forEach(function(d, i) {
        // eslint-disable-next-line eqeqeq
        if (i == 0) return true; // skip the header
        document.getElementById(d[0]).value = d[1];
      });
    };
    //console.log(csvData);
  } */
}
