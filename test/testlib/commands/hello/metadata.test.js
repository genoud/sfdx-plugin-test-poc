"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@salesforce/command/lib/test");
const ts_types_1 = require("@salesforce/ts-types");
describe('hello:metadata', () => {
    test_1.test
        .withOrg({ username: 'test2@org.com' }, true)
        .withConnectionRequest(request => {
        const requestMap = ts_types_1.ensureJsonMap(request);
        console.log(requestMap.url);
        //if (ensureString(requestMap.url).match(/CustomObject/)) {
        return Promise.resolve({ records: [{ fullName: 'TestObject__c', fileName: 'objects/TestObject.object', type: 'CustomObject' }] });
        //}
        //return Promise.resolve({ records: [] });
    })
        .stdout()
        .command(['hello:metadata', '--targetusername', 'test2@org.com', '--type', 'CustomObject'])
        .it('runs hello:metadata --targetusername test2@org.com --type CustomObject', ctx => {
        console.log(ctx.stdout);
        test_1.expect(ctx.stdout).to.contain('');
        //expect(ctx.stdout).to.contain('METADATA - TestObject__c : objects/TestObject__c.object : CustomObject');
    });
});
//# sourceMappingURL=metadata.test.js.map