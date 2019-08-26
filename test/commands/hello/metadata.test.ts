import { expect, test } from "@salesforce/command/lib/test";
import Metadata from '../../../src/commands/hello/metadata'
//import { Metadata } from "jsforce";
import { testSetup, MockTestOrgData } from "@salesforce/core/lib/testSetup";

//import * as jsforce from "jsforce";
//import { FileProperties } from "jsforce";
//import { Connection, AuthInfo } from "@salesforce/core";
import { Org, Connection, AuthInfo } from "@salesforce/core";
import { FileProperties } from "jsforce";
import MetadataUtils from "../../../src/shared/metadataUtils";
//import sinon = require("sinon");


// Setup the test environment.
const $$ = testSetup();

describe("hello:metadata", () => {
  
  const testData = new MockTestOrgData();

  const fileProperties: FileProperties = {
    type: "CustomObject",
    createdById: "005123456",
    createdByName: "Test User",
    createdDate: "2019-08-12",
    fileName: "objects/TestObject__c.object",
    fullName: "TestObject__c",
    id: "22323232",
    lastModifiedById: "",
    lastModifiedByName: "",
    lastModifiedDate: ""
  };
  
  test
    .it(
      "runs hello:metadata --targetusername test@org.com --type CustomObject",
      async (ctx) => {

     
      $$.setConfigStubContents('AuthInfoConfig', {
        contents: await testData.getConfig()
      });
      const auth: AuthInfo = await AuthInfo.create({ username: testData.username });

      const org: Org = await Org.create({
        connection: await Connection.create({
          authInfo: auth
        })
      });
      $$.SANDBOX.stub(org.getConnection().metadata, "list")
        .onFirstCall()
        .returns(Promise.resolve([fileProperties]));

      $$.SANDBOX.stub(MetadataUtils.prototype, 'getMetadataList').returns(Promise.resolve([fileProperties]));
      $$.SANDBOX.stub(Org, 'create').returns(Promise.resolve(org));
        
        let output= await Metadata.run(["--targetusername",
          'hehe',
          "--type",
          "CustomObject"]);
        expect(output).to.length(1,"SHould be One");
        expect(output).to.deep.include(fileProperties);
      }
    );
});
