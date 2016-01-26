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
        var files = this.attr('files');
        var length = this.attr('files.length');
        var fileGroups = {};

        function addToList(listName, file){
          if (!fileGroups[listName] || !fileGroups[listName].length) {
            fileGroups[listName] = [];
          }
          fileGroups[listName].push(file);
        }
        if (length) {
          files.each(function(file){
            var p = file.attr('name').lastIndexOf('.');
            if (p >= 0) {
              var ext = file.attr('name').substring(p + 1);
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
        // Wrap each file in a map and add it to the main list.
        var list = self.viewModel.attr('files');
        files.forEach((file, index) => {
          let item = new can.Map({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            file: file
          });
          list.push(item);
        });

        // Add this set of files to the batches.
        var batches = self.viewModel.attr('batches');
        batches.push(files);
      });
    }
  }
});
