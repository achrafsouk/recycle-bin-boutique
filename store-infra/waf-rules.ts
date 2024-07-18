import * as waf from "aws-cdk-lib/aws-wafv2";

export const wafRules = [

  {
    Name: "CUSTOM_reduce-surface-attack-apis",
    Priority: 1,
    Action: { Block: {} },
    Statement: {
      OrStatement: {
        Statements: [
          {
            ByteMatchStatement: {
              FieldToMatch: { UriPath: {} },
              PositionalConstraint: "STARTS_WITH",
              SearchString: "/api/product",
              TextTransformations: [
                {
                  Priority: 0,
                  Type: "LOWERCASE"
                }
              ]
            }
          },
          {
            ByteMatchStatement: {
              FieldToMatch: { UriPath: {} },
              PositionalConstraint: "STARTS_WITH",
              SearchString: "/api/products",
              TextTransformations: [
                {
                  Priority: 0,
                  Type: "LOWERCASE"
                }
              ]
            }
          },
        ]
      }

    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "reduce-surface-attack-apis",
    },
  },
  {
    Name: "MANAGED_malicious-ips-vpn-tor-hosting-providers",
    Priority: 2,
    Statement: {
      ManagedRuleGroupStatement: {
        VendorName: "AWS",
        Name: "AWSManagedRulesAnonymousIpList",
        RuleActionOverrides: [
          {
            ActionToUse: {
              Captcha: {}
            },
            Name: 'AnonymousIPList'
          },
          {
            ActionToUse: {
              Captcha: {}
            },
            Name: 'HostingProviderIPList'
          },
        ]
      },
    },
    OverrideAction: { None: {} },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "MANAGED_malicious-ips-vpn-tor-hosting-providers",
    },
  },
  {
    Name: "MANAGED_malicious-ips-ddos-scanners",
    Priority: 3,
    Statement: {
      ManagedRuleGroupStatement: {
        VendorName: "AWS",
        Name: "AWSManagedRulesAmazonIpReputationList",
        RuleActionOverrides: [
          {
            ActionToUse: {
              Block: {}
            },
            Name: 'AWSManagedIPDDoSList'
          },
        ]
      },
    },
    OverrideAction: { None: {} },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "MANAGED_malicious-ips-ddos-scanners",
    },
  },
  {
    Name: "CUSTOM_rate_limit_IP_400",
    Priority: 4,
    Statement: {
      RateBasedStatement: {
        AggregateKeyType: "IP",
        Limit: 400,
        EvaluationWindowSec: 60
      },
    },
    Action: {
      Block: {}
    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "BlanketRateLimit",
    },
  },
  {
    Name: "MANAGED_general_bot_protection",
    Priority: 5,
    OverrideAction: { None: {} },
    Statement: {
      ManagedRuleGroupStatement: {
        VendorName: "AWS",
        Name: "AWSManagedRulesBotControlRuleSet",
        ManagedRuleGroupConfigs: [
          {
            AWSManagedRulesBotControlRuleSet: { InspectionLevel: "TARGETED" }
          }
        ],
        RuleActionOverrides: [
          {
            ActionToUse: {
              Block: {}
            },
            Name: "TGT_TokenReuseIp"
          },
          {
            ActionToUse: {
              Captcha: {}
            },
            Name: "TGT_ML_CoordinatedActivityHigh"
          },
        ],
      },
    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "MANAGED_general_bot_protection",
    },
  },
  {
    Name: "CUSTOM_Block-requests-to-apis-with-non-valid-tokens",
    Priority: 6,
    Action: { Block: {} },
    Statement: {
      AndStatement: {
        Statements: [
          {
            OrStatement: {
              Statements: [
                {
                  LabelMatchStatement: {
                    Scope: 'LABEL',
                    Key: 'awswaf:managed:token:absent'
                  }
                },
                {
                  LabelMatchStatement: {
                    Scope: 'LABEL',
                    Key: 'awswaf:managed:token:rejected'
                  }
                }
              ]
            }
          },
          {
            OrStatement: {
              Statements: [
                {
                  ByteMatchStatement: {
                    FieldToMatch: { UriPath: {} },
                    PositionalConstraint: "STARTS_WITH",
                    SearchString: "/api/login",
                    TextTransformations: [
                      {
                        Priority: 0,
                        Type: "LOWERCASE"
                      }
                    ]
                  }
                },
                {
                  ByteMatchStatement: {
                    FieldToMatch: { UriPath: {} },
                    PositionalConstraint: "STARTS_WITH",
                    SearchString: "/api/register",
                    TextTransformations: [
                      {
                        Priority: 0,
                        Type: "LOWERCASE"
                      }
                    ]
                  }
                },
                {
                  ByteMatchStatement: {
                    FieldToMatch: { UriPath: {} },
                    PositionalConstraint: "STARTS_WITH",
                    SearchString: "/api/profile",
                    TextTransformations: [
                      {
                        Priority: 0,
                        Type: "LOWERCASE"
                      }
                    ]
                  }
                },
              ]
            }
          },
        ]
      }

    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "CUSTOM_Block-requests-to-apis-with-non-valid-tokens",
    },
  },
  {
    Name: "MANAGED_account-takover-prevention-login-api",
    Priority: 7,
    Statement: {
      ManagedRuleGroupStatement: {
        VendorName: "AWS",
        Name: "AWSManagedRulesATPRuleSet",
        ScopeDownStatement: {
          ByteMatchStatement: {
            FieldToMatch: { UriPath: {} },
            PositionalConstraint: "STARTS_WITH",
            SearchString: "/api/login",
            TextTransformations: [
              {
                Priority: 0,
                Type: "LOWERCASE"
              }
            ]
          }
        },
        ManagedRuleGroupConfigs: [
          {
            AWSManagedRulesATPRuleSet: {
              LoginPath: '/api/login',
              RequestInspection: {
                PasswordField: {
                  Identifier: '/password',
                },
                PayloadType: 'JSON',
                UsernameField: {
                  Identifier: '/username',
                },
              },
              ResponseInspection: {
                StatusCode: {
                  SuccessCodes: [200],
                  FailureCodes: [401]
                }
              }
            }
          }
        ]
      },
    },
    OverrideAction: { None: {} },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "MANAGED_account-takover-prevention-login-api",
    },
  }
  , {
    Name: "CUSTOM_Block-logins-with-compromised-credentials",
    Priority: 8,
    Action: { Block: {} },
    Statement: {
      LabelMatchStatement: {
        Scope: 'LABEL',
        Key: 'awswaf:managed:aws:atp:signal:credential_compromised'
      }
    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "CUSTOM_Block-logins-with-compromised-credentials",
    },
  },
  {
    Name: "MANAGED_fake-account-creation-prevention",
    Priority: 9,
    Statement: {
      ManagedRuleGroupStatement: {
        VendorName: "AWS",
        Name: "AWSManagedRulesACFPRuleSet",
        ScopeDownStatement: {
          ByteMatchStatement: {
            FieldToMatch: { UriPath: {} },
            PositionalConstraint: "STARTS_WITH",
            SearchString: "/api/register",
            TextTransformations: [
              {
                Priority: 0,
                Type: "LOWERCASE"
              }
            ]
          }
        },
        ManagedRuleGroupConfigs: [
          {
            AWSManagedRulesACFPRuleSet: {
              CreationPath: '/api/register',
              RegistrationPagePath: '/register',
              RequestInspection: {
                PasswordField: {
                  Identifier: '/password',
                },
                PayloadType: 'JSON',
                UserNameField: {
                  Identifier: '/username',
                },
                PhoneNumberFields: [{
                  Identifier: '/phone',
                }],
                AddressFields: [{
                  Identifier: '/address',
                }],
              },
              ResponseInspection: {
                StatusCode: {
                  SuccessCodes: [200],
                  FailureCodes: [500]
                }
              }
            }
          }
        ]
      },
    },
    OverrideAction: { None: {} },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "MANAGED_fake-account-creation-prevention",
    },
  },
  {
    Name: "CUSTOM_Block-account-creation-with-medium-volumetricsessionhigh",
    Priority: 10,
    Action: { Block: {} },
    Statement: {
      LabelMatchStatement: {
        Scope: 'LABEL',
        Key: 'awswaf:managed:aws:acfp:aggregate:volumetric:session:creation:medium'
      }
    },
    VisibilityConfig: {
      SampledRequestsEnabled: true,
      CloudWatchMetricsEnabled: true,
      MetricName: "CUSTOM_Block-account-creation-with-medium-volumetricsessionhigh",
    },
  }
] as const;
