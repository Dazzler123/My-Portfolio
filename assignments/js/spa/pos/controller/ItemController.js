// // all items array
// var itemArr = []; //global scope


///////////////////////////// VALIDATION ////////////////////////////////////////////
// item details patterns
const itemCodeRegEx = /^(ITM-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z 0-9.-/+]{3,200}$/;
const itemPPURegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQOHRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

// item validation pattern array //global scope
let itemValidations = [];
//push add new item textfield validations to the array
itemValidations.push({
    reg: itemCodeRegEx,
    field: $('#txt_Item_Code'),
    error: 'Pattern is Incorrect : ITM- 0-9'
});
itemValidations.push({
    reg: itemNameRegEx,
    field: $('#txt_Item_Name'),
    error: 'Pattern is Incorrect : A-z 0-9 5-20'
});
itemValidations.push({
    reg: itemPPURegEx,
    field: $('#txt_Price_Per_Unit'),
    error: 'Pattern is Incorrect: 100 or 100.00'
});
itemValidations.push({
    reg: itemQOHRegEx,
    field: $('#txt_QTY_On_Hand'),
    error: 'Pattern is incorrect : 100 or 100.00'
});
//push update item textfield validations to the array
itemValidations.push({
    reg: itemCodeRegEx,
    field: $('#txt_Update_Item_Code'),
    error: 'Pattern is Incorrect : ITM- 0-9'
});
itemValidations.push({
    reg: itemNameRegEx,
    field: $('#txt_Update_Item_Name'),
    error: 'Pattern is Incorrect : A-z 0-9 5-20'
});
itemValidations.push({
    reg: itemPPURegEx,
    field: $('#txt_Update_Price_Per_Unit'),
    error: 'Pattern is Incorrect: 100 or 100.00'
});
itemValidations.push({
    reg: itemQOHRegEx,
    field: $('#txt_Update_QTY_On_Hand'),
    error: 'Pattern is incorrect : 100 or 100.00'
});

//save customer validation
$("#txt_Item_Code,#txt_Item_Name,#txt_Price_Per_Unit,#txt_QTY_On_Hand").on('keyup', function (event) {
    checkValidity();
    //set correct data to make VALUE less than zero
    $('#txt_Update_Item_Code').val("ITM-001");
    $('#txt_Update_Item_Name').val("Keerisamba");
    $('#txt_Update_Price_Per_Unit').val("100.00");
    $('#txt_Update_QTY_On_Hand').val("100.00");
});

$("#txt_Item_Code,#txt_Item_Name,#txt_Price_Per_Unit,#txt_QTY_On_Hand").on('blur', function (event) {
    checkValidity();
});

$("#txt_Item_Code").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemCodeRegEx, $("#txt_Item_Code"))) {
        $("#txt_Item_Name").focus();
    } else {
        focusText($("#txt_Item_Code"));
    }
});

$("#txt_Item_Name").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameRegEx, $("#txt_Item_Name"))) {
        focusText($("#txt_Price_Per_Unit"));
    }
});

$("#txt_Price_Per_Unit").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemPPURegEx, $("#txt_Price_Per_Unit"))) {
        focusText($("#txt_QTY_On_Hand"));
    }
});

$("#txt_QTY_On_Hand").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQOHRegEx, $("#txt_QTY_On_Hand"))) {
    }
});

// update customer validation
$("#txt_Update_Item_Code,#txt_Update_Item_Name,#txt_Update_Price_Per_Unit,#txt_Update_QTY_On_Hand").on('keyup', function (event) {
    checkValidity();
    //set correct data to make VALUE less than zero
    $('#txt_Item_Code').val("ITM-001");
    $('#txt_Item_Name').val("Keerisamba");
    $('#txt_Price_Per_Unit').val("100.00");
    $('#txt_QTY_On_Hand').val("100.00");
});

$("#txt_Update_Item_Code,#txt_Update_Item_Name,#txt_Update_Price_Per_Unit,#txt_Update_QTY_On_Hand").on('blur', function (event) {
    checkValidity();
});

$("#txt_Update_Item_Code").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemCodeRegEx, $("#txt_Update_Item_Code"))) {
        $("#txt_Update_Item_Name").focus();
    } else {
        focusText($("#txt_Update_Item_Code"));
    }
});

$("#txt_Update_Item_Name").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameRegEx, $("#txt_Update_Item_Name"))) {
        focusText($("#txt_Update_Price_Per_Unit"));
    }
});

$("#txt_Update_Price_Per_Unit").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemPPURegEx, $("#txt_Update_Price_Per_Unit"))) {
        focusText($("#txt_Update_QTY_On_Hand"));
    }
});

$("#txt_Update_QTY_On_Hand").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQOHRegEx, $("#txt_Update_QTY_On_Hand"))) {
    }
});

function checkValidity() {
    let errorCount = 0;
    for (let validation of itemValidations) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setButtonState(errorCount);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value) {
    if (value > 0) {
        $("#btn_Add_New_Item").attr('disabled', true);
        $("#btn_Update_Item_Details").attr('disabled', true);
    } else {
        $("#btn_Add_New_Item").attr('disabled', false);
        $("#btn_Update_Item_Details").attr('disabled', false);
    }
}

///////////////////////////////////////////////////////////////////////////////////////


//get selected table row data
function getRowData() {
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

    var itemOne = {
        "id": itemCode,
        "name": itemName,
        "price_per_unit": ppu,
        "qty_On_Hand": qtyOnHand
    };
    //add to the array
    itemArr.push(itemOne);

    var row = "<tr><td>" + itemCode + "" + "</td><td>" + itemName + "</td><td>" + ppu +
        "</td><td>" + qtyOnHand + "</td></tr>";

    // add to the table
    $('#tbl_Item_Body').append(row);
    // alert
    alert("Item saved successfully.");
    //get selected table row
    getRowData();
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
        //clear textfield
        $('#txt_Search_Item_Code').val("");
    } else {
        var row = "<tr><td>" + itemObj.id + "</td><td>" + itemObj.name + "</td><td>" + itemObj.price_per_unit + "</td><td>" + itemObj.qty_On_Hand + "</td></tr>";
        // add to the table
        $('#tbl_Item_Body').append(row);
    }
    //select table row
    getRowData();
});

$('#btn_Update_Item_Details').click(function () {
    //confirmation alert
    if (updateItem($('#txt_Update_Item_Code').val())) {
        //confirmation alert
        alert("Item details updated.");
        //close modal code here...
        $('#staticBackdrop5').modal('hide');
        //disable update item button
        $('#btn_Update_Item').prop('disabled', true);
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
        //disable delete item button
        $('#btn_Delete_Item').prop('disabled', true);
    } else {
        alert("Process failed!");
    }
});

//load all items to the table
$('#btn_Get_All_Items').click(function () {
    //clear table
    $('#tbl_Item_Body').empty();

    for (var item of itemArr) {
        var row = "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.price_per_unit + "</td><td>" + item.qty_On_Hand + "</td></tr>";

        // add to the table
        $('#tbl_Item_Body').append(row);
    }

    //select table row
    getRowData();
});
