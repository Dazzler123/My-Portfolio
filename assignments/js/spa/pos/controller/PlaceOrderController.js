
//load all customer id's to the combo box
function loadAllCustomerIds() {
    //clear combo box
    $('#cbxSelectCustID').empty();
    for (let cus of customerArr) {
        $('#cbxSelectCustID').append("<option>" + cus.id + "</option>");
    }
}