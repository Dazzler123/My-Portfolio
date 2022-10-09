
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
$('#cbxSelectItemCode').change( function () {
    //clear before adding
    $('#txtItemName,#txtAvailableQTYOnHand,#txtUnitPrice').val("");
    //search item
    var item = searchItemByID($(this).val());
    $('#txtItemName').val(item.name);
    $('#txtAvailableQTYOnHand').val(item.qty_On_Hand);
    $('#txtUnitPrice').val(item.price_per_unit);
});