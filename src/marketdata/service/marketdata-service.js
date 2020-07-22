import {inject} from 'aurelia-dependency-injection';
import {HttpClient, json} from 'aurelia-fetch-client';
import {safeGet} from "../../commons/util/utility";

@inject(HttpClient)
export class MarketdataService {
  // baseUrl = 'https://localhost:8443/api/marketdata';
  //baseUrl = 'api/generic/v1';
  baseUrl = 'http://localhost/api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getAllCompanies() {
    // try {
    //   const response = await this.httpClient.fetch(
    //     `${this.baseUrl}/services/performFind`, {
    //       method: 'post',
    //       body: JSON.stringify(
    //         {
    //           "inputFields": {
    //             "partyId_fld0_op": "greaterThanEqualTo",
    //             "partyId_fld0_value": "10000000",
    //
    //             "partyId_fld1_op": "lessThanEqualTo",
    //             "partyId_fld1_value": "99999999"
    //           },
    //           "entityName": "PartyGroup"
    //         }
    //       )
    //     });
    //   if (response.ok) {
    //     console.log('HELLO AGAIN!');
    //     console.log(response.json());
    //     return await response.json().listIt.completeList;
    //   }
    // } catch (e) {
    //   return null;
    // }
    return this.httpClient
      .fetch(`${this.baseUrl}/services/performFind`, {
        method: 'post',
        body: JSON.stringify(
          {
            "inputFields": {
              "partyId_fld0_op": "greaterThanEqualTo",
              "partyId_fld0_value": "10000000",

              "partyId_fld1_op": "lessThanEqualTo",
              "partyId_fld1_value": "99999999"
            },
            "entityName": "PartyGroup"
          }
        )
      })
      .then((res) => res.json())
      .then((res) => {
        console.error(res);
        console.error(res.listIt.completeList);
        return response.json();
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  getProjectList() {
    return this.httpClient
      .fetch(this.baseUrl)
      .then(res => res.json())
      .then(res => res.projectList)
      .catch(error => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  createProject(project) {
    const body = json(project);
    return this.httpClient
      .fetch(`${this.baseUrl}/new-project`, {
        method: 'post',
        body: body
      })
      .catch(error => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  async getMarketdataCompanies() {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/services/getMarketdataCompanies`,
        {
          method: 'POST',
          body: JSON.stringify(
            {'': ''}
          )
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }
}
