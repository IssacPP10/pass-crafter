export const generatePassword = (length = 12) => {
    const charset = 
        "abcdefghijklmnopqrstuvwxyz" +  // Letras minúsculas
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +  // Letras mayúsculas
        "0123456789" +                      // Números
        "!@#$%^&*()_+-=[]{}|;:',.<>?/";     // Caracteres especiales
    let password = "";
    for(let i = 0, n = charset.length; i < length; ++i){
        password += charset.charAt(Math.floor(Math.random() * n))
    }

    return password;
};