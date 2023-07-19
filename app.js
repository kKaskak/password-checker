const strengther = document.querySelector(".strengther");
const passwordInput = document.querySelector('input[type="text"]');
const passwordCheck = document.querySelector(".password-check");

passwordInput.addEventListener("input", updateStrengther);

function updateStrengther() {
  const assessments = calculatePassStrength(passwordInput.value);

  let strength = 100;

  passwordCheck.innerHTML = "";

  assessments.forEach((ass) => {
    if (ass == null) return;

    strength -= ass.strengthLost;
    const pwdCheckEl = document.createElement("p");
    pwdCheckEl.innerHTML = ass.pwdCheck;
    passwordCheck.appendChild(pwdCheckEl);
  });
  strengther.style.setProperty("--strength-amount", strength);
}

function calculatePassStrength(password) {
  const assessment = [];
  assessment.push(lengthAssessement(password));
  assessment.push(lowecaseAssessement(password));
  assessment.push(uppercaseAssessement(password));
  assessment.push(numberAssessment(password));
  assessment.push(specialCharacterAss(password));
  assessment.push(repeatCharAss(password));
  return assessment;
}

function lengthAssessement(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      pwdCheck: "Password is too short",
      strengthLost: 40,
    };
  }
  if (length <= 10) {
    return {
      pwdCheck: "Password could be longer",
      strengthLost: 15,
    };
  }
}

function lowecaseAssessement(password) {
  return characterTypeAssessement(password, /[a-z]/g, "lowercase characters");
}
function uppercaseAssessement(password) {
  return characterTypeAssessement(password, /[A-Z]/g, "uppercase characters");
}
function numberAssessment(password) {
  return characterTypeAssessement(password, /[0-9]/g, "numbers");
}
function specialCharacterAss(password) {
  return characterTypeAssessement(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special Characters"
  );
}
// Character Type assessement
function characterTypeAssessement(password, regX, assType) {
  const characterMatch = password.match(regX) || [];

  if (characterMatch.length === 0) {
    return {
      pwdCheck: `Password has no ${assType}`,
      strengthLost: 20,
    };
  }
  if (characterMatch.length <= 2) {
    return {
      pwdCheck: `Password must have more ${assType}`,
      strengthLost: 5,
    };
  }
}

function repeatCharAss(password) {
  const repCharMatch = password.match(/(.)\1/g) || [];
  if (repCharMatch.length > 0) {
    return {
      pwdCheck: "Password has repeat characters",
      strengthLost: repCharMatch.length * 10,
    };
  }
}
