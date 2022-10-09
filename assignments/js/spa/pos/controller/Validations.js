
///////////////////////////// CUSTOMER ////////////////////////////////////////////
// customer details patterns
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

// customer validation pattern array //global scope
let customerValidations = [];
//push add new customer textfield validations to the array
customerValidations.push({
    reg: cusIDRegEx,
    field: $('#txt_Cus_ID'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#txt_Cus_Name'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20'
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#txt_Cus_Address'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidations.push({
    reg: cusSalaryRegEx,
    field: $('#txt_Cus_Salary'),
    error: 'Customer Salary Pattern is Wrong : 100 or 100.00'
});
//push update customer textfield validations to the array
customerValidations.push({
    reg: cusIDRegEx,
    field: $('#txt_Update_Cus_ID'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#txt_Update_Cus_Name'),
    error: 'Customer Name Pattern is Wrong : A-z 5-20'
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#txt_Update_Cus_Address'),
    error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidations.push({
    reg: cusSalaryRegEx,
    field: $('#txt_Update_Cus_Salary'),
    error: 'Customer Salary Pattern is Wrong : 100 or 100.00'
});

//save customer validation
$("#txt_Cus_ID,#txt_Cus_Name,#txt_Cus_Address,#txt_Cus_Salary").on('keyup', function (event) {
    checkCustDetailsValidity();
    //set correct data to make value less than zero
    $('#txt_Update_Cus_ID').val("C00-001");
    $('#txt_Update_Cus_Name').val("Dasindu");
    $('#txt_Update_Cus_Address').val("Wattala");
    $('#txt_Update_Cus_Salary').val("15000.00");
});

$("#txt_Cus_ID,#txt_Cus_Name,#txt_Cus_Address,#txt_Cus_Salary").on('blur', function (event) {
    checkCustDetailsValidity();
});

$("#txt_Cus_ID").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusIDRegEx, $("#txt_Cus_ID"))) {
        $("#txt_Cus_Name").focus();
    } else {
        focusText($("#txt_Cus_ID"));
    }
});

$("#txt_Cus_Name").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#txt_Cus_Name"))) {
        focusText($("#txt_Cus_Address"));
    }
});

$("#txt_Cus_Address").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txt_Cus_Address"))) {
        focusText($("#txt_Cus_Salary"));
    }
});

$("#txt_Cus_Salary").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusSalaryRegEx, $("#txt_Cus_Salary"))) {
    }
});

// update customer validation
$("#txt_Update_Cus_ID,#txt_Update_Cus_Name,#txt_Update_Cus_Address,#txt_Update_Cus_Salary").on('keyup', function (event) {
    checkCustDetailsValidity();
    //set correct data to make value less than zero
    $('#txt_Cus_ID').val("C00-001");
    $('#txt_Cus_Name').val("Dasindu");
    $('#txt_Cus_Address').val("Wattala");
    $('#txt_Cus_Salary').val("15000.00");
});

$("#txt_Update_Cus_ID,#txt_Update_Cus_Name,#txt_Update_Cus_Address,#txt_Update_Cus_Salary").on('blur', function (event) {
    checkCustDetailsValidity();
});

$("#txt_Update_Cus_ID").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusIDRegEx, $("#txt_Update_Cus_ID"))) {
        $("#txt_Update_Cus_Name").focus();
    } else {
        focusText($("#txt_Update_Cus_ID"));
    }
});

$("#txt_Update_Cus_Name").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#txt_Update_Cus_Name"))) {
        focusText($("#txt_Update_Cus_Address"));
    }
});

$("#txt_Update_Cus_Address").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txt_Update_Cus_Address"))) {
        focusText($("#txt_Update_Cus_Salary"));
    }
});

$("#txt_Update_Cus_Salary").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusSalaryRegEx, $("#txt_Update_Cus_Salary"))) {
    }
});

///////////////////////////////////////////////////////////////////////////////


///////////////////////////// ITEM ////////////////////////////////////////////
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

//save item validation
$("#txt_Item_Code,#txt_Item_Name,#txt_Price_Per_Unit,#txt_QTY_On_Hand").on('keyup', function (event) {
    checkItemDetailsValidity();
    //set correct data to make VALUE less than zero
    $('#txt_Update_Item_Code').val("ITM-001");
    $('#txt_Update_Item_Name').val("Keerisamba");
    $('#txt_Update_Price_Per_Unit').val("100.00");
    $('#txt_Update_QTY_On_Hand').val("100.00");
});

$("#txt_Item_Code,#txt_Item_Name,#txt_Price_Per_Unit,#txt_QTY_On_Hand").on('blur', function (event) {
    checkItemDetailsValidity();
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

// update item validation
$("#txt_Update_Item_Code,#txt_Update_Item_Name,#txt_Update_Price_Per_Unit,#txt_Update_QTY_On_Hand").on('keyup', function (event) {
    checkItemDetailsValidity();
    //set correct data to make VALUE less than zero
    $('#txt_Item_Code').val("ITM-001");
    $('#txt_Item_Name').val("Keerisamba");
    $('#txt_Price_Per_Unit').val("100.00");
    $('#txt_QTY_On_Hand').val("100.00");
});

$("#txt_Update_Item_Code,#txt_Update_Item_Name,#txt_Update_Price_Per_Unit,#txt_Update_QTY_On_Hand").on('blur', function (event) {
    checkItemDetailsValidity();
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

///////////////////////////////////////////////////////////////////////////////////////

function checkCustDetailsValidity() {
    let errorCount = 0;
    for (let validation of customerValidations) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setCustButtonState(errorCount);
}

function checkItemDetailsValidity() {
    let errorCount = 0;
    for (let validation of itemValidations) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setItemButtonState(errorCount);
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

function setCustButtonState(value) {
    if (value > 0) {
        $("#btn_Add_New_Customer").attr('disabled', true);
        $("#btn_Update_Customer_Details").attr('disabled', true);
    } else {
        $("#btn_Add_New_Customer").attr('disabled', false);
        $("#btn_Update_Customer_Details").attr('disabled', false);
    }
}

function setItemButtonState(value) {
    if (value > 0) {
        $("#btn_Add_New_Item").attr('disabled', true);
        $("#btn_Update_Item_Details").attr('disabled', true);
    } else {
        $("#btn_Add_New_Item").attr('disabled', false);
        $("#btn_Update_Item_Details").attr('disabled', false);
    }
}