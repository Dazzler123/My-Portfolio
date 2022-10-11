//search order
function searchOrderByID(id) {
    for (const order of orderDetailsArr) {
        if (order.order_ID == id) {
            return order;
        }
    }
    return null;
}

$('#btnSearchOrder').click(function () {
    var id = $('#txtInputSearchOrderID').val();
    if (searchOrderByID(id) != null) {
        for (const items of orderDetailsArr) {
            if (items.order_ID == id ) {
                //get item
                var itm = searchItemByID(items.item_Code);
                var row = "<tr><td>" + itm.id + "" + "</td><td>" + itm.name + "</td><td>" + itm.price_per_unit +
                    "</td><td>" + items.qty_Bought + "</td></tr>";
                //add to table
                $('#tbl_Orders_Body').append(row);
            }
        }
    } else {
        alert("No such order found!");
    }
});