# hmrc-gift-aid-nodejs
See https://github.com/JustinBusschau/hmrc-gift-aid#some-notes-on-the-library-and-data-persistance

```Javascript
let authorised_official = {
  'title': 'Mr',
  'name': 'Rex',
  'surname': 'Muck',
  'phone': '077 1234 5678',
  'postcode': 'SW1A 1AA'
};

let charity = {
  'name': 'A charitible organisation',
  'id': 'AB12345',
  'reg_no': '2584789658',
  'regulator': 'CCEW'
};

let claim_items = [
  {
    'donation_date': '2014-01-01',
    'title': 'Mr',
    'first_name': 'Jack',
    'last_name': 'Peasant',
    'house_no': '3',
    'postcode': 'EC1A 2AB',
    'amount': '123.45'
  },
  {
    'donation_date': '2014-01-01',
    'title': 'Mrs',
    'first_name': 'Josephine',
    'last_name': 'Peasant',
    'house_no': '3',
    'postcode': 'EC1A 2AB',
    'amount': '876.55'
  }
];

let period_end = '2014-01-01';
```
