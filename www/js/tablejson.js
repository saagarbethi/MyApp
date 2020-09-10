/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null,
      ignoreHiddenRows: true,
      headings: null
    };
    opts = $.extend(defaults, opts);

    var notNull = function(value) {
      if(value !== undefined && value !== null) {
        return true;
      }
      return false;
    };

    var ignoredColumn = function(index) {
      if( notNull(opts.onlyColumns) ) {
        return $.inArray(index, opts.onlyColumns) === -1;
      }
      return $.inArray(index, opts.ignoreColumns) !== -1;
    };

    var arraysToHash = function(keys, values) {
      var result = {};
      $.each(values, function(index, value) {
        if( index < keys.length ) {
          result[ keys[index] ] = value;
        }
      });
      return result;
    };

    var rowValues = function(row) {
      debugger;
      var result = [];
      $(row).children("td,th").each(function(cellIndex, cell) {
         
        if( !ignoredColumn(cellIndex) ) {
          var override = $(cell).data("override");
          var value;
          
          if(cell.children.length>0){
              debugger;
             // value = $.trim($(cell).text());
             var z=cell.children[0].tagName;
//             alert(z);
             if(cell.children[0].type=='text'){
                 value = cell.children[0].value.replace(/&/g,'AND');
             }
             else if(cell.children[0].type=='textarea'){
                 value = cell.children[0].value;
             }
             else if(cell.children[0].type=='checkbox'){
                 if(row.rowIndex==undefined){
                      value = cell.children[0].value;
                 }else{
                      value = cell.children[0].checked ? 1 : 0;
                 }
                
             }
             else if(cell.children[0].tagName=='DIV'){
                 var div = cell.children[0];
                 var data = "";
                   $(div).find(':checkbox').each(function(){
                        if(this.checked ){
                            data += this.id+",";
                        }
                    });   
                    value = data;
             }
             else if(z=='SELECT'){
                 value=cell.children[0].value;
             }
             else if(z=="A"){
                 value=cell.children[0].innerText;
             }
              else if(cell.children[0].type=='color'){
                 value= cell.children[0].value;
             }else{
                 value= cell.innerHTML;
             }
          }else{
              value = $.trim($(cell).text());
              value = value.replace(/&/g,'AND');
              if(value==undefined){
                  value=$.trim($(cell).children(0).textContent.replace(/&/g,'AND'));
              }
          }
           
          result[ result.length ] = notNull(override) ? override : value;
        }
      });
      return result;
    };

    var getHeadings = function(table) {
      var firstRow = table.find("tr:first").first();
      return notNull(opts.headings) ? opts.headings : rowValues(firstRow);
    };

    var construct = function(table, headings) {
      var result = [];
      table.children("tbody,*").children("tr").each(function(rowIndex, row) {
        if( rowIndex !== 0 || notNull(opts.headings) ) {
          if( $(row).is(":visible") || !opts.ignoreHiddenRows ) {
            result[result.length] = arraysToHash(headings, rowValues(row));
          }
        }
      });
      return result;
    };

    // Run
    var headings = getHeadings(this);
    return construct(this, headings);
  };
})( jQuery );


