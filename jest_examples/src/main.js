export const upperCase = (str) => new Promise((resolve, reject) => {
  if (!str){
    reject('Treta aqui!');
    return;
  }
  resolve(str.toUpperCase());
});
