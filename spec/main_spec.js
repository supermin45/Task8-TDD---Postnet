"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");

describe("PostNet encode and decode", function(){
    sinon.spy(console, 'log');

    it("it returns the barcode string given the five digit post number", function(){

        var result = main('95713');
        var expect_string = '| |:|:: :|:|: |:::| :::|| ::||: :|:|: |';
        
        expect(expect_string).to.equal(result);
    });

    it("it returns the barcode string given the nine digit post number", function(){

        var result = main('957139571');
        var expect_string = '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |';

        expect(expect_string).to.equal(result);
    });

    it("it returns the barcode string given the ten digit post number", function(){

        var result = main('95713-9571');
        var expect_string = '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |';

        expect(expect_string).to.equal(result);
    });

    it("it returns the post number given the six digit barcode string", function(){

        let str = '| |:|:: :|:|: |:::| :::|| ::||: :|:|: |';
        var result = main(str);
        var expect_string = '95713';

        expect(expect_string).to.equal(result);
    });

    it("it returns the post number given the ten digit barcode string", function(){

        let str = '| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |';
        var result = main(str);
        var expect_string = '95713-9571';

        expect(expect_string).to.equal(result);
    });

});
