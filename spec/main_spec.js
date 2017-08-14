"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var postNet = require("../lib/main.js");

describe("PostNet encode and decode", function () {
    sinon.spy(console, 'log');

    it("it returns the encoded barcode string given the post number", function () {

        var inputs = ['95713', '957139571', '95713-9571'];
        var expect_string = ['| |:|:: :|:|: |:::| :::|| ::||: :|:|: |', '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |', '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |'];

        inputs.forEach((input, i) => {
            var result = postNet.postEncode(input);
            expect(expect_string[i]).to.equal(result);
        });
    });


    it("it returns the decoded post number given the barcode string", function () {

        var inputs = ['| |:|:: :|:|: |:::| :::|| ::||: :|:|: |', '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |'];
        var expect_string = ['95713', '95713-9571'];

        inputs.forEach((input, i) => {
            var result = postNet.postDecode(input);
            expect(expect_string[i]).to.equal(result);
        });
    });

    it("it returns the encoded barcode string or the decoded post number given the post number or barcode string", function () {

        var inputs = ['95713', '957139571', '95713-9571', '| |:|:: :|:|: |:::| :::|| ::||: :|:|: |', '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |']
        var expect_string = ['| |:|:: :|:|: |:::| :::|| ::||: :|:|: |', '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |', '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |', '95713', '95713-9571'];

        inputs.forEach((input, i) => {
            var result = postNet.main(input);
            expect(expect_string[i]).to.equal(result);
        });
    });
});
