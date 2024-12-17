export const generateRandomUsername = (length = 12) => {
    const adjetives = [
        "quick",
        "quiet",
        "loud",
        "beautiful",
        "dangerous",
        "intelligent",
        "mysterious",
        "honest",
        "gentle",
        "calm"
    ];
    const nouns = [
        "cat",
        "dog",
        "elephant",
        "tiger",
        "lion",
        "giraffe",
        "rabbit",
        "zebra",
        "kangaroo",
        "penguin"
    ];

    const randomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];

    let username = "";
    username += randomItem(adjetives);
    username += randomItem(nouns);
    username += Math.floor(Math.random() * 10000);

    if (username.length > length) {
        username = username.substring(0, length);
    }
    return username;
};
