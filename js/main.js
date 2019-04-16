var objAddress = [];
var objSubscription = [];
var objSubscribedTill = [];
var objReport = {};
var nCurrentRow = 0;
var bNewRecord = false;
var bEditRecord = false;
var bSubsNewRecord = false;
var bSubsEditRecord = false;
var nZindex = 5; //Stores the Windows Zindex
var t; //Stores idle time

window.onload = function () {
    //Position Login Screen in the middle and display it
    document.getElementById("login").style.top = parseInt(window.innerHeight/2) - 100 + "px";
    document.getElementById("login").style.left = parseInt(window.innerWidth/2) - 158 + "px";
    document.getElementById("login").style.display = "block";

    document.getElementById("txtUsername").focus();

    //Add All the Event Listerners to the Function.
    document.getElementById("btnLogin").addEventListener("click", btnLogin_Clicked);
    document.getElementById("mnuLogOff").addEventListener("click", mnuLogOff_Clicked);
    document.getElementById("mnuBackup").addEventListener("click", mnuBackup_Clicked);
    document.getElementById("mnuAddress").addEventListener("click", mnuAddress_Clicked);
    document.getElementById("mnuRemoveNames").addEventListener("click", mnuRemoveNames_Clicked);
    document.getElementById("mnuDeleteCustomer").addEventListener("click", mnuDeleteCustomer_Clicked);
    document.getElementById("mnuClose").addEventListener("click", mnuClose_Clicked);
    document.getElementById("mnuHide").addEventListener("click", mnuClose_Clicked);
    document.getElementById("mnuCloseAll").addEventListener("click", mnuCloseAll_Clicked);
    document.getElementById("mnuArrangeAll").addEventListener("click", mnuArrangeAll_Clicked);
    document.getElementById("mnuCycle").addEventListener("click", mnuCycle_Clicked);
    document.getElementById("btnQuit").addEventListener("click", btnQuit_Clicked);
    document.getElementById("addressMin").addEventListener("click", WindowClose_Clicked);
    document.getElementById("addressClose").addEventListener("click", WindowClose_Clicked);
    document.getElementById("removeMin").addEventListener("click", WindowClose_Clicked);
    document.getElementById("removeClose").addEventListener("click", WindowClose_Clicked);
    document.getElementById("modifyMin").addEventListener("click", WindowClose_Clicked);
    document.getElementById("modifyClose").addEventListener("click", WindowClose_Clicked);
    document.getElementById("searchMin").addEventListener("click", WindowClose_Clicked);
    document.getElementById("searchClose").addEventListener("click", WindowClose_Clicked);
    document.getElementById("reportMin").addEventListener("click", WindowClose_Clicked);
    document.getElementById("reportClose").addEventListener("click", WindowClose_Clicked);
    document.getElementById("divAddressHead").addEventListener("click", divAddressHead_Clicked);
    document.getElementById("divSubscriptionHead").addEventListener("click", divSubscriptionHead_Clicked);
    document.getElementById("divPreviousAddHead").addEventListener("click", divPreviousAddHead_Clicked);
    document.getElementById("btnFirstRow").addEventListener("click", btnFirstRow_Clicked);
    document.getElementById("btnPreviousRow").addEventListener("click", btnPreviousRow_Clicked);
    document.getElementById("btnNextRow").addEventListener("click", btnNextRow_Clicked);
    document.getElementById("btnLastRow").addEventListener("click", btnLastRow_Clicked);
    document.getElementById("numSearchCust").addEventListener("keyup", numSearchCust_Changed);
    document.getElementById("numSearchCust").addEventListener("change", numSearchCust_Changed);
    document.getElementById("btnRemove").addEventListener("click", btnRemove_Clicked);
    document.getElementById("btnNew").addEventListener("click", btnNew_Clicked);
    document.getElementById("btnClear").addEventListener("click", btnClear_Clicked);
    document.getElementById("btnEdit").addEventListener("click", btnEdit_Clicked);
    document.getElementById("btnSave").addEventListener("click", btnSave_Clicked);
    document.getElementById("btnCopyAdd").addEventListener("click", btnCopyAdd_Clicked);
    document.getElementById("btnModify").addEventListener("click", btnModify_Clicked);
    document.getElementById("ddbMonth").addEventListener("change", DisplayRemoveSubscribers);
    document.getElementById("ddbYear").addEventListener("change", DisplayRemoveSubscribers);
    document.getElementById("radSubTypeP").addEventListener("change", DisplayRemoveSubscribers);
    document.getElementById("radSubTypeH").addEventListener("change", DisplayRemoveSubscribers);
    document.getElementById("chkRemoved").addEventListener("change", DisplayRemoveSubscribers);
    document.getElementById("btnRemovePrint").addEventListener("click", btnRemovePrint_Clicked);
    document.getElementById("btnSubsQuit").addEventListener("click", btnSubsQuit_Clicked);
    document.getElementById("btnSubsNew").addEventListener("click", btnSubsNew_Clicked);
    document.getElementById("btnSubsEdit").addEventListener("click", btnSubsEdit_Clicked);
    document.getElementById("btnSubsClear").addEventListener("click", btnSubsClear_Clicked);
    document.getElementById("btnSubsDelete").addEventListener("click", btnSubsDelete_Clicked);
    document.getElementById("btnSubsSave").addEventListener("click", btnSubsSave_Clicked);
    document.getElementById("btnSearch").addEventListener("click", btnSearch_Clicked);
    document.getElementById("mnuKerala").addEventListener("click", mnuKerala_Clicked);
    document.getElementById("mnuOutOfKerala").addEventListener("click", mnuOutOfKerala_Clicked);
    document.getElementById("mnuForeign").addEventListener("click", mnuForeign_Clicked);
    document.getElementById("mnuModifyReport").addEventListener("click", mnuModifyReport_Clicked);
    document.getElementById("btnRptQuit").addEventListener("click", btnRptQuit_Clicked);
    document.getElementById("btnRptEdit").addEventListener("click", btnRptEdit_Clicked);
    document.getElementById("btnRptClear").addEventListener("click", btnRptClear_Clicked);
    document.getElementById("btnRptSave").addEventListener("click", btnRptSave_Clicked);
    document.getElementById("txtRptLeft").addEventListener("keyup", txtRptLeft_Changed);
    document.getElementById("txtRptLeft").addEventListener("change", txtRptLeft_Changed);
    document.getElementById("txtRptTop").addEventListener("keyup", txtRptTop_Changed);
    document.getElementById("txtRptTop").addEventListener("change", txtRptTop_Changed);

    ReadOnlyMode();

    //Populate Username and Password
    //if (localStorage.getItem("sUserName") != undefined) {
    //    document.getElementById("txtUsername").value = localStorage.getItem("sUserName");
    //    document.getElementById("txtPassword").value = localStorage.getItem("sPassword");
    //}

    //Set Months on Modify Window
    for (i = 1; i < 13; i++) {
        var option = document.createElement("option");
        option.text = myShortMonth(i);
        document.getElementById("ddbSubsFromMth").add(option);
    }

    //Set Months on Modify Window
    for (i = 1; i < 13; i++) {
        var option = document.createElement("option");
        option.text = myShortMonth(i);
        document.getElementById("ddbSubsToMth").add(option);
    }
    
    //Set Months on Remove Window
    for (i = 1; i < 13; i++) {
        var option = document.createElement("option");
        option.text = myShortMonth(i);
        document.getElementById("ddbMonth").add(option);
    }


    //Set Year on Remove Window
    for (i = -12; i < 14; i++) {
        var d = new Date();
        var n = d.getFullYear() + i;
        var option = document.createElement("option");
        option.text = n;
        document.getElementById("ddbYear").add(option);
    }

    //select the current Year and Month
    document.getElementById("ddbYear").selectedIndex = "6";
    document.getElementById("ddbMonth").selectedIndex = d.getMonth();

    //Start checking for inactivity time.
    inactivityTime();

};

window.onunload = function () {
    SaveWindowsPosition();
};

function ShowMenu() {

    //Check for Current Version of the App
    if (objReport.APP_VERSION > 1.41) {
        alert("App Updated. Please click OK and login again!");
        location.reload(true);
    }

    document.getElementById("LoadingAnimation").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("mnuDeleteCustomer").style.color = "grey";

};

//*********************Start Functions to Log Out if inactive for 10 minutes.***********************//

function inactivityTime() {
    window.onmousemove = resetTimer;
    window.onkeypress = resetTimer;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // touchscreen presses
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;     // touchpad clicks
    window.onscroll = resetTimer;    // scrolling with arrow keys
    window.onkeypress = resetTimer;


};

function logout() {
    //Logout of system
    mnuLogOff_Clicked();
    console.log("You are logged Out!")
};

function resetTimer() {
    if (document.getElementById("login").style.display == "none") {
        clearTimeout(t);
        t = setTimeout(logout, 600000)
        // 1000 milisec = 1 sec
    }
};

//*********************End Functions to Log Out if inactive for 10 minutes.***********************//

function SetWindowsPosition() {

    if (localStorage.getItem("ADDRESS_TOP") == undefined || localStorage.getItem("ADDRESS_TOP") <= 0 ) {

        //Set default Values
        document.getElementById("address").style.top = "200px";
        document.getElementById("address").style.left = "58px";

        document.getElementById("remove").style.top = "50px";
        document.getElementById("remove").style.left = "678px";

        document.getElementById("modify").style.top = "230px";
        document.getElementById("modify").style.left = "800px";

        document.getElementById("report").style.top = "70px";
        document.getElementById("report").style.left = "100px";


    } else {

        if (localStorage.getItem("REPORT_TOP") < 0) localStorage.setItem("REPORT_TOP", "70");
        if (localStorage.getItem("REPORT_LEFT") < 0) localStorage.setItem("REPORT_LEFT", "100");

        document.getElementById("address").style.top = localStorage.getItem("ADDRESS_TOP") + "px";
        document.getElementById("address").style.left = localStorage.getItem("ADDRESS_LEFT") + "px";

        document.getElementById("remove").style.top = localStorage.getItem("REMOVE_TOP") + "px";
        document.getElementById("remove").style.left = localStorage.getItem("REMOVE_LEFT") + "px";

        document.getElementById("modify").style.top = localStorage.getItem("MODIFY_TOP") + "px";
        document.getElementById("modify").style.left = localStorage.getItem("MODIFY_LEFT") + "px";

        document.getElementById("report").style.top = localStorage.getItem("REPORT_TOP") + "px";
        document.getElementById("report").style.left = localStorage.getItem("REPORT_LEFT") + "px";

    }
        

};

function SaveWindowsPosition() {
    //Save only if Window Position has been set and logged in. 
    if (document.getElementById("address").style.top.replace('px', '') > 0) {
        localStorage.setItem("ADDRESS_TOP", document.getElementById("address").style.top.replace('px', ''));
        localStorage.setItem("ADDRESS_LEFT", document.getElementById("address").style.left.replace('px', ''));
        localStorage.setItem("REMOVE_TOP", document.getElementById("remove").style.top.replace('px', ''));
        localStorage.setItem("REMOVE_LEFT", document.getElementById("remove").style.left.replace('px', ''));
        localStorage.setItem("MODIFY_TOP", document.getElementById("modify").style.top.replace('px', ''));
        localStorage.setItem("MODIFY_LEFT", document.getElementById("modify").style.left.replace('px', ''));
        localStorage.setItem("REPORT_TOP", document.getElementById("report").style.top.replace('px', ''));
        localStorage.setItem("REPORT_LEFT", document.getElementById("report").style.left.replace('px', ''));
    }

};

function Server_Error(errMsg) {

    //Log off the system 
    mnuLogOff_Clicked();
    document.getElementById("login-error").innerHTML = "Server Communication Error!";
    document.getElementById("login-error").style.display = "block";

    //Send Alert to the Programmer.
    console.log(" ####SERVER ERROR#####   " + errMsg);

};

function myShortMonth(nMonth) {
    nMonth = Number(nMonth)
    switch (nMonth) {
        case 0:
            return "000";
            break;
        case 1:
            return "JAN";
            break;
        case 2:
            return "FEB";
            break;
        case 3:
            return "MAR";
            break;
        case 4:
            return "APR";
            break;
        case 5:
            return "MAY";
            break;
        case 6:
            return "JUN";
            break;
        case 7:
            return "JUL";
            break;
        case 8:
            return "AUG";
            break;
        case 9:
            return "SEP";
            break;
        case 10:
            return "OCT";
            break;
        case 11:
            return "NOV";
            break;
        case 12:
            return "DEC";
            break;
    }
};

//Code When Login Button is clicked.
function btnLogin_Clicked() {

    if (localStorage.getItem("sUserName") == undefined || (localStorage.getItem("sUserName") == document.getElementById("txtUsername").value && document.getElementById("txtPassword").value == localStorage.getItem("sPassword"))) {
        //Hide the login window
        document.getElementById("login").style.display = "none";
        document.getElementById("LoadingAnimation").style.display = "block";
        document.getElementById("login-error").style.display = "none";

        //Load Address Data to Memory
        LoadAddressData();
    }
    else {
        //Invalid Username or Password
        document.getElementById("login-error").innerHTML = "Invalid Username or Password!";
        document.getElementById("login-error").style.display = "block";
        document.getElementById("txtUsername").focus();
    }

};


function txtUserName_Changed(event) {
    document.getElementById("login-error").style.display = "none";

    if (event.keyCode == 13) {
        document.getElementById("txtPassword").focus();
    }
};

function txtPassword_Changed(event) {
    document.getElementById("login-error").style.display = "none";

    if (event.keyCode == 13) {
        document.getElementById("btnLogin").focus();
    }

};

function LoadAddressData() {

    //Load Address Data to Memory
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/address/", true);

    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4){
            if(this.status == 200) {
                objAddress = JSON.parse(this.responseText);
                console.log(objAddress.length);
                LoadSubscriptionData();

                if (localStorage.getItem("sUserName") == undefined) {
                    localStorage.setItem("sUserName", document.getElementById("txtUsername").value);
                    localStorage.setItem("sPassword", document.getElementById("txtPassword").value);
                }
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.send();

};

function LoadSubscriptionData() {
    //Load Subscription Data to Memory
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/subscription/", true);

    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4){
            if(this.status == 200) {
                objSubscription = JSON.parse(this.responseText);
                console.log(objSubscription.length);
                DisplayAddressData();
                LoadSubscribedTillData()
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.send();


};

function LoadSubscribedTillData() {
    //Load SubscribedTill Data to Memory
    var xhttp = new XMLHttpRequest();

    
    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/subscribedtill/", true);

    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4){
            if(this.status == 200) {
                objSubscribedTill = JSON.parse(this.responseText);
                console.log(objSubscribedTill.length);
                LoadReportData();
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.send();


};

function LoadReportData() {

    //Load SubscribedTill Data to Memory
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/report/1024", true);

    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                objReport = JSON.parse(this.responseText);
                console.log(objReport.Id);
                SetWindowsPosition();
                //Stop the Wait Animation and Display Menu
                ShowMenu();
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.send();

}

function RefreshAddressData(sCustId) {

    //Refresh the Address Object
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (this.responseText.trim() != "") {
                    var data = JSON.parse(this.responseText);
                    //Update local objects
                    var nRow = objAddress.findIndex(x => x.Id == sCustId);
                    if (nRow != -1)
                        objAddress.splice(nRow, 1, data);
                    else
                        objAddress.push(data);
                }
                else {
                    //Remove from local objects
                    var nRow = objAddress.findIndex(x => x.Id == sCustId);
                    if (nRow != -1) objAddress.splice(nRow, 1);
                }
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/address/" + sCustId, true);
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.send();

};

function RefreshSubscriptionData(sSubsId) {

    //Refresh the Subscription Object
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (this.responseText.trim() != "") {
                    var data = JSON.parse(this.responseText);
                    //Update local objects
                    var nRow = objSubscription.findIndex(x => x.Id == sSubsId);
                    if (nRow != -1)
                        objSubscription.splice(nRow, 1, data);
                    else
                        objSubscription.push(data);
                }
                else {
                    //Remove from local objects
                    var nRow = objSubscription.findIndex(x => x.Id == sSubsId);
                    if (nRow != -1) objSubscription.splice(nRow, 1);
                }
                DisplaySubscriptionData();
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/subscription/" + sSubsId, true);
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.send();

};

function RefreshSubscribedTillData(sCustId) {

    //Refresh the SubscribedTill Object
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //Remove from local objects
                var nRow = objSubscribedTill.findIndex(x => x.Id == sCustId);
                if (nRow != -1) objSubscribedTill.splice(nRow, 1);

                if (this.responseText.trim() != "") {
                    var data = JSON.parse(this.responseText);
                    //Update local objects insert on the position sorted by date
                    nRow = objSubscribedTill.findIndex(x => Date.parse(x.SUBSCRIBEDTILL) > Date.parse(data.SUBSCRIBEDTILL));
                    if (nRow != -1) {
                        objSubscribedTill.splice(nRow, 0, data);
                    }
                    else {
                        objSubscribedTill.push(data);
                    }
                }
                DisplayRemoveSubscribers();
                DisplayModifyReport();
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.open("GET", "https://" + window.location.hostname + "/rest/api.php/subscribedtill/" + sCustId, true);
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

    xhttp.send();

};

function mnuLogOff_Clicked() {
    //Hide the menu and display the login Screen
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("login-error").style.display = "none";
    document.getElementById("LoadingAnimation").style.display = "none";
    mnuCloseAll_Clicked();
    SaveWindowsPosition();

    document.getElementById("login").style.display = "block";
    document.getElementById("txtUsername").focus();

    objAddress.length = 0;
    objSubscription.length = 0;
    objSubscribedTill.length = 0;
    objReport = {};
    nCurrentRow = 0;
    clearTimeout(t);

};

function mnuBackup_Clicked() {

    //Enter Email address to send backup to.
    var sEmail = "backup@domain.com"; 
    
    if (confirm("Press OK to send backup to " + sEmail)) {

        //Send Databse Backtup to the email provided
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "https://" + window.location.hostname + "/rest/backup/backup.php?email=" + sEmail, true);
        xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert(this.responseText.trim());
                }
                else {
                    Server_Error(this.responseText);
                }
            }
        };

        //Disabled for Demo App
        //xhttp.send();
        alert("This section is disabled for demo app.");

    }

};

function mnuAddress_Clicked() {
    document.getElementById("mnuDeleteCustomer").style.color = "black";
    document.getElementById("address").style.display = "block";
    document.getElementById("address").style.zIndex = nZindex;
    nZindex++;
};

function mnuRemoveNames_Clicked() {
    document.getElementById("remove").style.display = "block";
    document.getElementById("remove").style.zIndex = nZindex;
    nZindex++;
    DisplayRemoveSubscribers();
};

function mnuDeleteCustomer_Clicked() {

    //Delete Customer only if the address windows is displayed. 
    if (document.getElementById("address").style.display != "block") return;

    if (confirm("Press OK if you want to delete " + objAddress[nCurrentRow].NAME.trim() + ". \n \n WARNING!!! This process is irreversible.")){

        //Remove from the Server
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log(this.responseText);
                }
                else {
                    Server_Error(this.responseText);
                }
            }
        };

        xhttp.open("DELETE", "https://" + window.location.hostname + "/rest/api.php/address/" + objAddress[nCurrentRow].Id.trim(), true);
        xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

        //Disabled for Demo App
        //xhttp.send();

        //Remove from local objects
        var nRow = objSubscribedTill.findIndex(x => x.Id == objAddress[nCurrentRow].Id.trim());
        if (nRow != -1) objSubscribedTill.splice(nRow, 1);

        objAddress.splice(nCurrentRow, 1);


        //Go to the Next Row.
        btnNextRow_Clicked();
        DisplayRemoveSubscribers();

    }

};

function mnuClose_Clicked() {
    var bClosed = false;
    var i = nZindex;
    var wndaddress = document.getElementById("address");
    var wndremove = document.getElementById("remove");
    var wndmodify = document.getElementById("modify");
    var wndsearch = document.getElementById("search");
    var wndreport = document.getElementById("report");

    //Close one window at a time based on Zindex
    while (!bClosed) {

        if (wndaddress.style.zIndex == i && wndaddress.style.display != "none")
        {
            wndaddress.style.display = "none";
            document.getElementById("modify").style.display = "none";
            document.getElementById("search").style.display = "none";
            document.getElementById("mnuDeleteCustomer").style.color = "grey";
            bClosed = true;
        }

        if (wndremove.style.zIndex == i && wndremove.style.display != "none") {
            wndremove.style.display = "none";
            bClosed = true;
        }

        if (wndmodify.style.zIndex == i && wndmodify.style.display != "none") {
            wndmodify.style.display = "none";
            bClosed = true;
        }

        if (wndsearch.style.zIndex == i && wndsearch.style.display != "none") {
            wndsearch.style.display = "none";
            bClosed = true;
        }

        if (wndreport.style.zIndex == i && wndreport.style.display != "none") {
            wndreport.style.display = "none";
            bClosed = true;
        }        
        i = i - 1;

        if (i < 0) bClosed = true;
    }

};

function mnuCloseAll_Clicked() {
    //Close All Winows
    document.getElementById("address").style.display = "none";
    document.getElementById("remove").style.display = "none";
    document.getElementById("modify").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("report").style.display = "none";
    document.getElementById("mnuDeleteCustomer").style.color = "grey";

};

function mnuArrangeAll_Clicked() {
    //Set all Windows Position to Default.
    document.getElementById("address").style.top = "200px";
    document.getElementById("address").style.left = "58px";

    document.getElementById("remove").style.top = "50px";
    document.getElementById("remove").style.left = "678px";

    document.getElementById("modify").style.top = "230px";
    document.getElementById("modify").style.left = "800px";

    document.getElementById("report").style.top = "70px";
    document.getElementById("report").style.left = "100px";
};

function mnuCycle_Clicked() {
    var sLastWindow = "address";

    if (document.getElementById("address").style.display == "block") sLastWindow = "address";
    if (document.getElementById("remove").style.display == "block") sLastWindow = "remove";
    if (document.getElementById("modify").style.display == "block") sLastWindow = "modify";
    if (document.getElementById("report").style.display == "block") sLastWindow = "report";

    //Find the Window with lowest zIndex and put it on Top.
    if (Number(document.getElementById("address").style.zIndex) < Number(document.getElementById(sLastWindow).style.zIndex) && document.getElementById("address").style.display == "block") sLastWindow = "address";
    if (Number(document.getElementById("remove").style.zIndex) < Number(document.getElementById(sLastWindow).style.zIndex) && document.getElementById("remove").style.display == "block") sLastWindow = "remove";
    if (Number(document.getElementById("modify").style.zIndex) < Number(document.getElementById(sLastWindow).style.zIndex) && document.getElementById("modify").style.display == "block") sLastWindow = "modify";
    if (Number(document.getElementById("report").style.zIndex) < Number(document.getElementById(sLastWindow).style.zIndex) && document.getElementById("report").style.display == "block") sLastWindow = "report";

    //Set the current Zindex
    document.getElementById(sLastWindow).style.zIndex = nZindex;
    nZindex++;

};

function WindowClose_Clicked() {
    //This is executed when window Close or Minimize is clicked on all windows.
    this.parentNode.parentNode.parentNode.style.display = "none";

    if (this.parentNode.parentNode.parentNode.id == "address") {
        document.getElementById("modify").style.display = "none";
        document.getElementById("search").style.display = "none";
        document.getElementById("mnuDeleteCustomer").style.color = "grey";
    }

};

function mnuKerala_Clicked() {
    //Print Kerala Addresses
    PrintAddresses(11);
};

function mnuOutOfKerala_Clicked() {
    //Print Out Of Kerala Addresses
    PrintAddresses(12);
};

function mnuForeign_Clicked() {
    //Print Foreign Address
    PrintAddresses(13);
};

function mnuModifyReport_Clicked() {
    DisplayModifyReport();
    document.getElementById("report").style.display = "block";
    document.getElementById("report").style.zIndex = nZindex;
    nZindex++;
};

function PrintAddresses(nGroupNo) {

    var nTopMargin = 20;
    var nLeftMargin = 60;
    var nHeight = 172 - nTopMargin;
    var nLableWidth = 358 - nLeftMargin;
    var nFontSize = 15;
    var nDisplaySubs = 0; //default Value

    //Get the demensions from Database
    if (objReport.Id != undefined) {
        nLeftMargin = objReport.LABEL_LEFT;
        nTopMargin = objReport.LABEL_TOP;
        nHeight = Number(objReport.LABEL_HEIGHT) - nTopMargin;
        nLableWidth = Number(objReport.LABEL_WIDTH) - nLeftMargin;
        nFontSize = objReport.LABEL_FONTSIZE;
        nDisplaySubs = objReport.DISPLAY_SUBSCRIPTION;
    }

    var wndReport = window.open("", "", "width=1000,height=850,top=80,left=100");
    var divMain = document.createElement("div");
    wndReport.document.body.appendChild(divMain);

    switch (nGroupNo) {
        case 11:
            wndReport.document.title = "Kerala Address";
            break;
        case 12:
            wndReport.document.title = "Out Of Kerala Address";
            break;
        case 13:
            wndReport.document.title = "Foreign Address";
            break;
    }

    divMain.innerHTML = "<h2>Loading!  Please wait...</h2>";

    //Display it on the HTML table with delay to do events
    setTimeout(function () {

        //Filter Data to be displayed. 
        var objPrintAdrs = objSubscribedTill.filter(x => x.REMOVED == 0 && x.GROUP == nGroupNo);

        //Sort Array here.
        objPrintAdrs.sort(function (a, b) { return (a.NAME > b.NAME) ? 1 : ((b.NAME > a.NAME) ? -1 : 0); }); 

        var aData = objPrintAdrs.map(x => "<div style='display:inline-table;font-family:Arial;font-size:" + nFontSize + "px;height:" + nHeight + "px;width:" + nLableWidth + "px;padding-top:" + nTopMargin + "px;padding-left:" + nLeftMargin + "px;'>" + x.Id + ((nDisplaySubs == 1) ? " - " + DisplayType(x.SUBTYPE, x.SUBSCRIBEDTILL) : "") + "<br/><b>" + x.SALUT + " " + x.NAME + "</b></br>" + FormatAddress(x.ADDR_LINE1, x.ADDR_LINE2, x.ADDR_LINE3, x.TALUK, x.CITY, x.PINCODE, x.DISTRICT, x.STATE, x.COUNTRY) + "</div>");

        divMain.innerHTML = aData.join(" ");

        wndReport.print();
        wndReport.close();

    }, 0);

};


function DisplayType(sType, SUBSCRIBEDTILL) {

    switch (sType) {
        case "L":
            return "[Life]";
            break;
        case "F":
            return "[Free]";
            break;
        case "E":
            return "[Exchange]";
            break;
        default:
            return myShortMonth(SUBSCRIBEDTILL.substring(5, 7)) + "'" + SUBSCRIBEDTILL.substring(0, 4);
    }

}

function FormatAddress(ADDR_LINE1, ADDR_LINE2, ADDR_LINE3, TALUK, CITY, PINCODE, DISTRICT, STATE, COUNTRY) {
    var sFormatedAddress = "";

    if (ADDR_LINE1.trim() != "") {
        sFormatedAddress += ADDR_LINE1;
        if (ADDR_LINE2.trim() == "" && ADDR_LINE3.trim() == "" && TALUK.trim() == "" && CITY.trim() == "" && DISTRICT.trim() == "" && STATE.trim() == "" && PINCODE.trim() != "") {
            sFormatedAddress += " - " + PINCODE;
        }
        sFormatedAddress += "</br>";
    }
    if (ADDR_LINE2.trim() != "") {
        sFormatedAddress += ADDR_LINE2;
        if (ADDR_LINE3.trim() == "" && TALUK.trim() == "" && CITY.trim() == "" && DISTRICT.trim() == "" && STATE.trim() == "" && PINCODE.trim() != "") {
            sFormatedAddress += " - " + PINCODE;
        }
        sFormatedAddress += "</br>";
    }
    if (ADDR_LINE3.trim() != "") {
        sFormatedAddress += ADDR_LINE3;
        if (TALUK.trim() == "" && CITY.trim() == "" && DISTRICT.trim() == "" && STATE.trim() == "" && PINCODE.trim() != "") {
            sFormatedAddress += " - " + PINCODE;
        }
        sFormatedAddress += "</br>";
    }

    //format US address.
    if (TALUK.trim() == "" && CITY.trim() != "" && DISTRICT.trim() == "" && STATE.trim().length == 2 && PINCODE.trim().length == 5) {

        sFormatedAddress += CITY + " " + STATE + " " + PINCODE + "</br>";

    }
     else {

        if (TALUK.trim() != "") {
            sFormatedAddress += TALUK;
            if (CITY.trim() == "" && DISTRICT.trim() == "" && STATE.trim() == "" && PINCODE.trim() != "") {
                sFormatedAddress += " - " + PINCODE;
            }
            sFormatedAddress += "</br>";
        }

        if (CITY.trim() != "") {
            sFormatedAddress += CITY;
            if (DISTRICT.trim() == "" && STATE.trim() == "" && PINCODE.trim() != "") {
                sFormatedAddress += " - " + PINCODE;
            }
            sFormatedAddress += "</br>";
        }

        if (DISTRICT.trim() != "") {
            sFormatedAddress += DISTRICT;
            if (STATE.trim() == "" && PINCODE.trim() != "") {
                sFormatedAddress += " - " + PINCODE;
            }
            sFormatedAddress += "</br>";
        }
        if (STATE.trim() != "") {
            sFormatedAddress += STATE;
            if (PINCODE.trim() != "") {
                sFormatedAddress += " - " + PINCODE;
            }
            sFormatedAddress += "</br>";
        }
        //Everything is Empty but Pincode
        if (ADDR_LINE1.trim() == "" && ADDR_LINE2.trim() == "" && ADDR_LINE3.trim() == "" && TALUK.trim() == "" && CITY.trim() == "" && DISTRICT.trim() == "" && STATE.trim() == "" && PINCODE.trim() != "") {
            sFormatedAddress = PINCODE;
            sFormatedAddress += "</br>";
        }


    };

    if (COUNTRY.trim() != "") {
        sFormatedAddress += COUNTRY;
    }

    return sFormatedAddress;
};


function SetWindowOnTop(sender, event) {

    sender.parentNode.style.zIndex = nZindex;
    nZindex++;

    event.stopPropagation();
}

//*********************Start Functions for Address Screen**********************************//

function btnQuit_Clicked() {
    document.getElementById("address").style.display = "none";
    //If address screen is closed. Close the modify and search screen.
    document.getElementById("modify").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("mnuDeleteCustomer").style.color = "grey";
};

function btnSearch_Clicked() {

    document.getElementById("search").style.top = (Number(document.getElementById("address").style.top.replace('px', '')) + 100) + "px";
    document.getElementById("search").style.left = (Number(document.getElementById("address").style.left.replace('px', '')) + 100) + "px";
    document.getElementById("search").style.zIndex = nZindex;
    nZindex++;

    document.getElementById("search").style.display = "block";

    document.getElementById("txtSearchsubs").focus();

};

function divAddressHead_Clicked() {
    //Activate Address Div
    var divAddressHead = document.getElementById("divAddressHead");
    divAddressHead.style.borderLeft = "2px solid #eaf0f7";
    divAddressHead.style.borderTop = "2px solid #eaf0f7";
    divAddressHead.style.borderRight = "2px solid #b3c0ce";

    document.getElementById("divSubscriptionHead").style.border = "none";
    document.getElementById("divPreviousAddHead").style.border = "none";

    document.getElementById("divAddress").style.display = "block";
    document.getElementById("divSubscription").style.display = "none";
    document.getElementById("divPreviousAdd").style.display = "none";
};

function divSubscriptionHead_Clicked() {
    //Activate Subscription Div
    var divSubscriptionHead = document.getElementById("divSubscriptionHead");
    divSubscriptionHead.style.borderLeft = "2px solid #eaf0f7";
    divSubscriptionHead.style.borderTop = "2px solid #eaf0f7";
    divSubscriptionHead.style.borderRight = "2px solid #b3c0ce";

    document.getElementById("divAddressHead").style.border = "none";
    document.getElementById("divPreviousAddHead").style.border = "none";

    document.getElementById("divAddress").style.display = "none";
    document.getElementById("divSubscription").style.display = "block";
    document.getElementById("divPreviousAdd").style.display = "none";
};


function divPreviousAddHead_Clicked() {
    //Activate Previous Address Div
    var divPreviousAddHead = document.getElementById("divPreviousAddHead");
    divPreviousAddHead.style.borderLeft = "2px solid #eaf0f7";
    divPreviousAddHead.style.borderTop = "2px solid #eaf0f7";
    divPreviousAddHead.style.borderRight = "2px solid #b3c0ce";

    document.getElementById("divSubscriptionHead").style.border = "none";
    document.getElementById("divAddressHead").style.border = "none";

    document.getElementById("divAddress").style.display = "none";
    document.getElementById("divSubscription").style.display = "none";
    document.getElementById("divPreviousAdd").style.display = "block";

};

function DisplayAddressData() {
    //Display Data from the Array to the Text Boxes on the Div
    if (nCurrentRow >= objAddress.length) {
        nCurrentRow = objAddress.length - 1;
    } 

    if (nCurrentRow < 0 ) {
        nCurrentRow = 0;
    } 

    //Clear Search Customer by Id if displaying a different Customer
    if (document.getElementById("numSearchCust").value != objAddress[nCurrentRow].Id.trim()) {
        document.getElementById("numSearchCust").value = "";
    }

    //Clear Search Customer by Name if displaying a different Customer
    if (!objAddress[nCurrentRow].NAME.includes(document.getElementById("txtSearchsubs").value.toUpperCase())) {
        document.getElementById("txtSearchsubs").value = "";
        document.getElementById("divSearchSubs").innerHTML = "";
        document.getElementById("search").style.display = "none";
    }

    document.getElementById("numCustCode").value = objAddress[nCurrentRow].Id.trim();
    document.getElementById("txtCustSal").value = objAddress[nCurrentRow].SALUT.trim();
    document.getElementById("txtCustName").value = objAddress[nCurrentRow].NAME.trim();
    document.getElementById("ddbGroup").value = objAddress[nCurrentRow].GROUP.trim();
    document.getElementById("ddbSubType").value = objAddress[nCurrentRow].SUBTYPE.trim();
    document.getElementById("txtAddress1").value = objAddress[nCurrentRow].ADDRESS1.trim();
    document.getElementById("txtAddress2").value = objAddress[nCurrentRow].ADDRESS2.trim();
    document.getElementById("txtAddress3").value = objAddress[nCurrentRow].ADDRESS3.trim();
    document.getElementById("txtTaluk").value = objAddress[nCurrentRow].TALUK.trim();
    document.getElementById("txtCity").value = objAddress[nCurrentRow].CITY.trim();
    document.getElementById("txtDistrict").value = objAddress[nCurrentRow].DISTRICT.trim();
    document.getElementById("txtPin").value = objAddress[nCurrentRow].PINCODE.trim();
    document.getElementById("txtState").value = objAddress[nCurrentRow].STATE.trim();
    document.getElementById("txtCounty").value = objAddress[nCurrentRow].COUNTRY.trim();
    document.getElementById("txtContactNo").value = objAddress[nCurrentRow].PHONE.trim();
    document.getElementById("txtOldAddress1").value = objAddress[nCurrentRow].OLDADD1.trim();
    document.getElementById("txtOldAddress2").value = objAddress[nCurrentRow].OLDADD2.trim();
    document.getElementById("txtOldAddress3").value = objAddress[nCurrentRow].OLDADD3.trim();
    document.getElementById("txtOldTaluk").value = objAddress[nCurrentRow].OLDTALUK.trim();
    document.getElementById("txtOldCity").value = objAddress[nCurrentRow].OLDCITY.trim();
    document.getElementById("txtOldDistrict").value = objAddress[nCurrentRow].OLDDISTR.trim();
    document.getElementById("txtOldPin").value = objAddress[nCurrentRow].OLDPINCD.trim();
    document.getElementById("txtOldState").value = objAddress[nCurrentRow].OLDSTATE.trim();
    document.getElementById("txtOldCounty").value = objAddress[nCurrentRow].OLDCNTRY.trim();

    //If Removed show the removed label and change the remove button value.
    if (objAddress[nCurrentRow].REMOVED.trim() == "1") {
        document.getElementById("lblRemoved").style.display = "block";
        document.getElementById("btnRemove").value = "Recall";
    }
    else{
        document.getElementById("lblRemoved").style.display = "none";
        document.getElementById("btnRemove").value = "Remove";
    }

    DisplaySubscriptionData();
    DisplayModifyReport();

};

//Function to Display the Subscription Details from the Customer Id.
function DisplaySubscriptionData() {
    
    //Find all the Subscriptions for the customer
    var objSubsRow = objSubscription.filter(x => x.CUSTID == objAddress[nCurrentRow].Id.trim());

    var sTable = "<table class=\"tblGrid\" id=\"tblSubscription\"><tr><th>From</th><th>To</th><th>Amount</th><th>Instument</th><th>Inst No</th><th>Inst Date</th><th>Inst Details</th><th>Other Details</th></tr>";
    var aData = [];

    if (objSubsRow.length>0) {
        aData = objSubsRow.map(x => "<tr onclick=\"DisplayModifySubscription(" + x.Id + ",this)\"><td>" + myShortMonth(x.FROM.substring(5, 7)) + " " + x.FROM.substring(0, 4) + "</td><td>" + myShortMonth(x.TO.substring(5, 7)) + " " + x.TO.substring(0, 4) + "</td><td>" + x.AMT + "</td><td>" + x.INST + "</td><td>" + x.INSTNO + "</td><td>" + ((x.INSTDATE=='1900-01-01' || x.INSTDATE=='0000-00-00') ? ' ' : x.INSTDATE) + "</td><td>" + x.INSTDET + "</td><td>" + x.OTHERDET + "</td></tr>");
    }
    sTable = sTable + aData.join(" ") + ("<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>" +
        "<tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td></tr ></table >");

    document.getElementById("divSubsRows").innerHTML = sTable;

    //Display Data  on Subscriptions Edit Screen
    if (objSubsRow.length > 0) {
        var nRow = objSubsRow.findIndex(x => x.Id == document.getElementById("txtSubsId").value);
        if (nRow != -1) {
            DisplayModifySubscription(document.getElementById("txtSubsId").value);
        }
        else {
            DisplayModifySubscription(objSubsRow[0].Id.trim());
        }
    }
    else {
        setSubsNew();
        document.getElementById("txtSubsId").value = "";
    }

    //Set Subscribtions Edit Screen to Read Only
    SubsReadOnlyMode()
};

function EditMode() {
    //change all text boxes to edit mode
    document.getElementById("txtCustSal").readOnly = false;
    document.getElementById("txtCustName").readOnly = false;
    document.getElementById("ddbGroup").disabled = false;
    document.getElementById("ddbSubType").disabled = false;
    document.getElementById("txtAddress1").readOnly = false;
    document.getElementById("txtAddress2").readOnly = false;
    document.getElementById("txtAddress3").readOnly = false;
    document.getElementById("txtTaluk").readOnly = false;
    document.getElementById("txtCity").readOnly = false;
    document.getElementById("txtDistrict").readOnly = false;
    document.getElementById("txtPin").readOnly = false;
    document.getElementById("txtState").readOnly = false;
    document.getElementById("txtCounty").readOnly = false;
    document.getElementById("txtContactNo").readOnly = false;
    document.getElementById("txtOldAddress1").readOnly = false;
    document.getElementById("txtOldAddress2").readOnly = false;
    document.getElementById("txtOldAddress3").readOnly = false;
    document.getElementById("txtOldTaluk").readOnly = false;
    document.getElementById("txtOldCity").readOnly = false;
    document.getElementById("txtOldDistrict").readOnly = false;
    document.getElementById("txtOldPin").readOnly = false;
    document.getElementById("txtOldState").readOnly = false;
    document.getElementById("txtOldCounty").readOnly = false;
    document.getElementById("btnCopyAdd").disabled = false;

    //Disable Search Customer
    document.getElementById("numSearchCust").readOnly = true;

    //Enable Save and Clear Button
    document.getElementById("btnSave").disabled = false;
    document.getElementById("btnClear").disabled = false;

    //Disable All other buttons.
    document.getElementById("btnNew").disabled = true;
    document.getElementById("btnEdit").disabled = true;
    document.getElementById("btnSearch").disabled = true;
    document.getElementById("btnRemove").disabled = true;
    document.getElementById("btnFirstRow").disabled = true;
    document.getElementById("btnPreviousRow").disabled = true;
    document.getElementById("btnNextRow").disabled = true;
    document.getElementById("btnLastRow").disabled = true;
    document.getElementById("btnModify").disabled = true;

};

function ReadOnlyMode() {
    //change all text boxes to readonly mode
    document.getElementById("numCustCode").readOnly = true;
    document.getElementById("txtCustSal").readOnly = true;
    document.getElementById("txtCustName").readOnly = true;
    document.getElementById("ddbGroup").disabled = true;
    document.getElementById("ddbSubType").disabled = true;
    document.getElementById("txtAddress1").readOnly = true;
    document.getElementById("txtAddress2").readOnly = true;
    document.getElementById("txtAddress3").readOnly = true;
    document.getElementById("txtTaluk").readOnly = true;
    document.getElementById("txtCity").readOnly = true;
    document.getElementById("txtDistrict").readOnly = true;
    document.getElementById("txtPin").readOnly = true;
    document.getElementById("txtState").readOnly = true;
    document.getElementById("txtCounty").readOnly = true;
    document.getElementById("txtContactNo").readOnly = true;
    document.getElementById("txtOldAddress1").readOnly = true;
    document.getElementById("txtOldAddress2").readOnly = true;
    document.getElementById("txtOldAddress3").readOnly = true;
    document.getElementById("txtOldTaluk").readOnly = true;
    document.getElementById("txtOldCity").readOnly = true;
    document.getElementById("txtOldDistrict").readOnly = true;
    document.getElementById("txtOldPin").readOnly = true;
    document.getElementById("txtOldState").readOnly = true;
    document.getElementById("txtOldCounty").readOnly = true;
    document.getElementById("btnCopyAdd").disabled = true;

    //Enable Search Customer
    document.getElementById("numSearchCust").readOnly = false;

    //Disable Save and Clear Button
    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnClear").disabled = true;

    //Enable All other buttons.
    document.getElementById("btnNew").disabled = false;
    document.getElementById("btnEdit").disabled = false;
    document.getElementById("btnSearch").disabled = false;
    document.getElementById("btnRemove").disabled = false;
    document.getElementById("btnFirstRow").disabled = false;
    document.getElementById("btnPreviousRow").disabled = false;
    document.getElementById("btnNextRow").disabled = false;
    document.getElementById("btnLastRow").disabled = false;
    document.getElementById("btnModify").disabled = false;
};


function btnFirstRow_Clicked() {
    nCurrentRow = 0;
    DisplayAddressData();
};

function btnPreviousRow_Clicked() {
    nCurrentRow = nCurrentRow - 1;
    if (nCurrentRow < 0) { nCurrentRow = 0; }
    DisplayAddressData();
};

function btnNextRow_Clicked() {
    nCurrentRow = nCurrentRow + 1;
    if (nCurrentRow >= objAddress.length) { nCurrentRow = objAddress.length-1; }
    DisplayAddressData();
};

function btnLastRow_Clicked() {
    nCurrentRow = objAddress.length-1;
    DisplayAddressData();
};

function numSearchCust_Changed() {
    //Find with Customer Id
    var nRow = 0;
    nRow = objAddress.findIndex(x => x.Id == this.value);

     if (nRow != -1) {
        nCurrentRow = nRow;
        DisplayAddressData();
    }
    else {
         //Display Not Found Message
    }
    
};

//Mark the Subscriber as Removed.
function btnRemove_Clicked() {
    var btnRemove  = document.getElementById("btnRemove");
    var lblRemoved = document.getElementById("lblRemoved");
    var bFound = false;

    if (btnRemove.value=="Remove"){
        if (confirm("Please Press OK to mark it 'Removed'.")) {

            lblRemoved.style.display = "block";
            btnRemove.value = "Recall";

            //Update Local Object
            objAddress[nCurrentRow].REMOVED = "1";
            
            var nRow = objSubscribedTill.findIndex(x => x.Id == objAddress[nCurrentRow].Id.trim());
            if (nRow != -1) objSubscribedTill[nRow].REMOVED = "1";


            //Send update statement to the Database
            var data = {};
            data.REMOVED = "1";
            var json = JSON.stringify(data);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        console.log(this.responseText);
                    }
                    else {
                        Server_Error(this.responseText);
                    }
                }
            };

            xhttp.open("PUT", "https://" + window.location.hostname + "/rest/api.php/address/" + objAddress[nCurrentRow].Id.trim(), true);
            xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));
            xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
            xhttp.send(json);

        }

    }
    else {
        if (confirm("Please Press OK to recall the record.")) {

            lblRemoved.style.display = "none";
            btnRemove.value = "Remove";

            //Update Local Object
            objAddress[nCurrentRow].REMOVED = "0";

            var nRow = objSubscribedTill.findIndex(x => x.Id == objAddress[nCurrentRow].Id.trim());
            if (nRow != -1) objSubscribedTill[nRow].REMOVED = "0";

            //Send update statement to the Database
            var data = {};
            data.REMOVED = "0";
            var json = JSON.stringify(data);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        console.log(this.responseText);
                    }
                    else {
                        Server_Error(this.responseText);
                    }
                }
            };

            xhttp.open("PUT", "https://" + window.location.hostname + "/rest/api.php/address/" + objAddress[nCurrentRow].Id.trim(), true);
            xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));
            xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
            xhttp.send(json);

        }

    }

    //If remove window is visible, then check or uncheck the remove checkbox
    if (document.getElementById("remove").style.display == "block") {
        var rmTable = document.getElementById("tblRemove");

        for (i = 0; i < rmTable.rows.length; i++) {

            if (rmTable.rows[i].cells[0].innerHTML == objAddress[nCurrentRow].Id.trim()) {
                bFound = true;
                if (btnRemove.value == "Remove")
                    document.getElementById("chkRemove_" + objAddress[nCurrentRow].Id.trim()).checked = false;
                else
                    document.getElementById("chkRemove_" + objAddress[nCurrentRow].Id.trim()).checked = true;
            }

        }

        if (!bFound) DisplayRemoveSubscribers();
    }

};


//Add New Subscriber to the Database
function btnNew_Clicked() {

    //Set Boolean New to True;
    bNewRecord = true;
    bEditRecord = false;

    //Change All Text Boxes to Edit Mode.
    EditMode();

    document.getElementById("txtCustSal").value = "";
    document.getElementById("txtCustName").value = "";
    document.getElementById("ddbGroup").value = "11";
    document.getElementById("ddbSubType").value = "L";
    document.getElementById("txtAddress1").value = "";
    document.getElementById("txtAddress2").value = "";
    document.getElementById("txtAddress3").value = "";
    document.getElementById("txtTaluk").value = "";
    document.getElementById("txtCity").value = "";
    document.getElementById("txtDistrict").value = "";
    document.getElementById("txtPin").value = "";
    document.getElementById("txtState").value = "";
    document.getElementById("txtCounty").value = "";
    document.getElementById("txtContactNo").value = "";
    document.getElementById("txtOldAddress1").value = "";
    document.getElementById("txtOldAddress2").value = "";
    document.getElementById("txtOldAddress3").value = "";
    document.getElementById("txtOldTaluk").value = "";
    document.getElementById("txtOldCity").value = "";
    document.getElementById("txtOldDistrict").value = "";
    document.getElementById("txtOldPin").value = "";
    document.getElementById("txtOldState").value = "";
    document.getElementById("txtOldCounty").value = "";
    lblRemoved.style.display = "none";

    var table = document.getElementById("tblSubscription");

    //Delete All Rows Except Title for Subscription Table
    while (table.rows.length > 3) {
        table.deleteRow(table.rows.length - 3);
    }

    setSubsNew();
    document.getElementById("txtSubsId").value = "";
    document.getElementById("btnSubsEdit").disabled = true;
    document.getElementById("btnSubsDelete").disabled = true;
    document.getElementById("modify").style.display = "none";
    document.getElementById("numCustCode").value = "";

};

//All the Data to be Edited.
function btnEdit_Clicked() {

    //Set Boolean New to False;
    bNewRecord = false;
    bEditRecord = true;

    //Change All Text Boxes to Edit Mode.
    EditMode();

};

//Disable the Edit Mode
function btnClear_Clicked() {

    //Clear the New Boolean
    bNewRecord = false;
    bEditRecord = false;

    //Change all Text Boxes to Readonly Mode
    ReadOnlyMode();

    //Display the current Row.
    DisplayAddressData();
};

//Save Data Array and Database.
function btnSave_Clicked() {

    //Build the JSON Data Object to Send to Server
    var data = {};
    data.SALUT = document.getElementById('txtCustSal').value.toUpperCase();
    data.NAME = document.getElementById('txtCustName').value.toUpperCase();
    data.GROUP = document.getElementById('ddbGroup').value;
    data.ADDRESS1 = document.getElementById('txtAddress1').value.toUpperCase();
    data.ADDRESS2 = document.getElementById('txtAddress2').value.toUpperCase();
    data.ADDRESS3 = document.getElementById('txtAddress3').value.toUpperCase();
    data.TALUK = document.getElementById('txtTaluk').value.toUpperCase();
    data.CITY = document.getElementById('txtCity').value.toUpperCase();
    data.PINCODE = document.getElementById('txtPin').value.toUpperCase();
    data.DISTRICT = document.getElementById('txtDistrict').value.toUpperCase();
    data.STATE = document.getElementById('txtState').value.toUpperCase();
    data.COUNTRY = document.getElementById('txtCounty').value.toUpperCase();
    data.PHONE = document.getElementById('txtContactNo').value.toUpperCase();
    data.SUBTYPE = document.getElementById('ddbSubType').value;
    data.OLDADD1 = document.getElementById('txtOldAddress1').value.toUpperCase();
    data.OLDADD2 = document.getElementById('txtOldAddress2').value.toUpperCase();
    data.OLDADD3 = document.getElementById('txtOldAddress3').value.toUpperCase();
    data.OLDTALUK = document.getElementById('txtOldTaluk').value.toUpperCase();
    data.OLDCITY = document.getElementById('txtOldCity').value.toUpperCase();
    data.OLDPINCD = document.getElementById('txtOldPin').value.toUpperCase();
    data.OLDDISTR = document.getElementById('txtOldDistrict').value.toUpperCase();
    data.OLDSTATE = document.getElementById('txtOldState').value.toUpperCase();
    data.OLDCNTRY = document.getElementById('txtOldCounty').value.toUpperCase();
    var json = JSON.stringify(data);


    //Update Data to Local Object
    if (bNewRecord) {
        nCurrentRow = objAddress.length;
    }
    else if (bEditRecord) {
        data.Id = objAddress[nCurrentRow].Id.trim();
        data.REMOVED = objAddress[nCurrentRow].REMOVED.trim();;
        objAddress.splice(nCurrentRow, 1, data);
    }


    //Create the Http Request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(this.responseText);
                //Update Data to Local Object
                if (Number(this.responseText) > 1) {
                    if (document.getElementById("numCustCode").value == "") document.getElementById("numCustCode").value = this.responseText;
                    RefreshAddressData(this.responseText);
                    RefreshSubscribedTillData(this.responseText); 
                }
                else if (Number(this.responseText) == 1)
                {
                    RefreshSubscribedTillData(objAddress[nCurrentRow].Id.trim());
                }
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };


    if (bNewRecord)
        xhttp.open("POST", "https://" + window.location.hostname + "/rest/api.php/address", true);
    else if (bEditRecord)
        xhttp.open("PUT", "https://" + window.location.hostname + "/rest/api.php/address/" + objAddress[nCurrentRow].Id.trim(), true);

    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);

    //Change all Text Boxes to Readonly Mode
    ReadOnlyMode();

    //Clear the New Boolean
    bNewRecord = false;
    bEditRecord = false;

};


function btnCopyAdd_Clicked() {
    //Copy Current address to the Old address Fields.

    document.getElementById('txtOldAddress1').value = document.getElementById('txtAddress1').value;
    document.getElementById('txtOldAddress2').value = document.getElementById('txtAddress2').value;
    document.getElementById('txtOldAddress3').value = document.getElementById('txtAddress3').value;
    document.getElementById('txtOldTaluk').value = document.getElementById('txtTaluk').value;
    document.getElementById('txtOldCity').value = document.getElementById('txtCity').value;
    document.getElementById('txtOldPin').value = document.getElementById('txtPin').value;
    document.getElementById('txtOldDistrict').value = document.getElementById('txtDistrict').value;
    document.getElementById('txtOldState').value = document.getElementById('txtState').value;
    document.getElementById('txtOldCounty').value = document.getElementById('txtCounty').value;

    document.getElementById('txtAddress1').value = "";
    document.getElementById('txtAddress2').value = "";
    document.getElementById('txtAddress3').value = "";
    document.getElementById('txtTaluk').value = "";
    document.getElementById('txtCity').value = "";
    document.getElementById('txtPin').value = "";
    document.getElementById('txtDistrict').value = "";
    document.getElementById('txtState').value = "";
    document.getElementById('txtCounty').value = "";

};

function btnModify_Clicked() {
    if (objAddress[nCurrentRow].REMOVED == 0) {
        document.getElementById("modify").style.display = "block";
        document.getElementById("modify").style.zIndex = nZindex;
        nZindex++;
    }
    else
    {
        alert("The subscriber is removed.\n\nPlease recall to modify subscription.");
    }
};


//*********************End Functions for Address Screen**********************************//

//*********************Start Functions for Remove Screen**********************************//

//Display Remove Subscribers Data
function DisplayRemoveSubscribers() {
    var ddbYear = document.getElementById("ddbYear");
    var ddbMonth = document.getElementById("ddbMonth");
    var radSubType = document.querySelector('input[name = "radSubType"]:checked').value;
    var chkRemoved = document.getElementById("chkRemoved");

    var dTillDate = new Date(ddbYear.options[ddbYear.selectedIndex].text, ddbMonth.selectedIndex);

    //Filter Data to be displayed. 
    var objRemSubs1 = objSubscribedTill.filter(x => x.REMOVED == chkRemoved.checked && x.SUBTYPE == radSubType && Date.parse(x.SUBSCRIBEDTILL) <= dTillDate);

    var sChecked = "";

    if (chkRemoved.checked) sChecked = "checked";

    //Display loading message only if SubType or Removed is changed.No need for date Change
    if (objRemSubs1.length > 1800 && (this.name == "radSubType" || this.id == "chkRemoved")) document.getElementById("divRemoveSubs").innerHTML = "<h2>Loading!  Please wait...</h2>";

    //Display it on the HTML table with delay to do events
    setTimeout(function () {

        var sTable = "<table class=\"tblGrid\" id=\"tblRemove\"><tr><th>Code</th> <th>Name</th> <th>Address</th> <th>Group</th> <th>Removed</th> <th>SubscriptedTill</th></tr>";
        var aData = objRemSubs1.map(x => "<tr onclick=\"tblRemove_Row_Clicked(" + x.Id + ",this)\" ><td>" + x.Id + "</td><td>" + x.NAME.substring(0, 18) + "</td><td>" + x.ADDR_LINE1.substring(0, 30) + "</td><td>" + x.GROUP + "</td><td> <input id=\"chkRemove_" + x.Id + "\" type=\"checkbox\" onclick=\"RemoveSubscriber_Clicked(" + x.Id + ")\" " + sChecked + " />Removed </td><td>" + myShortMonth(x.SUBSCRIBEDTILL.substring(5, 7)) + " " + x.SUBSCRIBEDTILL.substring(0, 4) + "</td></tr>");
        sTable = sTable + aData.join(" ") + ("</table>");

        document.getElementById("divRemoveSubs").innerHTML = sTable;

    }, 0);

};

//Print the displayed report
function btnRemovePrint_Clicked() {

    var wndReport = window.open("", "", "width=1000,height=850,top=80,left=100");
    var divMain = document.createElement("div");
    wndReport.document.body.appendChild(divMain);


    var ddbYear = document.getElementById("ddbYear");
    var ddbMonth = document.getElementById("ddbMonth");
    var radSubType = document.querySelector('input[name = "radSubType"]:checked').value;
    var chkRemoved = document.getElementById("chkRemoved");

    var dTillDate = new Date(ddbYear.options[ddbYear.selectedIndex].text, ddbMonth.selectedIndex);

    //Filter Data to be displayed. 
    var objRemSubs1 = objSubscribedTill.filter(x => x.REMOVED == chkRemoved.checked && x.SUBTYPE == radSubType && Date.parse(x.SUBSCRIBEDTILL) <= dTillDate);

    //Sort Array here.
    objRemSubs1.sort(function (a, b) { return (a.NAME > b.NAME) ? 1 : ((b.NAME > a.NAME) ? -1 : 0); });


    var sChecked = "";

    if (chkRemoved.checked) sChecked = "checked";

    //Display loading message
    if (objRemSubs1.length > 1800) divMain.innerHTML = "<h2>Loading!  Please wait...</h2>";

    //Display it on the HTML table with delay to do events
    setTimeout(function () {

        var sTable = "<table><tr><th>Code</th> <th>Name</th> <th>Address</th> <th>Group</th> <th>Removed</th> <th>Subscription</th></tr>";
        var aData = objRemSubs1.map(x => "<tr onclick=\"tblRemove_Row_Clicked(" + x.Id + ",this)\" ><td>" + x.Id + "</td><td>" + x.NAME.substring(0, 18) + "</td><td>" + x.ADDR_LINE1.substring(0, 25) + "</td><td>" + x.GROUP + "</td><td> <input id=\"chkRemove_" + x.Id + "\" type=\"checkbox\" onclick=\"RemoveSubscriber_Clicked(" + x.Id + ")\" " + sChecked + " />Removed </td><td>" + myShortMonth(x.SUBSCRIBEDTILL.substring(5, 7)) + " " + x.SUBSCRIBEDTILL.substring(0, 4) + "</td></tr>");
        sTable = sTable + aData.join(" ") + ("</table>");

        divMain.innerHTML = sTable;

        wndReport.print();
        wndReport.close();

    }, 0);


};

//Display Address information when Remove Customer Table Row is clicked.
function tblRemove_Row_Clicked(CustNumber, x) {

    //Find with Customer Id
    var nRow = nCurrentRow;

    if (objAddress[nCurrentRow].Id != CustNumber) nRow = objAddress.findIndex(x => x.Id == CustNumber);

    if (nRow != -1) {
        nCurrentRow = nRow;
        DisplayAddressData();
    }

    var rmTable = document.getElementById("tblRemove");
    for (i = 0; i < rmTable.rows.length; i++) {
        if (i == x.rowIndex)
            rmTable.rows[i].style.backgroundColor = "lavender";
        else
            rmTable.rows[i].style.backgroundColor = "white";
    }

};

function RemoveSubscriber_Clicked(CustNumber) {
    //Check Box on the Remove Subscriber Windows has been clicked. 
    var chkRemoveSubs = document.getElementById("chkRemove_" + CustNumber)
    var sRemoved = "0"

    if (chkRemoveSubs.checked) sRemoved = "1";

    //Find with Customer Id
    var nRow = 0;
    nRow = objAddress.findIndex(x => x.Id == CustNumber);

    if (nRow != -1) {
        nCurrentRow = nRow;

        //Update Local Object
        objAddress[nCurrentRow].REMOVED = sRemoved;

        nRow = objSubscribedTill.findIndex(x => x.Id == CustNumber);
        if (nRow != -1) objSubscribedTill[nRow].REMOVED = sRemoved;

        //Send update statement to the Database
        var data = {};
        data.REMOVED = sRemoved;
        var json = JSON.stringify(data);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log(this.responseText);
                }
                else {
                    Server_Error(this.responseText);
                }
            }
        };

        xhttp.open("PUT", "https://" + window.location.hostname + "/rest/api.php/address/" + objAddress[nCurrentRow].Id.trim(), true);
        xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhttp.send(json);

    }

};


//*********************End Functions for Remove Screen**********************************//

//*********************Start Functions for Modify Screen**********************************//

function btnSubsQuit_Clicked() {
    document.getElementById("modify").style.display = "none";
};


function SubsReadOnlyMode() {
    //change all text boxes to readonly mode
    document.getElementById("txtSubsAmount").readOnly = true;
    document.getElementById("ddbSubsFromMth").disabled = true;
    document.getElementById("txtSubsFromYr").readOnly = true;
    document.getElementById("ddbSubsToMth").disabled = true;
    document.getElementById("txtSubsToYr").readOnly = true;
    document.getElementById("ddSubsInst").disabled = true;
    document.getElementById("txtSubsInstNo").readOnly = true;
    document.getElementById("txtSubsInstDate").readOnly = true;
    document.getElementById("txtSubsInstDetails").readOnly = true;
    document.getElementById("txtSubsOthDetails").readOnly = true;

    //Disable Buttons
    document.getElementById("btnSubsSave").disabled = true;
    document.getElementById("btnSubsClear").disabled = true;

    if (document.getElementById("txtSubsId").value == ""){
        document.getElementById("btnSubsEdit").disabled = true;
        document.getElementById("btnSubsDelete").disabled = true;
    }
    else {
        document.getElementById("btnSubsEdit").disabled = false;
        document.getElementById("btnSubsDelete").disabled = false;
    }
    document.getElementById("btnSubsQuit").disabled = false;
    document.getElementById("btnSubsNew").disabled = false;


};

function SubsEditMode() {

    //change all text boxes to readonly mode
    document.getElementById("txtSubsAmount").readOnly = false;
    document.getElementById("ddbSubsFromMth").disabled = false;
    document.getElementById("txtSubsFromYr").readOnly = false;
    document.getElementById("ddbSubsToMth").disabled = false;
    document.getElementById("txtSubsToYr").readOnly = false;
    document.getElementById("ddSubsInst").disabled = false;
    document.getElementById("txtSubsInstNo").readOnly = false;
    document.getElementById("txtSubsInstDate").readOnly = false;
    document.getElementById("txtSubsInstDetails").readOnly = false;
    document.getElementById("txtSubsOthDetails").readOnly = false;

    //Disable Buttons
    document.getElementById("btnSubsSave").disabled = false;
    document.getElementById("btnSubsClear").disabled = false;
    document.getElementById("btnSubsEdit").disabled = true;
    document.getElementById("btnSubsDelete").disabled = true;
    document.getElementById("btnSubsQuit").disabled = true;
    document.getElementById("btnSubsNew").disabled = true;


};

function DisplayModifySubscription(nSubsId,x) {

    //Subscription from the Subscription Id
    var nRow = objSubscription.findIndex(x => x.Id == nSubsId);

    if (nRow != -1) {

        document.getElementById("txtSubsId").value = objSubscription[nRow].Id;
        document.getElementById("txtSubsAmount").value = objSubscription[nRow].AMT;
        document.getElementById("ddbSubsFromMth").selectedIndex = Number(objSubscription[nRow].FROM.substring(5, 7)) -1;
        document.getElementById("txtSubsFromYr").value = objSubscription[nRow].FROM.substring(0, 4);
        document.getElementById("ddbSubsToMth").selectedIndex = Number(objSubscription[nRow].TO.substring(5, 7)) - 1;
        document.getElementById("txtSubsToYr").value = objSubscription[nRow].TO.substring(0, 4);
        document.getElementById("ddSubsInst").value = objSubscription[nRow].INST;
        document.getElementById("txtSubsInstNo").value = objSubscription[nRow].INSTNO;
        document.getElementById("txtSubsInstDate").value = (objSubscription[nRow].INSTDATE=='1900-01-01' || objSubscription[nRow].INSTDATE=='0000-00-00') ? '' : objSubscription[nRow].INSTDATE;  
        document.getElementById("txtSubsInstDetails").value = objSubscription[nRow].INSTDET;
        document.getElementById("txtSubsOthDetails").value = objSubscription[nRow].OTHERDET;

    }

    if (x != undefined) {
        var rmTable = document.getElementById("tblSubscription");
        for (i = 0; i < rmTable.rows.length; i++) {
            if (i == x.rowIndex)
                rmTable.rows[i].style.backgroundColor = "lavender";
            else
                rmTable.rows[i].style.backgroundColor = "white";
        }
    }
};

function setSubsNew() {
    //Set the Subscription Edit Screen to Empty.

    document.getElementById("txtSubsAmount").value = "";
    document.getElementById("ddbSubsFromMth").value = "JAN";
    document.getElementById("txtSubsFromYr").value = "";
    document.getElementById("ddbSubsToMth").value = "JAN";
    document.getElementById("txtSubsToYr").value = "";
    document.getElementById("ddSubsInst").value = "Cash";
    document.getElementById("txtSubsInstNo").value = "";
    document.getElementById("txtSubsInstDate").value = "";
    document.getElementById("txtSubsInstDetails").value = "";
    document.getElementById("txtSubsOthDetails").value = "";
};

function btnSubsNew_Clicked() {
    //Clear the Fields
    setSubsNew();

    //Set Edit Mode.
    SubsEditMode();
    bSubsNewRecord = true;

};

function btnSubsEdit_Clicked() {

    //Set Edit Mode.
    SubsEditMode();
    bSubsEditRecord = true;

};

function btnSubsClear_Clicked() {

    if (document.getElementById("txtSubsId").value == "")
        setSubsNew();
    else
        DisplayModifySubscription(document.getElementById("txtSubsId").value)

    //Set Readonly Mode
    SubsReadOnlyMode();
    bSubsEditRecord = false;
    bSubsNewRecord = false;

};

function btnSubsDelete_Clicked() {

    if (confirm("Press OK if you want to delete the amount " + document.getElementById("txtSubsAmount").value + ". \n \n WARNING!!! This process is irreversible.")) {

        //Remove from the Server
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log(this.responseText);
                    RefreshSubscribedTillData(objAddress[nCurrentRow].Id.trim());
                }
                else {
                    Server_Error(this.responseText);
                }
            }
        };

        xhttp.open("DELETE", "https://" + window.location.hostname + "/rest/api.php/subscription/" + document.getElementById("txtSubsId").value, true);
        xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));

        xhttp.send();

        //Update Local Subscription Object
        var nRow = objSubscription.findIndex(x => x.Id == document.getElementById("txtSubsId").value);
        if (nRow != -1) objSubscription.splice(nRow, 1);

        //Refresh Screen.
        DisplaySubscriptionData();


    }

};

function btnSubsSave_Clicked() {

    if (objAddress[nCurrentRow].REMOVED == 1) {
        alert("The subscriber is removed.\n\nPlease recall to modify subscription.");
        return false;
    }

    if (ValidateSubs()) {

        var sFromDate = "";
        var sToDate = "";

        if (document.getElementById('ddbSubsFromMth').selectedIndex == -1) document.getElementById('ddbSubsFromMth').selectedIndex = 0;
        if (document.getElementById('ddbSubsToMth').selectedIndex == -1) document.getElementById('ddbSubsToMth').selectedIndex = 0;

        //Formulate the From and To Dates
        if (document.getElementById('ddbSubsFromMth').selectedIndex < 9)
            sFromDate = document.getElementById('txtSubsFromYr').value + "-0" + (document.getElementById('ddbSubsFromMth').selectedIndex + 1) + "-01";
        else
            sFromDate = document.getElementById('txtSubsFromYr').value + "-" + (document.getElementById('ddbSubsFromMth').selectedIndex + 1) + "-01";

        if (document.getElementById('ddbSubsToMth').selectedIndex < 9)
            sToDate = document.getElementById('txtSubsToYr').value + "-0" + (document.getElementById('ddbSubsToMth').selectedIndex + 1) + "-01";
        else
            sToDate = document.getElementById('txtSubsToYr').value + "-" + (document.getElementById('ddbSubsToMth').selectedIndex + 1) + "-01";


        //Build the JSON Data Object to Send to Server
        var data = {};
        data.CUSTID = objAddress[nCurrentRow].Id.trim();
        data.FROM = sFromDate;
        data.TO = sToDate;
        data.AMT = document.getElementById('txtSubsAmount').value;
        data.INST = document.getElementById('ddSubsInst').value;
        data.INSTNO = document.getElementById('txtSubsInstNo').value.toUpperCase();
	data.INSTDATE = (document.getElementById('txtSubsInstDate').value=='') ? '1900-01-01' : data.INSTDATE = (document.getElementById('txtSubsInstDate').value);
        data.INSTDET = document.getElementById('txtSubsInstDetails').value.toUpperCase();
        data.OTHERDET = document.getElementById('txtSubsOthDetails').value.toUpperCase();
        var json = JSON.stringify(data);


        //Update Data to Local Object
        if (bSubsEditRecord) {
            data.Id = document.getElementById("txtSubsId").value;
            var nRow = objSubscription.findIndex(x => x.Id == document.getElementById("txtSubsId").value);
            if (nRow != -1) objSubscription.splice(nRow, 1, data);
        }


        //Create the Http Request
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log(this.responseText);
                    //Update Data to Local Object
                    if (Number(this.responseText) > 1) {
                        document.getElementById("txtSubsId").value =  this.responseText;
                        RefreshSubscriptionData(this.responseText);
                    } else if (Number(this.responseText) == 1){
                        DisplaySubscriptionData();
                    }
                    RefreshSubscribedTillData(objAddress[nCurrentRow].Id.trim());
                }
                else {
                    Server_Error(this.responseText);
                }
            }
        };


        if (bSubsNewRecord)
            xhttp.open("POST", "https://" + window.location.hostname + "/rest/api.php/subscription", true);
        else if (bSubsEditRecord)
            xhttp.open("PUT", "https://" + window.location.hostname + "/rest/api.php/subscription/" + document.getElementById("txtSubsId").value, true);

        xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(json);

        //Clear the Booleans
        bSubsNewRecord = false;
        bSubsEditRecord = false;

        //Change all Text Boxes to Readonly Mode
        SubsReadOnlyMode();

    }

};

function ValidateSubs() {

    if (Number(document.getElementById("txtSubsAmount").value) < 1) {
        alert("Invalid Subscription Amount!");
        return false;
    }


    if (Number(document.getElementById("txtSubsFromYr").value) < 1900 || Number(document.getElementById("txtSubsFromYr").value) > 3000) {
        alert("Invalid Subscription From Year!");
        return false;
    }
        
    if (Number(document.getElementById("txtSubsToYr").value) < 1900 || Number(document.getElementById("txtSubsToYr").value) > 3000) {
        alert("Invalid Subscription To Year!");
        return false;
    }

    return true;
};

//*********************End Functions for Modify Screen**********************************//

//*********************End Functions for Search Screen**********************************//

function txtSearchsubs_Changed(event) {
    var bChangedRow = false;
    var rmTable = document.getElementById("tblResult");
    var i = 0; //Counter

    switch (event.keyCode) {
        case 40: //Down Key
        case 38: //Up Key
            if (rmTable != null && rmTable.rows[0] != null) {

                while (!bChangedRow) {
                    if (rmTable.rows[i].style.backgroundColor == "lavender") {
                        bChangedRow = true;
                        if (event.keyCode == 40 && i != rmTable.rows.length - 1) {
                            rmTable.rows[i + 1].style.backgroundColor = "lavender";
                            rmTable.rows[i].style.backgroundColor = "white";
                            document.getElementById('divSearchSubs').scrollTop = ((i +1) * 18) - 70;
                        }
                        if (event.keyCode == 38 && i != 0) {
                            rmTable.rows[i - 1].style.backgroundColor = "lavender";
                            rmTable.rows[i].style.backgroundColor = "white";
                            document.getElementById('divSearchSubs').scrollTop = ((i - 1) * 18) - 70;
                        }
                    }
                    i++;
                    if (i >= rmTable.rows.length && !bChangedRow) {
                        bChangedRow = true;
                        document.getElementById('divSearchSubs').scrollTop = 0;
                        rmTable.rows[0].style.backgroundColor = "lavender";
                    }
                }

            }
            break;

        case 13: //Enter Key
            if (rmTable != null && rmTable.rows[0] != null) {
                for (i = 0; i < rmTable.rows.length; i++) {
                    if (rmTable.rows[i].style.backgroundColor == "lavender") {
                        var sCustId = rmTable.rows[i].cells[0].innerHTML
                        //Search for the customer with CustId
                        var nRow = objAddress.findIndex(x => x.Id == sCustId);
                        if (nRow != -1) {
                            nCurrentRow = nRow;
                            DisplayAddressData();
                            //Hide the Search window.
                            document.getElementById("search").style.display = "none";
                        }
                    }
                }
            }
            break;

        case 27: //Escape Key
            //Hide the Search window.
            document.getElementById("search").style.display = "none";
            break;

        default:
            //Search for the Item and display it.
            var txtSearchsubs = document.getElementById("txtSearchsubs");

            var objSearchRlt = objAddress.filter(x => x.NAME.includes(txtSearchsubs.value.toUpperCase().trim()));

            //Sort Array here.
            objSearchRlt.sort(function (a, b) { return (a.NAME > b.NAME) ? 1 : ((b.NAME > a.NAME) ? -1 : 0); });

            //Reduce Array length.
            if (objSearchRlt.length > 1500) objSearchRlt.length = 1500;

            //Display Search Results
            var sTable = "<table class=\"tblGrid\" id=\"tblResult\" style=\"width:100%\" >";
            var aData = objSearchRlt.map(x => "<tr " + ((x.REMOVED == 1) ? "style='color:pink;'" : "") + " onclick=\"tblResult_Row_Clicked(" + x.Id + ",this)\" ><td style='display:none;'>" + x.Id + "</td><td>" + x.NAME.substring(0, 25) + "</td><td>" + x.ADDRESS1.substring(0, 30) + "</td></tr>");
            sTable = sTable + aData.join(" ") + ("</table>");

            document.getElementById("divSearchSubs").innerHTML = sTable;
    }

};


function tblResult_Row_Clicked(sCustId, x) {

    //Search for the customer with CustId
    var nRow = objAddress.findIndex(x => x.Id == sCustId);
    if (nRow != -1) {
        nCurrentRow = nRow;
        DisplayAddressData();
    }


    var rmTable = document.getElementById("tblResult");
    for (i = 0; i < rmTable.rows.length; i++) {
        if (i == x.rowIndex)
            rmTable.rows[i].style.backgroundColor = "lavender";
        else
            rmTable.rows[i].style.backgroundColor = "white";
    }

    //Hide the Search window.
    document.getElementById("search").style.display = "none";

};


//*********************End Functions for Search Screen**********************************//

//*********************Start Functions for Report Screen**********************************//

function DisplayModifyReport() {

    var divReport = document.getElementById("divReport");
    var nTopMargin = 20; //default Value
    var nLeftMargin = 60; //default Value
    var nHeight = 172 - nTopMargin;
    var nLableWidth = 358 - nLeftMargin;
    var nFontSize = 15; //default Value
    var nDisplaySubs = 0; //default Value

    //Set Default Value.
    document.getElementById("chkDisplaySubs").checked = false; 
 
    document.getElementById("btnRptSave").disabled = true;
    document.getElementById("btnRptClear").disabled = true;
    document.getElementById("txtRptHeight").disabled = true;
    document.getElementById("txtRptWidth").disabled = true;
    document.getElementById("txtRptLeft").disabled = true;
    document.getElementById("txtRptTop").disabled = true;
    document.getElementById("txtRptFont").disabled = true;
    document.getElementById("chkDisplaySubs").disabled = true;
    document.getElementById("btnRptQuit").disabled = false;
    document.getElementById("btnRptEdit").disabled = false;

    if (objReport.Id != undefined) {
        document.getElementById("txtRptHeight").value = objReport.LABEL_HEIGHT;
        document.getElementById("txtRptWidth").value = objReport.LABEL_WIDTH;
        document.getElementById("txtRptLeft").value = objReport.LABEL_LEFT;
        document.getElementById("txtRptTop").value = objReport.LABEL_TOP;
        document.getElementById("txtRptFont").value = objReport.LABEL_FONTSIZE;
	nDisplaySubs = objReport.DISPLAY_SUBSCRIPTION;
        if (nDisplaySubs==1) document.getElementById("chkDisplaySubs").checked = true;

        nLeftMargin = objReport.LABEL_LEFT;
        nTopMargin = objReport.LABEL_TOP;
        nHeight = objReport.LABEL_HEIGHT - nTopMargin;
        nLableWidth = Number(objReport.LABEL_WIDTH) - nLeftMargin;
        nFontSize = objReport.LABEL_FONTSIZE;

        document.getElementById("report-in").style.height = (Number(objReport.LABEL_HEIGHT) + 155) + "px";
        document.getElementById("report").style.height = (Number(objReport.LABEL_HEIGHT) + 190) + "px";
        document.getElementById("report-in").style.width = (Number(objReport.LABEL_WIDTH) + 22) + "px";
        document.getElementById("report").style.width = (Number(objReport.LABEL_WIDTH) + 39) + "px";

        divReport.style = "font-family:Arial;font-size:" + nFontSize + "px;height:" + nHeight + "px;width:" + nLableWidth + "px;padding-top:" + nTopMargin + "px;padding-left:" + nLeftMargin + "px;";


    }

        //Display Current Address on the Top of the Screen.
        var nRow = objSubscribedTill.findIndex(x => x.Id == objAddress[nCurrentRow].Id.trim());
        if (nRow != -1)
        {
           divReport.innerHTML = objSubscribedTill[nRow].Id + ((nDisplaySubs == 1) ? " - " + DisplayType(objSubscribedTill[nRow].SUBTYPE, objSubscribedTill[nRow].SUBSCRIBEDTILL) : "") + "<br/><b>" + objSubscribedTill[nRow].SALUT + " " + objSubscribedTill[nRow].NAME + "</b></br>" + FormatAddress(objSubscribedTill[nRow].ADDR_LINE1, objSubscribedTill[nRow].ADDR_LINE2, objSubscribedTill[nRow].ADDR_LINE3, objSubscribedTill[nRow].TALUK, objSubscribedTill[nRow].CITY, objSubscribedTill[nRow].PINCODE, objSubscribedTill[nRow].DISTRICT, objSubscribedTill[nRow].STATE, objSubscribedTill[nRow].COUNTRY);
        }
    
};


function btnRptQuit_Clicked() {
    document.getElementById("report").style.display = "none";
};


function btnRptEdit_Clicked() {

    document.getElementById("btnRptSave").disabled = false;
    document.getElementById("btnRptClear").disabled = false;
    document.getElementById("txtRptHeight").disabled = false;
    document.getElementById("txtRptWidth").disabled = false;
    document.getElementById("txtRptLeft").disabled = false;
    document.getElementById("txtRptTop").disabled = false;
    document.getElementById("txtRptFont").disabled = false;
    document.getElementById("chkDisplaySubs").disabled = false;
    document.getElementById("btnRptQuit").disabled = true;
    document.getElementById("btnRptEdit").disabled = true;

};

function btnRptClear_Clicked() {
    DisplayModifyReport();
};

function btnRptSave_Clicked() {
    var nDisplaySubs = 0; //default Value

    if (document.getElementById("chkDisplaySubs").checked) nDisplaySubs = 1;

    //Check for valid data
    if (!ValidateReportValues()) return;

    //Build the JSON Data Object to Send to Server
    var data = {};
    data.LABEL_HEIGHT = document.getElementById("txtRptHeight").value;
    data.LABEL_WIDTH = document.getElementById("txtRptWidth").value;
    data.LABEL_LEFT = document.getElementById("txtRptLeft").value;
    data.LABEL_TOP = document.getElementById("txtRptTop").value;
    data.LABEL_FONTSIZE = document.getElementById("txtRptFont").value;
    data.DISPLAY_SUBSCRIPTION = nDisplaySubs;

    var json = JSON.stringify(data);


    //Create the Http Request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(this.responseText);
                //Update Data to Local Object
            }
            else {
                Server_Error(this.responseText);
            }
        }
    };

    xhttp.open("PUT", "https://" + window.location.hostname + "/rest/api.php/report/1024" , true);
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("txtUsername").value + ":@75Zcs^brImi4E" + document.getElementById("txtPassword").value));
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);

    //Update Local Object
    objReport.LABEL_HEIGHT = document.getElementById("txtRptHeight").value;
    objReport.LABEL_WIDTH = document.getElementById("txtRptWidth").value;
    objReport.LABEL_LEFT = document.getElementById("txtRptLeft").value;
    objReport.LABEL_TOP = document.getElementById("txtRptTop").value;
    objReport.LABEL_FONTSIZE = document.getElementById("txtRptFont").value;
    objReport.DISPLAY_SUBSCRIPTION = nDisplaySubs;


    DisplayModifyReport();

};

function ValidateReportValues() {

    if (Number(document.getElementById("txtRptHeight").value) < 130) {
        alert("Label Height is too low. Please increase height above 130.");
        document.getElementById("txtRptHeight").value = 130;
        return false;
    }

    if (Number(document.getElementById("txtRptHeight").value) > 1250) {
        alert("Lable Height is too Hight. Maximum allowed is 1250!");
        document.getElementById("txtRptHeight").value = 1250;
        return false;
    }

    if (Number(document.getElementById("txtRptTop").value) < 0) {
        alert("Top margin cannot be less than 0!");
        document.getElementById("txtRptTop").value = 0;
        return false;
    }

    if (Number(document.getElementById("txtRptTop").value) > (Number(document.getElementById("txtRptHeight").value)-130)) {
        alert("Top margin is too high! Top margin cannot be more than " + (Number(document.getElementById("txtRptHeight").value) - 130) + ".");
        document.getElementById("txtRptTop").value = Number(document.getElementById("txtRptHeight").value) - 130;
        return false;
    }

    if (Number(document.getElementById("txtRptWidth").value) < 300) {
        alert("Label Width is too low. Please increase Width above 300.");
        document.getElementById("txtRptWidth").value = 300;
        return false;
    }

    if (Number(document.getElementById("txtRptWidth").value) > 800) {
        alert("Lable Widght is too Hight. Maximum allowed is 800!");
        document.getElementById("txtRptWidth").value = 800;
        return false;
    }

    if (Number(document.getElementById("txtRptLeft").value) < 0) {
        alert("Left margin cannot be less than 0!");
        document.getElementById("txtRptLeft").value = 0;
        return false;
    }

    if (Number(document.getElementById("txtRptLeft").value) > (Number(document.getElementById("txtRptWidth").value) - 300)) {
        alert("Left margin is too high! Left margin cannot be more than " + (Number(document.getElementById("txtRptWidth").value) - 300) + ".");
        document.getElementById("txtRptLeft").value = Number(document.getElementById("txtRptWidth").value) - 300;
        return false;
    }

    return true;
};

function txtRptLeft_Changed() {
    if (Number(document.getElementById("txtRptLeft").value) > (Number(document.getElementById("txtRptWidth").value) - 300)) {
        document.getElementById("txtRptWidth").value = Number(document.getElementById("txtRptLeft").value) + 300;
    }
};

function txtRptTop_Changed() {
    if (Number(document.getElementById("txtRptTop").value) > (Number(document.getElementById("txtRptHeight").value) - 130)) {
        document.getElementById("txtRptHeight").value = Number(document.getElementById("txtRptTop").value) + 130;
    }
};

//*********************End Functions for Report Screen**********************************//


//************************START CODE TO MAKE WINDOW DRAGABLE****************************************//

var mydragg = function () {
    return {
        move: function (divid, xpos, ypos) {
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving: function (divid, container, evt) {
            divid.style.zIndex = nZindex;
            nZindex++;
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.style.width),
                eHe = parseInt(divid.style.height),
                cWi = parseInt(window.innerWidth),
                cHe = parseInt(window.innerHeight);
            document.getElementById(container).style.cursor = 'default';
            divTop = divTop.replace('px', '');
            divLeft = divLeft.replace('px', '');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function (evt) {
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;
                mydragg.move(divid, aX, aY);
            }
        },
        stopMoving: function (container) {
            var a = document.createElement('script');
            document.getElementById(container).style.cursor = 'default';
            document.onmousemove = function () { }
        },
    }
}();

//************************END CODE TO MAKE WINDOW DRAGABLE****************************************//
