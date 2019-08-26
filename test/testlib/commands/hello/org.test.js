"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@salesforce/command/lib/test");
const ts_types_1 = require("@salesforce/ts-types");
describe('hello:org', () => {
    test_1.test
        .withOrg({ username: 'test@org.com' }, true)
        .withConnectionRequest(request => {
        console.log(request);
        const requestMap = ts_types_1.ensureJsonMap(request);
        if (ts_types_1.ensureString(requestMap.url).match(/Organization/)) {
            return Promise.resolve({ records: [{ Name: 'Super Awesome Org', TrialExpirationDate: '2018-03-20T12:24:11.000+0000' }] });
        }
        return Promise.resolve({ records: [] });
    })
        .stdout()
        .command(['hello:org', '--targetusername', 'test@org.com'])
        .it('runs hello:org --targetusername test@org.com', ctx => {
        test_1.expect(ctx.stdout).to.contain('Hello world! This is org: Super Awesome Org and I will be around until Tue Mar 20 2018!');
    });
});
//# sourceMappingURL=org.test.js.map