import 'smart-webcomponents-community/source/styles/smart.default.css';
import './query-builder.css';
import { smartQueryBuilder } from '../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js';

export class QueryBuilder {

  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilderOrder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'Company name', dataField: 'grandTotal', dataType: 'string'},
            {label: 'Registry code', dataField: 'salesChannelEnumId', dataType: 'number'},
            {label: 'Nr of employees', dataField: 'statusId', dataType: 'number'},
            {label: 'Revenue', dataField: 'createdStamp', dataType: 'number'},
            {label: 'State taxes paid', dataField: 'createdStamp', dataType: 'number'}
            // {label: 'Date since', dataField: 'createdStamp', dataType: 'date'},
            // {label: 'Date to', dataField: 'createdStamp', dataType: 'date'}
          ]
        };
      }
    });
  }
}
