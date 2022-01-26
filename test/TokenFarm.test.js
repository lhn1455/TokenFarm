const { assert } = require("chai");
const { contracts_build_directory } = require("../truffle-config");

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
    .use(require("chai-as-promised"))
    .should()
function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}
 
contract("TokenFarm", ([owner, investor]) => {
    let daiToken, dappToken, tokenFarm
    before(async () => {
        //Load Contracts
        daiToken = await DaiToken.new() 
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)
 
        //Transfer all Dapp tokens to farm (1million)
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        //Send tokens to investor
        await daiToken.transfer(investor, tokens('100'), { from: owner }) //investor : accounts[1] , owner : accounts[0]
    })


    describe('Mock DAI deployment', async() => {
        it('has a name', async () => {
            const name = await daiToken.name() //DaiToken 컨트랙트에 설정한 컨트랙트 이름
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Dapp Token deployment', async() => {
        it('has a name', async () => {
            const name = await dappToken.name() //DaiToken 컨트랙트에 설정한 컨트랙트 이름
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Farm deployment', async() => {
        it('has a name', async () => {
            const name = await tokenFarm.name() //DaiToken 컨트랙트에 설정한 컨트랙트 이름
            assert.equal(name, 'Dapp Token Farm')
        })
        it('contract has tokens', async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address) //DaiToken 컨트랙트에 설정한 컨트랙트 이름
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })
})