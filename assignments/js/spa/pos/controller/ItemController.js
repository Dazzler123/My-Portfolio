//get selected table row data
function getItemTblRowData() {
    $('#tbl_Item_Body > tr').click(function () {
        let code = $(this, '#tbl_Item_Body>tr').children(':nth-child(1)').text();
        let name = $(this, '#tbl_Item_Body>tr').children(':nth-child(2)').text();
        let ppu = $(this, '#tbl_Item_Body>tr').children(':nth-child(3)').text();
        let qtyOnHand = $(this, '#tbl_Item_Body>tr').children(':nth-child(4)').text();

        // enable update delete btns
        $('#btn_Update_Item').removeAttr('disabled');
        $('#btn_Delete_Item').removeAttr('disabled');

        //set data to update item modal textfields
        $('#btn_Update_Item').click(function () {
            //search before adding
            if (searchItemByID(code) != null) {
                $('#txt_Update_Item_Code').val(code);
                $('#txt_Update_Item_Name').val(name);
                $('#txt_Update_Price_Per_Unit').val(ppu);
                $('#txt_Update_QTY_On_Hand').val(qtyOnHand);
            } else {
                $("#txt_Update_Item_Code,#txt_Update_Item_Name,#txt_Update_Price_Per_Unit,#txt_Update_QTY_On_Hand").val("");
            }
            //disable id textfield
            $('#txt_Update_Item_Code').prop('disabled', true);
        });

        //set data to delete item modal confirmation
        $('#btn_Delete_Item').click(function () {
            //search before adding
            if (searchItemByID(code) != null) {
                $('#lbl_Item_Code').text(code);
                $('#lbl_Item_Name').text(name);
            } else {
                $('#lbl_Item_Code').text("");
                $('#lbl_Item_Name').text("");
            }
        });
    });
}

// search item by ID
function searchItemByID(id) {
    for (var item of itemArr) {
        if (item.id == id) {
            return item;
        }
    }
    return null;
}

function updateItem(id) {
    //search item
    let item = searchItemByID(id);
    if (item != null) {
        item.id = $("#txt_Update_Item_Code").val();
        item.name = $("#txt_Update_Item_Name").val();
        item.price_per_unit = $("#txt_Update_Price_Per_Unit").val();
        item.qty_On_Hand = $("#txt_Update_QTY_On_Hand").val();
        return true;
    } else {
        return false;
    }
}

function deleteItem(id) {
    let item = searchItemByID(id);
    if (item != null) {
        let indexNumber = itemArr.indexOf(item);
        //remove from the array
        itemArr.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

//clear add item textfields
$('#btn_Add_Item').click(function () {
    $("#txt_Item_Code,#txt_Item_Name,#txt_Price_Per_Unit,#txt_QTY_On_Hand").val("");
});

$('#btn_Add_New_Item').click(function () {
    let itemCode = $('#txt_Item_Code').val();
    let itemName = $('#txt_Item_Name').val();
    let ppu = $('#txt_Price_Per_Unit').val();
    let qtyOnHand = $('#txt_QTY_On_Hand').val();

    let itemObj = Object.assign({}, item);
    itemObj.id = itemCode;
    itemObj.name = itemName;
    itemObj.price_per_unit = ppu;
    itemObj.qty_On_Hand = qtyOnHand;
    //add to the array
    itemArr.push(itemObj);

    var row = "<tr><td>" + itemCode + "" + "</td><td>" + itemName + "</td><td>" + ppu +
        "</td><td>" + qtyOnHand + "</td></tr>";
    // add to the table
    $('#tbl_Item_Body').append(row);
    // alert
    alert("Item saved successfully.");
    //get selected table row
    getItemTblRowData();
    //refresh cbxSelectItemCode combo box in place order form
    loadAllItemCodes();
    //close modal
    $('#staticBackdrop4').modal('hide');
});

$('#btn_Search_Item').click(function () {
    //clear table
    $('#tbl_Item_Body').empty();
    //get item object
    var itemObj = searchItemByID($('#txt_Search_Item_Code').val());

    //show error alert
    if (itemObj == null) {
        alert("No such item found with given ID!");
        // //clear textfield
        // $('#txt_Search_Item_Code').val("");
    } else {
        var row = "<tr><td>" + itemObj.id + "</td><td>" + itemObj.name + "</td><td>" + itemObj.price_per_unit + "</td><td>" + itemObj.qty_On_Hand + "</td></tr>";
        // add to the table
        $('#tbl_Item_Body').append(row);
    }
    //select table row
    getItemTblRowData();
});

$('#btn_Update_Item_Details').click(function () {
    //confirmation alert
    if (updateItem($('#txt_Update_Item_Code').val())) {
        //confirmation alert
        alert("Item details updated.");
        //close modal code here...
        $('#staticBackdrop5').modal('hide');
        loadAllItems();
        //disable update item button
        $('#btn_Update_Item').prop('disabled', true);
        //disable delete item button
        $('#btn_Delete_Item').prop('disabled', true);
    } else {
        alert("Update failed!");
    }
});

$('#btn_Delete_Item_Details').click(function () {
    let deleteID = $("#lbl_Item_Code").text();
    if (deleteItem(deleteID)) {
        // confirmation alert
        alert("Item deleted successfully.");
        //close modal code here...
        $('#staticBackdrop6').modal('hide');
        loadAllItems();
        //disable delete item button
        $('#btn_Delete_Item').prop('disabled', true);
        //disable update item button
        $('#btn_Update_Item').prop('disabled', true);
        //refresh cbxSelectItemCode combo box in place order form
        loadAllItemCodes();
    } else {
        alert("Process failed!");
    }
});

//load all items to the table
$('#btn_Get_All_Items').click(function () {
    loadAllItems();
});

function loadAllItems() {
    //clear table
    $('#tbl_Item_Body').empty();
    for (var item of itemArr) {
        var row = "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.price_per_unit + "</td><td>" + item.qty_On_Hand + "</td></tr>";
        // add to the table
        $('#tbl_Item_Body').append(row);
    }
    //select table row
    getItemTblRowData();
}
