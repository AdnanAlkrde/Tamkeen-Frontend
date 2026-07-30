/* =========================================================
   SETTINGS.JS
   Tamkeen ERP
   Settings Page
========================================================= */



document.addEventListener("DOMContentLoaded", function(){



/* =========================
        ELEMENTS
========================= */


const editProfileBtn = document.querySelector(".edit-profile-btn");


const saveBtn = document.querySelector(".save-settings button");


const changePasswordBtn = document.querySelectorAll(
    ".security-buttons button"
)[0];


const logoutAllBtn = document.querySelectorAll(
    ".security-buttons button"
)[1];


const sessionBtn = document.querySelectorAll(
    ".security-buttons button"
)[2];



const backupBtn = document.querySelector(
    ".backup-buttons button:first-child"
);



const restoreBtn = document.querySelector(
    ".restore-btn"
);







/* =========================
        ALERT SYSTEM
========================= */


function showMessage(message,type="success"){



    const box = document.createElement("div");



    box.className = 
    `settings-message ${type}`;



    box.innerHTML = `

        <i class="
        ${type==="success"
        ?"fa-solid fa-circle-check"
        :"fa-solid fa-circle-exclamation"}
        "></i>

        <span>
            ${message}
        </span>

    `;



    document.body.appendChild(box);




    setTimeout(()=>{


        box.classList.add("show");


    },50);





    setTimeout(()=>{


        box.classList.remove("show");



        setTimeout(()=>{

            box.remove();

        },300);



    },3000);



}








/* =========================
        EDIT PROFILE
========================= */


if(editProfileBtn){


editProfileBtn.addEventListener(
"click",
()=>{


showMessage(
"سيتم فتح صفحة تعديل البيانات قريباً"
);



});



}







/* =========================
        PASSWORD
========================= */


if(changePasswordBtn){


changePasswordBtn.addEventListener(
"click",
()=>{


document
.querySelector(".form-grid")
.scrollIntoView({

behavior:"smooth"

});



showMessage(
"يمكنك تغيير كلمة المرور من النموذج"
);



});



}






/* =========================
        SAVE SETTINGS
========================= */


if(saveBtn){


saveBtn.addEventListener(
"click",
()=>{


const inputs =
document.querySelectorAll(
".form-group input"
);



let empty=false;



inputs.forEach(input=>{


if(input.value.trim()===""){


empty=true;


}


});





if(empty){


showMessage(
"يرجى تعبئة جميع الحقول",
"error"
);


return;


}




showMessage(
"تم حفظ التغييرات بنجاح"
);



});



}

/* =========================
        BACKUP
========================= */


if(backupBtn){


backupBtn.addEventListener(
"click",
()=>{


const bar =
document.querySelector(".progress-bar");



if(bar){


bar.style.width="100%";



setTimeout(()=>{


bar.style.width="75%";


},1500);



}





showMessage(
"تم إنشاء نسخة احتياطية بنجاح"
);



});



}







/* =========================
        RESTORE
========================= */


if(restoreBtn){


restoreBtn.addEventListener(
"click",
()=>{


const confirmRestore =
confirm(
"هل تريد استعادة آخر نسخة احتياطية؟"
);




if(confirmRestore){


showMessage(
"تمت استعادة النسخة الاحتياطية"
);



}



});



}








/* =========================
        SECURITY ACTIONS
========================= */



if(logoutAllBtn){


logoutAllBtn.addEventListener(
"click",
()=>{


showMessage(
"تم تسجيل الخروج من جميع الأجهزة"
);



});



}







if(sessionBtn){


sessionBtn.addEventListener(
"click",
()=>{


const confirmDelete =
confirm(
"هل تريد إنهاء الجلسة الحالية؟"
);




if(confirmDelete){


showMessage(
"تم إنهاء الجلسة الحالية",
"error"
);



}



});



}









/* =========================
        SWITCH EFFECT
========================= */


const switches =
document.querySelectorAll(
".switch input"
);





switches.forEach(sw=>{



sw.addEventListener(
"change",
function(){



if(this.checked){


showMessage(
"تم تفعيل الإعداد"
);



}else{


showMessage(
"تم إيقاف الإعداد",
"error"
);



}



});



});








/* =========================
        MESSAGE STYLE
========================= */


const style =
document.createElement("style");



style.innerHTML = `


.settings-message{


position:fixed;

top:25px;

left:25px;

z-index:9999;

display:flex;

align-items:center;

gap:12px;

padding:15px 25px;

border-radius:15px;

background:#fff;

box-shadow:
0 15px 35px rgba(0,0,0,.15);

font-family:"Cairo",sans-serif;

transform:translateY(-30px);

opacity:0;

transition:.35s;

}



.settings-message.show{


transform:translateY(0);

opacity:1;


}




.settings-message.success{


border-right:5px solid #16a34a;

color:#15803d;


}




.settings-message.error{


border-right:5px solid #dc2626;

color:#dc2626;


}




.settings-message i{


font-size:20px;


}



`;



document.head.appendChild(style);






});