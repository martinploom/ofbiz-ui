import 'smart-webcomponents-community/source/styles/smart.default.css';
import './query-builder.css';
import { smartQueryBuilder } from '../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js';

export class QueryBuilder {
  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilderMarketdata', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'Company name', dataField: 'groupName', dataType: 'string'},
            {label: 'Company code', dataField: 'partyId', dataType: 'number'},
            {label: 'Number of employees', dataField: 'numEmployees', dataType: 'number'},
            {label: 'Revenue (last year)', dataField: 'annualRevenue', dataType: 'number'},
            {label: 'Revenue (last quarter)', dataField: 'annualRevenue', dataType: 'number'},
            {label: 'Region', dataField: 'officeSiteName', dataType: 'string'}
          ]
        };
      }
    });
  }
}
