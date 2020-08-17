This query will give all companies in the database with address (more than one, but first one could be used) and with 2019 year data for revenue and nr of people.

Do a POST request to URL `api/generic/v1/entityquery/PartyGroup`
<br> with body
```
{
    "year": "INSERTED_YEAR",
    "quarter": "INSERTED_QUARTER",
    "sourceOfData": "INSERTERD_VALUE",
    "timestamp": "GENERATED_TIMESTAMP_BY_FRONT",
    "listOfQuarterInfo": [
        {
            DATA_FROM_IMPORTED_FILE_FOR_COMPANY
        },
        {
            DATA_FROM_IMPORTED_FILE_FOR_ANOTHER_COMPANY
        },
        ...
    ]
}
```
