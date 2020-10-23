const successMessagesTextOne = [
	'Woooot wooot!',
	'Yaaaas!',
	'Amazing!',
	'Fantastic!',
  'Impressive!',
  'Eyyyyyyy!',
];

export const toastGeneratorTextOne = () => {
	const num = Math.floor(Math.random() * (8 - 1));
	return successMessagesTextOne[num];
};

const successMessagesTextTwo = [
  'You are one step closer!',
  'You are one day closer!',
	'One day down!',
  'Another day completed!',
  "You're getting there!",
  'You are committed!'
];

export const toastGeneratorTextTwo = () => {
	const num = Math.floor(Math.random() * (4 - 1));
	return successMessagesTextTwo[num];
};