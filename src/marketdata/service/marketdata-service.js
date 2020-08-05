import {inject} from 'aurelia-dependency-injection';
import {HttpClient, json} from 'aurelia-fetch-client';

// import {safeGet} from "../../commons/util/utility";

@inject(HttpClient)
export class MarketdataService {
  baseUrl = 'api/generic/v1'

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getAllCompanies() {
    const body = JSON.stringify({
      inputFields: {
        partyId_fld0_op: 'greaterThanEqualTo',
        partyId_fld0_value: 10000000,

        partyId_fld1_op: 'lessThanEqualTo',
        partyId_fld1_value: 99999999
      },
      entityName: 'PartyGroup'
    });
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/services/performFind`,
        {
          method: 'POST',
          body: body
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async getCompany(registryCode) {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/entities/PartyGroup?partyId=${registryCode}`
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async getCompanyWithAddress(registryCode) {
    const body = JSON.stringify({
      'areRelationResultsMandatory': true,
      'inputFields':
        {
          'partyId': registryCode
        },
      'fieldList': ['partyId', 'groupName', 'numEmployees', 'officeSiteName', 'annualRevenue'],
      'entityRelations': {
        '_toMany_PartyContactMech': {
          'areRelationResultsMandatory': true,
          'fieldList': ['contactMechId'],
          'entityRelations': {
            '_toOne_PostalAddress': {
              'fieldList': ['city', 'address1', 'houseNumber', 'houseNumberExt']
            }
          }
        }
      }
    });

    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/entityquery/PartyGroup`,
        {
          method: 'POST',
          body: body
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async getCompanyTimeperiodInfo(registryCode) {
    const body = JSON.stringify({
      inputFields: {
        partyId_fld0_op: 'like',
        partyId_fld0_value: registryCode
      },
      entityName: 'PartyQuarter'
    });

    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/services/performFind`,
        {
          method: 'POST',
          body: body
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async deleteCompany(registryCode) {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/entities/PartyGroup?partyId=${registryCode}`,
        {
          method: 'DELETE'
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async addCompany(body) {
    await this.createCompany(body);
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/entities/PartyGroup`,
        {
          method: 'POST',
          body: JSON.stringify(body)
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async createCompany(body) {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/entities/Party`,
        {
          method: 'POST',
          body: JSON.stringify({
            partyId: body.partyId
          })
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async updateCompany(body) {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/entities/PartyGroup`,
        {
          method: 'PUT',
          body: JSON.stringify({
            partyId: body.partyId,
            numEmployees: body.numEmployees,
            officeSiteName: body.officeSiteName,
            annualRevenue: body.annualRevenue
          })
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  // getProjectList() {
  //   return this.httpClient
  //     .fetch(this.baseUrl)
  //     .then(res => res.json())
  //     .then(res => res.projectList)
  //     .catch(error => {
  //       /* eslint no-console: ["error", { allow: ["error"] }] */
  //       console.error(error);
  //     }); // TODO: improve error handling
  // }

  // createProject(project) {
  //   const body = json(project);
  //   return this.httpClient
  //     .fetch(`${this.baseUrl}/new-project`, {
  //       method: 'post',
  //       body: body
  //     })
  //     .catch(error => {
  //       /* eslint no-console: ["error", { allow: ["error"] }] */
  //       console.error(error);
  //     }); // TODO: improve error handling
  // }

  // async getMarketdataCompanies() {
  //   try {
  //     const response = await this.httpClient.fetch(
  //       `${this.baseUrl}/services/getMarketdataCompanies`,
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(
  //           {'': ''}
  //         )
  //       }
  //     );
  //     return await response.json();
  //   } catch (e) {
  //     return null;
  //   }
  // }
}
