import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import MetadataUtils from '../../shared/metadataUtils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-test', 'metadata');

export default class Metadata extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx hello:metadata --targetusername myOrg@example.com --type CustomObject
  List of Custom Objects
  Account
  Case
  `
  ];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    type: flags.string({char: 't', description: messages.getMessage('typeFlagDescription')}),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const type = this.flags.type || '';

    if(type===''){
        throw new Error('Provide metadata type');
    }
    
    let metadataUtils = new MetadataUtils(this.org);

    let metadataList= await metadataUtils.getMetadataList(type);
      
    //console.log(metadataList);
    metadataList.forEach(file=>{
        this.log(`METADATA - ${file.fullName} : ${file.fileName} : ${file.type}`);
    })
    
    // Return an object to be displayed with --json
    return  JSON.parse(JSON.stringify(metadataList));
  }
}
