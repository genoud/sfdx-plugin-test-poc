import { Org } from '@salesforce/core';
import { ListMetadataQuery } from 'jsforce';

export default class MetadataUtils {
  public constructor(private org: Org) {}

  public async getMetadataList(type: string = 'CustomObject') {
    const query: ListMetadataQuery = {
      type
    };
    return await this.org.getConnection().metadata.list(query);
  }
}
