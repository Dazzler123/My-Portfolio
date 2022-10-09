// // all customers array
// var customerArr = []; //global scope


///////////////////////////// VALIDATION ////////////////////////////////////////////
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
    checkValidity();
    //set correct data to make value less than zero
    $('#txt_Update_Cus_ID').val("C00-001");
    $('#txt_Update_Cus_Name').val("Dasindu");
    $('#txt_Update_Cus_Address').val("Wattala");
    $('#txt_Update_Cus_Salary').val("15000.00");
});

$("#txt_Cus_ID,#txt_Cus_Name,#txt_Cus_Address,#txt_Cus_Salary").on('blur', function (event) {
    checkValidity();
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
    checkValidity();
    //set correct data to make value less than zero
    $('#txt_Cus_ID').val("C00-001");
    $('#txt_Cus_Name').val("Dasindu");
    $('#txt_Cus_Address').val("Wattala");
    $('#txt_Cus_Salary').val("15000.00");
});

$("#txt_Update_Cus_ID,#txt_Update_Cus_Name,#txt_Update_Cus_Address,#txt_Update_Cus_Salary").on('blur', function (event) {
    checkValidity();
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

function checkValidity() {
    let errorCount = 0;
    for (let validation of customerValidations) {
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
        $("#btn_Add_New_Customer").attr('disabled', true);
        $("#btn_Update_Customer_Details").attr('disabled', true);
    } else {
        $("#btn_Add_New_Customer").attr('disabled', false);
        $("#btn_Update_Customer_Details").attr('disabled', false);
    }
}
///////////////////////////////////////////////////////////////////////////////////////


//get selected table row data
function getRowData() {
    $('#tbl_Customer_Body > tr').click(function () {
        let id = $(this, '#tbl_Customer_Body>tr').children(':nth-child(1)').text();
        let name = $(this, '#tbl_Customer_Body>tr').children(':nth-child(2)').text();
        let address = $(this, '#tbl_Customer_Body>tr').children(':nth-child(3)').text();
        let salary = $(this, '#tbl_Customer_Body>tr').children(':nth-child(4)').text();

        // enable update delete btns
        $('#btn_Update_Customer').removeAttr('disabled');
        $('#btn_Delete_Customer').removeAttr('disabled');

        //set data to update customer modal textfields
        $('#btn_Update_Customer').click(function () {
            //search before adding
            if (searchCustomerByID(id) != null) {
                $('#txt_Update_Cus_ID').val(id);
                $('#txt_Update_Cus_Name').val(name);
                $('#txt_Update_Cus_Address').val(address);
                $('#txt_Update_Cus_Salary').val(salary);
            } else {
                $("#txt_Update_Cus_ID,#txt_Update_Cus_Name,#txt_Update_Cus_Address,#txt_Update_Cus_Salary").val("");
            }
            //disable id textfield
            $('#txt_Update_Cus_ID').prop('disabled', true);
        });

        //set data to delete customer modal confirmation
        $('#btn_Delete_Customer').click(function () {
            //search before adding
            if (searchCustomerByID(id) != null) {
                $('#lbl_Customer_ID').text(id);
                $('#lbl_Customer_Name').text(name);
            } else {
                $('#lbl_Customer_ID').text("");
                $('#lbl_Customer_Name').text("");
            }
        });
    });
}

// search customer by ID
function searchCustomerByID(id) {
    for (var cus of customerArr) {
        if (cus.id == id) {
            return cus;
        }
    }
    return null;
}

function updateCustomer(id) {
    //search customer
    let customer = searchCustomerByID(id);
    if (customer != null) {
        customer.id = $("#txt_Update_Cus_ID").val();
        customer.name = $("#txt_Update_Cus_Name").val();
        customer.address = $("#txt_Update_Cus_Address").val();
        customer.salary = $("#txt_Update_Cus_Salary").val();
        return true;
    } else {
        return false;
    }
}

function deleteCustomer(id) {
    let customer = searchCustomerByID(id);
    if (customer != null) {
        let indexNumber = customerArr.indexOf(customer);
        //remove from the array
        customerArr.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}


//clear add customer textfields
$('#btn_Add_Customer').click(function () {
    $("#txt_Cus_ID,#txt_Cus_Name,#txt_Cus_Address,#txt_Cus_Salary").val("");
});

$('#btn_Add_New_Customer').click(function () {
    let customerID = $('#txt_Cus_ID').val();
    let customerName = $('#txt_Cus_Name').val();
    let customerAddress = $('#txt_Cus_Address').val();
    let customerSalary = $('#txt_Cus_Salary').val();

    var customerOne = {
        "id": customerID,
        "name": customerName,
        "address": customerAddress,
        "salary": customerSalary
    };
    //add to the array
    customerArr.push(customerOne);

    var row = "<tr><td>" + customerID + "" + "</td><td>" + customerName + "</td><td>" + customerAddress +
        "</td><td>" + customerSalary + "</td></tr>";

    // add to the table
    $('#tbl_Customer_Body').append(row);
    // alert
    alert("Customer saved successfully.");
    //select table row
    getRowData();
    // close modal
    $('#staticBackdrop').modal('hide');
});

// search customer
$('#btn_Search_Customer').click(function () {
    //clear table
    $('#tbl_Customer_Body').empty();

    //get customer object
    var cusObj = searchCustomerByID($('#txt_Search_Cus_ID').val());

    // show error alert
    if (cusObj == null) {
        alert("No such customer found with given ID!");
        //clear textfield
        $('#txt_Search_Cus_ID').val("");
    } else {
        var row = "<tr><td>" + cusObj.id + "</td><td>" + cusObj.name + "</td><td>" + cusObj.address + "</td><td>" + cusObj.salary + "</td></tr>";
        // add to the table
        $('#tbl_Customer_Body').append(row);
    }
    //select table row
    getRowData();
});

$('#btn_Update_Customer_Details').click(function () {
    //confirmation alert
    if (updateCustomer($('#txt_Update_Cus_ID').val())) {
        // confirmation alert
        alert("Customer details updated.");
        // close modal
        $('#staticBackdrop2').modal('hide');
        //disable update customer button
        $('#btn_Update_Customer').prop('disabled', true);
    } else {
        alert("Update failed!");
    }
});

$('#btn_Delete_Customer_Details').click(function () {
    let deleteID = $("#lbl_Customer_ID").text();

    if (deleteCustomer(deleteID)) {
        //confirmation alert
        alert("Customer deleted successfully.");
        // close modal
        $('#staticBackdrop3').modal('hide');
        //disable delete customer button
        $('#btn_Delete_Customer').prop('disabled', true);
    } else {
        alert("Process failed!");
    }
});

//load all customers to the table
$('#btn_Get_All_Customers').click(function () {
    //clear table
    $('#tbl_Customer_Body').empty();

    for (var customer of customerArr) {
        var row = "<tr><td>" + customer.id + "</td><td>" + customer.name + "</td><td>" + customer.address + "</td><td>" + customer.salary + "</td></tr>";

        // add to the table
        $('#tbl_Customer_Body').append(row);
    }
    //select table row
    getRowData();
});