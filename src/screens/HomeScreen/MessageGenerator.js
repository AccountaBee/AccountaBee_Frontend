const successMessages = [
	"You achieved all your goals\nfor the week!\n\nYou're an absolute rockstar!",
	'You achieved all your goals\nfor the week!\n\nAmazing!',
	'You achieved all your goals\nfor the week!\n\nBask in the glory of your empty to-do list.',
	'You achieved all your goals\nfor the week!\n\nGreat work!',
	'You achieved all your goals\nfor the week!\n\nYou should be really proud of yourself!',
	"You achieved all your goals\nfor the week!\n\nYou're unstoppable!",
	'You achieved all your goals\nfor the week!\n\nLook at you go!',
	'You achieved all your goals\nfor the week!\n\nAwesome job staying on task!',
	"You achieved all your goals\nfor the week!\n\nYou're on fire!",
	'You achieved all your goals\nfor the week!\n\nYour commitment is super impressive!',
];

export const messageGenerator = () => {
	const num = Math.floor(Math.random() * (9 - 1));
	return successMessages[num];
};
