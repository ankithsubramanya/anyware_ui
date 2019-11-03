
var standard_width = 8;
var standard_length = 20;

var get_num_spaces = function(warehouse_width, warehouse_length){
    var num_rows = 0;
    var num_cols = 0;
    var row_counter = 0;
    for (var col_tally = 0; col_tally <= warehouse_length - standard_length; col_tally += standard_length){
        num_cols++;
    }
    var row_tally = standard_width; //accounting for the top position
    for (row_tally; row_tally <= warehouse_width - standard_length; row_tally += standard_width){
        if (row_counter % 3 == 0){
            row_counter ++;
        } else {
            row_counter++;
            num_rows++;
        }
    }
    return num_rows * num_cols;
}

var create_spaces = async function (warehouse_width, warehouse_length, warehouse_id){
    var col_limit = Math.floor(warehouse_length / standard_length);
    var row_limit = Math.floor(warehouse_width / standard_width);
    var sql = "INSERT ALL";
    for (var col = 1; col <= col_limit; col++){
        for (var row = 1; row <= row_limit; row++){
            var is_road = 0;
            if ((col == col_limit) || (row == row_limit) || (row % 3 == 1)) {
                is_road = 1;
            }
            var idspace = Math.floor(Math.random() * 1000000) + row + col;
            var idwarehouse = warehouse_id;
            var price = 20;
            var dimension_width_inches = 8;
            var dimension_height_inches = 1;
            var dimension_length_inches = 20;
            var is_available = 0;
            is_road = is_road;
            row = row;
            col = col;

            

            var posting_string_space = "(" + idspace + "," + idwarehouse + "," + price + "," + dimension_width_inches +
                "," + dimension_height_inches + "," + dimension_length_inches + "," + is_available + "," + is_road +
                "," + row + "," + col + ")";
            var sql_adder_space = "INTO space (idspace, idwarehouse, price, dimension_width_inches, dimension_height_inches, dimension_length_inches, is_available, is_road, row, col)  VALUES" + posting_string_space;
            var posting_string_x = "(" + idspace + "," + idspace + "," + idwarehouse + ")";
            var sql_adder_x = "INTO spacexwarehouse (idspacexwarehouse, idspace, idwarehouse) VALUES" + posting_string_x;
            sql += (sql_adder_space + sql_adder_x);
        }
    }
    sql += "SELECT * From dual;";
    return sql;
}

module.exports.get_num_spaces = get_num_spaces;
module.exports.create_spaces = create_spaces;

/*
TODO Account for addition of row and column in rest of spaces code
TODO push changes to heroku
TODO add data to the app
 */