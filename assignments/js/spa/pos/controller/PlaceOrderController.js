
//load all customer id's to the combo box
function loadAllCustomerIds() {
    //clear combo box
    $('#cbxSelectCustID').empty();
    for (let cus of customerArr) {
        $('#cbxSelectCustID').append("<option>" + cus.id + "</option>");
    }
}

//load all item codes to the combo box
function loadAllItemCodes() {
    //clear combo box
    $('#cbxSelectItemCode').empty();
    for (let itm of itemArr) {
        $('#cbxSelectItemCode').append("<option>" + itm.id + "</option>");
    }
}