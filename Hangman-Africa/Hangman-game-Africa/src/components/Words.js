var countries = [
  "nigeria",
  "ethopia",
  "egypt",
  "tanzania",
  "kenya",
  "uganda",
  "algeria",
  "sudan",
  "morocco",
];

function randomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

export { randomCountry };
