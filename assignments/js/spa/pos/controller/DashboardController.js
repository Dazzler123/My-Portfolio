// loader
$(window).on('load', function () {
    // $("#loader").css('display','none');
    $("#loader_Container").fadeOut(700);
});

// =============== AT INITIAL STATE ==================
$('#header_container').css('visibility', 'hidden');
$('#cust_main_container').css('visibility', 'hidden');
$('#item_main_container').css('visibility', 'hidden');
$('#manage_orders_main_container').css('visibility', 'hidden');
$('#place_order_main_container').css('visibility', 'hidden');
// ===================================================

// customer btn on action
$('#btn_Customer').click(function () {
    $('#dashboard_main_container').css('visibility', 'hidden');
    $('#header_container').css('visibility', 'visible');
    $('#cust_main_container').css('visibility', 'visible');
});

// item btn on action
$('#btn_Item').click(function () {
    $('#dashboard_main_container').css('visibility', 'hidden');
    $('#header_container').css('visibility', 'visible');
    $('#item_main_container').css('visibility', 'visible');
});

// manage orders btn on action
$('#btn_Manage_Orders').click(function () {
    $('#dashboard_main_container').css('visibility', 'hidden');
    $('#header_container').css('visibility', 'visible');
    $('#manage_orders_main_container').css('visibility', 'visible');
});

// place order btn on action
$('#btn_Place_Order').click(function () {
    $('#dashboard_main_container').css('visibility', 'hidden');
    $('#header_container').css('visibility', 'visible');
    $('#place_order_main_container').css('visibility', 'visible');
});

//header home nav
$('#btn_To_Home').click(function () {
    $('#header_container').css('visibility', 'hidden');
    $('#cust_main_container').css('visibility', 'hidden');
    $('#item_main_container').css('visibility', 'hidden');
    $('#manage_orders_main_container').css('visibility', 'hidden');
    $('#place_order_main_container').css('visibility', 'hidden');
    $('#dashboard_main_container').css('visibility', 'visible');
});

//header orders nav
$('#btn_To_Manage_Orders').click(function () {
    $('#cust_main_container').css('visibility', 'hidden');
    $('#item_main_container').css('visibility', 'hidden');
    $('#place_order_main_container').css('visibility', 'hidden');
    $('#dashboard_main_container').css('visibility', 'hidden');
    $('#header_container').css('visibility', 'visible');
    $('#manage_orders_main_container').css('visibility', 'visible');
});

//header items nav
$('#btn_To_Items').click(function () {
    $('#cust_main_container').css('visibility', 'hidden');
    $('#manage_orders_main_container').css('visibility', 'hidden');
    $('#place_order_main_container').css('visibility', 'hidden');
    $('#dashboard_main_container').css('visibility', 'hidden');
    $('#header_container').css('visibility', 'visible');
    $('#item_main_container').css('visibility', 'visible');
});