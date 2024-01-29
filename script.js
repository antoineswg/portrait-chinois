//attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
    //déterminer si l'image d'illustration sera à gauche ou à droite
    var numCase = -1;
    var evenOrOdd;
    function leftOrRight() {
        numCase++;
        if (numCase % 2 === 0) {
            evenOrOdd = "even";
        } else {
            evenOrOdd = "odd";
        }
    }

    //récupération des données dans le .json
    fetch("analogies.json").then(function (response) {
        response.json().then(function (data) {
            function ajtBloc(ana) {
                ana.forEach(function (ana) {
                    var list = document.createElement("section");
                    leftOrRight();
                    //création du bloc
                    list.innerHTML =
                        '<span id="intitule">me as a' +
                        ana.id +
                        "</span>" +
                        '<div class="category" id="' +
                        ana.id +
                        '">' +
                        '<div class="analogy">' +
                        '<div class="' +
                        evenOrOdd +
                        '"id="illustration" style="background-image:url(img/illu/' +
                        ana.image +
                        ')"alt="image illustrative"></div>' +
                        '<div class="text"> <h2 class="analogie">Si j\'étais ' +
                        ana.ana +
                        ", je serais " +
                        ana.valAna +
                        '</h2><p class="justification">' +
                        ana.exp +
                        "</p></div>" +
                        "</div>" +
                        "</div>";
                    //ajout du bloc
                    document.querySelector("#list").append(list);
                });
            }
            //appel de la fonction qui ajoute les blocs
            ajtBloc(data);
        });
    });

    //ajout d'un bloc par rapport aux infos du formulaire
    var nbForm = -1;
    document.querySelector("#send").addEventListener("click", function (e) {
        if (
            document.querySelector("#ana").value === "" ||
            document.querySelector("#val").value === "" ||
            document.querySelector("#exp").value === "" ||
            document.querySelector("#url").value === "" ||
            document.querySelector("#email").value === ""
        ) {
            return false;
        } else {
            nbForm++;
            //définir de quel côté sera l'image
            leftOrRight();
            e.preventDefault();
            //création du bloc
            document.querySelector("#blocPerso").innerHTML +=
                '<section><span id="intitule">you as...</span>' +
                '<div class="category" id="blocPersonnalise' +
                nbForm +
                '">' +
                '<div class="analogy">' +
                '<div class="' +
                evenOrOdd +
                '"id="illustration" style="background-image:url(' +
                document.querySelector("#url").value +
                ')"alt="image illustrative"></div>' +
                '<div class="text"> <h2 class="analogie">Si j\'étais ' +
                document.querySelector("#ana").value +
                ", je serais " +
                document.querySelector("#val").value +
                '</h2><p class="justification">' +
                document.querySelector("#exp").value +
                "</p></div>" +
                "</div>" +
                "</div></section>";
        }

        fetch(
            "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=antoine.montoya&courriel=" +
            document.querySelector("#email").value +
            "&message=Si j'étais " +
            document.querySelector("#ana").value +
            ", je serais " +
            document.querySelector("#val").value +
            " Parce que " +
            document.querySelector("#exp").value +
            " Image : " +
            document.querySelector("#url").value
        ).then(function (response) {
            //génération du message d'erreur ou de succès
            response.json().then(function (data) {
                if (data.status == "success") {
                    document.querySelector("#formOk").innerHTML =
                        "Tout est ok, votre analogie a été ajoutée !";
                } else {
                    document.querySelector("#formOk").innerHTML =
                        "Oups, petit problème. Veuillez réessayer.";
                }
            });
        });
        //scroll automatique vers le bloc nouvellement créé
        document
            .getElementById("blocPersonnalise" + nbForm)
            .scrollIntoView({ behavior: "smooth" });
    });



    function ancreTop() {
        var scrollTotal =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        //lorsque l'on arrive la 3eme section
        if (document.documentElement.scrollTop / scrollTotal >= 0.3) {
            //apparition
            document.querySelector(".topScroll").classList.add("showBtn");
        } else {
            //disparition
            document.querySelector(".topScroll").classList.remove("showBtn");
        }
    }
    document.addEventListener("scroll", ancreTop);



    //fonction qui ramène en haut de la page
    function scrollToTop() {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    //si clic sur le bouton, alors déclenchement de la fonction
    document.querySelector(".topScroll").addEventListener("click", scrollToTop);



    //Détecter le clic sur "Mentions légales"
    document.querySelector(".invis").addEventListener("click", function () {
        //Animer le volet pour le dérouler
        document.querySelector(".invis").animate(
            [
                {
                    height: "37em",
                },
            ],
            {
                duration: 800,
            }
        );
        setTimeout(function f() {
            //Attribuer la classe vis à la place de la classe invis
            document.querySelector(".invis").classList.replace("invis", "vis");
        }, 800);
    });
    //Refermer le volet
    document.querySelector(".basPage").addEventListener("click", function () {
        document.querySelector(".vis").animate(
            [
                {
                    height: "4em",
                },
            ],
            {
                duration: 800,
            }
        );
        setTimeout(function f() {
            //Attribuer la classe invis à la place de la classe vis
            document.querySelector(".vis").classList.replace("vis", "invis");
        }, 800);
    });



    //apparition ou disparition de la barre de navigation en fonction de l'élément affiché
    window.addEventListener('scroll', function() {
        var currentSection = null;

        document.querySelectorAll('.category').forEach(function(section) {
            var rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                currentSection = section;
            }
        });

        var rectFooter = document.querySelector('footer').getBoundingClientRect();
        if (rectFooter.top < window.innerHeight) {
            document.getElementById('navbar').style.display = 'none';
        } else if (currentSection) {
            document.getElementById('navbar').style.display = 'block';
        } else {
            document.getElementById('navbar').style.display = 'none';
        }
    });

});
