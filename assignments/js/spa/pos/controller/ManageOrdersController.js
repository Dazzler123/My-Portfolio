//order id
let oID;
let itmCd;

//search order
function searchOrderByID(oId) {
    for (const temp of orderDetailsArr) {
        if (temp.orderID == oId) {
            return temp;
        }
    }
    return null;
}

//search items in a order
function searchItemsInAOrder(oId, itmCde) {
    for (const temp of orderDetailsArr) {
        if (temp.orderID == oId & temp.itemCode == itmCde) {
            return temp;
        }
    }
    return null;
}

$('#btnSearchOrder').click(function () {
    var id = $('#txtInputSearchOrderID').val();
    //search order
    if (searchOrderByID(id) != null) {
        //load items
        loadAllItemsInOrder(id);
        //set order id
        oID = id;
        //select row
        getOrderTblRowData();
    } else {
        alert("No such order found!");
        oID = null;
    }
});

function loadAllItemsInOrder(id) {
    //clear table
    $('#tbl_Orders_Body > tr').empty();
    for (const ord of orderDetailsArr) {
        //search for items with matching order id's
        if (id == ord.orderID) {
            //get item
            var itm = searchItemByID(ord.itemCode);
            var row = "<tr><td>" + itm.id + "" + "</td><td>" + itm.name + "</td><td>" + itm.price_per_unit +
                "</td><td>" + ord.orderQTY + "</td></tr>";
            //add to table
            $('#tbl_Orders_Body').append(row);
        }
    }
    getOrderTblRowData();
}

//get selected table row data
function getOrderTblRowData() {
    $('#tbl_Orders_Body > tr').click(function () {
        let itmCode = $(this, '#tbl_Orders_Body>tr').children(':nth-child(1)').text();
        let itmName = $(this, '#tbl_Orders_Body>tr').children(':nth-child(2)').text();
        let qtyBght = $(this, '#tbl_Orders_Body>tr').children(':nth-child(4)').text();
        // enable update delete btns
        $('#btnUpdateItemQtyBght').removeAttr('disabled');
        $('#btnDeleteItemFromOrder').removeAttr('disabled');

        //set data to update item qty bought modal textfields
        $('#btnUpdateItemQtyBght').click(function () {
            //search before adding
            if (searchItemsInAOrder(oID,itmCode) != null) {
                $('#txtUpdateOrderQty').val(qtyBght);
                //get item code
                itmCd = itmCode;
            } else {
                $("#txtUpdateOrderQty").val("");
            }
        });
        //set data to delete item from order modal confirmation
        $('#btnDeleteItemFromOrder').click(function () {
            //search before adding
            if (searchItemsInAOrder(oID,itmCode) != null) {
                $('#lbl_Order_Remove_Item_Code').text(itmCode);
                $('#lbl_Order_Remove_Item_Name').text(itmName);
                // //get item code
                // itmCd = itmCode;
            } else {
                $('#lbl_Order_Remove_Item_Code').text("");
                $('#lbl_Order_Remove_Item_Name').text("");
            }
        });
    });
}

$('#btnUpdateQtyBought').click(function () {
    var newQty = $('#txtUpdateOrderQty').val();
    //confirmation alert
    if (updateItemOrderQty(itmCd,newQty)) {
        //confirmation alert
        alert("Item quantity bought updated.");
        loadAllItemsInOrder(oID);
        //close modal code here...
        $('#staticBackdrop7').modal('hide');
        //disable buttons
        $('#btnUpdateItemQtyBght').prop('disabled', true);
        $('#btnDeleteItemFromOrder').prop('disabled', true);
        //clear item code
        itmCd = null;
    } else {
        alert("Update failed!");
    }
});

function updateItemOrderQty(itm,newQty) {
    var item = searchItemsInAOrder(oID,itm);
    if (item != null) {
        item.orderQTY = parseInt(newQty);
        return true;
    } else {
        return false;
    }
}

$('#btn_Delete_Item_From_Order').click(function () {
    var itmCde = $('#lbl_Order_Remove_Item_Code').text();
    if (deleteItemFromOrder(oID, itmCde)) {
        alert("Item has been removed from the order.");
        $('#staticBackdrop8').modal('hide');
        //load items
        loadAllItemsInOrder(oID);
        //disable button
        $('#btnDeleteItemFromOrder').prop('disabled', true);
        $('#btnUpdateItemQtyBght').prop('disabled', true);
    } else {
        alert("Remove item failed!");
    }
});

function deleteItemFromOrder(oID, itemCde) {
    let item = searchItemsInAOrder(oID, itemCde);
    if (item != null) {
        let indexNumber = orderDetailsArr.indexOf(item);
        //remove from the array
        orderDetailsArr.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}