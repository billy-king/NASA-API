document.querySelector('#userSelection').addEventListener('click', getUserDate)
document.querySelector('#randomDate').addEventListener('click', getRandomDate)

// gets a random date between today's date and the start of NASA Picture of the Day
function getRandomDate(){
  const today = new Date()
  const startOfAPOD = new Date('1995-6-16')
  const differenceOfTime = today.getTime() - startOfAPOD.getTime()
  // gets a random time between the two dates
  const randomTime = differenceOfTime * Math.random()
  // gets a random date with the time difference
  const randomDate = new Date(today.getTime() - randomTime)
  // returns YYYY-MM-DD
  const choice = `${randomDate.getFullYear()}-${randomDate.getMonth()}-${randomDate.getDate()}`
  getFetch(choice)
}

function getUserDate(){
  const choice = document.querySelector('input').value
  getFetch(choice)
}

function getFetch(choice){
  const url = `https://api.nasa.gov/planetary/apod?api_key=ylKQoEzXxxOl8Bx6g6fhUV0D4EUHyLA5y432ZblN&date=${choice}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.media_type === 'image') {
        document.querySelector('img').style.display = "block"
        document.querySelector('img').src = data.hdurl
        document.querySelector('iframe').style.display = "none"
      } else {
        document.querySelector('iframe').style.display = "block"
        document.querySelector('iframe').src = data.url
        document.querySelector('img').style.display = "none"
      }
      document.querySelector('p').innerText = data.explanation
      document.querySelector('h2').innerText = data.date
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

getRandomDate()