import type { Day } from "@/types";

export const days16to25: Day[] = [
  // ------------------------------------------------------------------
  // DAY 16: What is Artificial Intelligence?
  // ------------------------------------------------------------------
  {
    dayNumber: 16,
    title: "What is Artificial Intelligence?",
    phase: "theory",
    objectives: [
      "Explain what AI means in simple words",
      "Identify at least five AI tools used in everyday life",
      "List things AI is good at and things it struggles with",
    ],
    content: [
      { type: "heading", level: 2, text: "What is Artificial Intelligence?" },
      {
        type: "paragraph",
        text: "Artificial Intelligence, or AI, is when a computer program is built to do things that normally need human thinking. Examples include understanding speech, recognising a face in a photo, choosing the best move in a game, or deciding which video to recommend next. Instead of giving the computer a fixed list of steps, we give it lots of examples and let it learn patterns from them.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav to think of AI as a smart guesser. It does not 'know' things the way a human does. It predicts answers based on patterns it has seen before.",
      },
      { type: "heading", level: 2, text: "AI in Aarav's Daily Life" },
      {
        type: "paragraph",
        text: "Aarav has already used AI many times today without realising it. Here are common places AI shows up:",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Siri on the iPhone listens to his voice and figures out what he asked",
          "YouTube recommends cricket highlights because he watched a Virat Kohli video",
          "Google Maps finds the fastest route to school by checking live traffic",
          "Face unlock on the phone matches his face to the saved photo",
          "Spotify suggests songs similar to the ones he already likes",
          "Grammarly corrects spelling mistakes in his homework",
        ],
      },
      {
        type: "table",
        headers: ["AI Tool", "What It Does", "How It Learns"],
        rows: [
          ["Siri", "Understands spoken questions and answers", "Trained on millions of voice clips"],
          ["YouTube Recommendations", "Suggests videos you may like", "Learns from your watch history"],
          ["Google Maps", "Finds the fastest route", "Uses live traffic data from other phones"],
          ["Face Unlock", "Recognises your face", "Trained on thousands of face photos"],
          ["Spotify", "Recommends songs", "Learns from songs you skip or save"],
        ],
      },
      { type: "heading", level: 3, text: "What AI Can Do" },
      {
        type: "list",
        ordered: true,
        items: [
          "Recognise patterns in huge amounts of data faster than humans",
          "Translate between languages, like Hindi to English",
          "Generate text, images, and music based on a prompt",
          "Play games like chess at world champion level",
          "Predict things like weather, traffic, or cricket scores",
        ],
      },
      { type: "heading", level: 3, text: "What AI Cannot Do" },
      {
        type: "list",
        ordered: true,
        items: [
          "Feel emotions or truly understand what it is saying",
          "Make moral decisions on its own",
          "Know facts it was never trained on",
          "Be 100 percent correct all the time",
          "Replace human creativity and common sense",
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Thinking AI is a person. AI is just maths and code. It does not have feelings, opinions, or a real understanding of the words it produces.",
      },
      {
        type: "table",
        headers: ["Task", "Can AI do it?", "Why"],
        rows: [
          ["Translate a Hindi song to English", "Yes", "It has seen many language pairs"],
          ["Decide if a joke is funny", "Partly", "It can guess based on patterns but has no real sense of humour"],
          ["Care about your feelings", "No", "AI has no emotions"],
          ["Discover a brand new fact never written before", "No", "It can only recombine what it was trained on"],
        ],
      },
      {
        type: "mermaid",
        code: `graph TD;\n  A[User asks a question] --> B[AI looks for patterns]\n  B --> C[AI predicts best answer]\n  C --> D[User gets an answer]\n  D --> E[User feedback helps AI improve]`,
        caption: "How AI works in a simple loop",
      },
    ],
    explainToFriend:
      "AI is just a computer program that learns from examples instead of being told every step. Like how YouTube learns I love cricket and starts showing me more cricket videos. It is smart at finding patterns but it does not actually think or feel.",
    realWorldExamples: [
      "Siri answering questions on the iPhone",
      "Google Maps rerouting you around traffic",
      "Instagram filters that recognise your face",
      "Netflix recommending a Spider-Man movie because you watched Marvel films",
    ],
    thingsToGoogle: [
      "what is artificial intelligence for kids",
      "examples of AI in daily life",
      "what AI cannot do",
      "how does Siri work",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does AI stand for?",
        options: ["Automatic Internet", "Artificial Intelligence", "Advanced Instructions", "Algorithmic Input"],
        correct: 1,
        explanation: "AI stands for Artificial Intelligence.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which of these is NOT an example of AI in daily life?",
        options: ["YouTube recommending videos", "Google Maps finding a route", "A printed school textbook", "Face unlock on a phone"],
        correct: 2,
        explanation: "A printed textbook is just paper and ink. It does not learn or predict anything.",
      },
      {
        id: 3,
        type: "true-false",
        question: "AI can feel emotions like happiness or sadness.",
        correctBool: false,
        explanation: "AI has no feelings. It only processes data and patterns.",
      },
      {
        id: 4,
        type: "fill-blank",
        question: "Google Maps uses AI to find the ___ route to your destination.",
        answer: "fastest",
        explanation: "Google Maps looks at live traffic and picks the fastest route.",
      },
      {
        id: 5,
        type: "true-false",
        question: "AI is always 100 percent correct.",
        correctBool: false,
        explanation: "AI makes mistakes, especially when it has not seen enough examples or when the question is new to it.",
      },
    ],
    teacherNotes:
      "Start this lesson by asking Aarav to list every app he used today. Then help him sort which ones use AI. Keep the tone playful. Avoid heavy definitions. The key idea is that AI learns from data instead of following fixed rules. If he asks whether AI is dangerous, give a balanced answer: AI is a tool, like fire. Useful if used well, harmful if used carelessly.",
  },

  // ------------------------------------------------------------------
  // DAY 17: Machine Learning vs Deep Learning
  // ------------------------------------------------------------------
  {
    dayNumber: 17,
    title: "Machine Learning vs Deep Learning",
    phase: "theory",
    objectives: [
      "Define machine learning in simple terms",
      "Define deep learning and explain how it is different",
      "Give real examples of ML and DL",
      "Understand why deep learning needs more data and power",
    ],
    content: [
      { type: "heading", level: 2, text: "Machine Learning: Learning From Examples" },
      {
        type: "paragraph",
        text: "Machine Learning, or ML, is a part of AI where the computer learns from examples instead of being told exact rules. Imagine Aarav wants to teach a computer to recognise cricket balls. Instead of writing code like 'round shape, red colour, weighs 160 grams', he shows the computer 1000 photos of cricket balls and 1000 photos of other things. The computer finds the pattern on its own.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Easy way to remember",
        text: "Traditional programming: you give rules and data, the computer gives answers. Machine Learning: you give data and answers, the computer finds the rules.",
      },
      { type: "heading", level: 3, text: "How YouTube Learns Aarav Likes Cricket" },
      {
        type: "list",
        ordered: true,
        items: [
          "Aarav watches a Virat Kohli cover drive video",
          "YouTube logs that he watched it fully and liked it",
          "Next time he opens the app, YouTube shows more cricket videos",
          "If he skips football videos, YouTube learns to show less football",
          "Over time, the recommendations get better and better",
        ],
      },
      { type: "heading", level: 2, text: "Deep Learning: ML With Brain-Like Layers" },
      {
        type: "paragraph",
        text: "Deep Learning, or DL, is a special kind of ML that uses artificial neural networks with many layers. The word 'deep' refers to the many layers. Each layer looks at something different. The first layer might look at tiny edges, the next at shapes, the next at eyes or wheels, and the last layer decides what the object is.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav that all deep learning is machine learning, but not all machine learning is deep learning. It is like how all cricket is a sport, but not all sports are cricket.",
      },
      {
        type: "table",
        headers: ["Feature", "Machine Learning", "Deep Learning"],
        rows: [
          ["How it learns", "From features you define", "From raw data through many layers"],
          ["Data needed", "Works with less data", "Needs lots of data"],
          ["Computer power", "Runs on a normal laptop", "Often needs powerful GPUs"],
          ["Example", "Spam email filter", "Face unlock on iPhone"],
          ["Easy to explain?", "Usually yes", "Harder, it acts like a black box"],
        ],
      },
      { type: "heading", level: 3, text: "Real Example: Face Recognition" },
      {
        type: "paragraph",
        text: "When Aarav picks up his iPhone and it unlocks by looking at his face, that is deep learning. The phone has a neural network that was trained on millions of faces. It learned to spot tiny details like the distance between eyes, the shape of the nose, and the curve of the jaw. Old ML would struggle with this because faces are too complex for hand-picked rules.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Thinking ML and DL are completely different things. They are not. Deep learning is a subset of machine learning. It is just a more powerful version using neural networks.",
      },
      {
        type: "mermaid",
        code: `graph TD;\n  A["AI: Artificial Intelligence"] --> B["ML: Machine Learning"]\n  B --> C["DL: Deep Learning"]\n  C --> D[Neural Networks with many layers]`,
        caption: "AI contains ML, which contains DL",
      },
      { type: "heading", level: 3, text: "Quick Comparison" },
      {
        type: "list",
        ordered: false,
        items: [
          "ML example: Gmail detecting spam based on keywords",
          "DL example: Self-driving car recognising a stop sign in rain",
          "ML example: Predicting cricket score based on past matches",
          "DL example: Generating a Spider-Man image from a text prompt",
        ],
      },
    ],
    explainToFriend:
      "Machine learning is when a computer learns from examples, like how YouTube learns I love cricket by watching what I click. Deep learning is a fancier version that uses brain-like layers to learn hard things like recognising your face. Deep learning is just machine learning with extra layers.",
    realWorldExamples: [
      "YouTube recommending cricket videos based on what Aarav watches",
      "iPhone Face ID using deep learning to recognise his face",
      "Gmail using ML to filter spam emails",
      "Self-driving cars using DL to spot traffic lights and pedestrians",
    ],
    thingsToGoogle: [
      "difference between machine learning and deep learning",
      "how does YouTube recommendation algorithm work",
      "what is a neural network for kids",
      "Face ID how it works deep learning",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which is true?",
        options: ["ML and DL are the same thing", "DL is a type of ML", "ML is a type of DL", "They are completely unrelated"],
        correct: 1,
        explanation: "Deep learning is a special kind of machine learning that uses neural networks with many layers.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "What does the 'deep' in deep learning refer to?",
        options: ["How smart the AI is", "The number of layers in the neural network", "How deep the data is", "How much money it costs"],
        correct: 1,
        explanation: "Deep means the network has many layers stacked deep.",
      },
      {
        id: 3,
        type: "true-false",
        question: "Machine learning always needs someone to write exact rules for every case.",
        correctBool: false,
        explanation: "ML finds the rules itself from examples. That is the whole point.",
      },
      {
        id: 4,
        type: "fill-blank",
        question: "Face unlock on the iPhone uses ___ learning because faces are too complex for simple rules.",
        answer: "deep",
        explanation: "Face ID uses deep learning with neural networks.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which needs MORE data to work well?",
        options: ["Simple machine learning", "Deep learning", "Both need the same", "Neither needs data"],
        correct: 1,
        explanation: "Deep learning usually needs a lot more data to train its many layers.",
      },
    ],
    teacherNotes:
      "Use the cricket ball photo example. Show Aarav that a human can learn to spot a cricket ball from one example, but a computer needs many. Reinforce that deep learning is just ML with more layers. Avoid math. The main goal of this lesson is the difference between rules-based programming, ML, and DL. If Aarav asks about neural networks, tell him that is tomorrow's lesson.",
  },

  // ------------------------------------------------------------------
  // DAY 18: Neural Networks
  // ------------------------------------------------------------------
  {
    dayNumber: 18,
    title: "Neural Networks",
    phase: "theory",
    objectives: [
      "Describe what an artificial neuron is",
      "Explain the three main layers of a neural network",
      "Use the friends voting analogy to explain classification",
      "Trace how an image flows through a simple network",
    ],
    content: [
      { type: "heading", level: 2, text: "What is a Neural Network?" },
      {
        type: "paragraph",
        text: "A neural network is a computer program inspired by how the human brain works. The brain has billions of neurons that pass signals to each other. A neural network has artificial neurons, usually just called neurons, that pass numbers to each other. Together they learn to make decisions.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Be honest with Aarav. Artificial neurons are not real brain cells. They are just maths functions. But the idea of passing signals forward is similar to what brains do.",
      },
      { type: "heading", level: 3, text: "What is a Neuron?" },
      {
        type: "paragraph",
        text: "A single neuron takes some numbers as input, multiplies each by a weight, adds them up, and passes the result forward. Think of a weight as how important that input is. A high weight means 'this matters a lot'. A low weight means 'ignore this'.",
      },
      { type: "heading", level: 2, text: "The Three Layers" },
      {
        type: "list",
        ordered: true,
        items: [
          "Input Layer: takes in the raw data, like pixels of a photo",
          "Hidden Layers: do the thinking, each layer looks for different features",
          "Output Layer: gives the final answer, like 'car' or 'bike'",
        ],
      },
      {
        type: "table",
        headers: ["Layer", "Job", "Example for a Car Photo"],
        rows: [
          ["Input Layer", "Receives raw pixels", "Red pixel at position 1, blue pixel at position 2, and so on"],
          ["Hidden Layer 1", "Looks for simple features", "Are there round shapes?"],
          ["Hidden Layer 2", "Looks for combinations", "Round shapes plus metal texture plus wheels"],
          ["Output Layer", "Gives the final answer", "90 percent car, 10 percent bike"],
        ],
      },
      { type: "heading", level: 2, text: "The Friends Voting Analogy" },
      {
        type: "paragraph",
        text: "Imagine Aarav and his friends are looking at a photo and trying to decide if it is a cat or a dog. Each friend looks at one thing. Riya checks the ears. Kabir checks the tail. Samar checks the face shape. Each friend votes. The votes are added up and the group decides cat or dog.",
      },
      {
        type: "paragraph",
        text: "A neural network works the same way. Each neuron in a hidden layer is like one friend checking one feature. The output layer collects all the votes and gives the final answer.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why this analogy helps",
        text: "It shows that no single neuron knows the whole answer. The decision comes from many simple checks combined together.",
      },
      { type: "heading", level: 2, text: "Example: Is This Photo a Car or a Bike?" },
      {
        type: "paragraph",
        text: "Let us trace how a neural network decides whether a photo shows a car or a bike. The input is the image. The hidden layers ask simple questions like 'does it have round wheels?', 'is the shape boxy?', 'is it red or black?'. The output layer combines the answers and decides.",
      },
      {
        type: "mermaid",
        code: `graph TD;\n  A["Input Layer: Car Image"] --> B["Hidden Layer 1: Wheels?"]\n  A --> C["Hidden Layer 1: Shape?"]\n  A --> D["Hidden Layer 1: Color?"]\n  B --> E["Hidden Layer 2: Combine clues"]\n  C --> E\n  D --> E\n  E --> F["Output Layer: Car or Bike?"]`,
        caption: "Neural network classifying a car image",
      },
      { type: "heading", level: 3, text: "How the Network Learns" },
      {
        type: "list",
        ordered: true,
        items: [
          "First guess is usually wrong because weights start random",
          "The network compares its guess to the correct answer",
          "It tweaks the weights a tiny bit to be less wrong next time",
          "After thousands of tries, the weights become good enough to be accurate",
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Thinking neurons are smart. A single neuron is very simple. The magic happens when many simple neurons work together in layers.",
      },
    ],
    explainToFriend:
      "A neural network is like a group of friends voting. Each friend looks at one thing in a photo, like the wheels or the shape. Then they all vote, and the answer with the most votes wins. With enough friends and practice, the group gets really good at telling cars from bikes.",
    realWorldExamples: [
      "Face unlock on a phone using a neural network to recognise Aarav",
      "Google Photos grouping pictures of the same person automatically",
      "Self-driving cars using neural networks to spot pedestrians",
      "Minecraft AI mobs using simple networks to decide where to walk",
    ],
    thingsToGoogle: [
      "what is a neural network simple explanation",
      "neural network layers explained for kids",
      "how does a neuron work in AI",
      "neural network image classification example",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What are the three main layers of a neural network?",
        options: ["Start, middle, end", "Input, hidden, output", "Front, back, side", "Top, middle, bottom"],
        correct: 1,
        explanation: "The standard layers are input, hidden, and output.",
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The ___ layer receives the raw data, like the pixels of a photo.",
        answer: "input",
        explanation: "The input layer is where data enters the network.",
      },
      {
        id: 3,
        type: "true-false",
        question: "A single neuron can decide on its own whether a photo is a car or a bike.",
        correctBool: false,
        explanation: "A single neuron is too simple. The decision needs many neurons working together.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "In the friends voting analogy, what does each friend represent?",
        options: ["An entire network", "One neuron", "The output layer only", "The input layer only"],
        correct: 1,
        explanation: "Each friend is like one neuron checking one feature.",
      },
      {
        id: 5,
        type: "true-false",
        question: "The network starts with perfect weights and gets worse over time.",
        correctBool: false,
        explanation: "Weights start random and get better as the network learns from its mistakes.",
      },
    ],
    teacherNotes:
      "Use the friends voting analogy throughout. Let Aarav name the friends and decide what each one checks. This makes the abstract idea concrete. Avoid explaining backpropagation or gradient descent. Just say the network tweaks its weights to be less wrong. If he wants a demo, search for TensorFlow Playground together. It lets you watch a neural network learn in real time.",
  },

  // ------------------------------------------------------------------
  // DAY 19: Transformers and Attention
  // ------------------------------------------------------------------
  {
    dayNumber: 19,
    title: "Transformers and Attention",
    phase: "theory",
    objectives: [
      "Explain why older models struggled with long sentences",
      "Describe what attention means in transformers",
      "Understand that transformers process all words at once",
      "Give examples of transformer-based AI tools",
    ],
    content: [
      { type: "heading", level: 2, text: "The Problem With Old Models" },
      {
        type: "paragraph",
        text: "Before 2017, AI models that worked with language used a method called RNN, short for Recurrent Neural Network. RNNs read sentences one word at a time, left to right, like a person reading a book. This sounded natural, but it had a big problem.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Why RNNs struggled",
        text: "By the time an RNN reached the end of a long sentence, it had often forgotten what the first words were. Imagine Aarav reading a 50-word sentence and being asked what the first word was. Hard, right?",
      },
      {
        type: "paragraph",
        text: "Example: 'Aarav, who loves cricket and plays every Sunday with his friends from school, scored a century yesterday.' An RNN might forget that the subject is Aarav by the time it reaches 'scored'. So the sentence becomes hard to understand.",
      },
      { type: "heading", level: 2, text: "What is Attention?" },
      {
        type: "paragraph",
        text: "In 2017, researchers at Google published a paper called 'Attention Is All You Need'. They introduced a new architecture called the Transformer. The key idea is attention: instead of reading one word at a time, the model looks at all words at once and decides which words to pay attention to.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav that attention in transformers is not the same as paying attention in class. It is a maths trick that lets the model decide how much each word should connect to every other word.",
      },
      { type: "heading", level: 3, text: "Example: The Word 'It'" },
      {
        type: "paragraph",
        text: "Look at this sentence: 'The cat sat on the mat because it was tired.' What does 'it' refer to? A human knows it means the cat, not the mat. A transformer figures this out by paying attention to the right word.",
      },
      {
        type: "mermaid",
        code: `graph LR;\n  A[The] --> B[cat]\n  B --> C[sat]\n  C --> D[on]\n  D --> E[the]\n  E --> F[mat]\n  F --> G[because]\n  G --> H[it]\n  H --> I[was]\n  I --> J[tired]\n  H -. pays attention to .-> B\n  style H fill:#f9d0c4\n  style B fill:#bfe3bf`,
        caption: "The word 'it' pays attention to 'cat', not 'mat'",
      },
      {
        type: "paragraph",
        text: "The dotted line shows that 'it' pays the most attention to 'cat'. This is how the model knows 'it' means the cat. The mat cannot be tired, so attention weights are low for 'mat'.",
      },
      { type: "heading", level: 2, text: "Transformers Process All Words at Once" },
      {
        type: "paragraph",
        text: "Unlike RNNs that go word by word, transformers look at the whole sentence at the same time. This makes them much faster to train, especially on big computers with GPUs. It also means they can spot relationships between words that are far apart in the sentence.",
      },
      {
        type: "table",
        headers: ["Feature", "RNN", "Transformer"],
        rows: [
          ["Reading style", "One word at a time", "All words at once"],
          ["Long sentences", "Often forgets early words", "Handles them well"],
          ["Training speed", "Slow", "Fast, can be parallelised"],
          ["Attention", "No", "Yes, that is the key idea"],
          ["Used by", "Older translation tools", "GPT, Gemini, Claude, Llama"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why this matters",
        text: "Almost every modern AI text tool, including ChatGPT, Gemini, and Claude, is built on transformers. The 'T' in GPT stands for Transformer.",
      },
      { type: "heading", level: 3, text: "Famous Transformer-Based AI" },
      {
        type: "list",
        ordered: false,
        items: [
          "ChatGPT by OpenAI",
          "Gemini by Google",
          "Claude by Anthropic",
          "Llama by Meta",
          "Mistral by Mistral AI",
        ],
      },
    ],
    explainToFriend:
      "Older AI read sentences word by word and forgot the first word by the time it reached the end. Transformers fix this by looking at all words at once and deciding which words connect. Like in 'the cat sat on the mat because it was tired', the AI knows 'it' means cat, not mat, because it pays attention to the right word.",
    realWorldExamples: [
      "ChatGPT understanding long questions because of attention",
      "Google Translate handling full paragraphs between Hindi and English",
      "Grammarly spotting grammar mistakes across long emails",
      "Siri following multi-part commands like 'set a timer and send a message'",
    ],
    thingsToGoogle: [
      "what is attention in transformers",
      "Attention Is All You Need paper",
      "RNN vs transformer difference",
      "how does ChatGPT understand long sentences",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the 'T' in GPT stand for?",
        options: ["Translator", "Transformer", "Token", "Type"],
        correct: 1,
        explanation: "GPT stands for Generative Pre-trained Transformer.",
      },
      {
        id: 2,
        type: "true-false",
        question: "RNNs read sentences one word at a time.",
        correctBool: true,
        explanation: "RNN stands for Recurrent Neural Network and reads sequentially.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In the sentence 'the cat sat on the mat because it was tired', the word 'it' refers to the ___.",
        answer: "cat",
        explanation: "Attention lets the model connect 'it' to 'cat' because a cat can be tired but a mat cannot.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What is the main advantage of transformers over RNNs?",
        options: [
          "They use less computer power",
          "They process all words at once and handle long sentences well",
          "They are older and more trusted",
          "They do not use attention",
        ],
        correct: 1,
        explanation: "Transformers process all words at once and use attention, so they handle long sentences far better.",
      },
      {
        id: 5,
        type: "true-false",
        question: "Transformers can only read one word at a time, just like RNNs.",
        correctBool: false,
        explanation: "Transformers look at all words at once, which is what makes them fast and accurate.",
      },
    ],
    teacherNotes:
      "The attention example with 'cat' and 'mat' is the heart of this lesson. Read it slowly with Aarav and ask him what 'it' means before revealing the answer. Avoid explaining self-attention vs multi-head attention. Those are too advanced. The key takeaway is that transformers look at everything at once and connect the right words, which lets them understand long sentences better than older models.",
  },

  // ------------------------------------------------------------------
  // DAY 20: Large Language Models (LLMs)
  // ------------------------------------------------------------------
  {
    dayNumber: 20,
    title: "Large Language Models (LLMs)",
    phase: "theory",
    objectives: [
      "Define what a Large Language Model is",
      "Explain that LLMs predict the next word",
      "Decode the letters in GPT",
      "Name at least five popular LLMs and their makers",
    ],
    content: [
      { type: "heading", level: 2, text: "What is a Large Language Model?" },
      {
        type: "paragraph",
        text: "A Large Language Model, or LLM, is an AI trained on a huge amount of text from books, websites, articles, and code. 'Large' means it has billions of settings, called parameters, inside it. 'Language' means it works with words. 'Model' means it is a trained program that can make predictions.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav that an LLM is not a search engine. It does not look up answers. It generates text by predicting what word should come next, based on patterns it learned during training.",
      },
      { type: "heading", level: 2, text: "LLMs Predict the Next Word" },
      {
        type: "paragraph",
        text: "The core trick of an LLM is simple: predict the next word. Given 'Aarav loves to play', the model might say 'cricket' is the most likely next word, because in its training data, 'loves to play' is often followed by games like cricket.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Start with some text, like 'Aarav loves to play'",
          "The model predicts the most likely next word, like 'cricket'",
          "Add that word and repeat, now you have 'Aarav loves to play cricket'",
          "Keep going to generate full sentences and paragraphs",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why it feels so human",
        text: "Because LLMs were trained on so much human writing, the text they produce often sounds very human. But the model has no idea what the words mean. It just knows which words usually go together.",
      },
      { type: "heading", level: 2, text: "What Does GPT Stand For?" },
      {
        type: "paragraph",
        text: "GPT stands for 'Generative Pre-trained Transformer'. Each word means something:",
      },
      {
        type: "table",
        headers: ["Word", "Meaning"],
        rows: [
          ["Generative", "It generates new text, instead of just classifying existing data"],
          ["Pre-trained", "It was trained once on a huge pile of text, before you ever use it"],
          ["Transformer", "It uses the transformer architecture with attention"],
        ],
      },
      { type: "heading", level: 2, text: "Popular LLMs and Their Makers" },
      {
        type: "paragraph",
        text: "Many companies have built their own LLMs. They differ in size, training data, and strengths. Here are some of the most well-known:",
      },
      {
        type: "table",
        headers: ["LLM", "Maker", "Known For"],
        rows: [
          ["GPT (ChatGPT)", "OpenAI", "Being the first hugely popular chatbot"],
          ["Gemini", "Google", "Working well across text, images, and code"],
          ["Claude", "Anthropic", "Being careful and safe in its answers"],
          ["Llama", "Meta", "Being open source so anyone can download and use it"],
          ["Mistral", "Mistral AI", "Being small but very efficient"],
          ["DeepSeek", "DeepSeek", "Strong performance at lower cost"],
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Thinking all LLMs are the same. They are not. Some are better at math, some at coding, some at creative writing. Choosing the right one for the task matters.",
      },
      { type: "heading", level: 3, text: "Where Aarav Might Use LLMs" },
      {
        type: "list",
        ordered: false,
        items: [
          "Asking ChatGPT to explain a science topic in simple words",
          "Using Gemini to summarise a long YouTube video",
          "Getting Claude to help draft an email to his teacher",
          "Asking Llama to generate ideas for a Minecraft build",
        ],
      },
      {
        type: "mermaid",
        code: `graph LR;\n  A["Input: Aarav loves to play"] --> B["LLM predicts next word"]\n  B --> C[cricket]\n  C --> D["Input: Aarav loves to play cricket"]\n  D --> E["LLM predicts next word"]\n  E --> F[every evening]`,
        caption: "An LLM keeps predicting the next word to build a sentence",
      },
    ],
    explainToFriend:
      "An LLM is a giant AI that has read almost everything on the internet. It does not really understand words. It just predicts what word comes next, like a super smart autocomplete on your phone. GPT stands for Generative Pre-trained Transformer. Different companies like OpenAI, Google, and Meta each make their own LLM.",
    realWorldExamples: [
      "ChatGPT helping Aarav with homework questions",
      "Gemini summarising a long article in two lines",
      "Claude helping write a polite email to his cricket coach",
      "Llama generating ideas for a Minecraft castle",
    ],
    thingsToGoogle: [
      "what is a large language model",
      "what does GPT stand for",
      "ChatGPT vs Gemini vs Claude",
      "how do LLMs predict the next word",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the main job of an LLM?",
        options: ["Search the internet", "Predict the next word", "Translate videos", "Store large files"],
        correct: 1,
        explanation: "LLMs generate text by predicting the next word over and over.",
      },
      {
        id: 2,
        type: "fill-blank",
        question: "GPT stands for Generative Pre-trained ___.",
        answer: "Transformer",
        explanation: "The T in GPT stands for Transformer.",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Which company makes Gemini?",
        options: ["OpenAI", "Meta", "Google", "Anthropic"],
        correct: 2,
        explanation: "Gemini is made by Google.",
      },
      {
        id: 4,
        type: "true-false",
        question: "All LLMs are exactly the same in quality and ability.",
        correctBool: false,
        explanation: "Different LLMs have different strengths, sizes, and training data.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Who makes the open-source Llama model?",
        options: ["Meta", "Google", "OpenAI", "Mistral"],
        correct: 0,
        explanation: "Llama is made by Meta and is open source.",
      },
    ],
    teacherNotes:
      "Drive home the idea of next-word prediction. It is the most important concept of this entire week. Use the phone autocomplete analogy. When Aarav types 'I will be' on his phone and it suggests 'late', that is a tiny version of what an LLM does. The LLM is just way bigger and trained on way more text. Avoid talking about parameters in detail. Just say 'billions of internal settings'.",
  },

  // ------------------------------------------------------------------
  // DAY 21: Tokens, Context Window, Embeddings
  // ------------------------------------------------------------------
  {
    dayNumber: 21,
    title: "Tokens, Context Window, and Embeddings",
    phase: "theory",
    objectives: [
      "Explain what a token is and how text is split",
      "Define the context window and why it matters",
      "Describe embeddings as numbers that capture meaning",
      "Compare token counts for different words",
    ],
    content: [
      { type: "heading", level: 2, text: "What is a Token?" },
      {
        type: "paragraph",
        text: "Before an LLM can read text, it chops the text into small pieces called tokens. A token is usually a word or a piece of a word. The model does not see full words the way humans do. It sees tokens.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav that a token is like a slice of bread. A whole loaf is the sentence, but the model eats it one slice at a time.",
      },
      { type: "heading", level: 3, text: "Examples of Token Splitting" },
      {
        type: "table",
        headers: ["Word", "Token Count", "Tokens"],
        rows: [
          ["Aarav", "1 token", "Aarav"],
          ["cat", "1 token", "cat"],
          ["Unbelievable", "3 tokens", "un, believ, able"],
          ["hamburger", "3 tokens", "ham, bur, ger"],
          ["cricket", "1 token", "cricket"],
          ["Spider-Man", "3 tokens", "Spider, -, Man"],
        ],
      },
      {
        type: "paragraph",
        text: "Notice that common words like 'cat' and 'cricket' fit in one token, while longer or unusual words get split. The model decides where to split based on what it saw during training.",
      },
      { type: "heading", level: 2, text: "What is a Context Window?" },
      {
        type: "paragraph",
        text: "The context window is the maximum number of tokens an LLM can look at in one go. It includes both the input you give it and the output it produces. If the input is bigger than the context window, the model has to cut something off.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Think of it like this",
        text: "The context window is like Aarav's short-term memory. If a teacher says too many things at once, he can only remember the most recent ones. The same goes for the LLM.",
      },
      {
        type: "table",
        headers: ["Model", "Context Window", "What It Can Hold"],
        rows: [
          ["Old GPT-3", "2K tokens", "About 1500 words, a long essay"],
          ["GPT-4 Turbo", "128K tokens", "About 300 pages, a whole book"],
          ["Gemini 1.5 Pro", "Up to 2M tokens", "Several books and many videos"],
          ["Claude 3", "200K tokens", "A long novel with room to spare"],
        ],
      },
      {
        type: "paragraph",
        text: "A bigger context window lets you give the model longer documents, like a full cricket match commentary or a whole textbook chapter, and ask questions about them.",
      },
      { type: "heading", level: 2, text: "What are Embeddings?" },
      {
        type: "paragraph",
        text: "Computers only understand numbers. So before an LLM can work with tokens, it turns each one into a list of numbers called an embedding. The special thing about embeddings is that words with similar meanings get similar numbers.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Thinking embeddings are random numbers. They are not. They are carefully learned so that the distance between any two embeddings reflects how related the meanings are.",
      },
      { type: "heading", level: 3, text: "Example: Aarav Likes Cars" },
      {
        type: "paragraph",
        text: "Take the sentence 'Aarav likes cars'. The model splits it into tokens, then turns each token into a list of numbers. Those numbers capture meaning. For example, 'cars' would have embeddings close to 'bikes' and 'trucks' but far from 'pizza'.",
      },
      {
        type: "mermaid",
        code: `graph LR;\n  A["Sentence: Aarav likes cars"] --> B["Tokens: Aarav | likes | cars"]\n  B --> C["Embeddings:"]\n  C --> D["Aarav maps to [0.12, 0.85, 0.33, ...]"]\n  C --> E["likes maps to [0.71, 0.04, 0.92, ...]"]\n  C --> F["cars maps to [0.55, 0.79, 0.18, ...]"]`,
        caption: "From a sentence to tokens to embedding number lists",
      },
      { type: "heading", level: 3, text: "Why Embeddings Are Powerful" },
      {
        type: "list",
        ordered: false,
        items: [
          "The model can tell that 'king' and 'queen' are related",
          "It can tell that 'cricket' and 'football' are both sports",
          "It can tell that 'pizza' and 'burger' are both food",
          "It can spot that 'Spider-Man' and 'Iron Man' are both superheroes",
        ],
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "If Aarav wants a fun experiment, search for 'TensorFlow embedding projector' together. It shows words as dots in space, with similar words grouped together.",
      },
    ],
    explainToFriend:
      "Computers cannot read words, they only read numbers. So an LLM chops text into tokens, which are little pieces of words. The word 'Aarav' is one token, but 'Unbelievable' is three tokens: un, believ, able. Each token becomes a list of numbers called an embedding. Similar words like 'car' and 'bike' get similar numbers. The context window is how many tokens the model can look at once, like its short-term memory.",
    realWorldExamples: [
      "ChatGPT remembering your question because it fits in the context window",
      "Google Translate understanding that 'king' and 'queen' are related through embeddings",
      "Gemini summarising a 300-page book because its context window is huge",
      "Spotify grouping similar songs using embeddings of song features",
    ],
    thingsToGoogle: [
      "what is a token in LLM",
      "what is a context window in AI",
      "what are word embeddings explained simply",
      "GPT-4 context window size",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "How is the word 'Unbelievable' usually split into tokens?",
        options: ["1 token", "2 tokens: Unbeliev, able", "3 tokens: un, believ, able", "4 tokens: U, nbeliev, able, able"],
        correct: 2,
        explanation: "Long or unusual words get split into smaller pieces, often 3 tokens in this case.",
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The maximum number of tokens an LLM can handle at once is called the ___ window.",
        answer: "context",
        explanation: "This is the context window. Bigger is usually better.",
      },
      {
        id: 3,
        type: "true-false",
        question: "Embeddings are random numbers assigned to each word.",
        correctBool: false,
        explanation: "Embeddings are learned numbers where similar words get similar values.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which pair of words would have the most similar embeddings?",
        options: ["Pizza and Bicycle", "Cricket and Football", "Spider-Man and Pizza", "iPhone and River"],
        correct: 1,
        explanation: "Cricket and football are both sports, so their embeddings would be close.",
      },
      {
        id: 5,
        type: "true-false",
        question: "A bigger context window lets you give the LLM longer documents.",
        correctBool: true,
        explanation: "Yes, more tokens means more text the model can handle in one go.",
      },
    ],
    teacherNotes:
      "Use the bread-slice analogy for tokens, and the short-term memory analogy for context window. For embeddings, draw two clusters on paper: one for sports words, one for food words. Show that the distance between dots reflects meaning. Avoid explaining how embeddings are trained. The key idea is that similar words have similar number lists, which lets the model understand meaning, not just spellings.",
  },

  // ------------------------------------------------------------------
  // DAY 22: Prompt Engineering
  // ------------------------------------------------------------------
  {
    dayNumber: 22,
    title: "Prompt Engineering",
    phase: "theory",
    objectives: [
      "Tell the difference between a good and bad prompt",
      "Write specific, well-structured prompts",
      "Explain system prompts, few-shot, and zero-shot",
      "Describe how temperature changes the output",
    ],
    content: [
      { type: "heading", level: 2, text: "What is Prompt Engineering?" },
      {
        type: "paragraph",
        text: "Prompt engineering is the skill of writing clear instructions so that an LLM gives you the answer you want. The same model can give a poor answer or a great answer depending on how you ask. Think of it like asking a teacher a question: the clearer your question, the better the answer.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav that the model is not mind-reading. If the prompt is vague, the answer will be vague. If the prompt is specific, the answer will be sharp.",
      },
      { type: "heading", level: 2, text: "Bad Prompt vs Good Prompt" },
      {
        type: "paragraph",
        text: "A bad prompt looks like 'tell me about cars'. Why is this bad? It does not say what aspect of cars, what level of detail, or what format the answer should be in. The model might give a random essay. A good prompt looks like this:",
      },
      {
        type: "code",
        language: "text",
        code: "Explain the difference between petrol and electric cars in 3 bullet points, for a 13-year-old.",
        caption: "Good prompt: specific, structured, audience is clear",
      },
      {
        type: "table",
        headers: ["What Makes a Good Prompt", "Why It Helps"],
        rows: [
          ["Be specific about the topic", "The model knows exactly what to focus on"],
          ["Mention the format, like bullet points or a table", "The answer comes out ready to use"],
          ["State the audience, like a 13-year-old", "The language level is right"],
          ["Give length limits, like 3 points or 100 words", "The answer is not too long or too short"],
          ["Give examples if the task is tricky", "The model copies the pattern you showed"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Easy rule to remember",
        text: "Role, Task, Format, Audience. Tell the model who to be, what to do, how to format it, and who it is for.",
      },
      { type: "heading", level: 2, text: "System Prompts" },
      {
        type: "paragraph",
        text: "A system prompt is a hidden instruction given to the model before the user's question. It sets the model's behaviour for the whole conversation. For example, a system prompt might say 'You are a friendly cricket coach. Always answer in simple words and never use bad language.'",
      },
      {
        type: "code",
        language: "text",
        code: "System: You are a friendly cricket coach for kids.\nUser: How do I play a cover drive?\nAssistant: Great question! Let me break it down step by step...",
        caption: "System prompt sets the model's role",
      },
      { type: "heading", level: 2, text: "Zero-Shot vs Few-Shot" },
      {
        type: "paragraph",
        text: "Zero-shot means you give the model a task with no examples. You trust it to figure out the pattern from the instruction alone. Few-shot means you give the model a few examples first, so it can copy the style.",
      },
      {
        type: "table",
        headers: ["Type", "Examples Given", "When to Use"],
        rows: [
          ["Zero-shot", "No examples", "Simple, common tasks like 'summarise this'"],
          ["Few-shot", "2 to 5 examples", "Tricky tasks where the format matters a lot"],
        ],
      },
      {
        type: "code",
        language: "text",
        code: "Input: Spider-Man -> Output: Superhero\nInput: Iron Man -> Output: Superhero\nInput: Virat Kohli -> Output: Cricketer\nInput: iPhone -> Output:",
        caption: "Few-shot: the model learns the pattern from examples",
      },
      { type: "heading", level: 2, text: "Temperature: Precise vs Creative" },
      {
        type: "paragraph",
        text: "Temperature is a number, usually between 0 and 1, that controls how random the model's answers are. Low temperature means the model picks the most likely next word every time, so answers are precise and repeatable. High temperature means the model sometimes picks less likely words, so answers are more creative and varied.",
      },
      {
        type: "table",
        headers: ["Temperature", "Behaviour", "Best For"],
        rows: [
          ["0", "Very precise, same answer every time", "Maths, facts, code"],
          ["0.3", "Mostly precise, slight variety", "Summaries, explanations"],
          ["0.7", "Balanced", "Most everyday tasks"],
          ["1.0", "Very creative, different each time", "Stories, poems, brainstorming"],
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Using high temperature for factual questions. If you ask 'what is the capital of India' at temperature 1, you might get a creative but wrong answer. Use low temperature for facts.",
      },
      {
        type: "mermaid",
        code: `graph LR;\n  P["Prompt: Role + Task + Format + Audience"] --> L["LLM processes the prompt"]\n  L --> O["Structured Answer"]`,
        caption: "A good prompt flows through the LLM into a clean answer",
      },
    ],
    explainToFriend:
      "Prompt engineering is just asking the AI the right way. A bad prompt like 'tell me about cars' gives a vague answer. A good prompt like 'explain petrol vs electric cars in 3 bullet points for a 13-year-old' gives a sharp one. You can also give the AI examples first, called few-shot. And temperature controls if the AI is serious or creative.",
    realWorldExamples: [
      "A teacher using a clear prompt to get a lesson plan from ChatGPT",
      "A cricket coach asking an LLM for drills in bullet points for under-14 players",
      "A YouTuber using few-shot prompts to write video titles in a certain style",
      "A coder using temperature 0 to get reliable code from an LLM",
    ],
    thingsToGoogle: [
      "how to write good prompts for ChatGPT",
      "what is a system prompt",
      "zero-shot vs few-shot prompting",
      "what is temperature in LLM",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which is the better prompt?",
        options: [
          "tell me about cars",
          "Explain the difference between petrol and electric cars in 3 bullet points, for a 13-year-old",
          "cars info",
          "what is car",
        ],
        correct: 1,
        explanation: "The second one is specific, mentions the format, and names the audience.",
      },
      {
        id: 2,
        type: "true-false",
        question: "A system prompt is shown to the user as part of the answer.",
        correctBool: false,
        explanation: "A system prompt is a hidden instruction that sets the model's behaviour behind the scenes.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "Giving the model a few examples before the task is called ___-shot prompting.",
        answer: "few",
        explanation: "Few-shot means giving a few examples. Zero-shot means no examples.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which temperature is best for factual answers like maths?",
        options: ["0", "0.7", "1", "2"],
        correct: 0,
        explanation: "Temperature 0 gives the most precise and repeatable answers, ideal for facts.",
      },
      {
        id: 5,
        type: "true-false",
        question: "A vague prompt usually gives a sharp, specific answer.",
        correctBool: false,
        explanation: "Vague prompts lead to vague answers. Specific prompts lead to sharp answers.",
      },
    ],
    teacherNotes:
      "Have Aarav write the same question two ways and compare answers from an LLM. This makes the power of prompt engineering obvious. Stress the Role, Task, Format, Audience rule. For temperature, do a live demo: ask the model the same creative question at temperature 0 and 1, and let him see the difference. Avoid going into probability math. Just say low means safe, high means surprising.",
  },

  // ------------------------------------------------------------------
  // DAY 23: Hallucinations, RAG, Fine-tuning
  // ------------------------------------------------------------------
  {
    dayNumber: 23,
    title: "Hallucinations, RAG, and Fine-tuning",
    phase: "theory",
    objectives: [
      "Explain what an AI hallucination is",
      "Understand why LLMs sometimes make things up",
      "Describe how RAG fixes hallucinations",
      "Describe how fine-tuning customises a model",
    ],
    content: [
      { type: "heading", level: 2, text: "What is a Hallucination?" },
      {
        type: "paragraph",
        text: "A hallucination is when an AI confidently says something that is wrong. The model does not know it is wrong. It just predicts words that sound plausible. For example, if you ask an LLM for a famous book about cricket by an Indian author, it might invent a title that does not exist, complete with a fake author and a fake publisher.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Trusting every confident answer from an LLM. Just because the model sounds sure does not mean it is correct. Always check important facts.",
      },
      { type: "heading", level: 3, text: "Why Do LLMs Hallucinate?" },
      {
        type: "list",
        ordered: true,
        items: [
          "LLMs predict the next plausible word, they do not look up facts",
          "If the training data did not include the answer, the model fills the gap with something that sounds right",
          "Vague prompts encourage the model to guess",
          "Questions about very recent events confuse the model if it was trained before those events",
        ],
      },
      {
        type: "paragraph",
        text: "Example: If Aarav asks 'who won the cricket match yesterday', the model might give a score that sounds realistic but is completely made up, because it has no live data and just guesses based on past patterns.",
      },
      { type: "heading", level: 2, text: "RAG: Retrieval-Augmented Generation" },
      {
        type: "paragraph",
        text: "RAG stands for Retrieval-Augmented Generation. It is a clever way to reduce hallucinations. Instead of letting the model guess, you first search a database of real documents, then give those documents to the model as context. The model reads them and answers based on what it sees.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Tell Aarav that RAG is like an open-book exam. Instead of answering from memory, the model gets to look at the right pages before answering.",
      },
      {
        type: "mermaid",
        code: `graph TD;\n  A["User Query: What is the favourite food of Aarav?"] --> B["Search Database of Real Documents"]\n  B --> C["Found: Aarav loves pizza"]\n  C --> D["Inject Context into Prompt"]\n  D --> E["LLM Reads Context"]\n  E --> F["Answer: Aarav loves pizza"]`,
        caption: "RAG: search real documents first, then answer",
      },
      { type: "heading", level: 2, text: "Fine-tuning: Customising a Model" },
      {
        type: "paragraph",
        text: "Fine-tuning means taking a pre-trained model and training it a bit more on specific data. This makes the model better at a particular task. For example, a company might fine-tune an LLM on its old customer support chats so the model learns to answer in the company's style.",
      },
      {
        type: "mermaid",
        code: `graph TD;\n  A["Training Data: 1000 cricket coaching chats"] --> B["Update Model Weights"]\n  B --> C["Fine-tuned LLM"]\n  C --> D["Answer: in cricket coach style"]`,
        caption: "Fine-tuning: train further on specific data",
      },
      {
        type: "paragraph",
        text: "Notice the difference. RAG adds documents at the moment you ask the question. Fine-tuning changes the model itself by training it further ahead of time. RAG is like giving the model a reference book. Fine-tuning is like sending the model to a training camp.",
      },
      {
        type: "table",
        headers: ["Feature", "RAG", "Fine-tuning"],
        rows: [
          ["When it happens", "At question time", "Ahead of time, during training"],
          ["Changes the model?", "No", "Yes, weights are updated"],
          ["Best for", "Fresh or changing facts", "Stable style or domain knowledge"],
          ["Example", "Looking up today's cricket score", "Speaking like a cricket coach"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Easy way to remember",
        text: "RAG gives the model a notebook to peek at. Fine-tuning teaches the model new habits that stay in its head.",
      },
      { type: "heading", level: 3, text: "Real-Life Examples" },
      {
        type: "list",
        ordered: false,
        items: [
          "A school uses RAG so its chatbot can answer questions from the school handbook",
          "A cricket academy fine-tunes an LLM on its coaching notes",
          "A hospital uses RAG to look up medical guidelines before answering",
          "A food delivery app fine-tunes a model to sound cheerful and short",
        ],
      },
    ],
    explainToFriend:
      "Sometimes the AI confidently says something totally wrong. That is called a hallucination. It happens because the AI just guesses the next plausible word and does not actually check facts. RAG fixes this by searching real documents first and then answering. Fine-tuning is different. It trains the model more on specific data so it gets better at one task, like talking like a cricket coach.",
    realWorldExamples: [
      "ChatGPT inventing a fake book title when asked for a rare reference",
      "A company chatbot using RAG to answer from its own help pages",
      "A legal AI fine-tuned on past case documents",
      "A cricket app fine-tuned to write match summaries in a sporty tone",
    ],
    thingsToGoogle: [
      "what is AI hallucination",
      "what is RAG retrieval augmented generation",
      "what is fine-tuning in LLM",
      "RAG vs fine-tuning difference",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is an AI hallucination?",
        options: [
          "When the AI sees things that are not there",
          "When the AI confidently gives wrong information",
          "When the AI refuses to answer",
          "When the AI crashes",
        ],
        correct: 1,
        explanation: "A hallucination is when the model confidently says something that is wrong.",
      },
      {
        id: 2,
        type: "true-false",
        question: "LLMs hallucinate because they look up facts and get them wrong.",
        correctBool: false,
        explanation: "LLMs do not look up facts. They predict plausible words, which is why they can sound right but be wrong.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "RAG stands for Retrieval-___ Generation.",
        answer: "Augmented",
        explanation: "RAG is Retrieval-Augmented Generation.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which technique updates the model's weights?",
        options: ["RAG", "Fine-tuning", "Prompt engineering", "Temperature"],
        correct: 1,
        explanation: "Fine-tuning trains the model further and updates its internal weights.",
      },
      {
        id: 5,
        type: "true-false",
        question: "RAG is best for facts that change often, like today's cricket score.",
        correctBool: true,
        explanation: "Yes, RAG can look up fresh documents each time, so it suits changing facts.",
      },
    ],
    teacherNotes:
      "Use the open-book exam analogy for RAG and the training camp analogy for fine-tuning. Both are powerful but solve different problems. Have Aarav imagine he is building a school chatbot. Ask him: would you use RAG or fine-tuning? The answer is usually RAG for the school handbook, because the handbook changes. Avoid technical talk about vector databases. Just say 'the system searches a database of real documents'.",
  },

  // ------------------------------------------------------------------
  // DAY 24: AI Agents and Tool Calling
  // ------------------------------------------------------------------
  {
    dayNumber: 24,
    title: "AI Agents and Tool Calling",
    phase: "theory",
    objectives: [
      "Explain what an AI agent is",
      "Describe how an agent differs from a regular LLM",
      "Understand what tool calling means",
      "Trace the flow of an agent using a tool",
    ],
    content: [
      { type: "heading", level: 2, text: "What is an AI Agent?" },
      {
        type: "paragraph",
        text: "An AI agent is an LLM that can take actions, not just generate text. A regular LLM can talk. An agent can also use tools, like searching the web, running code, sending an email, or calling an API. Think of it like this: a regular LLM is a friend who can chat. An agent is a friend who can also pick up the phone, use a calculator, and open apps for you.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Use the smartphone analogy. The LLM is the brain. Tools are the apps on the phone. The agent is the whole package: brain plus apps plus the ability to switch between them.",
      },
      {
        type: "table",
        headers: ["Regular LLM", "AI Agent"],
        rows: [
          ["Only generates text", "Generates text and takes actions"],
          ["Cannot check live data", "Can search the web or call APIs"],
          ["Cannot run code", "Can run code and use a calculator"],
          ["Example: ChatGPT in basic chat mode", "Example: ChatGPT with web search and code interpreter"],
        ],
      },
      { type: "heading", level: 2, text: "What is Tool Calling?" },
      {
        type: "paragraph",
        text: "Tool calling means the LLM outputs an instruction to use a tool, instead of trying to answer from memory. For example, if Aarav asks 'what is the weather in Delhi today', the LLM does not guess. It outputs something like 'call the weather tool with city=Delhi'. A small program runs the tool, gets the result, and gives it back to the LLM. The LLM then writes a friendly answer for Aarav.",
      },
      {
        type: "code",
        language: "text",
        code: 'User: What is the weather in Delhi today?\nLLM thinks: I do not know live weather. Let me call the weather tool.\nLLM outputs: call weather_tool(city="Delhi")\nTool returns: { temp: 32, condition: "sunny" }\nLLM answers: It is 32 degrees and sunny in Delhi today.',
        caption: "How tool calling works step by step",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Thinking the LLM runs the tool itself. It does not. The LLM only outputs the instruction. A separate program reads that instruction, runs the tool, and feeds the result back.",
      },
      { type: "heading", level: 2, text: "How an Agent Uses a Tool" },
      {
        type: "paragraph",
        text: "Here is the full flow when Aarav asks about the weather in Delhi:",
      },
      {
        type: "mermaid",
        code: `sequenceDiagram\n  participant U as User\n  participant L as LLM\n  participant T as Weather Tool\n  U->>L: What is the weather in Delhi?\n  L->>T: call weather_tool(city="Delhi")\n  T->>L: { temp: 32, condition: "sunny" }\n  L->>U: It is 32 degrees and sunny in Delhi today.`,
        caption: "Agent flow: User, LLM, and a weather tool",
      },
      { type: "heading", level: 3, text: "Common Tools Agents Use" },
      {
        type: "list",
        ordered: false,
        items: [
          "Web search tool to look up fresh information",
          "Calculator tool for accurate maths",
          "Code interpreter to run Python and other languages",
          "Weather API to fetch live weather",
          "Calendar tool to check or create events",
          "Email tool to send messages on the user's behalf",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why this is powerful",
        text: "Without tools, an LLM is stuck with what it learned during training. With tools, it can do things in the real world: check live scores, run code, send messages, and more.",
      },
      { type: "heading", level: 3, text: "Where Aarav Might See Agents" },
      {
        type: "list",
        ordered: false,
        items: [
          "ChatGPT browsing the web to answer a question about yesterday's cricket match",
          "Siri setting a reminder and sending a message in one command",
          "A coding agent like Cursor writing and running code in his project",
          "A travel agent AI booking a flight by calling an airline API",
        ],
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Safety note",
        text: "Tell Aarav that agents can be very useful but also risky. Always check what actions the agent is allowed to take, especially for things like sending emails or spending money.",
      },
    ],
    explainToFriend:
      "A regular LLM only talks. An agent is an LLM that can also take actions. It is like the difference between a friend who can chat and a friend who can also use your phone, calculator, and apps. Tool calling is when the LLM says 'I do not know, let me call the weather tool' and a small program runs that tool and brings back the answer. Then the LLM gives you a friendly reply.",
    realWorldExamples: [
      "ChatGPT browsing the web to find yesterday's cricket score",
      "Siri setting a timer and sending a text message in one go",
      "Cursor agent writing and running code in Aarav's Python project",
      "A travel AI booking a flight by calling an airline API",
    ],
    thingsToGoogle: [
      "what is an AI agent",
      "what is tool calling in LLM",
      "ChatGPT function calling explained",
      "AI agent vs LLM difference",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the main difference between a regular LLM and an AI agent?",
        options: ["Agents are bigger", "Agents can take actions and use tools", "Agents are slower", "Agents are older"],
        correct: 1,
        explanation: "An agent can take actions and call tools, while a regular LLM only generates text.",
      },
      {
        id: 2,
        type: "true-false",
        question: "The LLM itself runs the weather API to fetch live data.",
        correctBool: false,
        explanation: "The LLM only outputs the instruction to call the tool. A separate program runs it and returns the result.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "When the LLM outputs an instruction like 'call weather_tool(city=Delhi)', this is called ___ calling.",
        answer: "tool",
        explanation: "This is tool calling, also known as function calling.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which of these is a tool an agent might use?",
        options: ["A dictionary book", "A web search tool", "A pencil", "A printer only"],
        correct: 1,
        explanation: "Agents often use web search, calculators, code interpreters, and APIs.",
      },
      {
        id: 5,
        type: "true-false",
        question: "Agents are useful because they can work with live data, not just what the LLM was trained on.",
        correctBool: true,
        explanation: "Yes, tools let agents access fresh data and take real actions.",
      },
    ],
    teacherNotes:
      "Use the smartphone analogy: the LLM is the brain, tools are the apps, the agent is the whole package. Walk through the sequence diagram slowly. Point out that the LLM does not actually run the tool. It just outputs the instruction. This is a common point of confusion. Mention safety: agents that can send emails or spend money need careful permission settings. Avoid explaining function schemas in detail. Just say the model is given a list of tools it is allowed to call.",
  },

  // ------------------------------------------------------------------
  // DAY 25: Software Concepts for AI
  // ------------------------------------------------------------------
  {
    dayNumber: 25,
    title: "Software Concepts for AI",
    phase: "theory",
    objectives: [
      "Explain what a REST API is using the restaurant analogy",
      "Read and write simple JSON",
      "Tell apart GET and POST requests",
      "Understand API keys and environment variables",
    ],
    content: [
      { type: "heading", level: 2, text: "What is a REST API?" },
      {
        type: "paragraph",
        text: "A REST API is a way for two computer programs to talk to each other over the internet. Think of it like a restaurant. Aarav is the customer. The menu lists what he can order. The waiter takes his order to the kitchen. The kitchen prepares the food. The waiter brings it back. In software terms, Aarav's Python code is the customer, the menu is the list of API endpoints, the order is an HTTP request, and the food is the response.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Teaching tip",
        text: "Act out the restaurant scene. Aarav plays the customer, you play the waiter, an imaginary kitchen plays the server. This makes the abstract idea of an API feel real.",
      },
      {
        type: "table",
        headers: ["Restaurant", "Software"],
        rows: [
          ["Customer", "Client (your Python code)"],
          ["Menu", "List of API endpoints"],
          ["Order", "HTTP request"],
          ["Waiter", "The internet, carrying the request"],
          ["Kitchen", "Server (like OpenRouter)"],
          ["Food on the table", "HTTP response"],
        ],
      },
      { type: "heading", level: 2, text: "JSON: The Language of APIs" },
      {
        type: "paragraph",
        text: "JSON stands for JavaScript Object Notation. It is a simple way to write data that both humans and computers can read. JSON looks a lot like Python dictionaries, using curly braces for objects and square brackets for lists. Almost every modern API, including AI servers, sends and receives data in this format.",
      },
      {
        type: "code",
        language: "json",
        code: '{\n  "name": "Aarav",\n  "age": 13,\n  "hobbies": ["cricket", "Minecraft", "coding"],\n  "favourite_food": "pizza"\n}',
        caption: "A simple JSON object describing Aarav",
      },
      { type: "heading", level: 2, text: "HTTP Methods: GET and POST" },
      {
        type: "paragraph",
        text: "HTTP methods tell the server what kind of action you want. The two most common are GET, which reads or fetches data (like getting today's cricket score), and POST, which sends new data to the server (like sending a prompt to an LLM and getting an answer back).",
      },
      {
        type: "table",
        headers: ["Method", "What It Does", "Example"],
        rows: [
          ["GET", "Read or fetch data", "Get today's cricket score from an API"],
          ["POST", "Send new data to the server", "Send a prompt to an LLM and get an answer"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Easy way to remember",
        text: "GET is like reading a menu. POST is like placing an order. You read with GET, you send with POST.",
      },
      { type: "heading", level: 2, text: "Clients, Servers, and API Keys" },
      {
        type: "paragraph",
        text: "In the AI world, the client is usually Aarav's Python code running on his laptop. The server is a powerful computer somewhere else, like OpenRouter or OpenAI, that runs the actual LLM. To prove who is making the request, the client sends an API key: a secret string of letters and numbers that acts like a gym membership card. Without the right key, the server refuses to answer.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Sharing your API key in a public GitHub repo or a Discord server. Anyone with the key can use your account, often spending your money. Keep it secret.",
      },
      {
        type: "paragraph",
        text: "The safe way to store an API key is in an environment variable: a value kept outside your code, on the computer itself. Your code can read it, but it is never written inside your Python file.",
      },
      {
        type: "code",
        language: "python",
        code: 'import os\n\n# Read the API key from an environment variable\napi_key = os.environ.get("OPENROUTER_API_KEY")\n\nprint("My API key starts with:", api_key[:6])',
        caption: "Reading a secret safely with an environment variable",
      },
      { type: "heading", level: 2, text: "The Full Flow: From Python to AI Server and Back" },
      {
        type: "paragraph",
        text: "Here is the full sequence when Aarav's Python code asks an AI server a question. The client sends an HTTP POST request with a JSON body and the API key. The server checks the key, runs the LLM, and sends back an HTTP response, also in JSON.",
      },
      {
        type: "mermaid",
        code: `sequenceDiagram\n  participant C as Client Python\n  participant S as Server OpenRouter\n  C->>S: HTTP POST request with JSON body and API key\n  S->>S: Check API key and run the LLM\n  S->>C: HTTP response with the answer in JSON`,
        caption: "Client and server exchange over HTTP",
      },
    ],
    explainToFriend:
      "A REST API is how two programs talk over the internet. Think of a restaurant. You are the customer, the menu is the list of things you can ask for, the waiter carries your order, and the kitchen sends back the food. In code, your Python sends an HTTP request, the server sends back a response, usually in JSON format. GET means read, POST means send. An API key is like a membership card that proves who you are. You store it in an environment variable so it stays secret.",
    realWorldExamples: [
      "Aarav's Python code calling OpenRouter to get an answer from an LLM",
      "A weather app on the iPhone calling a weather API to show today's forecast",
      "A cricket score app fetching live scores from a sports API",
      "A food delivery app sending an order to a restaurant API",
    ],
    thingsToGoogle: [
      "what is a REST API simple explanation",
      "what is JSON format",
      "GET vs POST HTTP methods",
      "how to use API keys safely with environment variables",
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "In the restaurant analogy, what is the kitchen?",
        options: ["The client", "The server", "The menu", "The waiter"],
        correct: 1,
        explanation: "The kitchen prepares the food, just like the server processes the request and sends back a response.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which HTTP method is used to send new data to a server?",
        options: ["GET", "POST", "FETCH", "SEND"],
        correct: 1,
        explanation: "POST is used to send data. GET is used to read data.",
      },
      {
        id: 3,
        type: "true-false",
        question: "JSON looks similar to a Python dictionary.",
        correctBool: true,
        explanation: "Yes, JSON uses curly braces and key-value pairs, just like a Python dict.",
      },
      {
        id: 4,
        type: "fill-blank",
        question: "An API ___ is like a membership card that proves who you are.",
        answer: "key",
        explanation: "An API key is a secret string that authenticates your requests.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Where should you store your API key?",
        options: ["Inside your Python code", "In a public GitHub repo", "In an environment variable", "In a chat message"],
        correct: 2,
        explanation: "Environment variables keep secrets out of your code, so they are not leaked when you share the code.",
      },
    ],
    teacherNotes:
      "The restaurant analogy is gold. Use it the entire lesson. If possible, do a tiny live demo: use Python's requests library to call a free public API like a joke API, just to show Aarav a real request and response. Stress that API keys are like passwords and must never be shared or pushed to GitHub. Introduce the .env file as the common way to set environment variables locally. This lesson sets up the practical lessons that follow, where Aarav will actually call an LLM API from Python.",
  },
];
