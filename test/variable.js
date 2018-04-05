const Reverter = require('./helpers/reverter');
const Asserts = require('./helpers/asserts');
const Variable = artifacts.require('Variable');

contract('Variable', function(accounts) {
    const reverter = new Reverter(web3);
    afterEach('revert', reverter.revert);

    let variable;
    
    before('setup', () => {
        return Variable.deployed()
            .then(instance => variable = instance)
            .then(reverter.snapshot);
    });


    it('change value', async function() {
        const account = web3.eth.accounts[0];

        let value = (await variable.getValue.call()).toNumber();
        assert.equal(value, 0);

        value = (await variable.setValue.call(10, {from: account})).toNumber();
        assert.equal(value, 10);

        value = (await variable.addValue.call(20, {from: account})).toNumber();
        assert.equal(value, 30); // 20 !!!!

        value = (await variable.mulValue.call(40)).toNumber();
        assert.equal(value, 1200);

        value = (await variable.getValue.call()).toNumber();
        assert.equal(value, 1200);
    });


    it('change value with tx', async function() {
        const account = web3.eth.accounts[3];

        let value = (await variable.getValue.call()).toNumber();
        assert.equal(value, 0);

        value = (await variable.setValue.call(10)).toNumber();
        assert.equal(value, 10);

        let result = await variable.sendTransaction({ from: web3.eth.accounts[0], gas: 3000000, value: 100});

        value = (await variable.getValue.call()).toNumber();
        assert.equal(value, 110); // 100 !!!!

        value = (await variable.addValue.call(20, {from: account})).toNumber();
        assert.equal(value, 120);

        value = (await variable.mulValue.call(40)).toNumber();
        assert.equal(value, 4800); // 4000
    });
});