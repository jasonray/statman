/**
 * Created by jasonray on 12/17/16.
 */
function NumbericList( ) {
   this._values = [];
}

NumbericList.prototype.push = function(value) {
    this._values.push(value);
};

module.exports = NumbericList;