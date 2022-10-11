//cart
var cartArr = []; //global scope

$(window).on('load', function () {
    let today = new Date().toLocaleDateString();
    //set current date
    $('#date').text(today);
})

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
    if (id == "None") {
        //error alert
        alert("No item selected!");
        //clear qty field
        clearQtyInput();
    } else {
        //search item
        if (searchItemInCart(id) != null) {
            //warning alert
            alert("Item already added!");
            clearQtyInput();
        } else {
            if (qty == "") {
                alert("Please select quantity!");
            } else {
                var cartObj = {
                    "item_Code": id,
                    "item_Name": $('#txtItemName').val(),
                    "unit_Price": $('#txtUnitPrice').val(),
                    "qty_Bought": qty
                };
                //add to cart array
                cartArr.push(cartObj);
                //load all items
                loadAllItemsToTbl();
                //clear qty field
                clearQtyInput();
                //calculate sub total
                calculateSubTotal();
                // //get selected table row data
                getCartTblRowData();
            }
        }
    }
});

//clear qty input field
function clearQtyInput() {
    $('#selectQTY').val("");
}

//load all items in the cart to the table
function loadAllItemsToTbl() {
    $('#tbl_Cart_Body').empty();
    for (const itm of cartArr) {
        var row = "<tr><td>" + itm.item_Code + "" + "</td><td>" + itm.item_Name + "</td><td>" + itm.unit_Price +
            "</td><td>" + itm.qty_Bought + "</td></tr>";
        //add to table
        $('#tbl_Cart_Body').append(row);
    }
}

//search item in cart
function searchItemInCart(id) {
    for (const itm of cartArr) {
        if (itm.item_Code == id) {
            return itm;
        }
    }
    return null;
}

//update item qty in cart
function updateItemQty(id, newQty) {
    var itm = searchItemInCart(id);
    if (itm != null) {
        var oldQty = parseInt(itm.qty_Bought);
        var qtyToAdd = parseInt(newQty);
        itm.qty_Bought = oldQty + qtyToAdd;
        return true;
    } else {
        return false;
    }
}

//remove item from cart
function removeItemFromCart(id) {
    var itm = searchItemInCart(id);
    if (itm != null) {
        let indexNumber = cartArr.indexOf(itm);
        // remove from the array
        cartArr.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

//get selected table row data
function getCartTblRowData() {
    $('#tbl_Cart_Body > tr').click(function () {
        let itemCode = $(this, '#tbl_Cart_Body>tr').children(':nth-child(1)').text();
        // set qty
        $('#selectQTY').val($(this, '#tbl_Cart_Body>tr').children(':nth-child(4)').text());
        // enable disable buttons
        $('#btnRemoveItemFromCart').removeAttr('disabled');
        $('#btnUpdateItemInCart').removeAttr('disabled');
        $('#btnAddToCart').prop('disabled', true);

        update(itemCode);
        deleteData(itemCode);
    });
}

function update(itemCode) {
    $('#btnUpdateItemInCart').click(function () {
        // confirmation alert
        var alt = confirm("Are you sure you want to update quantity of this item in cart?");
        if (alt) {
            //update qty bought
            updateItemQty(itemCode, $('#selectQTY').val());
        }
        loadAllItemsToTbl();
        //disable both buttons
        disableUpdtDeltBtns();
        //enable add to cart button
        $('#btnAddToCart').prop('disabled', false);
        clearQtyInput();
        calculateSubTotal();
        getCartTblRowData();
    });
}


function deleteData(itemCode) {
    $('#btnRemoveItemFromCart').click(function () {
        // confirmation alert
        var alt = confirm("Are you sure you want to remove this item from the cart?");
        if (alt) {
            //remove item
            removeItemFromCart(itemCode);
        }
        loadAllItemsToTbl();
        //disable both buttons
        disableUpdtDeltBtns();
        //enable add to cart button
        $('#btnAddToCart').prop('disabled', false);
        clearQtyInput();
        calculateSubTotal();
        getCartTblRowData();
    });
}


function disableUpdtDeltBtns() {
    $('#btnUpdateItemInCart').prop('disabled', true);
    $('#btnRemoveItemFromCart').prop('disabled', true);
}

//calculate sub total
function calculateSubTotal() {
    let total = 0;
    for (const item of cartArr) {
        var uPrc = parseInt(item.unit_Price);
        var qBght = parseInt(item.qty_Bought);
        var totPrc = uPrc * qBght;
        total = total + totPrc;
    }
    //set total to sub total label
    var prc = total + " /=";
    $('#lblSubTotal').text(prc);
    return total;
}

//calculate discount amount on subtotal
function calculateDiscount(value) {
    //get sub total
    var subTot = calculateSubTotal();
    var discount = parseInt(value);
    return subTot * discount / 100;
}

$('#txtDiscountGiven').on('keyup', function () {
    //calculate grand total
    var gTot = calculateSubTotal() - calculateDiscount($(this).val());
    // set value to total label
    $('#lblGrandTotal').text(gTot);

    var cash = parseInt($('#txtCashAmt').val());
    //set balance
    $('#txtBalanceAmt').val(cash - gTot);
});

//place order
$('#btnConfirmOrder').click(function () {
    
});

