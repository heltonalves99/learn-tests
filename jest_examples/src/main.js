export const examples = {
  upperCase: (str) => new Promise((resolve, reject) => {
    if (!str){
      reject('Treta aqui!');
      return;
    }
    resolve(str.toUpperCase());
  }),
  
  helloWorldMocky: (str='') => fetch('http://www.mocky.io/v2/5c5c886f32000011002204f5')
    .then(resp => resp.json())
    .then((resp) => (str)? `Hi ${str}: ${resp.text}` : resp.text)
    .catch((err) => {
      throw new Error('fetch failed' + err)
    })
}