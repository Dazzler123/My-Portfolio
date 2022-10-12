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
        //select row
        getOrderTblRowData();
    } else {
        alert("No such order found!");
    }
});

//get selected table row data
function getOrderTblRowData() {
    $('#tbl_Orders_Body > tr').click(function () {
        let itmCode = $(this, '#tbl_Orders_Body>tr').children(':nth-child(1)').text();
        let itmName = $(this, '#tbl_Orders_Body>tr').children(':nth-child(2)').text();
        let qtyBght = $(this, '#tbl_Orders_Body>tr').children(':nth-child(4)').text();

        // enable update delete btns
        $('#btnUpdateItemQty').removeAttr('disabled');
        $('#btnDeleteItemFromOrder').removeAttr('disabled');

        //set data to update item qty bought modal textfields
        $('#btnUpdateItemQty').click(function () {
            //search before adding
            if (searchItemByID(itmCode) != null) {
                $('#txtUpdateOrderQty').val(qtyBght);
            } else {
                $("#txtUpdateOrderQty").val("");
            }
        });

        //set data to delete item from order modal confirmation
        $('#btnDeleteItemFromOrder').click(function () {
            //search before adding
            if (searchItemByID(itmCode) != null) {
                $('#lbl_Order_Remove_Item_Code').text(itmCode);
                $('#lbl_Order_Remove_Item_Name').text(itmName);
            } else {
                $('#lbl_Order_Remove_Item_Code').text("");
                $('#lbl_Order_Remove_Item_Name').text("");
            }
        });
    });
}

