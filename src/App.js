import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Edit3, Headphones, CheckCircle, XCircle, ArrowRight, ArrowLeft, Award, MessageCircle, AlertCircle, BarChart2, Mic, Camera, MessageSquare, ExternalLink, Settings, Trash2, Play, Pause, Flame, Layers } from 'lucide-react';

// --- 🔴 TEACHER: PASTE YOUR PERMANENT AUDIO LINKS HERE 🔴 ---
// Because Netlify does not have a shared database, any link placed here 
// will be permanently available to all your students on all browsers.
const TEACHER_AUDIO_LINKS = {
  'l1': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526675/harry.mp3', // Add the link for "Interview with Harry" here when you have it!
  'l2': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526567/audio-project.mp3', // Interview with an author
  'l3': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526566/elevenlabs-untitled-project-1.mp3', // Supermarket
  'l4': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526542/a-lucky-escape.mp3',
  'l5': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526565/elevenlabs-a-spoonful-of-sugar.mp3',
  'l6': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526550/paul-stout.mp3', // Toddler bought a car
  'l7': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526546/duke-the-rescue-dog.mp3',
  'l8': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526547/einstein.mp3',
  'l9': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526549/interview-with-leona-lewis.mp3',
  'l10': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526551/slow-drivers.mp3',
  'l11': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526544/a-philosop.mp3',
  'l12': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526548/franz-kafka-and-the-doll.mp3',
  'l13': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526543/the-money-on-the-highway.mp3',
  'l14': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526552/the-emperor-of-long-distance.mp3',
  'l15': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526553/the-history-of-the-bikini.mp3',
  'l16': 'https://ws-customer-file-upload-storage.s3.amazonaws.com/wscfus/10805606/33526554/the-lost-fisherman.mp3'
};
// -------------------------------------------------------------

// --- DATA: Flashcards (Batch 1-5: 1-300) ---
const flashcardsData = [
  { id: 1, category: 'Adjective + Prep', term: 'good at', context: 'She is good at drawing.', grammar: 'Meaning: jó vmiben' },
  { id: 2, category: 'Adjective + Prep', term: 'bad at', context: "I'm bad at remembering names.", grammar: 'Meaning: rossz vmiben' },
  { id: 3, category: 'Adjective + Prep', term: 'interested in', context: 'He is interested in photography.', grammar: 'Meaning: érdeklődik vmi iránt' },
  { id: 4, category: 'Adjective + Prep', term: 'afraid of', context: 'Children are afraid of the dark.', grammar: 'Meaning: fél vmitől' },
  { id: 5, category: 'Adjective + Prep', term: 'proud of', context: 'She is proud of her son.', grammar: 'Meaning: büszke vmire' },
  { id: 6, category: 'Adjective + Prep', term: 'worried about', context: "Don't be worried about the test.", grammar: 'Meaning: aggódik vmi miatt' },
  { id: 7, category: 'Adjective + Prep', term: 'excited about', context: 'We are excited about the trip.', grammar: 'Meaning: izgatott vmi miatt' },
  { id: 8, category: 'Adjective + Prep', term: 'bored with', context: 'They got bored with the film.', grammar: 'Meaning: un vmit' },
  { id: 9, category: 'Adjective + Prep', term: 'famous for', context: 'Budapest is famous for its baths.', grammar: 'Meaning: híres vmiről' },
  { id: 10, category: 'Adjective + Prep', term: 'responsible for', context: 'Who is responsible for this mess?', grammar: 'Meaning: felelős vmiért' },
  { id: 11, category: 'Adjective + Prep', term: 'keen on', context: "I'm not very keen on spicy food.", grammar: 'Meaning: nagyon szeret vmit' },
  { id: 12, category: 'Adjective + Prep', term: 'capable of', context: 'She is capable of passing the exam.', grammar: 'Meaning: képes vmire' },
  { id: 13, category: 'Adjective + Prep', term: 'fond of', context: 'He is very fond of his pets.', grammar: 'Meaning: kedvel vkit/vmit' },
  { id: 14, category: 'Adjective + Prep', term: 'full of', context: 'The room was full of people.', grammar: 'Meaning: tele van vmivel' },
  { id: 15, category: 'Adjective + Prep', term: 'aware of', context: 'Are you aware of the risks?', grammar: 'Meaning: tisztában van vmivel' },
  { id: 16, category: 'Adjective + Prep', term: 'typical of', context: 'It is typical of him to be late.', grammar: 'Meaning: jellemző vkire/vmire' },
  { id: 17, category: 'Adjective + Prep', term: 'tired of', context: "I'm tired of your excuses.", grammar: 'Meaning: elege van vmiből' },
  { id: 18, category: 'Adjective + Prep', term: 'similar to', context: 'Your jacket is similar to mine.', grammar: 'Meaning: hasonló vmihez' },
  { id: 19, category: 'Adjective + Prep', term: 'different from', context: 'This car is different from the others.', grammar: 'Meaning: különbözik vmitől' },
  { id: 20, category: 'Adjective + Prep', term: 'suitable for', context: 'This movie is not suitable for children.', grammar: 'Meaning: alkalmas vmire' },
  { id: 21, category: 'Adjective + Prep', term: 'used to', context: 'I am used to waking up early.', grammar: 'Meaning: hozzá van szokva' },
  { id: 22, category: 'Adjective + Prep', term: 'dependent on', context: 'He is dependent on his parents.', grammar: 'Meaning: függ vmitől' },
  { id: 23, category: 'Adjective + Prep', term: 'based on', context: 'The film is based on a true story.', grammar: 'Meaning: alapul vmin' },
  { id: 24, category: 'Adjective + Prep', term: 'satisfied with', context: 'Are you satisfied with the results?', grammar: 'Meaning: elégedett vmivel' },
  { id: 25, category: 'Adjective + Prep', term: 'disappointed with', context: 'I was disappointed with the food.', grammar: 'Meaning: csalódott vmiben' },
  { id: 26, category: 'Adjective + Prep', term: 'good for', context: 'Eating vegetables is good for you.', grammar: 'Meaning: jót tesz' },
  { id: 27, category: 'Adjective + Prep', term: 'bad for', context: 'Smoking is bad for your health.', grammar: 'Meaning: rosszat tesz' },
  { id: 28, category: 'Adjective + Prep', term: 'polite to', context: 'You should be polite to the customers.', grammar: 'Meaning: udvarias vkivel' },
  { id: 29, category: 'Adjective + Prep', term: 'rude to', context: "Don't be rude to your teacher.", grammar: 'Meaning: udvariatlan vkivel' },
  { id: 30, category: 'Adjective + Prep', term: 'kind to', context: 'She has always been kind to me.', grammar: 'Meaning: kedves vkivel' },
  { id: 31, category: 'Adjective + Prep', term: 'angry with', context: 'My boss was angry with me.', grammar: 'Meaning: mérges vkire' },
  { id: 32, category: 'Adjective + Prep', term: 'married to', context: 'She is married to a doctor.', grammar: 'Meaning: házas' },
  { id: 33, category: 'Adjective + Prep', term: 'popular with', context: 'This song is popular with teenagers.', grammar: 'Meaning: népszerű vki körében' },
  { id: 34, category: 'Adjective + Prep', term: 'involved in', context: 'He is involved in the project.', grammar: 'Meaning: részt vesz vmiben' },
  { id: 35, category: 'Adjective + Prep', term: 'successful in', context: 'She is successful in her career.', grammar: 'Meaning: sikeres vmiben' },
  { id: 36, category: 'Adjective + Prep', term: 'ready for', context: 'Are you ready for the journey?', grammar: 'Meaning: készen áll vmire' },
  { id: 37, category: 'Adjective + Prep', term: 'crowded with', context: 'The street was crowded with tourists.', grammar: 'Meaning: zsúfolt' },
  { id: 38, category: 'Adjective + Prep', term: 'ashamed of', context: 'He was ashamed of his behavior.', grammar: 'Meaning: szégyell vmit' },
  { id: 39, category: 'Phrase', term: 'would rather', context: "I would rather stay home tonight.", grammar: 'Meaning: inkább' },
  { id: 40, category: 'Phrase', term: "I'm sorry to say that", context: "I'm sorry to say that I can't come.", grammar: 'Meaning: sajnálom, hogy' },
  { id: 41, category: 'Phrase', term: 'I hope that', context: 'I hope that you feel better soon.', grammar: 'Meaning: remélem, hogy' },
  { id: 42, category: 'Phrase', term: "it's worth", context: "It's worth visiting Budapest.", grammar: 'Meaning: megéri' },
  { id: 43, category: 'Phrase', term: "I'm looking forward to", context: "I'm looking forward to the holidays.", grammar: 'Meaning: alig várom' },
  { id: 44, category: 'Phrase', term: 'I was wondering if', context: 'I was wondering if you are free.', grammar: 'Meaning: azon gondolkoztam, hogy' },
  { id: 45, category: 'Phrase', term: "I'd like to know", context: "I'd like to know your opinion.", grammar: 'Meaning: tudni szeretném' },
  { id: 46, category: 'Phrase', term: 'please give me some advice', context: 'Please give me some advice about this.', grammar: 'Meaning: kérlek adj tanácsot' },
  { id: 47, category: 'Phrase', term: "I don't know whether", context: "I don't know whether to go or not.", grammar: 'Meaning: nem tudom, hogy...-e' },
  { id: 48, category: 'Phrase', term: 'to be honest', context: "To be honest, I didn't like the food.", grammar: 'Meaning: őszintén szólva' },
  { id: 49, category: 'Phrase', term: 'make up my mind', context: "I can't make up my mind.", grammar: 'Meaning: döntést hoz' },
  { id: 50, category: 'Phrase', term: 'bear in mind', context: 'Bear in mind that it will be cold.', grammar: 'Meaning: észben tart' },
  { id: 51, category: 'Phrasal Verb', term: 'look forward to', context: 'I look forward to hearing from you.', grammar: 'Meaning: alig vár vmit' },
  { id: 52, category: 'Phrasal Verb', term: 'put off', context: 'They put off the meeting until Friday.', grammar: 'Meaning: elhalaszt' },
  { id: 53, category: 'Phrasal Verb', term: 'call off', context: 'The match was called off due to rain.', grammar: 'Meaning: lefúj, lemond' },
  { id: 54, category: 'Phrasal Verb', term: 'take up', context: 'He took up tennis last year.', grammar: 'Meaning: elkezd vmit csinálni (hobbit)' },
  { id: 55, category: 'Phrasal Verb', term: 'give up', context: 'She finally gave up smoking.', grammar: 'Meaning: felad, abbahagy' },
  { id: 56, category: 'Phrasal Verb', term: 'look up', context: 'Look up the word in a dictionary.', grammar: 'Meaning: kikeres (szótárból)' },
  { id: 57, category: 'Phrasal Verb', term: 'run out of', context: 'We have run out of milk.', grammar: 'Meaning: kifogy vmiből' },
  { id: 58, category: 'Phrasal Verb', term: 'carry on', context: 'Please carry on reading.', grammar: 'Meaning: folytat' },
  { id: 59, category: 'Phrasal Verb', term: 'bring up', context: 'She was brought up by her grandparents.', grammar: 'Meaning: felnevel' },
  { id: 60, category: 'Phrasal Verb', term: 'turn down', context: 'He turned down the job offer.', grammar: 'Meaning: visszautasít' },
  { id: 61, category: 'Phrasal Verb', term: 'make up', context: 'Stop making up excuses!', grammar: 'Meaning: kitalál (kifogást, történetet)' },
  { id: 62, category: 'Phrasal Verb', term: 'break down', context: 'Our car broke down on the highway.', grammar: 'Meaning: lerobban, elromlik' },
  { id: 63, category: 'Phrasal Verb', term: 'catch up with', context: "Go ahead, I'll catch up with you later.", grammar: 'Meaning: utolér vkit' },
  { id: 64, category: 'Phrasal Verb', term: 'get on well with', context: 'I get on well with my colleagues.', grammar: 'Meaning: jól kijön vkivel' },
  { id: 65, category: 'Phrasal Verb', term: 'figure out', context: 'We need to figure out a solution.', grammar: 'Meaning: kitalál, rájön' },
  { id: 66, category: 'Verb + Prep', term: 'pay attention to', context: 'Pay attention to the teacher!', grammar: 'Meaning: figyel vmire/vkire' },
  { id: 67, category: 'Verb + Prep', term: 'take part in', context: 'Are you taking part in the competition?', grammar: 'Meaning: részt vesz vmiben' },
  { id: 68, category: 'Verb + Prep', term: 'apply for', context: 'He applied for the manager position.', grammar: 'Meaning: jelentkezik vmire' },
  { id: 69, category: 'Verb + Prep', term: 'complain about', context: 'Customers complained about the noise.', grammar: 'Meaning: panaszkodik vmire' },
  { id: 70, category: 'Verb + Prep', term: 'concentrate on', context: "I can't concentrate on my work.", grammar: 'Meaning: koncentrál vmire' },
  { id: 71, category: 'Verb + Prep', term: 'depend on', context: 'It depends on the weather.', grammar: 'Meaning: függ vmitől' },
  { id: 72, category: 'Verb + Prep', term: 'rely on', context: 'You can always rely on me.', grammar: 'Meaning: támaszkodik vkire' },
  { id: 73, category: 'Verb + Prep', term: 'laugh at', context: "Please don't laugh at my drawing.", grammar: 'Meaning: nevet vkin/vmin' },
  { id: 74, category: 'Verb + Prep', term: 'belong to', context: 'This book belongs to Sarah.', grammar: 'Meaning: tartozik vkihez/vmihez' },
  { id: 75, category: 'Verb + Prep', term: 'consist of', context: 'The team consists of five members.', grammar: 'Meaning: áll vmiből' },
  { id: 76, category: 'Verb + Prep', term: 'agree with', context: 'I completely agree with you.', grammar: 'Meaning: egyetért vkivel' },
  { id: 77, category: 'Verb + Prep', term: 'insist on', context: 'He insisted on paying for dinner.', grammar: 'Meaning: ragaszkodik vmihez' },
  { id: 78, category: 'Verb + Prep', term: 'suffer from', context: 'My uncle suffers from back pain.', grammar: 'Meaning: szenved vmiben' },
  { id: 79, category: 'Verb + Prep', term: 'apologize for', context: 'I apologize for being late.', grammar: 'Meaning: bocsánatot kér vmiért' },
  { id: 80, category: 'Verb + Prep', term: 'succeed in', context: 'She succeeded in passing the exam.', grammar: 'Meaning: sikerül vmit csinálni' },
  { id: 81, category: 'Idiom', term: 'piece of cake', context: 'The maths test was a piece of cake.', grammar: 'Meaning: gyerekjáték, nagyon könnyű' },
  { id: 82, category: 'Idiom', term: 'out of the blue', context: 'He called me completely out of the blue.', grammar: 'Meaning: derült égből, váratlanul' },
  { id: 83, category: 'Idiom', term: 'under the weather', context: "I'm feeling a bit under the weather today.", grammar: 'Meaning: rosszul érzi magát' },
  { id: 84, category: 'Idiom', term: 'cost an arm and a leg', context: 'That designer bag costs an arm and a leg.', grammar: 'Meaning: méregdrága' },
  { id: 85, category: 'Idiom', term: 'break the ice', context: 'Tell a joke to break the ice.', grammar: 'Meaning: megtöri a jeget (oldja a feszültséget)' },
  { id: 86, category: 'Collocation', term: 'make a decision', context: 'It is time to make a decision.', grammar: 'Meaning: döntést hoz' },
  { id: 87, category: 'Collocation', term: 'do a favour', context: 'Could you do me a favour?', grammar: 'Meaning: szívességet tesz' },
  { id: 88, category: 'Collocation', term: 'do your best', context: 'Just do your best on the test!', grammar: 'Meaning: minden tőle telhetőt megtesz' },
  { id: 89, category: 'Collocation', term: 'make sense', context: "This rule doesn't make any sense.", grammar: 'Meaning: van értelme' },
  { id: 90, category: 'Collocation', term: 'make an effort', context: 'You must make an effort to improve.', grammar: 'Meaning: erőfeszítést tesz' },
  { id: 91, category: 'Phrase', term: 'in charge of', context: 'She is in charge of the marketing team.', grammar: 'Meaning: felelős vmiért, vezetője vminek' },
  { id: 92, category: 'Phrase', term: 'in advance', context: 'You have to buy the tickets in advance.', grammar: 'Meaning: előre' },
  { id: 93, category: 'Phrase', term: 'on purpose', context: "I didn't break the glass on purpose!", grammar: 'Meaning: szándékosan' },
  { id: 94, category: 'Phrase', term: 'by mistake', context: 'I took your umbrella by mistake.', grammar: 'Meaning: véletlenül, tévedésből' },
  { id: 95, category: 'Phrase', term: 'out of order', context: 'The elevator is out of order.', grammar: 'Meaning: elromlott, nem működik' },
  { id: 96, category: 'Phrase', term: 'up to date', context: 'This software is completely up to date.', grammar: 'Meaning: naprakész' },
  { id: 97, category: 'Phrase', term: "it's high time", context: "It's high time we went home.", grammar: 'Meaning: épp itt az ideje' },
  { id: 98, category: 'Phrase', term: 'as a matter of fact', context: 'As a matter of fact, I hate seafood.', grammar: 'Meaning: őszintén szólva, valójában' },
  { id: 99, category: 'Phrase', term: 'by the way', context: 'By the way, how is your sister doing?', grammar: 'Meaning: mellesleg, apropó' },
  { id: 100, category: 'Phrase', term: 'sooner or later', context: 'Sooner or later, you will have to tell the truth.', grammar: 'Meaning: előbb vagy utóbb' },
  { id: 101, category: 'Verb + Prep', term: 'ask for', context: 'He asked for a glass of water.', grammar: 'Meaning: kér vmit' },
  { id: 102, category: 'Verb + Prep', term: 'believe in', context: 'Do you believe in ghosts?', grammar: 'Meaning: hisz vmiben' },
  { id: 103, category: 'Verb + Prep', term: 'care about', context: "She doesn't care about money.", grammar: 'Meaning: törődik vmivel' },
  { id: 104, category: 'Verb + Prep', term: 'complain to', context: 'I will complain to the manager.', grammar: 'Meaning: panaszkodik vkinek' },
  { id: 105, category: 'Verb + Prep', term: 'dream about', context: 'I often dream about flying.', grammar: 'Meaning: álmodik vmiről' },
  { id: 106, category: 'Verb + Prep', term: 'hear about', context: 'Did you hear about the accident?', grammar: 'Meaning: hall vmiről' },
  { id: 107, category: 'Verb + Prep', term: 'look forward to', context: 'We look forward to seeing you.', grammar: 'Meaning: alig vár vmit' },
  { id: 108, category: 'Verb + Prep', term: 'pay for', context: 'Let me pay for the coffee.', grammar: 'Meaning: fizet vmiért' },
  { id: 109, category: 'Verb + Prep', term: 'prepare for', context: 'I need to prepare for my exam.', grammar: 'Meaning: felkészül vmire' },
  { id: 110, category: 'Verb + Prep', term: 'protect from', context: 'Wear sunglasses to protect your eyes from the sun.', grammar: 'Meaning: megvéd vmitől' },
  { id: 111, category: 'Verb + Prep', term: 'recover from', context: 'It took him weeks to recover from the flu.', grammar: 'Meaning: felépül vmiből' },
  { id: 112, category: 'Verb + Prep', term: 'save from', context: 'He saved the child from the fire.', grammar: 'Meaning: megment vmitől' },
  { id: 113, category: 'Verb + Prep', term: 'smell of', context: 'This room smells of smoke.', grammar: 'Meaning: vmilyen szaga van' },
  { id: 114, category: 'Verb + Prep', term: 'think about', context: 'What are you thinking about?', grammar: 'Meaning: gondol vmire' },
  { id: 115, category: 'Verb + Prep', term: 'wait for', context: 'I am waiting for the bus.', grammar: 'Meaning: vár vkire/vmire' },
  { id: 116, category: 'Phrasal Verb', term: 'give back', context: 'Please give back my pen.', grammar: 'Meaning: visszaad' },
  { id: 117, category: 'Phrasal Verb', term: 'give in', context: 'He finally gave in and accepted the offer.', grammar: 'Meaning: beadja a derekát' },
  { id: 118, category: 'Phrasal Verb', term: 'go on', context: 'The show must go on.', grammar: 'Meaning: folytatódik' },
  { id: 119, category: 'Phrasal Verb', term: 'grow up', context: 'I grew up in a small town.', grammar: 'Meaning: felnő' },
  { id: 120, category: 'Phrasal Verb', term: 'hold on', context: 'Hold on a minute, please.', grammar: 'Meaning: várj egy kicsit' },
  { id: 121, category: 'Phrasal Verb', term: 'look after', context: 'Can you look after my dog?', grammar: 'Meaning: vigyáz vkire' },
  { id: 122, category: 'Phrasal Verb', term: 'look for', context: 'I am looking for my keys.', grammar: 'Meaning: keres vmit' },
  { id: 123, category: 'Phrasal Verb', term: 'pass away', context: 'Her grandfather passed away last night.', grammar: 'Meaning: elhuny' },
  { id: 124, category: 'Phrasal Verb', term: 'put on', context: 'Put on your coat, it is cold.', grammar: 'Meaning: felvesz (ruhát)' },
  { id: 125, category: 'Phrasal Verb', term: 'take off', context: 'The plane took off on time.', grammar: 'Meaning: felszáll (gép) / levesz (ruhát)' },
  { id: 126, category: 'Phrasal Verb', term: 'turn off', context: 'Turn off the lights before leaving.', grammar: 'Meaning: lekapcsol' },
  { id: 127, category: 'Phrasal Verb', term: 'turn on', context: 'Please turn on the TV.', grammar: 'Meaning: bekapcsol' },
  { id: 128, category: 'Phrasal Verb', term: 'wake up', context: 'I usually wake up at 7 AM.', grammar: 'Meaning: felébred' },
  { id: 129, category: 'Phrasal Verb', term: 'work out', context: 'I work out at the gym twice a week.', grammar: 'Meaning: edz' },
  { id: 130, category: 'Phrasal Verb', term: 'find out', context: 'We need to find out the truth.', grammar: 'Meaning: kiderít' },
  { id: 131, category: 'Collocation', term: 'do business', context: 'They do business with foreign companies.', grammar: 'Meaning: üzletel' },
  { id: 132, category: 'Collocation', term: 'do homework', context: 'I have to do my homework now.', grammar: 'Meaning: házi feladatot ír' },
  { id: 133, category: 'Collocation', term: 'do the shopping', context: 'My dad usually does the shopping.', grammar: 'Meaning: bevásárol' },
  { id: 134, category: 'Collocation', term: 'make a mistake', context: 'Everyone makes a mistake sometimes.', grammar: 'Meaning: hibázik' },
  { id: 135, category: 'Collocation', term: 'make a noise', context: 'Please try not to make a noise.', grammar: 'Meaning: zajt csap' },
  { id: 136, category: 'Collocation', term: 'make an excuse', context: 'He always makes an excuse for being late.', grammar: 'Meaning: kifogást keres' },
  { id: 137, category: 'Collocation', term: 'make money', context: 'He makes a lot of money in IT.', grammar: 'Meaning: pénzt keres' },
  { id: 138, category: 'Collocation', term: 'take a break', context: "Let's take a 10-minute break.", grammar: 'Meaning: szünetet tart' },
  { id: 139, category: 'Collocation', term: 'take a photo', context: 'Can I take a photo of you?', grammar: 'Meaning: lefényképez' },
  { id: 140, category: 'Collocation', term: 'take an exam', context: 'I will take my English exam tomorrow.', grammar: 'Meaning: vizsgázik' },
  { id: 141, category: 'Collocation', term: 'catch a cold', context: 'Dress warmly so you don\'t catch a cold.', grammar: 'Meaning: megfázik' },
  { id: 142, category: 'Collocation', term: 'catch a bus', context: 'We have to run to catch the bus.', grammar: 'Meaning: eléri a buszt' },
  { id: 143, category: 'Collocation', term: 'keep a promise', context: 'You should always keep your promises.', grammar: 'Meaning: betartja az ígéretét' },
  { id: 144, category: 'Collocation', term: 'keep a secret', context: 'Can you keep a secret?', grammar: 'Meaning: titkot tart' },
  { id: 145, category: 'Collocation', term: 'tell a lie', context: 'I know you are telling a lie.', grammar: 'Meaning: hazudik' },
  { id: 146, category: 'Collocation', term: 'tell the truth', context: 'You must tell the truth.', grammar: 'Meaning: igazat mond' },
  { id: 147, category: 'Collocation', term: 'have a good time', context: 'Did you have a good time at the party?', grammar: 'Meaning: jól érzi magát' },
  { id: 148, category: 'Collocation', term: 'have a word with', context: 'I need to have a word with my boss.', grammar: 'Meaning: beszél vkivel' },
  { id: 149, category: 'Collocation', term: 'pay in cash', context: 'Would you like to pay in cash?', grammar: 'Meaning: készpénzzel fizet' },
  { id: 150, category: 'Collocation', term: 'pay by credit card', context: 'I prefer paying by credit card.', grammar: 'Meaning: kártyával fizet' },
  { id: 151, category: 'Prepositional Phrase', term: 'by chance', context: 'I met him by chance in the city.', grammar: 'Meaning: véletlenül' },
  { id: 152, category: 'Prepositional Phrase', term: 'by heart', context: 'We had to learn the poem by heart.', grammar: 'Meaning: kívülről (megtanul)' },
  { id: 153, category: 'Prepositional Phrase', term: 'for example', context: 'Eat more fruit, for example, apples.', grammar: 'Meaning: például' },
  { id: 154, category: 'Prepositional Phrase', term: 'for sure', context: 'I know for sure that he is coming.', grammar: 'Meaning: biztosan' },
  { id: 155, category: 'Prepositional Phrase', term: 'in common', context: 'We have a lot in common.', grammar: 'Meaning: közös (bennük)' },
  { id: 156, category: 'Prepositional Phrase', term: 'in danger', context: 'The animals in the forest are in danger.', grammar: 'Meaning: veszélyben van' },
  { id: 157, category: 'Prepositional Phrase', term: 'in fact', context: 'In fact, I completely disagree.', grammar: 'Meaning: valójában' },
  { id: 158, category: 'Prepositional Phrase', term: 'in hurry', context: 'I can\'t talk, I am in a hurry.', grammar: 'Meaning: siet' },
  { id: 159, category: 'Prepositional Phrase', term: 'in tears', context: 'The little girl was in tears.', grammar: 'Meaning: könnyek között' },
  { id: 160, category: 'Prepositional Phrase', term: 'on foot', context: 'Do you go to school on foot?', grammar: 'Meaning: gyalog' },
  { id: 161, category: 'Prepositional Phrase', term: 'on holiday', context: 'My parents are currently on holiday.', grammar: 'Meaning: nyaralni van' },
  { id: 162, category: 'Prepositional Phrase', term: 'on time', context: 'The train arrived exactly on time.', grammar: 'Meaning: pontosan (időben)' },
  { id: 163, category: 'Prepositional Phrase', term: 'in time', context: 'We got to the cinema just in time.', grammar: 'Meaning: időben (még nem késve)' },
  { id: 164, category: 'Prepositional Phrase', term: 'out of breath', context: 'I ran so fast, I was out of breath.', grammar: 'Meaning: kifulladt' },
  { id: 165, category: 'Prepositional Phrase', term: 'out of date', context: 'This map is out of date.', grammar: 'Meaning: elavult' },
  { id: 166, category: 'Idiom', term: 'couch potato', context: 'My brother is a real couch potato.', grammar: 'Meaning: lusta ember (TV előtt ülő)' },
  { id: 167, category: 'Idiom', term: 'cross your fingers', context: 'Cross your fingers for my exam tomorrow.', grammar: 'Meaning: szorít vkinek' },
  { id: 168, category: 'Idiom', term: 'feel like', context: 'I feel like going to the cinema.', grammar: 'Meaning: kedve van vmihez' },
  { id: 169, category: 'Idiom', term: 'get on my nerves', context: 'That loud music gets on my nerves.', grammar: 'Meaning: az idegeimre megy' },
  { id: 170, category: 'Idiom', term: 'have a sweet tooth', context: 'She has a sweet tooth; she loves chocolate.', grammar: 'Meaning: édesszájú' },
  { id: 171, category: 'Idiom', term: 'keep an eye on', context: 'Keep an eye on your bag at the station.', grammar: 'Meaning: szemmel tart' },
  { id: 172, category: 'Idiom', term: 'let me know', context: 'Let me know if you need help.', grammar: 'Meaning: tudasd velem' },
  { id: 173, category: 'Idiom', term: 'make fun of', context: 'It is cruel to make fun of others.', grammar: 'Meaning: gúnyt űz vkiből' },
  { id: 174, category: 'Idiom', term: 'never mind', context: 'Never mind, it wasn\'t important.', grammar: 'Meaning: ne is törődj vele' },
  { id: 175, category: 'Idiom', term: 'take place', context: 'The concert will take place in the park.', grammar: 'Meaning: megrendezésre kerül' },
  { id: 176, category: 'Idiom', term: 'up to you', context: 'Where we eat is up to you.', grammar: 'Meaning: rajtad áll' },
  { id: 177, category: 'Phrase', term: 'as long as', context: 'You can stay as long as you want.', grammar: 'Meaning: mindaddig, amíg' },
  { id: 178, category: 'Phrase', term: 'as soon as possible', context: 'Call me back as soon as possible.', grammar: 'Meaning: amint csak lehet' },
  { id: 179, category: 'Phrase', term: 'even though', context: 'I will go, even though it is raining.', grammar: 'Meaning: annak ellenére, hogy' },
  { id: 180, category: 'Phrase', term: 'in case', context: 'Take an umbrella in case it rains.', grammar: 'Meaning: arra az esetre, ha' },
  { id: 181, category: 'Phrase', term: 'in spite of', context: 'He went to work in spite of feeling ill.', grammar: 'Meaning: vmi ellenére' },
  { id: 182, category: 'Phrase', term: 'instead of', context: 'I will have tea instead of coffee.', grammar: 'Meaning: vmi helyett' },
  { id: 183, category: 'Phrase', term: 'make sure', context: 'Make sure you lock the door.', grammar: 'Meaning: gondoskodik róla, meggyőződik' },
  { id: 184, category: 'Phrase', term: 'no wonder', context: 'No wonder you are tired, you didn\'t sleep.', grammar: 'Meaning: nem csoda' },
  { id: 185, category: 'Phrase', term: 'on the one hand', context: 'On the one hand, the city is beautiful...', grammar: 'Meaning: egyrészről...' },
  { id: 186, category: 'Phrase', term: 'on the other hand', context: '...on the other hand, it is very noisy.', grammar: 'Meaning: ...másrészről' },
  { id: 187, category: 'Phrase', term: 'supposed to', context: 'You are supposed to be at school now.', grammar: 'Meaning: kellene (elvárás)' },
  { id: 188, category: 'Phrase', term: 'tend to', context: 'People tend to eat more in winter.', grammar: 'Meaning: hajlamos vmire' },
  { id: 189, category: 'Phrase', term: 'used to (+ verb)', context: 'I used to play the piano when I was younger.', grammar: 'Meaning: valaha csinált vmit (már nem)' },
  { id: 190, category: 'Phrase', term: 'get used to', context: 'I can\'t get used to this cold weather.', grammar: 'Meaning: hozzászokik vmihez' },
  { id: 191, category: 'Phrasal Verb', term: 'put up with', context: 'I refuse to put up with his bad behavior.', grammar: 'Meaning: elvisel vmit' },
  { id: 192, category: 'Phrasal Verb', term: 'look down on', context: 'She looks down on people who have less money.', grammar: 'Meaning: lenéz vkit' },
  { id: 193, category: 'Phrasal Verb', term: 'look up to', context: 'I really look up to my older brother.', grammar: 'Meaning: felnéz vkire' },
  { id: 194, category: 'Phrasal Verb', term: 'run into', context: 'I ran into an old friend yesterday.', grammar: 'Meaning: véletlenül összefut vkivel' },
  { id: 195, category: 'Phrasal Verb', term: 'come up with', context: 'We must come up with a new idea.', grammar: 'Meaning: előáll (ötlettel)' },
  { id: 196, category: 'Phrasal Verb', term: 'cut down on', context: 'I am trying to cut down on sugar.', grammar: 'Meaning: csökkent (fogyasztást)' },
  { id: 197, category: 'Phrasal Verb', term: 'get over', context: 'It took him a year to get over his illness.', grammar: 'Meaning: túlteszi magát vmin' },
  { id: 198, category: 'Phrasal Verb', term: 'show off', context: 'He just bought a new car to show off.', grammar: 'Meaning: felvág, dicsekszik' },
  { id: 199, category: 'Phrasal Verb', term: 'take after', context: 'She really takes after her mother.', grammar: 'Meaning: hasonlít vkire (családban)' },
  { id: 200, category: 'Phrasal Verb', term: 'work out', context: 'I hope things will work out for you.', grammar: 'Meaning: megoldódik, sikerül' },
  { id: 201, category: 'Adjective + Prep', term: 'addicted to', context: 'He was addicted to video games.', grammar: 'Meaning: függő, rabja vminek' },
  { id: 202, category: 'Adjective + Prep', term: 'amazed at', context: 'I was amazed at the size of the building.', grammar: 'Meaning: lenyűgözött' },
  { id: 203, category: 'Adjective + Prep', term: 'amused by', context: 'The children were amused by the clown.', grammar: 'Meaning: szórakoztatja vmi' },
  { id: 204, category: 'Adjective + Prep', term: 'angry about', context: 'She is angry about the delay.', grammar: 'Meaning: mérges vmi miatt' },
  { id: 205, category: 'Adjective + Prep', term: 'eager to', context: 'Everyone was eager to start the game.', grammar: 'Meaning: buzgó, alig várja' },
  { id: 206, category: 'Adjective + Prep', term: 'familiar with', context: 'Are you familiar with this software?', grammar: 'Meaning: ismerős vmivel' },
  { id: 207, category: 'Adjective + Prep', term: 'fascinated by', context: 'He was fascinated by ancient history.', grammar: 'Meaning: lenyűgözött' },
  { id: 208, category: 'Adjective + Prep', term: 'fed up with', context: 'I am fed up with this rainy weather.', grammar: 'Meaning: elege van' },
  { id: 209, category: 'Adjective + Prep', term: 'friendly to', context: 'The locals were very friendly to us.', grammar: 'Meaning: barátságos vkivel' },
  { id: 210, category: 'Adjective + Prep', term: 'guilty of', context: 'He was found guilty of stealing.', grammar: 'Meaning: bűnös vmiben' },
  { id: 211, category: 'Adjective + Prep', term: 'happy with', context: 'I am very happy with my new phone.', grammar: 'Meaning: elégedett vmivel' },
  { id: 212, category: 'Adjective + Prep', term: 'immune to', context: 'This species is immune to the virus.', grammar: 'Meaning: immunis vmire' },
  { id: 213, category: 'Adjective + Prep', term: 'jealous of', context: 'She was jealous of her sister\'s success.', grammar: 'Meaning: féltékeny vkire' },
  { id: 214, category: 'Adjective + Prep', term: 'known as', context: 'He is known as the best doctor in town.', grammar: 'Meaning: ismert mint' },
  { id: 215, category: 'Adjective + Prep', term: 'necessary for', context: 'Water is necessary for life.', grammar: 'Meaning: szükséges vmihez' },
  { id: 216, category: 'Adjective + Prep', term: 'obsessed with', context: 'He is obsessed with martial arts.', grammar: 'Meaning: megszállottja vminek' },
  { id: 217, category: 'Adjective + Prep', term: 'patient with', context: 'You really need to be patient with children.', grammar: 'Meaning: türelmes vkivel' },
  { id: 218, category: 'Adjective + Prep', term: 'related to', context: 'Are you related to the manager?', grammar: 'Meaning: rokona vkinek / kapcsolódik' },
  { id: 219, category: 'Adjective + Prep', term: 'rich in', context: 'Oranges are rich in Vitamin C.', grammar: 'Meaning: gazdag vmiben' },
  { id: 220, category: 'Adjective + Prep', term: 'safe from', context: 'We are safe from the storm here.', grammar: 'Meaning: biztonságban vmitől' },
  { id: 221, category: 'Collocation', term: 'make a booking', context: 'There is no need to make a booking.', grammar: 'Meaning: foglalást csinál' },
  { id: 222, category: 'Collocation', term: 'make a call', context: 'I need a quiet place to make a call.', grammar: 'Meaning: telefonál' },
  { id: 223, category: 'Collocation', term: 'make a connection', context: 'He made a connection between the two events.', grammar: 'Meaning: kapcsolatot teremt' },
  { id: 224, category: 'Collocation', term: 'make a difference', context: 'Your donation can make a difference.', grammar: 'Meaning: számít, változást hoz' },
  { id: 225, category: 'Collocation', term: 'make a dream come true', context: 'She finally made her dream come true.', grammar: 'Meaning: valóra váltja az álmát' },
  { id: 226, category: 'Collocation', term: 'make a fool of', context: 'Don\'t make a fool of yourself.', grammar: 'Meaning: bolondot csinál magából/másból' },
  { id: 227, category: 'Collocation', term: 'make a good impression', context: 'Dress well to make a good impression.', grammar: 'Meaning: jó benyomást kelt' },
  { id: 228, category: 'Collocation', term: 'make a profit', context: 'The company made a huge profit this year.', grammar: 'Meaning: nyereséget termel' },
  { id: 229, category: 'Collocation', term: 'make a request', context: 'Our librarians will make a request for you.', grammar: 'Meaning: kérést tesz' },
  { id: 230, category: 'Collocation', term: 'make a suggestion', context: 'Can I make a suggestion?', grammar: 'Meaning: javaslatot tesz' },
  { id: 231, category: 'Collocation', term: 'make amends', context: 'He bought flowers to make amends.', grammar: 'Meaning: jóvátesz, kárpótol' },
  { id: 232, category: 'Collocation', term: 'make an appointment', context: 'I need to make an appointment with the doctor.', grammar: 'Meaning: időpontot kér' },
  { id: 233, category: 'Collocation', term: 'make it happen', context: 'Find out what you want and make it happen.', grammar: 'Meaning: megvalósít' },
  { id: 234, category: 'Collocation', term: 'make notes', context: 'I use a notebook to make notes during class.', grammar: 'Meaning: jegyzetel' },
  { id: 235, category: 'Collocation', term: 'make progress', context: 'The student is making excellent progress.', grammar: 'Meaning: halad, fejlődik' },
  { id: 236, category: 'Collocation', term: 'do a course', context: 'She is doing a language course in London.', grammar: 'Meaning: elvégez egy tanfolyamot' },
  { id: 237, category: 'Collocation', term: 'do charity work', context: 'I decided to take a gap year and do charity work.', grammar: 'Meaning: jótékonysági munkát végez' },
  { id: 238, category: 'Collocation', term: 'do exercise', context: 'Healthy eating is as important as doing exercise.', grammar: 'Meaning: testmozgást végez' },
  { id: 239, category: 'Collocation', term: 'do for a living', context: 'What do you do for a living?', grammar: 'Meaning: miből él (mi a munkája)' },
  { id: 240, category: 'Collocation', term: 'do research', context: 'Scientists do research in the laboratory.', grammar: 'Meaning: kutatást végez' },
  { id: 241, category: 'Phrasal Verb', term: 'add up', context: 'Pet food and license fees can really add up.', grammar: 'Meaning: összeadódik, sokra rúg' },
  { id: 242, category: 'Phrasal Verb', term: 'back down', context: 'The company refused to back down.', grammar: 'Meaning: meghátrál' },
  { id: 243, category: 'Phrasal Verb', term: 'break into', context: 'Burglars broke into the house at night.', grammar: 'Meaning: betör vhova' },
  { id: 244, category: 'Phrasal Verb', term: 'bring out', context: 'They will bring out a new model next year.', grammar: 'Meaning: kihoz, piacra dob' },
  { id: 245, category: 'Phrasal Verb', term: 'burn up', context: 'The meteor will burn up in the atmosphere.', grammar: 'Meaning: elég' },
  { id: 246, category: 'Phrasal Verb', term: 'burst into', context: 'The police burst into the apartment.', grammar: 'Meaning: beront' },
  { id: 247, category: 'Phrasal Verb', term: 'carry out', context: 'Engineers will carry out an inspection.', grammar: 'Meaning: végrehajt, elvégez' },
  { id: 248, category: 'Phrasal Verb', term: 'chill out', context: 'We just want to chill out on the weekend.', grammar: 'Meaning: lazít, kikapcsol' },
  { id: 249, category: 'Phrasal Verb', term: 'draw up', context: 'We drew up a list of guests for the party.', grammar: 'Meaning: felír, megfogalmaz, összeállít' },
  { id: 250, category: 'Phrasal Verb', term: 'dress up', context: 'We dressed up for the wedding.', grammar: 'Meaning: kiöltözik' },
  { id: 251, category: 'Phrasal Verb', term: 'end up', context: 'If you don\'t study, you will end up failing.', grammar: 'Meaning: kiköt vhol (eredményképp)' },
  { id: 252, category: 'Phrasal Verb', term: 'fall in love with', context: 'Romeo fell in love with Juliet instantly.', grammar: 'Meaning: beleszeret vkibe' },
  { id: 253, category: 'Phrasal Verb', term: 'fill out', context: 'Please fill out this application form.', grammar: 'Meaning: kitölt (nyomtatványt)' },
  { id: 254, category: 'Phrasal Verb', term: 'frighten off', context: 'The loud noise frightened off the birds.', grammar: 'Meaning: elijeszt' },
  { id: 255, category: 'Phrasal Verb', term: 'get away with', context: 'He lied, but he got away with it.', grammar: 'Meaning: megúszik vmit' },
  { id: 256, category: 'Phrasal Verb', term: 'get off', context: 'We need to get off the bus at the next stop.', grammar: 'Meaning: leszáll (járműről)' },
  { id: 257, category: 'Phrasal Verb', term: 'hang out', context: 'Teenagers love to hang out in the mall.', grammar: 'Meaning: lóg vkivel, időt tölt' },
  { id: 258, category: 'Phrasal Verb', term: 'head out', context: 'We will head out towards the mountains.', grammar: 'Meaning: elindul vhova' },
  { id: 259, category: 'Phrasal Verb', term: 'knock out', context: 'The boxer knocked out his opponent.', grammar: 'Meaning: kiüt' },
  { id: 260, category: 'Phrasal Verb', term: 'point out', context: 'The guide pointed out the famous volcano.', grammar: 'Meaning: rámutat, felhívja a figyelmet' },
  { id: 261, category: 'Phrasal Verb', term: 'pull up', context: 'A black car pulled up next to me.', grammar: 'Meaning: félreáll, megáll (jármű)' },
  { id: 262, category: 'Phrasal Verb', term: 'rent out', context: 'They rent out their apartment to tourists.', grammar: 'Meaning: bérbe ad' },
  { id: 263, category: 'Phrasal Verb', term: 'run away', context: 'The dog ran away from the loud fireworks.', grammar: 'Meaning: elfut, megszökik' },
  { id: 264, category: 'Phrasal Verb', term: 'save up', context: 'I am saving up for a new laptop.', grammar: 'Meaning: spórol (vmire)' },
  { id: 265, category: 'Phrasal Verb', term: 'sell out', context: 'The concert tickets will sell out quickly.', grammar: 'Meaning: kiárusít, elfogy' },
  { id: 266, category: 'Verb + Prep', term: 'accuse of', context: 'He was accused of stealing the money.', grammar: 'Meaning: vádol vmivel' },
  { id: 267, category: 'Verb + Prep', term: 'agree to', context: 'He agreed to put the painting on display.', grammar: 'Meaning: beleegyezik vmibe' },
  { id: 268, category: 'Verb + Prep', term: 'argue about', context: 'We rarely argue about money.', grammar: 'Meaning: vitatkozik vmiről' },
  { id: 269, category: 'Verb + Prep', term: 'arrive at/in', context: 'We will arrive in London at 6 PM.', grammar: 'Meaning: megérkezik' },
  { id: 270, category: 'Verb + Prep', term: 'associate with', context: 'Big Ben is associated with London.', grammar: 'Meaning: társít vmivel' },
  { id: 271, category: 'Verb + Prep', term: 'choose from', context: 'There are thirty flavors to choose from.', grammar: 'Meaning: választ vmiből' },
  { id: 272, category: 'Verb + Prep', term: 'clash with', context: 'The protesters clashed with the police.', grammar: 'Meaning: összecsap vkivel/vmivel' },
  { id: 273, category: 'Verb + Prep', term: 'commute from/to', context: 'He commutes from the coast to London daily.', grammar: 'Meaning: ingázik' },
  { id: 274, category: 'Verb + Prep', term: 'compete against', context: 'He competes against the best surfers.', grammar: 'Meaning: versenyez vkivel' },
  { id: 275, category: 'Verb + Prep', term: 'contribute to', context: 'This charity contributes to saving animals.', grammar: 'Meaning: hozzájárul vmihez' },
  { id: 276, category: 'Verb + Prep', term: 'converge on', context: 'Thousands converged on the city center.', grammar: 'Meaning: összefut, összegyűlik' },
  { id: 277, category: 'Verb + Prep', term: 'cope with', context: 'She can easily cope with stress.', grammar: 'Meaning: megbirkózik vmivel' },
  { id: 278, category: 'Verb + Prep', term: 'crash through', context: 'A meteorite crashed through the roof.', grammar: 'Meaning: áttör vmin, beszakít' },
  { id: 279, category: 'Verb + Prep', term: 'die of', context: 'Sadly, many people still die of disease.', grammar: 'Meaning: meghal vmiben' },
  { id: 280, category: 'Verb + Prep', term: 'evolve into', context: 'Dinosaurs eventually evolved into birds.', grammar: 'Meaning: átalakul, fejlődik vmivé' },
  { id: 281, category: 'Uncountable Noun', term: 'accommodation', context: 'We are looking for cheap accommodation.', grammar: 'Meaning: szállás' },
  { id: 282, category: 'Uncountable Noun', term: 'advice', context: 'Let me give you some advice.', grammar: 'Meaning: tanács' },
  { id: 283, category: 'Uncountable Noun', term: 'cash', context: 'There is nothing quite as useful as cash.', grammar: 'Meaning: készpénz' },
  { id: 284, category: 'Uncountable Noun', term: 'clothing', context: 'They left behind clothing and jewellery.', grammar: 'Meaning: ruházat' },
  { id: 285, category: 'Uncountable Noun', term: 'curiosity', context: 'Curiosity struck and he opened the box.', grammar: 'Meaning: kíváncsiság' },
  { id: 286, category: 'Uncountable Noun', term: 'dignity', context: 'That day, the teacher saved my dignity.', grammar: 'Meaning: méltóság' },
  { id: 287, category: 'Uncountable Noun', term: 'discipline', context: 'Martial arts teaches you discipline.', grammar: 'Meaning: fegyelem' },
  { id: 288, category: 'Uncountable Noun', term: 'education', context: 'Getting more education increases your ability.', grammar: 'Meaning: oktatás' },
  { id: 289, category: 'Uncountable Noun', term: 'equipment', context: 'This piece of equipment is very valuable.', grammar: 'Meaning: felszerelés' },
  { id: 290, category: 'Uncountable Noun', term: 'experience', context: 'His lack of experience did not slow him down.', grammar: 'Meaning: tapasztalat' },
  { id: 291, category: 'Uncountable Noun', term: 'feedback', context: 'We need faster feedback about performance.', grammar: 'Meaning: visszajelzés' },
  { id: 292, category: 'Uncountable Noun', term: 'fraud', context: 'He was sentenced to prison for fraud.', grammar: 'Meaning: csalás' },
  { id: 293, category: 'Uncountable Noun', term: 'furniture', context: 'Building pieces of furniture is fun.', grammar: 'Meaning: bútor' },
  { id: 294, category: 'Uncountable Noun', term: 'honesty', context: 'The game teaches discipline and honesty.', grammar: 'Meaning: őszinteség' },
  { id: 295, category: 'Uncountable Noun', term: 'information', context: 'Call us if you require further information.', grammar: 'Meaning: információ' },
  { id: 296, category: 'Uncountable Noun', term: 'insurance', context: 'The ticket price includes insurance.', grammar: 'Meaning: biztosítás' },
  { id: 297, category: 'Uncountable Noun', term: 'knowledge', context: 'Schools must spread knowledge.', grammar: 'Meaning: tudás' },
  { id: 298, category: 'Uncountable Noun', term: 'luck', context: 'The examiner wished the students good luck.', grammar: 'Meaning: szerencse' },
  { id: 299, category: 'Uncountable Noun', term: 'progress', context: 'I feel I am not making any progress.', grammar: 'Meaning: haladás, fejlődik' },
  { id: 300, category: 'Uncountable Noun', term: 'scenery', context: 'The route takes you into typical beautiful scenery.', grammar: 'Meaning: táj, látvány' }
];

// --- UTILITY: Flashcard Progress Tracking ---
const getFcProgress = () => {
  try {
    const saved = localStorage.getItem('maturaFcProgress');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

const updateFcStatus = (id, status) => {
  const prog = getFcProgress();
  prog[id] = status;
  try {
    localStorage.setItem('maturaFcProgress', JSON.stringify(prog));
  } catch (e) {}
};
// --------------------------------------------

const tasksDatabase = {
  reading: [
    {
      id: 'r1',
      title: 'Reading: A Lucky Survival',
      instructions: 'Read the short text and choose the best answer (A, B, C, or D) for each question.',
      text: `Ava was a passionate paraglider. One day, during a flight, she was caught in a massive storm that pulled her up to almost 10,000 metres—higher than Mount Everest! At that incredible height, the temperature dropped to -40°C, and there was very little oxygen in the air. Ava quickly lost consciousness. Her body and her paraglider became completely covered in heavy ice, which caused her to fall rapidly from the sky. \n\nMiraculously, as she fell into warmer air, the ice melted just enough for her emergency parachute to open automatically. The wings came out and stopped her freefall. She eventually landed safely about 60 kilometres from her starting point. Using her GPS devices, her team located her quickly. Apart from some mild frostbite, she suffered no serious injuries and was flying again within weeks. Experts called her survival "like winning the lottery ten times in a row."`,
      questions: [
        { id: 'q1', text: '1. What caused Ava to go so high up in the sky?', options: ['A) She wanted to break a world altitude record.', 'B) A strong storm pulled her upwards.', 'C) Her team directed her there by mistake.', 'D) She used a special motor to fly higher.'], correct: 'B) A strong storm pulled her upwards.', explanation: 'The text specifically states she was "caught in a massive storm that pulled her up".', tip: 'Exam Tip: Always look for synonyms in the text. "Caught in a storm" matches the idea in option B.' },
        { id: 'q2', text: '2. Why did Ava start falling rapidly?', options: ['A) She forgot how to steer the paraglider.', 'B) The paraglider was damaged by lightning.', 'C) The extra weight of the ice pulled her down.', 'D) She wanted to land as quickly as possible.'], correct: 'C) The extra weight of the ice pulled her down.', explanation: 'The text says her paraglider became "covered in heavy ice, which caused her to fall rapidly".', tip: 'Exam Tip: Read the sentence immediately before the result to find the cause.' },
        { id: 'q3', text: '3. How did her team know where to find her?', options: ['A) They saw her parachute open from the ground.', 'B) She used her electronic devices to contact them.', 'C) A local farmer called them on the phone.', 'D) They guessed her location based on the wind.'], correct: 'B) She used her electronic devices to contact them.', explanation: 'The text mentions "Using her GPS devices, her team located her quickly."', tip: 'Exam Tip: Do not use your own background knowledge; only rely on what is written in the text.' }
      ]
    },
    {
      id: 'r2',
      title: 'Reading: The Dream Job',
      instructions: 'Read the text about a unique job and choose the best answer.',
      text: `A company named Hush Hush is looking to hire someone whose job is nothing else but to test the quality of yachts and check that they meet high standards, said Aaron Harpin, the founder of the company. You'll spend one week on a yacht and then write a detailed report of everything you find. You'll live, sleep, eat, and shower on a luxury yacht, testing anything and everything on the boat, including every bed, door, shower, or any electrical equipment.\n\nAll you need to qualify for this position is to be at least 21 years old and own a passport. It's also quite important that you should have an extremely flexible timetable, as the company might be sending you all over the world to test the next ship at any time. The lucky applicant could potentially be testing up to 50 yachts every year, which means they could earn up to $65,000 a year for their work.`,
      questions: [
        { id: 'q1', text: '1. What is the main responsibility of the person hired?', options: ['A) To clean the luxury yachts.', 'B) To sell the yachts to rich clients.', 'C) To check the quality of everything on board.', 'D) To design new electrical equipment.'], correct: 'C) To check the quality of everything on board.', explanation: 'The text says the job is to "test the quality of yachts" and "write a detailed report of everything you find."', tip: 'Exam Tip: Read the first paragraph carefully as it usually contains the main idea of the text.' },
        { id: 'q2', text: '2. Which of the following is a strict requirement for the job?', options: ['A) Previous experience with boats.', 'B) A university degree in engineering.', 'C) Being under 21 years old.', 'D) Having a flexible schedule.'], correct: 'D) Having a flexible schedule.', explanation: 'The text states: "It\'s also quite important that you should have an extremely flexible timetable".', tip: 'Exam Tip: Watch out for opposites in the options! Option C says "under 21", but the text says "at least 21".' },
        { id: 'q3', text: '3. How much can the tester earn per year?', options: ['A) Exactly $1,300.', 'B) Up to $65,000.', 'C) Over $100,000.', 'D) The text doesn\'t mention annual pay.'], correct: 'B) Up to $65,000.', explanation: 'The final paragraph states they "could earn up to $65,000 a year for their work."', tip: 'Exam Tip: When answering number/money questions, make sure you match the timeframe (per week vs per year).' }
      ]
    },
    {
      id: 'r3',
      title: 'Reading: Working with Dinosaurs',
      instructions: 'Read the interview with an actress and answer the questions.',
      text: `Interviewer: Young actors in Steven Spielberg's films are usually very good. Do you know the secret?\nActress: Steven is very good at choosing actors, and I think he chooses actors that bring the kind of natural quality to their roles that he wants to see. Steven allowed me to be absolutely natural and directed me without actually directing me.\nInterviewer: What about the dinosaurs in the film? Were they actually there, or did you have to imagine them?\nActress: I would say about 80% of the time the dinosaurs were actually present, and only the rest of the dinosaur scenes were computer-generated. The dinosaurs were absolutely lifelike. I got the chance to actually feel them as if they were real. In fact, when the T-Rex was crashing down on the jeep, it really was!\nInterviewer: Were you excited about dinosaurs before making Jurassic Park?\nActress: Doing the film was what got me interested in dinosaurs. At the end of the filming, the technical advisor invited me to dig for dinosaur bones in Montana.`,
      questions: [
        { id: 'q1', text: '1. Why does Spielberg’s directing style work well for young actors?', options: ['A) He sends them to expensive acting schools.', 'B) He allows them to act naturally.', 'C) He gives them very strict instructions.', 'D) He rewrites the script for them.'], correct: 'B) He allows them to act naturally.', explanation: 'The actress mentions that he "allowed me to be absolutely natural".', tip: 'Exam Tip: Always read the response immediately following the interviewer\'s question.' },
        { id: 'q2', text: '2. How were the dinosaur scenes filmed?', options: ['A) They were 100% computer-generated.', 'B) The actors had to imagine all of them.', 'C) Most of the dinosaurs were physically there.', 'D) They used real, living animals.'], correct: 'C) Most of the dinosaurs were physically there.', explanation: 'The actress says "about 80% of the time the dinosaurs were actually present".', tip: 'Exam Tip: Pay attention to percentages and quantifiers (like "80%" -> "Most").' },
        { id: 'q3', text: '3. What happened after the movie was finished?', options: ['A) The actress bought a dinosaur skeleton.', 'B) She went to search for real dinosaur fossils.', 'C) She studied to become a director.', 'D) She lost her interest in dinosaurs.'], correct: 'B) She went to search for real dinosaur fossils.', explanation: 'She states that the advisor "invited me to dig for dinosaur bones in Montana."', tip: 'Exam Tip: Match the chronological order in the text ("At the end of the filming...") to the question ("after the movie was finished").' }
      ]
    },
    {
      id: 'r4',
      title: 'Reading: A Priceless Gift',
      instructions: 'Read the text and choose the best answer (A, B, or C).',
      text: "When Sandy Greenberg suddenly went blind at college, his best friend Art Garfunkel refused to allow him to give up on life. Art convinced Sandy to give college another go and promised that he would be right by his side and be his eyes. Art kept his promise. He organized his life around helping Sandy and went with him everywhere. He even started calling himself 'Darkness' to show empathy.\n\nOne day, Art was guiding Sandy through crowded Grand Central Station when he suddenly said he had to go, leaving his friend alone. Sandy stumbled and fell, but eventually found his way onto the right subway train. When he got off, he bumped into someone who apologized—it was Art! He had followed Sandy the whole way to make sure he was safe, giving him the priceless gift of independence.",
      questions: [
        { id: 'q1', text: '1. What did Art Garfunkel do when Sandy went blind?', options: ['A) He left college.', 'B) He promised to help Sandy continue his studies.', 'C) He found a doctor for him.'], correct: 'B) He promised to help Sandy continue his studies.', explanation: 'The text says Art "convinced Sandy to give college another go and promised that he would be right by his side".', tip: 'Exam Tip: "Give college another go" is a synonym phrase for continuing his studies.' },
        { id: 'q2', text: '2. Why did Art call himself "Darkness"?', options: ['A) It was his favourite song.', 'B) He wanted to show he understood Sandy\'s situation.', 'C) He only went out at night.'], correct: 'B) He wanted to show he understood Sandy\'s situation.', explanation: 'The text explicitly states he called himself Darkness "to show empathy".', tip: 'Exam Tip: Vocabulary in context is key. "Empathy" means understanding and sharing another person\'s feelings.' },
        { id: 'q3', text: '3. Why did Art leave Sandy alone at the station?', options: ['A) He had an urgent appointment.', 'B) He was angry with him.', 'C) He wanted to teach Sandy how to be independent.'], correct: 'C) He wanted to teach Sandy how to be independent.', explanation: 'The text concludes that Art followed him safely to give him "the priceless gift of independence".', tip: 'Exam Tip: Sometimes the answer to a question in the middle of a story is found at the very end.' }
      ]
    },
    {
      id: 'r5',
      title: 'Reading: Old Photographs',
      instructions: 'Read the text and choose the best answer (A, B, or C).',
      text: "If you look at old photographs from the 19th century, you will notice that nobody is smiling. There are a few reasons for this. First, early cameras needed a very long time to take a picture. The exposure time could be several minutes! It is almost impossible to hold a natural smile for that long without moving, so people just kept a relaxed, serious face.\n\nSecond, dental care was very poor back then. Many people had missing or ruined teeth and did not want to show them in a permanent picture. Finally, getting a photograph taken was an expensive, rare event, much like having an oil painting made. People wanted to look serious and respectable for future generations.",
      questions: [
        { id: 'q1', text: '1. How did camera technology affect people\'s expressions?', options: ['A) The flashes were too bright to keep eyes open.', 'B) They had to sit perfectly still for a long time.', 'C) The cameras could not capture smiles clearly.'], correct: 'B) They had to sit perfectly still for a long time.', explanation: 'The text notes that exposure time was "several minutes" and holding a smile that long without moving is "almost impossible".', tip: 'Exam Tip: Look for cause and effect linking words like "so" to find explanations in texts.' },
        { id: 'q2', text: '2. What role did dentistry play in old photographs?', options: ['A) Dentists used photos to examine teeth.', 'B) People hid their bad teeth by keeping their mouths closed.', 'C) Only wealthy people with good teeth were photographed.'], correct: 'B) People hid their bad teeth by keeping their mouths closed.', explanation: 'The text explains people had ruined teeth and "did not want to show them in a permanent picture".', tip: 'Exam Tip: Always rule out answers that bring in outside logic not mentioned in the text (like option A or C).' },
        { id: 'q3', text: '3. How did people view the experience of getting a photograph taken?', options: ['A) As a funny, everyday activity.', 'B) As an important and formal occasion.', 'C) As a cheap way to make memories.'], correct: 'B) As an important and formal occasion.', explanation: 'Taking a picture was an "expensive, rare event" where people wanted to look "respectable".', tip: 'Exam Tip: Synonyms are your best friend! "Serious and respectable" matches the idea of an "important and formal" occasion.' }
      ]
    },
    {
      id: 'r6',
      title: 'Reading: The Sun Queen',
      instructions: 'Read the text and choose the best answer (A, B, or C).',
      text: "Maria Telkes was a Hungarian-American scientist and inventor who worked on solar energy technologies. She is often called the 'Sun Queen' for her amazing work. Born in Budapest in 1900, she moved to the United States after finishing her studies.\n\nDuring World War II, she invented a miniature solar desalination kit for the military. This device used the sun's heat to remove salt from seawater, saving the lives of sailors and pilots who were stranded on the ocean without drinking water. Later, in 1948, she designed the heating system for the first solar-heated home in Massachusetts. Her inventions proved that the sun could be used for everyday practical purposes.",
      questions: [
        { id: 'q1', text: '1. Where did Maria Telkes grow up?', options: ['A) In the United States.', 'B) In Massachusetts.', 'C) In Hungary.'], correct: 'C) In Hungary.', explanation: 'The text mentions she was "Born in Budapest" and moved to the US "after finishing her studies".', tip: 'Exam Tip: Pay attention to timelines. She moved to the US later in life, so she grew up in Hungary.' },
        { id: 'q2', text: '2. How did her invention help soldiers during WWII?', options: ['A) It provided them with clean drinking water.', 'B) It gave them solar-powered radios.', 'C) It heated their tents.'], correct: 'A) It provided them with clean drinking water.', explanation: 'Her desalination kit removed salt from seawater, helping stranded sailors "without drinking water".', tip: 'Exam Tip: If you don\'t know a word like "desalination", read the sentence after it. The text usually explains difficult words!' },
        { id: 'q3', text: '3. What was special about the house she worked on in 1948?', options: ['A) It was built entirely of glass.', 'B) It was the first house heated by solar energy.', 'C) It was a floating house on the ocean.'], correct: 'B) It was the first house heated by solar energy.', explanation: 'The text explicitly states she designed the heating system for "the first solar-heated home".', tip: 'Exam Tip: Look for absolute words like "first", "only", or "best" in the text to match with the questions.' }
      ]
    },
    {
      id: 'r7',
      title: 'Reading: The Bamboo House',
      instructions: 'Read the text about an eco-friendly invention and choose the best answer (A, B, or C).',
      text: "Earl Forlales, a 23-year-old engineering graduate, has won a £50,000 prize for designing a unique house made of bamboo. The house, which is known as 'Cubo', was awarded first prize by the Royal Institute of Surveyors in a competition to develop cities for the future.\n\nThe judges decided to give the top prize to the Cubo house because of its use of low-cost, eco-friendly material. Furthermore, the speed with which it could be constructed was incredibly impressive. The house can be manufactured in a week and built on-site in less than a day! Earl hopes that this invention will help solve the severe housing problems in crowded cities like Manila.",
      questions: [
        { id: 'q1', text: '1. What is the primary building material of the Cubo house?', options: ['A) Recycled plastic.', 'B) Bamboo.', 'C) Low-cost wood.'], correct: 'B) Bamboo.', explanation: 'The text states Earl won a prize for "designing a unique house made of bamboo."', tip: 'Exam Tip: The answer is often right in the first sentence. Scan for keywords from the question.' },
        { id: 'q2', text: '2. Why did the judges select the Cubo house as the winner?', options: ['A) Because it looks like a traditional palace.', 'B) Because it is environmentally friendly and fast to build.', 'C) Because it was the most expensive project.'], correct: 'B) Because it is environmentally friendly and fast to build.', explanation: 'The judges chose it for its "eco-friendly material" and the "speed with which it could be constructed".', tip: 'Exam Tip: Look for combinations of adjectives (low-cost, eco-friendly, fast) to match the options.' },
        { id: 'q3', text: '3. What major problem does this invention attempt to solve?', options: ['A) A lack of housing in crowded cities.', 'B) Too much bamboo growing in forests.', 'C) A shortage of engineering jobs.'], correct: 'A) A lack of housing in crowded cities.', explanation: 'Earl hopes it will help solve the "severe housing problems in crowded cities like Manila".', tip: 'Exam Tip: Be careful not to use your own logic. Always find the specific evidence in the paragraph.' }
      ]
    },
    {
      id: 'r8',
      title: 'Reading: Hawking on Space Travel',
      instructions: 'Read the text about Stephen Hawking and choose the best answer (A, B, or C).',
      text: "In the afterword of a book about making spaceships, the famous scientist Stephen Hawking explained why he enthusiastically accepted an offer to travel to space. 'I have no fear of adventure,' he wrote. 'Years ago, I travelled down the steepest hills of San Francisco in my wheelchair. I travel widely and have even been to Antarctica.'\n\nHawking believed that humanity desperately needs a new generation of astronauts to explore our solar system. He felt that these first private astronauts will be pioneers who will change the world for good. 'It is my belief that there is no limit to human effort,' he stated. His final advice to the readers was simple: 'Remember to look up at the stars and not down at your feet.'",
      questions: [
        { id: 'q1', text: '1. How did Stephen Hawking feel about adventure?', options: ['A) He was terrified of it.', 'B) He thought it was only for young people.', 'C) He was not afraid of it at all.'], correct: 'C) He was not afraid of it at all.', explanation: 'Hawking explicitly wrote, "I have no fear of adventure."', tip: 'Exam Tip: "No fear" is perfectly paraphrased as "not afraid of it at all".' },
        { id: 'q2', text: '2. Where is one of the extreme places he visited on Earth?', options: ['A) The Moon.', 'B) Antarctica.', 'C) The Sahara Desert.'], correct: 'B) Antarctica.', explanation: 'He mentions that he travels widely and has "even been to Antarctica".', tip: 'Exam Tip: Only choose information directly mentioned in the text, even if other options sound plausible.' },
        { id: 'q3', text: '3. What is his main advice to people?', options: ['A) To build their own spaceships.', 'B) To look up at the stars.', 'C) To stay safe at home.'], correct: 'B) To look up at the stars.', explanation: 'His final advice was: "Remember to look up at the stars and not down at your feet."', tip: 'Exam Tip: Quotes in the text are very often the source of correct answers.' }
      ]
    },
    {
      id: 'r9',
      title: 'Reading: The Honest Finder',
      instructions: 'Read the story about a lost bag and choose the best answer (A, B, or C).',
      text: "An elderly gentleman was doing his weekly shopping in a supermarket in Batley. After he finished and walked out into the street, he suddenly realized that his small black bag was missing! The bag contained his wallet, cash, and several important personal items. He was absolutely devastated.\n\nHe quickly returned to the store and reported it to the customer service desk. Miraculously, a kind customer had found the bag sitting in a shopping trolley in the car park and handed it to the manager. When the gentleman checked his bag, not a single penny was missing! He was so relieved that he wrote a public letter to the local newspaper to thank the honest stranger who saved his day.",
      questions: [
        { id: 'q1', text: '1. Where was the man when he realized his bag was missing?', options: ['A) Inside the supermarket.', 'B) Out in the street.', 'C) At the police station.'], correct: 'B) Out in the street.', explanation: 'The text says: "After he finished and walked out into the street, he suddenly realized that his small black bag was missing!"', tip: 'Exam Tip: Read carefully! The event (losing it) happened in the shop, but the realization happened in the street.' },
        { id: 'q2', text: '2. Who found the lost bag?', options: ['A) The supermarket manager.', 'B) The man\'s uncle.', 'C) A kind customer.'], correct: 'C) A kind customer.', explanation: 'The text states that "a kind customer had found the bag sitting in a shopping trolley".', tip: 'Exam Tip: Distinguish between who *found* the bag and who it was *handed to*.' },
        { id: 'q3', text: '3. How did the man express his gratitude?', options: ['A) He bought a gift for the manager.', 'B) He wrote a letter to the local newspaper.', 'C) He gave the finder a cash reward.'], correct: 'B) He wrote a letter to the local newspaper.', explanation: 'He was so relieved that he "wrote a public letter to the local newspaper to thank the honest stranger".', tip: 'Exam Tip: Look for actions taken after the main problem is resolved.' }
      ]
    },
    {
      id: 'r10',
      title: 'Reading: Football at the Palace',
      instructions: 'Read the article and choose the best answer (A, B, or C).',
      text: "Buckingham Palace hosted its first-ever official football match. Prince William helped organize the event between two of England's oldest amateur clubs to celebrate the 150th anniversary of the Football Association (FA). The Queen gave her permission for the match to take place in the palace gardens.\n\nThe grass was cut specially by the royal gardeners to make it perfect for the game. Prince William, who is the president of the FA, even played a small part in the match himself, much to the excitement of the crowd. It was a historic day for both the monarchy and English football.",
      questions: [
        { id: 'q1', text: '1. What special event was being celebrated?', options: ['A) The FA\'s 150th anniversary.', 'B) The Queen\'s birthday.', 'C) Prince William\'s graduation.'], correct: 'A) The FA\'s 150th anniversary.', explanation: 'The text states the match was organized "to celebrate the 150th anniversary of the Football Association (FA)."', tip: 'Exam Tip: Scan the text for numbers and capital letters to quickly locate specific information.' },
        { id: 'q2', text: '2. Who gave permission for the game to be played at the palace?', options: ['A) The royal gardeners.', 'B) The Queen.', 'C) The FA.'], correct: 'B) The Queen.', explanation: 'It clearly says, "The Queen gave her permission for the match to take place in the palace gardens."', tip: 'Exam Tip: Ensure you identify the subject performing the action in the sentence.' },
        { id: 'q3', text: '3. What did the royal gardeners do?', options: ['A) Played in the match.', 'B) Planted new flowers.', 'C) Prepared the grass.'], correct: 'C) Prepared the grass.', explanation: 'The text mentions, "The grass was cut specially by the royal gardeners to make it perfect for the game."', tip: 'Exam Tip: "Cut the grass" is a synonym for "prepared the grass" in this context.' }
      ]
    },
    {
      id: 'r11',
      title: 'Reading: Top Tips for Gaming',
      instructions: 'Read the text about online safety and choose the best answer (A, B, or C).',
      text: "Gaming is incredibly popular among young people, whether on mobile devices or consoles. To play safely, it's crucial to check age ratings. Look for the icon on the game that shows its age classification. Also, never share identifying details like your full name, phone number, or address, as this puts you at risk.\n\nFinally, to avoid being hacked, pick a strong password containing a combination of letters, numbers, and symbols. Treat your password like your toothbrush: you shouldn't share it with anyone else.",
      questions: [
        { id: 'q1', text: '1. How can players check if a game is appropriate for them?', options: ['A) By looking at the age rating icon.', 'B) By asking other players.', 'C) By reading the game\'s manual.'], correct: 'A) By looking at the age rating icon.', explanation: 'The text advises: "Look for the icon on the game that shows its age classification."', tip: 'Exam Tip: "Classification" is a formal synonym for "rating".' },
        { id: 'q2', text: '2. Why should players keep their personal details hidden?', options: ['A) To avoid paying extra fees.', 'B) To protect themselves from risks.', 'C) To win the game faster.'], correct: 'B) To protect themselves from risks.', explanation: 'The text warns that sharing identifying details "puts you at risk."', tip: 'Exam Tip: Read the entire sentence to understand the consequence of an action.' },
        { id: 'q3', text: '3. What is the advice regarding passwords?', options: ['A) Change them every day.', 'B) Share them only with close friends.', 'C) Make them strong and keep them secret.'], correct: 'C) Make them strong and keep them secret.', explanation: 'The text says to "pick a strong password" and "you shouldn\'t share it with anyone else."', tip: 'Exam Tip: Similes (like the toothbrush comparison) are often used in texts to highlight important advice.' }
      ]
    },
    {
      id: 'r12',
      title: 'Reading: City Academy Arts Courses',
      instructions: 'Read the FAQ and choose the best answer (A, B, or C).',
      text: "City Academy offers a variety of arts courses designed for adults. Anyone over the age of 18 is welcome to join our community. Unfortunately, you cannot just sit in and watch a normal class for free before booking, but we do offer special taster sessions for those who want to see if a course is right for them.\n\nIf you cannot attend a scheduled class, please let Student Services know as soon as possible. We will get in touch with your tutor and pass on any relevant homework for your next class, ensuring you don't fall behind.",
      questions: [
        { id: 'q1', text: '1. Who can participate in City Academy\'s courses?', options: ['A) Only teenagers.', 'B) Adults over 18.', 'C) Professional artists.'], correct: 'B) Adults over 18.', explanation: 'The text clearly states, "Anyone over the age of 18 is welcome to join".', tip: 'Exam Tip: Always double-check numbers and ages in the text against the options.' },
        { id: 'q2', text: '2. What can you do if you are unsure about a course?', options: ['A) Try a taster session.', 'B) Watch a normal class for free.', 'C) Talk to the previous students.'], correct: 'A) Try a taster session.', explanation: 'The text says they "offer special taster sessions for those who want to see if a course is right for them."', tip: 'Exam Tip: Watch out for distractors! The text mentions watching a normal class, but explicitly says you CANNOT do that.' },
        { id: 'q3', text: '3. What happens if a student misses a class?', options: ['A) They get a refund.', 'B) They must leave the course.', 'C) Student Services provides them with homework.'], correct: 'C) Student Services provides them with homework.', explanation: 'If you miss a class, Student Services will "pass on any relevant homework for your next class".', tip: 'Exam Tip: Look for conditional phrases ("If you cannot attend...") to find answers about rules or procedures.' }
      ]
    },
    {
      id: 'r13',
      title: 'Reading: Coping with Colds',
      instructions: 'Read the text and choose the best answer (A, B, or C).',
      text: "Despite being a minor illness, a common cold can make you feel absolutely miserable. A cold is, in fact, an infection which can affect the nose, throat, or sinuses. The most common symptoms are a blocked nose, a sore throat, and frequent sneezing.\n\nFortunately, there are several things you can do at home to feel better. Medical professionals highly recommend resting, drinking plenty of water, and keeping your room warm. You should also try to eat healthy foods, especially those rich in Vitamin C, like oranges and kiwis. Remember, antibiotics will not cure a cold because it is caused by a virus, not bacteria.",
      questions: [
        { id: 'q1', text: '1. What parts of the body does a cold typically affect?', options: ['A) The nose and throat.', 'B) The lungs.', 'C) The stomach.'], correct: 'A) The nose and throat.', explanation: 'The text states that a cold can "affect the nose, throat, or sinuses".', tip: 'Exam Tip: Scan for lists in the text when a question asks for examples or parts.' },
        { id: 'q2', text: '2. What is recommended for someone suffering from a cold?', options: ['A) Taking antibiotics.', 'B) Resting and drinking water.', 'C) Doing light exercise.'], correct: 'B) Resting and drinking water.', explanation: 'Professionals "highly recommend resting, drinking plenty of water".', tip: 'Exam Tip: Be careful with options that represent common misconceptions if they contradict the text (like taking antibiotics).' },
        { id: 'q3', text: '3. Why are antibiotics useless against a cold?', options: ['A) Because colds are caused by viruses.', 'B) Because they only work for headaches.', 'C) Because they are too expensive.'], correct: 'A) Because colds are caused by viruses.', explanation: 'The text reminds us that "antibiotics will not cure a cold because it is caused by a virus".', tip: 'Exam Tip: Always link the "Why" question to the "Because" statement in the reading.' }
      ]
    },
    {
      id: 'r14',
      title: 'Reading: Overcoming Stage Fright',
      instructions: 'Read the text about public speaking and choose the best answer (A, B, or C).',
      text: "Psychologists say we should never turn down a chance to speak in public, even if it scares us. Fear of public speaking is incredibly common, but avoiding it only makes the fear grow stronger. To overcome this, experts suggest finding a safe place to practice, like a school theatre group or a small debate club.\n\nIn these environments, you can get honest feedback from friends in order to help you improve. Furthermore, using deep breathing techniques right before you step on stage can help you feel relaxed. Remember, the audience usually wants you to succeed, so focus on what you want them to learn rather than your own nerves.",
      questions: [
        { id: 'q1', text: '1. What do psychologists advise about public speaking?', options: ['A) We should avoid it.', 'B) We should embrace opportunities to do it.', 'C) It is only for professionals.'], correct: 'B) We should embrace opportunities to do it.', explanation: 'Psychologists say "we should never turn down a chance to speak in public".', tip: 'Exam Tip: "Never turn down a chance" is a paraphrase for "embrace opportunities".' },
        { id: 'q2', text: '2. How can joining a school theatre group help?', options: ['A) It provides a safe space for practice and feedback.', 'B) It guarantees a career in acting.', 'C) It helps you memorize long texts.'], correct: 'A) It provides a safe space for practice and feedback.', explanation: 'The text suggests it as a "safe place to practice" where you can "get honest feedback from friends".', tip: 'Exam Tip: Always match the specific benefits listed in the text with the options.' },
        { id: 'q3', text: '3. What can you do right before speaking to calm your nerves?', options: ['A) Drink a cup of coffee.', 'B) Practice deep breathing.', 'C) Look at the floor.'], correct: 'B) Practice deep breathing.', explanation: 'The text recommends "using deep breathing techniques right before you step on stage".', tip: 'Exam Tip: Look for specific timing phrases ("right before") to locate the correct action.' }
      ]
    },
    {
      id: 'r15',
      title: 'Reading: Being an Electrician',
      instructions: 'Read the interview summary and choose the best answer (A, B, or C).',
      text: "Have you ever considered a career as an electrician? According to professionals in the field, it is a highly rewarding job, but it requires a specific set of skills. First and foremost, you've got to have a logical, open mind. When a machine breaks down, you have to be able to solve problems quickly and safely. It is not just about connecting wires!\n\nHowever, the job does have some disadvantages. Sometimes, travelling long distances to reach a client and working outside in freezing cold weather can be extremely difficult. Despite these challenges, many electricians love the variety of their daily tasks and the satisfaction of fixing complex issues.",
      questions: [
        { id: 'q1', text: '1. What is an essential skill for an electrician?', options: ['A) Physical strength.', 'B) A logical mind for problem-solving.', 'C) Excellent customer service skills.'], correct: 'B) A logical mind for problem-solving.', explanation: 'The text explicitly states: "you\'ve got to have a logical, open mind" to "solve problems quickly".', tip: 'Exam Tip: "Essential skill" in the question matches "specific set of skills" and "First and foremost" in the text.' },
        { id: 'q2', text: '2. What is mentioned as a negative aspect of the job?', options: ['A) The low salary.', 'B) Working in cold weather.', 'C) Working in small teams.'], correct: 'B) Working in cold weather.', explanation: 'The text mentions "disadvantages" including "working outside in freezing cold weather".', tip: 'Exam Tip: Match synonyms for negative ideas (disadvantages = negative aspect).' },
        { id: 'q3', text: '3. Why do many electricians enjoy their work?', options: ['A) Because they get to travel the world.', 'B) Because they like the variety of tasks.', 'C) Because it is very easy.'], correct: 'B) Because they like the variety of tasks.', explanation: 'Many love "the variety of their daily tasks and the satisfaction of fixing complex issues."', tip: 'Exam Tip: Always read the concluding sentence for a summary of feelings or opinions.' }
      ]
    },
    {
      id: 'r16',
      title: 'Reading: City Library Services',
      instructions: 'Read the short FAQ and choose the best answer (A, B, or C).',
      text: "Welcome to the City Library! Registration is free for local residents, but people who live outside the city are required to pay to join. You can check out up to 20 items at a time, including books, e-books, magazines, CDs, and DVDs. The loan period is four weeks. If you would like to keep the items longer, you may renew them in person or online. However, you must bring a photo I.D. and a document that shows your address when you first apply.",
      questions: [
        { id: 'q1', text: '1. Who has to pay for library registration?', options: ['A) Local residents.', 'B) People living outside the city.', 'C) Anyone borrowing DVDs.'], correct: 'B) People living outside the city.', explanation: 'The text states that "people who live outside the city are required to pay to join."', tip: 'Exam Tip: Look for contrast words like "but" which introduce exceptions to rules.' },
        { id: 'q2', text: '2. How many items can a member borrow at once?', options: ['A) 4', 'B) 10', 'C) 20'], correct: 'C) 20', explanation: 'The text explicitly says "You can check out up to 20 items at a time."', tip: 'Exam Tip: Scan the text for the specific number mentioned in the options.' },
        { id: 'q3', text: '3. How can you renew your borrowed items?', options: ['A) Only in person.', 'B) Only online.', 'C) In person or online.'], correct: 'C) In person or online.', explanation: 'The FAQ states you may renew them "in person or online."', tip: 'Exam Tip: Always read all the options carefully. The word "Only" often makes an option incorrect.' }
      ]
    },
    {
      id: 'r17',
      title: 'Reading: Village Gym FAQ',
      instructions: 'Read the text about the gym and choose the best answer (A, B, or C).',
      text: "Get answers to the most common questions about membership, classes, and services at Village Gym. You don't need to reserve your place for most classes, but for popular ones like spinning, we highly recommend booking online in advance. If you forget your gym clothes, unfortunately, we don't rent them out, but we do have a lost and found at the reception. Also, if you only want to visit for a single day, you can easily buy a day ticket at the entrance without becoming a full member.",
      questions: [
        { id: 'q1', text: '1. When do you need to book a class in advance?', options: ['A) For all classes.', 'B) For popular classes like spinning.', 'C) Never.'], correct: 'B) For popular classes like spinning.', explanation: 'The text recommends booking "for popular ones like spinning".', tip: 'Exam Tip: "Most" does not mean "all". Pay attention to exceptions.' },
        { id: 'q2', text: '2. What happens if you leave something at the gym?', options: ['A) The gym sells it.', 'B) You can check the lost and found at reception.', 'C) They mail it to your house.'], correct: 'B) You can check the lost and found at reception.', explanation: 'The text mentions "we do have a lost and found at the reception".', tip: 'Exam Tip: Synonyms are important. "Leave something" matches "lost and found".' },
        { id: 'q3', text: '3. Do you have to become a full member to use the gym?', options: ['A) Yes, it is strictly required.', 'B) No, you can buy a day ticket.', 'C) Only on weekends.'], correct: 'B) No, you can buy a day ticket.', explanation: 'The text says you can "buy a day ticket at the entrance without becoming a full member."', tip: 'Exam Tip: Look for words like "without" to understand alternative options.' }
      ]
    }
  ],
  useOfEnglish: [
    {
      id: 'u1',
      title: 'Use of English: The Generous Lottery Winners',
      instructions: 'Type ONE correct word into each gap to complete the story.',
      textParts: ['Mr and Mrs Large recently won a huge lottery jackpot. However, instead of buying expensive cars or luxury holidays, they decided to give most of the money ', ' to local charities. They only kept a small amount of cash for a rainy ', ' in case of emergencies. "We believe that we already have everything we need," Mrs Large explained during an interview. When the news of their generosity finally came ', ', they became celebrities overnight in their small village.'],
      questions: [
        { id: 'q1', answer: 'away', explanation: 'Phrasal verb: "give away" means to donate or give something for free.', tip: 'Exam Tip: Read the words directly before and after the gap.' },
        { id: 'q2', answer: 'day', explanation: 'Idiom: "save for a rainy day" means to keep money for a time in the future when you might need it.', tip: 'Exam Tip: The matura exam frequently tests common English idioms.' },
        { id: 'q3', answer: 'out', explanation: 'Phrasal verb: "come out" (for news or secrets) means to become known to the public.', tip: 'Exam Tip: Prepositions and adverbial particles are the most commonly tested words.' }
      ]
    },
    {
      id: 'u2',
      title: 'Use of English: A Lesson in Kindness',
      instructions: 'Type ONE correct word into each gap to complete the story.',
      textParts: ['When I was a teenager, a student\'s watch was stolen ', ' our classroom. Our teacher told us to stand in a circle and close our eyes. He went from pocket to pocket. When he searched my pockets, he found the watch and took ', '. However, he kept searching everyone else\'s pockets too. When he was done, he told us to open our eyes, but he never told anyone ', ' had stolen it. He saved my dignity and taught me a lesson I will never forget.'],
      questions: [
        { id: 'q1', answer: 'in', explanation: 'Preposition of place: "in" or "inside" is used for rooms like a classroom.', tip: 'Exam Tip: Think about prepositions of place and time.' },
        { id: 'q2', answer: 'it', explanation: 'Pronoun: "it" refers back to the singular object "the watch".', tip: 'Exam Tip: If a sentence feels incomplete, check if a subject or object pronoun is missing.' },
        { id: 'q3', answer: 'who', explanation: 'Relative pronoun: "who" is used to refer to a person (the thief).', tip: 'Exam Tip: Question words often act as connecting words in reported speech.' }
      ]
    },
    {
      id: 'u3',
      title: 'Use of English: The Heavenly Golf Course',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['An old man arrived in heaven and St. Peter showed him a beautiful golf course. Amazed, the old man asked how ', ' it was going to cost. "Nothing," Peter replied. "This is heaven. You can play for free whenever you wish." They went to the restaurant, and the old man asked where the healthy, low-fat food ', '. Peter smiled and said, "You can eat whatever you like here, and you will never get fat or sick." The old man looked at his wife angrily and said, "If you hadn\'t made me eat all those boring diets, we ', ' have arrived here 10 years ago!"'],
      questions: [
        { id: 'q1', answer: 'much', explanation: 'Question word: "How much" is used to ask about price or uncountable nouns.', tip: 'Exam Tip: Collocations with "how" (how many, how long, how much) are frequent.' },
        { id: 'q2', answer: 'was', explanation: 'Verb "to be" in past tense. The subject is "food" (uncountable/singular).', tip: 'Exam Tip: Always check the tense of the surrounding sentences.' },
        { id: 'q3', answer: 'would', explanation: 'Third conditional: "If you hadn\'t made me... we would have arrived..."', tip: 'Exam Tip: Conditional structures (if-clauses) are a standard B1-B2 grammar requirement.' }
      ]
    },
    {
      id: 'u4',
      title: 'Use of English: The Great White Shark',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Great white sharks can be found throughout the world\'s oceans. They usually ', ' in cool waters close to the coast. These incredible animals are the largest predatory fish on Earth. They can grow to be about six metres ', ' and weigh over 2,000 kilograms. Despite their scary reputation in movies, human attacks are actually very ', '. Scientists believe that when a great white does bite a human, it is usually because it confused the person for a seal or a turtle.'],
      questions: [
        { id: 'q1', answer: 'live', explanation: 'Present simple verb: We need a plural verb for the subject "They".', tip: 'Exam Tip: Check the subject (singular or plural) before filling in a main verb.' },
        { id: 'q2', answer: 'long', explanation: 'Adjective: We use "long" after a measurement to describe length.', tip: 'Exam Tip: Measurements are often followed by adjectives like long, tall, high, or deep.' },
        { id: 'q3', answer: 'rare', explanation: 'Adjective: "Rare" means not common. The sentence contrasts their scary reputation with the reality.', tip: 'Exam Tip: Words like "Despite" tell you the sentence will contain a contrast.' }
      ]
    },
    {
      id: 'u5',
      title: 'Use of English: Strange Eating Habits',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Have you ever eaten something unusual? Michel Lotito, a French entertainer, was famous ', ' eating things that normal people could never digest. During his performances, he ate metal, glass, and rubber. He even managed to eat an entire airplane! It took him two years to finish eating the small aircraft, piece ', ' piece. Doctors who examined Michel found that the lining of his stomach was twice as thick ', ' a normal human\'s, which protected him from serious injuries.'],
      questions: [
        { id: 'q1', answer: 'for', explanation: 'Preposition: The adjective "famous" is followed by the preposition "for".', tip: 'Exam Tip: Learn adjectives with their dependent prepositions.' },
        { id: 'q2', answer: 'by', explanation: 'Fixed phrase: "Piece by piece" means doing something one piece at a time.', tip: 'Exam Tip: Look out for repeated words around a gap. It usually forms a fixed phrase.' },
        { id: 'q3', answer: 'as', explanation: 'Comparison: The structure "as [adjective] as" is used to compare two things.', tip: 'Exam Tip: If you see "as" before an adjective, there is almost certainly an "as" coming after it!' }
      ]
    },
    {
      id: 'u6',
      title: 'Use of English: A Teacher\'s Secret',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['My teacher, Mr Jones, taught me a valuable lesson. A watch was stolen during class, and he told us to close our ', ' while he searched our pockets. He found the watch in my pocket, but he kept on searching everyone else\'s. When he finished, he returned the watch to its owner but never ', ' anyone who had stolen it. That day, he saved my dignity. It was the moment I decided never to ', ' a thief again, and I eventually became a teacher myself.'],
      questions: [
        { id: 'q1', answer: 'eyes', explanation: 'Noun/Collocation: The common phrase is "to close your eyes".', tip: 'Exam Tip: Visualise the physical action in the story to find missing body parts.' },
        { id: 'q2', answer: 'told', explanation: 'Verb: "Tell" is used here because it is followed directly by an object (anyone).', tip: 'Exam Tip: Remember the difference between say and tell.' },
        { id: 'q3', answer: 'be', explanation: 'Infinitive Verb: After "decided to", we need the base form of the verb.', tip: 'Exam Tip: The word "to" is almost always followed by a bare infinitive verb.' }
      ]
    },
    {
      id: 'u7',
      title: 'Use of English: The Loom Band Inventor',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Growing up in Malaysia, Cheong Choon Ng did not have many toys. As a child, he made jumping ropes from rubber ', '. Many years later, living in the USA, he saw his daughters making bracelets. He ', ' down and showed them how to link the colorful rubber bands together using a special technique. Soon, children at school were asking for them. He invested all his money in tools and eventually ', ' a millionaire thanks to his invention.'],
      questions: [
        { id: 'q1', answer: 'bands', explanation: 'Noun: "Rubber bands" is a common collocation (small elastic loops).', tip: 'Exam Tip: Use the context! The text later explicitly mentions "colorful rubber bands".' },
        { id: 'q2', answer: 'sat', explanation: 'Past tense verb: The story is narrated in the past tense (saw, showed). The past tense of "sit" is "sat".', tip: 'Exam Tip: Phrasal verbs with "down" are common. Sit down, lay down, write down.' },
        { id: 'q3', answer: 'became', explanation: 'Past tense verb: He "became" a millionaire (change of state in the past).', tip: 'Exam Tip: Always check the tense of the surrounding verbs in the paragraph.' }
      ]
    },
    {
      id: 'u8',
      title: 'Use of English: Smartphone Addiction',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Many people today are completely addicted to their phones. To become a mindful user, you should get ', ' of unnecessary notifications. Only allow messaging apps to alert you when real people want your attention. Also, try to set yourself a daily screen ', ' limit so you don\'t stare at the display for hours. Finally, make an effort to interact with your friends in ', ' rather than just through a digital screen.'],
      questions: [
        { id: 'q1', answer: 'rid', explanation: 'Phrasal Verb: "Get rid of" means to throw away or eliminate something.', tip: 'Exam Tip: "Get ___ of" is almost always "get rid of" in Matura exams!' },
        { id: 'q2', answer: 'time', explanation: 'Collocation: "Screen time" is the standard term for the hours spent looking at a device.', tip: 'Exam Tip: Think about modern vocabulary. What do we call the limit on our phones? Screen time.' },
        { id: 'q3', answer: 'person', explanation: 'Phrase: "In person" means face-to-face, physically present.', tip: 'Exam Tip: "In person" is the direct opposite of "online" or "virtually".' }
      ]
    },
    {
      id: 'u9',
      title: 'Use of English: The Ketchup Accident',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Richard was having a quick lunch when his colleague, Jenny, accidentally spilled ketchup ', ' his light-coloured trousers. Jenny apologized immediately. Richard took the trousers to the dry cleaners, and they charged him £4 to clean ', '. Later that afternoon, he sent Jenny an email asking her to pay the £4. Jenny\'s friends thought Richard was being silly over such a small amount ', ' money, but she paid it anyway.'],
      questions: [
        { id: 'q1', answer: 'on', explanation: 'Preposition: You spill liquid "on" a surface or clothes.', tip: 'Exam Tip: Visualize the physical action. The ketchup goes ON the trousers.' },
        { id: 'q2', answer: 'them', explanation: 'Pronoun: Refers back to the plural noun "trousers".', tip: 'Exam Tip: Clothes that have two legs (trousers, jeans, shorts) are always plural in English!' },
        { id: 'q3', answer: 'of', explanation: 'Preposition: "An amount of [noun]" is a standard quantity expression.', tip: 'Exam Tip: Quantity phrases (a piece of, a lot of, an amount of) always use the preposition "of".' }
      ]
    },
    {
      id: 'u10',
      title: 'Use of English: Back to School for Parents',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Parents in Singapore are going back to school ', ' help their children with homework. They are taking primary school maths classes to understand the new methods. Adults are signing up for these courses ', ' that they can be more helpful when their kids ask difficult questions. At ', ' workshops, parents sometimes pay as much as $700 to learn how to teach their own kids.'],
      questions: [
        { id: 'q1', answer: 'to', explanation: 'Infinitive of Purpose: We use "to + verb" to explain the reason for doing something.', tip: 'Exam Tip: Infinitives of purpose are frequently tested! Always check if the sentence explains "why" an action was done.' },
        { id: 'q2', answer: 'so', explanation: 'Conjunction: "So that" is used to introduce a clause of purpose or result.', tip: 'Exam Tip: If you see "that" introducing a reason right after a gap, the missing word is often "so".' },
        { id: 'q3', answer: 'these', explanation: 'Demonstrative Adjective: Refers back to the plural noun "workshops" mentioned previously in the context of "courses".', tip: 'Exam Tip: Pay attention to singular vs. plural nouns when choosing demonstrative words (this vs. these).' }
      ]
    },
    {
      id: 'u11',
      title: 'Use of English: France Bans Plastic',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Large fast-food chains in France will ', ' longer be allowed to use disposable plastic containers. The new law forces restaurants with ', ' than 20 seats to provide reusable cups and plates for customers eating inside. Environmental groups have welcomed the change. They say it is a great step forward in the fight ', ' plastic waste.'],
      questions: [
        { id: 'q1', answer: 'no', explanation: 'Fixed Phrase: "No longer" means in the past but not now.', tip: 'Exam Tip: "No longer" and "any longer" are essential B1/B2 time phrases.' },
        { id: 'q2', answer: 'more', explanation: 'Comparative: Used with "than" to indicate a greater quantity.', tip: 'Exam Tip: Always look for the word "than" after a gap—it\'s a huge clue for a comparative adjective.' },
        { id: 'q3', answer: 'against', explanation: 'Preposition: You "fight against" something you want to stop or defeat.', tip: 'Exam Tip: Learn the prepositions that naturally follow common nouns, like "fight against" or "reason for".' }
      ]
    },
    {
      id: 'u12',
      title: 'Use of English: Pets at Christmas',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['Christmas is a wonderful time for families, but it can be dangerous ', ' pets. Many traditional holiday foods are actually toxic to dogs and cats. For example, chocolate contains a chemical ', ' animals cannot digest safely. If you want to give your pet a special treat, buy something that is ', ' specifically for them at a pet store.'],
      questions: [
        { id: 'q1', answer: 'for', explanation: 'Preposition: Something is "dangerous for" someone or something.', tip: 'Exam Tip: Adjectives are often followed by specific prepositions (e.g., good at, bad for, interested in).' },
        { id: 'q2', answer: 'which', explanation: 'Relative Pronoun: Connects the clause to the non-human noun "chemical". ("That" is also correct here).', tip: 'Exam Tip: "Which" or "that" are used to refer back to things or animals in relative clauses.' },
        { id: 'q3', answer: 'made', explanation: 'Passive Voice Participle: The treat "is made" by someone for the pets.', tip: 'Exam Tip: Watch out for passive structures (verb "to be" + past participle) when the subject receives the action.' }
      ]
    },
    {
      id: 'u13',
      title: 'Use of English: The Student Loan',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['My 18-year-old sister, Becky, is leaving school this year and going to university. Yesterday, I got a little worried when I found brochures from various banks in her room. She told me that she was thinking ', ' taking out a bank loan to cover her living costs. She has even visited the website of one of the banks. I don\'t want her to start her adult life with a huge ', ' of debt, but I don\'t know ', ' to change her mind.'],
      questions: [
        { id: 'q1', answer: 'of', explanation: 'Preposition: The verb "think" in this context is followed by the preposition "of" or "about".', tip: 'Exam Tip: When expressing an intention or considering an option, "thinking of" is extremely common.' },
        { id: 'q2', answer: 'amount', explanation: 'Noun: "A huge amount of debt" is the correct collocation.', tip: 'Exam Tip: When dealing with uncountable nouns like "debt" or "money", we use the word "amount".' },
        { id: 'q3', answer: 'how', explanation: 'Question word as connector: "I don\'t know how to [do something]".', tip: 'Exam Tip: "Know" + question word + "to" + infinitive is a very frequent grammar structure in English.' }
      ]
    },
    {
      id: 'u14',
      title: 'Use of English: The High School Party',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['I have been staying in Baltimore with my host family through a student exchange program for more ', ' two months. Last week, rumors started spreading around the school. Everyone was talking about a huge party that was happening at a popular girl\'s house ', ' her parents were out of town. I didn\'t know the girl very well, but everyone said it was going to be the best party of the year. I really wanted to go, but I knew that attending a party without adult supervision was strictly against the ', ' of my exchange program.'],
      questions: [
        { id: 'q1', answer: 'than', explanation: 'Comparative phrase: "More than" is used to show a greater amount or longer time.', tip: 'Exam Tip: "More" is almost universally followed by "than" when comparing or indicating quantities.' },
        { id: 'q2', answer: 'while', explanation: 'Conjunction of time: "While" connects two things happening at the same time.', tip: 'Exam Tip: You can also use "because" or "when" here, as they all fit the context perfectly.' },
        { id: 'q3', answer: 'rules', explanation: 'Noun: A program has "rules" that you can be "against".', tip: 'Exam Tip: Use the surrounding vocabulary! "Strictly against the..." usually points to rules or laws.' }
      ]
    },
    {
      id: 'u15',
      title: 'Use of English: Volunteering in Nepal',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['During my gap year, I wanted to find an opportunity where I could try doing something really useful. After some research online, I found Alliance Nepal, a charity organisation ', ' offers volunteer and internship experiences. I signed up to teach English in a small village. During my time there, I also had the opportunity to assist the local teachers ', ' other school activities, such as sports and extracurricular projects. It was an amazing experience that I will remember for the ', ' of my life.'],
      questions: [
        { id: 'q1', answer: 'which', explanation: 'Relative pronoun: Refers back to the non-human noun "organisation". ("That" is also correct).', tip: 'Exam Tip: If you see a gap right after a noun and before a verb, it is almost always a relative pronoun.' },
        { id: 'q2', answer: 'with', explanation: 'Preposition: The verb "assist" is often followed by "with" when referring to helping with a task.', tip: 'Exam Tip: "Help with" and "assist with" use the exact same preposition.' },
        { id: 'q3', answer: 'rest', explanation: 'Fixed phrase: "For the rest of my life" is a common idiom meaning "forever".', tip: 'Exam Tip: Look for complete idiomatic phrases that you have heard in movies and songs.' }
      ]
    },
    {
      id: 'u16',
      title: 'Use of English: Gold Coins in a Charity Kettle',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['The Salvation Army regularly uses donation kettles to collect money ', ' charity purposes. Recently, a generous stranger dropped several gold coins ', ' one of their kettles in a small town. The volunteers were completely surprised ', ' the discovery. They plan to use the extra funds to provide free meals for homeless people during the winter.'],
      questions: [
        { id: 'q1', answer: 'for', explanation: 'Preposition: Money is collected "for" a purpose.', tip: 'Exam Tip: "For" usually indicates purpose or intended use.' },
        { id: 'q2', answer: 'into', explanation: 'Preposition of movement: Dropping something "into" a container.', tip: 'Exam Tip: Verbs of movement (drop, put, go) are often followed by "into" when entering an enclosed space.' },
        { id: 'q3', answer: 'by', explanation: 'Preposition: You are surprised "by" or "at" something.', tip: 'Exam Tip: Passive or adjective phrases describing emotions are often followed by "by" or "at".' }
      ]
    },
    {
      id: 'u17',
      title: 'Use of English: The Lost Ring',
      instructions: 'Type ONE correct word into each gap to complete the text.',
      textParts: ['A woman who spends her spare time looking ', ' hidden treasure with a metal detector has found a 17th-century gold ring. When she first dug it up, she thought it was just a piece of rubbish. However, when she took a closer ', ' at it, she realized it was incredibly valuable. She immediately took it to a museum, ', ' experts confirmed it was over 300 years old.'],
      questions: [
        { id: 'q1', answer: 'for', explanation: 'Phrasal verb: "look for" means to search for something.', tip: 'Exam Tip: Don\'t confuse "look for" (search) with "look at" (observe).' },
        { id: 'q2', answer: 'look', explanation: 'Collocation: "take a look" means to examine something.', tip: 'Exam Tip: "Take a closer look" is a very common fixed phrase.' },
        { id: 'q3', answer: 'where', explanation: 'Relative pronoun: Refers back to a place (the museum).', tip: 'Exam Tip: Use "where" for places in relative clauses when referring to an action happening there.' }
      ]
    }
  ],
  listening: [
    {
      id: 'l1',
      title: 'Interview with Harry',
      audioFile: 'k_angol_25okt_fl.mp3',
      instructions: 'Listen to the interview and decide if the statements are True (A), False (B), or if the text Doesn\'t Say (C).',
      transcript: `Interviewer: Harry, what's the bravest thing you've ever done?\nHarry: Becoming a dad at a young age. Katie and I had our little girl, Ivy, when I was 24. We always wanted to be young parents. Now Ivy has a sister and two brothers.\nInterviewer: When was the last time you cried?\nHarry: Probably when England lost to Portugal on penalties in the Euros in 2004. I remember a few tears that day. My wife doesn't like the fact that I didn't shed tears when our first child was born.\nInterviewer: How do you imagine your perfect Sunday?\nHarry: Having an early game of golf, and then going for a long walk. I love going to the forest for an hour or two. Then I'd come home, have a barbecue. I don't drink alcohol, so I always have a cup of tea, milk, and two sugars to end the night.`,
      questions: [
        { id: 'q1', text: '1. Harry believes that having a child early in life was a brave decision.', options: ['A) True', 'B) False', 'C) Doesn\'t Say'], correct: 'A) True', explanation: 'When the interviewer asks about the bravest thing he\'s done, he replies, "Becoming a dad at a young age."', tip: 'Exam Tip: Listen for paraphrasing.' },
        { id: 'q2', text: '2. Harry cried tears of joy when his daughter Ivy was born.', options: ['A) True', 'B) False', 'C) Doesn\'t Say'], correct: 'B) False', explanation: 'He explicitly says his wife isn\'t happy because he "didn\'t shed tears" when his first child was born.', tip: 'Exam Tip: Watch out for negative verbs.' },
        { id: 'q3', text: '3. Harry usually wins his Sunday golf matches against his friends.', options: ['A) True', 'B) False', 'C) Doesn\'t Say'], correct: 'C) Doesn\'t Say', explanation: 'He mentions playing golf on a perfect Sunday, but says nothing about whether he wins or who he plays with.', tip: 'Exam Tip: Do not guess based on what is logical—always choose "Doesn\'t Say".' }
      ]
    },
    {
      id: 'l2',
      title: 'Interview with an author',
      audioFile: 'k_angol_20okt_fl.mp3',
      instructions: 'Listen to the interview with the author and answer the questions.',
      transcript: `Interviewer: I've heard you had some funny adventures as a kid.\nAuthor: Oh yes. Once, I told my mom that a neighbor wanted to borrow her vacuum cleaner. The truth was that my friends and I wanted to use it to catch a ghost which was haunting the local castle. Of course, we never caught it.\nInterviewer: I've heard that you loved reading when you were a child. How did your passion start?\nAuthor: I lived halfway up a mountain in the highlands of Scotland. It was a 225 km trip to the cinema, and my parents rarely took me there. That's why I developed a real love of books from an early age.\nInterviewer: If you could give a young writer some advice about writing, what would it be?\nAuthor: There's all the obvious stuff about reading and writing as much as possible, which is all good advice. But to be a good writer, you also have to live a bit, I think. Go outside, hang out with friends, meet new people, have experiences, both good and bad. The more you get into the world, the more stories you'll be inspired to write.`,
      questions: [
        { id: 'q1', text: '1. What did the author actually want to do with the vacuum cleaner?', options: ['A) Clean the local castle.', 'B) Help out a neighbor.', 'C) Try to catch a ghost.', 'D) Sell it to a friend.'], correct: 'C) Try to catch a ghost.', explanation: 'The author states: "The truth was that my friends and I wanted to use it to catch a ghost".', tip: 'Exam Tip: Speakers often contrast a lie with the truth.' },
        { id: 'q2', text: '2. Why did the author start reading so much as a child?', options: ['A) Her parents forced her to read.', 'B) She lived very far away from the cinema.', 'C) There were no other children on the mountain.', 'D) She wanted to be a famous writer.'], correct: 'B) She lived very far away from the cinema.', explanation: 'She explains it was a "225 km trip to the cinema" and her parents "rarely took me there. That\'s why I developed a real love of books".', tip: 'Exam Tip: Listen for phrases that show cause and effect.' },
        { id: 'q3', text: '3. What advice does the author give to young writers?', options: ['A) Read more books than anyone else.', 'B) Go outside and experience life.', 'C) Move to a big city to meet people.', 'D) Write at least one story every day.'], correct: 'B) Go outside and experience life.', explanation: 'She advises: "Go outside, hang out with friends, meet new people, have experiences".', tip: 'Exam Tip: Pay attention to what they emphasize as their specific advice.' }
      ]
    },
    {
      id: 'l3',
      title: 'The Supermarket Employee',
      audioFile: 'k_angol_25maj_fl.mp3',
      instructions: 'Listen to the funny story and choose the correct answer.',
      transcript: `Interviewer: You worked in a supermarket for a long time. Did anything funny ever happen?\nEmployee: Oh, absolutely. I'm 67 years old now, but I remember this one lady clearly. She was extremely angry because she had bought a box of biscuits, and she said they tasted terrible. She demanded her money back. \nInterviewer: What did you do?\nEmployee: I asked her to show me the box. When she handed it to me, I had to try really hard not to laugh. I gently pointed out to her that she had bought a box of dog biscuits! She turned bright red and quickly left the store.`,
      questions: [
        { id: 'q1', text: '1. Why was the lady angry?', options: ['A) She waited too long in line.', 'B) She thought the biscuits tasted bad.', 'C) She was given the wrong change.'], correct: 'B) She thought the biscuits tasted bad.', explanation: 'The employee says she was angry because "she said they tasted terrible".', tip: 'Exam Tip: Listen for the immediate cause of an emotion.' },
        { id: 'q2', text: '2. How did the employee react when he saw the box?', options: ['A) He started shouting.', 'B) He gave her a full refund immediately.', 'C) He had to stop himself from laughing.'], correct: 'C) He had to stop himself from laughing.', explanation: 'He says, "I had to try really hard not to laugh."', tip: 'Exam Tip: Paraphrasing is often used for the correct answer.' },
        { id: 'q3', text: '3. What was the problem with the biscuits?', options: ['A) They were past their expiration date.', 'B) They were made for dogs.', 'C) The box was completely empty.'], correct: 'B) They were made for dogs.', explanation: 'He points out that "she had bought a box of dog biscuits!"', tip: 'Exam Tip: The punchline is usually at the very end.' }
      ]
    },
    {
      id: 'l4',
      title: 'A Lucky Escape',
      audioFile: 'k_angol_20okt_fl.mp3',
      instructions: 'Listen to the news report and choose the best answer.',
      transcript: `Host: Today we're talking about lucky escapes. Mr. Christopher McCabe had quite an adventure in his garden, didn't he?\nReporter: Yes, he did! Christopher was digging in his garden in England when his shovel hit something hard. He dug it up and found an old, rusty metal object. He didn't know what it was, so he just threw it into a bucket of water to clean it. \nHost: And what was it?\nReporter: It turned out to be a live bomb from World War II! When the police arrived, they told him he was incredibly lucky. Throwing it around and hitting it with a shovel could have easily made it explode. The bomb squad safely removed it from his garden.`,
      questions: [
        { id: 'q1', text: '1. Where did Christopher find the object?', options: ['A) In the street.', 'B) In a bucket of water.', 'C) In his garden.'], correct: 'C) In his garden.', explanation: 'The reporter explicitly states he was "digging in his garden".', tip: 'Exam Tip: Usually, the first question relates to the very beginning of the audio.' },
        { id: 'q2', text: '2. Why did he throw it into a bucket?', options: ['A) He wanted to clean it.', 'B) He knew it was a bomb and wanted to cool it.', 'C) He didn\'t want to look at it.'], correct: 'A) He wanted to clean it.', explanation: 'He threw it into a bucket of water "to clean it" because it was a rusty object.', tip: 'Exam Tip: Pay attention to motives.' },
        { id: 'q3', text: '3. How did the police describe Christopher?', options: ['A) Very foolish.', 'B) Incredibly lucky.', 'C) Extremely brave.'], correct: 'B) Incredibly lucky.', explanation: 'When the police arrived, "they told him he was incredibly lucky."', tip: 'Exam Tip: Listen for exact adjectives.' }
      ]
    },
    {
      id: 'l5',
      title: 'A Spoonful of Sugar',
      audioFile: 'k_angol_23maj_fl.mp3',
      instructions: 'Listen to the story and choose the best answer.',
      transcript: `Speaker: You might know the famous song "A Spoonful of Sugar" from the movie Mary Poppins. But do you know the true story behind it? The songwriter, Robert Sherman, was struggling to write a song for the movie. One day, he went home and asked his children how their day was. His son said they had received the polio vaccine at school. Robert asked if it hurt, expecting his son to say he had an injection. Instead, his son explained that the nurses had put the medicine onto a sugar cube, and he just had to eat it! This gave Robert the brilliant idea for the song: "A spoonful of sugar helps the medicine go down."`,
      questions: [
        { id: 'q1', text: '1. What was the songwriter having trouble with?', options: ['A) Finding a doctor for his son.', 'B) Writing a song for a movie.', 'C) Baking a cake.'], correct: 'B) Writing a song for a movie.', explanation: 'The speaker states that Robert Sherman "was struggling to write a song for the movie."', tip: 'Exam Tip: "Struggling to do something" means having trouble with it.' },
        { id: 'q2', text: '2. How did his son receive the vaccine at school?', options: ['A) Through an injection in his arm.', 'B) In a glass of water.', 'C) On a sugar cube.'], correct: 'C) On a sugar cube.', explanation: 'The son explained that the nurses "put the medicine onto a sugar cube".', tip: 'Exam Tip: Notice the contrast. The father expected an injection, but the reality was a sugar cube.' },
        { id: 'q3', text: '3. What did the son\'s story inspire Robert to do?', options: ['A) Write his most famous song.', 'B) Give his children more sugar.', 'C) Go to the school and complain.'], correct: 'A) Write his most famous song.', explanation: 'The story gave Robert "the brilliant idea for the song: A spoonful of sugar".', tip: 'Exam Tip: The word "idea" connects perfectly to the concept of being "inspired" to write.' }
      ]
    },
    {
      id: 'l6',
      title: 'The Toddler Who Bought a Car',
      audioFile: 'k_angol_15maj_fl.mp3',
      instructions: 'Listen to the news report and choose the best answer.',
      transcript: `Reporter: Paul Stout was absolutely shocked when he got an email from eBay congratulating him. The email said he had successfully bought a 1962 Austin car for £150. He initially thought it was a joke because he certainly hadn't bid for it! But when he logged into his account, he saw it was true.\nHe soon realized what had happened. His 13-month-old daughter, Sorella, who couldn't even speak yet, had been playing with his smartphone. She had accidentally bought the car through the app! Paul decided to pay for it anyway. He plans to repair the old car so it can be a great father-daughter project, and he hopes to give it to Sorella to drive on her 16th birthday.`,
      questions: [
        { id: 'q1', text: '1. How did Paul find out he had bought a car?', options: ['A) His wife told him.', 'B) He received an email from eBay.', 'C) The car arrived at his house.'], correct: 'B) He received an email from eBay.', explanation: 'The reporter says Paul was shocked "when he got an email from eBay".', tip: 'Exam Tip: Pay attention to the specific method of communication.' },
        { id: 'q2', text: '2. Who actually clicked the button to buy the car?', options: ['A) His teenage son.', 'B) A hacker on the internet.', 'C) His baby daughter.'], correct: 'C) His baby daughter.', explanation: 'He realized his 13-month-old daughter "had accidentally bought the car through the app".', tip: 'Exam Tip: "13-month-old" is a synonym phrase for a "baby" or "toddler".' },
        { id: 'q3', text: '3. What does Paul plan to do with the car in the future?', options: ['A) Sell it back on eBay.', 'B) Give it to his daughter when she is 16.', 'C) Throw it away because it is too rusty.'], correct: 'B) Give it to his daughter when she is 16.', explanation: 'The text states "he hopes to give it to Sorella to drive on her 16th birthday".', tip: 'Exam Tip: Listen for future intentions marked by verbs like "hopes" or "plans".' }
      ]
    },
    {
      id: 'l7',
      title: 'Duke the Rescue Dog',
      audioFile: 'k_angol_16maj_fl.mp3',
      instructions: 'Listen to the story and decide if the statements are True (A), False (B), or if the text Doesn\'t Say (C).',
      transcript: `News Anchor: Adopting a rescue dog was the best decision Jenna and Tom ever made. One night, they were sleeping soundly when their dog, Duke, suddenly jumped on their bed. He began shaking uncontrollably with fear. Duke was usually a very calm and perfect dog, so they immediately knew something had to be terribly wrong. \nThey ran into their 9-week-old baby's room to check on her. To their horror, the baby had stopped breathing! Tom called an ambulance at once. The paramedics arrived within 10 minutes and managed to save her life. Jenna later told reporters, "If Duke hadn't woken us up, the baby would have died." They hope their story will encourage others to adopt rescue dogs.`,
      questions: [
        { id: 'q1', text: '1. Duke was normally a very nervous and loud dog.', options: ['A) True', 'B) False', 'C) Doesn\'t Say'], correct: 'B) False', explanation: 'The text says Duke was "usually a very calm and perfect dog".', tip: 'Exam Tip: Watch out for words that mean the opposite of what is in the text.' },
        { id: 'q2', text: '2. Jenna and Tom woke up because they heard the baby crying.', options: ['A) True', 'B) False', 'C) Doesn\'t Say'], correct: 'B) False', explanation: 'They woke up because Duke "jumped on their bed" and was "shaking uncontrollably".', tip: 'Exam Tip: Identify the exact cause of an action.' },
        { id: 'q3', text: '3. The paramedics arrived at the house very quickly.', options: ['A) True', 'B) False', 'C) Doesn\'t Say'], correct: 'A) True', explanation: 'The audio states "The paramedics arrived within 10 minutes", which is very quickly.', tip: 'Exam Tip: Quantifiers and time expressions hold the key to True/False questions.' }
      ]
    },
    {
      id: 'l8',
      title: 'The Famous Photo of Einstein',
      audioFile: 'k_angol_20okt_fl.mp3',
      instructions: 'Listen to the short history segment and choose the best answer.',
      transcript: `Host: Have you ever seen that famous photograph of Albert Einstein sticking his tongue out? It's iconic! It was taken by a photographer named Art Sasse on Einstein's 72nd birthday. Einstein was leaving a long birthday party and had just gotten into the back of a car. \nSeveral photographers were gathered around, constantly asking him to smile for the camera. But Einstein was extremely tired of smiling all evening. So, instead of giving them a normal smile, he just looked at the camera and stuck his tongue out! Sasse quickly snapped the picture. Surprisingly, Einstein loved the photo so much that he ordered nine copies to send to his close friends as greeting cards.`,
      questions: [
        { id: 'q1', text: '1. What occasion was being celebrated when the photo was taken?', options: ['A) Einstein winning a Nobel Prize.', 'B) Einstein\'s 72nd birthday.', 'C) A university graduation.'], correct: 'B) Einstein\'s 72nd birthday.', explanation: 'The host mentions it was taken "on Einstein\'s 72nd birthday".', tip: 'Exam Tip: Listen specifically for numbers and dates.' },
        { id: 'q2', text: '2. Why did Einstein stick his tongue out?', options: ['A) He was eating a sour candy.', 'B) He was angry at his driver.', 'C) He was tired of smiling for photographers.'], correct: 'C) He was tired of smiling for photographers.', explanation: 'He stuck his tongue out because he was "extremely tired of smiling all evening".', tip: 'Exam Tip: Connect the character\'s emotion to their unexpected action.' },
        { id: 'q3', text: '3. How did Einstein feel about the photograph later?', options: ['A) He absolutely hated it.', 'B) He loved it and ordered copies.', 'C) He asked the photographer to delete it.'], correct: 'B) He loved it and ordered copies.', explanation: 'The audio explicitly states: "Einstein loved the photo so much that he ordered nine copies".', tip: 'Exam Tip: Don\'t assume a historical figure would be embarrassed.' }
      ]
    },
    {
      id: 'l9',
      title: 'Interview with Leona Lewis',
      audioFile: 'k_angol_15okt_fl.mp3',
      instructions: 'Listen to the interview and choose the correct answer.',
      transcript: `Interviewer: Today we have Leona Lewis, who won the X Factor in 2006. Leona, how did your life change after winning? \nLeona: It was incredible. I went from working as a receptionist to singing on huge stages. My debut album was a massive success, but it took a lot of hard work. I had to practice every single day and learn how to handle the pressure of fame.`,
      questions: [
        { id: 'q1', text: '1. What was Leona\'s job before winning the competition?', options: ['A) A professional singer.', 'B) A receptionist.', 'C) A vocal coach.'], correct: 'B) A receptionist.', explanation: 'She says, "I went from working as a receptionist to singing on huge stages."', tip: 'Exam Tip: Listen for "from X to Y" phrases to understand before-and-after timelines.' },
        { id: 'q2', text: '2. How does Leona describe her first album?', options: ['A) A massive success.', 'B) A big disappointment.', 'C) A difficult project.'], correct: 'A) A massive success.', explanation: 'She explicitly states, "My debut album was a massive success".', tip: 'Exam Tip: "Debut album" is a synonym for "first album".' },
        { id: 'q3', text: '3. What did she have to do every day?', options: ['A) Give interviews.', 'B) Practice.', 'C) Travel around the world.'], correct: 'B) Practice.', explanation: 'She mentions, "I had to practice every single day".', tip: 'Exam Tip: Match frequency expressions like "every single day" with the action that follows.' }
      ]
    },
    {
      id: 'l10',
      title: 'The Slow Drivers',
      audioFile: 'k_angol_20maj_fl.mp3',
      instructions: 'Listen to the funny story and choose the best answer.',
      transcript: `A police officer was sitting on the side of the highway waiting to catch speeding drivers. Suddenly, he saw a car traveling at just 22 miles per hour. He stopped the car because driving too slowly can also be dangerous. Inside, he found five terrified elderly ladies. The driver said, "I was doing exactly the speed limit! The sign said 22." The officer laughed and explained, "Ma'am, 22 is the route number of this highway, not the speed limit."`,
      questions: [
        { id: 'q1', text: '1. Why did the police officer stop the car?', options: ['A) It was going too fast.', 'B) It was going too slowly.', 'C) It was driving on the wrong side.'], correct: 'B) It was going too slowly.', explanation: 'The officer stopped the car because "driving too slowly can also be dangerous."', tip: 'Exam Tip: Sometimes the unexpected action is the correct answer.' },
        { id: 'q2', text: '2. How did the passengers in the car feel?', options: ['A) Angry', 'B) Excited', 'C) Terrified'], correct: 'C) Terrified', explanation: 'The audio describes them as "five terrified elderly ladies."', tip: 'Exam Tip: Listen carefully for adjectives describing emotions.' },
        { id: 'q3', text: '3. What did the number 22 actually mean?', options: ['A) The speed limit.', 'B) The number of the highway.', 'C) The age of the car.'], correct: 'B) The number of the highway.', explanation: 'The officer explained that "22 is the route number of this highway".', tip: 'Exam Tip: In funny stories or jokes, the misunderstanding is usually the focus of the final question.' }
      ]
    },
    {
      id: 'l11',
      title: 'The Professor\'s Jar',
      audioFile: 'k_angol_19maj_fl.mp3',
      instructions: 'Listen to the story and choose the correct answer.',
      transcript: `A philosophy professor stood before his class with a large empty jar. He filled it with golf balls and asked the students if it was full. They said yes. Then, he poured small pebbles into the jar, which filled the spaces between the golf balls. Again, they agreed it was full. He explained that the golf balls represent the most important things in life, like family and health, while the pebbles are smaller things like a job or a car.`,
      questions: [
        { id: 'q1', text: '1. What did the professor put into the jar first?', options: ['A) Pebbles', 'B) Water', 'C) Golf balls'], correct: 'C) Golf balls', explanation: 'The text says, "He filled it with golf balls and asked the students if it was full."', tip: 'Exam Tip: Pay attention to sequencing words like "first", "then", and "finally".' },
        { id: 'q2', text: '2. What did the golf balls represent?', options: ['A) The most important things in life.', 'B) Small problems.', 'C) The students\' grades.'], correct: 'A) The most important things in life.', explanation: 'He explained that the golf balls "represent the most important things in life".', tip: 'Exam Tip: The word "represent" directly answers "what do they mean / symbolize".' },
        { id: 'q3', text: '3. What did the pebbles represent?', options: ['A) Family and friends.', 'B) Less important things like a car.', 'C) Money.'], correct: 'B) Less important things like a car.', explanation: 'The pebbles are described as "smaller things like a job or a car."', tip: 'Exam Tip: "Smaller things" implies they are less important than the main things.' }
      ]
    },
    {
      id: 'l12',
      title: 'Franz Kafka and the Doll',
      instructions: 'Listen to the story and choose the correct answer.',
      transcript: `At 40, Franz Kafka, who never married and had no children, was walking through a park one day in Berlin when he met a girl who was crying because she had lost her favorite doll. Kafka offered to help her look for the doll and arranged to meet her the next day at the same spot. When he couldn't find the doll, he wrote a letter "from" the doll and read it to the little girl. The letter explained that the doll had gone off on a journey to see the world. Kafka continued writing and reading these letters to the girl for several weeks, comforting her with stories of the doll's adventures.`,
      questions: [
        { id: 'q1', text: '1. Why was the little girl crying in the park?', options: ['A) She was lost.', 'B) She had dropped her ice cream.', 'C) She had lost her favorite doll.'], correct: 'C) She had lost her favorite doll.', explanation: 'The text states that Kafka met a girl "who was crying because she had lost her favorite doll".', tip: 'Exam Tip: Listen for the "because" clauses.' },
        { id: 'q2', text: '2. What did Kafka do when he couldn\'t find the toy?', options: ['A) He bought her a new one.', 'B) He wrote letters pretending to be the doll.', 'C) He called the police.'], correct: 'B) He wrote letters pretending to be the doll.', explanation: 'He "wrote a letter \'from\' the doll and read it to the little girl".', tip: 'Exam Tip: Paraphrasing is common! "Pretending to be the doll" is another way of saying he wrote a letter "from" the doll.' },
        { id: 'q3', text: '3. What did the letter say the doll was doing?', options: ['A) Travelling the world.', 'B) Hiding in the park.', 'C) Visiting a toy hospital.'], correct: 'A) Travelling the world.', explanation: 'The letter explained that the doll "had gone off on a journey to see the world".', tip: 'Exam Tip: Focus on the specific details related to the main characters.' }
      ]
    },
    {
      id: 'l13',
      title: 'The Money on the Highway',
      instructions: 'Listen to the news report and choose the best answer.',
      transcript: `An armored truck was driving down the highway when suddenly its back doors flew open. A bag ripped and money spilled out. Then another bag fell out of the truck, and soon, money was flying everywhere! Drivers slammed on their brakes and stopped right in the middle of the highway. People jumped out of their cars and began to pick up the green bills. Mr. Kaiser grabbed a plastic bag of money, put it in his car, and drove away. Later, he counted it and realized he had $57,000! After thinking about it for two hours, he went to the police station and returned all the cash.`,
      questions: [
        { id: 'q1', text: '1. Why did money start flying on the highway?', options: ['A) A bank was robbed nearby.', 'B) The doors of an armored truck opened.', 'C) A helicopter dropped it.'], correct: 'B) The doors of an armored truck opened.', explanation: 'The story begins by explaining an armored truck was driving when "its back doors flew open" and money spilled out.', tip: 'Exam Tip: The first sentence often sets the scene and answers the first question.' },
        { id: 'q2', text: '2. How did the drivers react?', options: ['A) They stopped their cars and picked up the money.', 'B) They ignored it and kept driving.', 'C) They called the police immediately.'], correct: 'A) They stopped their cars and picked up the money.', explanation: 'Drivers "stopped right in the middle of the highway... and began to pick up the green bills".', tip: 'Exam Tip: Match the sequence of events. The drivers stopped first, then got out.' },
        { id: 'q3', text: '3. What did Mr. Kaiser do after counting the $57,000 at home?', options: ['A) He went on a vacation to Florida.', 'B) He bought a new gate for his house.', 'C) He returned the money to the police.'], correct: 'C) He returned the money to the police.', explanation: 'Despite dreaming about a vacation, "he went to the police station and returned all the cash".', tip: 'Exam Tip: Be careful! The text might mention distractors before giving the final, real action.' }
      ]
    },
    {
      id: 'l14',
      title: 'The Emperor of Long Distance',
      instructions: 'Listen to the radio interview and answer the questions.',
      transcript: `You are listening to Radio Bridge. In the studio, I have the world-famous Ethiopian runner, Haile Gebrselassie, who is commonly called the "Emperor of Long Distance." During his incredible career, he won two Olympic gold medals and eight World Championships, and he set 27 world records! He eventually decided to retire in 2010. Today, I would like to know how his outstanding career started. Mr. Gebrselassie, thank you very much for accepting our invitation and joining us in the studio today.`,
      questions: [
        { id: 'q1', text: '1. What sport is Haile Gebrselassie famous for?', options: ['A) Swimming.', 'B) Long-distance running.', 'C) Cycling.'], correct: 'B) Long-distance running.', explanation: 'The host introduces him as the "world-famous Ethiopian runner" and the "Emperor of Long Distance".', tip: 'Exam Tip: Titles and nicknames often contain the core information about a person\'s profession.' },
        { id: 'q2', text: '2. How many world records did he set during his career?', options: ['A) 2.', 'B) 8.', 'C) 27.'], correct: 'C) 27.', explanation: 'The audio clearly states he "set 27 world records".', tip: 'Exam Tip: Write down numbers as soon as you hear them.' },
        { id: 'q3', text: '3. In what year did he decide to retire?', options: ['A) 2000.', 'B) 2010.', 'C) 2020.'], correct: 'B) 2010.', explanation: 'The host says, "He eventually decided to retire in 2010."', tip: 'Exam Tip: Don\'t overthink dates. If a specific year is connected to a specific action (retire), that is your answer.' }
      ]
    },
    {
      id: 'l15',
      title: 'The History of the Bikini',
      audioFile: 'k_angol_18okt_fl.mp3',
      instructions: 'Listen to the recording and choose the best answer.',
      transcript: `In this section, you will hear the story of the birth of the bikini. It was named after the Bikini Atoll, where atomic bomb testing was taking place. The creator thought the swimsuit would cause a similar explosive reaction in the fashion world. Originally, models refused to wear it because they thought it revealed too much. Eventually, a brave dancer agreed to model it in Paris in 1946. It took many years for the bikini to become widely accepted on public beaches.`,
      questions: [
        { id: 'q1', text: '1. What inspired the name of the swimsuit?', options: ['A) A famous model.', 'B) A location of atomic bomb tests.', 'C) A French beach.'], correct: 'B) A location of atomic bomb tests.', explanation: 'The transcript says "It was named after the Bikini Atoll, where atomic bomb testing was taking place."', tip: 'Exam Tip: Listen closely for the phrase "named after".' },
        { id: 'q2', text: '2. Why did models initially refuse to wear it?', options: ['A) It was too expensive.', 'B) It was the wrong colour.', 'C) It revealed too much of their bodies.'], correct: 'C) It revealed too much of their bodies.', explanation: 'The text states models refused "because they thought it revealed too much."', tip: 'Exam Tip: "Revealed too much" refers to showing too much skin.' },
        { id: 'q3', text: '3. Who was the first person to model the bikini in public?', options: ['A) A professional swimmer.', 'B) A brave dancer.', 'C) A Hollywood actress.'], correct: 'B) A brave dancer.', explanation: 'The transcript mentions that "Eventually, a brave dancer agreed to model it".', tip: 'Exam Tip: Pay attention to specific professions mentioned in the text.' }
      ]
    },
    {
      id: 'l16',
      title: 'The Lost Fisherman',
      audioFile: 'k_angol_16okt_fl.mp3',
      instructions: 'Listen to the recording and choose the best answer.',
      transcript: `In this section, you will hear a true story about a Costa Rican fisherman who survived a five-month drift in a boat on the ocean. He originally set out for a simple weekend fishing trip. However, a massive storm hit and destroyed his engine and radio. For months, he survived by drinking rainwater and eating raw fish. He was finally rescued by a passing cargo ship just when he thought he had no hope left. Doctors were amazed at his physical condition after such a long ordeal.`,
      questions: [
        { id: 'q1', text: '1. How long was the fisherman\'s trip supposed to be originally?', options: ['A) Five months.', 'B) A weekend.', 'C) One week.'], correct: 'B) A weekend.', explanation: 'He originally set out for "a simple weekend fishing trip".', tip: 'Exam Tip: Differentiate between the planned time (weekend) and the actual time (five months).' },
        { id: 'q2', text: '2. How did the storm affect his boat?', options: ['A) It broke the sails.', 'B) It flipped the boat over.', 'C) It destroyed the engine and radio.'], correct: 'C) It destroyed the engine and radio.', explanation: 'The storm "destroyed his engine and radio".', tip: 'Exam Tip: Listen for the specific damage caused.' },
        { id: 'q3', text: '3. Who eventually rescued him?', options: ['A) A police helicopter.', 'B) A passing cargo ship.', 'C) Another fisherman.'], correct: 'B) A passing cargo ship.', explanation: 'He was rescued by "a passing cargo ship".', tip: 'Exam Tip: Distinguish between the different types of vessels or vehicles mentioned.' }
      ]
    }
  ]
};

// --- COMPONENTS ---

const ChallengeTracker = ({ completedDays, onStartDay }) => {
  const totalDays = 30;
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 text-white relative overflow-hidden">
       <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
       <div className="absolute bottom-0 right-20 w-24 h-24 bg-blue-300 opacity-20 rounded-full blur-xl"></div>
       
       <div className="relative z-10">
         <div className="flex items-center justify-between mb-2">
           <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
             <Flame size={24} className="text-orange-400" /> 30-Day Matura Challenge
           </h3>
           <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
             {completedDays.length} / {totalDays} Completed
           </span>
         </div>
         <p className="text-blue-100 mb-6 text-sm sm:text-base max-w-xl">
           Click on a day to launch your daily set: Reading, Use of English, Listening, and Flashcards!
         </p>
         
         <div className="flex flex-wrap gap-2 sm:gap-3">
           {[...Array(totalDays)].map((_, i) => {
              const dayNum = i + 1;
              const isCompleted = completedDays.includes(dayNum);
              return (
                <button 
                  key={i} 
                  onClick={() => onStartDay(dayNum)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 transform hover:scale-110
                    ${isCompleted 
                      ? 'bg-red-500 text-white shadow-md border-2 border-red-500'
                      : 'bg-white/10 text-blue-200 border border-white/30 hover:bg-white/20'}`}
                  title={isCompleted ? `Day ${dayNum} (Completed)` : `Start Day ${dayNum}`}
                >
                   {isCompleted ? '✓' : dayNum}
                </button>
              );
           })}
         </div>
         
         {completedDays.length > 0 && (
           <p className="mt-5 font-medium text-sm text-blue-50 flex items-center gap-2">
             <Award size={16} className="text-yellow-400"/> You are doing great! Keep the momentum going.
           </p>
         )}
       </div>
    </div>
  );
};

const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);
    if (audioRef.current) {
      audioRef.current.pause();
      if (src) {
        audioRef.current.load();
      }
    }
  }, [src]);

  const togglePlay = () => {
    if (hasError || !src) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasError(false);
            })
            .catch(e => {
              console.error("Error playing audio:", e);
              setIsPlaying(false);
              setHasError(true);
            });
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setHasError(false);
    }
  };

  const handleError = () => {
    if (src) {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mt-2">
      <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm w-full">
        <audio
          ref={audioRef}
          src={src || undefined} 
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
        />
        <button
          onClick={togglePlay}
          disabled={hasError || !src}
          className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm ${hasError || !src ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
        
        <div className="flex-1 flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={hasError || !src}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-xs text-slate-500 font-medium w-10">{formatTime(duration)}</span>
        </div>
      </div>
      
      {hasError && src && (
        <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100 flex flex-col gap-2">
          <p className="text-xs text-red-600 flex items-start gap-1.5">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>Browser blocked the direct stream (very common with Google Drive links due to strict security rules).</span>
          </p>
          <a 
            href={src} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-700 text-sm font-semibold rounded-lg border border-red-200 hover:bg-red-50 transition-colors w-full sm:w-auto shadow-sm"
          >
            <ExternalLink size={16} /> Open Audio in New Tab
          </a>
        </div>
      )}
      
      {!src && (
        <p className="text-xs text-amber-600 mt-2 ml-1 flex items-center gap-1">
          <AlertCircle size={14} /> No audio linked. Please check TEACHER_AUDIO_LINKS in the code.
        </p>
      )}
    </div>
  );
};

const ManageAudio = ({ onBack, audioMap, onSaveMap }) => {
  const listeningTasks = tasksDatabase.listening;
  const [urlInputs, setUrlInputs] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [tempMap, setTempMap] = useState(audioMap);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'teacher2024') { 
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleUrlChange = (taskId, value) => {
    setUrlInputs(prev => ({ ...prev, [taskId]: value }));
  };

  const handleTestUrl = (taskId) => {
    const input = urlInputs[taskId];
    if (input && input.trim() !== '') {
      let finalUrl = input.trim();
      
      const driveMatch = finalUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || finalUrl.match(/id=([a-zA-Z0-9_-]+)/);
      if (finalUrl.includes('drive.google.com') && driveMatch && driveMatch[1]) {
        finalUrl = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
      }
      
      if (finalUrl.includes('dropbox.com')) {
        finalUrl = finalUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
      }

      setTempMap(prev => ({ ...prev, [taskId]: finalUrl }));
    }
  };

  const handleRemoveTempUrl = (taskId) => {
    setTempMap(prev => {
      const newMap = { ...prev };
      delete newMap[taskId];
      return newMap;
    });
    setUrlInputs(prev => ({ ...prev, [taskId]: '' }));
  };

  const handleSaveChanges = () => {
    onSaveMap(tempMap);
    onBack();
  };

  const generateCodeSnippet = () => {
    const lines = Object.entries(tempMap)
      .filter(([_, url]) => url && url.trim() !== '')
      .map(([id, url]) => `  '${id}': '${url}',`);
    if (lines.length === 0) return "  // No links added yet";
    return lines.join('\n');
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fade-in bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Settings size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Teacher Access</h2>
          <p className="text-slate-500 mt-2">Please enter the password to manage audio links.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className={`w-full px-4 py-3 border ${error ? 'border-red-300 bg-red-50' : 'border-slate-300'} rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 text-center">Incorrect password. Please try again.</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onBack} className="flex-1 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">Unlock</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="text-blue-600" /> Manage Listening Audio
          </h2>
          <p className="text-slate-500 mt-1">Generate permanent code for your custom audio files.</p>
        </div>
        <button 
          onClick={handleSaveChanges} 
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
        >
          <CheckCircle size={18} /> Save Links & Return
        </button>
      </div>

      <div className="mb-8 p-6 bg-slate-800 rounded-2xl text-white shadow-lg border border-slate-700">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-amber-400">
          <AlertCircle size={20} /> How to make links permanent
        </h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Because Netlify is a static website host, links saved directly in your browser will vanish when the page refreshes for your students. To permanently share audio links with all your students across all browsers, you must paste your Dropbox links below, then copy the generated code and replace the <code>TEACHER_AUDIO_LINKS</code> dictionary at the very top of your <strong>App.jsx</strong> file in StackBlitz.
        </p>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 relative group">
          <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
{`// --- 🔴 TEACHER: PASTE YOUR PERMANENT AUDIO LINKS HERE 🔴 ---
// Because Netlify does not have a shared database, any link placed here 
// will be permanently available to all your students on all browsers.
const TEACHER_AUDIO_LINKS = {
${generateCodeSnippet()}
};
// -------------------------------------------------------------`}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {listeningTasks.map((task, index) => (
          <div key={task.id} className={`p-6 flex flex-col items-start justify-between gap-4 ${index !== listeningTasks.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="w-full flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-slate-800 text-lg">{task.id.toUpperCase()}: {task.title}</h4>
              </div>
            </div>
            
            <div className="w-full mt-2">
              {tempMap[task.id] ? (
                <div className="w-full animate-fade-in">
                  <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-blue-800 mb-1">Added to Code Generator!</p>
                      <p className="text-xs text-blue-700 truncate">{tempMap[task.id]}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveTempUrl(task.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
                      title="Remove from generator"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1"><Headphones size={14}/> Test Audio Connection:</p>
                    <CustomAudioPlayer src={tempMap[task.id]} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="url"
                    placeholder="Paste a Google Drive or Dropbox link here to test..."
                    value={urlInputs[task.id] || ''}
                    onChange={(e) => handleUrlChange(task.id, e.target.value)}
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow"
                  />
                  <button 
                    onClick={() => handleTestUrl(task.id)}
                    disabled={!urlInputs[task.id]}
                    className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                  >
                    <Play size={18} /> Add to Generator
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DailyFlashcards = ({ cards, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handleStatus = (status) => {
    updateFcStatus(cards[currentIndex].id, status);
    handleNext();
  };

  if (!cards || cards.length === 0) return null;
  const card = cards[currentIndex];

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col items-center">
      <div className="w-full mb-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center">Daily Flashcards</h2>
        <p className="text-slate-500 text-center mt-1">Review these {cards.length} key expressions to finish your set.</p>
      </div>

      <div 
        className="relative w-full max-w-lg h-80 perspective-1000 cursor-pointer group" 
        onClick={() => setIsFlipped(!isFlipped)}
      >
         <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            <div className="absolute inset-0 w-full h-full bg-slate-50 rounded-3xl shadow-sm border border-slate-200 backface-hidden flex flex-col items-center justify-center p-8 text-center group-hover:shadow-md transition-shadow">
               <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-full uppercase tracking-wider mb-6">
                 {card.category}
               </span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-800">{card.term}</h2>
               <div className="absolute bottom-6 flex items-center gap-2 text-slate-400 text-sm">
                 <ArrowRight size={16}/> Click to reveal meaning <ArrowLeft size={16}/>
               </div>
            </div>

            <div className="absolute inset-0 w-full h-full bg-indigo-600 rounded-3xl shadow-lg border border-indigo-700 backface-hidden flex flex-col items-center justify-center p-8 text-center rotate-y-180 text-white">
               <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                 "{card.context}"
               </p>
               <div className="bg-indigo-900/40 px-5 py-3 rounded-xl backdrop-blur-sm border border-indigo-500/30">
                 <p className="text-sm text-indigo-100 font-medium flex items-center gap-2">
                   <AlertCircle size={16}/> {card.grammar}
                 </p>
               </div>
            </div>
         </div>
      </div>

      {/* Interactive Assessment Controls */}
      <div className="h-16 flex items-center justify-center w-full mt-6 mb-4">
         {isFlipped ? (
           <div className="flex gap-4 animate-fade-in">
             <button onClick={(e) => { e.stopPropagation(); handleStatus('learning'); }} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-transform transform hover:scale-105">
                <span className="text-xl">🔄</span> Still Learning
             </button>
             <button onClick={(e) => { e.stopPropagation(); handleStatus('mastered'); }} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-transform transform hover:scale-105">
                <span className="text-xl">✅</span> I got it.
             </button>
           </div>
         ) : (
           <p className="text-slate-400 text-sm font-medium animate-pulse">Click the card to reveal the meaning!</p>
         )}
      </div>

      <div className="flex items-center gap-6 mt-2 mb-8">
        <span className="font-semibold text-slate-400">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      <button 
        onClick={onFinish}
        className="w-full max-w-sm px-6 py-4 bg-slate-800 text-white text-lg font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-md flex items-center justify-center gap-2"
      >
        <CheckCircle size={24} /> Complete Daily Set
      </button>
    </div>
  );
};

const FlashcardsApp = ({ onBack }) => {
  const [filter, setFilter] = useState('All Words'); // 'All Words', 'New', 'Learning', 'Mastered'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [fcProgress, setFcProgress] = useState(getFcProgress());

  // Filter the cards based on current tab selection
  const filteredCards = flashcardsData.filter(c => {
    const status = fcProgress[c.id] || 'new';
    if (filter === 'All Words') return true;
    if (filter === 'New' && status === 'new') return true;
    if (filter === 'Learning' && status === 'learning') return true;
    if (filter === 'Mastered' && status === 'mastered') return true;
    return false;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filter]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (filteredCards.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
      }
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (filteredCards.length > 0) {
        setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
      }
    }, 150);
  };

  const handleStatus = (status) => {
    if (filteredCards.length > 0) {
      const currentCard = filteredCards[currentIndex];
      updateFcStatus(currentCard.id, status);
      setFcProgress(getFcProgress()); // Refresh local state
      handleNext();
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-12">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="text-indigo-600" /> Grammar & Vocab Flashcards
          </h2>
          <p className="text-slate-500 mt-1">Review key expressions and structures from past exams.</p>
        </div>
        <button 
          onClick={onBack} 
          className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      {/* TABS FOR CATEGORIES */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['All Words', 'New', 'Learning', 'Mastered'].map(tab => (
          <button 
            key={tab}
            onClick={() => setFilter(tab)} 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === tab ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredCards.length === 0 ? (
        <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200 text-center flex flex-col items-center">
          <Award size={48} className="text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No cards here yet!</h3>
          <p className="text-slate-500 mt-2">Change your category tab to find more cards to review.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div 
            className="relative w-full max-w-lg h-80 perspective-1000 cursor-pointer group" 
            onClick={() => setIsFlipped(!isFlipped)}
          >
             <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                <div className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg border border-slate-100 backface-hidden flex flex-col items-center justify-center p-8 text-center group-hover:shadow-xl transition-shadow">
                   <span className="px-3 py-1 bg-indigo-50 text-indigo-600 font-semibold text-xs rounded-full uppercase tracking-wider mb-6">
                     {filteredCards[currentIndex]?.category}
                   </span>
                   <h2 className="text-4xl md:text-5xl font-bold text-slate-800">{filteredCards[currentIndex]?.term}</h2>
                   <div className="absolute bottom-6 flex items-center gap-2 text-slate-400 text-sm">
                     <ArrowRight size={16}/> Click to reveal meaning <ArrowLeft size={16}/>
                   </div>
                </div>

                <div className="absolute inset-0 w-full h-full bg-indigo-600 rounded-3xl shadow-lg border border-indigo-700 backface-hidden flex flex-col items-center justify-center p-8 text-center rotate-y-180 text-white">
                   <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                     "{filteredCards[currentIndex]?.context}"
                   </p>
                   <div className="bg-indigo-900/40 px-5 py-3 rounded-xl backdrop-blur-sm border border-indigo-500/30">
                     <p className="text-sm text-indigo-100 font-medium flex items-center gap-2">
                       <AlertCircle size={16}/> {filteredCards[currentIndex]?.grammar}
                     </p>
                   </div>
                </div>

             </div>
          </div>

          <div className="h-16 flex items-center justify-center w-full mt-6 mb-2">
             {isFlipped ? (
               <div className="flex gap-4 animate-fade-in">
                 <button onClick={(e) => { e.stopPropagation(); handleStatus('learning'); }} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-transform transform hover:scale-105">
                    <span className="text-xl">🔄</span> Still Learning
                 </button>
                 <button onClick={(e) => { e.stopPropagation(); handleStatus('mastered'); }} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-transform transform hover:scale-105">
                    <span className="text-xl">✅</span> I got it.
                 </button>
               </div>
             ) : (
               <p className="text-slate-400 text-sm font-medium animate-pulse">Click the card to reveal the meaning!</p>
             )}
          </div>

          <div className="flex items-center gap-6 mt-4">
            <button onClick={handlePrev} className="p-4 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 hover:text-indigo-600">
              <ArrowLeft size={24} />
            </button>
            <span className="font-semibold text-slate-500">
              {currentIndex + 1} / {filteredCards.length}
            </span>
            <button onClick={handleNext} className="p-4 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 hover:text-indigo-600">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SpeakingApp = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Mic className="text-purple-600" /> Speaking Practice
          </h2>
          <p className="text-slate-500 mt-1">Choose a speaking module to practice.</p>
        </div>
        <button 
          onClick={onBack} 
          className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <a href="https://docs.craft.do/editor/d/9afedc20-1f48-2a8b-e75f-adf59f3c88d9/83ED2C00-2D1D-41AF-86B9-E1D6800F6D34?s=X8KZSkgzyEDCT4Vy5XgyoCvS1biwoFiYNCWsR1qSCmJM" target="_blank" rel="noopener noreferrer" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Camera size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Picture Description</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">Practice talking about images, comparing, and contrasting to build fluency.</p>
          <span className="w-full py-4 bg-purple-50 text-purple-700 font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            Open Material <ExternalLink size={18}/>
          </span>
        </a>

        <a href="https://docs.craft.do/editor/d/9afedc20-1f48-2a8b-e75f-adf59f3c88d9/23B560C4-FC01-411D-BDFA-B5AFFEA20668?s=VqRDRqX4mT1JWseirwnUuqVHbBbsycw9SyFTUgTC8nBG" target="_blank" rel="noopener noreferrer" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-pink-400 hover:shadow-xl transition-all text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MessageSquare size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Role Play</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">Simulate real-life conversations and everyday situations with interactive scripts.</p>
          <span className="w-full py-4 bg-pink-50 text-pink-700 font-semibold rounded-xl flex items-center justify-center gap-2 group-hover:bg-pink-600 group-hover:text-white transition-colors">
            Open Material <ExternalLink size={18}/>
          </span>
        </a>
      </div>
    </div>
  );
};

const DailySummary = ({ day, scores, onFinish }) => {
  const safeReadingScore = Number(scores?.reading?.score) || 0;
  const safeReadingTotal = Number(scores?.reading?.total) || 0;
  const safeUoeScore = Number(scores?.useOfEnglish?.score) || 0;
  const safeUoeTotal = Number(scores?.useOfEnglish?.total) || 0;
  const safeListScore = Number(scores?.listening?.score) || 0;
  const safeListTotal = Number(scores?.listening?.total) || 0;

  const totalScore = safeReadingScore + safeUoeScore + safeListScore;
  const totalQuestions = safeReadingTotal + safeUoeTotal + safeListTotal;
  const percentage = totalQuestions === 0 ? 0 : Math.round((totalScore / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100 animate-fade-in text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 text-red-600 rounded-full mb-6 shadow-inner">
        <Award size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-800 mb-2">Day {day} Completed!</h2>
      <p className="text-xl text-slate-600 mb-8">Fantastic effort. Here is your daily breakdown:</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <BookOpen className="mx-auto text-red-500 mb-3" size={28}/>
          <p className="text-sm text-red-600 font-bold uppercase tracking-wider mb-1">Reading</p>
          <p className="text-3xl font-black text-red-800">{safeReadingScore}<span className="text-lg text-red-500">/{safeReadingTotal}</span></p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <Edit3 className="mx-auto text-blue-500 mb-3" size={28}/>
          <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">English</p>
          <p className="text-3xl font-black text-blue-800">{safeUoeScore}<span className="text-lg text-blue-500">/{safeUoeTotal}</span></p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <Headphones className="mx-auto text-green-500 mb-3" size={28}/>
          <p className="text-sm text-green-600 font-bold uppercase tracking-wider mb-1">Listening</p>
          <p className="text-3xl font-black text-green-800">{safeListScore}<span className="text-lg text-green-500">/{safeListTotal}</span></p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10">
        <p className="text-slate-500 font-medium uppercase tracking-widest text-sm mb-2">Total Daily Accuracy</p>
        <p className="text-5xl font-black text-slate-800">{percentage}%</p>
      </div>

      <button 
        onClick={onFinish}
        className="px-8 py-4 bg-slate-800 text-white text-lg font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
      >
        <ArrowLeft size={24} /> Return to Dashboard
      </button>
    </div>
  );
};

const DailySetRunner = ({ day, audioMap, onCompleteDay, onCancel }) => {
  const [step, setStep] = useState('reading');
  const [scores, setScores] = useState({ reading: null, useOfEnglish: null, listening: null });

  const safeDay = Number(day) || 1;
  
  // Exactly ONE test of each type per day!
  const readingTask = tasksDatabase.reading[(safeDay - 1) % tasksDatabase.reading.length];
  const uoeTask = tasksDatabase.useOfEnglish[(safeDay - 1) % tasksDatabase.useOfEnglish.length];
  const listeningTask = tasksDatabase.listening[(safeDay - 1) % tasksDatabase.listening.length];
  
  const startIndex = ((safeDay - 1) * 20) % flashcardsData.length;
  const dayFlashcards = [];
  for (let i = 0; i < 20; i++) {
     dayFlashcards.push(flashcardsData[(startIndex + i) % flashcardsData.length]);
  }

  const handleStepComplete = (taskType, score, total) => {
    setScores(prev => ({ ...prev, [taskType]: { score: Number(score) || 0, total: Number(total) || 0 } }));
    if (taskType === 'reading') setStep('useOfEnglish');
    if (taskType === 'useOfEnglish') setStep('listening');
    if (taskType === 'listening') setStep('flashcards');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-black shadow-inner">
            {safeDay}
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Daily Challenge Set</h2>
            <p className="text-xs text-slate-500">Complete all 4 steps</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 overflow-x-auto w-full md:w-auto">
          <span className={step === 'reading' ? 'text-red-600' : (scores.reading ? 'text-green-500' : '')}>1. Reading</span>
          <ArrowRight size={14}/>
          <span className={step === 'useOfEnglish' ? 'text-blue-600' : (scores.useOfEnglish ? 'text-green-500' : '')}>2. English</span>
          <ArrowRight size={14}/>
          <span className={step === 'listening' ? 'text-green-600' : (scores.listening ? 'text-green-500' : '')}>3. Listening</span>
          <ArrowRight size={14}/>
          <span className={step === 'flashcards' ? 'text-indigo-600' : ''}>4. Flashcards</span>
        </div>

        <button onClick={onCancel} className="text-xs text-slate-500 hover:text-slate-800 underline">Cancel Set</button>
      </div>

      {step === 'reading' && (
        <TaskRunner 
          key={`d${safeDay}-reading`}
          taskType="reading" 
          taskData={readingTask}
          audioMap={audioMap}
          onComplete={(s, t) => handleStepComplete('reading', s, t)}
          onSkip={() => handleStepComplete('reading', 0, readingTask.questions.length)}
          isDailySet={true}
        />
      )}
      
      {step === 'useOfEnglish' && (
        <TaskRunner 
          key={`d${safeDay}-uoe`}
          taskType="useOfEnglish" 
          taskData={uoeTask}
          audioMap={audioMap}
          onComplete={(s, t) => handleStepComplete('useOfEnglish', s, t)}
          onSkip={() => handleStepComplete('useOfEnglish', 0, uoeTask.questions.length)}
          isDailySet={true}
        />
      )}

      {step === 'listening' && (
        <TaskRunner 
          key={`d${safeDay}-list`}
          taskType="listening" 
          taskData={listeningTask}
          audioMap={audioMap}
          onComplete={(s, t) => handleStepComplete('listening', s, t)}
          onSkip={() => handleStepComplete('listening', 0, listeningTask.questions.length)}
          isDailySet={true}
        />
      )}

      {step === 'flashcards' && (
        <DailyFlashcards 
          cards={dayFlashcards} 
          onFinish={() => setStep('summary')} 
        />
      )}

      {step === 'summary' && (
        <DailySummary 
          day={safeDay} 
          scores={scores} 
          onFinish={() => onCompleteDay(safeDay, scores)} 
        />
      )}

    </div>
  );
};


const TaskRunner = ({ taskType, taskData, audioMap, onComplete, onSkip, isDailySet = false }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleInputChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const checkAnswers = () => {
    let currentScore = 0;
    if (taskData && taskData.questions) {
      taskData.questions.forEach(q => {
        const userAnswer = answers[q.id]?.trim().toLowerCase() || '';
        const correctAnswer = q.type === 'mc' ? q.correct.toLowerCase() : (q.answer || q.correct).toLowerCase();
        
        if (userAnswer === correctAnswer) {
          currentScore += 1;
        }
      });
    }
    setScore(currentScore);
    setIsSubmitted(true);
  };

  if (!taskData) return null;

  const renderReadingOrListeningTask = () => (
    <div className="space-y-6">
      {taskData.questions && taskData.questions.map((q, idx) => {
        const userAnswer = answers[q.id] || '';
        const isCorrect = userAnswer === q.correct;
        const showFeedback = isSubmitted;

        return (
          <div key={q.id} className={`p-5 rounded-xl border ${showFeedback ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-white border-slate-200'}`}>
            <p className="font-semibold text-slate-800 mb-3">{q.text}</p>
            <div className="space-y-2">
              {q.options && q.options.map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${userAnswer === opt ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:bg-slate-50 bg-white'}`}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={userAnswer === opt}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    disabled={isSubmitted}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-slate-700">{opt}</span>
                </label>
              ))}
            </div>
            
            {showFeedback && (
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <div className="flex items-start gap-2">
                  {isCorrect ? <CheckCircle className="text-green-600 mt-1" size={20}/> : <XCircle className="text-red-600 mt-1" size={20}/>}
                  <div>
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : `Incorrect. The right answer is: ${q.correct}`}
                    </p>
                    <p className="text-slate-600 text-sm mt-1">{q.explanation}</p>
                    <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
                       <MessageCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0"/>
                       <p className="text-sm text-blue-800 italic">{q.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderUseOfEnglishTask = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-lg leading-loose text-slate-700">
      {taskData.textParts && taskData.textParts.map((part, index) => {
        const q = taskData.questions && taskData.questions[index];
        if (!q) return <span key={`part-${index}`}>{part}</span>;
        
        const userAnswer = answers[q.id] || '';
        const isCorrect = isSubmitted && userAnswer.trim().toLowerCase() === q.answer.toLowerCase();
        const showFeedback = isSubmitted;

        return (
          <React.Fragment key={`frag-${index}`}>
            <span>{part}</span>
            <span className="inline-block mx-1 relative group">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                disabled={isSubmitted}
                className={`w-32 px-2 py-1 text-center font-semibold rounded-md border-b-2 outline-none transition-colors
                  ${showFeedback ? 
                    (isCorrect ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50') 
                    : 'border-slate-300 focus:border-blue-500 bg-slate-50'}`}
                placeholder={`(${index + 1})`}
              />
            </span>
          </React.Fragment>
        );
      })}
      
      {isSubmitted && taskData.questions && (
        <div className="mt-8 space-y-4">
          <h3 className="font-bold text-slate-800 text-xl border-b pb-2">Teacher's Feedback</h3>
          {taskData.questions.map((q, idx) => {
            const userAnswer = answers[q.id]?.trim().toLowerCase() || '';
            const isCorrect = userAnswer === q.answer.toLowerCase();
            return (
              <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-500">({idx + 1})</span>
                  <div>
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? `Correct! "${q.answer}"` : `Incorrect. You wrote "${userAnswer || '-'}". The correct word is "${q.answer}".`}
                    </p>
                    <p className="text-slate-600 text-sm mt-1">{q.explanation}</p>
                    <p className="text-blue-700 text-sm mt-2 italic flex items-center gap-1"><AlertCircle size={14}/> {q.tip}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className={`max-w-4xl mx-auto space-y-6 animate-fade-in ${!isDailySet ? 'pb-12' : ''}`}>
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{taskType === 'listening' ? 'Listening: ' + taskData.title : taskData.title}</h2>
            <p className="text-slate-500 mt-2">{taskData.instructions}</p>
          </div>
        </div>

        {taskType === 'reading' && (
          <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-lg whitespace-pre-line shadow-inner">
            {taskData.text}
          </div>
        )}

        {taskType === 'listening' && (
          <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
            <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg border border-slate-200">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Headphones size={24} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-slate-800 flex flex-wrap items-center gap-2">
                  Audio Track: {taskData.title}
                  {audioMap && audioMap[taskData.id] && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200 whitespace-nowrap">Custom URL Linked</span>}
                </p>
                <CustomAudioPlayer src={audioMap ? audioMap[taskData.id] : undefined} />
              </div>
            </div>
            <div className="mt-4 p-4 border border-amber-200 bg-amber-50 rounded-lg">
               <p className="text-sm text-amber-800 font-medium flex items-center gap-2 mb-2">
                 <AlertCircle size={16}/> Simulated Transcript Feature
               </p>
               <p className="text-xs text-amber-700 mb-4">
                 (Since this is a web simulation and the local MP3 file might not load, you can read the transcript below to complete the task, just like in the exam!)
               </p>
               <p className="text-slate-700 italic text-sm whitespace-pre-line border-l-4 border-amber-300 pl-4 py-2">
                 {taskData.transcript}
               </p>
            </div>
          </div>
        )}

        {taskType === 'useOfEnglish' ? renderUseOfEnglishTask() : renderReadingOrListeningTask()}

        {!isSubmitted ? (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={onSkip}
              className="px-6 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Skip {isDailySet ? 'Section' : 'Exercise'} <ArrowRight size={18} />
            </button>
            <button 
              onClick={checkAnswers}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <CheckCircle size={20} /> Check My Answers
            </button>
          </div>
        ) : (
          <div className="mt-8 flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-lg font-bold text-slate-800">
              Score: {score} / {taskData.questions ? taskData.questions.length : 0}
            </div>
            <button 
              onClick={() => onComplete(score, taskData.questions ? taskData.questions.length : 0, taskType)}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isDailySet ? 'Next Section →' : 'Finish Review & See Summary'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TaskSummary = ({ score, total, taskType, onHome, onNextTask }) => {
  const percentage = total === 0 ? 0 : (score / total) * 100;
  
  const getFeedback = () => {
    if (taskType === 'reading') {
      return {
        pros: ["You read the text carefully before answering.", "You demonstrated good understanding of the main ideas."],
        next: ["Practise finding specific synonyms in texts.", "Try scanning for detailed information faster."],
        suggestion: "Let's try a Use of English gap-fill next to test your grammar in context!"
      };
    } else if (taskType === 'useOfEnglish') {
      return {
        pros: ["You attempted all the gaps without giving up.", "You have a good feeling for sentence structure."],
        next: ["Review common phrasal verbs (like give away, come out).", "Pay attention to fixed collocations."],
        suggestion: "Next time, let's do a Reading task to see how vocabulary works in a longer text."
      };
    } else {
      return {
        pros: ["You extracted specific details from the audio/text.", "You handled the tricky options well."],
        next: ["Watch out for negative words that change meaning.", "Listen carefully to the first sentence of a response."],
        suggestion: "Let's move on to Use of English to practice word formation."
      };
    }
  };

  const feedback = getFeedback();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full mb-4">
          <Award size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Session Complete!</h2>
        <p className="text-xl text-slate-600 mt-2">You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{total}</span> ({percentage.toFixed(0)}%)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2"><CheckCircle size={18}/> Things you did well:</h3>
          <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
            {feedback.pros.map((pro, i) => <li key={i}>{pro}</li>)}
          </ul>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2"><Edit3 size={18}/> What to practise next:</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
            {feedback.next.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-8">
        <p className="text-slate-700 font-medium">Teacher's Suggestion:</p>
        <p className="text-slate-600 italic mt-1">"{feedback.suggestion}"</p>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={onHome} className="px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
          Back to Dashboard
        </button>
        <button onClick={onNextTask} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
          Try Another Activity
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ onSelectTask, progress, completedDays, onStartDay, onOpenFlashcards, onOpenSpeaking }) => {
  const calculatePercentage = (correct, total) => total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      
      {/* 30-Day Challenge Tracker Section */}
      <ChallengeTracker completedDays={completedDays} onStartDay={onStartDay} />
      
      {/* Overall Progress Tracker Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart2 size={22} className="text-blue-600" /> Skill Statistics
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(progress || {}).map(([key, stats]) => {
            const safeStats = stats || {};
            const correct = Number(safeStats.correctAnswers) || 0;
            const total = Number(safeStats.totalQuestions) || 0;
            const attempts = Number(safeStats.attempts) || 0;

            let bgClass = 'bg-slate-50 border-slate-100';
            let titleClass = 'text-slate-500';
            let valueClass = 'text-slate-800';
            let subClass = 'text-slate-400';

            if (key === 'reading') {
              bgClass = 'bg-red-50 border-red-100';
              titleClass = 'text-red-600';
              valueClass = 'text-red-800';
              subClass = 'text-red-500';
            } else if (key === 'useOfEnglish') {
              bgClass = 'bg-blue-50 border-blue-100';
              titleClass = 'text-blue-600';
              valueClass = 'text-blue-800';
              subClass = 'text-blue-500';
            } else if (key === 'listening') {
              bgClass = 'bg-green-50 border-green-100';
              titleClass = 'text-green-600';
              valueClass = 'text-green-800';
              subClass = 'text-green-500';
            }

            return (
              <div key={key} className={`${bgClass} rounded-xl p-4 border flex flex-col items-center text-center transition-colors`}>
                <div className={`text-sm font-semibold capitalize mb-1 ${titleClass}`}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className={`text-3xl font-bold my-1 ${valueClass}`}>
                  {calculatePercentage(correct, total)}%
                </div>
                <div className={`text-xs ${subClass}`}>
                  {correct}/{total} correct <br/> ({attempts} {attempts === 1 ? 'attempt' : 'attempts'})
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Practice Section */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Edit3 size={24} className="text-indigo-600"/> Interactive Practice
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button onClick={() => onSelectTask('reading')} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-red-300 hover:shadow-md transition-all text-left flex flex-col items-start">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Reading</h3>
          <p className="text-slate-500 text-xs mb-4">Texts & multiple choice.</p>
          <span className="text-red-600 font-medium text-xs mt-auto flex items-center gap-1 group-hover:text-red-700 transition-colors">Start <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/></span>
        </button>

        <button onClick={() => onSelectTask('useOfEnglish')} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col items-start">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <Edit3 size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">English Use</h3>
          <p className="text-slate-500 text-xs mb-4">Grammar & gap-fills.</p>
          <span className="text-blue-600 font-medium text-xs mt-auto flex items-center gap-1 group-hover:text-blue-700 transition-colors">Start <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/></span>
        </button>

        <button onClick={() => onSelectTask('listening')} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-green-300 hover:shadow-md transition-all text-left flex flex-col items-start">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <Headphones size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Listening</h3>
          <p className="text-slate-500 text-xs mb-4">Audio & comprehension.</p>
          <span className="text-green-600 font-medium text-xs mt-auto flex items-center gap-1 group-hover:text-green-700 transition-colors">Start <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/></span>
        </button>

        <button onClick={onOpenFlashcards} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all text-left flex flex-col items-start">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <Layers size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Flashcards</h3>
          <p className="text-slate-500 text-xs mb-4">Review vocab & grammar.</p>
          <span className="text-indigo-600 font-medium text-xs mt-auto flex items-center gap-1 group-hover:text-indigo-700 transition-colors">Study <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/></span>
        </button>
      </div>

      {/* Speaking Section */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8 flex items-center gap-2">
        <Mic size={24} className="text-purple-600"/> Speaking Practice
      </h3>
      <button 
        onClick={onOpenSpeaking} 
        className="w-full text-left group relative overflow-hidden bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-between mb-8 border-0"
      >
         <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
         
         <div className="flex items-center gap-4 relative z-10">
           <div className="p-4 bg-white/20 backdrop-blur-sm text-white rounded-xl group-hover:scale-110 transition-transform shadow-sm">
             <Mic size={32} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">Speaking Exam Prep</h3>
             <p className="text-fuchsia-100 text-sm font-medium">Practice Picture Description and Role-Play tasks.</p>
           </div>
         </div>
         <div className="text-white font-bold text-sm hidden sm:flex items-center gap-1 group-hover:text-fuchsia-100 transition-colors relative z-20">
           Open Module <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1"/>
         </div>
      </button>

      {/* Official Website Links */}
      <div className="mt-12 p-6 bg-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-white shadow-lg mb-6">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold">Official Past Papers</h3>
          <p className="text-slate-300 text-sm mt-1">Access the full archive of Hungarian Matura exams directly from the official website.</p>
        </div>
        <a href="https://www.oktatas.hu/kozneveles/erettsegi/feladatsorok" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors flex items-center gap-2 whitespace-nowrap">
          Visit oktatas.hu <ExternalLink size={18}/>
        </a>
      </div>

      {/* JB Studio Resources */}
      <div className="p-6 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl flex flex-col md:flex-row items-center justify-between text-white shadow-lg">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-bold">More from English Matura with JB</h3>
          <p className="text-blue-100 text-sm mt-1">Boost your prep with our dedicated podcast and comprehensive online course.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a href="https://englishmaturawithjb.org" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap border border-white/30">
            <Headphones size={18}/> Listen to Podcast
          </a>
          <a href="https://jbstudio.onlinecoursehost.com/courses/english-matura-guide" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
            <BookOpen size={18}/> View Full Course
          </a>
        </div>
      </div>

    </div>
  );
};

export default function App() {
  const [tailwindLoaded, setTailwindLoaded] = useState(false);

  useEffect(() => {
    if (window.tailwind) {
      setTailwindLoaded(true);
      return;
    }
    let script = document.getElementById('tailwind-cdn');
    if (!script) {
      script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      script.onload = () => setTailwindLoaded(true);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', () => setTailwindLoaded(true));
    }
  }, []);

  const [view, setView] = useState('home');
  const [activeTaskType, setActiveTaskType] = useState(null);
  const [activeTaskData, setActiveTaskData] = useState(null);
  const [latestScore, setLatestScore] = useState({ score: 0, total: 0 });
  const [currentDailyDay, setCurrentDailyDay] = useState(null);

  // Audio Links Tracker: Merges LocalStorage and Code (Code overrides LocalStorage if present)
  const [audioMap, setAudioMap] = useState(() => {
    let localMap = {};
    try {
      const saved = localStorage.getItem('maturaAudioMap');
      if (saved) localMap = JSON.parse(saved);
    } catch (e) {}
    return { ...localMap, ...TEACHER_AUDIO_LINKS };
  });

  const handleSaveAudioMap = (newMap) => {
    setAudioMap(newMap);
    try {
      localStorage.setItem('maturaAudioMap', JSON.stringify(newMap));
    } catch(e) {}
  };

  // 30-Day Challenge Tracker
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('maturaCompletedDaysV2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return [1]; // Start with Day 1 completed automatically
  });

  useEffect(() => {
    try {
      localStorage.setItem('maturaCompletedDaysV2', JSON.stringify(completedDays));
    } catch (e) {}
  }, [completedDays]);

  // Overall Statistics
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('maturaProgressTracker');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      reading: { totalQuestions: 0, correctAnswers: 0, attempts: 0 },
      useOfEnglish: { totalQuestions: 0, correctAnswers: 0, attempts: 0 },
      listening: { totalQuestions: 0, correctAnswers: 0, attempts: 0 }
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('maturaProgressTracker', JSON.stringify(progress));
    } catch (e) {}
  }, [progress]);

  const handleSelectTask = (type, currentTaskId = null) => {
    setActiveTaskType(type);
    const tasksOfType = tasksDatabase[type] || [];
    let availableTasks = tasksOfType;
    if (currentTaskId && tasksOfType.length > 1) {
      availableTasks = tasksOfType.filter(t => t.id !== currentTaskId);
    }
    
    if (availableTasks.length > 0) {
      const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
      setActiveTaskData(randomTask);
      setView('task');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTaskComplete = (score, total, completedTaskType) => {
    const typeToUpdate = completedTaskType || activeTaskType;
    setLatestScore({ score: Number(score) || 0, total: Number(total) || 0 });
    
    setProgress(prev => {
      const currentStats = prev[typeToUpdate] || { totalQuestions: 0, correctAnswers: 0, attempts: 0 };
      return {
        ...prev,
        [typeToUpdate]: {
          totalQuestions: currentStats.totalQuestions + (Number(total) || 0),
          correctAnswers: currentStats.correctAnswers + (Number(score) || 0),
          attempts: currentStats.attempts + 1
        }
      };
    });

    setView('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDay = (dayNum) => {
    setCurrentDailyDay(dayNum);
    setView('dailySet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteDailySet = (dayNum, dailyScores) => {
    setCompletedDays(prev => {
      if (!prev.includes(dayNum)) return [...prev, dayNum];
      return prev;
    });

    setProgress(prev => {
      const readingStats = prev.reading || { totalQuestions: 0, correctAnswers: 0, attempts: 0 };
      const uoeStats = prev.useOfEnglish || { totalQuestions: 0, correctAnswers: 0, attempts: 0 };
      const listStats = prev.listening || { totalQuestions: 0, correctAnswers: 0, attempts: 0 };

      return {
        reading: {
          totalQuestions: readingStats.totalQuestions + (Number(dailyScores?.reading?.total) || 0),
          correctAnswers: readingStats.correctAnswers + (Number(dailyScores?.reading?.score) || 0),
          attempts: readingStats.attempts + 1
        },
        useOfEnglish: {
          totalQuestions: uoeStats.totalQuestions + (Number(dailyScores?.useOfEnglish?.total) || 0),
          correctAnswers: uoeStats.correctAnswers + (Number(dailyScores?.useOfEnglish?.score) || 0),
          attempts: uoeStats.attempts + 1
        },
        listening: {
          totalQuestions: listStats.totalQuestions + (Number(dailyScores?.listening?.total) || 0),
          correctAnswers: listStats.correctAnswers + (Number(dailyScores?.listening?.score) || 0),
          attempts: listStats.attempts + 1
        }
      };
    });

    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToHome = () => {
    setView('home');
    setActiveTaskType(null);
    setActiveTaskData(null);
    setCurrentDailyDay(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!tailwindLoaded) {
    return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 font-sans selection:bg-blue-200">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 shadow-sm transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetToHome}>
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
               <BookOpen size={18} />
             </div>
             <span className="font-bold text-xl text-slate-800 tracking-tight hidden sm:block">English Matura with JB - Tutor</span>
             <span className="font-bold text-xl text-slate-800 tracking-tight sm:hidden">Matura Tutor</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setView('manage'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Settings size={18} /> <span className="hidden sm:inline">Manage Audio</span>
            </button>
            <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              A2-B1
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {view === 'home' && (
          <Dashboard 
            onSelectTask={handleSelectTask} 
            progress={progress} 
            completedDays={completedDays}
            onStartDay={handleStartDay}
            onOpenFlashcards={() => setView('flashcards')}
            onOpenSpeaking={() => setView('speaking')}
          />
        )}
        
        {view === 'dailySet' && currentDailyDay && (
          <DailySetRunner
            day={currentDailyDay}
            audioMap={audioMap}
            onCompleteDay={handleCompleteDailySet}
            onCancel={resetToHome}
          />
        )}

        {view === 'flashcards' && <FlashcardsApp onBack={resetToHome} />}
        {view === 'speaking' && <SpeakingApp onBack={resetToHome} />}
        
        {view === 'manage' && (
          <ManageAudio 
            onBack={resetToHome} 
            audioMap={audioMap} 
            onSaveMap={handleSaveAudioMap}
          />
        )}

        {view === 'task' && activeTaskData && (
          <TaskRunner 
            key={activeTaskData.id}
            taskType={activeTaskType} 
            taskData={activeTaskData}
            audioMap={audioMap}
            onComplete={handleTaskComplete}
            onSkip={() => handleSelectTask(activeTaskType, activeTaskData.id)}
          />
        )}

        {view === 'summary' && (
          <TaskSummary 
            score={latestScore?.score} 
            total={latestScore?.total} 
            taskType={activeTaskType}
            onHome={resetToHome}
            onNextTask={() => handleSelectTask(activeTaskType === 'reading' ? 'useOfEnglish' : 'reading')}
          />
        )}
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}