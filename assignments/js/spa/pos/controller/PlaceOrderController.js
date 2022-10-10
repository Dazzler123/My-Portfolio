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
    var id = $('#cbxSelectItemCode').val();
    var qty = $('#selectQTY').val();
    //search item
    if (searchItemInCart(id) != null) {
        //update qty bought
        updateItemInCart(id, qty)
        //load all items
        loadAllItemsToTbl();
    } else {
        var cartObj = {
            "item_Code": id,
            "item_Name": $('#txtItemName').val(),
            "unit_Price": $('#txtUnitPrice').val(),
            "qty_Bought": qty
        };
        //add to cart array
        cart.push(cartObj);
        //load all items
        loadAllItemsToTbl();
    }
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

//search item in cart
function searchItemInCart(id) {
    for (const itm of cart) {
        if (itm.item_Code == id) {
            return itm;
        }
    }
    return null;
}

//update item qty in cart
function updateItemInCart(id, newQty) {
    var itm = searchItemInCart(id);
    if (itm != null) {
        var newVal = itm.qty_Bought + newQty;
        itm.qty_Bought = newVal;
        return true;
    } else {
        return false;
    }
}