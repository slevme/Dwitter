import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '노드 재밌어',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  console.log(found);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id, text) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
