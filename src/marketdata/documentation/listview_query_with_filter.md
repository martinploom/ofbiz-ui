This query will give all companies in the database with address (more than one, but first one could be used) and with 2019 year data for revenue and nr of people.

Do a POST request to URL `api/generic/v1/entityquery/PartyGroup`. This is the same query as in `listview_query.md`, but with extra fields which are used for filtering.
<br> The request body will be as following, with example for all filters.
```
{
    "areRelationResultsMandatory": true,
    "inputFields":
    {
        "partyId_fld0_op": "greaterThanEqualTo",
        "partyId_fld0_value": "10000000",

        "partyId_fld1_op": "lessThanEqualTo",
        "partyId_fld1_value": "99999999" <-- ADD COMMA HERE IF THERE ARE FILTER ELEMENTS ADDED

        $HERE_COMES_THE_EXTRA_PARTYGROUP_FILTER_ELEMENTS
    },
    "fieldList": ["partyId", "groupName"],
    "entityRelations": {
        "_toMany_PartyContactMech": {
            "areRelationResultsMandatory": false, <-- THIS MUST BE TRUE IF CITY FILTER IS USED
            "fieldList":["contactMechId"],
            "entityRelations" : {
                "_toOne_PostalAddress": {
                    "areRelationResultsMandatory": false, <-- THIS MUST BE TRUE IF CITY FILTER IS USED
                    "inputFields": {
                        "city_fld0_op": "contains",
                        "city_fld0_value": "tallinn",
                        "city_fld0_ic": "Y",

                        "city_fld1_op": "contains",
                        "city_fld1_value": "tartu",
                        "city_fld1_ic": "Y" <-- ADD COMMA HERE IF THERE ARE FILTER ELEMENTS ADDED

                        BASCIALLY FOR CITY ONE FILTER CAN BE USED, AS THEY ARE `AND` TOGETHER ...
                    },
                    "fieldList":["city"]
                }
            }
        },
        "_toMany_PartyQuarter": {
            "areRelationResultsMandatory": false, <-- THIS MUST BE TRUE IF REVENUE OR NR OF EMPLOYEES FILTER IS USED
            "inputFields": {
                "periodType_fld0_op": "like",
                "periodType_fld0_value": "year",

                "year__fld0_op": "equals",
                "year__fld0_value": "2019" <-- ADD COMMA HERE IF THERE ARE FILTER ELEMENTS ADDED

                HERE_COMES_THE_EXTRA_PARTYQUARTER_FILTER_ELEMENTS_FOR_REVENUE_OR_AND_NR_OF_EMPLOYEES
            },
            "fieldList":["revenue", "numberOfEmployees"]
        }
    }
}
```

The response will be the same as in `listview_query.md`, but only filtered

The filter elements, must be with increasing numeration and it is field dependent. In beginning it can be seen that `partyId_fld*` is increasing, as there are two filters per one field.

Suggestions:
* Use map for all fields and init their fields to ()
  * partyID (2, as there are 2 filtering elements already used for range 1000 0000 - 9999 9999)
  * groupName (0)
  * city (0)
  * revenue (0)
  * numberOfEmployees (0)
* Build the following filters to separate lists, and add them to the correct place in code and if these lists are not empty, then set the corresponing `areRelationResultsMandatory` true.
* The `getFilterFromComponent()` method inside `header.js` already gives the list of all filter elements, but they need to be rebuilt to fit the style.

More info regarding the query can be found [here](https://github.com/tutinformatics/ofbiz/blob/trunk/docs/generic-rest-endpoint.md) and [here](https://github.com/tutinformatics/ofbiz/blob/trunk/docs/performfind-service.md).

