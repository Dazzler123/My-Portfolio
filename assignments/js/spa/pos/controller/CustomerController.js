//get selected table row data
function getCustTblRowData() {
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
    //wrap data
    let customerObj = Object.assign({}, customer);
    customerObj.id = customerID;
    customerObj.name = customerName;
    customerObj.address = customerAddress;
    customerObj.salary = customerSalary;
    //add to the array
    customerArr.push(customerObj);

    var row = "<tr><td>" + customerID + "" + "</td><td>" + customerName + "</td><td>" + customerAddress +
        "</td><td>" + customerSalary + "</td></tr>";
    // add to the table
    $('#tbl_Customer_Body').append(row);
    // alert
    alert("Customer saved successfully.");
    //select table row
    getCustTblRowData();
    //add id to cbxSelectCustID combo box in place order form
    // loadAllCustomerIds();
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
        // //clear textfield
        // $('#txt_Search_Cus_ID').val("");
    } else {
        var row = "<tr><td>" + cusObj.id + "</td><td>" + cusObj.name + "</td><td>" + cusObj.address + "</td><td>" + cusObj.salary + "</td></tr>";
        // add to the table
        $('#tbl_Customer_Body').append(row);
    }
    //select table row
    getCustTblRowData();
});

$('#btn_Update_Customer_Details').click(function () {
    //confirmation alert
    if (updateCustomer($('#txt_Update_Cus_ID').val())) {
        // confirmation alert
        alert("Customer details updated.");
        // close modal
        $('#staticBackdrop2').modal('hide');
        loadAllCustomers();
        //disable update customer button
        $('#btn_Update_Customer').prop('disabled', true);
        //disable delete customer button
        $('#btn_Delete_Customer').prop('disabled', true);
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
        loadAllCustomers();
        //disable delete customer button
        $('#btn_Delete_Customer').prop('disabled', true);
        //disable update customer button
        $('#btn_Update_Customer').prop('disabled', true);
    } else {
        alert("Process failed!");
    }
});

//load all customers to the table
$('#btn_Get_All_Customers').click(function () {
    loadAllCustomers();
});

function loadAllCustomers() {
    //clear table
    $('#tbl_Customer_Body').empty();
    for (var customer of customerArr) {
        var row = "<tr><td>" + customer.id + "</td><td>" + customer.name + "</td><td>" + customer.address + "</td><td>" + customer.salary + "</td></tr>";

        // add to the table
        $('#tbl_Customer_Body').append(row);
    }
    //select table row
    getCustTblRowData();
}