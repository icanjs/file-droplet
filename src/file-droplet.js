import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './file-droplet.less!';
import template from './file-droplet.stache!';
import dragAndDrop from 'drag-and-drop-files';


export const ViewModel = Map.extend({
  define: {
    /**
     * fileTypes is a map containing lists of file types, keyed by extension.
     * @type {Object}
     */
    fileTypes: {
      get(){
        var files = this.attr('files').attr();
        var fileGroups = {};

        function addToList(listName, file){
          if (!fileGroups[listName] || !fileGroups[listName].length) {
            fileGroups[listName] = [];
          }
          fileGroups[listName].push(file);
        }
        if (files.length) {
          files.forEach(function(file){
            var p = file.name.lastIndexOf('.');
            if (p >= 0) {
              var ext = file.name.substring(p + 1);
              addToList(ext, file);
            } else {
              addToList('other', file);
            }
          });
        }

        return fileGroups;
      }
    },

    /**
     * A virtual property that returns the newest list added to the batches property.
     * @type {Array}
     */
    lastFileBatch: {
      get(){
        return this.attr('batches').attr(this.attr('batches.length') - 1);
      }
    }
  },

  // The master list of files.
  files: [],

  /**
   * batches is an array of each dropped batch of files.
   * @type {Array}
   */
  batches: [],
});

export default Component.extend({
  tag: 'file-droplet',
  viewModel: ViewModel,
  template,
  events: {
    // Sets up the drag/drop bindings and adds any dropped files to the viewModel's files.
    init(element){
      var self = this;
      dragAndDrop(element[0], function(files) {
        // Add all files to the main list.
        var list = self.viewModel.attr('files');
        list.push.apply(list, files);

        // Add this set of files to the batches.
        var batches = self.viewModel.attr('batches');
        batches.push(files);
      });
    }
  }
});
