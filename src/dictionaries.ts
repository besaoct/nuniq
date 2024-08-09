
// dictionaries.ts

const MaleFirstNames = [
    'shafin', 'arif', 'faisal', 'rahim',
    'alak', 'arjun', 'rohan', 'vikram', 'sachin', 'anil', 'rahul', 'suresh', 'amit', 'vijay',
    'john', 'peter', 'michael', 'david', 'paul', 'mark', 'james', 'robert', 'thomas',
    'jun', 'minho', 'taeyang', 'hyun', 'jong', 'seok', 'young', 'woo', 'jae', 'hwan',
    'li', 'hiroshi', 'kenji', 'sanjay', 'daniel', 'george'
];

const MaleSurnames = [
    'ahmed', 'khan', 'hossain', 'rahman',
    'sharma', 'verma', 'gupta', 'iyer', 'patel', 'nair', 'reddy', 'singh', 'mishra', 'sen', 
    'smith', 'johnson', 'brown', 'williams', 'jones', 'miller', 'davis', 'wilson',
    'kim', 'lee', 'park', 'choi', 'jung', 'cho', 'kang', 'yun', 'jang', 'lim',
    'tanaka', 'sato', 'chang', 'chen', 'wang', 'fernandez', 'garcia'
];

const FemaleFirstNames = [
    'uswa', 'hena', 'tahmina', 'zimi', 'laila',
    'aisha', 'priya', 'sita', 'radha', 'lakshmi', 'divya', 'manisha', 'rekha', 'anjali',
    'mary', 'susan', 'linda', 'sarah', 'jennifer', 'elizabeth', 'anna', 'grace', 'alice',
    'jiyeon', 'eunji', 'soyoung', 'yuna', 'minji', 'hyeri', 'seoyeon', 'jiyoung', 'chae',
    'mei', 'yuki', 'hana', 'rosie', 'sofia', 'isabella'
];

const FemaleSurnames = [
    'ahmed', 'aktar', 'sultana', 'begum', 'khatun',
    'sharma', 'verma', 'gupta', 'iyer', 'patel', 'nair', 'rani', 'bose', 'kapoor',
    'smith', 'johnson', 'brown', 'williams', 'jones', 'miller', 'taylor', 'anderson',
    'kim', 'lee', 'park', 'choi', 'jung', 'cho', 'kang', 'lim', 'jang', 'seo',
    'tanaka', 'sato', 'chen', 'li', 'gonzalez', 'fernandez', 'rodriguez', 'morales'
];

const Adjectives = [
    'big', 'small', 'quick', 'lazy', 'bright', 'happy', 'sad', 'angry', 'brave', 'calm',
    'clever', 'kind', 'cold', 'hot', 'loud', 'quiet', 'soft', 'hard', 'rough', 'smooth',
    'fast', 'slow', 'young', 'old', 'strong', 'weak', 'tall', 'short', 'rich', 'poor',
    'long', 'short', 'heavy', 'light', 'dark', 'pale', 'deep', 'shallow', 'clean', 'dirty',
    'wet', 'dry', 'sweet', 'sour', 'bitter', 'salty', 'tasty', 'bland', 'fresh', 'stale',
    'new', 'old', 'good', 'bad', 'nice', 'mean', 'polite', 'rude', 'friendly', 'unfriendly',
    'honest', 'dishonest', 'careful', 'careless', 'lucky', 'unlucky', 'beautiful', 'ugly',
    'handsome', 'pretty', 'plain', 'fancy', 'simple', 'complex', 'easy', 'difficult', 
    'funny', 'serious', 'creative', 'boring', 'expensive', 'cheap', 'important', 'unimportant',
    'useful', 'useless', 'happy', 'sad', 'healthy', 'sick', 'strong', 'weak', 'brave', 
    'cowardly', 'fierce', 'gentle', 'famous', 'unknown', 'popular', 'unpopular', 'safe', 
    'dangerous', 'busy', 'lazy', 'organized', 'messy', 'confident', 'nervous', 'optimistic', 
    'pessimistic', 'curious', 'indifferent', 'jealous', 'proud', 'shy', 'outgoing', 
    'brilliant', 'dull', 'colorful', 'bland', 'helpful', 'useless', 'bright', 'dim', 
    'cheerful', 'gloomy', 'graceful', 'clumsy', 'flexible', 'stiff', 'humble', 'arrogant', 
    'patient', 'impatient', 'reliable', 'unreliable', 'faithful', 'unfaithful', 'generous', 
    'selfish', 'thoughtful', 'thoughtless', 'adventurous', 'cautious', 'brave', 'cowardly', 
    'energetic', 'tired', 'enthusiastic', 'apathetic', 'open-minded', 'narrow-minded', 
    'wise', 'foolish', 'intelligent', 'stupid', 'sensitive', 'insensitive', 'talented', 
    'clumsy', 'loyal', 'disloyal', 'trustworthy', 'untrustworthy', 'ambitious', 'lazy', 
    'charismatic', 'dull', 'spontaneous', 'predictable', 'creative', 'unimaginative', 
    'humorous', 'serious', 'tolerant', 'intolerant', 'considerate', 'inconsiderate'
];

const Colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 
    'white', 'gray', 'beige', 'cyan', 'magenta', 'indigo', 'violet', 'teal', 'maroon',
    'lavender', 'olive', 'peach', 'navy', 'gold', 'silver', 'bronze', 'aqua', 'fuchsia',
    'lime', 'coral', 'plum', 'ivory', 'mint', 'rose', 'jade', 'amber', 'tan', 'charcoal',
    'khaki', 'mustard', 'periwinkle', 'turquoise', 'salmon', 'sapphire', 'ruby', 'emerald',
    'topaz', 'cerulean', 'chartreuse', 'taupe', 'crimson', 'scarlet', 'orchid', 'pearl',
    'blush', 'denim', 'mulberry', 'cobalt', 'mocha', 'sand', 'apricot', 'cherry', 'pearl'
];

const Animals = [
    'donkey', 'dog', 'cat', 'lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'bear', 
    'wolf', 'fox', 'deer', 'mouse', 'rat', 'horse', 'sheep', 'goat', 'cow', 'pig', 
    'rabbit', 'squirrel', 'moose', 'elk', 'antelope', 'buffalo', 'leopard', 'cheetah', 
    'panther', 'jaguar', 'cougar', 'hyena', 'rhino', 'hippo', 'kangaroo', 'koala', 
    'platypus', 'ostrich', 'penguin', 'dolphin', 'whale', 'shark', 'octopus', 'squid', 
    'crab', 'lobster', 'eel', 'seal', 'otter', 'beaver', 'bat', 'owl', 'eagle', 'hawk', 
    'falcon', 'sparrow', 'crow', 'raven', 'pigeon', 'parrot', 'peacock', 'swan', 'goose', 
    'duck', 'turkey', 'chicken', 'rooster', 'hen', 'frog', 'toad', 'snake', 'lizard', 
    'iguana', 'tortoise', 'turtle', 'crocodile', 'alligator', 'cobra', 'python', 'vulture', 
    'flamingo', 'lemur', 'meerkat', 'chimpanzee', 'gorilla', 'orangutan', 'baboon', 
    'bison', 'chameleon', 'armadillo', 'porcupine', 'hedgehog', 'badger', 'mongoose', 
    'walrus', 'jellyfish', 'starfish', 'clam', 'oyster', 'shrimp', 'prawn', 'moth', 
    'butterfly', 'beetle', 'ant', 'bee', 'wasp', 'hornet', 'grasshopper', 'cricket', 
    'locust', 'mantis', 'dragonfly', 'ladybug', 'termite', 'slug', 'snail', 'worm'
];

const Digits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; 
const Alphabets = 'abcdefghijklmnopqrstuvwxyz'.split(''); 

export const NuniqDictionary = {
    MaleFirstNames,
    MaleSurnames,
    FemaleFirstNames,
    FemaleSurnames,
    Adjectives,
    Colors,
    Animals,
    Digits,
    Alphabets
}

