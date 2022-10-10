//cart
var cart = []; //global scope

//load all customer id's to the combo box
function loadAllCustomerIds() {
    //clear combo box
    $('#cbxSelectCustID').empty();
    $('#cbxSelectCustID').append("<option>None</option>");

    for (let cus of customerArr) {
        $('#cbxSelectCustID').append("<option>" + cus.id + "</option>");
    }
}

//load all item codes to the combo box
function loadAllItemCodes() {
    //clear combo box
    $('#cbxSelectItemCode').empty();
    $('#cbxSelectItemCode').append("<option>None</option>");

    for (let itm of itemArr) {
        $('#cbxSelectItemCode').append("<option>" + itm.id + "</option>");
    }
}

//set item details to the textfields
$('#cbxSelectItemCode').change(function () {
    //clear before adding
    $('#txtItemName,#txtAvailableQTYOnHand,#txtUnitPrice').val("");
    //search item
    var item = searchItemByID($(this).val());
    $('#txtItemName').val(item.name);
    $('#txtAvailableQTYOnHand').val(item.qty_On_Hand);
    $('#txtUnitPrice').val(item.price_per_unit);
});

//set customer details to the textfields
$('#cbxSelectCustID').change(function () {
    //clear before adding
    $('#txtCusName,#txtCusAddress,#txtCusSalary').val("");
    //search customer
    var customer = searchCustomerByID($(this).val());
    $('#txtCusName').val(customer.name);
    $('#txtCusAddress').val(customer.address);
    $('#txtCusSalary').val(customer.salary);
});

//add items to cart
$('#btnAddToCart').click(function () {
    var cartObj = {
        "item_Code": $('#cbxSelectItemCode').val(),
        "item_Name": $('#txtItemName').val(),
        "unit_Price": $('#txtUnitPrice').val(),
        "qty_Bought": $('#selectQTY').val()
    };
    //add to cart array
    cart.push(cartObj);
    //load all items
    loadAllItemsToTbl();
});

//load all items in the cart to the table
function loadAllItemsToTbl() {
    $('#tbl_Cart_Body').empty();
    for (const itm of cart) {
        var row = "<tr><td>" + itm.item_Code + "" + "</td><td>" + itm.item_Name + "</td><td>" + itm.unit_Price +
            "</td><td>" + itm.qty_Bought + "</td></tr>";
        //add to table
        $('#tbl_Cart_Body').append(row);
    }
}