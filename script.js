var empDataArray = [];
var empHtmlString;

$("#empFormSubmit").click(event => {
    event.preventDefault();
    var fName = $("#fName").val();
    var lName = $("#lName").val();
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    if(fName === "" || lName === "" || email === "" || pwd===""){
        validatePassword();
        return;
    }
    if(!validatePassword(pwd)){
        validatePassword();
        return;
    }
    var empData = {
        fName: fName,
        lName: lName,
        email: email,
        pwd: pwd
    };
    fName == "" || lName == "" || email == "" || pwd == "" ? errorOnSubmit() : submitData(empData);
    tableRender();
});
$("body").on("click", ".delete-btn", function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            var index = $(this).data("index");
            empDataArray.splice(index, 1);
            tableRender();
            
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});
function errorOnSubmit() {
    clearField();
    Swal.fire({
        icon: "error",
        title: "ALL FEILDS ARE REQURIED",
        text: "Something went wrong!",
        footer: '<a href="#">PLEASE FILL ARE FIELDS?</a>'
    });
}
function validatePassword(password) {
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;  
    if (!pattern.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
        });
        return false; 
    }
    
    return true; 
}
function submitData(empData) {
    var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;   
    if (!pattern.test(empData.email)) {
        Swal.fire({
            icon: "error",
            title: "Not Valid",
            text: "Your email is not valid!",
        });
        return; 
    }
    if (isDuplicateEmail(empData.email)) {
        Swal.fire({
            icon: "error",
            title: "Duplicate Email",
            text: "Email address is already in use!",
        });
    } else {
        empDataArray.push(empData);
        console.log(empDataArray);
        clearField();
        Swal.fire({
            title: "Employee Data has been stored",
            text: "You clicked the button!",
            icon: "success",
        });
    }
    function isDuplicateEmail(email) {
        return empDataArray.some(emp => emp.email === email);
    }
}
    function tableRender() {
        empHtmlString = "";
        empDataArray.forEach(a => {
            var secret="$!^^2141";
            password =a.pwd;
            var enc = CryptoJS.AES.encrypt(password, secret).toString(); 
            alert(enc);
            var bytes = CryptoJS.AES.decrypt(enc, secret); 
            alert(bytes.toString(CryptoJS.enc.Utf8));
            empHtmlString += "<tr>";
            empHtmlString += "<td>" + a.fName + "</td>" + "<td>" + a.lName + "</td>" + "<td>" + a.email + "</td>" + "<td>" + enc + "</td>" + "<td><button class='fa fa-trash-o btn btn-danger delete-btn' data-index='" + empDataArray.indexOf(a) + "' id='" + a.email + "'></button></td>";
            empHtmlString += "</tr>";
        });
        $("#empData").html(empHtmlString);
    }    
    function clearField() {
        $("#fName").val("");
        $("#lName").val("");
        $("#email").val("");
        $("#pwd").val("");
    }


