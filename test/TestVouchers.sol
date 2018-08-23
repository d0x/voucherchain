pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vouchers.sol";

contract TestVouchers {

    // add some ether for the test account
    // https://truffleframework.com/docs/truffle/testing/writing-tests-in-solidity#testing-ether-transactions
    uint public initialBalance = 2 ether;

    string exampleTitle = "Premium Burger";
    string exampleDescription = "You'll get a free Burger at the Block Buger Chain House.";
    uint examplePrice = 1 ether;

    // I've added a few vouchers with the 2_deploy_contracts.js.
    // In case you like to manipulate the examples, you can adjust this
    // variable so that all the tests will pass.
    uint examplesAddedDuringMigrations = 3;

    Vouchers vouchers = Vouchers(DeployedAddresses.Vouchers());

    // Shows that the integration with the Ownable form open zeppelin works
    function test_contract_owner_is_set() public {
        address actual = vouchers.owner();
        Assert.isNotZero(actual, "There should be an owner");
    }

    // Shows that the integration with the ContactInformation from open zeppelin works
    function test_contact_information() public {
        string memory actual = vouchers.contactInformation();
        Assert.isNotZero(bytes(actual).length, "There should be some sort of contact information");
    }

    // Shows that I can read data from the chain
    function test_that_example_vouchers_are_present() public {
        // I've put two example vouchers over migrations/2_deploy_contracts.js
        uint actual = vouchers.getCount();
        Assert.equal(actual, examplesAddedDuringMigrations, "Count should be correct");
    }

    // Shows that I can put data in the chain
    function test_insert_voucher() public {
        uint index = vouchers.insert(exampleTitle, exampleDescription, examplePrice);
        Assert.equal(index, examplesAddedDuringMigrations, "It should be on the correct index.");
    }

    function test_count_after_insert() public {
        Assert.equal(vouchers.getCount(), examplesAddedDuringMigrations + 1, "After insert there should be one more element");
    }

    function test_insert_second_voucher() public {
        uint index = vouchers.insert("Block Stone Massage", "Relief your chain with a perfect block stone massage.", 300 finney);
        Assert.equal(index, examplesAddedDuringMigrations + 1, "It should be on the last index");
        Assert.equal(vouchers.getCount(), examplesAddedDuringMigrations + 2, "All Vouchers should be present");
    }

    function test_voucher_isnt_sold_has_no_buyer_and_correct_data() public {
        (address owner,
        address buyer,
        string memory title,
        string memory description,
        bool sold,
        bool revoked,
        uint price) = vouchers.get(examplesAddedDuringMigrations);

        Assert.isFalse(sold, "Initial Voucher state check");
        Assert.isFalse(revoked, "Initial Voucher state check");
        Assert.isNotZero(owner, "Owner should be set");
        Assert.isZero(buyer, "Initial Voucher state check");
        Assert.equal(title, exampleTitle, "Initial Voucher state check");
        Assert.equal(description, exampleDescription, "Initial Voucher state check");
        Assert.equal(price, examplePrice, "Initial Voucher state check");
    }

    // That should show that sending ehter working fine. But because of some
    // solidity test restriction this isn't possible
    function test_buy_voucher() public {
        // This test doesn't run as long as
        // vouchers[index].owner.transfer(msg.value);
        // isn't commented out in Vouchers.sol

        // vouchers.buy.value(1 ether)(0);
        //
        // (, address buyer,,, bool sold, bool revoked, uint price) = vouchers.get(0);
        // Assert.isTrue(sold, "Should be sold after buy");
        // Assert.isFalse(revoked, "Can't be revoked when bought");
        // Assert.isNotZero(buyer, "Buyer should be set");

        // More complex buyer and owner address tests (like switching accounts) can't be easly be done. See:
        // https://github.com/trufflesuite/truffle/issues/644
    }

    function test_pay_not_engouh() public {
        // To expect exceptions some handwork is required.
        // It could be done like this: https://truffleframework.com/tutorials/testing-for-throws-in-solidity-tests
        // But this is out of scope.
    }

    function test_revoke_voucher() public {
        uint index = examplesAddedDuringMigrations + 1;
        vouchers.revoke(index);

        // in case you are using IntelliJ you maye see an error in this line.
        // But it's common syntax and it works fine with "truffle test"
        // See: https://solidity.readthedocs.io/en/develop/control-structures.html?highlight=tuple#destructuring-assignments-and-returning-multiple-values
        (,,,,, bool revoked,) = vouchers.get(index);

        Assert.isTrue(revoked, "Should be deleted");
    }
}
