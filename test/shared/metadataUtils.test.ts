import { expect, test } from "@salesforce/command/lib/test";
import MetadataUtils from "../../src/shared/metadataUtils";
// import { Metadata } from "jsforce";
import { testSetup } from "@salesforce/core/lib/testSetup";

import * as jsforce from "jsforce";
import { FileProperties } from "jsforce";
import { Connection, AuthInfo, Org } from "@salesforce/core";
// import { ensureJsonMap, ensureString } from "@salesforce/ts-types";
// import sinon = require("sinon");

// Setup the test environment.
const $$ = testSetup();

describe("getMetadataList", () => {
  /* let requestMock: sinon.SinonStub;
  let listMok: sinon.SinonStub;
  let initializeStub: sinon.SinonStub; */

  const testConnectionOptions = { loginUrl: "connectionTest/loginUrl" };

  const testAuthInfo = {
    isOauth: () => true,
    getConnectionOptions: () => testConnectionOptions
  };

  beforeEach(() => {
    $$.SANDBOXES.CONNECTION.restore();
    $$.SANDBOX.stub(jsforce.Connection.prototype, "initialize").returns();
    $$.SANDBOX.stub(jsforce.Connection.prototype, "request")
      .onFirstCall()
      .returns(Promise.resolve([{ version: "42.0" }]));
  });

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

  test.it(
    "calls MetadataUtils.getMetadataList",
    async ctx => {
      const org: Org = await Org.create({
        connection: await Connection.create({
          authInfo: testAuthInfo as AuthInfo
        })
      });
      $$.SANDBOX.stub(org.getConnection().metadata, "list")
        .onFirstCall()
        .returns(Promise.resolve([fileProperties]));

      let utils: MetadataUtils = new MetadataUtils(org);
      let result = await utils.getMetadataList();

      expect(result).length(1, "Should be 1");

      /*
        $$.SANDBOX.stub(jsforce);
        let connection= Connection.create({authInfo: testAuthInfo as AuthInfo});
        $$.TEST_LOGGER.debug('Test');
      
        const conn = await Connection.create({ authInfo: testAuthInfo as AuthInfo });
        $$.SANDBOX.stub(ctx.orgs['test2@org.com'], "getConnection")
          .onFirstCall()
          .returns(conn);
        $$.SANDBOX.stub(ctx.orgs['test2@org.com'].getConnection().metadata.prototype, "list")
          .onFirstCall()
          .returns(Promise.resolve([fileProperties]));

          // console.log(ctx);

          try{
            let output= Metadata.run(["--targetusername",
            "test2@org.com",
            "--type",
            "CustomObject"]);
            expect(output).to.contain("");
          }
          catch(err){
            console.log('Request ...');
            console.log(requestCtx);
          }

          */

      // expect(ctx.stdout).to.contain('METADATA - TestObject__c : objects/TestObject__c.object : CustomObject');
    }
  );
});
