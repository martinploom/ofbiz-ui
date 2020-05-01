import { inject } from "aurelia-framework";
import { json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setPartyId } from "../../store/store";
import { HttpService } from "./httpService";

@inject(HttpService, Store)
export class AffManagerService {

  constructor(httpService, store) {
    this.httpService = httpService;
    this.store = store;
    this.store.registerAction('setPartyId', setPartyId);
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  async pendingPartnersRequest() {
    try {
      const response = await this.httpService.httpClient.fetch(
        "generic/v1/entityquery/Affiliate",
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "inputFields": {
                "status": "PENDING"
              },
              "fieldList": ["partyId", "createdStamp"],
              "entityRelations" : {
                "_toOne_Person": {
                  "fieldList": ["lastName", "firstName"]
                }
              }
            }
          ),
        }
      );
      if (response.ok) {
        return await response.json()
      }
      return null
    } catch (e) {
      return null
    }
  }

  async approveRequest(partnerToBeApproved) {
    try {
      return await this.httpService.httpClient.fetch(
        "generic/v1/services/approveAffiliatePartner",
        {
          method: "POST",
          body: JSON.stringify(
            {"partyId": partnerToBeApproved}
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async disapproveRequest(partnerToBeDisapproved) {
    try {
      return await this.httpService.httpClient.fetch(
        "generic/v1/services/disapproveAffiliatePartner",
        {
          method: "POST",
          body: JSON.stringify(
            {"partyId": partnerToBeDisapproved}
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async allAffiliatesRequest() {
    try {
      const response = await this.httpService.httpClient.fetch(
        "generic/v1/entityquery/Affiliate",
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "inputFields": {
                "status": "ACTIVE"
              },
              "fieldList": ["partyId", "createdStamp", "status"],
              "entityRelations" : {
                "_toOne_Person": {
                  "fieldList": ["lastName", "firstName"]
                }
              }
            }
          ),
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async becomeAffPartner() {
    return await this.httpService.httpClient
      .fetch(
        "generic/v1/services/createMultiLvlAffiliate",
        {
          method: "POST",
          body: JSON.stringify(
            {"partyId": this.state.partyId}
          ),
        }
      );
  }

  async fetchPartyId() {
    try {
      const response = await this.httpService.httpClient
        .fetch(
          "generic/v1/services/getPartyIdForUserId",
          {
            method: 'POST',
            body: json({
                "userLoginId": this.state.userLoginId,
              }
            ),
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        this.store.dispatch('setPartyId', responseData['partyId']);
      }
    } catch (e) {
      return null;
    }
  }

  async myAffiliatesRequest() {
    try {
      return await this.httpService.httpClient.fetch(
        "generic/v1/entityquery/Affiliate",
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "inputFields": {
                "rootPartyId": this.state.partyId
              },
              "fieldList": ["partyId", "firstName", "lastName"]
            }
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async getAffiliateCodesRequest() {
    try {
      const response = await this.httpService.httpClient.fetch(
        "generic/v1/services/getAffiliateCodes",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": this.state.partyId}
          ),
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async generateAffiliateCodeRequest() {
    try {
      return await this.httpService.httpClient.fetch(
        "generic/v1/services/createAffiliateCode",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": this.state.partyId}
          ),
        }
      )
    } catch (e) {
      return null;
    }
  }

  async deleteAffiliateCodeRequest(codeId) {
    try {
      return await this.httpService.httpClient.fetch(
        "generic/v1/services/deleteAffiliateCode",
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "partyId": this.state.partyId,
              "affiliateCodeId": codeId,
            }
          ),
        }
      )
    } catch (e) {
      return null;
    }
  }

}