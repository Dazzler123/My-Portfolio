//cart
var cartArr = []; //global scope

//order id
var idNum = 1;

$(window).on('load', function () {
    let today = new Date().toLocaleDateString();
    //set current date
    $('#date').text(today);
    //set order id
    $('#cbxSelectOrderID').val("ORD-" + idNum);
})

// //load all customer id's to the combo box
// function loadAllCustomerIds() {
//     //clear combo box
//     $('#cbxSelectCustID').empty();
//     $('#cbxSelectCustID').append("<option>None</option>");
//
//     for (let cus of customerArr) {
//         $('#cbxSelectCustID').append("<option>" + cus.id + "</option>");
//     }
// }

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
$('#cbxSelectCustID').on('keydown', function (event) {
    if (event.key == "Enter") {
        //clear before adding
        $('#txtCusName,#txtCusAddress,#txtCusSalary').val("");
        //search customer
        var customer = searchCustomerByID($(this).val());
        if (customer == null) {
            alert("No such customer found.");
        } else {
            $('#txtCusName').val(customer.name);
            $('#txtCusAddress').val(customer.address);
            $('#txtCusSalary').val(customer.salary);
        }
    }
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
            //update item qty
            if (updateItemQty(id, qty)) {
                loadAllItemsToTbl();
                calculateSubTotal();
                clearQtyInput();
            } else {
                alert("Something went wrong.");
            }
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
        // enable buttons
        $('#btnRemoveItemFromCart').removeAttr('disabled');
        //remove item from cart
        deleteData(itemCode);
    });
}

function deleteData(itemCode) {
    $('#btnRemoveItemFromCart').click(function () {
        // confirmation alert
        if (confirm("Are you sure you want to remove this item from the cart?")) {
            //remove item
            removeItemFromCart(itemCode);
        }
        loadAllItemsToTbl();
        //disable button
        $('#btnRemoveItemFromCart').prop('disabled', true);
        clearQtyInput();
        calculateSubTotal();
        // getCartTblRowData();
    });
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
    $('#lblGrandTotal').text(gTot + " /=");

    var cash = parseInt($('#txtCashAmt').val());
    //set balance
    $('#txtBalanceAmt').val(cash - gTot);
});

//place order
$('#btnConfirmOrder').click(function () {
    //order id
    var orderId = $('#cbxSelectOrderID').val();
    //confirmation alert
    var cnfm = confirm("Are you sure you want to confirm and place the order?");
    if (cnfm) {
        for (const item of cartArr) {
            //get item code and qty bought
            var itemId = item.item_Code;
            var qty = item.qty_Bought;
            orderDetails = {
                orderId,
                itemId,
                qty
            };
            //push to order details array
            orderDetailsArr.push(orderDetails);
            //reduce item qtys from respective items
            reduceQty(itemId, qty);
            //clear cart array
            cartArr = [];
            //increment id number for a new order id
            idNum = idNum + 1;
        }
        //clear all fields for a new place order
        clearAllFields();
        //generate new order id
        generateOrderID();
    }
});

function reduceQty(itemCode, reducedAmt) {
    for (const item of itemArr) {
        //get item
        if (item.id == itemCode) {
            item.qty_On_Hand = item.qty_On_Hand - parseInt(reducedAmt);
            return true;
        }
    }
}

function clearAllFields() {
    clearQtyInput();
    $('#txtBalanceAmt').val("");
    $('#lblGrandTotal').text(" 0/=");
    $('#lblSubTotal').text(" 0/=");
    $('#tbl_Cart_Body').empty();
    $('#cbxSelectItemCode').val("None");
    $('#txtCusName').val("");
    $('#txtCusAddress').val("");
    $('#txtCusSalary').val("");
    $('#txtItemName').val("");
    $('#txtAvailableQTYOnHand').val("");
    $('#txtUnitPrice').val("");
}

//generate new order id
function generateOrderID() {
    $('#cbxSelectOrderID').val("ORD-" + idNum);
}

