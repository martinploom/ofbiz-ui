import "./allAffiliates.scss"
import { bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework'

@inject(Router)
export class allAffiliates {
  @bindable selectedFilter;
  @bindable modifyUser;

  filteredValues = [];
  affiliatePartners;
  allKeys;


  constructor(router) {
    this.router = router;
    this.affiliatePartners = [{
      "firstName": "Nikita",
      "lastName": "Ojamae",
      "dateTimeCreated": "Mar 15, 2020, 6:56:48 PM",
      "email": "122@gmail.com",
      status: "approved"
    }, {
      "firstName": "Alexei",
      "lastName": "Tsop",
      "dateTimeCreated": "Mar 20, 2020, 8:56:48 PM",
      "email": "Alex@gmail.com",
      "status": "pending"
    }];
    this.allKeys = this.getKeys();
    this.filteredValues = this.affiliatePartners.slice();

  }

  getKeys() {
    return this.affiliatePartners.length > 0 ? Object.keys(this.affiliatePartners[0]) : [];
  }


  getFilteredValues(filterInput) {
    this.filteredValues = this.selectedFilter == null || filterInput === "" ?
      this.affiliatePartners.slice() : this.filteredValues.filter(partner => String(partner[this.selectedFilter]).toLowerCase().startsWith(filterInput.toLowerCase()));
  }

  managePartner(userEmail) {
    this.router.navigateToRoute('aff-partner', {"email": userEmail})
  }


}
