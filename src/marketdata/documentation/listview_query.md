This query will give all companies in the database with address (more than one, but first one could be used) and with 2019 year data for revenue and nr of people.

Do a POST request to URL `api/generic/v1/entityquery/PartyGroup`
<br> with body
```
{
    "areRelationResultsMandatory": false,
    "inputFields":
    {
        "partyId_fld0_op": "greaterThanEqualTo",
        "partyId_fld0_value": "10000000",

        "partyId_fld1_op": "lessThanEqualTo",
        "partyId_fld1_value": "99999999"
    },
    "fieldList": ["partyId", "groupName"],
    "entityRelations": {
        "_toMany_PartyContactMech": {
            "areRelationResultsMandatory": false,
            "fieldList":["contactMechId"],
            "entityRelations" : {
                "_toOne_PostalAddress": {
                    "fieldList":["city"]
                }
            }
        },
        "_toMany_PartyQuarter": {
            "areRelationResultsMandatory": false,
            "inputFields": {
                "periodType_fld0_op": "like",
                "periodType_fld0_value": "year",
                "year__fld0_op": "equals",
                "year__fld0_value": "2019"
            },
            "fieldList":["revenue", "numberOfEmployees"]
        }
    }
}
```

The response will be something like this
```
[
    {
        "groupName": "KIVIÕLI KAUBAHOOV, AS",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000165"
    },
    {
        "groupName": "YEAR, AS",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000219"
    },
    {
        "groupName": "ITW CONSTRUCTION PRODUCTS OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000248"
    },
    {
        "groupName": "ESTIKO, AS",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000356"
    },
    {
        "groupName": "SAARIOINEN EESTI OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000372"
    },
    {
        "groupName": "KUUMTRÜKK, OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000395"
    },
    {
        "groupName": "MUAREE, OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000461"
    },
    {
        "groupName": "B.BRAUN MEDICAL, OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000515"
    },
    {
        "groupName": "GPK PARTNERID, OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000550"
    },
    {
        "groupName": "AKTSIASELTS METAPRINT",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000573"
    },
    {
        "groupName": "tere",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "12345678"
    },
    {
        "groupName": "tere",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "12345679"
    },
    {
        "groupName": "AMSERV AUTO AS",
        "_toMany_PartyContactMech": [
            {
                "_toOne_PostalAddress": {
                    "city": "Tallinn"
                },
                "contactMechId": "1"
            },
            {
                "_toOne_PostalAddress": {
                    "city": "Tallinn"
                },
                "contactMechId": "2"
            }
        ],
        "_toMany_PartyQuarter": [
            {
                "revenue": 28929905.07,
                "numberOfEmployees": 225
            }
        ],
        "partyId": "10000018"
    },
    {
        "groupName": "EESTI RAAMAT, OÜ",
        "_toMany_PartyContactMech": [
            {
                "_toOne_PostalAddress": {
                    "city": "Tallinn"
                },
                "contactMechId": "3"
            }
        ],
        "_toMany_PartyQuarter": [],
        "partyId": "10000024"
    },
    {
        "groupName": "ALDO KOPPEL",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000062"
    },
    {
        "groupName": "ARAVETE APTEEK, TÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000127"
    },
    {
        "groupName": "EHITUSMEISTER, OÜ",
        "_toMany_PartyContactMech": [],
        "_toMany_PartyQuarter": [],
        "partyId": "10000455"
    }
]
```
