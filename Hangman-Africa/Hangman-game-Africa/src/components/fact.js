let fact = [
  "There are 54 countries in Africa - and 9 territories -with a total of more than 1.1 billion people living on the continent, which is 15% of the world's total population",
  "Largest Country: Algeria. This country is among the ten largest countries in the world. The most populous country in Africa, however, is Nigeria, with more than 185 million people, but the country is only a third of the size of Algeria.",
  "Largest City: Lagos in Nigeria. With more than 21 million inhabitants, Lagos is also one of the biggest metropolitan cities in the world and is estimated to become the world's largest city by 2100.",
  "Smallest Country: Seychelles, which is an archipelago (nation of islands) in the Indian Ocean. On the African mainland, the smallest country is The Gambia.",
  "Biggest Island: Madagascar in the Indian Ocean. Madagascar is the fourth largest island in the world",
  "Longest River: Nile (6,852metres/4,258miles). The Nile is the longest river in the world. The Nile has two sources: The White Nile coming from Lake Victoria in Tanzania and the Blue Nile coming from Lake Tana in Ethiopia.",
  "Highest Mountain: Mt Kilimanjaro in Tanzania. The highest peak of the mountain 'Kibo Peak', also called 'Uhuru Peak', (5,895metres/19,340ft) is located in the Tanzanian highlands",
  "Biggest Lake: Lake Victoria (bordering Uganda, Tanzania and Kenya) is also the world's second largest freshwater lake. Only Lake Superior in North America is bigger!",
  "Driest Place: The Sahara in northern Africa is the largest hot desert in the world. The climate is extremely dry (arid) in this region.",
];

function randomFact() {
  return fact[Math.floor(Math.random() * fact.length)];
}

export { randomFact };
