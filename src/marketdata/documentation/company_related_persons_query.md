Do a POST request to URL `api/generic/v1/entityquery/PartyRelationship`
<br> with body
```
{
     "inputFields":
     {
         "partyIdFrom": "INSERT_COMPANY_CODE_HERE"
     },
     "fieldList": ["partyIdTo"]
}
```

The response will be something like this
```
[
    {
        "partyIdTo": "ONE_RELATED_PERSON_PARTY_ID"
    },
    {
        "partyIdTo": "ANOTHER_RELATED_PERSON_PARTY_ID"
    }
]
```
Now one must take these `PARTY_ID`s and make another GET request for all of them to
<br>`api/generic/v1/entities/Person?partyId=PARTY_ID`
<br> to get persons' info ...
