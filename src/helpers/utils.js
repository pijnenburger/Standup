// Helper function to shuffle an array randomly
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateParticipant(value) {
  return {
    id: crypto.randomUUID(),
    name: value,
    selected: true,
  };
}
export async function fetchRandomUser() {
  const response = await fetch("https://randomuser.me/api/?nat=nl&inc=name");
  const resJson = await response.json();
  const user = resJson.results[0];
  const name = user.name.first;
  return [name];
}
