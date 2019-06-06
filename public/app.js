document.addEventListener("DOMContentLoaded", event => {
  const appConfig = new blockstack.AppConfig();
  const userSession = new blockstack.UserSession({ appConfig: appConfig });
  let section = 1;

  document.getElementById("signin-button").addEventListener("click", event => {
    event.preventDefault();
    userSession.redirectToSignIn();
  });

  document.getElementById("signout-button").addEventListener("click", event => {
    event.preventDefault();
    userSession.signUserOut();
    window.location = window.location.origin;
  });

  document //when gotolistings-button is clicked, loads the listings component
    .getElementById("gotolistings-button")
    .addEventListener("click", event => {
      event.preventDefault();
      section = 3;
      document.getElementById("section-2").style.display = "none";
      document.getElementById("section-3").style.display = "block";
      console.log("Section == 3");
    });

  function showProfile(profile) {
    let person = new blockstack.Person(profile);
    document.getElementById("heading-name").innerHTML = person.name()
      ? person.name()
      : "Nameless Person";
    if (person.avatarUrl()) {
      document
        .getElementById("avatar-image")
        .setAttribute("src", person.avatarUrl());
    }
    document.getElementById("section-1").style.display = "none";
    document.getElementById("section-2").style.display = "block";
    section = 2;
  }

  if (userSession.isUserSignedIn()) {
    const { profile } = userSession.loadUserData();
    showProfile(profile);
  } else if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(userData => {
      window.location = window.location.origin;
    });
  }
});
