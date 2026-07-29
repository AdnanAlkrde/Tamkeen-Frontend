/* =====================================================
   EMPLOYEE TRANSFERS JS
   إدارة نقل الموظفين
===================================================== */


/* =========================
        MODAL
========================= */

const transferModal = document.getElementById("transferModal");


function openTransferModal(){

    if(transferModal){

        transferModal.classList.add("active");

    }

}



function closeTransferModal(){

    if(transferModal){

        transferModal.classList.remove("active");

    }

}




// إغلاق عند الضغط خارج النافذة

if(transferModal){

    transferModal.addEventListener("click", function(e){

        if(e.target === transferModal){

            closeTransferModal();

        }

    });

}




/* =========================
        SAVE
========================= */


const saveBtn = document.querySelector(".save-btn");


if(saveBtn){

    saveBtn.addEventListener("click",()=>{


        alert("تم حفظ عملية النقل بنجاح ✅");


        closeTransferModal();


    });

}





/* =========================
        EDIT BUTTONS
========================= */


document.querySelectorAll(".edit").forEach(btn=>{


    btn.addEventListener("click",()=>{


        openTransferModal();


    });


});





/* =========================
        DELETE BUTTONS
========================= */


document.querySelectorAll(".delete").forEach(btn=>{


    btn.addEventListener("click",()=>{


        let confirmDelete = confirm("هل تريد حذف عملية النقل؟");


        if(confirmDelete){

            alert("تم حذف العملية");


        }


    });


});





console.log("Employee Transfers Loaded Successfully");