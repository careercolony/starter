import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';

@Injectable()
export class ElasticsearchService {

  private client: Client;
  constructor() { 
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'http://elastic:changeme@167.99.156.133:9300/',
      log: 'trace'
    });
  }

  createIndex(name): any {
    return this.client.indices.create(name);
  }
 
  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello JavaSampleApproach!'
    });
  }
 
  addToIndex(value): any {
    return this.client.create(value);
  }
 
  getAllDocumentsWithScroll(_index, _type, _size): any {
    return this.client.search({
      index: _index,
      type: _type,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'size': _size,
        'query': {
          'match_all': {}
        },
        'sort': [
          { '_uid': { 'order': 'asc' } }
        ]
      }
    });
  }
 
  getNextPage(scroll_id): any {
    return this.client.scroll({
      scrollId: scroll_id,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id']
    });
  }
 
  fullTextSearch(_index, _type, _field, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query': {
          'match_phrase_prefix': {
            [_field]: _queryText,
          }
        }
      },
      '_source': ['company_name', 'company_name']
    });
  }

}
