export const checkValidData = (email, password) => {

    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/.test(password);

    if(!isValidEmail) return "Email Id not a valid.";
    if(!isPassword) return "Password not a valid.";

    return null;
}