import { APIEndpoint, APICategory } from '../types/api';

export const apiCategories: APICategory[] = [
  {
    name: 'Authentication',
    description: 'User authentication and authorization endpoints',
    endpoints: [
      {
        method: 'POST',
        path: '/auth/token',
        description: 'Generate an access token',
        authentication: {
          type: 'Basic Auth',
          description: 'Client ID and Secret required'
        },
        rateLimit: {
          requests: 100,
          period: '1 minute'
        },
        request: {
          body: {
            grant_type: 'string',
            username: 'string',
            password: 'string',
            scope: 'string?'
          },
          example: {
            grant_type: 'password',
            username: 'user@example.com',
            password: 'secret123',
            scope: 'read write'
          }
        },
        response: {
          '200': {
            description: 'Successfully generated token',
            schema: {
              access_token: 'string',
              token_type: 'string',
              expires_in: 'number',
              refresh_token: 'string'
            },
            example: {
              access_token: 'eyJhbGciOiJIUzI1NiIs...',
              token_type: 'Bearer',
              expires_in: 3600,
              refresh_token: 'def502...'
            }
          },
          '400': {
            description: 'Invalid request parameters',
            schema: {
              error: 'string',
              error_description: 'string'
            }
          },
          '401': {
            description: 'Invalid credentials',
            schema: {
              error: 'string',
              error_description: 'string'
            }
          }
        }
      },
      {
        method: 'POST',
        path: '/auth/refresh',
        description: 'Refresh an expired access token',
        authentication: {
          type: 'None',
          description: 'No authentication required'
        },
        rateLimit: {
          requests: 100,
          period: '1 minute'
        },
        request: {
          body: {
            refresh_token: 'string'
          },
          example: {
            refresh_token: 'def502...'
          }
        },
        response: {
          '200': {
            description: 'Successfully refreshed token',
            schema: {
              access_token: 'string',
              token_type: 'string',
              expires_in: 'number',
              refresh_token: 'string'
            }
          },
          '400': {
            description: 'Invalid refresh token',
            schema: {
              error: 'string',
              error_description: 'string'
            }
          }
        }
      }
    ]
  },
  {
    name: 'Payments',
    description: 'Payment processing and management endpoints',
    endpoints: [
      {
        method: 'POST',
        path: '/payments/charge',
        description: 'Process a payment charge',
        authentication: {
          type: 'Bearer Token',
          description: 'Valid access token required'
        },
        rateLimit: {
          requests: 1000,
          period: '1 minute'
        },
        request: {
          body: {
            amount: 'number',
            currency: 'string',
            payment_method: 'string',
            description: 'string?',
            metadata: 'object?'
          },
          example: {
            amount: 2000,
            currency: 'USD',
            payment_method: 'pm_card_visa',
            description: 'Subscription payment',
            metadata: {
              order_id: '12345'
            }
          }
        },
        response: {
          '200': {
            description: 'Payment processed successfully',
            schema: {
              id: 'string',
              amount: 'number',
              currency: 'string',
              status: 'string',
              created: 'number'
            },
            example: {
              id: 'ch_1234567890',
              amount: 2000,
              currency: 'USD',
              status: 'succeeded',
              created: 1677721600
            }
          },
          '400': {
            description: 'Invalid request parameters',
            schema: {
              error: {
                code: 'string',
                message: 'string'
              }
            }
          },
          '402': {
            description: 'Payment failed',
            schema: {
              error: {
                code: 'string',
                message: 'string',
                decline_code: 'string?'
              }
            }
          }
        }
      },
      {
        method: 'POST',
        path: '/payments/refund',
        description: 'Refund a payment',
        authentication: {
          type: 'Bearer Token',
          description: 'Valid access token with refund:write scope required'
        },
        rateLimit: {
          requests: 100,
          period: '1 minute'
        },
        request: {
          body: {
            payment_id: 'string',
            amount: 'number?',
            reason: 'string?'
          },
          example: {
            payment_id: 'ch_1234567890',
            amount: 1000,
            reason: 'customer_request'
          }
        },
        response: {
          '200': {
            description: 'Refund processed successfully',
            schema: {
              id: 'string',
              payment_id: 'string',
              amount: 'number',
              status: 'string',
              created: 'number'
            }
          },
          '400': {
            description: 'Invalid request parameters',
            schema: {
              error: {
                code: 'string',
                message: 'string'
              }
            }
          },
          '404': {
            description: 'Payment not found',
            schema: {
              error: {
                code: 'string',
                message: 'string'
              }
            }
          }
        }
      }
    ]
  },
  {
    name: 'Analytics',
    description: 'Data analytics and reporting endpoints',
    endpoints: [
      {
        method: 'GET',
        path: '/analytics/events',
        description: 'Retrieve analytics events',
        authentication: {
          type: 'Bearer Token',
          description: 'Valid access token with analytics:read scope required'
        },
        rateLimit: {
          requests: 1000,
          period: '1 minute'
        },
        request: {
          query: {
            start_date: 'string (ISO 8601)',
            end_date: 'string (ISO 8601)',
            event_type: 'string?',
            limit: 'number?',
            offset: 'number?'
          },
          example: '?start_date=2024-01-01T00:00:00Z&end_date=2024-01-31T23:59:59Z&event_type=purchase&limit=100'
        },
        response: {
          '200': {
            description: 'Events retrieved successfully',
            schema: {
              data: 'array',
              meta: {
                total: 'number',
                limit: 'number',
                offset: 'number'
              }
            },
            example: {
              data: [
                {
                  id: 'evt_123',
                  type: 'purchase',
                  timestamp: '2024-01-15T10:30:00Z',
                  properties: {
                    amount: 50,
                    product_id: 'prod_123'
                  }
                }
              ],
              meta: {
                total: 150,
                limit: 100,
                offset: 0
              }
            }
          },
          '400': {
            description: 'Invalid query parameters',
            schema: {
              error: {
                code: 'string',
                message: 'string'
              }
            }
          }
        }
      }
    ]
  }
];