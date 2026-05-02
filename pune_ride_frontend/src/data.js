export const LOCATIONS = [
  { name: "Hinjewadi IT Park", lat: 18.5913, lng: 73.7389 },
  { name: "Baner", lat: 18.5590, lng: 73.7797 },
  { name: "Kothrud", lat: 18.5074, lng: 73.8077 },
  { name: "Swargate", lat: 18.5018, lng: 73.8537 },
  { name: "Pune Station", lat: 18.5289, lng: 73.8744 },
  { name: "Pune Airport", lat: 18.5820, lng: 73.9197 },
  { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
  { name: "Koregaon Park", lat: 18.5362, lng: 73.8940 },
  { name: "Magarpatta City", lat: 18.5147, lng: 73.9242 },
  { name: "Hadapsar", lat: 18.5089, lng: 73.9260 },
  { name: "Katraj", lat: 18.4529, lng: 73.8554 },
  { name: "Pimple Saudagar", lat: 18.5947, lng: 73.7915 }
];

export const DRIVERS = [
  { id: 1, name: "Rahul S.", rating: 4.8, location: "Hinjewadi IT Park", avatar: "👨‍✈️" },
  { id: 2, name: "Amit K.", rating: 4.2, location: "Pune Station", avatar: "🚗" },
  { id: 3, name: "Priya M.", rating: 4.9, location: "Koregaon Park", avatar: "👩‍✈️" },
  { id: 4, name: "Suresh D.", rating: 4.2, location: "Swargate", avatar: "🚕" },
  { id: 5, name: "Vikram R.", rating: 4.5, location: "Pune Airport", avatar: "🚙" },
  { id: 6, name: "Sneha G.", rating: 4.7, location: "Kothrud", avatar: "👩‍💼" },
  { id: 7, name: "Deepak P.", rating: 4.0, location: "Magarpatta City", avatar: "🕺" },
  { id: 8, name: "Anjali T.", rating: 4.6, location: "Baner", avatar: "👩‍💻" }
];

export const EDGES = [
  ["Hinjewadi IT Park", "Baner", 8],
  ["Baner", "Kothrud", 10],
  ["Kothrud", "Swargate", 6],
  ["Swargate", "Pune Station", 4],
  ["Pune Station", "Pune Airport", 10],
  ["Pune Airport", "Viman Nagar", 3],
  ["Viman Nagar", "Koregaon Park", 5],
  ["Koregaon Park", "Magarpatta City", 6],
  ["Magarpatta City", "Hadapsar", 3],
  ["Hadapsar", "Swargate", 9],
  ["Swargate", "Katraj", 7],
  ["Kothrud", "Katraj", 12],
  ["Baner", "Pune Station", 12],
  ["Hinjewadi IT Park", "Pimple Saudagar", 7],
  ["Pimple Saudagar", "Baner", 5],
];
