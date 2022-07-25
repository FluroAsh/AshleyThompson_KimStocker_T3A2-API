export function randomDate(){
  let start = new Date(); // 'today'
  let end = new Date(2023, 0, 1); // Jan 1st 2023

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};


export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
