//search order
function searchOrderByID(oId) {
    for (const temp of orderDetailsArr) {
        if (temp.orderID == oId) {
            console.log(temp);
            return temp;
        }
    }
    return null;
}

$('#btnSearchOrder').click(function () {
    //clear table
    $('#tbl_Orders_Body > tr').empty();
    var id = $('#txtInputSearchOrderID').val();
    //search order
    if (searchOrderByID(id) != null) {
        for (const ord of orderDetailsArr) {
            if(id == ord.orderID) {
                //get item
                var itm = searchItemByID(ord.itemCode);
                var row = "<tr><td>" + itm.id + "" + "</td><td>" + itm.name + "</td><td>" + itm.price_per_unit +
                    "</td><td>" + ord.orderQTY + "</td></tr>";
                //add to table
                $('#tbl_Orders_Body').append(row);
            }
        }
    } else {
        alert("No such order found!");
    }
});