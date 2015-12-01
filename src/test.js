import QUnit from 'steal-qunit';
import * as FileDroplet from './file-droplet';
import $ from 'jquery';
import _ from 'ramda';

var vm;

QUnit.module('file-droplet', {
  beforeEach: function(){
    vm = new FileDroplet.VM({});
  }
});

QUnit.test('how to test drag and drop?', function(assert) {

});