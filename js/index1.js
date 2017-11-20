var geocoder;
var destination;
var myPosition;
var map;
var curPosLat;
var curPosLng;
var desPosLat;
var desPosLng;
var curPos;
var desPos;
var directionsDisplay;
var watchID='';
var mapID = '';
var intervalGetCurrentLocation='';
var intervalCalculateDistance='';
var eventListShow='';
var control = '';
var internet = '';
var login = '';
var checkDes = [];
var arrName = [];
var directionsService;
var empArr = [];
var empArr3 = [];

//var link_url = 'http://' + window.location.host + '/VNIT/www';
var url_link = 'http://10.228.29.45/emp/api/emp';

var emp;
var name;
var rank;
var classname;
var stationname;
var email;
var emppass;
var empbc;
var emppwdpass;
// =======================================================================================================================================================================================================================

 
$(document).ready(function ()
{
   
  $('#hidenf2').hide();
  
  

  $('#addContribution').click(function ()
    {
         var newAmount = $('#contributionAmount').val();
     if (newAmount != '')
        {
            $('#contributionList').append('<li><a>' + newAmount + '</a><a class="deleteMe"></a></li>').listview('refresh');
            $('#contributionAmount').val('');
         }
         else
        {
        alert('Nothing to add');   
        }
    });
    
    $('#btnLoadID').click(function ()
    {
        $('#btnLoadID').hide();
        $('#hidenf').show();
        $('#emp_no').find('option')
        .remove()
        .end();
        var i;
        for (i = 0; i < empArr.length; i++)
        {
            $('#emp_no').append($('<option>', {
                text: empArr[i]
            }));
        }
        $('#emp_no').selectmenu("refresh");
    });

    $('#btnDetail').click(function ()
    {
        loadDetail();
    });

});
function SearchEvent()
{  
    var emp = $('#searchkey').val();
    if ($('#searchkey').val().trim() == '')
    {
        alert('Please input keyword');

    }
    else
    {    $.ajax({
           
        url: url_link + '?emp='+$('#searchkey').val(),
			type: 'GET',
			cache: false,
			success: function(string){
				try{
                   
				    if (string.length > 0) {
				        var i = string.length;
				        $('#hidenf').show();
				        $('#hidenf2').show();

				        for (i = 0; i < string.length; i++) {
				            empArr3.push(string[i].EMP_NO);

				            document.getElementById("EMP_NO").innerHTML = 'EMP NO :' + string[i].EMP_NO;
				            document.getElementById("EMP_NAME").innerHTML = 'Name :' + string[i].EMP_NAME;
				            document.getElementById("EMP_RANK").innerHTML = 'RANK :' + string[i].EMP_RANK;
				            document.getElementById("CLASS_NAME").innerHTML = 'CLASS NAME :' + string[i].CLASS_NAME;
				            document.getElementById("STATION_NAME").innerHTML = 'STATION NAME :' + string[i].STATION_NAME;
				            document.getElementById("QUIT_DATE").innerHTML ='QUIT DATE :' + string[i].QUIT_DATE ;
				            //document.getElementById("EMP_PASS").innerHTML ='EMP PASS :' + string[i].EMP_PASS ;
                            document.getElementById("EMP_PASS").innerHTML ='EMP PASS : ********' ;
				            //document.getElementById("EMP_BC").innerHTML ='EMP BC:' + string[i].EMP_BC ;
                            document.getElementById("EMP_BC").innerHTML ='EMP BC:********';
				            document.getElementById("EMP_PWD_PASS").innerHTML ='EMP PWD PASS :' + string[i].EMP_PWD_PASS ;
				            document.getElementById("EMAIL").innerHTML = 'EMAIL :' + string[i].EMAIL;



				            document.getElementById("txtempupdate").value = string[i].EMP_NO;
				            document.getElementById("txtnameupdate").value = string[i].EMP_NAME;
				            document.getElementById("txtrankupdate").value = string[i].EMP_RANK;
				            document.getElementById("txtclassnameupdate").value = string[i].CLASS_NAME;
				            document.getElementById("txtstationnameupdate").value = string[i].STATION_NAME;
				            document.getElementById("txtquitdateupdate").value = string[i].QUIT_DATE;
				            document.getElementById("txtemppassupdate").value = string[i].EMP_PASS;
				            document.getElementById("txtembbcupdate").value = string[i].EMP_BC;
				            document.getElementById("txtemppwdpassupdate").value = string[i].EMP_PWD_PASS;
				            document.getElementById("txtemailupdate").value = string[i].EMAIL;
              				        }
				    }
				    else {
				       
				        $('#hidenf2').hide();
				        alert('No result');
				    }
				} catch (e) {
					alert(e.message)
				}
			},
		});
        
        
        
    }
}
// Function Insert Data ==================================================================================================================================================================================================================

function InsertSubmit() {
    var emp = $('#txtemp').val();
    var name = $('#txtname').val();
    var classname = $('#txtclassname').val();
    var emppass = $('#txtemppass').val();
 
    if ($('#txtemp').val().trim() == '') {
        alert('Please input EMP_NO!');
        $('#txtemp').focus();
        return;
    }
    else if ($('#txtname').val().trim() == '') {
        alert('Please input Name!');
        $('#txtname').focus();
        return;
    }
    else if ($('#txtemppass').val().trim() == '') {
        alert('Please input Emp Pass!');
        $('#txtrank').focus();
        return;
    }
    else if ($('#txtclassname').val().trim() == '') {
        alert('Please input Class Name!');
        $('#txtclassname').focus();
        return;
    }

    var mydata =
      {
          "posttype": "INSERT",
          "empno": $('#txtemp').val(),
          "empname": $('#txtname').val(),
          "classname": $('#txtclassname').val(),
          "emppass": $('#txtemppass').val()
      };

    $.ajax({
        type: "POST",
        async: false,
        url: url_link,
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(mydata),
        success: function (data) {
            alert(data);
            //alert('Insert success');
            $("#InsertForm :input").each(function () {
                $(this).val('');
            });
        },
        error: function (xhr, ajaxOptions, thrownError)
        { alert("Error select SQL! \nL�~i truy v��n SQL!"); return false; }
    });

}
// Function Update Date=======================================================================================================================================================

function UpdateSubmitee() 
{
            var emp = $('#txtempupdate').val();
            var name = $('#txtnameupdate').val();
            var classname = $('#txtclassnameupdate').val();
            var emppass = $('#txtemppassupdate').val();

            if ($('#txtempupdate').val().trim() == '') {
                alert('Please input EMP_NO!');
                $('#txtempupdate').focus();
                return;
            }
            else if ($('#txtnameupdate').val().trim() == '') {
                alert('Please input Name!');
                $('#txtnameupdate').focus();
                return;
            }
            else if ($('#txtclassnameupdate').val().trim() == '') {
                alert('Please input Class Name!');
                $('#txtclassnameupdate').focus();
                return;
            }
            else if ($('#txtemppassupdate').val().trim() == '') {
                alert('Please input Emp Pass!');
                $('#txtemppassupdate').focus();
                return;
            }

            var mydata =

              {
                  "posttype": "UPDATE",
                  "empno": $('#txtempupdate').val(),
                  "empname": $('#txtnameupdate').val(),
                  "classname": $('#txtclassnameupdate').val(),
                  "emppass": $('#txtemppassupdate').val()
              };

            $.ajax({
                type: "POST",
                async: false,
                url: url_link,
                contentType: "application/json",
                datatype: "json",
                data: JSON.stringify(mydata),
                success: function (data) {
                    console.log(data);
                    alert('Update data success');
                    // xoa data input sau khi insert
                    $("#InsertForm :input").each(function () {
                        $(this).val('');
                    });
                },
                error: function (xhr, ajaxOptions, thrownError)
                { alert("Error select SQL! \nL�~i truy v��n SQL!"); return false; }
            });
       
    
}
function DeleteSubmit() {
    var emp = $('#txtempupdate').val();
   
        var name = $('#txtnameupdate').val();
        var classname = $('#txtclassnameupdate').val();
        var emppass = $('#txtemppwdupdate').val();
        if (emp == "") {
            alert('Please InPut Emp No');
        }
        else {
            var mydata =

                  {
                      "posttype": "DELETE",
                      "empno": $('#txtempupdate').val(),
                      "empname": $('#txtnameupdate').val(),
                      "classname": $('#txtclassnameupdate').val(),
                      "emppass": $('#txtemppwdupdate').val()
                  };

            $.ajax({
                type: "POST",
                async: false,
                url: url_link,
                contentType: "application/json",
                datatype: "json",
                data: JSON.stringify(mydata),
                success: function (data) {
                    console.log(data);
                    alert(data);
                    //window.history.back();
                        $("#InsertForm :input").each(function () {
                        $(this).val('');
                    });
                },
                error: function (xhr, ajaxOptions, thrownError)
                { alert("Error select SQL! \nL�~i truy v��n SQL!"); return false; }
            });
        }
}
// Event when click button Update Data ==================================================================================================================================================================================================================

function UpdateEvent()
{
    
    $.ajax({
       
        url: url_link + '?emp='+$('#searchkey').val(),
			type: 'GET',
			cache: false,
			success: function(arr){
				//var arr = string;
				if (arr.length > 0)
				{
					
					var i;
					for (i = 0; i < arr.length; i++)
					{
						                                   
                                    document.getElementById("txtempupdate").value = arr[i].EMP_NO;
                                    document.getElementById("txtnameupdate").value = arr[i].EMP_NAME;
                                    document.getElementById("txtrankupdate").value = arr[i].EMP_RANK;
                                    document.getElementById("txtclassnameupdate").value =arr[i].CLASS_NAME;
                                    document.getElementById("txtstationnameupdate").value = arr[i].STATION_NAME;
                                    document.getElementById("txtemailupdate").value = arr[i].EMP_BC;
                                    document.getElementById("txtemppassupdate").value = "********";;
                                    document.getElementById("txtembbcupdate").value = "********";;
                                    document.getElementById("txtemppwdpassupdate").value = arr[i].EMP_PWD_PASS;
                      }
				}
			},
			error: function ()
			{
				alert('Error!');
			}
		});
}

