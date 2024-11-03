const yelpApiKey = 'YOUR_YELP_API_KEY';  // Replace with your actual Yelp API key

// Function to get the user's current location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
    useStaticData();
  }
}

// Success callback for geolocation
function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetchRestaurants(latitude, longitude);
}

// Error callback for geolocation
function error() {
  console.log("Unable to retrieve your location");
  useStaticData();  // Fallback to static data
}

// Fetch restaurants from Yelp API
async function fetchRestaurants(lat, lon) {
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${lat}&longitude=${lon}&categories=asian&limit=5`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${yelpApiKey}`
    }
  });
  
  const data = await response.json();
  displayRestaurants(data.businesses);
}

// Fallback to static data if geolocation or Yelp API fails
function useStaticData() {
  const fallbackRestaurants = {
    washington: [
      { name: 'Washington Restaurant A', location: 'Washington', img: 'wash-a.jpg' },
      { name: 'Washington Restaurant B', location: 'Washington', img: 'wash-b.jpg' }
    ],
    maryland: [
      { name: 'KPOT Korean BBQ', location: 'Maryland', img: 'kpot.jpg' },
      { name: 'Shin Restaurant', location: 'Maryland', img: 'shin.jpg' }
    ],
    virginia: [
      { name: 'Virginia Restaurant A', location: 'Virginia', img: 'virginia-a.jpg' },
      { name: 'Virginia Restaurant B', location: 'Virginia', img: 'virginia-b.jpg' }
    ]
  };
  
  displayRestaurants(fallbackRestaurants[selectedLocation]);
}

// Display restaurants dynamically
function displayRestaurants(restaurants) {
  const r1 = restaurants[0];
  const r2 = restaurants[1];
  
  // Display restaurant 1
  document.getElementById('img1').src = r1.image_url;
  document.getElementById('name1').textContent = r1.name;
  document.getElementById('location1').textContent = r1.location.address1;

  // Display restaurant 2
  document.getElementById('img2').src = r2.image_url;
  document.getElementById('name2').textContent = r2.name;
  document.getElementById('location2').textContent = r2.location.address1;
}

// Initial function to get restaurants based on user's location
getUserLocation();

// Handle user choice buttons
document.getElementById('choose-left').addEventListener('click', () => {
  alert(`You selected: ${document.getElementById('name1').textContent}`);
});

document.getElementById('choose-right').addEventListener('click', () => {
  alert(`You selected: ${document.getElementById('name2').textContent}`);
});
