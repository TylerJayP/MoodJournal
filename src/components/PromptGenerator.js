const prompts = [
  "What made today feel heavy?",
  "What small moment brought you joy today?",
  "What's something you're looking forward to?",
  "What's a challenge you faced today and how did you handle it?",
  "What's something you're proud of accomplishing recently?",
  "What's something you wish others understood about how you're feeling?",
  "What self-care activity would help you feel better right now?",
  "What's a boundary you need to set or maintain?",
  "What's one thing that made you smile today?",
  "What's something that's been on your mind lately?",
  "What's a worry you can let go of?",
  "What would your ideal day look like tomorrow?",
  "What are you grateful for in this moment?",
  "What's a negative thought you had today that you can reframe?",
  "What's something kind you can do for yourself today?",
  "What's a goal you're working toward?",
  "What's a lesson you learned recently?",
  "What's a memory that brings you comfort?",
  "What helps you feel grounded when emotions are intense?",
  "What's a quality you appreciate about yourself?",
  "How has your mood changed throughout the day?",
  "What's a fear you're facing right now?",
  "What's something you need to forgive yourself for?",
  "What's something you're curious about?",
  "What's a comfort you can give yourself when feeling down?",
  "What relationships have been supportive for you lately?",
  "What's a difficult emotion you experienced today?",
  "What's something you can do tomorrow to take care of yourself?",
  "What's a thought pattern you notice recurring lately?",
  "What's something you can simplify in your life right now?"
];

const PromptGenerator = {
  getRandomPrompt: () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  }
};

export default PromptGenerator;
