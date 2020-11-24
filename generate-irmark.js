let xml = require('xml');

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

let iRenvelope =
{
  IRenvelope: [
    {
      _attr:
      {
        xmlns: 'http://www.govtalk.gov.uk/taxation/charities/r68/2'
      }
    },
    {
      IRheader:
        [
          {
            Keys:
              [
                {
                  Key:
                    [
                      {
                        _attr:
                        {
                          Type:
                            'CHARID'
                        }
                      },
                      charity['id']
                    ]
                }
              ]
          },
          {
            PeriodEnd:
              period_end
          },
          {
            DefaultCurrency:
              'GBP'
          },
          {
            Sender:
              'Individual'
          }
        ]
    },
    {
      R68:
        [
          {
            AuthOfficial:
              [
                {
                  OffName:
                    [
                      {
                        Ttl:
                          authorised_official['title']
                      },
                      {
                        Fore:
                          authorised_official['name']
                      },
                      {
                        Sur:
                          authorised_official['surname']
                      }
                    ]
                },
                {
                  OffID:
                    [
                      {
                        Postcode:
                          authorised_official['postcode']
                      }
                    ]
                },
                {
                  Phone:
                    authorised_official['phone']
                },
              ]
          },
          {
            Declaration:
              'yes'
          },
          {
            placeholder: ''
          }
        ]
    }
  ]
};

let repayment_items = [];

for (let i = 0; i < 2; i++) {
  repayment_items.push(
    {
      GAD:
        [
          {
            Donor:
              [
                {
                  Ttl:
                    claim_items[i]['title']
                },
                {
                  Fore:
                    claim_items[i]['first_name']
                },
                {
                  Sur:
                    claim_items[i]['last_name']
                },
                {
                  House:
                    claim_items[i]['house_no']
                },
                {
                  Postcode:
                    claim_items[i]['postcode']
                }
              ]
          },
          {
            Date:
              claim_items[i]['donation_date']
          },
          {
            Total:
              claim_items[i]['amount']
          }
        ]
    }
  );
}

repayment_items.push(
  {
    EarliestGAdate:
      period_end
  }
);

let claim = {
  Claim:
    [
      {
        OrgName:
          charity['name']
      },
      {
        HMRCref:
          charity['id']
      },
      {
        Regulator:
          [
            {
              RegName:
                charity['regulator']
            },
            {
              RegNo:
                charity['reg_no']
            }
          ]
      },
      {
        Repayment:
          repayment_items
      },
      {
        GASDS:
          [
            {
              ConnectedCharities:
                'no'
            },
            {
              CommBldgs:
                'no'
            },
          ]
      }
    ]
}

s = xml(iRenvelope, ' ');

s = s.replace(
  '<DefaultCurrency>GBP</DefaultCurrency>',
  '<DefaultCurrency>GBP</DefaultCurrency>\n  '
);

s = s.replace(
  ' </R68>',
  '</R68>'
);

s = s.replace(
  '  <placeholder></placeholder>',
  xml(claim, ' ')
);

s =
  '<Body xmlns="http://www.govtalk.gov.uk/CM/envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
  s +
  '\n</Body>';

var shasum = crypto.createHash('sha1');

shasum.update(s);

base64data = Buffer.from(shasum.digest('binary'), 'binary').toString('base64');

s = s.replace(
  '<DefaultCurrency>GBP</DefaultCurrency>\n  ',
  `<DefaultCurrency>GBP</DefaultCurrency>\n  <IRmark Type="generic">${base64data}</IRmark>`
);

console.log(s);