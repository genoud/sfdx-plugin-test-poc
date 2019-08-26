import { expect, test } from "@salesforce/command/lib/test";
import MetadataUtils from "../../src/shared/metadataUtils";
import { testSetup } from "@salesforce/core/lib/testSetup";

import { FileProperties } from "jsforce";
import { Connection, AuthInfo, Org } from "@salesforce/core";

const $$ = testSetup();

describe("getMetadataList", () => {

  const testConnectionOptions = { loginUrl: "connectionTest/loginUrl" };

  const testAuthInfo = {
    isOauth: () => true,
    getConnectionOptions: () => testConnectionOptions
  };

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
      expect(result).to.deep.include(fileProperties);
    }
  );
});
