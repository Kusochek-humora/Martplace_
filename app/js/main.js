//Library rateyo
// $(function () {
//     $(".weekly__item-rate").rateYo({
//         rating: 4.5,
//         readOnly: true,
//         starWidth: "17px",
//         normalFill: "#fff",
//         ratedFill:"#ffc000"
//     });
// я ненавижу звезды 
// });
// $('.tab').on('click', function () {
//     let num = $(this).attr('data-tab');
//     $('.tab').removeClass('active-tab');
//     $('.tab-item').removeClass('active').fadeOut(0);
//     $(this).addClass('active-tab');
//     $('.tab-item[data-tab-item="${num}"]').fadeIn(300).addClass('active');
// })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// $(function e() {

//     var clone = $('.category-wordpress').clone()

//     $('body').append(clone)
// })





// рэйтинг звезды
const ratingItemslist = document.querySelectorAll('.rate__item');
const ratingItemsArray = Array.prototype.slice.call(ratingItemslist);
ratingItemsArray.forEach(item => {
    item.addEventListener('click', () => {
        const {
            itemValue
        } = item.dataset;
        item.parentNode.dataset.totalValue = itemValue;
    })
});
//

// фильтр

//

$(document).ready(function () {
    $('.modal-call').magnificPopup({
        type: 'inline',
        closeBtnInside: true
    });

});


//слайдер
$('.weekly__slider').slick({
    prevArrow: $('.weekly__nav-prev'),
    nextArrow: $('.weekly__nav-next')
});



//

// авторизация

// var reg = {
//     name:"",
//     email:"",
//     login:"",
//     password:"",
// }
// var name=
// function User(name, email, login, pass, pass2) {
//     this.name = name;
//     this.email = email;
//     this.login = login;
//     this.pass = pass;
//     this.pass2 = pass2;

//     this.isAdmin = false;
// }

const formReg = document.getElementById('form-reg');
const formLog = document.getElementById('form-log');
const username = document.getElementById('username');
const email1 = document.getElementById('email');
// const email2 = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

formReg.addEventListener('submit', e => {

    e.preventDefault();


});
formLog.addEventListener('submit', e => {
    e.preventDefault();

    // checkInputs();
});


function checkInputs() {
    // trim to remove the whitespaces

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    }

    if (emailValue === '') {
        return emailValue;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');

    }


    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        // small.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function isEmail(email1) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(email);
    }
}
$('#form-reg').submit(function (o) {

    var users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {
        users = [];
    }
    var user = {
        "name": $('#username').val(),
        "password": $('#password').val(),
        "email": $('#email').val(),
        "blocked": null
    };



    var email_val = users.find(a => a.email === $('#email').val());

    if (email_val != null) {
        alert('This email is already isset error');
    } else {
        users.push(user);


        localStorage.setItem("users", JSON.stringify(users));
        //auth
        // localStorage.setItem("autoris_user", $('#email').val());
        alert('Successfully registred success');
        window.location.href = "Index.html";

    }
    o.preventDefault();
});

$('#form-log').submit(function (o) {
    if ($('#email1').val() === "admin@gmail.com" || $('#email1').val() == "admin") {
        localStorage.setItem("auth_user", 'admin');

        window.location.href = 'admin.html';
        console.log("HeLLO admin")
    } else {
        var users = JSON.parse(localStorage.getItem("users"));
        var user = users.find(a => a.email === $('#email1').val());
        console.log(user);
        if (user != null) {
            if (user.blocked == "true") {
                alert('your account has been blocked', 'error');
            } else {
                if (user.password === $('#password1').val()) {
                    localStorage.setItem("auth_user", $('#email1').val());


                    $('.header__menu-authorization').addClass('active')
                    $('.name-user').text(user.name)
                    $.magnificPopup.close();
                    alert('Добро пожаловать!');




                    $('.newest__menu-basket').on('click', function () {
                        $(this).addClass('activeBas');
                        if ($(this).hasClass('pr-wordpress')) {
                            $('.newest__menu-basket').magnificPopup({

                                type: 'inline'
                            });

                            $('#form-agree').submit(function () {
                                var prod1 = JSON.parse(localStorage.getItem("prod1"));

                                if (prod1 == null) {
                                    prod1 = [];
                                }
                                var prod = {
                                    "name": $('#user-prod').val(),
                                    "number": $('#user-number').val(),
                                    "product": "wordpress"
                                }
                                prod1.push(prod);
                                localStorage.setItem("prod1", JSON.stringify(prod1));
                                $.magnificPopup.close();
                            })
                        }
                    });

                    $('.newest__menu-like').on('click', function () {
                        $(this).toggleClass('activeLike')

                    });



                } else {
                    alert('incorrect password error');
                }
            }
        } else {
            alert('this email doesnt exist error');
        }
    }
    o.preventDefault();
    console.log("Sorry")
});


$('#logout').on('click', function () {
    // window.onload
    $('.header__menu-authorization').removeClass('active')
    localStorage.removeItem('auth_user')
    $('.newest__menu-like').off()
    $('.newest__menu-basket').off()
    if ($('.newest__menu-like').hasClass('activeLike') || $('.newest__menu-basket').hasClass('activeBas')) {
        $('.newest__menu-like').removeClass('activeLike');
        $('.newest__menu-basket').removeClass('activeBas');
    }
})

window.onload = function () {
    if (localStorage.getItem('auth_user') !== null && localStorage.getItem('auth_user') == "admin") {
        $('.header__menu-authorization').addClass('active')
        $('.name-user').text("Ырыс").on('click', function () {
            window.location.href = 'admin.html';
        })





    } else if (localStorage.getItem('auth_user') !== null) {
        $('.header__menu-authorization').addClass('active')
        $('.name-user').text(user.name)

    }

}























//  let myUrl = "https://jsonplaceholder.typicode.com/users";
// $.ajax({
//         type: "GET",
//         charset: "utf-8",
//         url: myUrl,
//         statusCode: {
//             404: function (responseObject, textStatus, jqXHR) {
//                 // No content found (404)
//                 // This code will be executed if the server returns a 404 response
//                 // console.log("Status Code: 404 (No content found)");
//             },

//             503: function (responseObject, textStatus, errorThrown) {
//                 // Service Unavailable (503)
//                 // This code will be executed if the server returns a 503 response
//                 // console.log("Status Code: 503 (Service Unavailable)");
//             }
//         }
//     })
//     .done(function (data) {
//         // console.log("data");
//         // console.log(JSON.stringify(myUrl));

//         main(data);
//         // /mainDetail(data);/

//         console.log("Ajax GET Request: success \nCongrats :)");
//     })
//     .fail(function (jqXHR, textStatus) {
//         console.log("Something went wrong during the request :(");
//     });
// /* end*/

// function main(data) {
//     var data = JSON.stringify(data)
//     var obj = JSON.parse(data)
//     var state = 1
//     console.log(obj)

//     var login = document.querySelector('.login')
//     var pass = document.querySelector('.pass')
//     var button = document.querySelector('.send')



//     button.addEventListener('click', function () {
//         localStorage.setItem('login', login.value)
//         localStorage.setItem('pass', pass.value)
//         location.reload(true)
//     })
//     let lc_log = localStorage.getItem('login')
//     let lc_pass = localStorage.getItem('pass')

//     for (let i = 0; i < obj.length; i++) {
//         if (lc_log == obj[i].email && lc_pass == obj[i].username) {

//             state = 2
//             alert(`Привет ${obj[i].name}`)
//             // document.location.href = " ";
//         } else if (lc_log == obj[i].email && lc_pass !== obj[i].username) {
//             state = 3
//         }
//     }
//     if (state == 1) {
//         alert('такого пользователся нет')
//     }
//     if (state == 3) {
//         alert('Не правильный пароль')
//     }
//     console.log(state)
// }