-- AUTO-GENERATED — do not edit by hand
-- Source: src/lib/lms/quiz-catalog.json
-- Regenerate: npm run sync:quiz-seed
-- Run in Supabase SQL Editor after lms-schema.sql

CREATE OR REPLACE FUNCTION public.seed_topic_quizzes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  entry RECORD;
  v_question RECORD;
  v_course_id UUID;
  v_module_id UUID;
  v_topic_id UUID;
  v_quiz_id UUID;
  v_sort INT;
BEGIN
  FOR entry IN
    SELECT *
    FROM jsonb_to_recordset($catalog$
[
  {
    "course_code": "AAC",
    "module_number": 1,
    "topic_sort": 1,
    "topic_title": "Tokens & embeddings",
    "quiz_title": "Tokens & embeddings — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "What is a token in the context of Large Language Models (LLMs)?",
        "options": [
          {
            "id": "a",
            "text": "A complete document",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A unit of text processed by the model",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database record",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A neural network layer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do LLMs convert text into tokens before processing?",
        "options": [
          {
            "id": "a",
            "text": "To store data in a database",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To reduce internet usage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To transform text into manageable units for computation",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "To improve image generation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes tokenization?",
        "options": [
          {
            "id": "a",
            "text": "Compressing text files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Splitting text into smaller units called tokens",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Translating text into another language",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypting text",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens after text is tokenized in an LLM?",
        "options": [
          {
            "id": "a",
            "text": "Tokens are deleted",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Tokens are converted into numerical IDs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokens become images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Tokens are stored as PDFs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an embedding?",
        "options": [
          {
            "id": "a",
            "text": "A database backup",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A compressed image file",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A numerical vector representing the meaning of data",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "A programming language",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are embeddings important in LLMs?",
        "options": [
          {
            "id": "a",
            "text": "They increase internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They allow models to understand relationships and meanings between words",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They replace neural networks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They generate images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "If the words \"doctor\" and \"physician\" have similar embeddings, what does this indicate?",
        "options": [
          {
            "id": "a",
            "text": "They have similar meanings",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are different languages",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They are stored in the same database",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They have identical spellings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary output of an embedding layer?",
        "options": [
          {
            "id": "a",
            "text": "A PDF document",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A vector of numerical values",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database table",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An image",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why can't LLMs work directly with human-readable text?",
        "options": [
          {
            "id": "a",
            "text": "Text is too large",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Neural networks require numerical inputs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Text cannot be stored digitally",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Text is encrypted",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a token limit in an LLM?",
        "options": [
          {
            "id": "a",
            "text": "Maximum number of users",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Maximum number of images generated",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Maximum number of tokens the model can process at once",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Maximum number of training epochs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is true about embeddings?",
        "options": [
          {
            "id": "a",
            "text": "They only work for English text",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They represent data as vectors in a high-dimensional space",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They replace tokenization entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They are used only during training",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How do embeddings help in semantic search?",
        "options": [
          {
            "id": "a",
            "text": "By sorting files alphabetically",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "By comparing meanings rather than exact keywords",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "By compressing documents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By increasing storage capacity",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the relationship between tokens and embeddings?",
        "options": [
          {
            "id": "a",
            "text": "Embeddings create tokens",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Tokens are converted into embeddings before deeper processing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokens replace embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They are unrelated concepts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are embeddings often represented as vectors?",
        "options": [
          {
            "id": "a",
            "text": "Vectors enable mathematical operations and similarity calculations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Vectors reduce storage costs to zero",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Vectors are easier for humans to read",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Vectors eliminate tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the role of tokens and embeddings in an LLM?",
        "options": [
          {
            "id": "a",
            "text": "Tokens store data and embeddings generate images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Tokens break text into units, while embeddings convert those units into meaningful numerical representations",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokens train the model and embeddings deploy it",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Tokens and embeddings perform the same function",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 1,
    "topic_sort": 2,
    "topic_title": "Transformers & context windows",
    "quiz_title": "Transformers & context windows — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary role of the Transformer architecture in Large Language Models?",
        "options": [
          {
            "id": "a",
            "text": "Storing data in databases",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Processing and understanding relationships between tokens in a sequence",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Compressing text files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Generating images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which component of a Transformer helps the model determine which words in a sentence are most relevant to each other?",
        "options": [
          {
            "id": "a",
            "text": "Tokenizer",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Embedding Layer",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Self-Attention Mechanism",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Context Window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is meant by a \"context window\" in an LLM?",
        "options": [
          {
            "id": "a",
            "text": "A graphical user interface element",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The amount of text a model can process and remember in a single interaction",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage location for datasets",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A neural network layer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is a larger context window beneficial in many LLM applications?",
        "options": [
          {
            "id": "a",
            "text": "It reduces model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It allows the model to consider more information simultaneously",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It eliminates the need for training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It increases internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens when the input exceeds the model's context window?",
        "options": [
          {
            "id": "a",
            "text": "The model automatically expands its memory",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Older tokens may be truncated or ignored",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The model retrains itself",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The input is converted into images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does self-attention improve language understanding?",
        "options": [
          {
            "id": "a",
            "text": "By storing all text permanently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "By allowing tokens to influence each other's representations based on relevance",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "By replacing embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By reducing vocabulary size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Consider the sentence: \"The laptop was expensive, but it was worth every penny.\" What helps the model understand that \"it\" refers to the laptop?",
        "options": [
          {
            "id": "a",
            "text": "Tokenization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Context Window Only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Self-Attention Mechanism",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Data Compression",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Transformers and context windows?",
        "options": [
          {
            "id": "a",
            "text": "Context windows replace Transformers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Transformers process information within the limits of the context window",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Transformers do not use context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context windows only apply during training",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why can long context windows be valuable for tasks such as document analysis or code review?",
        "options": [
          {
            "id": "a",
            "text": "They allow the model to access more relevant information without losing earlier context",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They eliminate the need for embeddings",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They reduce computational requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They remove token limits",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes how Transformers and context windows work together in an LLM?",
        "options": [
          {
            "id": "a",
            "text": "Transformers generate tokens while context windows generate embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Transformers analyze relationships between tokens, while context windows define how much information can be considered at once",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Context windows replace attention mechanisms",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Both perform the same function",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 1,
    "topic_sort": 3,
    "topic_title": "Temperature, Top-P & Top-K sampling",
    "quiz_title": "Temperature, Top-P & Top-K sampling — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of sampling techniques such as Temperature, Top-P, and Top-K in LLMs?",
        "options": [
          {
            "id": "a",
            "text": "To increase model training speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To control how the model selects the next token during text generation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To reduce model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does the Temperature parameter control in an LLM?",
        "options": [
          {
            "id": "a",
            "text": "The number of tokens in a context window",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The randomness of token selection",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The size of the training dataset",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The embedding dimension",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the likely effect of setting Temperature to a very low value (e.g., 0.1)?",
        "options": [
          {
            "id": "a",
            "text": "Responses become more random",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Responses become more deterministic and focused",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The model generates longer answers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The model ignores context",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of Top-K sampling?",
        "options": [
          {
            "id": "a",
            "text": "To select from only the K most probable next tokens",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase context window size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To reduce tokenization errors",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To improve embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "If Top-K is set to 5, what does this mean?",
        "options": [
          {
            "id": "a",
            "text": "The model generates only 5 words",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The model considers only the 5 most likely next-token candidates",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The context window is limited to 5 tokens",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The model uses 5 attention heads",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Top-P (Nucleus) Sampling?",
        "options": [
          {
            "id": "a",
            "text": "Selecting tokens based on paragraph count",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Choosing tokens from the smallest set whose cumulative probability reaches a specified threshold",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Limiting responses to the top predicted token only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reducing context size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does Top-P differ from Top-K?",
        "options": [
          {
            "id": "a",
            "text": "Top-P uses a probability threshold, while Top-K uses a fixed number of candidate tokens",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Top-P increases training speed, while Top-K decreases it",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Top-P works only during training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "There is no difference",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which configuration is generally most suitable for factual or technical content generation?",
        "options": [
          {
            "id": "a",
            "text": "High Temperature (1.5)",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Low Temperature (0.2–0.4) with controlled sampling",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Maximum randomness",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No sampling controls",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A creative writing application wants diverse and imaginative outputs. Which setting would generally help?",
        "options": [
          {
            "id": "a",
            "text": "Low Temperature and very small Top-K",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Higher Temperature with broader Top-P or Top-K values",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Temperature set to zero",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Smaller context window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the role of Temperature, Top-P, and Top-K in text generation?",
        "options": [
          {
            "id": "a",
            "text": "They determine how the model was trained",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They control how the model selects the next token, balancing creativity and predictability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase context window size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace the Transformer architecture",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 2,
    "topic_sort": 1,
    "topic_title": "Zero-shot & few-shot prompting",
    "quiz_title": "Zero-shot & few-shot prompting — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Zero-Shot Prompting in the context of Large Language Models?",
        "options": [
          {
            "id": "a",
            "text": "Training a model with zero data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Asking a model to perform a task without providing examples",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Running a model without prompts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Fine-tuning a model on new data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a Zero-Shot Prompt?",
        "options": [
          {
            "id": "a",
            "text": "Translate 'Hello' to French. Example: Hello → Bonjour. Now translate 'Good Morning'.",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Classify this review as Positive or Negative: 'The service was excellent.'",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Example 1: Positive. Example 2: Negative. Now classify this review.",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Here are five examples before you answer.",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Few-Shot Prompting?",
        "options": [
          {
            "id": "a",
            "text": "Training a model with a small dataset",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Providing a few examples within the prompt before asking the model to perform a task",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Limiting the model to a few tokens",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reducing the context window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Few-Shot Prompting often more effective than Zero-Shot Prompting for specialized tasks?",
        "options": [
          {
            "id": "a",
            "text": "It changes the model architecture",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It provides examples that clarify expectations and output patterns",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It retrains the model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Consider the following prompt:\n\"Apple → Fruit\nCarrot → Vegetable\nMango → ?\"\nThis is an example of:",
        "options": [
          {
            "id": "a",
            "text": "Zero-Shot Prompting",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Fine-Tuning",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Few-Shot Prompting",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Reinforcement Learning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario is most suitable for Zero-Shot Prompting?",
        "options": [
          {
            "id": "a",
            "text": "A common task such as summarizing an article",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A highly specialized classification task with strict formatting requirements",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A domain-specific legal analysis requiring examples",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A custom workflow with unique labels",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one key advantage of Few-Shot Prompting?",
        "options": [
          {
            "id": "a",
            "text": "It permanently updates the model's knowledge",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It helps improve consistency and accuracy without retraining",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It reduces model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes token limits",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which factor should be considered when using Few-Shot Prompting?",
        "options": [
          {
            "id": "a",
            "text": "Examples consume part of the available context window",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Examples increase model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Examples replace embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Examples remove tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants an LLM to generate customer support replies in a specific tone and format. Which approach is generally more effective?",
        "options": [
          {
            "id": "a",
            "text": "Zero-Shot Prompting only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Few-Shot Prompting with examples of desired responses",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Removing instructions entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Lowering the context window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the difference between Zero-Shot and Few-Shot Prompting?",
        "options": [
          {
            "id": "a",
            "text": "Zero-shot uses instructions only, while few-shot includes examples to guide the model",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Zero-shot requires training, while few-shot does not",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Few-shot changes model weights permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "There is no practical difference",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 2,
    "topic_sort": 2,
    "topic_title": "Chain-of-thought reasoning",
    "quiz_title": "Chain-of-thought reasoning — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Chain-of-Thought (CoT) Reasoning in Prompt Engineering?",
        "options": [
          {
            "id": "a",
            "text": "A method for increasing model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A prompting technique that encourages the model to reason through intermediate steps before reaching an answer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A training algorithm for neural networks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A technique for tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of Chain-of-Thought prompting?",
        "options": [
          {
            "id": "a",
            "text": "It reduces the number of model parameters",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It helps the model solve complex tasks by reasoning step-by-step",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It eliminates the need for training data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It increases internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of task benefits most from Chain-of-Thought prompting?",
        "options": [
          {
            "id": "a",
            "text": "Simple spelling corrections",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Logical reasoning and multi-step problem solving",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "File compression",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Image resizing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which prompt is most likely to trigger Chain-of-Thought reasoning?",
        "options": [
          {
            "id": "a",
            "text": "What is 25 × 12?",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Calculate 25 × 12 and explain your reasoning step by step.",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Translate this sentence into Spanish.",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "List three fruits.",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why can Chain-of-Thought improve answer accuracy?",
        "options": [
          {
            "id": "a",
            "text": "It allows the model to verify intermediate reasoning before reaching a conclusion",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It retrains the model during inference",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It expands the context window automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Prompt Engineering, when should Chain-of-Thought prompting be used?",
        "options": [
          {
            "id": "a",
            "text": "For every task regardless of complexity",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Primarily for tasks involving reasoning, planning, calculations, or decision-making",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Only during model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only for image generation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one potential drawback of Chain-of-Thought prompting?",
        "options": [
          {
            "id": "a",
            "text": "It can produce longer responses and consume more tokens",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It decreases model intelligence",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It disables attention mechanisms",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It prevents text generation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A business analyst asks an LLM to evaluate three vendors based on cost, reliability, and scalability before making a recommendation. Which prompting approach is most suitable?",
        "options": [
          {
            "id": "a",
            "text": "Random Sampling",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Chain-of-Thought Reasoning",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokenization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Embedding Generation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes how Chain-of-Thought differs from a direct-answer prompt?",
        "options": [
          {
            "id": "a",
            "text": "Chain-of-Thought encourages intermediate reasoning steps, while direct-answer prompts focus only on the final response",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Chain-of-Thought changes the model architecture",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Direct-answer prompts require retraining",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "There is no difference",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the role of Chain-of-Thought reasoning in Prompt Engineering?",
        "options": [
          {
            "id": "a",
            "text": "It helps the model process images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It improves performance on complex reasoning tasks by encouraging structured, step-by-step thinking",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It increases the context window size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces embeddings and attention mechanisms",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 2,
    "topic_sort": 3,
    "topic_title": "System prompts & reusable templates",
    "quiz_title": "System prompts & reusable templates — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a system prompt in an AI application?",
        "options": [
          {
            "id": "a",
            "text": "To train the model on new data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To define the AI's role, behavior, and response guidelines",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To increase the model's context window",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To generate embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes a system prompt?",
        "options": [
          {
            "id": "a",
            "text": "A user's question to the AI",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A hidden instruction that influences the AI's behavior and responses",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database query",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model training algorithm",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are system prompts important in enterprise AI applications?",
        "options": [
          {
            "id": "a",
            "text": "They increase internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They ensure consistent behavior, tone, and compliance across interactions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They reduce model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace prompt engineering",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is the best example of a system prompt?",
        "options": [
          {
            "id": "a",
            "text": "What is cloud computing?",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Summarize this document.",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "You are a professional IT support assistant. Provide accurate, concise, and user-friendly technical guidance.",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Explain Docker in simple terms.",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a reusable prompt template?",
        "options": [
          {
            "id": "a",
            "text": "A fixed training dataset",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A structured prompt format that can be used repeatedly with different inputs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A neural network layer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A tokenization method",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a reusable prompt template?",
        "options": [
          {
            "id": "a",
            "text": "What is Kubernetes?",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Explain [TOPIC] to a beginner in under 200 words.",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "How does AWS work?",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Define DevOps.",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major benefit of reusable prompt templates in business environments?",
        "options": [
          {
            "id": "a",
            "text": "They eliminate the need for AI models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They improve consistency, scalability, and productivity",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They reduce internet bandwidth",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants all AI-generated emails to follow the same professional structure and tone. What is the most effective approach?",
        "options": [
          {
            "id": "a",
            "text": "Use random prompts each time",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create a reusable email template supported by a system prompt",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Disable prompt engineering",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increase the temperature setting only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which factor should be considered when designing reusable templates?",
        "options": [
          {
            "id": "a",
            "text": "Templates should be flexible enough to handle different inputs while maintaining consistency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Templates should contain no instructions",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Templates should only work for one task",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Templates should ignore user requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the relationship between system prompts and reusable templates?",
        "options": [
          {
            "id": "a",
            "text": "System prompts define behavior, while reusable templates standardize task execution and output structure",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They perform exactly the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Templates replace system prompts completely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "System prompts are only used during model training",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 3,
    "topic_sort": 1,
    "topic_title": "Function calling & structured outputs",
    "quiz_title": "Function calling & structured outputs — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Function Calling in the context of Large Language Models (LLMs)?",
        "options": [
          {
            "id": "a",
            "text": "Writing functions in Python",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Allowing an LLM to trigger predefined functions or external tools to perform specific tasks",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Training a model using functions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Converting text into embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Function Calling useful in AI applications?",
        "options": [
          {
            "id": "a",
            "text": "It increases model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It allows the model to execute real-world actions and retrieve external information",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It replaces tokenization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It reduces context window usage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a common use case for Function Calling?",
        "options": [
          {
            "id": "a",
            "text": "Generating random text only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Calling a weather API to fetch current weather information",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Compressing training data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Structured Output in an LLM system?",
        "options": [
          {
            "id": "a",
            "text": "A response that follows a predefined format such as JSON, XML, or a schema",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A longer text response",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A compressed model file",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A training dataset",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are structured outputs preferred in enterprise applications?",
        "options": [
          {
            "id": "a",
            "text": "They make responses more random",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They provide consistency and simplify system integration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase token count intentionally",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They eliminate APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Consider the following output:\n{\"city\": \"Bengaluru\", \"temperature\": \"28°C\"}\nThis is an example of:",
        "options": [
          {
            "id": "a",
            "text": "Tokenization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Structured Output",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Embedding Vector",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context Window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Function Calling and Structured Outputs?",
        "options": [
          {
            "id": "a",
            "text": "They are unrelated concepts",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Function Calling often relies on structured outputs to pass parameters correctly",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Function Calling replaces structured outputs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Structured outputs are only used during training",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major advantage of using Function Calling with Open Source LLMs?",
        "options": [
          {
            "id": "a",
            "text": "It eliminates the need for prompts",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It enables integration with custom tools, APIs, and enterprise workflows",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It increases model training speed automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes token limits",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a customer support chatbot, which task would most likely require Function Calling?",
        "options": [
          {
            "id": "a",
            "text": "Greeting a user",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Retrieving the user's latest order status from a database",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Correcting grammar in a sentence",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Summarizing a paragraph",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the purpose of Function Calling and Structured Outputs?",
        "options": [
          {
            "id": "a",
            "text": "They help LLMs interact reliably with external systems by generating predictable, machine-readable responses",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase the number of model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace transformers and attention mechanisms",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They are only useful during model training",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 3,
    "topic_sort": 2,
    "topic_title": "Pydantic schemas for LLM responses",
    "quiz_title": "Pydantic schemas for LLM responses — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of using a Pydantic schema with LLM responses?",
        "options": [
          {
            "id": "a",
            "text": "To train the model faster",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To enforce a structured and validated output format",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To increase the context window",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To improve tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In AI applications, why are structured outputs often preferred over free-text responses?",
        "options": [
          {
            "id": "a",
            "text": "They consume more tokens",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They are easier for downstream systems to parse and process automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They eliminate the need for prompts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They make models larger",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Consider the following schema:\nclass User(BaseModel):\n   name: str\n   age: int\nWhich response would successfully validate?",
        "options": [
          {
            "id": "a",
            "text": "{\"name\": \"John\", \"age\": 30}",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "{\"name\": \"John\", \"age\": \"Thirty\"}",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "{\"name\": 123, \"age\": 30}",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "{\"age\": 30}",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens if an LLM response does not match the expected Pydantic schema?",
        "options": [
          {
            "id": "a",
            "text": "The model retrains automatically",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Validation fails, allowing the application to detect and handle the error",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The schema is ignored",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The context window increases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a key benefit of schema validation in Function Calling workflows?",
        "options": [
          {
            "id": "a",
            "text": "Increased GPU memory",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduced need for prompt engineering",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Improved reliability and consistency of application outputs",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Larger model context windows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why might developers use Pydantic with OpenAI-style Function Calling?",
        "options": [
          {
            "id": "a",
            "text": "To generate images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To define the exact structure expected from the model's response",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To train custom embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce API latency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which use case would benefit most from Pydantic schema validation?",
        "options": [
          {
            "id": "a",
            "text": "Casual chatting with an AI assistant",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Generating random stories",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Extracting customer information into a structured CRM system",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Creating creative poetry",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of defining field types such as str, int, or bool in a Pydantic model?",
        "options": [
          {
            "id": "a",
            "text": "To increase model accuracy",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To specify and validate expected data types",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To reduce token usage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Consider a schema designed for an order-processing system:\nclass Order(BaseModel):\n   order_id: str\n   quantity: int\n   delivered: bool\nWhich response is most likely valid?",
        "options": [
          {
            "id": "a",
            "text": "{\"order_id\": \"ORD123\", \"quantity\": 5, \"delivered\": true}",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "{\"order_id\": \"ORD123\", \"quantity\": \"Five\", \"delivered\": true}",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "{\"order_id\": 123, \"quantity\": 5, \"delivered\": true}",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "{\"quantity\": 5}",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the role of Pydantic schemas in LLM-powered applications?",
        "options": [
          {
            "id": "a",
            "text": "They improve model training quality",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They ensure generated responses conform to predefined structures and validation rules",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace prompt engineering entirely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 3,
    "topic_sort": 3,
    "topic_title": "Ollama, Llama 3 & Mistral locally",
    "quiz_title": "Ollama, Llama 3 & Mistral locally — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of Ollama?",
        "options": [
          {
            "id": "a",
            "text": "To train LLMs from scratch",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To run and manage open-source LLMs locally on a computer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create databases for AI applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace operating systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a key advantage of running LLMs locally using Ollama?",
        "options": [
          {
            "id": "a",
            "text": "Unlimited internet bandwidth",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Improved privacy and control over data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Automatic model retraining",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No hardware requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Llama 3?",
        "options": [
          {
            "id": "a",
            "text": "A database engine",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "An open-source large language model developed by Meta",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A Linux distribution",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud storage service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Mistral primarily known for in the open-source AI ecosystem?",
        "options": [
          {
            "id": "a",
            "text": "Lightweight and high-performance language models",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database optimization tools",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Image editing software",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Web hosting services",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which command is commonly used to start a model in Ollama?",
        "options": [
          {
            "id": "a",
            "text": "ollama install model",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ollama start model",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ollama run model-name",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "ollama execute model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why might an organization choose an open-source LLM such as Llama 3 or Mistral instead of a proprietary model?",
        "options": [
          {
            "id": "a",
            "text": "To avoid all infrastructure costs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To gain greater customization, transparency, and deployment flexibility",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To eliminate hardware requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To remove the need for prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a local AI setup, what role does Ollama play relative to models such as Llama 3 and Mistral?",
        "options": [
          {
            "id": "a",
            "text": "Ollama is the language model itself",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Ollama acts as a platform for running and managing models",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ollama replaces the model's neural network",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ollama performs tokenization only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which factor most significantly affects the performance of locally hosted LLMs?",
        "options": [
          {
            "id": "a",
            "text": "Browser version",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Available system resources such as RAM, CPU, and GPU",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Screen resolution",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Keyboard type",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How can open-source LLMs support function-calling workflows?",
        "options": [
          {
            "id": "a",
            "text": "By directly replacing business applications",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "By generating structured outputs that can trigger external tools or APIs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "By removing the need for APIs entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By increasing internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the relationship between Ollama, Llama 3, and Mistral?",
        "options": [
          {
            "id": "a",
            "text": "Ollama is a platform used to run models such as Llama 3 and Mistral locally",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Llama 3 and Mistral are alternatives to operating systems",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ollama is a cloud provider for AI services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All three are database technologies",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 4,
    "topic_sort": 1,
    "topic_title": "LCEL pipelines",
    "quiz_title": "LCEL pipelines — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of LCEL (LangChain Expression Language) in LangChain Core?",
        "options": [
          {
            "id": "a",
            "text": "To train large language models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To build and compose AI workflows using reusable components",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store vector embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage cloud infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following best describes an LCEL pipeline?",
        "options": [
          {
            "id": "a",
            "text": "A database used for storing prompts",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A sequence of connected components that process data step-by-step",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A machine learning algorithm",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A vector database",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In LCEL, what is the purpose of the pipe operator (|)?",
        "options": [
          {
            "id": "a",
            "text": "To delete data between components",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To connect workflow components together",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To train a model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which component is typically used to structure input before sending it to an LLM?",
        "options": [
          {
            "id": "a",
            "text": "Vector Store",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Prompt Template",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Output Parser",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Memory",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the role of a Runnable in LangChain Core?",
        "options": [
          {
            "id": "a",
            "text": "A storage system for embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A standard interface that can execute a step in an LCEL pipeline",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database connector",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A training framework",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is LCEL considered more maintainable than traditional custom-coded workflows?",
        "options": [
          {
            "id": "a",
            "text": "It reduces modularity",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It eliminates prompts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It encourages reusable and composable components",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "It removes model dependencies",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which LCEL component is responsible for transforming raw model output into a structured format?",
        "options": [
          {
            "id": "a",
            "text": "Prompt Template",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Retriever",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Output Parser",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Runnable Sequence",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer wants to create a workflow where a prompt is generated, processed by an LLM, and then converted into JSON. Which LCEL design principle is being applied?",
        "options": [
          {
            "id": "a",
            "text": "Sequential Composition",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Data Encryption",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Fine-Tuning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Vector Compression",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major advantage of LCEL pipelines when building production AI applications?",
        "options": [
          {
            "id": "a",
            "text": "They remove the need for testing",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They provide clear, modular workflows that are easier to monitor and maintain",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They automatically retrain models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They eliminate latency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the value of LCEL pipelines in LangChain Core?",
        "options": [
          {
            "id": "a",
            "text": "LCEL is mainly used for model training",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "LCEL provides a standardized and flexible way to connect AI application components into workflows",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "LCEL replaces large language models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "LCEL is only useful for chatbots",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 4,
    "topic_sort": 2,
    "topic_title": "Chains & output parsers",
    "quiz_title": "Chains & output parsers — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a Chain in an AI agent workflow?",
        "options": [
          {
            "id": "a",
            "text": "To train the language model",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To connect multiple processing steps into a single workflow",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store embeddings permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage cloud infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Agent Engineering, when is a Chain most useful?",
        "options": [
          {
            "id": "a",
            "text": "When a task requires multiple sequential actions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "When training a new LLM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "When creating embeddings only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "When increasing hardware resources",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What problem do Output Parsers primarily solve?",
        "options": [
          {
            "id": "a",
            "text": "Slow internet connections",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Unstructured and inconsistent LLM responses",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Model training failures",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud deployment issues",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a structured output generated by an Output Parser?",
        "options": [
          {
            "id": "a",
            "text": "Random text paragraph",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "JSON object with predefined fields",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Image file",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Raw token sequence",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A support agent receives a user query, searches a knowledge base, generates an answer, and formats the result. What enables these steps to work together?",
        "options": [
          {
            "id": "a",
            "text": "Embeddings only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Chain",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokenizer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context Window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Output Parsers important for enterprise AI applications?",
        "options": [
          {
            "id": "a",
            "text": "They improve GPU performance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They help applications reliably process AI-generated responses",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which workflow best represents the use of Chains and Output Parsers together?",
        "options": [
          {
            "id": "a",
            "text": "User Input → Prompt → LLM → Output Parser → Structured Response",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "User Input → Database → Training → Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Prompt → GPU → Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Model → Dataset → Retraining",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key benefit of modular Chains in Agent Engineering?",
        "options": [
          {
            "id": "a",
            "text": "Easier testing, maintenance, and reuse of workflows",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Unlimited context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduced need for prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI agent must return product information in a fixed format with fields such as Name, Price, and Availability. Which component is most responsible for enforcing this structure?",
        "options": [
          {
            "id": "a",
            "text": "Retriever",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Memory Module",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Output Parser",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Embedding Model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Chains and Output Parsers?",
        "options": [
          {
            "id": "a",
            "text": "Chains execute workflow steps, while Output Parsers structure the final output",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Chains and Output Parsers perform the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Output Parsers replace Chains entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Chains are used only for training models",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 5,
    "topic_sort": 1,
    "topic_title": "ReAct agent loop",
    "quiz_title": "ReAct agent loop — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does \"ReAct\" stand for in AI Agents?",
        "options": [
          {
            "id": "a",
            "text": "Retrieve and Act",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reason and Act",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "React and Analyze",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Respond and Train",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of the ReAct Agent Loop?",
        "options": [
          {
            "id": "a",
            "text": "To train language models faster",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To allow agents to alternate between reasoning and taking actions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce tokenization costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which sequence best represents a ReAct workflow?",
        "options": [
          {
            "id": "a",
            "text": "Train → Deploy → Monitor",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Question → Answer",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Thought → Action → Observation → Thought",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Input → Output",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a ReAct Agent, what is a \"Thought\"?",
        "options": [
          {
            "id": "a",
            "text": "A database query",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The agent's reasoning process about what to do next",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The final answer to the user",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A stored memory record",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an \"Action\" in the ReAct framework?",
        "options": [
          {
            "id": "a",
            "text": "A training step",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "An operation performed by the agent, such as using a tool or API",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A memory update only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model checkpoint",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an \"Observation\" in the ReAct loop?",
        "options": [
          {
            "id": "a",
            "text": "The result returned after an action is performed",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A training dataset",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A prompt template",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An embedding vector",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is the ReAct approach often more effective than generating a single response?",
        "options": [
          {
            "id": "a",
            "text": "It allows the agent to gather information and adjust its reasoning dynamically",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It eliminates the need for prompts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes context windows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A travel-planning agent searches for flights, reviews hotel options, and then recommends an itinerary. Which ReAct capability is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Single-step inference",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Iterative reasoning and action-taking",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokenization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Model fine-tuning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which component is most commonly used alongside a ReAct Agent?",
        "options": [
          {
            "id": "a",
            "text": "External tools and APIs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Image compression algorithms",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Hardware drivers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Data labeling software",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the ReAct Agent Loop?",
        "options": [
          {
            "id": "a",
            "text": "The agent alternates between reasoning and actions until it reaches a solution",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The agent only generates text responses",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The agent continuously retrains itself",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The agent stores all data permanently",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 5,
    "topic_sort": 2,
    "topic_title": "Planning & reflection patterns",
    "quiz_title": "Planning & reflection patterns — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of planning in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "To increase model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To break complex tasks into smaller, manageable steps before execution",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce training data requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In AI agents, what does \"reflection\" refer to?",
        "options": [
          {
            "id": "a",
            "text": "Copying previous responses",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Evaluating past actions or outputs to improve future decisions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increasing context window size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Training a new model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are planning patterns important for complex tasks?",
        "options": [
          {
            "id": "a",
            "text": "They eliminate the need for reasoning",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They help agents execute tasks systematically and efficiently",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase hardware performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace external tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates planning by an AI agent?",
        "options": [
          {
            "id": "a",
            "text": "Instantly answering a simple greeting",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating a step-by-step strategy for organizing a business trip",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Generating random text",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Converting text into embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key benefit of reflection in agent workflows?",
        "options": [
          {
            "id": "a",
            "text": "It helps the agent learn from previous outputs and improve accuracy",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It removes token limits",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates the need for prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which sequence best represents a Planning and Reflection workflow?",
        "options": [
          {
            "id": "a",
            "text": "Input → Output",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Plan → Act → Reflect → Refine → Final Output",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Train → Deploy → Monitor",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Prompt → Tokenize → Store",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A coding agent writes code, reviews it for errors, fixes issues, and then provides the final version. Which pattern is being used?",
        "options": [
          {
            "id": "a",
            "text": "Reflection Pattern",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Tokenization Pattern",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embedding Pattern",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Vector Search Pattern",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does planning improve the performance of AI agents?",
        "options": [
          {
            "id": "a",
            "text": "By helping agents define intermediate goals and execution steps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By reducing the need for reasoning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By replacing APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a travel-booking agent, which activity best represents reflection?",
        "options": [
          {
            "id": "a",
            "text": "Searching for available flights",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reviewing selected options to ensure they meet user preferences before finalizing recommendations",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Connecting to an API",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Generating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Planning and Reflection Patterns in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "Planning organizes task execution, while reflection evaluates and improves results",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both are used only during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reflection replaces planning entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Planning is only useful for simple tasks",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 5,
    "topic_sort": 3,
    "topic_title": "Tool use & web search",
    "quiz_title": "Tool use & web search — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is meant by \"Tool Use\" in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "Training a new language model",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Enabling an agent to interact with external systems, APIs, databases, or applications",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increasing model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do AI agents use external tools instead of relying only on their internal knowledge?",
        "options": [
          {
            "id": "a",
            "text": "To reduce tokenization costs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To access real-time, specialized, or external information unavailable in the model's training data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To increase model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of web search in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "To train the model continuously",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To retrieve up-to-date information from online sources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To compress data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates effective tool use?",
        "options": [
          {
            "id": "a",
            "text": "Generating a poem from memory",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Using a calculator tool to solve a complex mathematical problem",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Repeating the same answer multiple times",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increasing the context window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of integrating web search into an AI agent?",
        "options": [
          {
            "id": "a",
            "text": "It allows access to real-time and updated information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It removes token limits",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In an agent workflow, when should a web search tool typically be used?",
        "options": [
          {
            "id": "a",
            "text": "When current or external information is needed to answer a query accurately",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "For every user query regardless of context",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Only during training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Never, because the model already knows everything",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A user asks, \"What is today's weather in Bengaluru?\" Why would an AI agent use a weather API or web search tool?",
        "options": [
          {
            "id": "a",
            "text": "To improve embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Because weather information changes frequently and requires real-time data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To reduce response length",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To retrain the model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge can occur if an AI agent relies on web search results without verification?",
        "options": [
          {
            "id": "a",
            "text": "Improved accuracy",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Exposure to inaccurate, outdated, or unreliable information",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Larger context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Faster training",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which sequence best represents tool-assisted reasoning in an AI agent?",
        "options": [
          {
            "id": "a",
            "text": "User Query → Tool Selection → Tool Execution → Observation → Final Answer",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "User Query → Model Training → Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Input → Storage → Deletion",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Embedding → Tokenization → Compression",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Tool Use and Web Search in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "Tools extend an agent's capabilities, while web search provides access to external and current information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Tools are only used during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Web search replaces reasoning entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Tools and web search perform the same function",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 6,
    "topic_sort": 1,
    "topic_title": "ChromaDB & Pinecone vector stores",
    "quiz_title": "ChromaDB & Pinecone vector stores — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a vector database in a RAG system?",
        "options": [
          {
            "id": "a",
            "text": "To store application logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To store embeddings and enable semantic similarity search",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To train large language models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To compress documents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is ChromaDB primarily designed for?",
        "options": [
          {
            "id": "a",
            "text": "Cloud infrastructure management",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Local and lightweight vector storage for AI applications",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Model training and fine-tuning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "API gateway management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Pinecone?",
        "options": [
          {
            "id": "a",
            "text": "A programming language",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A managed cloud-based vector database service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A prompt engineering framework",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model deployment platform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a RAG workflow, where are document embeddings typically stored?",
        "options": [
          {
            "id": "a",
            "text": "SQL Tables only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Vector Databases such as ChromaDB or Pinecone",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Application Cache only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Web Browsers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which feature allows ChromaDB and Pinecone to find similar documents?",
        "options": [
          {
            "id": "a",
            "text": "Exact String Matching",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Semantic Similarity Search using Vectors",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Database Replication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "File Compression",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants a fully managed, cloud-native vector database for production workloads. Which option is generally more suitable?",
        "options": [
          {
            "id": "a",
            "text": "ChromaDB",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Pinecone",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "CSV File Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SQLite",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes ChromaDB?",
        "options": [
          {
            "id": "a",
            "text": "A lightweight, open-source vector database suitable for development and experimentation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A cloud-only database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A model hosting platform",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A web search engine",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are embeddings stored instead of raw documents in vector databases?",
        "options": [
          {
            "id": "a",
            "text": "Embeddings capture semantic meaning and enable similarity search",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Raw documents cannot be stored digitally",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embeddings reduce internet usage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Embeddings replace language models",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a RAG system using Pinecone or ChromaDB, what happens after a user submits a query?",
        "options": [
          {
            "id": "a",
            "text": "The model retrains itself",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The query is converted into an embedding and matched against stored vectors",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Documents are deleted automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The vector database generates the final answer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the role of ChromaDB and Pinecone in RAG systems?",
        "options": [
          {
            "id": "a",
            "text": "They train LLMs using retrieved documents",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They store embeddings and enable fast semantic retrieval of relevant information",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They replace language models entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They only store structured SQL data",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 6,
    "topic_sort": 3,
    "topic_title": "Hybrid search for better retrieval",
    "quiz_title": "Hybrid search for better retrieval — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Hybrid Search in a RAG system?",
        "options": [
          {
            "id": "a",
            "text": "Using only keyword search",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Combining semantic (vector) search and keyword-based search to retrieve information",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Training two language models together",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Using multiple databases simultaneously",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Hybrid Search often more effective than using only vector search?",
        "options": [
          {
            "id": "a",
            "text": "It eliminates embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It captures both semantic meaning and exact keyword matches",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It reduces model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces vector databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which two retrieval techniques are typically combined in Hybrid Search?",
        "options": [
          {
            "id": "a",
            "text": "Fine-Tuning and RLHF",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Keyword Search and Vector Search",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Tokenization and Embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Chunking and Parsing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In which scenario would Hybrid Search provide significant benefits?",
        "options": [
          {
            "id": "a",
            "text": "Searching for documents containing exact product IDs while also understanding related concepts",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Training a language model",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Generating images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a limitation of relying only on keyword search?",
        "options": [
          {
            "id": "a",
            "text": "It cannot find semantically similar content when exact keywords differ",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It requires embeddings",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It uses too much memory",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It cannot search documents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a limitation of relying only on vector search?",
        "options": [
          {
            "id": "a",
            "text": "It cannot process embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It may overlook exact keywords, IDs, product codes, or names that are critical to retrieval",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It only works offline",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It requires SQL databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does Hybrid Search improve retrieval quality in RAG systems?",
        "options": [
          {
            "id": "a",
            "text": "By balancing semantic relevance and keyword precision",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing model size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By removing chunking",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By eliminating vector databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A user searches for \"AWS EC2 Instance Pricing\". Why might Hybrid Search outperform pure vector search?",
        "options": [
          {
            "id": "a",
            "text": "Because it can prioritize exact matches for terms like \"AWS\" and \"EC2\" while still understanding the context of pricing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Because it retrains the model",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Because it increases context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Because it removes embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a typical Hybrid Search workflow, how are retrieval results usually handled?",
        "options": [
          {
            "id": "a",
            "text": "Results from keyword and vector searches are combined and ranked before being sent to the LLM",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Only keyword results are used",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Only vector results are used",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The LLM performs retrieval itself",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Hybrid Search?",
        "options": [
          {
            "id": "a",
            "text": "It combines semantic understanding with exact keyword matching to improve retrieval performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It replaces embeddings entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It is only used during training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates the need for vector databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 7,
    "topic_sort": 1,
    "topic_title": "Buffer memory for short context",
    "quiz_title": "Buffer memory for short context — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Buffer Memory in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "A database used for storing embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A memory mechanism that stores recent interactions in a conversation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A model training technique",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A vector search algorithm",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of Buffer Memory?",
        "options": [
          {
            "id": "a",
            "text": "To improve GPU performance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To help the agent remember recent messages and maintain conversational continuity",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To replace vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To train the model on new data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of information is typically stored in Buffer Memory?",
        "options": [
          {
            "id": "a",
            "text": "Entire training datasets",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Recent conversation exchanges between the user and the AI agent",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "System logs only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Embedding vectors only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Buffer Memory important in conversational AI applications?",
        "options": [
          {
            "id": "a",
            "text": "It enables the agent to understand references to previous messages",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It eliminates prompts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a limitation of Buffer Memory?",
        "options": [
          {
            "id": "a",
            "text": "It can only store images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It may consume valuable context window space as conversations grow longer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It cannot store text",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates reasoning capabilities",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A user says, \"My name is Rahul,\" and later asks, \"What is my name?\" How does Buffer Memory help?",
        "options": [
          {
            "id": "a",
            "text": "It retrains the model",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It stores the earlier message so the agent can recall the user's name during the conversation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It searches the internet",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It creates embeddings automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does Buffer Memory differ from long-term memory systems?",
        "options": [
          {
            "id": "a",
            "text": "Buffer Memory stores recent interactions, while long-term memory retains information for extended periods",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both serve the same purpose",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Buffer Memory is permanent",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Long-term memory cannot store text",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In an AI agent workflow, where is Buffer Memory most commonly used?",
        "options": [
          {
            "id": "a",
            "text": "During ongoing conversations with users",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "During model training only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "For image generation only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "For hardware monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge can occur if Buffer Memory becomes too large?",
        "options": [
          {
            "id": "a",
            "text": "The agent may exceed the available context window and require truncation of older messages",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The model automatically retrains",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The vector database stops working",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The agent loses internet access",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Buffer Memory?",
        "options": [
          {
            "id": "a",
            "text": "It stores recent conversation history to maintain short-term context during interactions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It permanently stores all user data",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces retrieval systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It functions as a vector database",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 7,
    "topic_sort": 3,
    "topic_title": "Persistent session storage",
    "quiz_title": "Persistent session storage — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Persistent Session Storage in AI systems?",
        "options": [
          {
            "id": "a",
            "text": "A temporary memory that lasts only for a single prompt",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A mechanism for storing user and session data beyond a single interaction or application restart",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A model training technique",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A vector embedding algorithm",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Persistent Session Storage important in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It allows agents to remember relevant information across sessions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It replaces language models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It reduces tokenization costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of information is commonly stored in Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "User preferences, conversation history, and application state",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "GPU drivers only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operating system files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Model weights",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does Persistent Session Storage differ from Buffer Memory?",
        "options": [
          {
            "id": "a",
            "text": "Buffer Memory is persistent, while session storage is temporary",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Persistent Session Storage retains information across sessions, while Buffer Memory stores short-term conversation context",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Both are identical",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Persistent Session Storage only stores embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which storage technology is commonly used for Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "Databases such as PostgreSQL, MySQL, MongoDB, or Redis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Prompt templates only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Context windows only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Embedding models only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A user updates their preferred notification settings. Why would an AI application use Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "To remember those preferences during future sessions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To retrain the model",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To create embeddings automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To increase context window size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge would occur if an AI assistant lacked Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "The assistant would forget important user preferences after each session ends",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The model would stop generating responses",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The vector database would fail automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The context window would become larger",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Vector Memory and Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "They are the same technology",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Vector Memory can be stored using persistent storage systems to enable long-term recall",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Persistent Session Storage replaces embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Vector Memory only works in RAM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In an enterprise AI assistant, which use case best demonstrates Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "Remembering a user's department, preferred language, and previous support tickets across multiple logins",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Storing only the last message in a conversation",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Increasing model size dynamically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Generating embeddings for a single query",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Persistent Session Storage?",
        "options": [
          {
            "id": "a",
            "text": "It stores information temporarily during a conversation only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It enables AI systems to retain and access data across multiple sessions and application restarts",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It replaces vector databases and memory systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It is only used during model training",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 8,
    "topic_sort": 1,
    "topic_title": "State machines & cyclic workflows",
    "quiz_title": "State machines & cyclic workflows — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a state machine in LangGraph?",
        "options": [
          {
            "id": "a",
            "text": "To train language models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To manage workflow execution by defining states and transitions between them",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To store vector data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In LangGraph, what does a \"state\" represent?",
        "options": [
          {
            "id": "a",
            "text": "A model checkpoint",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A specific stage or condition in a workflow",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database record",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A prompt template",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a transition in a state machine?",
        "options": [
          {
            "id": "a",
            "text": "A model retraining process",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The movement from one state to another based on defined logic or conditions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database migration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A vector search operation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are state machines useful in AI agent workflows?",
        "options": [
          {
            "id": "a",
            "text": "They provide a structured way to manage complex, multi-step processes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They eliminate the need for reasoning",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace language models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They reduce tokenization costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a cyclic workflow in LangGraph?",
        "options": [
          {
            "id": "a",
            "text": "A workflow that executes only once",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A workflow where the system can return to previous states and repeat steps when necessary",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A workflow used only for model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A workflow that stores embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates a cyclic workflow?",
        "options": [
          {
            "id": "a",
            "text": "An agent continuously refining an answer until it meets quality requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A single database query",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A one-time prompt execution",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A static webpage request",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does LangGraph differ from a simple linear chain?",
        "options": [
          {
            "id": "a",
            "text": "LangGraph supports branching, loops, and state-based execution, while linear chains follow a fixed sequence",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "LangGraph only works with vector databases",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Linear chains support loops, but LangGraph does not",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "There is no difference",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A customer support agent reviews its response, checks for missing information, and revises the answer if needed. Which LangGraph capability is being used?",
        "options": [
          {
            "id": "a",
            "text": "Vector Search",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Cyclic Workflow",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Fine-Tuning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of cyclic workflows in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "They enable iterative reasoning, reflection, and self-correction",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They reduce model size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They eliminate memory requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes state machines and cyclic workflows in LangGraph?",
        "options": [
          {
            "id": "a",
            "text": "State machines manage workflow states and transitions, while cyclic workflows enable repeated execution and refinement",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both concepts are only used during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cyclic workflows replace state machines entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They are used only for storing embeddings",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 8,
    "topic_sort": 2,
    "topic_title": "Human-in-the-loop checkpoints",
    "quiz_title": "Human-in-the-loop checkpoints — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of Human-in-the-Loop (HITL) checkpoints in AI workflows?",
        "options": [
          {
            "id": "a",
            "text": "To retrain the model automatically",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To allow human review, approval, or intervention before critical actions are executed",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To increase context window size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a LangGraph workflow, when is a Human-in-the-Loop checkpoint most useful?",
        "options": [
          {
            "id": "a",
            "text": "Before performing high-impact or irreversible actions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "During tokenization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "During model training only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "When generating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates a Human-in-the-Loop checkpoint?",
        "options": [
          {
            "id": "a",
            "text": "An AI agent automatically sending an email without review",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "An AI agent drafting a legal contract that requires human approval before submission",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A chatbot greeting a user",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model generating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the main benefit of incorporating HITL checkpoints into AI systems?",
        "options": [
          {
            "id": "a",
            "text": "Reduced hardware costs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Improved safety, accountability, and decision quality",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increased model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Elimination of prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In LangGraph, what typically happens when a workflow reaches a HITL checkpoint?",
        "options": [
          {
            "id": "a",
            "text": "The workflow pauses and waits for human input or approval",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The workflow restarts automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The model retrains itself",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The context window expands",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are HITL checkpoints important in enterprise AI applications?",
        "options": [
          {
            "id": "a",
            "text": "They help ensure compliance, governance, and risk management",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They replace security controls",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They increase GPU utilization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They remove the need for testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI-powered expense approval system recommends reimbursement amounts, but a manager must approve payments above ₹50,000. What does this represent?",
        "options": [
          {
            "id": "a",
            "text": "Buffer Memory",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Human-in-the-Loop Checkpoint",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Vector Search",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context Window Management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What risk can arise if critical AI workflows operate without Human-in-the-Loop checkpoints?",
        "options": [
          {
            "id": "a",
            "text": "Increased oversight and accountability",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Potential execution of incorrect, unsafe, or non-compliant actions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Faster model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Improved semantic search",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between LangGraph and HITL checkpoints?",
        "options": [
          {
            "id": "a",
            "text": "LangGraph can pause workflow execution and wait for human decisions before continuing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "LangGraph eliminates the need for human review",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "LangGraph only supports fully autonomous workflows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "LangGraph replaces approval systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Human-in-the-Loop checkpoints?",
        "options": [
          {
            "id": "a",
            "text": "They allow humans to review and guide AI decisions at critical workflow stages",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are only used during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace AI reasoning entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They function as vector databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 8,
    "topic_sort": 3,
    "topic_title": "State persistence & recovery",
    "quiz_title": "State persistence & recovery — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is State Persistence in an AI workflow?",
        "options": [
          {
            "id": "a",
            "text": "The process of training a model repeatedly",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The ability to save workflow state and progress so it can be resumed later",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The storage of embeddings only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The generation of prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is State Persistence important in LangGraph-based applications?",
        "options": [
          {
            "id": "a",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It allows workflows to survive interruptions, crashes, or restarts",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It eliminates memory systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces vector databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does State Recovery refer to?",
        "options": [
          {
            "id": "a",
            "text": "Training a new model after failure",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Restoring a previously saved workflow state and continuing execution",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating new embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Resetting the workflow",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates State Persistence?",
        "options": [
          {
            "id": "a",
            "text": "Saving the current workflow status before calling an external API",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Generating a single response to a prompt",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating a vector embedding",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Running a one-time database query",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a common benefit of State Recovery?",
        "options": [
          {
            "id": "a",
            "text": "Faster model training",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduced need to repeat completed workflow steps after failures",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increased context window size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Automatic fine-tuning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a multi-step AI agent workflow, when should state typically be persisted?",
        "options": [
          {
            "id": "a",
            "text": "Only after the workflow finishes",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "At important checkpoints or state transitions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Only during model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Never",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI agent is processing 10,000 documents. After processing 8,000 documents, the system crashes. How does State Recovery help?",
        "options": [
          {
            "id": "a",
            "text": "It restarts from document 1",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It resumes from the last saved checkpoint instead of repeating completed work",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It deletes all processed documents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It retrains the model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which storage system is commonly used to support State Persistence?",
        "options": [
          {
            "id": "a",
            "text": "Databases, object storage, or persistent memory systems",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Prompt templates only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Tokenizers only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context windows only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does State Persistence support Human-in-the-Loop workflows?",
        "options": [
          {
            "id": "a",
            "text": "It stores workflow progress while waiting for human approval",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It eliminates the need for approvals",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It retrains the model automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes workflow checkpoints",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes State Persistence & Recovery?",
        "options": [
          {
            "id": "a",
            "text": "State Persistence saves workflow progress, while State Recovery restores and continues execution after interruptions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both concepts are only used during training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "State Recovery replaces memory systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "State Persistence is only used for embeddings",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 9,
    "topic_sort": 1,
    "topic_title": "CrewAI role-based teams",
    "quiz_title": "CrewAI role-based teams — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of CrewAI in Multi-Agent Systems?",
        "options": [
          {
            "id": "a",
            "text": "To train large language models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To coordinate multiple AI agents working together as a team",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store vector embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In CrewAI, what is a \"role\"?",
        "options": [
          {
            "id": "a",
            "text": "A database table",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A specific responsibility assigned to an agent within a team",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A vector embedding",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A context window",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are role-based teams useful in Multi-Agent Systems?",
        "options": [
          {
            "id": "a",
            "text": "They reduce model parameters",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They allow agents to specialize and collaborate efficiently",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They eliminate the need for prompts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace memory systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates a CrewAI role-based team?",
        "options": [
          {
            "id": "a",
            "text": "One agent handling every task independently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A Research Agent gathers information, a Writer Agent creates content, and a Reviewer Agent validates it",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database storing embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model generating tokens",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key benefit of assigning specialized roles to agents?",
        "options": [
          {
            "id": "a",
            "text": "Improved task quality and workflow efficiency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Larger context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced storage requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Elimination of reasoning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a CrewAI workflow, what is the role of a Manager or Coordinator Agent?",
        "options": [
          {
            "id": "a",
            "text": "To store vector embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To oversee tasks, assign work, and coordinate collaboration among agents",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To replace all other agents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To train language models",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A marketing crew consists of a Research Agent, Content Writer Agent, and SEO Reviewer Agent. What principle does this demonstrate?",
        "options": [
          {
            "id": "a",
            "text": "Role-Based Collaboration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Context Window Expansion",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Tokenization Strategy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Fine-Tuning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why might a Multi-Agent Crew outperform a single-agent system?",
        "options": [
          {
            "id": "a",
            "text": "Multiple agents can divide work and contribute specialized expertise",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Multi-agent systems require fewer prompts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They eliminate the need for memory",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They automatically increase model size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge can role-based teams help address?",
        "options": [
          {
            "id": "a",
            "text": "Managing complex workflows that require different types of expertise",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing GPU memory",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminating APIs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reducing embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes CrewAI role-based teams?",
        "options": [
          {
            "id": "a",
            "text": "Multiple specialized agents collaborate through defined roles to achieve a shared objective",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "CrewAI is used only for model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Role-based teams replace vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Every agent performs the same task",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 9,
    "topic_sort": 2,
    "topic_title": "AutoGen agent collaboration",
    "quiz_title": "AutoGen agent collaboration — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of AutoGen in Multi-Agent Systems?",
        "options": [
          {
            "id": "a",
            "text": "To train large language models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To enable multiple AI agents to collaborate and solve tasks through conversation and coordination",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store embeddings in vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage cloud infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In AutoGen, how do agents typically collaborate?",
        "options": [
          {
            "id": "a",
            "text": "By retraining each other",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Through message exchanges and task-oriented conversations",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "By sharing model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By increasing context windows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of using multiple agents in AutoGen?",
        "options": [
          {
            "id": "a",
            "text": "Reduced tokenization requirements",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Division of responsibilities among specialized agents",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Elimination of prompts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Automatic model fine-tuning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates AutoGen collaboration?",
        "options": [
          {
            "id": "a",
            "text": "A single AI model answering a question",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A Planner Agent creates a strategy, a Research Agent gathers information, and a Reviewer Agent validates the results",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database storing embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model generating tokens",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What role does communication play in AutoGen systems?",
        "options": [
          {
            "id": "a",
            "text": "It allows agents to exchange information and coordinate actions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes memory requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of task is most suitable for AutoGen agent collaboration?",
        "options": [
          {
            "id": "a",
            "text": "Complex, multi-step workflows requiring different skills or expertise",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Simple arithmetic calculations only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Tokenization tasks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating system updates",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of a Reviewer Agent in an AutoGen workflow?",
        "options": [
          {
            "id": "a",
            "text": "To store embeddings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To evaluate outputs, identify issues, and improve result quality",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To train new models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To increase context windows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does AutoGen differ from a single-agent architecture?",
        "options": [
          {
            "id": "a",
            "text": "AutoGen supports collaboration among multiple agents, while a single-agent system relies on one agent for all tasks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AutoGen eliminates reasoning",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Single-agent systems support more collaboration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "There is no difference",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge can AutoGen help address in enterprise AI systems?",
        "options": [
          {
            "id": "a",
            "text": "Coordinating complex workflows involving planning, execution, and validation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing hardware temperatures",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminating APIs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removing security requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AutoGen agent collaboration?",
        "options": [
          {
            "id": "a",
            "text": "Multiple AI agents communicate and collaborate to solve tasks more effectively than a single agent working alone",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AutoGen is only used for model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AutoGen replaces vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All agents perform identical tasks without communication",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 9,
    "topic_sort": 3,
    "topic_title": "Supervisor delegation pattern",
    "quiz_title": "Supervisor delegation pattern — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of the Supervisor Delegation Pattern in a Multi-Agent System?",
        "options": [
          {
            "id": "a",
            "text": "To train multiple language models simultaneously",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To use a central supervisor agent that assigns tasks to specialized agents",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store embeddings in a vector database",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To increase context window size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the main responsibility of a Supervisor Agent?",
        "options": [
          {
            "id": "a",
            "text": "Performing every task itself",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Managing, assigning, and monitoring tasks across multiple agents",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Training the underlying LLM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is the Supervisor Delegation Pattern useful in complex workflows?",
        "options": [
          {
            "id": "a",
            "text": "It eliminates the need for specialized agents",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It improves coordination and task distribution among agents",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It increases model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes memory systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates the Supervisor Delegation Pattern?",
        "options": [
          {
            "id": "a",
            "text": "A single agent handling all tasks independently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A Supervisor Agent assigning research to a Research Agent and validation to a Reviewer Agent",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A vector database performing searches",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model generating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of using specialized agents under a supervisor?",
        "options": [
          {
            "id": "a",
            "text": "Improved task quality through domain-specific expertise",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Larger context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced storage requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Elimination of prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a Supervisor Delegation workflow, what typically happens after an agent completes its assigned task?",
        "options": [
          {
            "id": "a",
            "text": "The workflow ends immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The result is returned to the supervisor for further coordination or decision-making",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The model retrains itself",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The vector database is updated automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A customer service system uses a Billing Agent for payment issues and a Technical Support Agent for product issues. Which pattern is being applied?",
        "options": [
          {
            "id": "a",
            "text": "Supervisor Delegation Pattern",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Tokenization Pattern",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embedding Pattern",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Fine-Tuning Pattern",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge can arise if a Supervisor Agent is poorly designed?",
        "options": [
          {
            "id": "a",
            "text": "Inefficient task allocation and workflow bottlenecks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased semantic search quality",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Improved collaboration automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduced memory usage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does the Supervisor Delegation Pattern differ from fully decentralized agent collaboration?",
        "options": [
          {
            "id": "a",
            "text": "A supervisor centrally manages tasks, while decentralized systems allow agents to coordinate directly with each other",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "There is no difference",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Decentralized systems require no communication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Supervisor systems eliminate specialized agents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the Supervisor Delegation Pattern?",
        "options": [
          {
            "id": "a",
            "text": "A central supervisor coordinates specialized agents by assigning, monitoring, and managing tasks to achieve a shared goal",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All agents perform identical tasks without coordination",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The supervisor replaces all specialized agents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The pattern is used only during model training",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 10,
    "topic_sort": 1,
    "topic_title": "LangSmith tracing & debugging",
    "quiz_title": "LangSmith tracing & debugging — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of LangSmith in AI application development?",
        "options": [
          {
            "id": "a",
            "text": "To train Large Language Models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To monitor, trace, debug, and evaluate LLM applications and agent workflows",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store embeddings in vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage cloud infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does \"tracing\" mean in LangSmith?",
        "options": [
          {
            "id": "a",
            "text": "Storing embeddings in a database",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Recording and visualizing the execution flow of an AI application",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Training a model on new data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Generating prompts automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is tracing important when building AI agents?",
        "options": [
          {
            "id": "a",
            "text": "It increases context window size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It helps developers understand decisions, identify failures, and troubleshoot workflows",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It replaces testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It improves internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which information can LangSmith traces typically capture?",
        "options": [
          {
            "id": "a",
            "text": "Prompt inputs, model outputs, tool calls, and execution steps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "GPU hardware specifications only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operating system files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Source code repositories only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of debugging in LangSmith?",
        "options": [
          {
            "id": "a",
            "text": "To retrain the model",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To identify and resolve errors, unexpected behaviors, or workflow failures",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To expand context windows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A LangGraph workflow unexpectedly produces incorrect outputs. How can LangSmith help?",
        "options": [
          {
            "id": "a",
            "text": "By visualizing the workflow execution path and identifying problematic steps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By automatically retraining the model",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By deleting workflow logs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By replacing the workflow",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of using LangSmith for observability?",
        "options": [
          {
            "id": "a",
            "text": "It provides transparency into how AI applications operate internally",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It removes the need for testing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates memory systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates the value of LangSmith tracing?",
        "options": [
          {
            "id": "a",
            "text": "Investigating why an agent selected the wrong tool during task execution",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Compressing embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Installing software updates",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does LangSmith support evaluation in AI applications?",
        "options": [
          {
            "id": "a",
            "text": "By tracking workflow performance and helping measure output quality",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By replacing language models",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By eliminating prompts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By storing vector embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes LangSmith Tracing & Debugging?",
        "options": [
          {
            "id": "a",
            "text": "LangSmith provides visibility into AI workflows by recording execution details, helping developers monitor, evaluate, and debug applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "LangSmith is only used for model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "LangSmith replaces observability tools entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "LangSmith functions as a vector database",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 10,
    "topic_sort": 2,
    "topic_title": "LangFuse & AgentOps monitoring",
    "quiz_title": "LangFuse & AgentOps monitoring — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of tools like LangFuse and AgentOps?",
        "options": [
          {
            "id": "a",
            "text": "To train Large Language Models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To monitor, observe, and evaluate AI agents and LLM applications in production",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage operating systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is observability in the context of AI applications?",
        "options": [
          {
            "id": "a",
            "text": "The process of increasing model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The ability to monitor, analyze, and understand how an AI system behaves during execution",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The storage of embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The creation of prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of information can LangFuse typically track?",
        "options": [
          {
            "id": "a",
            "text": "Prompts, responses, token usage, latency, and application traces",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Operating system updates only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "GPU temperatures only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database schemas only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary focus of AgentOps?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring and managing AI agents, workflows, and operational performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Training neural networks",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Building vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is monitoring important for AI agents in production environments?",
        "options": [
          {
            "id": "a",
            "text": "To understand performance, detect failures, and improve reliability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To eliminate prompts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To replace language models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce context windows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which metric would be most useful when evaluating an AI application's efficiency?",
        "options": [
          {
            "id": "a",
            "text": "Token usage and response latency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Screen brightness",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Keyboard layout",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating system version",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to know why an AI agent failed to complete a workflow. Which capability provided by LangFuse or AgentOps would be most useful?",
        "options": [
          {
            "id": "a",
            "text": "Workflow tracing and execution logs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "GPU overclocking",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Database compression",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "File encryption",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How can LangFuse and AgentOps contribute to AI application evaluation?",
        "options": [
          {
            "id": "a",
            "text": "By providing metrics and insights that help measure performance and output quality",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By automatically retraining models",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By replacing testing procedures",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By increasing model parameters",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates the value of AI monitoring tools?",
        "options": [
          {
            "id": "a",
            "text": "Tracking how often an agent uses tools and identifying where errors occur",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Installing operating system patches",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Generating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes LangFuse and AgentOps?",
        "options": [
          {
            "id": "a",
            "text": "They provide observability, monitoring, tracing, and evaluation capabilities for AI applications and agents",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are used only for model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They function as language models",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 10,
    "topic_sort": 3,
    "topic_title": "Agent evaluation metrics",
    "quiz_title": "Agent evaluation metrics — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of agent evaluation metrics?",
        "options": [
          {
            "id": "a",
            "text": "To increase model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To measure the performance, quality, and reliability of AI agents",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To train language models",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which metric measures whether an AI agent successfully completes a task?",
        "options": [
          {
            "id": "a",
            "text": "Latency",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Task Success Rate",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Token Count",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context Window Size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does latency measure in an AI agent system?",
        "options": [
          {
            "id": "a",
            "text": "The amount of memory used",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The time taken to generate a response or complete a task",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The number of embeddings stored",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The size of the training dataset",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is accuracy an important evaluation metric for AI agents?",
        "options": [
          {
            "id": "a",
            "text": "It measures how correctly the agent performs tasks or provides information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It reduces storage requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces monitoring systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does \"Hallucination Rate\" measure?",
        "options": [
          {
            "id": "a",
            "text": "The percentage of responses containing incorrect or fabricated information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The number of tool calls made by an agent",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The speed of vector search",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The size of the prompt",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which metric is most useful for tracking the operational cost of an AI agent?",
        "options": [
          {
            "id": "a",
            "text": "Token Usage",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Accuracy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "State Persistence",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context Retention",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does Tool Usage Success Rate evaluate?",
        "options": [
          {
            "id": "a",
            "text": "How often external tools or APIs are used successfully by the agent",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "How many prompts are generated",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The quality of embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The size of the vector database",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to measure how often users are satisfied with an AI assistant's responses. Which metric would be most relevant?",
        "options": [
          {
            "id": "a",
            "text": "User Satisfaction Score",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Context Window Size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embedding Dimension",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "GPU Utilization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is evaluating workflow completion important in Multi-Agent Systems?",
        "options": [
          {
            "id": "a",
            "text": "It helps determine whether agents are successfully collaborating to achieve goals",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It eliminates memory systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces observability tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes agent evaluation metrics?",
        "options": [
          {
            "id": "a",
            "text": "They provide measurable indicators of an agent's performance, quality, reliability, and efficiency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are only used during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace monitoring systems entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They function as vector databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 11,
    "topic_sort": 1,
    "topic_title": "FastAPI agent endpoints",
    "quiz_title": "FastAPI agent endpoints — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of FastAPI in AI agent deployment?",
        "options": [
          {
            "id": "a",
            "text": "To train language models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To expose AI agent functionality through RESTful APIs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To store vector data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an API endpoint in a FastAPI-based AI application?",
        "options": [
          {
            "id": "a",
            "text": "A database table",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A URL that receives requests and returns responses from the AI agent",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A vector embedding",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A model checkpoint",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are FastAPI endpoints commonly used for AI agents?",
        "options": [
          {
            "id": "a",
            "text": "They provide a simple and scalable way to integrate AI capabilities into applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They eliminate prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which HTTP method is most commonly used to send user queries to an AI agent endpoint?",
        "options": [
          {
            "id": "a",
            "text": "GET",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "POST",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "DELETE",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "PATCH",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a common responsibility of a FastAPI endpoint in an AI application?",
        "options": [
          {
            "id": "a",
            "text": "Receiving user input, invoking the AI agent, and returning the generated response",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Training the model from scratch",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating vector embeddings only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing operating system updates",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is request validation important in FastAPI agent endpoints?",
        "options": [
          {
            "id": "a",
            "text": "To ensure incoming data is properly formatted and safe to process",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To improve GPU performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace authentication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which feature makes FastAPI particularly popular for AI deployments?",
        "options": [
          {
            "id": "a",
            "text": "Automatic API documentation generation using OpenAPI and Swagger UI",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Unlimited context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Built-in vector databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A chatbot frontend sends a message to an AI backend through a FastAPI endpoint. What happens next?",
        "options": [
          {
            "id": "a",
            "text": "The endpoint processes the request, calls the AI agent, and returns a response",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The model retrains itself",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The endpoint creates a new database automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The request is ignored",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which deployment scenario best demonstrates the use of FastAPI agent endpoints?",
        "options": [
          {
            "id": "a",
            "text": "A customer support application sending user queries to an AI service through REST APIs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A local text file editor",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A spreadsheet application without APIs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A hardware driver installation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes FastAPI agent endpoints?",
        "options": [
          {
            "id": "a",
            "text": "They provide a scalable API interface that allows external systems to communicate with AI agents",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They replace language models entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They are used only during model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They function as vector databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 11,
    "topic_sort": 2,
    "topic_title": "Docker & Docker Compose",
    "quiz_title": "Docker & Docker Compose — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of Docker?",
        "options": [
          {
            "id": "a",
            "text": "To train machine learning models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To package applications and their dependencies into portable containers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Docker container?",
        "options": [
          {
            "id": "a",
            "text": "A virtual machine with a separate operating system",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A lightweight, isolated environment that runs an application and its dependencies",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A cloud storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A programming language",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Docker commonly used in AI and Agent deployments?",
        "options": [
          {
            "id": "a",
            "text": "It ensures consistent application behavior across development, testing, and production environments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces APIs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates the need for cloud services",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Docker Image?",
        "options": [
          {
            "id": "a",
            "text": "A running container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A blueprint or template used to create containers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database backup",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A vector embedding",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Docker Compose primarily used for?",
        "options": [
          {
            "id": "a",
            "text": "Managing multiple containers as a single application stack",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Training language models",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Monitoring APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which file is commonly used to define services in Docker Compose?",
        "options": [
          {
            "id": "a",
            "text": "requirements.txt",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker-compose.yml",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "config.json",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "package-lock.json",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI application consists of a FastAPI service, a PostgreSQL database, and a ChromaDB instance. Why would Docker Compose be useful?",
        "options": [
          {
            "id": "a",
            "text": "It can start and manage all services together with a single command",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases context window size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It trains the model automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of containerization with Docker?",
        "options": [
          {
            "id": "a",
            "text": "Portability across different environments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Unlimited storage capacity",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Elimination of networking requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens when the command docker-compose up is executed?",
        "options": [
          {
            "id": "a",
            "text": "It creates and starts all defined services in the Compose configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It deletes containers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It trains a language model",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It creates embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Docker and Docker Compose?",
        "options": [
          {
            "id": "a",
            "text": "Docker packages applications into containers, while Docker Compose manages multiple containers as a unified application",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Docker and Docker Compose are identical tools",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Docker Compose replaces Docker entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Both tools are used only for machine learning training",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 11,
    "topic_sort": 3,
    "topic_title": "Streaming responses to clients",
    "quiz_title": "Streaming responses to clients — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is meant by \"Streaming Responses\" in AI applications?",
        "options": [
          {
            "id": "a",
            "text": "Downloading model weights continuously",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Sending generated output to the client incrementally as it is produced",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Storing responses in a database",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Training models in real time",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is streaming commonly used in LLM-powered applications?",
        "options": [
          {
            "id": "a",
            "text": "It reduces model accuracy",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It improves perceived responsiveness and user experience",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It eliminates tokenization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It increases model parameters",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key benefit of streaming responses in chat applications?",
        "options": [
          {
            "id": "a",
            "text": "Users can begin reading the answer before the complete response is generated",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The model requires less memory",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The context window becomes larger",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The application stops using APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which protocol is commonly used to deliver streamed responses from a server to a client?",
        "options": [
          {
            "id": "a",
            "text": "FTP",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Server-Sent Events (SSE) or WebSockets",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "SMTP",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SNMP",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does streaming differ from a traditional request-response workflow?",
        "options": [
          {
            "id": "a",
            "text": "Traditional workflows return the entire response at once, while streaming delivers partial outputs incrementally",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Streaming requires model retraining",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Streaming removes the need for APIs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Both approaches work identically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In an AI chatbot, what is typically streamed to the user?",
        "options": [
          {
            "id": "a",
            "text": "Model training data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Tokens or chunks of generated text as they are produced",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Vector embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why can streaming improve the perceived performance of an AI application?",
        "options": [
          {
            "id": "a",
            "text": "It allows users to see progress immediately instead of waiting for the full response",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases model parameters",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It reduces storage requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates latency completely",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which deployment scenario benefits most from streaming responses?",
        "options": [
          {
            "id": "a",
            "text": "Real-time chat assistants and conversational AI applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Static website hosting",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "File storage systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating system updates",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What challenge should developers consider when implementing streaming?",
        "options": [
          {
            "id": "a",
            "text": "Handling partial outputs, connection management, and client-side updates",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing model size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Removing authentication mechanisms",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Eliminating monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes streaming responses to clients?",
        "options": [
          {
            "id": "a",
            "text": "Streaming delivers generated content incrementally, improving responsiveness and user experience in AI applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Streaming is only used during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Streaming replaces APIs entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Streaming functions as a vector database",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 12,
    "topic_sort": 1,
    "topic_title": "AWS Bedrock & Azure OpenAI overview",
    "quiz_title": "AWS Bedrock & Azure OpenAI overview — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of cloud AI platforms such as AWS Bedrock and Azure OpenAI?",
        "options": [
          {
            "id": "a",
            "text": "To train operating systems",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To provide managed access to foundation models and AI services through cloud infrastructure",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To replace databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create hardware devices",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is AWS Bedrock?",
        "options": [
          {
            "id": "a",
            "text": "A managed AWS service that provides access to foundation models through APIs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A vector database",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A container orchestration platform",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A programming language",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Azure OpenAI Service?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A managed cloud service that provides access to OpenAI models within the Azure ecosystem",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A monitoring platform",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A web browser",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of AWS Bedrock?",
        "options": [
          {
            "id": "a",
            "text": "Access to multiple foundation model providers through a single managed service",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic model training for every request",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Unlimited context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Built-in relational databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do enterprises often choose Azure OpenAI?",
        "options": [
          {
            "id": "a",
            "text": "It offers integration with Azure services, security controls, and enterprise compliance capabilities",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It eliminates cloud costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces APIs entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It removes authentication requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which use case is suitable for both AWS Bedrock and Azure OpenAI?",
        "options": [
          {
            "id": "a",
            "text": "Building chatbots, AI assistants, summarization tools, and RAG applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Installing operating systems",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating physical hardware devices",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing network switches",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a common benefit of using managed AI services instead of self-hosting models?",
        "options": [
          {
            "id": "a",
            "text": "Reduced infrastructure management and operational complexity",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Larger model sizes automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Elimination of API usage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Unlimited storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company already uses AWS extensively and wants to build a generative AI application. Which platform would typically align well with its existing ecosystem?",
        "options": [
          {
            "id": "a",
            "text": "AWS Bedrock",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Desktop Software Only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Spreadsheet Applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Local File Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement accurately compares AWS Bedrock and Azure OpenAI?",
        "options": [
          {
            "id": "a",
            "text": "Both provide managed access to powerful AI models, but they are integrated into different cloud ecosystems",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both are vector databases",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Both replace language models entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Both are used only for model training",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Bedrock and Azure OpenAI?",
        "options": [
          {
            "id": "a",
            "text": "They are managed cloud AI platforms that provide scalable access to foundation models for building AI-powered applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are operating systems",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace observability tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They function as container orchestration platforms",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 12,
    "topic_sort": 2,
    "topic_title": "Cost optimization strategies",
    "quiz_title": "Cost optimization strategies — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary goal of cost optimization in AI applications?",
        "options": [
          {
            "id": "a",
            "text": "To increase model size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To reduce operational expenses while maintaining acceptable performance and quality",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To eliminate monitoring systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To increase token usage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which factor most directly impacts the cost of LLM-based applications?",
        "options": [
          {
            "id": "a",
            "text": "Token usage",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Screen resolution",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Keyboard layout",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating system version",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How can prompt optimization help reduce AI costs?",
        "options": [
          {
            "id": "a",
            "text": "By reducing unnecessary tokens and making requests more efficient",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing context windows automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By retraining the model",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By eliminating APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is choosing the right model important for cost optimization?",
        "options": [
          {
            "id": "a",
            "text": "Different models have varying costs, capabilities, and performance characteristics",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All models cost exactly the same",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Model selection only affects accuracy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Models do not impact expenses",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which strategy can reduce repeated AI processing costs?",
        "options": [
          {
            "id": "a",
            "text": "Caching frequently requested responses",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing token usage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Expanding context windows unnecessarily",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disabling monitoring tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How can Retrieval-Augmented Generation (RAG) contribute to cost optimization?",
        "options": [
          {
            "id": "a",
            "text": "By providing relevant context and reducing the need for large prompts or model fine-tuning",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing model size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By eliminating vector databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By removing APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is monitoring token usage important?",
        "options": [
          {
            "id": "a",
            "text": "It helps organizations understand and control AI-related expenses",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It improves GPU performance automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates latency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which deployment strategy can improve cost efficiency for AI workloads?",
        "options": [
          {
            "id": "a",
            "text": "Auto-scaling resources based on demand",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Running maximum resources continuously regardless of traffic",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disabling performance monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Using the largest model for every task",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses a premium LLM for all requests, including simple FAQ responses. What cost optimization opportunity exists?",
        "options": [
          {
            "id": "a",
            "text": "Use smaller or less expensive models for simple tasks and reserve advanced models for complex requests",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increase token limits",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disable caching",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Expand prompts unnecessarily",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes cost optimization strategies for AI systems?",
        "options": [
          {
            "id": "a",
            "text": "Cost optimization involves managing token usage, selecting appropriate models, caching results, monitoring usage, and scaling resources efficiently",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Cost optimization focuses only on reducing hardware costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It eliminates the need for AI monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces security controls",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 12,
    "topic_sort": 3,
    "topic_title": "Security & access control for agents",
    "quiz_title": "Security & access control for agents — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of security in AI agent systems?",
        "options": [
          {
            "id": "a",
            "text": "To increase model parameters",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To protect data, systems, and resources from unauthorized access or misuse",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To generate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To improve tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does \"Access Control\" mean in AI applications?",
        "options": [
          {
            "id": "a",
            "text": "Allowing unrestricted access to all resources",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Defining who or what can access specific systems, tools, or data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increasing context window size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Training language models",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why should AI agents follow the Principle of Least Privilege (PoLP)?",
        "options": [
          {
            "id": "a",
            "text": "To grant only the minimum permissions required to perform tasks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To maximize system access",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To increase model performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate authentication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which authentication mechanism is commonly used to secure AI APIs?",
        "options": [
          {
            "id": "a",
            "text": "API Keys, OAuth, or Token-Based Authentication",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Context Windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Prompt Templates",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is authorization important after authentication?",
        "options": [
          {
            "id": "a",
            "text": "Authentication identifies users, while authorization determines what actions they are allowed to perform",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Authorization replaces authentication",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Authorization increases token limits",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Authorization creates embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A customer support agent can read customer information but cannot modify billing records. What security concept does this demonstrate?",
        "options": [
          {
            "id": "a",
            "text": "Role-Based Access Control (RBAC)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Tokenization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Fine-Tuning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Context Expansion",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why should tool access be restricted in AI agents?",
        "options": [
          {
            "id": "a",
            "text": "To prevent agents from performing unauthorized or potentially harmful actions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase model size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To improve embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of audit logging in AI systems?",
        "options": [
          {
            "id": "a",
            "text": "To record actions and events for monitoring, troubleshooting, and compliance purposes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To retrain models automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To increase context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To generate prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates secure AI agent design?",
        "options": [
          {
            "id": "a",
            "text": "An agent with unrestricted access to all company systems",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "An agent with role-based permissions, authentication, and activity logging",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "An agent without monitoring or controls",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An agent that bypasses security checks",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Security & Access Control for Agents?",
        "options": [
          {
            "id": "a",
            "text": "AI agents should operate with authenticated, authorized, and least-privileged access while maintaining auditability and security controls",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Security is only needed during model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Access control eliminates the need for monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Agents should have unrestricted access to maximize efficiency",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 1,
    "topic_sort": 1,
    "topic_title": "What is cloud computing?",
    "quiz_title": "What is cloud computing? — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is cloud computing?",
        "options": [
          {
            "id": "a",
            "text": "Using a computer without internet access",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Delivering computing services such as servers, storage, databases, and networking over the internet",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Building hardware components manually",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Installing software only on local machines",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a key characteristic of cloud computing?",
        "options": [
          {
            "id": "a",
            "text": "Fixed hardware capacity",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "On-demand access to computing resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Manual server provisioning only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Permanent hardware ownership",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do businesses adopt cloud computing?",
        "options": [
          {
            "id": "a",
            "text": "To increase infrastructure costs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To gain scalability, flexibility, and cost efficiency",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To eliminate internet usage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To avoid data storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a cloud computing service?",
        "options": [
          {
            "id": "a",
            "text": "Purchasing a physical server for a data center",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Using AWS EC2 to launch virtual machines on demand",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Installing software from a DVD",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Building a personal computer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does \"on-demand\" mean in cloud computing?",
        "options": [
          {
            "id": "a",
            "text": "Resources are available only during business hours",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Resources can be provisioned whenever needed without waiting for hardware purchases",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Resources are available only after approval from the provider",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Resources are permanently allocated",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which cloud computing benefit allows applications to handle increased traffic automatically?",
        "options": [
          {
            "id": "a",
            "text": "Virtualization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Scalability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Encryption",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Tokenization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the pay-as-you-go pricing model?",
        "options": [
          {
            "id": "a",
            "text": "Users pay a fixed amount regardless of usage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Users pay only for the cloud resources they consume",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Users purchase hardware upfront",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Users pay only once",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A startup launches a website and expects traffic to increase rapidly. Why is cloud computing beneficial?",
        "options": [
          {
            "id": "a",
            "text": "It allows resources to scale as demand grows without major hardware investments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It eliminates the need for security",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It prevents internet access",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It reduces website functionality",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is NOT typically considered a cloud computing benefit?",
        "options": [
          {
            "id": "a",
            "text": "Scalability",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Elasticity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "High upfront hardware investment",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Cost efficiency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes cloud computing?",
        "options": [
          {
            "id": "a",
            "text": "Cloud computing delivers IT resources over the internet with flexibility, scalability, and pay-as-you-go pricing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Cloud computing requires organizations to own all infrastructure",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cloud computing eliminates networking requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud computing is only used by large enterprises",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 1,
    "topic_sort": 2,
    "topic_title": "IaaS, PaaS & SaaS service models",
    "quiz_title": "IaaS, PaaS & SaaS service models — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What are IaaS, PaaS, and SaaS in cloud computing?",
        "options": [
          {
            "id": "a",
            "text": "Types of databases",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Cloud service delivery models that define how resources are provided to users",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Networking protocols",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security frameworks",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does IaaS stand for?",
        "options": [
          {
            "id": "a",
            "text": "Internet as a Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Infrastructure as a Service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Integration as a Service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Information as a Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service is a common example of IaaS?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Gmail",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Microsoft Word Online",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Salesforce CRM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does PaaS stand for?",
        "options": [
          {
            "id": "a",
            "text": "Platform as a Service",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Processing as a Service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Programming as a Service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Protocol as a Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of PaaS?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS Elastic Beanstalk",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Physical Server",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network Switch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does SaaS stand for?",
        "options": [
          {
            "id": "a",
            "text": "Storage as a Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Software as a Service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Security as a Service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Server as a Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of SaaS?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS Lambda",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Google Workspace",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon VPC",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which service model provides the highest level of user control over infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "SaaS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "PaaS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IaaS",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "All provide equal control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which service model requires the least infrastructure management from the customer?",
        "options": [
          {
            "id": "a",
            "text": "IaaS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "PaaS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "SaaS",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Hybrid Cloud",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes IaaS, PaaS, and SaaS?",
        "options": [
          {
            "id": "a",
            "text": "IaaS provides infrastructure, PaaS provides development platforms, and SaaS provides complete software solutions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All three models provide identical services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "SaaS offers more infrastructure control than IaaS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "PaaS replaces cloud computing",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 1,
    "topic_sort": 3,
    "topic_title": "Public, private & hybrid cloud",
    "quiz_title": "Public, private & hybrid cloud — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is a cloud deployment model?",
        "options": [
          {
            "id": "a",
            "text": "A method for training AI models",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A way of defining where cloud infrastructure is deployed and who can access it",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A type of database architecture",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A programming framework",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Public Cloud?",
        "options": [
          {
            "id": "a",
            "text": "A cloud environment owned and operated by a third-party provider and shared among multiple customers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A cloud environment used by only one organization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A cloud deployed without internet access",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A personal computer network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a Public Cloud provider?",
        "options": [
          {
            "id": "a",
            "text": "On-premises data center",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon Web Services",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Local Network Server",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Physical Desktop Computer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Private Cloud?",
        "options": [
          {
            "id": "a",
            "text": "A cloud environment dedicated to a single organization",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A public cloud shared by everyone",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A cloud service available only during business hours",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud without security controls",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why might an organization choose a Private Cloud?",
        "options": [
          {
            "id": "a",
            "text": "For enhanced security, compliance, and control over resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To eliminate networking requirements",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To avoid data storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce internet usage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Hybrid Cloud?",
        "options": [
          {
            "id": "a",
            "text": "A cloud model that combines public cloud and private cloud environments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A cloud with multiple databases",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A cloud without internet access",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud that supports only AI workloads",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which scenario best demonstrates a Hybrid Cloud approach?",
        "options": [
          {
            "id": "a",
            "text": "Running all workloads in a public cloud",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Keeping sensitive data in a private cloud while hosting customer-facing applications in a public cloud",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Using only on-premises servers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Storing files on a personal laptop",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of Public Cloud?",
        "options": [
          {
            "id": "a",
            "text": "High scalability and lower upfront infrastructure costs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Complete hardware ownership",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "No internet requirement",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Unlimited security by default",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a major benefit of Hybrid Cloud?",
        "options": [
          {
            "id": "a",
            "text": "Flexibility to place workloads in the most appropriate environment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Elimination of cloud costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removal of security requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Public, Private, and Hybrid Cloud models?",
        "options": [
          {
            "id": "a",
            "text": "Public Cloud is shared infrastructure, Private Cloud is dedicated infrastructure, and Hybrid Cloud combines both approaches",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All three models are identical",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Private Cloud is less secure than Public Cloud",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Hybrid Cloud replaces Public Cloud entirely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 1,
    "topic_sort": 4,
    "topic_title": "AWS global infrastructure",
    "quiz_title": "AWS global infrastructure — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of AWS Global Infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "To train AI models only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To provide highly available, scalable, and low-latency cloud services worldwide",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage local computer networks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace the internet",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an AWS Region?",
        "options": [
          {
            "id": "a",
            "text": "A physical server",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A geographic area containing multiple Availability Zones",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A virtual machine",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A storage device",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why does AWS have multiple Regions around the world?",
        "options": [
          {
            "id": "a",
            "text": "To provide redundancy, compliance options, and lower latency for customers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase electricity consumption",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To eliminate networking requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce storage capacity",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Availability Zone (AZ)?",
        "options": [
          {
            "id": "a",
            "text": "A collection of one or more physically separate data centers within a Region",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A cloud storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A networking protocol",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine image",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Availability Zones physically separated?",
        "options": [
          {
            "id": "a",
            "text": "To reduce the impact of failures such as power outages or natural disasters",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase API costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To improve tokenization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS infrastructure component is primarily used to deliver content with low latency to end users?",
        "options": [
          {
            "id": "a",
            "text": "Edge Locations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EC2 Instances",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the relationship between Regions and Availability Zones?",
        "options": [
          {
            "id": "a",
            "text": "A Region contains multiple Availability Zones",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "An Availability Zone contains multiple Regions",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They are identical concepts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Neither depends on the other",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants high availability for its application. Which AWS design practice should it follow?",
        "options": [
          {
            "id": "a",
            "text": "Deploy resources across multiple Availability Zones",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Use only one Availability Zone",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disable backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Store all resources on one server",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS Global Infrastructure component helps reduce latency by serving content closer to users?",
        "options": [
          {
            "id": "a",
            "text": "Edge Location",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Availability Zone",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM Role",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Global Infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "AWS Global Infrastructure consists of Regions, Availability Zones, and Edge Locations that provide scalability, fault tolerance, and low-latency services worldwide",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS operates from a single global data center",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Regions and Availability Zones are the same thing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Edge Locations are used only for storage",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 1,
    "topic_sort": 5,
    "topic_title": "Regions & Availability Zones",
    "quiz_title": "Regions & Availability Zones — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is an AWS Region?",
        "options": [
          {
            "id": "a",
            "text": "A virtual machine running in AWS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A geographic area that contains multiple Availability Zones",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A networking protocol",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Availability Zone (AZ)?",
        "options": [
          {
            "id": "a",
            "text": "A user account in AWS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "One or more isolated data centers within an AWS Region",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A cloud storage bucket",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How many Availability Zones does an AWS Region typically contain?",
        "options": [
          {
            "id": "a",
            "text": "Only one",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Multiple Availability Zones",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Unlimited Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "None",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why does AWS use multiple Availability Zones within a Region?",
        "options": [
          {
            "id": "a",
            "text": "To improve high availability and fault tolerance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase hardware costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To eliminate networking requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce storage capacity",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Regions and Availability Zones?",
        "options": [
          {
            "id": "a",
            "text": "Availability Zones contain Regions",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Regions contain multiple Availability Zones",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They are identical concepts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They operate independently",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Availability Zones physically separated from each other?",
        "options": [
          {
            "id": "a",
            "text": "To reduce the risk of a single failure affecting all resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase latency",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To eliminate backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce internet access",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company deploys its application across two Availability Zones. What benefit does this provide?",
        "options": [
          {
            "id": "a",
            "text": "Increased fault tolerance and availability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic model training",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Larger context windows",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduced internet usage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS infrastructure component should you choose when you want to deploy resources closer to users in a specific geographic location?",
        "options": [
          {
            "id": "a",
            "text": "Region",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Policy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "S3 Bucket",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a common reason for selecting a specific AWS Region?",
        "options": [
          {
            "id": "a",
            "text": "Lower latency, compliance requirements, or proximity to customers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminating backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Regions and Availability Zones?",
        "options": [
          {
            "id": "a",
            "text": "Regions are geographic locations that contain multiple isolated Availability Zones designed for high availability and fault tolerance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Regions and Availability Zones are the same thing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Availability Zones contain multiple Regions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Availability Zones are used only for storage",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 1,
    "topic_sort": 6,
    "topic_title": "AWS Shared Responsibility Model",
    "quiz_title": "AWS Shared Responsibility Model — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the AWS Shared Responsibility Model?",
        "options": [
          {
            "id": "a",
            "text": "A pricing model used by AWS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A framework that defines security responsibilities shared between AWS and customers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A networking architecture",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud deployment model",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does AWS mean by \"Security of the Cloud\"?",
        "options": [
          {
            "id": "a",
            "text": "Protecting customer application code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Protecting the AWS infrastructure that runs cloud services",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Managing customer passwords",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Configuring customer firewalls",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does the customer typically manage under \"Security in the Cloud\"?",
        "options": [
          {
            "id": "a",
            "text": "AWS data center buildings",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Physical servers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "User access, data protection, and application security",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "AWS global network infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is AWS's responsibility?",
        "options": [
          {
            "id": "a",
            "text": "Configuring IAM users",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Managing operating system patches on customer-managed EC2 instances",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Securing physical data centers",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Creating security groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is typically the customer's responsibility when using Amazon EC2?",
        "options": [
          {
            "id": "a",
            "text": "Protecting the AWS Region",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Managing the guest operating system and its updates",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Securing AWS hardware",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Maintaining data center cooling systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is the Shared Responsibility Model important?",
        "options": [
          {
            "id": "a",
            "text": "It clarifies security ownership and helps prevent security gaps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases cloud costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It eliminates compliance requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces IAM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Amazon S3, who is responsible for configuring bucket permissions?",
        "options": [
          {
            "id": "a",
            "text": "AWS only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The customer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Internet Service Providers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes responsibility for data encryption?",
        "options": [
          {
            "id": "a",
            "text": "AWS always encrypts and manages customer data automatically",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Customers are generally responsible for deciding how their data is encrypted and protected",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Encryption is not required in cloud environments",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS customers cannot use encryption",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does the Shared Responsibility Model change with managed services such as AWS RDS?",
        "options": [
          {
            "id": "a",
            "text": "Customers have more infrastructure responsibilities",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS assumes more operational responsibilities compared to EC2",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "AWS assumes all responsibilities",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "There is no difference",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the AWS Shared Responsibility Model?",
        "options": [
          {
            "id": "a",
            "text": "AWS secures the cloud infrastructure, while customers secure their data, applications, and configurations within the cloud",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS handles all security responsibilities",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Customers manage AWS data centers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security is optional in AWS",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 2,
    "topic_sort": 1,
    "topic_title": "IAM users, groups & roles",
    "quiz_title": "IAM users, groups & roles — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does IAM stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Internet Access Management",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Identity and Access Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Infrastructure Access Monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Internal Application Management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of AWS IAM?",
        "options": [
          {
            "id": "a",
            "text": "To create virtual machines",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To manage authentication and authorization for AWS resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To store application logs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To monitor network traffic",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an IAM User?",
        "options": [
          {
            "id": "a",
            "text": "A physical server in AWS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A digital identity created for an individual person or application requiring AWS access",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A virtual private cloud",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A storage bucket",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are IAM Groups used?",
        "options": [
          {
            "id": "a",
            "text": "To store files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To organize IAM users and assign permissions collectively",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create virtual machines",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company has 20 developers who need identical AWS permissions. What is the recommended approach?",
        "options": [
          {
            "id": "a",
            "text": "Create separate policies for each user",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Add all developers to an IAM Group with the required permissions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Give everyone administrator access",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create multiple AWS accounts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an IAM Role?",
        "options": [
          {
            "id": "a",
            "text": "A permanent AWS user account",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "An AWS identity that provides temporary permissions and can be assumed by users, applications, or services",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A network firewall",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service commonly uses IAM Roles to access other AWS resources securely?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon S3 only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "CloudFront only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53 only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are IAM Roles generally preferred over hard-coded access keys in applications?",
        "options": [
          {
            "id": "a",
            "text": "They provide temporary credentials and improve security",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They eliminate permissions management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They improve internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS security principle recommends granting only the permissions necessary to perform a task?",
        "options": [
          {
            "id": "a",
            "text": "High Availability",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Elasticity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Principle of Least Privilege",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Auto Scaling",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes IAM Users, Groups, and Roles?",
        "options": [
          {
            "id": "a",
            "text": "Users represent identities, Groups simplify permission management, and Roles provide temporary access to AWS resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Users, Groups, and Roles perform the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Roles permanently replace users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Groups provide temporary credentials",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 2,
    "topic_sort": 2,
    "topic_title": "IAM policies & permission boundaries",
    "quiz_title": "IAM policies & permission boundaries — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is an IAM Policy in AWS?",
        "options": [
          {
            "id": "a",
            "text": "A virtual machine configuration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A JSON document that defines permissions for AWS resources and actions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A networking protocol",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of an IAM Policy?",
        "options": [
          {
            "id": "a",
            "text": "To store application logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To define permissions and control access to AWS services and resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To create Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which format is used to write AWS IAM Policies?",
        "options": [
          {
            "id": "a",
            "text": "XML",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "YAML",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "JSON",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "CSV",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What are the main elements of an IAM Policy statement?",
        "options": [
          {
            "id": "a",
            "text": "Effect, Action, Resource, and Condition",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "User, Password, Region, and Zone",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Server, Network, Storage, and Compute",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Bucket, Object, Volume, and Snapshot",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does the \"Effect\" field in an IAM Policy specify?",
        "options": [
          {
            "id": "a",
            "text": "Which Region is used",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Whether an action is Allowed or Denied",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The storage size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The instance type",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Permission Boundary in AWS IAM?",
        "options": [
          {
            "id": "a",
            "text": "A maximum limit that defines the highest permissions an IAM user or role can receive",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A networking boundary between Regions",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A backup policy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A storage quota",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Permission Boundaries useful in large organizations?",
        "options": [
          {
            "id": "a",
            "text": "They help enforce security controls and prevent excessive permissions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase EC2 performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They create Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace IAM Policies",
            "is_correct": false
          }
        ]
      },
      {
        "question": "If an IAM Role has a policy allowing S3 access but a Permission Boundary does not allow S3 actions, what happens?",
        "options": [
          {
            "id": "a",
            "text": "S3 access is allowed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "S3 access is denied because Permission Boundaries limit maximum permissions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "AWS ignores the Permission Boundary",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The role receives administrator access",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between IAM Policies and Permission Boundaries?",
        "options": [
          {
            "id": "a",
            "text": "Policies grant permissions, while Permission Boundaries define the maximum permissions that can be granted",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Permission Boundaries replace Policies entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Policies and Boundaries are identical",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Permission Boundaries automatically grant administrator access",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes IAM Policies and Permission Boundaries?",
        "options": [
          {
            "id": "a",
            "text": "IAM Policies define access permissions, while Permission Boundaries restrict the maximum permissions users and roles can obtain",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both are used only for billing purposes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Permission Boundaries increase storage capacity",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Policies and Boundaries are unrelated to security",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 2,
    "topic_sort": 3,
    "topic_title": "MFA & credential security",
    "quiz_title": "MFA & credential security — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does MFA stand for in AWS security?",
        "options": [
          {
            "id": "a",
            "text": "Multi-Factor Authentication",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Managed File Access",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Multi-Function Authorization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managed Firewall Architecture",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is MFA important for AWS accounts?",
        "options": [
          {
            "id": "a",
            "text": "It increases storage capacity",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It helps protect accounts even if passwords are compromised",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It improves EC2 performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It reduces network latency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a second authentication factor?",
        "options": [
          {
            "id": "a",
            "text": "Username",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Password",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "One-Time Password (OTP) generated by an authenticator app",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "IAM Policy",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the recommended security practice for the AWS root account?",
        "options": [
          {
            "id": "a",
            "text": "Share credentials with the team",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Enable MFA and avoid routine use of the root account",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Disable passwords",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Use the root account for all daily activities",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a credential in AWS?",
        "options": [
          {
            "id": "a",
            "text": "A Region",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Information used to authenticate an identity, such as usernames, passwords, or access keys",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why should access keys be protected carefully?",
        "options": [
          {
            "id": "a",
            "text": "They grant programmatic access to AWS resources and can be misused if exposed",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase storage costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They create Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace IAM Policies",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a recommended alternative to hard-coded access keys in AWS applications?",
        "options": [
          {
            "id": "a",
            "text": "IAM Roles",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Root Account Credentials",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Shared Passwords",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Public Access Policies",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which security practice helps reduce the risk of credential compromise?",
        "options": [
          {
            "id": "a",
            "text": "Regular credential rotation and strong password policies",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Reusing passwords across multiple accounts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Sharing credentials through email",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disabling authentication logs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer accidentally publishes AWS access keys in a public repository. What should be done first?",
        "options": [
          {
            "id": "a",
            "text": "Ignore the issue",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Immediately disable or rotate the exposed credentials and investigate usage",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create a new AWS Region",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Restart the application",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes MFA and Credential Security?",
        "options": [
          {
            "id": "a",
            "text": "MFA adds additional verification layers, while credential security focuses on protecting passwords, access keys, and authentication mechanisms",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "MFA replaces passwords entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Credential security is only AWS's responsibility",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "MFA is only required for administrators",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 2,
    "topic_sort": 4,
    "topic_title": "AWS Organizations basics",
    "quiz_title": "AWS Organizations basics — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is AWS Organizations?",
        "options": [
          {
            "id": "a",
            "text": "A storage service for AWS accounts",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A service that helps centrally manage and govern multiple AWS accounts",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A virtual machine management tool",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A database service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of AWS Organizations?",
        "options": [
          {
            "id": "a",
            "text": "Centralized account management and governance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased EC2 performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic application deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Unlimited storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the top-level container in AWS Organizations called?",
        "options": [
          {
            "id": "a",
            "text": "Organizational Unit (OU)",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Root",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "IAM Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Region",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Organizational Unit (OU)?",
        "options": [
          {
            "id": "a",
            "text": "A virtual machine cluster",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A logical grouping of AWS accounts within an organization",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A security group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do organizations create multiple AWS accounts?",
        "options": [
          {
            "id": "a",
            "text": "To improve governance, security isolation, and billing management",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To eliminate IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce storage capacity",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is consolidated billing in AWS Organizations?",
        "options": [
          {
            "id": "a",
            "text": "A feature that combines billing from multiple AWS accounts into a single bill",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A networking feature",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A backup solution",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Service Control Policy (SCP)?",
        "options": [
          {
            "id": "a",
            "text": "A policy that manages EC2 instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A governance policy that sets permission boundaries across AWS accounts in an organization",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage configuration file",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A backup policy",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between SCPs and IAM Policies?",
        "options": [
          {
            "id": "a",
            "text": "SCPs define maximum permissions, while IAM Policies grant actual permissions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "SCPs replace IAM Policies entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Policies override SCPs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Both are identical",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants separate AWS accounts for Development, Testing, and Production environments. Which AWS Organizations feature helps structure this setup?",
        "options": [
          {
            "id": "a",
            "text": "Organizational Units (OUs)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Availability Zones",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "VPCs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudFront",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Organizations?",
        "options": [
          {
            "id": "a",
            "text": "AWS Organizations provides centralized account management, governance, consolidated billing, and security controls across multiple AWS accounts",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS Organizations is used only for storage management",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Organizations replaces IAM entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Organizations is a networking service",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 3,
    "topic_sort": 1,
    "topic_title": "Amazon EC2 instance types & AMIs",
    "quiz_title": "Amazon EC2 instance types & AMIs — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does EC2 stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Elastic Cloud Compute",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Elastic Compute Cloud",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Enterprise Compute Cluster",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Enhanced Cloud Container",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of Amazon EC2?",
        "options": [
          {
            "id": "a",
            "text": "Object storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Running virtual machines and applications in the cloud",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Managing DNS records",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delivering content globally",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an EC2 Instance?",
        "options": [
          {
            "id": "a",
            "text": "A physical AWS data center",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A virtual server running in AWS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A network firewall",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Amazon Machine Image (AMI)?",
        "options": [
          {
            "id": "a",
            "text": "A monitoring dashboard",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A template used to launch EC2 instances with predefined configurations",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A security group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A database backup",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which component is typically included in an AMI?",
        "options": [
          {
            "id": "a",
            "text": "Operating System and application configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Availability Zones",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Billing reports",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are different EC2 instance types available?",
        "options": [
          {
            "id": "a",
            "text": "To support different workload requirements such as compute, memory, storage, and networking needs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase billing complexity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To eliminate virtualization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which EC2 instance family is commonly optimized for general-purpose workloads?",
        "options": [
          {
            "id": "a",
            "text": "T-Series and M-Series",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "R-Series only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "P-Series only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "D-Series only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which EC2 instance family is designed for memory-intensive applications such as databases?",
        "options": [
          {
            "id": "a",
            "text": "T-Series",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "R-Series",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "C-Series",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "G-Series",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company needs high-performance computing for scientific simulations. Which EC2 instance family would generally be most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "C-Series (Compute Optimized)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "T-Series (Burstable)",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "R-Series (Memory Optimized)",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "S-Series",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes EC2 Instance Types and AMIs?",
        "options": [
          {
            "id": "a",
            "text": "AMIs provide the template for launching EC2 instances, while instance types define the hardware resources available to the virtual server",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AMIs and instance types are identical concepts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Instance types store operating systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AMIs determine AWS Regions",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 3,
    "topic_sort": 2,
    "topic_title": "EBS volumes & snapshots",
    "quiz_title": "EBS volumes & snapshots — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does EBS stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Elastic Backup Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Elastic Block Store",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Enterprise Block Service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Enhanced Backup System",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of an EBS Volume?",
        "options": [
          {
            "id": "a",
            "text": "To provide persistent storage for EC2 instances",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To manage DNS records",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To deliver content globally",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create IAM users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens to data stored on an EBS volume when an EC2 instance is stopped?",
        "options": [
          {
            "id": "a",
            "text": "The data is lost permanently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The data remains stored and can be accessed when the instance starts again",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The volume is deleted automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The data is moved to Amazon S3",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which storage type best describes Amazon EBS?",
        "options": [
          {
            "id": "a",
            "text": "Object Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Block Storage",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "File Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Archive Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Can an EBS volume be detached from one EC2 instance and attached to another?",
        "options": [
          {
            "id": "a",
            "text": "Yes, in many cases within the same Availability Zone",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No, never",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Only across Regions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only after converting it to S3",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an EBS Snapshot?",
        "options": [
          {
            "id": "a",
            "text": "A copy of an EC2 instance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A backup of an EBS volume stored in AWS-managed storage",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A network configuration file",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An IAM policy",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are EBS Snapshots useful?",
        "options": [
          {
            "id": "a",
            "text": "They allow backup, disaster recovery, and volume restoration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase CPU performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They manage IAM users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Where are EBS Snapshots stored?",
        "options": [
          {
            "id": "a",
            "text": "On the EC2 instance itself",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "In AWS-managed storage (internally backed by Amazon S3)",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Inside IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "In Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to create a backup before updating a production server. What is the recommended action?",
        "options": [
          {
            "id": "a",
            "text": "Create an EBS Snapshot of the attached volume",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the volume",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Stop using EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create a new Availability Zone",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes EBS Volumes and Snapshots?",
        "options": [
          {
            "id": "a",
            "text": "EBS Volumes provide persistent block storage for EC2 instances, while Snapshots create point-in-time backups of those volumes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EBS Volumes and Snapshots are identical",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Snapshots replace EBS Volumes permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS is used only for networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 3,
    "topic_sort": 3,
    "topic_title": "Placement groups",
    "quiz_title": "Placement groups — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is an AWS Placement Group?",
        "options": [
          {
            "id": "a",
            "text": "A storage service for EC2 instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A logical grouping of EC2 instances that influences how they are placed within AWS infrastructure",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A backup service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A DNS management tool",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Placement Groups used?",
        "options": [
          {
            "id": "a",
            "text": "To optimize performance, networking, or availability depending on workload requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create snapshots",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How many main types of Placement Groups are available in AWS?",
        "options": [
          {
            "id": "a",
            "text": "One",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Two",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Three",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Five",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which Placement Group strategy is designed to provide the lowest network latency and highest throughput between EC2 instances?",
        "options": [
          {
            "id": "a",
            "text": "Spread Placement Group",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Partition Placement Group",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cluster Placement Group",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Auto Scaling Group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which workload is best suited for a Cluster Placement Group?",
        "options": [
          {
            "id": "a",
            "text": "High-performance computing (HPC) applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Email services only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "DNS management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Backup storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of a Spread Placement Group?",
        "options": [
          {
            "id": "a",
            "text": "Place instances across distinct hardware to reduce the risk of simultaneous failure",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increase storage performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Improve internet speed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which Placement Group strategy is commonly used for critical applications requiring high availability?",
        "options": [
          {
            "id": "a",
            "text": "Cluster Placement Group",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Spread Placement Group",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Partition Placement Group only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "None of the above",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Partition Placement Group?",
        "options": [
          {
            "id": "a",
            "text": "A strategy that divides instances into logical partitions to improve fault isolation at scale",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage partitioning service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A database feature",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A network firewall",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which workload is commonly associated with Partition Placement Groups?",
        "options": [
          {
            "id": "a",
            "text": "Large distributed systems such as Hadoop or Kafka clusters",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Small personal websites",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "DNS services only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Placement Groups?",
        "options": [
          {
            "id": "a",
            "text": "Placement Groups control how EC2 instances are physically deployed to optimize performance, latency, and fault tolerance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Placement Groups are used only for storage management",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Placement Groups replace Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Placement Groups manage IAM permissions",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 3,
    "topic_sort": 4,
    "topic_title": "Launch templates",
    "quiz_title": "Launch templates — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is an AWS Launch Template?",
        "options": [
          {
            "id": "a",
            "text": "A backup service for EC2 instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A reusable configuration template used to launch EC2 instances",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A networking component",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Launch Template?",
        "options": [
          {
            "id": "a",
            "text": "To automate and standardize EC2 instance deployments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To create snapshots",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To configure DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following can be defined within a Launch Template?",
        "options": [
          {
            "id": "a",
            "text": "AMI, instance type, security groups, and storage configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Only instance names",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Only IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Launch Templates useful in large-scale environments?",
        "options": [
          {
            "id": "a",
            "text": "They ensure consistent configuration across multiple EC2 instances",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace IAM policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They eliminate storage requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service commonly integrates with Launch Templates for automatic scaling?",
        "options": [
          {
            "id": "a",
            "text": "Amazon Route 53",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS Auto Scaling Groups",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Organizations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What advantage do Launch Template versions provide?",
        "options": [
          {
            "id": "a",
            "text": "The ability to track and manage configuration changes over time",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduced network latency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants every new EC2 instance to use the same AMI, security group, and instance type. What AWS feature should be used?",
        "options": [
          {
            "id": "a",
            "text": "Launch Template",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Availability Zone",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Snapshot",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which configuration is NOT typically stored in a Launch Template?",
        "options": [
          {
            "id": "a",
            "text": "AMI ID",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Instance Type",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM User Passwords",
            "is_correct": true
          }
        ]
      },
      {
        "question": "How do Launch Templates improve operational efficiency?",
        "options": [
          {
            "id": "a",
            "text": "By reducing repetitive manual configuration tasks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing EC2 costs automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By eliminating backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By replacing monitoring systems",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Launch Templates?",
        "options": [
          {
            "id": "a",
            "text": "Launch Templates provide reusable EC2 deployment configurations that support automation, consistency, and scalability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Launch Templates replace EC2 instances",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Launch Templates are used only for storage management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Launch Templates manage IAM permissions",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 4,
    "topic_sort": 1,
    "topic_title": "Amazon S3 & storage classes",
    "quiz_title": "Amazon S3 & storage classes — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does S3 stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Secure Storage Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Simple Storage Service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Standard Storage Solution",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Scalable Storage System",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What type of storage does Amazon S3 provide?",
        "options": [
          {
            "id": "a",
            "text": "Block Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "File Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Object Storage",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Database Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an S3 Bucket?",
        "options": [
          {
            "id": "a",
            "text": "A virtual machine",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A container used to store objects in Amazon S3",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database table",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A security group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an S3 Object?",
        "options": [
          {
            "id": "a",
            "text": "A physical storage device",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A file stored in an S3 bucket along with its metadata",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A virtual network",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An IAM role",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which feature makes Amazon S3 highly durable?",
        "options": [
          {
            "id": "a",
            "text": "Data is redundantly stored across multiple devices within an AWS Region",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Files are stored on a single server",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Storage is limited to one Availability Zone",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Objects are automatically deleted after upload",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an S3 Storage Class?",
        "options": [
          {
            "id": "a",
            "text": "A security policy for S3 buckets",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A category that defines the cost, availability, and access characteristics of stored data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A networking feature",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A database engine",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which S3 Storage Class is designed for frequently accessed data?",
        "options": [
          {
            "id": "a",
            "text": "S3 Standard",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "S3 Glacier Deep Archive",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "S3 Glacier Flexible Retrieval",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "S3 One Zone-IA",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which S3 Storage Class is best suited for long-term archival data that is rarely accessed?",
        "options": [
          {
            "id": "a",
            "text": "S3 Standard",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "S3 Intelligent-Tiering",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "S3 Glacier Deep Archive",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "S3 Standard-IA",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of S3 Intelligent-Tiering?",
        "options": [
          {
            "id": "a",
            "text": "Automatically move data between access tiers based on usage patterns",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increase EC2 performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace IAM policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Amazon S3 and Storage Classes?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3 is an object storage service, and Storage Classes allow organizations to balance cost and access requirements for different types of data",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "S3 is a block storage service only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Storage Classes are used only for security purposes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "S3 replaces EC2 instances",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 4,
    "topic_sort": 2,
    "topic_title": "EBS vs EFS",
    "quiz_title": "EBS vs EFS — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does EBS stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Elastic Backup Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Elastic Block Store",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Enhanced Block Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Enterprise Backup System",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does EFS stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Elastic File Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Enhanced File Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Elastic File System",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Enterprise File System",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What type of storage does Amazon EBS provide?",
        "options": [
          {
            "id": "a",
            "text": "Object Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "File Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Block Storage",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Archive Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What type of storage does Amazon EFS provide?",
        "options": [
          {
            "id": "a",
            "text": "File Storage",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Block Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Object Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Archive Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS storage service is typically attached to a single EC2 instance?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EFS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Glacier",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS storage service can be accessed by multiple EC2 instances simultaneously?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon EFS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which storage solution would be most suitable for a shared web application where multiple servers need access to the same files?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon EFS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "EC2 Instance Store",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Lambda",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which storage service is commonly used as the primary disk for an EC2 instance?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EFS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Backup",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a major advantage of Amazon EFS?",
        "options": [
          {
            "id": "a",
            "text": "Shared file access with automatic scaling",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Direct object storage access",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Lower latency than all storage services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replaces EC2 instances",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes EBS and EFS?",
        "options": [
          {
            "id": "a",
            "text": "EBS provides block storage for individual EC2 instances, while EFS provides scalable shared file storage for multiple EC2 instances",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EBS and EFS are identical services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "EFS is object storage and EBS is file storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Both are used only for backups",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 4,
    "topic_sort": 3,
    "topic_title": "Lifecycle policies & versioning",
    "quiz_title": "Lifecycle policies & versioning — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is S3 Versioning?",
        "options": [
          {
            "id": "a",
            "text": "A feature that automatically increases storage size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A feature that keeps multiple versions of an object in an S3 bucket",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A backup service for EC2",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A networking configuration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is S3 Versioning useful?",
        "options": [
          {
            "id": "a",
            "text": "It protects against accidental deletion and overwriting of objects",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases CPU performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It creates new AWS accounts automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It reduces internet latency",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens when an object is updated in a version-enabled S3 bucket?",
        "options": [
          {
            "id": "a",
            "text": "The old version is deleted permanently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A new version is created while previous versions are retained",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The bucket is recreated",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The object becomes read-only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of an S3 Lifecycle Policy?",
        "options": [
          {
            "id": "a",
            "text": "To automate storage management and optimize costs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To create EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To configure networking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which action can a Lifecycle Policy perform?",
        "options": [
          {
            "id": "a",
            "text": "Move objects to a lower-cost storage class after a specific period",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Create Availability Zones",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Increase EC2 memory automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage IAM roles",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company stores logs that are rarely accessed after 90 days. Which Lifecycle Policy action would be most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Transition objects to a lower-cost storage class such as Glacier",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the bucket immediately",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Launch a new EC2 instance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create a new Region",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a common use case for S3 Versioning?",
        "options": [
          {
            "id": "a",
            "text": "Recovering accidentally deleted or modified files",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Managing network traffic",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating virtual machines",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Configuring DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Can Lifecycle Policies be applied to previous object versions?",
        "options": [
          {
            "id": "a",
            "text": "Yes, Lifecycle Policies can manage current and non-current object versions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No, only current versions can be managed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Only IAM administrators can manage versions manually",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Versioning and Lifecycle Policies cannot work together",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which combination provides both data protection and cost optimization in Amazon S3?",
        "options": [
          {
            "id": "a",
            "text": "Versioning + Lifecycle Policies",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EC2 + IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "VPC + Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS + Security Groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Lifecycle Policies and Versioning?",
        "options": [
          {
            "id": "a",
            "text": "Versioning protects object history, while Lifecycle Policies automate storage transitions and deletion to optimize costs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both features perform the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Lifecycle Policies replace Versioning entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Versioning is only used for networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 4,
    "topic_sort": 4,
    "topic_title": "Encryption at rest & in transit",
    "quiz_title": "Encryption at rest & in transit — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is encryption?",
        "options": [
          {
            "id": "a",
            "text": "A method of compressing files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The process of converting readable data into an unreadable format to protect it from unauthorized access",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A backup strategy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A networking protocol",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Encryption at Rest?",
        "options": [
          {
            "id": "a",
            "text": "Encrypting data while it is stored on disks, databases, or storage services",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Encrypting data while it travels across a network",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Encrypting data only during backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypting user passwords only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service commonly supports Encryption at Rest?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon RDS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "What is Encryption in Transit?",
        "options": [
          {
            "id": "a",
            "text": "Encrypting data while it is being transferred between systems or over a network",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Encrypting only archived data",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Encrypting physical servers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypting IAM policies",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which protocol is commonly used to provide Encryption in Transit for web applications?",
        "options": [
          {
            "id": "a",
            "text": "FTP",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "HTTP",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "HTTPS (TLS/SSL)",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "SMTP",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Encryption at Rest important?",
        "options": [
          {
            "id": "a",
            "text": "It protects stored data from unauthorized access if storage media is compromised",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases CPU performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It eliminates the need for backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It improves internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is Encryption in Transit important?",
        "options": [
          {
            "id": "a",
            "text": "It protects data from interception or tampering during transmission",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It reduces EC2 costs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It replaces authentication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service is commonly used to manage encryption keys?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS Key Management Service (KMS)",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Organizations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company stores customer records in Amazon S3 and accesses them through HTTPS. Which types of encryption are being used?",
        "options": [
          {
            "id": "a",
            "text": "Encryption at Rest only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Encryption in Transit only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Both Encryption at Rest and Encryption in Transit",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "No encryption",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Encryption at Rest and Encryption in Transit?",
        "options": [
          {
            "id": "a",
            "text": "Encryption at Rest protects stored data, while Encryption in Transit protects data as it moves between systems",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both perform the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Encryption is only required during transmission",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encryption is only required for stored data",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 5,
    "topic_sort": 1,
    "topic_title": "VPCs, subnets & route tables",
    "quiz_title": "VPCs, subnets & route tables — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does VPC stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Virtual Private Cloud",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Virtual Public Connection",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Virtual Protected Cluster",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Virtual Processing Center",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of an AWS VPC?",
        "options": [
          {
            "id": "a",
            "text": "To store files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To provide an isolated networking environment for AWS resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a subnet in AWS?",
        "options": [
          {
            "id": "a",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A smaller network segment within a VPC",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A security policy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An EC2 instance type",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are subnets used inside a VPC?",
        "options": [
          {
            "id": "a",
            "text": "To organize resources and control network access",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM roles",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create snapshots",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Public Subnet?",
        "options": [
          {
            "id": "a",
            "text": "A subnet that has a route to the internet through an Internet Gateway",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A subnet used only for storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A subnet without IP addresses",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A subnet used only for databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Private Subnet?",
        "options": [
          {
            "id": "a",
            "text": "A subnet connected directly to the internet",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A subnet without direct internet access",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A subnet that contains only databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A subnet used only by AWS services",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Route Table?",
        "options": [
          {
            "id": "a",
            "text": "A list of firewall rules",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A set of routing rules that determine where network traffic is directed",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage management tool",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A backup configuration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the role of an Internet Gateway (IGW) in a VPC?",
        "options": [
          {
            "id": "a",
            "text": "To provide internet connectivity for resources in public subnets",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To encrypt data",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM permissions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To store application logs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company hosts a web server in a public subnet and a database in a private subnet. What is the main advantage of this architecture?",
        "options": [
          {
            "id": "a",
            "text": "Improved security by preventing direct internet access to the database",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Faster EC2 performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced storage requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Elimination of route tables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes VPCs, Subnets, and Route Tables?",
        "options": [
          {
            "id": "a",
            "text": "A VPC provides an isolated network, subnets divide the network into segments, and route tables control traffic flow between resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are all used only for storage management",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route tables replace VPCs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Subnets manage IAM users",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 5,
    "topic_sort": 2,
    "topic_title": "Internet Gateway & NAT Gateway",
    "quiz_title": "Internet Gateway & NAT Gateway — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of an Internet Gateway (IGW) in AWS?",
        "options": [
          {
            "id": "a",
            "text": "To provide internet connectivity between a VPC and the public internet",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To store backups",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create EC2 instances",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS networking component must be attached to a VPC to enable internet access?",
        "options": [
          {
            "id": "a",
            "text": "Route Table",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Internet Gateway",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS Volume",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of subnet typically uses an Internet Gateway?",
        "options": [
          {
            "id": "a",
            "text": "Private Subnet",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Public Subnet",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Database Subnet Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Backup Subnet",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a NAT Gateway?",
        "options": [
          {
            "id": "a",
            "text": "A service that allows resources in private subnets to access the internet without accepting inbound internet connections",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A DNS server",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An IAM feature",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why would an EC2 instance in a private subnet need a NAT Gateway?",
        "options": [
          {
            "id": "a",
            "text": "To download software updates or access external services without being publicly accessible",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM roles",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create snapshots",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Where should a NAT Gateway be deployed?",
        "options": [
          {
            "id": "a",
            "text": "In a Public Subnet",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "In a Private Subnet",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "In an IAM Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "In an Availability Zone only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement correctly describes inbound internet traffic to resources behind a NAT Gateway?",
        "options": [
          {
            "id": "a",
            "text": "Direct inbound internet connections are not allowed",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All inbound traffic is automatically allowed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "NAT Gateway replaces security groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "NAT Gateway acts as a load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key security benefit of using private subnets with a NAT Gateway?",
        "options": [
          {
            "id": "a",
            "text": "Resources can access the internet without being directly exposed to external users",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It removes the need for firewalls",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It eliminates route tables",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It increases CPU performance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company places web servers in a public subnet and database servers in a private subnet. Which component allows the database servers to download operating system updates?",
        "options": [
          {
            "id": "a",
            "text": "Internet Gateway",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "NAT Gateway",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Internet Gateway and NAT Gateway?",
        "options": [
          {
            "id": "a",
            "text": "Internet Gateways provide direct internet access for public resources, while NAT Gateways allow private resources to access the internet securely without accepting inbound connections",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both services perform exactly the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "NAT Gateways provide inbound internet access to private resources",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Internet Gateways replace route tables",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 5,
    "topic_sort": 3,
    "topic_title": "Security groups vs NACLs",
    "quiz_title": "Security groups vs NACLs — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a Security Group in AWS?",
        "options": [
          {
            "id": "a",
            "text": "To provide instance-level firewall protection",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To store application logs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To create subnets",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage IAM users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "At which level does a Security Group operate?",
        "options": [
          {
            "id": "a",
            "text": "VPC Level",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Subnet Level",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Instance Level",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Region Level",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Network Access Control List (NACL)?",
        "options": [
          {
            "id": "a",
            "text": "A subnet-level firewall that controls inbound and outbound traffic",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A backup mechanism",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An IAM policy",
            "is_correct": false
          }
        ]
      },
      {
        "question": "At which level does a NACL operate?",
        "options": [
          {
            "id": "a",
            "text": "Instance Level",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Subnet Level",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Region Level",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Account Level",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is stateful?",
        "options": [
          {
            "id": "a",
            "text": "Security Group",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "NACL",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route Table",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Internet Gateway",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is stateless?",
        "options": [
          {
            "id": "a",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "IAM Policy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "NACL",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS security feature supports only Allow rules?",
        "options": [
          {
            "id": "a",
            "text": "NACL",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Security Group",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Route Table",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Internet Gateway",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS security feature supports both Allow and Deny rules?",
        "options": [
          {
            "id": "a",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "IAM Group",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "NACL",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "EC2 Instance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to block a specific IP address from accessing an entire subnet. Which AWS feature is best suited for this requirement?",
        "options": [
          {
            "id": "a",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "NACL",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "EBS Volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Launch Template",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Security Groups and NACLs?",
        "options": [
          {
            "id": "a",
            "text": "Security Groups are stateful instance-level firewalls, while NACLs are stateless subnet-level firewalls that support both allow and deny rules",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both services are identical",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Groups operate at subnet level and NACLs operate at instance level",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "NACLs replace Security Groups entirely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 5,
    "topic_sort": 4,
    "topic_title": "Public & private tier design",
    "quiz_title": "Public & private tier design — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a multi-tier architecture in AWS?",
        "options": [
          {
            "id": "a",
            "text": "To increase storage capacity only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To separate application components for security, scalability, and manageability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To eliminate subnets",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is typically placed in the Public Tier of an AWS architecture?",
        "options": [
          {
            "id": "a",
            "text": "Database Servers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Internet-facing resources such as Web Servers and Load Balancers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Backup Storage Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM Users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is typically placed in the Private Tier?",
        "options": [
          {
            "id": "a",
            "text": "Internet Gateways",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Backend Application Servers and Databases",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Public Load Balancers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DNS Servers Only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are databases commonly deployed in private subnets?",
        "options": [
          {
            "id": "a",
            "text": "To improve security by preventing direct internet access",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To reduce storage costs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS component allows internet traffic to reach resources in the Public Tier?",
        "options": [
          {
            "id": "a",
            "text": "NAT Gateway",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Internet Gateway",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How do resources in a Private Tier typically access the internet for updates and patches?",
        "options": [
          {
            "id": "a",
            "text": "Through an Internet Gateway directly",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Through a NAT Gateway",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Through a Security Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Through a Launch Template",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a common three-tier architecture design?",
        "options": [
          {
            "id": "a",
            "text": "Web Tier, Application Tier, Database Tier",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Storage Tier, IAM Tier, DNS Tier",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Region Tier, AZ Tier, Subnet Tier",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route Tier, Firewall Tier, Backup Tier",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary security benefit of separating public and private tiers?",
        "options": [
          {
            "id": "a",
            "text": "Reduced attack surface and better access control",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased CPU performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic scaling",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Lower storage costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A web application receives requests from users, processes them through application servers, and stores data in a database. Which component should be in the Private Tier?",
        "options": [
          {
            "id": "a",
            "text": "Internet Gateway",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Load Balancer",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Database Server",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Public Web Server",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Public & Private Tier Design?",
        "options": [
          {
            "id": "a",
            "text": "Public tiers host internet-facing resources, while private tiers host internal systems that require additional security and controlled access",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Public and private tiers serve the same purpose",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Private tiers require direct internet access",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Public tiers are more secure than private tiers",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 6,
    "topic_sort": 1,
    "topic_title": "Application Load Balancer (ALB)",
    "quiz_title": "Application Load Balancer (ALB) — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of an Application Load Balancer (ALB)?",
        "options": [
          {
            "id": "a",
            "text": "To store application data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To distribute incoming application traffic across multiple targets",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "At which layer of the OSI model does an Application Load Balancer operate?",
        "options": [
          {
            "id": "a",
            "text": "Layer 2 (Data Link)",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Layer 3 (Network)",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Layer 4 (Transport)",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Layer 7 (Application)",
            "is_correct": true
          }
        ]
      },
      {
        "question": "Which protocols are commonly supported by an Application Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "HTTP and HTTPS",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "FTP only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "SMTP only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SSH only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Target Group in an ALB?",
        "options": [
          {
            "id": "a",
            "text": "A collection of resources that receive traffic from the load balancer",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A security group",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "An IAM role",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A route table",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a major benefit of using an ALB?",
        "options": [
          {
            "id": "a",
            "text": "High availability through traffic distribution across multiple targets",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic database backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM policy management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Path-Based Routing in an ALB?",
        "options": [
          {
            "id": "a",
            "text": "Routing requests based on URL paths such as /api or /images",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Routing based on storage size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Routing based on IAM permissions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Routing based on Availability Zones only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Host-Based Routing in an ALB?",
        "options": [
          {
            "id": "a",
            "text": "Routing traffic based on domain names or host headers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Routing based on EC2 instance size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Routing based on subnet type",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Routing based on EBS volume size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are health checks important in an ALB?",
        "options": [
          {
            "id": "a",
            "text": "They identify unhealthy targets and stop routing traffic to them",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They create snapshots automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace security groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company hosts multiple web applications behind a single ALB. Which ALB feature allows traffic to be routed to the correct application?",
        "options": [
          {
            "id": "a",
            "text": "Path-Based and Host-Based Routing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM Policies",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS Snapshots",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes an Application Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "An ALB distributes HTTP/HTTPS traffic across multiple targets and supports advanced routing features for scalable, highly available applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "An ALB is a storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "An ALB replaces Auto Scaling Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An ALB manages IAM users",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 6,
    "topic_sort": 2,
    "topic_title": "Network Load Balancer (NLB)",
    "quiz_title": "Network Load Balancer (NLB) — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of a Network Load Balancer (NLB)?",
        "options": [
          {
            "id": "a",
            "text": "To store application data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To distribute network traffic with ultra-high performance and low latency",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create snapshots",
            "is_correct": false
          }
        ]
      },
      {
        "question": "At which layer of the OSI model does a Network Load Balancer operate?",
        "options": [
          {
            "id": "a",
            "text": "Layer 2 (Data Link)",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Layer 3 (Network)",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Layer 4 (Transport)",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Layer 7 (Application)",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which protocols are commonly supported by a Network Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "HTTP and HTTPS only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "TCP, UDP, and TLS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "SMTP only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "FTP only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of an NLB compared to an Application Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "Lower latency and higher performance for network traffic",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Built-in path-based routing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "URL-based routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Host-based routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of workload is best suited for a Network Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "High-performance TCP applications and gaming services",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Static website hosting only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM authentication services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route table management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS load balancer preserves the client's source IP address by default?",
        "options": [
          {
            "id": "a",
            "text": "Application Load Balancer",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Network Load Balancer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Classic Load Balancer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are health checks important in a Network Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "They ensure traffic is routed only to healthy targets",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They manage IAM policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace Auto Scaling",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company runs a real-time gaming application that requires very low latency. Which AWS load balancer is the best choice?",
        "options": [
          {
            "id": "a",
            "text": "Application Load Balancer",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Network Load Balancer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security Group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which routing capability is supported by an NLB?",
        "options": [
          {
            "id": "a",
            "text": "Connection-based routing at Layer 4",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "URL path routing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Hostname routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cookie-based routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes a Network Load Balancer?",
        "options": [
          {
            "id": "a",
            "text": "An NLB operates at Layer 4, providing ultra-high performance, low latency, and scalable traffic distribution for TCP, UDP, and TLS workloads",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "An NLB is used only for storage services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "An NLB replaces VPC networking",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An NLB manages IAM permissions",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 6,
    "topic_sort": 3,
    "topic_title": "Target groups & health checks",
    "quiz_title": "Target groups & health checks — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is a Target Group in AWS Elastic Load Balancing?",
        "options": [
          {
            "id": "a",
            "text": "A collection of resources that receive traffic from a load balancer",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A security policy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A VPC component",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS resources can commonly be registered as targets?",
        "options": [
          {
            "id": "a",
            "text": "EC2 Instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "IP Addresses",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Lambda Functions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Target Group?",
        "options": [
          {
            "id": "a",
            "text": "To store application data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To organize and route traffic to backend resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create snapshots",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Health Check in AWS Load Balancing?",
        "options": [
          {
            "id": "a",
            "text": "A mechanism used to determine whether a target is available and functioning correctly",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A backup procedure",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A monitoring dashboard only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A VPC routing rule",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Health Checks important?",
        "options": [
          {
            "id": "a",
            "text": "They improve application availability by detecting unhealthy targets",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace security groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They manage Route Tables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens when a target repeatedly fails health checks?",
        "options": [
          {
            "id": "a",
            "text": "It continues receiving traffic normally",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It is marked unhealthy and removed from traffic routing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It is automatically deleted",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It becomes a load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which protocol is commonly used for Application Load Balancer health checks?",
        "options": [
          {
            "id": "a",
            "text": "HTTP/HTTPS",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "SMTP",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "FTP",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SNMP",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A load balancer has three EC2 instances in a Target Group. One instance becomes unavailable. What happens?",
        "options": [
          {
            "id": "a",
            "text": "Traffic continues to be sent to all instances equally",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The unhealthy instance is removed from rotation, and traffic is sent to healthy instances only",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The load balancer stops working",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All instances are marked unhealthy",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS feature works closely with Target Groups to support high availability?",
        "options": [
          {
            "id": "a",
            "text": "Health Checks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM Roles",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "EBS Snapshots",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route Tables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Target Groups and Health Checks?",
        "options": [
          {
            "id": "a",
            "text": "Target Groups define traffic destinations, while Health Checks ensure traffic is routed only to healthy resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both perform the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Health Checks replace Target Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Target Groups are used only for storage services",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 6,
    "topic_sort": 4,
    "topic_title": "Auto Scaling groups & policies",
    "quiz_title": "Auto Scaling groups & policies — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of an Auto Scaling Group (ASG)?",
        "options": [
          {
            "id": "a",
            "text": "To automatically adjust the number of EC2 instances based on demand",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To store application data",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What problem does Auto Scaling solve?",
        "options": [
          {
            "id": "a",
            "text": "Over-provisioning and under-provisioning of resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database corruption",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM authentication issues",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route table management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS component is typically used by an Auto Scaling Group to launch new EC2 instances?",
        "options": [
          {
            "id": "a",
            "text": "Route Table",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Launch Template",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Security Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS Snapshot",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the desired capacity in an Auto Scaling Group?",
        "options": [
          {
            "id": "a",
            "text": "The number of EC2 instances the group attempts to maintain",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The storage size of EBS volumes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The number of Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The number of IAM users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Scaling Policy?",
        "options": [
          {
            "id": "a",
            "text": "A set of rules that determines when Auto Scaling should add or remove instances",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A backup configuration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "An IAM permission document",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A routing rule",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which metric is commonly used to trigger Auto Scaling?",
        "options": [
          {
            "id": "a",
            "text": "CPU Utilization",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Keyboard Activity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Screen Resolution",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Storage Class",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Scale-Out?",
        "options": [
          {
            "id": "a",
            "text": "Adding more EC2 instances when demand increases",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Removing EC2 instances when demand decreases",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Increasing storage only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating new VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Scale-In?",
        "options": [
          {
            "id": "a",
            "text": "Adding more EC2 instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Removing unnecessary EC2 instances when demand decreases",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating more Availability Zones",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increasing database storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A web application experiences a sudden traffic spike. Which AWS service helps automatically launch additional servers?",
        "options": [
          {
            "id": "a",
            "text": "Auto Scaling Group",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Auto Scaling Groups and Policies?",
        "options": [
          {
            "id": "a",
            "text": "Auto Scaling Groups maintain the desired number of EC2 instances, while Scaling Policies automatically adjust capacity based on demand",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Auto Scaling Groups are used only for storage services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Scaling Policies replace Load Balancers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Auto Scaling is used only for databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 7,
    "topic_sort": 1,
    "topic_title": "Amazon RDS & Multi-AZ",
    "quiz_title": "Amazon RDS & Multi-AZ — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does RDS stand for in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Relational Database Service",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Remote Data Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Regional Database System",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reliable Data Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of Amazon RDS?",
        "options": [
          {
            "id": "a",
            "text": "AWS manages database infrastructure tasks such as backups, patching, and maintenance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It eliminates databases entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It provides object storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of database does Amazon RDS provide?",
        "options": [
          {
            "id": "a",
            "text": "Relational Database",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Object Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "File Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Graph Database Only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does Multi-AZ mean in Amazon RDS?",
        "options": [
          {
            "id": "a",
            "text": "Multiple AWS accounts",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Database deployment across multiple Availability Zones for high availability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Multiple VPCs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Multiple storage classes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Multi-AZ deployment?",
        "options": [
          {
            "id": "a",
            "text": "High Availability and Disaster Recovery",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased storage capacity only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Lower networking costs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Faster IAM authentication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens if the primary database instance fails in a Multi-AZ deployment?",
        "options": [
          {
            "id": "a",
            "text": "The database is deleted",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Traffic automatically fails over to the standby instance",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A new AWS Region is created",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Users lose all database access permanently",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Does a Multi-AZ standby instance serve application read traffic?",
        "options": [
          {
            "id": "a",
            "text": "Yes, always",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "No, it is primarily used for failover purposes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Only during backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only during maintenance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS feature automatically handles database backups in Amazon RDS?",
        "options": [
          {
            "id": "a",
            "text": "Amazon RDS Managed Backups",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "NAT Gateway",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company runs a production database that requires minimal downtime. Which Amazon RDS feature should be enabled?",
        "options": [
          {
            "id": "a",
            "text": "Multi-AZ Deployment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Public Subnet Only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS Snapshot Only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Amazon RDS and Multi-AZ?",
        "options": [
          {
            "id": "a",
            "text": "Amazon RDS is a managed relational database service, and Multi-AZ deployments provide high availability through automatic failover to a standby database",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Multi-AZ is used only for backups",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "RDS replaces VPC networking",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Multi-AZ increases database size only",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 7,
    "topic_sort": 2,
    "topic_title": "DynamoDB fundamentals",
    "quiz_title": "DynamoDB fundamentals — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "A managed relational database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A fully managed NoSQL database service provided by AWS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A file storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What type of database is DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "Relational Database",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Graph Database",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "NoSQL Database",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Data Warehouse",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary data structure in DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "Bucket",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Table",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cluster",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Item in DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "A database backup",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A single record stored within a table",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A network configuration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An IAM role",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Attribute in DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "A column-like piece of data associated with an item",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage volume",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A subnet",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A security group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is the Primary Key important in DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "It uniquely identifies items within a table",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It manages IAM users",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It creates backups automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It controls networking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which feature makes DynamoDB highly scalable?",
        "options": [
          {
            "id": "a",
            "text": "Automatic scaling and distributed architecture",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual server management",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Fixed storage capacity",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Single Availability Zone deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which use case is well-suited for DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "Real-time applications requiring low-latency access at scale",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Traditional relational reporting with complex joins",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operating system management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DNS configuration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of DynamoDB compared to self-managed databases?",
        "options": [
          {
            "id": "a",
            "text": "AWS handles infrastructure, scaling, availability, and maintenance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Users must manage servers manually",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It requires operating system patching by customers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It can only store structured SQL data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes DynamoDB?",
        "options": [
          {
            "id": "a",
            "text": "DynamoDB is a fully managed NoSQL database service that provides high performance, automatic scaling, and low-latency access to data",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "DynamoDB is a relational database service only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "DynamoDB replaces VPC networking",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DynamoDB is used only for backups",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 7,
    "topic_sort": 3,
    "topic_title": "ElastiCache for performance",
    "quiz_title": "ElastiCache for performance — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon ElastiCache?",
        "options": [
          {
            "id": "a",
            "text": "A managed caching service that improves application performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A relational database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A load balancer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A file storage service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of ElastiCache?",
        "options": [
          {
            "id": "a",
            "text": "To increase database storage size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To reduce application latency and improve performance",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of storage does ElastiCache primarily use?",
        "options": [
          {
            "id": "a",
            "text": "Disk-Based Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "In-Memory Storage",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Object Storage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "File Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which caching engines are supported by Amazon ElastiCache?",
        "options": [
          {
            "id": "a",
            "text": "Redis and Memcached",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "MySQL and PostgreSQL",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Oracle and SQL Server",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DynamoDB and Neptune",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is caching commonly used in modern applications?",
        "options": [
          {
            "id": "a",
            "text": "To reduce repeated database queries and improve response times",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase internet bandwidth",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To replace security groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate storage requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Cache Hit?",
        "options": [
          {
            "id": "a",
            "text": "When requested data is found in the cache",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "When a database fails",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "When a security group blocks traffic",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "When a backup is created",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Cache Miss?",
        "options": [
          {
            "id": "a",
            "text": "When data is unavailable in the cache and must be retrieved from the original data source",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "When a user logs out",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "When an instance is terminated",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "When a snapshot fails",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which application scenario is most likely to benefit from ElastiCache?",
        "options": [
          {
            "id": "a",
            "text": "Frequently accessed product catalog data in an e-commerce application",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Long-term archival storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "DNS management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM policy administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does ElastiCache improve database performance?",
        "options": [
          {
            "id": "a",
            "text": "By serving frequently requested data from memory and reducing database workload",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By replacing databases entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By increasing database storage automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By creating additional Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Amazon ElastiCache?",
        "options": [
          {
            "id": "a",
            "text": "ElastiCache is a managed in-memory caching service that improves application speed, reduces latency, and decreases database load",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "ElastiCache is a relational database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ElastiCache is used only for backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "ElastiCache replaces VPC networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 7,
    "topic_sort": 4,
    "topic_title": "Amazon Aurora overview",
    "quiz_title": "Amazon Aurora overview — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon Aurora?",
        "options": [
          {
            "id": "a",
            "text": "A file storage service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A fully managed relational database engine built for the cloud",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A load balancer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A NoSQL database",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Amazon Aurora is compatible with which popular database engines?",
        "options": [
          {
            "id": "a",
            "text": "MySQL and PostgreSQL",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Oracle and MongoDB only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Redis and Memcached",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DynamoDB and Cassandra",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service family does Aurora belong to?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon RDS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon CloudFront",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key advantage of Aurora compared to traditional self-managed databases?",
        "options": [
          {
            "id": "a",
            "text": "AWS handles infrastructure, backups, patching, and high availability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Users must manage hardware themselves",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Aurora only supports local deployments",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Aurora requires manual scaling for every operation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does Aurora improve availability?",
        "options": [
          {
            "id": "a",
            "text": "By replicating data across multiple Availability Zones automatically",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By storing data on a single server",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By eliminating backups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By disabling failover",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Aurora Replica?",
        "options": [
          {
            "id": "a",
            "text": "A read-only database instance used to scale read workloads",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A backup file",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A VPC component",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of workload benefits most from Aurora Replicas?",
        "options": [
          {
            "id": "a",
            "text": "Read-intensive applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Backup-only environments",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM management systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DNS services",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens if the primary Aurora instance becomes unavailable?",
        "options": [
          {
            "id": "a",
            "text": "Aurora can automatically fail over to a replica",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The database is deleted",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "All data is lost permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Users must manually recreate the database",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do organizations choose Aurora for production applications?",
        "options": [
          {
            "id": "a",
            "text": "High performance, scalability, availability, and managed operations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It replaces networking services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It only supports test environments",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates database security requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Amazon Aurora?",
        "options": [
          {
            "id": "a",
            "text": "Aurora is a fully managed relational database service that offers high performance, automatic replication, scalability, and fault tolerance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Aurora is a NoSQL database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Aurora is a storage service only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Aurora replaces EC2 instances",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 8,
    "topic_sort": 1,
    "topic_title": "Route 53 routing policies",
    "quiz_title": "Route 53 routing policies — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon Route 53?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A scalable DNS (Domain Name System) and traffic routing service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine platform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Route 53 Routing Policy?",
        "options": [
          {
            "id": "a",
            "text": "To determine how DNS queries are answered and where traffic is directed",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To create EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To store application logs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which Route 53 routing policy routes traffic to a single resource?",
        "options": [
          {
            "id": "a",
            "text": "Weighted Routing",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Latency Routing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Simple Routing",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Geolocation Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which routing policy distributes traffic across multiple resources based on assigned percentages?",
        "options": [
          {
            "id": "a",
            "text": "Geolocation Routing",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Weighted Routing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Failover Routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Multivalue Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to send 80% of traffic to Server A and 20% to Server B during testing. Which routing policy should be used?",
        "options": [
          {
            "id": "a",
            "text": "Simple Routing",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Failover Routing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Weighted Routing",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Latency Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which Route 53 routing policy directs users to the AWS Region with the lowest network latency?",
        "options": [
          {
            "id": "a",
            "text": "Latency Routing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Geolocation Routing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Weighted Routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Simple Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which routing policy sends users to resources based on their geographic location?",
        "options": [
          {
            "id": "a",
            "text": "Latency Routing",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Geolocation Routing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Failover Routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Simple Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of Failover Routing?",
        "options": [
          {
            "id": "a",
            "text": "To provide disaster recovery by directing traffic to a backup resource when the primary resource becomes unavailable",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To improve storage performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM permissions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which Route 53 routing policy returns multiple healthy records in response to a DNS query?",
        "options": [
          {
            "id": "a",
            "text": "Multivalue Answer Routing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Geolocation Routing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Weighted Routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Failover Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Route 53 Routing Policies?",
        "options": [
          {
            "id": "a",
            "text": "Route 53 Routing Policies determine how DNS traffic is directed based on requirements such as performance, availability, testing, and geographic location",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route 53 is used only for storage services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Routing Policies replace Load Balancers entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53 manages database backups",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 8,
    "topic_sort": 2,
    "topic_title": "CloudFront CDN delivery",
    "quiz_title": "CloudFront CDN delivery — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon CloudFront?",
        "options": [
          {
            "id": "a",
            "text": "A relational database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A Content Delivery Network (CDN) service that delivers content with low latency and high performance",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A virtual machine service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A storage volume service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a CDN?",
        "options": [
          {
            "id": "a",
            "text": "To increase database storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To deliver content faster by serving it from locations closer to users",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service provides CDN functionality?",
        "options": [
          {
            "id": "a",
            "text": "Amazon RDS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon CloudFront",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon EBS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What are Edge Locations in CloudFront?",
        "options": [
          {
            "id": "a",
            "text": "Data centers that cache content closer to users worldwide",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database servers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM authentication servers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route tables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of content is commonly delivered through CloudFront?",
        "options": [
          {
            "id": "a",
            "text": "Images, videos, websites, APIs, and static files",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM policies only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route tables only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EC2 instance configurations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Origin in CloudFront?",
        "options": [
          {
            "id": "a",
            "text": "The source location from which CloudFront retrieves content",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A security group",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A VPC subnet",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens when a user requests content that is already cached at an Edge Location?",
        "options": [
          {
            "id": "a",
            "text": "CloudFront retrieves it from the origin again",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CloudFront serves it directly from the cache, reducing latency",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The request fails",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A new Edge Location is created",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Cache Miss in CloudFront?",
        "options": [
          {
            "id": "a",
            "text": "When requested content is not available at the Edge Location and must be fetched from the origin",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "When a database fails",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "When a Route 53 record expires",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "When an EC2 instance stops",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does CloudFront improve application performance?",
        "options": [
          {
            "id": "a",
            "text": "By reducing latency and offloading traffic from origin servers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing EC2 instance size automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By replacing Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By creating Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes CloudFront CDN Delivery?",
        "options": [
          {
            "id": "a",
            "text": "CloudFront is a global CDN service that caches content at Edge Locations to deliver applications, websites, and media with low latency and high performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "CloudFront is a database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "CloudFront replaces Amazon S3",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudFront manages IAM permissions",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 8,
    "topic_sort": 3,
    "topic_title": "AWS Certificate Manager (ACM)",
    "quiz_title": "AWS Certificate Manager (ACM) — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is AWS Certificate Manager (ACM)?",
        "options": [
          {
            "id": "a",
            "text": "A database management service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A service that provisions, manages, and deploys SSL/TLS certificates for AWS resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of an SSL/TLS certificate?",
        "options": [
          {
            "id": "a",
            "text": "To encrypt data transmitted between clients and servers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To create EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage IAM users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which protocol commonly uses SSL/TLS certificates?",
        "options": [
          {
            "id": "a",
            "text": "HTTP",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "HTTPS",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "FTP",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Telnet",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a major benefit of using AWS Certificate Manager?",
        "options": [
          {
            "id": "a",
            "text": "Automatic certificate renewal and management",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic database backups",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic VPC creation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Automatic scaling of EC2 instances",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service commonly integrates with ACM to provide HTTPS support?",
        "options": [
          {
            "id": "a",
            "text": "Application Load Balancer (ALB)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon S3 only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "EBS Volumes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route Tables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS CDN service commonly uses ACM certificates for secure content delivery?",
        "options": [
          {
            "id": "a",
            "text": "Amazon RDS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon CloudFront",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon DynamoDB",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon EBS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is certificate renewal important?",
        "options": [
          {
            "id": "a",
            "text": "Expired certificates can cause security warnings and service disruptions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases storage space",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It improves CPU performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It creates backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does ACM automate for AWS-managed certificates?",
        "options": [
          {
            "id": "a",
            "text": "Certificate issuance and renewal",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM policy creation",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route table updates",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EC2 instance patching",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to secure its website with HTTPS while minimizing operational overhead. Which AWS service should it use?",
        "options": [
          {
            "id": "a",
            "text": "AWS Certificate Manager (ACM)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route Tables",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security Groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Certificate Manager?",
        "options": [
          {
            "id": "a",
            "text": "ACM simplifies SSL/TLS certificate provisioning, deployment, and automatic renewal for AWS applications and services",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "ACM is a database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ACM replaces DNS services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "ACM is used only for backups",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 9,
    "topic_sort": 1,
    "topic_title": "AWS Lambda & execution models",
    "quiz_title": "AWS Lambda & execution models — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is AWS Lambda?",
        "options": [
          {
            "id": "a",
            "text": "A managed database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A serverless compute service that runs code without managing servers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A networking service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of AWS Lambda?",
        "options": [
          {
            "id": "a",
            "text": "No server management required",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Unlimited database storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Automatic DNS management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Dedicated physical servers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does \"serverless\" mean in AWS Lambda?",
        "options": [
          {
            "id": "a",
            "text": "No servers exist anywhere",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Developers do not need to manage the underlying servers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Applications cannot use compute resources",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Lambda runs only on local machines",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What triggers an AWS Lambda function?",
        "options": [
          {
            "id": "a",
            "text": "Events from AWS services, applications, or external systems",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM user creation only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route table updates only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Availability Zone changes only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service commonly triggers Lambda when a file is uploaded?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon RDS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Organizations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an execution model in AWS Lambda?",
        "options": [
          {
            "id": "a",
            "text": "The way Lambda functions are invoked and executed in response to events",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage configuration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A DNS routing strategy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A backup policy",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which execution model waits for the function to complete before returning a response?",
        "options": [
          {
            "id": "a",
            "text": "Synchronous Invocation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Asynchronous Invocation",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Scheduled Invocation Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Batch Invocation Only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which execution model allows the caller to continue immediately while Lambda processes the request in the background?",
        "options": [
          {
            "id": "a",
            "text": "Synchronous Invocation",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Asynchronous Invocation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Manual Invocation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Static Invocation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A web application sends a request to Lambda and requires an immediate response. Which execution model is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Asynchronous Invocation",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Synchronous Invocation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Batch Processing Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manual Trigger",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Lambda and its execution models?",
        "options": [
          {
            "id": "a",
            "text": "AWS Lambda is a serverless compute service that executes code in response to events using synchronous or asynchronous invocation models",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Lambda is a storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Lambda replaces Amazon S3",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Lambda is used only for backups",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 9,
    "topic_sort": 2,
    "topic_title": "API Gateway REST APIs",
    "quiz_title": "API Gateway REST APIs — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon API Gateway?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A fully managed service for creating, publishing, securing, and monitoring APIs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine platform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of API Gateway?",
        "options": [
          {
            "id": "a",
            "text": "To provide a secure entry point for applications and backend services",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To store files",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does REST stand for in REST API?",
        "options": [
          {
            "id": "a",
            "text": "Remote Execution Service Technology",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Representational State Transfer",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Regional Security Transfer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Resource Execution Standard Technology",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which HTTP method is commonly used to retrieve data in a REST API?",
        "options": [
          {
            "id": "a",
            "text": "POST",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "GET",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "DELETE",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "PUT",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service is most commonly integrated with API Gateway in serverless architectures?",
        "options": [
          {
            "id": "a",
            "text": "AWS Lambda",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route Tables",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM Groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an API Endpoint?",
        "options": [
          {
            "id": "a",
            "text": "A URL through which clients access an API",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database backup",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A subnet configuration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A security group rule",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is API Gateway useful for security?",
        "options": [
          {
            "id": "a",
            "text": "It supports authentication, authorization, throttling, and encryption",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It replaces IAM entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It removes the need for HTTPS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It automatically blocks all traffic",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is throttling in API Gateway?",
        "options": [
          {
            "id": "a",
            "text": "Limiting the number of API requests to protect backend systems",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing database storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating backups automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A mobile application needs to call a serverless backend built with Lambda. Which AWS service should expose the API endpoint?",
        "options": [
          {
            "id": "a",
            "text": "Amazon API Gateway",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Organizations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Amazon API Gateway REST APIs?",
        "options": [
          {
            "id": "a",
            "text": "API Gateway enables organizations to create, secure, manage, and scale REST APIs while integrating with AWS services such as Lambda",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "API Gateway is a storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "API Gateway replaces Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "API Gateway is used only for monitoring",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 9,
    "topic_sort": 3,
    "topic_title": "SNS & SQS messaging",
    "quiz_title": "SNS & SQS messaging — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon SNS?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A fully managed publish/subscribe messaging service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine platform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Amazon SQS?",
        "options": [
          {
            "id": "a",
            "text": "A managed message queue service",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A DNS service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A relational database",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A monitoring service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What communication model does SNS primarily use?",
        "options": [
          {
            "id": "a",
            "text": "Publish/Subscribe (Pub/Sub)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Client/Server Only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Peer-to-Peer Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database Replication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What communication model does SQS primarily use?",
        "options": [
          {
            "id": "a",
            "text": "Publish/Subscribe",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Message Queue",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "File Transfer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "DNS Resolution",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key benefit of Amazon SNS?",
        "options": [
          {
            "id": "a",
            "text": "One message can be delivered to multiple subscribers simultaneously",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It increases EC2 memory",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It stores large files",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a key benefit of Amazon SQS?",
        "options": [
          {
            "id": "a",
            "text": "Decoupling application components for improved reliability and scalability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing database size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Managing IAM permissions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replacing API Gateway",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens to a message in SQS after it is sent?",
        "options": [
          {
            "id": "a",
            "text": "It remains in the queue until a consumer processes it",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It is automatically deleted immediately",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It is stored in Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It becomes a Lambda function",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to send one notification to multiple systems, including email, Lambda, and SQS queues. Which AWS service is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Amazon SNS",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon RDS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Organizations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service is commonly used to buffer workloads and prevent application overload?",
        "options": [
          {
            "id": "a",
            "text": "Amazon SQS",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon CloudFront",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon ACM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes SNS and SQS?",
        "options": [
          {
            "id": "a",
            "text": "SNS provides publish/subscribe messaging for notifications, while SQS provides message queues for asynchronous communication between application components",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "SNS and SQS perform exactly the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "SQS replaces Lambda",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SNS is used only for databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 9,
    "topic_sort": 4,
    "topic_title": "EventBridge event routing",
    "quiz_title": "EventBridge event routing — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A serverless event bus service that routes events between applications and AWS services",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an event in EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "A notification that something has happened in a system or application",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage volume",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A security group",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A subnet",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "To route events from sources to targets based on defined rules",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To store application files",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To create EC2 instances",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Event Source in EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "The service or application that generates events",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database backup",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A route table",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A VPC subnet",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Rule in EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "A condition that determines which events should be routed to which targets",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A security policy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A storage configuration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A DNS record",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Target in EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "The destination service that receives an event after a rule matches it",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database server only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A subnet",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service is commonly triggered by EventBridge for serverless automation?",
        "options": [
          {
            "id": "a",
            "text": "AWS Lambda",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route Tables",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security Groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to automatically trigger a Lambda function whenever a file is uploaded to Amazon S3. Which AWS service can route this event?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EventBridge",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Organizations",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a major benefit of EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "Decoupling applications through event-driven communication",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replacing IAM policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creating Availability Zones",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Amazon EventBridge?",
        "options": [
          {
            "id": "a",
            "text": "EventBridge is a serverless event bus that routes events from sources to targets using rules, enabling scalable event-driven architectures",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EventBridge is a database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "EventBridge replaces API Gateway",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EventBridge is used only for monitoring",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 10,
    "topic_sort": 1,
    "topic_title": "CloudWatch metrics, logs & alarms",
    "quiz_title": "CloudWatch metrics, logs & alarms — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is Amazon CloudWatch?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A monitoring and observability service for AWS resources and applications",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a CloudWatch Metric?",
        "options": [
          {
            "id": "a",
            "text": "A measurable data point that represents the performance or status of a resource",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage volume",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "An IAM role",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A route table",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which CloudWatch metric is commonly monitored for Amazon EC2 instances?",
        "options": [
          {
            "id": "a",
            "text": "CPU Utilization",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Bucket Versioning",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Route Table Count",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM User Count",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What are CloudWatch Logs?",
        "options": [
          {
            "id": "a",
            "text": "A service that collects, stores, and analyzes log data from AWS resources and applications",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A backup service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A networking feature",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A database engine",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are logs important in cloud environments?",
        "options": [
          {
            "id": "a",
            "text": "They provide visibility into application behavior and system events",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They increase storage performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "They replace security groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They create EC2 instances",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a CloudWatch Alarm?",
        "options": [
          {
            "id": "a",
            "text": "A feature that monitors metrics and performs actions when thresholds are reached",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage configuration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A VPC component",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A DNS record",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What action can a CloudWatch Alarm perform?",
        "options": [
          {
            "id": "a",
            "text": "Send notifications through Amazon SNS",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Trigger Auto Scaling actions",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Alert administrators",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company wants to receive an alert when EC2 CPU utilization exceeds 80%. Which CloudWatch feature should be used?",
        "options": [
          {
            "id": "a",
            "text": "CloudWatch Logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CloudWatch Alarm",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS Snapshot",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How can CloudWatch contribute to cost optimization?",
        "options": [
          {
            "id": "a",
            "text": "By identifying underutilized resources and monitoring usage trends",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By replacing EC2 instances",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By increasing storage costs automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By disabling monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes CloudWatch Metrics, Logs, and Alarms?",
        "options": [
          {
            "id": "a",
            "text": "CloudWatch Metrics track performance data, Logs capture system activity, and Alarms automate notifications and responses based on defined thresholds",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All three components perform the same function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "CloudWatch is only used for security monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudWatch replaces Auto Scaling",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 10,
    "topic_sort": 2,
    "topic_title": "CloudTrail auditing",
    "quiz_title": "CloudTrail auditing — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is AWS CloudTrail?",
        "options": [
          {
            "id": "a",
            "text": "A monitoring dashboard service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A service that records and tracks AWS account activity and API calls",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A load balancer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What type of information does CloudTrail record?",
        "options": [
          {
            "id": "a",
            "text": "API calls and account activity across AWS services",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Only CPU utilization metrics",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Only storage usage statistics",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only network traffic",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of CloudTrail?",
        "options": [
          {
            "id": "a",
            "text": "Auditing, governance, security monitoring, and compliance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database management",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Load balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Content delivery",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which question can CloudTrail help answer?",
        "options": [
          {
            "id": "a",
            "text": "Who deleted an S3 bucket?",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Who modified an IAM policy?",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "When was an EC2 instance terminated?",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "What is an Event in CloudTrail?",
        "options": [
          {
            "id": "a",
            "text": "A record of an action performed within an AWS account",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database backup",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A VPC route",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A security group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which information is commonly included in a CloudTrail event?",
        "options": [
          {
            "id": "a",
            "text": "User identity, timestamp, source IP, and action performed",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Monitor resolution",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Storage class only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route table count",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does CloudTrail support security investigations?",
        "options": [
          {
            "id": "a",
            "text": "By providing a historical record of AWS account activity",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing EC2 performance",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By replacing CloudWatch",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By creating backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to know who changed an IAM role yesterday. Which AWS service should be used?",
        "options": [
          {
            "id": "a",
            "text": "CloudWatch",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CloudTrail",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the difference between CloudTrail and CloudWatch?",
        "options": [
          {
            "id": "a",
            "text": "CloudTrail tracks account activity and API calls, while CloudWatch focuses on monitoring metrics, logs, and operational performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "They are identical services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "CloudTrail replaces CloudWatch entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudWatch records only API calls",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS CloudTrail?",
        "options": [
          {
            "id": "a",
            "text": "CloudTrail records AWS account activity and API calls, providing auditing, compliance, governance, and security visibility across AWS environments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "CloudTrail is a storage service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "CloudTrail is used only for monitoring CPU utilization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudTrail replaces IAM",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 10,
    "topic_sort": 3,
    "topic_title": "AWS Config compliance",
    "quiz_title": "AWS Config compliance — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is AWS Config?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A service that records, tracks, and evaluates AWS resource configurations over time",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A load balancer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A content delivery service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of AWS Config?",
        "options": [
          {
            "id": "a",
            "text": "Resource configuration tracking and compliance monitoring",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database management",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Network routing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Content caching",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What type of information does AWS Config record?",
        "options": [
          {
            "id": "a",
            "text": "Resource configurations and configuration history",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "CPU temperature only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Internet bandwidth only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database query results only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Configuration Item in AWS Config?",
        "options": [
          {
            "id": "a",
            "text": "A snapshot of an AWS resource's configuration at a specific point in time",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database record",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A VPC route",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "An IAM user password",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an AWS Config Rule?",
        "options": [
          {
            "id": "a",
            "text": "A compliance rule used to evaluate resource configurations against desired settings",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A routing policy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A security group rule",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A database schema",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company requires all S3 buckets to have encryption enabled. Which AWS Config feature can verify this requirement?",
        "options": [
          {
            "id": "a",
            "text": "Config Rule",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route Table",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "NAT Gateway",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS Snapshot",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does a \"Non-Compliant\" result indicate in AWS Config?",
        "options": [
          {
            "id": "a",
            "text": "A resource does not meet the requirements defined by a Config Rule",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A resource is deleted",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A resource is overloaded",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A resource is encrypted",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How does AWS Config support security and governance?",
        "options": [
          {
            "id": "a",
            "text": "By continuously evaluating resources against compliance standards and organizational policies",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "By increasing storage capacity",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "By replacing IAM policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By creating backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the relationship between AWS Config and compliance auditing?",
        "options": [
          {
            "id": "a",
            "text": "AWS Config provides historical configuration data and compliance status for audit purposes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS Config replaces CloudTrail entirely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Config stores application code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Config manages EC2 networking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes AWS Config?",
        "options": [
          {
            "id": "a",
            "text": "AWS Config tracks resource configurations, records configuration history, and evaluates compliance using configurable rules",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS Config is a database service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Config is used only for monitoring CPU usage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Config replaces VPC networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 11,
    "topic_sort": 1,
    "topic_title": "CloudFormation templates & stacks",
    "quiz_title": "CloudFormation templates & stacks — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is AWS CloudFormation?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "An Infrastructure as Code (IaC) service used to provision and manage AWS resources using templates",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A monitoring service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A content delivery service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          {
            "id": "a",
            "text": "Managing infrastructure through manual console operations only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Defining and provisioning infrastructure using code and configuration files",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating databases automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Monitoring application logs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a CloudFormation Template?",
        "options": [
          {
            "id": "a",
            "text": "A file that describes AWS resources and their configurations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A backup file",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A database schema",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Route 53 record",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which formats are commonly used for CloudFormation Templates?",
        "options": [
          {
            "id": "a",
            "text": "YAML and JSON",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "XML and HTML",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "CSV and TXT",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SQL and YAML",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a CloudFormation Stack?",
        "options": [
          {
            "id": "a",
            "text": "A collection of AWS resources created and managed as a single unit from a template",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A VPC subnet",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A security group",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens when a CloudFormation Stack is updated?",
        "options": [
          {
            "id": "a",
            "text": "CloudFormation compares the current and desired state and applies necessary changes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "All resources are deleted automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A new AWS account is created",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only IAM resources are updated",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do organizations use CloudFormation?",
        "options": [
          {
            "id": "a",
            "text": "To automate infrastructure deployment and maintain consistency across environments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To replace databases",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To increase internet speed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage user passwords",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants identical Dev, Test, and Production environments. Which AWS service can help achieve this?",
        "options": [
          {
            "id": "a",
            "text": "AWS CloudFormation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon SNS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a major benefit of Infrastructure as Code?",
        "options": [
          {
            "id": "a",
            "text": "Version control, automation, and repeatable deployments",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased storage costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Elimination of security controls",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manual infrastructure management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes CloudFormation Templates and Stacks?",
        "options": [
          {
            "id": "a",
            "text": "Templates define AWS infrastructure as code, while Stacks are the deployed instances of those templates that create and manage AWS resources",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Templates and Stacks are identical concepts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Stacks are used only for monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudFormation replaces AWS networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 12,
    "topic_sort": 1,
    "topic_title": "Multi-AZ & multi-region patterns",
    "quiz_title": "Multi-AZ & multi-region patterns — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What does High Availability (HA) mean in AWS?",
        "options": [
          {
            "id": "a",
            "text": "Increasing storage capacity only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Designing systems to remain operational even when components fail",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating more IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reducing network traffic",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Availability Zone (AZ)?",
        "options": [
          {
            "id": "a",
            "text": "A collection of AWS accounts",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "One or more isolated data centers within an AWS Region",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A DNS service",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A virtual machine",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Multi-AZ architecture?",
        "options": [
          {
            "id": "a",
            "text": "Deploying resources across multiple Availability Zones within the same Region",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploying resources in multiple AWS accounts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deploying resources in multiple VPCs only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploying resources in multiple continents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of Multi-AZ deployments?",
        "options": [
          {
            "id": "a",
            "text": "Improved fault tolerance and high availability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increased storage size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced IAM permissions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Faster DNS resolution",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a Multi-Region architecture?",
        "options": [
          {
            "id": "a",
            "text": "Deploying resources across multiple AWS Regions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploying resources across multiple subnets only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deploying resources across multiple IAM groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploying resources in a single AZ",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which disaster scenario is Multi-Region architecture designed to address?",
        "options": [
          {
            "id": "a",
            "text": "Availability Zone failure only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Entire Region failure or large-scale disaster",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Password expiration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EC2 reboot events",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants its application to survive the failure of one Availability Zone. Which architecture should it use?",
        "options": [
          {
            "id": "a",
            "text": "Single-AZ",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Multi-AZ",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Single EC2 Instance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Local Storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A financial application requires business continuity even if an entire AWS Region becomes unavailable. Which architecture is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Single-AZ",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Multi-AZ Only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Multi-Region Deployment",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Local Backup Only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service can help route users to healthy endpoints across Regions?",
        "options": [
          {
            "id": "a",
            "text": "Amazon Route 53",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Config",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes Multi-AZ and Multi-Region patterns?",
        "options": [
          {
            "id": "a",
            "text": "Multi-AZ provides high availability within a Region, while Multi-Region provides disaster recovery and resilience across Regions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both architectures are identical",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Multi-Region replaces Multi-AZ entirely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Multi-AZ is only used for databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 12,
    "topic_sort": 2,
    "topic_title": "Backup, restore & DR planning (RTO/RPO)",
    "quiz_title": "Backup, restore & DR planning (RTO/RPO) — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary goal of Disaster Recovery (DR)?",
        "options": [
          {
            "id": "a",
            "text": "To increase application performance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To restore systems and data after a disruption or disaster",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To reduce storage usage",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage IAM users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a backup?",
        "options": [
          {
            "id": "a",
            "text": "A copy of data stored separately for recovery purposes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A load balancer configuration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A security group rule",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A DNS record",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of a restore operation?",
        "options": [
          {
            "id": "a",
            "text": "To recover data or systems from a backup",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To create a new VPC",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To increase CPU utilization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To update IAM permissions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does RTO stand for?",
        "options": [
          {
            "id": "a",
            "text": "Recovery Time Objective",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Recovery Transfer Operation",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Resource Tracking Objective",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replication Time Output",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does RPO stand for?",
        "options": [
          {
            "id": "a",
            "text": "Recovery Process Objective",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Recovery Point Objective",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Resource Performance Output",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replication Process Output",
            "is_correct": false
          }
        ]
      },
      {
        "question": "If a company has an RTO of 2 hours, what does it mean?",
        "options": [
          {
            "id": "a",
            "text": "Systems must be restored within 2 hours after a disruption",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Data must be backed up every 2 hours",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Recovery requires exactly 2 hours",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Systems can remain offline indefinitely",
            "is_correct": false
          }
        ]
      },
      {
        "question": "If a company has an RPO of 15 minutes, what does it mean?",
        "options": [
          {
            "id": "a",
            "text": "Up to 15 minutes of data loss is acceptable",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Recovery must complete within 15 minutes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Backups occur once every 15 days",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Data cannot be lost",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service is commonly used for storing backups?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security Groups",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which disaster recovery strategy provides the fastest recovery but typically costs the most?",
        "options": [
          {
            "id": "a",
            "text": "Backup & Restore",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Pilot Light",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Warm Standby",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Multi-Site Active/Active",
            "is_correct": true
          }
        ]
      },
      {
        "question": "Which statement best summarizes RTO and RPO?",
        "options": [
          {
            "id": "a",
            "text": "RTO defines acceptable downtime, while RPO defines acceptable data loss",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "RTO and RPO mean the same thing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "RTO measures storage size and RPO measures bandwidth",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "RTO applies only to databases",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 12,
    "topic_sort": 3,
    "topic_title": "AWS Well-Architected Framework",
    "quiz_title": "AWS Well-Architected Framework — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the AWS Well-Architected Framework?",
        "options": [
          {
            "id": "a",
            "text": "A database service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A set of best practices and design principles for building secure, reliable, efficient, and cost-effective cloud architectures",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A monitoring tool",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A storage service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of the AWS Well-Architected Framework?",
        "options": [
          {
            "id": "a",
            "text": "To help teams build and operate high-quality cloud architectures",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase EC2 instance size automatically",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To manage IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To replace CloudFormation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "How many pillars are included in the AWS Well-Architected Framework?",
        "options": [
          {
            "id": "a",
            "text": "4",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "5",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "6",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "8",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which pillar focuses on protecting systems, data, and assets?",
        "options": [
          {
            "id": "a",
            "text": "Reliability",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Security",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Performance Efficiency",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Sustainability",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which pillar focuses on recovering from failures and maintaining service availability?",
        "options": [
          {
            "id": "a",
            "text": "Reliability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Cost Optimization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Sustainability",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operational Excellence",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which pillar focuses on monitoring systems, automating changes, and improving operational processes?",
        "options": [
          {
            "id": "a",
            "text": "Performance Efficiency",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Security",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operational Excellence",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Cost Optimization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which pillar focuses on using resources efficiently and selecting the right technologies?",
        "options": [
          {
            "id": "a",
            "text": "Performance Efficiency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Reliability",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Sustainability",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which pillar focuses on avoiding unnecessary costs and maximizing business value?",
        "options": [
          {
            "id": "a",
            "text": "Operational Excellence",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Cost Optimization",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Reliability",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which pillar was added to help organizations reduce environmental impact?",
        "options": [
          {
            "id": "a",
            "text": "Governance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Sustainability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Scalability",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Automation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes the AWS Well-Architected Framework?",
        "options": [
          {
            "id": "a",
            "text": "It provides six architectural pillars that help organizations design secure, reliable, efficient, sustainable, and cost-optimized cloud solutions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It is used only for networking",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces AWS services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It applies only to large enterprises",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 12,
    "topic_sort": 4,
    "topic_title": "SAA-C03 exam domains & scenario questions",
    "quiz_title": "SAA-C03 exam domains & scenario questions — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary focus of the AWS Certified Solutions Architect – Associate (SAA-C03) exam?",
        "options": [
          {
            "id": "a",
            "text": "Software development only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Designing secure, resilient, high-performing, and cost-optimized AWS architectures",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Managing Linux servers only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Writing application code",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS Well-Architected pillar is most closely associated with designing fault-tolerant systems?",
        "options": [
          {
            "id": "a",
            "text": "Cost Optimization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reliability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Sustainability",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operational Excellence",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company wants its application to remain available if an Availability Zone fails. Which solution is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Deploy all resources in a single AZ",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Use Multi-AZ architecture with Load Balancing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Store data locally only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable Auto Scaling",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: An application experiences unpredictable traffic spikes. Which AWS service combination is best?",
        "options": [
          {
            "id": "a",
            "text": "EC2 + Auto Scaling + Application Load Balancer",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EC2 only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "S3 only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Route 53 only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company wants to store large amounts of static website content at low cost. Which AWS service is most suitable?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon RDS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Lambda",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon EC2",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A global application needs to deliver content with low latency to users worldwide. Which AWS service should be used?",
        "options": [
          {
            "id": "a",
            "text": "Amazon CloudFront",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Config",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon SNS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company wants to reduce database read load while improving application response times. Which AWS service is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Amazon ElastiCache",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS CloudTrail",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company needs a serverless architecture that runs code in response to events. Which AWS service should be selected?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS Lambda",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon RDS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A security team wants to know who modified an IAM policy yesterday. Which AWS service provides this information?",
        "options": [
          {
            "id": "a",
            "text": "AWS CloudTrail",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon CloudFront",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS Config",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon SQS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company wants to automatically evaluate whether S3 buckets comply with encryption requirements. Which AWS service should be used?",
        "options": [
          {
            "id": "a",
            "text": "AWS Config",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Route 53",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Lambda",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AWS",
    "module_number": 12,
    "topic_sort": 5,
    "topic_title": "Architecture trade-offs: security, cost, reliability",
    "quiz_title": "Architecture trade-offs: security, cost, reliability — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is an architecture trade-off in cloud design?",
        "options": [
          {
            "id": "a",
            "text": "Choosing between different design options based on business requirements and constraints",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increasing storage capacity only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating IAM users",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploying resources in a single Availability Zone",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is it important to consider trade-offs when designing AWS architectures?",
        "options": [
          {
            "id": "a",
            "text": "Every design decision affects cost, security, performance, or reliability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS services have no limitations",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Security is the only factor that matters",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cost is always the highest priority",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company wants the lowest possible cost for a non-critical internal application. Which option is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Single-AZ deployment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Multi-Region active-active deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Global load balancing across continents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Duplicate infrastructure in multiple Regions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A financial application requires maximum availability and minimal downtime. Which design is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Single EC2 instance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Multi-AZ deployment with Load Balancing and Auto Scaling",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Local backups only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "One Availability Zone",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which design choice generally increases reliability but also increases cost?",
        "options": [
          {
            "id": "a",
            "text": "Multi-AZ architecture",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deleting backups",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Removing monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disabling encryption",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS service helps improve security through centralized identity and access management?",
        "options": [
          {
            "id": "a",
            "text": "IAM",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "CloudFront",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ElastiCache",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "EBS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A company wants to improve security by enabling encryption for all stored data. What is the trade-off?",
        "options": [
          {
            "id": "a",
            "text": "Slightly increased operational complexity while improving data protection",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Lower reliability",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "No security benefit",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Elimination of backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AWS architecture provides the highest reliability but generally has the highest cost?",
        "options": [
          {
            "id": "a",
            "text": "Single EC2 Instance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Single-AZ Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Multi-Region Active-Active Architecture",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Local Storage Only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Scenario: A startup wants a balance between cost and availability. Which architecture is often recommended?",
        "options": [
          {
            "id": "a",
            "text": "Multi-AZ deployment within a single Region",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Active-Active across multiple continents",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Dedicated infrastructure in every Region",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Multiple backup data centers worldwide",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best summarizes architecture trade-offs?",
        "options": [
          {
            "id": "a",
            "text": "Cloud architects must balance security, cost, and reliability based on business requirements because optimizing one area often impacts another",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Cost should always be ignored",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reliability is never important",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security and cost have no relationship",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 1,
    "topic_title": "Linux Administration, Files, Permissions & Processes",
    "quiz_title": "Linux Administration, Files, Permissions & Processes — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "You are logged into a Linux server and want to verify your current location in the filesystem before creating new files and directories. Which command should you use to display the absolute path of your current working directory?",
        "options": [
          {
            "id": "a",
            "text": "ls",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "pwd",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "cd",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "whereis",
            "is_correct": false
          }
        ]
      },
      {
        "question": "As a Linux administrator, you need to view all files and directories available in your current location before performing any operations. Which command will help you list the contents of the current directory?",
        "options": [
          {
            "id": "a",
            "text": "pwd",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ls",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "cat",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "touch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are currently working in the '/home/user' directory and need to move to the '/etc' directory to edit a configuration file. Which Linux command is used to change directories?",
        "options": [
          {
            "id": "a",
            "text": "mv",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "cd",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "cp",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "pwd",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A project requires you to organize files into separate folders. Which command would you use to create a new directory named 'project_data' in Linux?",
        "options": [
          {
            "id": "a",
            "text": "touch project_data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "mkdir project_data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "create project_data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "dir project_data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to create an empty text file called 'notes.txt' that will later be used to store configuration details. Which command is most commonly used for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "mkdir notes.txt",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "cat notes.txt",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "touch notes.txt",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "nano notes.txt",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A file has the permission string '-rw-r--r--'. What level of access does the owner of the file have?",
        "options": [
          {
            "id": "a",
            "text": "Read only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Read and Write",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Read, Write, and Execute",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Execute only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have created a shell script named 'backup.sh' and want to make it executable. Which command should you use to grant execute permission to the owner, group, and others?",
        "options": [
          {
            "id": "a",
            "text": "chmod 644 backup.sh",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "chmod 755 backup.sh",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "chmod 600 backup.sh",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "chmod 444 backup.sh",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer reports that they cannot modify a file because they are not the owner. As a Linux administrator, which command would you use to change the ownership of the file?",
        "options": [
          {
            "id": "a",
            "text": "chmod",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "chown",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "passwd",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "usermod",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to inspect the contents of a configuration file named 'config.txt' directly from the terminal without opening a text editor. Which command is best suited for this task?",
        "options": [
          {
            "id": "a",
            "text": "cat config.txt",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "chmod config.txt",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ps config.txt",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "mkdir config.txt",
            "is_correct": false
          }
        ]
      },
      {
        "question": "While troubleshooting a production server, you need to identify which user account is currently logged into the terminal session. Which command will display the username of the active user?",
        "options": [
          {
            "id": "a",
            "text": "who",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "users",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "id",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "whoami",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A Linux server appears to be running slowly. You want to view all active processes and monitor CPU and memory utilization in real time. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "df -h",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "free -m",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "top",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "pwd",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need a snapshot of currently running processes without entering an interactive monitoring mode. Which command is specifically designed to display process information?",
        "options": [
          {
            "id": "a",
            "text": "ps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "ls",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "chmod",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "mount",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A process with PID 5678 is consuming excessive resources and must be terminated gracefully, allowing it to shut down properly. Which command should you use first?",
        "options": [
          {
            "id": "a",
            "text": "kill -9 5678",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kill 5678",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "terminate 5678",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "stop 5678",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A process is unresponsive and does not stop even after receiving a normal termination signal. Which command will forcefully terminate the process with PID 5678?",
        "options": [
          {
            "id": "a",
            "text": "kill 5678",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kill -15 5678",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "kill -9 5678",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "stop 5678",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are reviewing permissions on a critical shell script and notice the permission value is set to 777. What does this permission setting mean?",
        "options": [
          {
            "id": "a",
            "text": "Only the owner can read, write, and execute",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Owner and group have full access, others have read-only access",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Everyone has read, write, and execute permissions",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Everyone has read-only access",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 2,
    "topic_title": "Shell Scripting & Automation",
    "quiz_title": "Shell Scripting & Automation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "You frequently run the same set of Linux commands every morning to check system health. What is the primary benefit of creating a shell script for these tasks?",
        "options": [
          {
            "id": "a",
            "text": "Increase internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automate repetitive tasks",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Install software automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Improve hardware performance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A shell script file named 'backup.sh' has been created. Before running it, which command should be used to make the script executable?",
        "options": [
          {
            "id": "a",
            "text": "chmod +x backup.sh",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "touch backup.sh",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "mkdir backup.sh",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "cat backup.sh",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which line is commonly used at the beginning of a Bash shell script to specify the interpreter that should execute the script?",
        "options": [
          {
            "id": "a",
            "text": "#!/bin/bash",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "#include bash",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "bash start",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "#script bash",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want a shell script to display the message 'Welcome to Linux Automation'. Which command should be used inside the script?",
        "options": [
          {
            "id": "a",
            "text": "print",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "display",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "echo",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "show",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A script asks the user to enter their name and stores it in a variable called 'username'. Which command is used to take input from the user?",
        "options": [
          {
            "id": "a",
            "text": "input",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "scan",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "read",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "get",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a shell script, a variable named 'city' contains the value 'Bengaluru'. How would you display its value using the echo command?",
        "options": [
          {
            "id": "a",
            "text": "echo city",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "echo %city%",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "echo $city",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "echo @city",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want a script to perform different actions based on whether a user enters 'yes' or 'no'. Which shell scripting construct is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "for loop",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "while loop",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "if statement",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "function",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A script needs to display numbers from 1 to 5 automatically. Which shell scripting concept is typically used for this task?",
        "options": [
          {
            "id": "a",
            "text": "Variable",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Loop",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Comment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have written a script named 'healthcheck.sh' and want to execute it from the current directory. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "healthcheck.sh",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "./healthcheck.sh",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "run healthcheck.sh",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "execute healthcheck.sh",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses a shell script to automatically generate daily server reports and save them to a file. This is an example of which use case of shell scripting?",
        "options": [
          {
            "id": "a",
            "text": "Gaming",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Web Designing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Task Automation",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Database Creation",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 3,
    "topic_title": "Git & GitHub Workflows, Branching & Pull Requests",
    "quiz_title": "Git & GitHub Workflows, Branching & Pull Requests — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 40,
    "questions": [
      {
        "question": "You have cloned a project from GitHub and want to verify which branch you are currently working on. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git branch",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git remote -v",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have created a new feature called 'login-page' and want to develop it without affecting the main codebase. Which command creates and switches to a new branch?",
        "options": [
          {
            "id": "a",
            "text": "git checkout login-page",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git branch login-page",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git checkout -b login-page",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git merge login-page",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After making changes to several files, you want to see which files have been modified before committing them. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "git diff",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git pull",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have completed your code changes and want to add all modified files to the staging area. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git commit -m",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git add .",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git push",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git merge",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have staged your changes and now want to save them in Git with a meaningful message. Which command is used to create a commit?",
        "options": [
          {
            "id": "a",
            "text": "git save -m",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git commit -m 'message'",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git push origin main",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git add commit",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to upload your local commits to the remote GitHub repository. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git upload",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git push",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git commit",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git publish",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A teammate has pushed new changes to GitHub. Which command will download and merge those changes into your local branch?",
        "options": [
          {
            "id": "a",
            "text": "git clone",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git fetch",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git pull",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git merge",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to create a copy of an existing GitHub repository on your local machine for the first time. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git pull",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git fork",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git clone",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git checkout",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before starting a new feature, you want to see all branches available in your local repository. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git branches",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git branch",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git log",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have finished working on a feature branch and want to switch back to the main branch. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git branch main",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git checkout main",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git merge main",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git push main",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After testing a feature branch, you want to combine its changes into the main branch. Which Git operation should you perform?",
        "options": [
          {
            "id": "a",
            "text": "Clone",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Pull",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Merge",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Fork",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team follows a workflow where every feature is developed in a separate branch before being added to the main codebase. What is the primary advantage of using branches?",
        "options": [
          {
            "id": "a",
            "text": "Increases internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Allows isolated development without affecting main code",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Automatically fixes bugs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deletes old commits",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to review the history of commits made in a repository. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git log",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git diff",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git branch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer has completed a feature and wants team members to review the code before it is merged into the main branch. Which GitHub feature should they create?",
        "options": [
          {
            "id": "a",
            "text": "Issue",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Repository",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Pull Request",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Release",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Pull Request in GitHub?",
        "options": [
          {
            "id": "a",
            "text": "Delete code from repository",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Request code review and merge changes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Download repository files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create a new repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A teammate comments on your Pull Request and requests changes. What should you do next?",
        "options": [
          {
            "id": "a",
            "text": "Delete the Pull Request",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Ignore the comments",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Make the requested changes and push new commits",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Create a new repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You accidentally made changes directly on the main branch. What is generally considered a better professional practice?",
        "options": [
          {
            "id": "a",
            "text": "Continue working on main",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create feature branches for new work",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete main branch",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Push code without testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team lead asks you to check which remote repository your local project is connected to. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git remote -v",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git branch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A project follows the workflow: Create Branch → Develop Feature → Commit Changes → Push Branch → Create Pull Request. What is the main benefit of this workflow?",
        "options": [
          {
            "id": "a",
            "text": "Reduces collaboration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Allows code review and safer development",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Prevents commits",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes the need for testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are working on a team project and want to ensure your local branch contains the latest code from GitHub before starting new work. Which command should you run first?",
        "options": [
          {
            "id": "a",
            "text": "git pull",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "git commit",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git push",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git merge",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 4,
    "topic_title": "Cloud Fundamentals — AWS IAM, EC2, S3, VPC",
    "quiz_title": "Cloud Fundamentals — AWS IAM, EC2, S3, VPC — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "Your company wants to move its applications from on-premises servers to AWS. What is the primary benefit of cloud computing compared to traditional infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "Unlimited free hardware",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "On-demand scalability and pay-as-you-go pricing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "No internet connection required",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Permanent fixed resources",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are an AWS administrator and need to create individual accounts for team members while controlling what resources they can access. Which AWS service should you use?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS IAM",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon VPC",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A new developer joins your team and requires access to AWS services. What is the best practice?",
        "options": [
          {
            "id": "a",
            "text": "Share the root account credentials",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create an IAM User with appropriate permissions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Disable authentication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create another AWS account",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to grant read-only access to an S3 bucket for multiple users. Which IAM feature should be used to assign permissions efficiently?",
        "options": [
          {
            "id": "a",
            "text": "IAM Groups",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM Passwords",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Login URLs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Regions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application requires a virtual server where you can install software, run applications, and manage the operating system. Which AWS service should you choose?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EC2",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company website needs to run continuously on a Linux server hosted in AWS. Which EC2 feature allows you to launch and manage virtual machines?",
        "options": [
          {
            "id": "a",
            "text": "EC2 Instances",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "S3 Buckets",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "VPC Peering",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have uploaded application logs, images, and backups to AWS and need durable object storage. Which AWS service is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon VPC",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company stores thousands of image files in AWS. What is the storage container called in Amazon S3?",
        "options": [
          {
            "id": "a",
            "text": "Folder",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Bucket",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Instance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs to make certain files publicly accessible through a URL while keeping other files private. Which AWS service supports this capability?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS CloudTrail",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to isolate your AWS resources within a private network and control inbound and outbound traffic. Which AWS service should you use?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon VPC",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon S3",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A VPC allows you to create a logically isolated network in AWS. Which component within a VPC helps divide the network into smaller sections?",
        "options": [
          {
            "id": "a",
            "text": "Buckets",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Subnets",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Volumes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You launch an EC2 instance inside a public subnet and want users on the internet to access it. Which component allows communication between the VPC and the internet?",
        "options": [
          {
            "id": "a",
            "text": "IAM Role",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Internet Gateway",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "S3 Bucket",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudWatch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your company wants developers to upload files to S3 but prevent them from deleting objects. Which AWS service should be used to define these permissions?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon VPC",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudFront",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are designing a simple web application on AWS. Which combination of services is commonly used to host the application and store uploaded files?",
        "options": [
          {
            "id": "a",
            "text": "IAM + VPC",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "EC2 + S3",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "VPC + IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudTrail + IAM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A startup wants to deploy a secure web application on AWS. They need user access management, virtual servers, object storage, and network isolation. Which combination of AWS services fulfills these requirements?",
        "options": [
          {
            "id": "a",
            "text": "IAM, EC2, S3, and VPC",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EC2, Lambda, SNS, and CloudWatch",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "S3, Route53, CloudTrail, and EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM, DynamoDB, CloudFront, and Athena",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 5,
    "topic_title": "AI Tools — GitHub Copilot, Prompt Engineering for Infra",
    "quiz_title": "AI Tools — GitHub Copilot, Prompt Engineering for Infra — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 40,
    "questions": [
      {
        "question": "You need to create a Dockerfile for a Node.js application but are unsure about the syntax. Which AI tool can help generate the code directly inside your IDE?",
        "options": [
          {
            "id": "a",
            "text": "GitHub Copilot",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Terraform",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Jenkins",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of GitHub Copilot for DevOps and Cloud Engineers?",
        "options": [
          {
            "id": "a",
            "text": "Host applications",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Generate and suggest code automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Store files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Monitor servers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are writing a Bash script to monitor disk usage. GitHub Copilot can help by:",
        "options": [
          {
            "id": "a",
            "text": "Deploying the script automatically",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Suggesting script code and commands",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants ChatGPT to generate a Terraform script for creating an EC2 instance. What should the engineer provide first?",
        "options": [
          {
            "id": "a",
            "text": "A clear prompt describing the requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The AWS bill",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The EC2 instance ID",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Docker image",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Prompt Engineering?",
        "options": [
          {
            "id": "a",
            "text": "Writing Python applications",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Designing cloud networks",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating effective instructions for AI systems",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Building CI/CD pipelines",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which prompt is likely to produce the best result from an AI assistant?",
        "options": [
          {
            "id": "a",
            "text": "Create infrastructure",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Help me",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Create a Terraform script to deploy an EC2 instance in us-east-1 with security group access on port 22",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "AWS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want AI to explain a Kubernetes Deployment YAML file line by line. Which approach is best?",
        "options": [
          {
            "id": "a",
            "text": "Ask a specific question and provide the YAML",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Type 'Kubernetes'",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Upload nothing and expect an answer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ask unrelated questions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A well-written prompt generally contains:",
        "options": [
          {
            "id": "a",
            "text": "Clear requirements and context",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Only one word",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Random commands",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No objective",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want ChatGPT to act as a senior DevOps engineer and review your CI/CD pipeline. Which prompting technique are you using?",
        "options": [
          {
            "id": "a",
            "text": "Role-based prompting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database prompting",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Network prompting",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Storage prompting",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a good use case for GitHub Copilot?",
        "options": [
          {
            "id": "a",
            "text": "Generating Dockerfiles",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating shell scripts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Writing Terraform code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "You ask an AI tool to generate a Bash script, but the output is incomplete. What should you do next?",
        "options": [
          {
            "id": "a",
            "text": "Provide more context and requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the script immediately",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ignore the output",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Restart your computer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before using AI-generated infrastructure code in production, what should a DevOps engineer do?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and validate the code",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Share it publicly",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A prompt asks ChatGPT to create an AWS architecture diagram description. Which skill is being used?",
        "options": [
          {
            "id": "a",
            "text": "Prompt Engineering",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Docker Networking",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Git Branching",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Linux Administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "GitHub Copilot suggestions are generated based on:",
        "options": [
          {
            "id": "a",
            "text": "The current code and comments in your editor",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Your internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS account settings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Computer RAM only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can AI assist with in DevOps workflows?",
        "options": [
          {
            "id": "a",
            "text": "Writing Infrastructure as Code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Generating scripts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Troubleshooting errors",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "You receive an error from Terraform and want AI assistance. Which prompt is most effective?",
        "options": [
          {
            "id": "a",
            "text": "Fix this",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Terraform error",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Explain this Terraform error and suggest a fix: [paste error message]",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "AWS issue",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is it important to verify AI-generated commands before executing them on production servers?",
        "options": [
          {
            "id": "a",
            "text": "AI outputs may contain mistakes or assumptions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AI commands always fail",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Servers do not support AI",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Linux blocks AI commands",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants AI to generate a GitHub Actions workflow. Which information should be included in the prompt?",
        "options": [
          {
            "id": "a",
            "text": "Application type and deployment requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Favorite movie",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Laptop model",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Office address",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the main advantage of using AI tools like GitHub Copilot in DevOps tasks?",
        "options": [
          {
            "id": "a",
            "text": "Reduce repetitive work and improve productivity",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Replace cloud services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminate testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove the need for engineers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your manager asks you to generate a Docker Compose file quickly using AI. After receiving the output, what is the most professional next step?",
        "options": [
          {
            "id": "a",
            "text": "Review, test, and validate the configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy directly to production",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Delete the file",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the generated content",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 1,
    "topic_title": "Docker & Containerization",
    "quiz_title": "Docker & Containerization — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 40,
    "questions": [
      {
        "question": "You have installed Docker on a Linux server and want to verify that Docker is running correctly. Which command would you use?",
        "options": [
          {
            "id": "a",
            "text": "docker version",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "docker status",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker check",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to see all Docker images currently available on your system before creating a container. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker ps",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker images",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker list",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants to download the latest Nginx image from Docker Hub. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "docker get nginx",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker pull nginx",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker install nginx",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker fetch nginx",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have downloaded the Nginx image and now want to start a container from it. Which command is commonly used?",
        "options": [
          {
            "id": "a",
            "text": "docker run nginx",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "docker create nginx",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker start nginx",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker launch nginx",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Docker image can best be described as:",
        "options": [
          {
            "id": "a",
            "text": "A running application",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A blueprint used to create containers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A network configuration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Docker container can best be described as:",
        "options": [
          {
            "id": "a",
            "text": "A running instance of an image",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A Docker registry",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A Dockerfile",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Docker network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to view all currently running containers on your system. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker ps",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker inspect",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker logs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to see all containers, including stopped containers. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker ps",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker ps -a",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker all",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker containers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A container named 'webapp' is no longer needed. Which command will stop the running container?",
        "options": [
          {
            "id": "a",
            "text": "docker remove webapp",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker stop webapp",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker killall webapp",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker terminate webapp",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After stopping a container, you want to start it again without creating a new one. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker run webapp",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker create webapp",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker start webapp",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "docker launch webapp",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to view the logs generated by a running container named 'nginx-container'. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker inspect nginx-container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker logs nginx-container",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker output nginx-container",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker status nginx-container",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application is running inside a container on port 80, and you want users to access it on port 8080 of the host machine. Which Docker option is commonly used?",
        "options": [
          {
            "id": "a",
            "text": "-p 8080:80",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "-v 8080:80",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "-e 8080:80",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "--port 80",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have modified an application running inside a container and want to save it as a new Docker image. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "docker build",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker commit",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker save",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker export",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team wants to define multiple containers such as a web server and database in a single configuration file. Which Docker tool is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Docker Registry",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Docker Compose",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Docker Hub",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Docker Volume",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which file is commonly used to define services, networks, and volumes in Docker Compose?",
        "options": [
          {
            "id": "a",
            "text": "Dockerfile",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker-compose.yml",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "compose.conf",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker.yaml",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have a docker-compose.yml file and want to start all defined services. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker compose up",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "docker compose run",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker start compose",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker run compose",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants to store and share Docker images in a central location so that other developers can download them. What is this storage location called?",
        "options": [
          {
            "id": "a",
            "text": "Container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Registry",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Docker Hub is an example of:",
        "options": [
          {
            "id": "a",
            "text": "A container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A registry",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Docker network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have built a custom image called 'myapp:v1' and want to upload it to Docker Hub. Which command is typically used?",
        "options": [
          {
            "id": "a",
            "text": "docker upload myapp:v1",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker push myapp:v1",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker publish myapp:v1",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker deploy myapp:v1",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development team wants to package an application along with all its dependencies so that it runs consistently on any machine. Which Docker concept provides this capability?",
        "options": [
          {
            "id": "a",
            "text": "Images and Containers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Volumes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Networks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Registries Only",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 2,
    "topic_title": "Kubernetes — Architecture, Pods, Services, Deployments, ConfigMaps, Secrets, Helm",
    "quiz_title": "Kubernetes — Architecture, Pods, Services, Deployments, ConfigMaps, Secrets, Helm — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "Your company wants to run containerized applications at scale with automated deployment, scaling, and self-healing capabilities. Which platform is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Docker Compose",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Kubernetes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "GitHub Actions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Kubernetes architecture, which component is responsible for managing the overall cluster and making scheduling decisions?",
        "options": [
          {
            "id": "a",
            "text": "Worker Node",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Control Plane",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Container Runtime",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Kubernetes cluster consists of one Control Plane and multiple Worker Nodes. What is the primary responsibility of Worker Nodes?",
        "options": [
          {
            "id": "a",
            "text": "Managing cluster configuration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Running application workloads",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating Kubernetes manifests",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Storing Docker images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have deployed a containerized application in Kubernetes. What is the smallest deployable unit in Kubernetes that can contain one or more containers?",
        "options": [
          {
            "id": "a",
            "text": "Node",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Pod",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application Pod crashes unexpectedly. Kubernetes automatically creates a replacement Pod to maintain availability. Which Kubernetes feature enables this behavior?",
        "options": [
          {
            "id": "a",
            "text": "Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Deployment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "ConfigMap",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Helm",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to view all Pods currently running in a Kubernetes cluster. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "kubectl get deployments",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kubectl get services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "kubectl get pods",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "kubectl get nodes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application is running successfully inside a Pod, but users cannot access it from outside the cluster. Which Kubernetes resource is used to expose applications and provide network access?",
        "options": [
          {
            "id": "a",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "ConfigMap",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Namespace",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development team wants a stable endpoint that forwards traffic to a group of Pods even if individual Pods are recreated. Which Kubernetes resource provides this functionality?",
        "options": [
          {
            "id": "a",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Node",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Service",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Secret",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your organization wants to store application configuration values such as environment names, URLs, and feature flags separately from the application code. Which Kubernetes resource should be used?",
        "options": [
          {
            "id": "a",
            "text": "Secret",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ConfigMap",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Helm Chart",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A database application requires storing sensitive information such as passwords, API keys, and tokens. Which Kubernetes resource is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "ConfigMap",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secret",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs to update an application from version 1.0 to version 2.0 with minimal downtime. Which Kubernetes resource manages rolling updates and application versions?",
        "options": [
          {
            "id": "a",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deployment",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "ConfigMap",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to check all Deployments running in a Kubernetes cluster. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "kubectl get pods",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kubectl get nodes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "kubectl get deployments",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "kubectl get services",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to package Kubernetes manifests, configuration files, and deployment templates into a reusable unit that can be installed across environments. Which tool is commonly used?",
        "options": [
          {
            "id": "a",
            "text": "Docker Hub",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Terraform",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Helm",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Jenkins",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Helm is often referred to as the package manager for Kubernetes. What is the name of a deployable package in Helm?",
        "options": [
          {
            "id": "a",
            "text": "Bundle",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Artifact",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Chart",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Package File",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production application running on Kubernetes requires Pods, Deployments, Services, configuration values, and secrets to work together. Which statement best describes the role of Kubernetes in this scenario?",
        "options": [
          {
            "id": "a",
            "text": "It only runs containers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It only manages networking",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It orchestrates and manages containerized applications and their resources",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "It replaces Docker completely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 3,
    "topic_title": "CI/CD — GitHub Actions, Jenkins",
    "quiz_title": "CI/CD — GitHub Actions, Jenkins — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A development team wants code changes to be automatically tested and deployed whenever code is pushed to GitHub. Which software engineering practice enables this automation?",
        "options": [
          {
            "id": "a",
            "text": "Virtualization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CI/CD",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does 'CI' stand for in CI/CD?",
        "options": [
          {
            "id": "a",
            "text": "Code Integration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Continuous Integration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Continuous Infrastructure",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud Integration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does 'CD' commonly stand for in modern DevOps practices?",
        "options": [
          {
            "id": "a",
            "text": "Continuous Delivery/Deployment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Code Delivery",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cloud Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Delivery",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer pushes code to GitHub, and an automated process immediately runs tests. Which phase of CI/CD is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Continuous Integration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Monitoring",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Logging",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants to automate application builds, testing, and deployments directly from GitHub repositories. Which tool is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Jenkins",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "GitHub Actions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Docker",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "GitHub Actions workflows are typically defined using which file format?",
        "options": [
          {
            "id": "a",
            "text": "JSON",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "XML",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "YAML",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "CSV",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want a GitHub Actions workflow to run automatically whenever code is pushed to the main branch. What is this called in GitHub Actions?",
        "options": [
          {
            "id": "a",
            "text": "Container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Runner",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Trigger/Event",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Pipeline Stage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses Jenkins to automate software delivery. What is Jenkins primarily used for?",
        "options": [
          {
            "id": "a",
            "text": "Container Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CI/CD Automation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Cloud Hosting",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database Management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Jenkins Pipeline is best described as:",
        "options": [
          {
            "id": "a",
            "text": "A Docker Image",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A sequence of automated build, test, and deployment steps",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A Kubernetes Pod",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Git Repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application code has successfully passed automated tests. The next stage automatically deploys the application to a test environment. Which benefit of CI/CD does this demonstrate?",
        "options": [
          {
            "id": "a",
            "text": "Manual deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automated software delivery",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Database replication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Version rollback",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team wants to ensure code quality before deployment. Which activity is commonly included in a CI/CD pipeline?",
        "options": [
          {
            "id": "a",
            "text": "Automated Testing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Server Installation",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Hardware Upgrade",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network Replacement",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Jenkins, which component executes the jobs or pipelines assigned by the Jenkins Controller?",
        "options": [
          {
            "id": "a",
            "text": "Worker/Agent",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Repository",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Plugin",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Registry",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your GitHub Actions workflow builds a Docker image every time code is pushed. What is the main advantage of this automation?",
        "options": [
          {
            "id": "a",
            "text": "Reduces manual effort and human errors",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increases hardware costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disables testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Prevents collaboration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to view whether a pipeline succeeded or failed after a deployment. Which feature is commonly provided by both Jenkins and GitHub Actions?",
        "options": [
          {
            "id": "a",
            "text": "Pipeline Execution Logs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database Backups",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Container Registries",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud Networking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A modern software team uses GitHub Actions for CI and Jenkins for enterprise deployments. What is the primary goal of both tools?",
        "options": [
          {
            "id": "a",
            "text": "Store application data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automate software build, test, and deployment processes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace source control systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage cloud networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 4,
    "topic_title": "Blue-Green & Canary Deployments",
    "quiz_title": "Blue-Green & Canary Deployments — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A company wants to deploy a new version of its application without affecting users currently using the old version. Which deployment strategy is specifically designed for this purpose by maintaining two identical environments?",
        "options": [
          {
            "id": "a",
            "text": "Rolling Deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Blue-Green Deployment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Recreate Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manual Deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a Blue-Green deployment strategy, what does the 'Blue' environment typically represent?",
        "options": [
          {
            "id": "a",
            "text": "The testing environment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The currently live production environment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The backup server",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The monitoring system",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team has deployed version 2 of an application to the Green environment and completed testing. What is the next step in a Blue-Green deployment?",
        "options": [
          {
            "id": "a",
            "text": "Delete the Blue environment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Switch user traffic from Blue to Green",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create a new container",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Stop monitoring the application",
            "is_correct": false
          }
        ]
      },
      {
        "question": "One of the biggest advantages of Blue-Green deployments is:",
        "options": [
          {
            "id": "a",
            "text": "Reduced storage requirements",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Fast rollback capability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "No testing required",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No infrastructure needed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After switching traffic to the Green environment, users begin reporting critical issues. What is the fastest recovery action in a Blue-Green deployment?",
        "options": [
          {
            "id": "a",
            "text": "Rebuild the application",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create new servers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Switch traffic back to Blue",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Restart the database",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to release a new application version to only 10% of users first and gradually increase traffic if no issues occur. Which deployment strategy should be used?",
        "options": [
          {
            "id": "a",
            "text": "Blue-Green Deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Canary Deployment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Recreate Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manual Deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Canary deployment?",
        "options": [
          {
            "id": "a",
            "text": "Deploy to all users at once",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduce deployment risks by exposing a small group of users to the new version first",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increase server storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a Canary deployment, the new application version is initially exposed to:",
        "options": [
          {
            "id": "a",
            "text": "100% of users",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Only administrators",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A small percentage of users",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "No users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your monitoring dashboard shows increased error rates after a Canary release to 20% of users. What should the deployment team do?",
        "options": [
          {
            "id": "a",
            "text": "Increase traffic to 100%",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Ignore the errors",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Rollback the Canary deployment",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Delete the monitoring system",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best compares Blue-Green and Canary deployments?",
        "options": [
          {
            "id": "a",
            "text": "Blue-Green switches all traffic at once, while Canary gradually shifts traffic to the new version",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Canary switches all traffic at once, while Blue-Green gradually shifts traffic",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Both strategies require application downtime",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Neither strategy supports rollbacks",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 5,
    "topic_title": "AI-Assisted Pipeline Generation",
    "quiz_title": "AI-Assisted Pipeline Generation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A DevOps engineer wants to use ChatGPT to generate a GitHub Actions workflow for a Node.js application. What is the most important information to include in the prompt?",
        "options": [
          {
            "id": "a",
            "text": "Application requirements and deployment steps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Laptop specifications",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Office location",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs a CI/CD pipeline that builds a Docker image, runs tests, and deploys to Kubernetes. What is the primary benefit of using AI to generate the initial pipeline configuration?",
        "options": [
          {
            "id": "a",
            "text": "Reduces manual effort and speeds up development",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Eliminates the need for testing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replaces Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes the need for DevOps engineers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer asks GitHub Copilot to generate a Jenkins Pipeline. Before using it in production, what should be done?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and validate the generated pipeline",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the generated code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable Jenkins",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want ChatGPT to generate a CI/CD workflow that deploys code whenever changes are pushed to the main branch. Which prompt is likely to produce the best results?",
        "options": [
          {
            "id": "a",
            "text": "Create a pipeline",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CI/CD",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Generate a GitHub Actions workflow that builds, tests, and deploys a Node.js application whenever code is pushed to the main branch",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Deploy code",
            "is_correct": false
          }
        ]
      },
      {
        "question": "AI generates a pipeline YAML file, but the deployment stage contains incorrect environment variables. What is the most appropriate action?",
        "options": [
          {
            "id": "a",
            "text": "Review and modify the configuration before deployment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy anyway",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Delete the entire pipeline",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the issue",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can AI assist with when building CI/CD pipelines?",
        "options": [
          {
            "id": "a",
            "text": "Generating YAML workflow files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Suggesting deployment steps",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Explaining pipeline errors",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A DevOps engineer receives a pipeline failure error in GitHub Actions. How can AI help in this situation?",
        "options": [
          {
            "id": "a",
            "text": "Analyze logs and suggest possible fixes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatically purchase cloud resources",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace GitHub Actions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delete failed workflows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major risk of relying entirely on AI-generated CI/CD pipelines without human review?",
        "options": [
          {
            "id": "a",
            "text": "Pipelines may contain incorrect configurations or security issues",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pipelines become faster",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Applications become more secure automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud costs decrease",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants AI to generate a deployment workflow for Kubernetes. Which information should be included in the prompt?",
        "options": [
          {
            "id": "a",
            "text": "Cluster details, deployment requirements, and application information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Favorite programming language only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Developer names only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating system wallpaper",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of AI-assisted pipeline generation in modern DevOps workflows?",
        "options": [
          {
            "id": "a",
            "text": "Replace all DevOps engineers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduce repetitive work and accelerate pipeline development",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Eliminate the need for testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove version control systems",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 1,
    "topic_title": "Terraform — Modules, State, Workspaces, IaC",
    "quiz_title": "Terraform — Modules, State, Workspaces, IaC — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "Your company wants to provision AWS infrastructure using code instead of manually creating resources through the AWS Console. Which concept does Terraform primarily support?",
        "options": [
          {
            "id": "a",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Infrastructure as Code (IaC)",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Continuous Integration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Virtualization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer writes Terraform code to create EC2 instances, VPCs, and S3 buckets. What is the main benefit of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Infrastructure can be provisioned consistently and repeatedly",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No cloud account is required",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Resources are created manually",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Applications run faster automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before applying infrastructure changes, a Terraform engineer wants to preview what resources will be created, modified, or deleted. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "terraform apply",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "terraform destroy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "terraform plan",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "terraform init",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have downloaded a Terraform project from GitHub and need to initialize providers and modules before using it. Which command should you run first?",
        "options": [
          {
            "id": "a",
            "text": "terraform apply",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "terraform plan",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "terraform init",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "terraform validate",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to reuse the same VPC configuration across multiple projects without duplicating code. Which Terraform feature is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "State Files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Workspaces",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Modules",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Variables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Terraform Module is best described as:",
        "options": [
          {
            "id": "a",
            "text": "A reusable collection of Terraform resources and configurations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A deployment environment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud provider account",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Terraform needs to track the infrastructure it has created so that future updates can be managed correctly. Which file is responsible for storing this information?",
        "options": [
          {
            "id": "a",
            "text": "terraform.tfvars",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "terraform.lock.hcl",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "terraform.tfstate",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "main.tf",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is the Terraform State file important?",
        "options": [
          {
            "id": "a",
            "text": "It stores application source code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It tracks infrastructure resources managed by Terraform",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It contains Docker images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It stores Kubernetes Pods",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs separate environments for development, testing, and production while using the same Terraform codebase. Which Terraform feature is commonly used for this?",
        "options": [
          {
            "id": "a",
            "text": "Providers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Modules",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Workspaces",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "State Locking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses Terraform Workspaces named 'dev', 'test', and 'prod'. What is the primary benefit of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Managing multiple environments using the same Terraform configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Creating multiple AWS accounts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replacing state files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Eliminating the need for modules",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 2,
    "topic_title": "Ansible — Configuration Management, Provisioning",
    "quiz_title": "Ansible — Configuration Management, Provisioning — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A company manages 50 Linux servers and wants to install software on all of them using a single command instead of logging into each server individually. Which tool is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Docker",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Kubernetes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ansible",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of Ansible in a DevOps environment?",
        "options": [
          {
            "id": "a",
            "text": "Container orchestration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Configuration management and automation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Source code management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to automate server setup tasks such as installing packages, creating users, and configuring services. Which Ansible feature is commonly used for this?",
        "options": [
          {
            "id": "a",
            "text": "Playbooks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pods",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Ansible Playbooks are typically written in which format?",
        "options": [
          {
            "id": "a",
            "text": "JSON",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "XML",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "YAML",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "CSV",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to view all servers managed by Ansible before running a playbook. Which file usually contains the list of managed hosts?",
        "options": [
          {
            "id": "a",
            "text": "docker-compose.yml",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "inventory file",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "terraform.tfstate",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Jenkinsfile",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Ansible architecture, what is the role of the Control Node?",
        "options": [
          {
            "id": "a",
            "text": "Runs playbooks and manages target servers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Stores Docker images",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Hosts applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creates Kubernetes clusters",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Ansible communicates with Linux servers primarily using which protocol?",
        "options": [
          {
            "id": "a",
            "text": "FTP",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "SSH",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "SMTP",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SNMP",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants every web server to have Nginx installed and running. Which Ansible capability helps ensure all servers maintain the desired configuration?",
        "options": [
          {
            "id": "a",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Configuration Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Infrastructure Provisioning in the context of Ansible?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring application logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating and configuring servers automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Managing source code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Building Docker images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to execute an Ansible playbook called 'webserver.yml'. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "ansible-run webserver.yml",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ansible-playbook webserver.yml",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "ansible start webserver.yml",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "ansible deploy webserver.yml",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your organization wants to install Apache on 20 servers simultaneously using Ansible. What is the biggest advantage of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Manual configuration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automation and consistency across servers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Higher hardware requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduced network connectivity",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Ansible is often called an 'agentless' tool. What does this mean?",
        "options": [
          {
            "id": "a",
            "text": "No software agent needs to be installed on managed servers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No inventory file is required",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "No SSH connection is needed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No automation is possible",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team needs to configure development, testing, and production servers differently while using the same playbook. Which Ansible feature can help organize servers into groups?",
        "options": [
          {
            "id": "a",
            "text": "Inventory Groups",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pods",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Secrets",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A newly provisioned server should automatically receive users, packages, firewall rules, and application configurations. Which DevOps practice is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Manual Administration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Configuration Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Source Control",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your company wants repeatable and reliable server configurations across hundreds of machines. Which statement best describes how Ansible helps achieve this goal?",
        "options": [
          {
            "id": "a",
            "text": "By manually configuring each server",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "By automating infrastructure provisioning and configuration management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "By replacing cloud providers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By eliminating the need for Linux",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 3,
    "topic_title": "DevSecOps — Vulnerability Scanning, Secrets Management",
    "quiz_title": "DevSecOps — Vulnerability Scanning, Secrets Management — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A development team wants to identify security vulnerabilities in their application before deploying it to production. Which DevSecOps practice helps achieve this goal?",
        "options": [
          {
            "id": "a",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Vulnerability Scanning",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Load Balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Version Control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of vulnerability scanning in a DevSecOps pipeline?",
        "options": [
          {
            "id": "a",
            "text": "Increase application performance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Detect known security weaknesses and risks",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deploy applications faster",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduce cloud costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer scans a Docker image before deployment and discovers several critical vulnerabilities in outdated packages. What should be done next?",
        "options": [
          {
            "id": "a",
            "text": "Deploy the image immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Update or patch the vulnerable components",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ignore the findings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delete the CI/CD pipeline",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of resource is commonly scanned for vulnerabilities in modern DevSecOps workflows?",
        "options": [
          {
            "id": "a",
            "text": "Docker Images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Source Code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operating Systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company wants security checks to run automatically whenever developers push code to GitHub. Where should vulnerability scanning ideally be integrated?",
        "options": [
          {
            "id": "a",
            "text": "Only in production",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Inside the CI/CD Pipeline",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "After a security incident",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only on developer laptops",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An application requires access to a database password. Which approach is considered the most secure in a DevSecOps environment?",
        "options": [
          {
            "id": "a",
            "text": "Store the password directly in source code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Share the password through email",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Store the password in a Secrets Management solution",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Save the password in a public GitHub repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of Secrets Management?",
        "options": [
          {
            "id": "a",
            "text": "Store application logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Manage sensitive information such as passwords, API keys, and tokens",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Monitor server performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploy containers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a secret that should be protected?",
        "options": [
          {
            "id": "a",
            "text": "Database Password",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "API Key",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Access Token",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A security audit finds AWS access keys hardcoded inside application code. Why is this considered a security risk?",
        "options": [
          {
            "id": "a",
            "text": "The application will run faster",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Sensitive credentials can be exposed to unauthorized users",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The code becomes easier to maintain",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It improves security",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the goal of DevSecOps?",
        "options": [
          {
            "id": "a",
            "text": "Add security as a final step before deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Integrate security practices throughout the software development lifecycle",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace DevOps with Security Teams",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Focus only on compliance documentation",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 4,
    "topic_title": "Vault, AWS Secrets Manager, Security Automation",
    "quiz_title": "Vault, AWS Secrets Manager, Security Automation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A company wants to securely store database passwords, API keys, and application secrets instead of hardcoding them in source code. Which category of tools is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring Tools",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets Management Tools",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Container Registries",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CI/CD Tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "HashiCorp Vault is primarily used for:",
        "options": [
          {
            "id": "a",
            "text": "Container orchestration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets management and secure credential storage",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Source code management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "AWS Secrets Manager is a managed AWS service designed to:",
        "options": [
          {
            "id": "a",
            "text": "Run EC2 instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Store and manage secrets securely",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Monitor applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer accidentally commits AWS access keys to a GitHub repository. Which security practice could have helped prevent this issue?",
        "options": [
          {
            "id": "a",
            "text": "Hardcoding credentials",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Manual Deployments",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Public Repositories",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a secret that should be stored in Vault or AWS Secrets Manager?",
        "options": [
          {
            "id": "a",
            "text": "Database Password",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "API Token",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "SSH Private Key",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A DevOps engineer wants applications to retrieve secrets securely at runtime instead of storing them in configuration files. Which approach is considered best practice?",
        "options": [
          {
            "id": "a",
            "text": "Store secrets in source code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Store secrets in README files",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Retrieve secrets from a Secrets Management solution",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Share secrets through email",
            "is_correct": false
          }
        ]
      },
      {
        "question": "One major advantage of AWS Secrets Manager is:",
        "options": [
          {
            "id": "a",
            "text": "Automatic secret rotation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic EC2 scaling",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Container orchestration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Git repository management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is secret rotation in the context of Secrets Management?",
        "options": [
          {
            "id": "a",
            "text": "Deleting secrets permanently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Regularly changing credentials automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Moving secrets between servers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypting Docker images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A security team wants to know who accessed a secret and when it was accessed. Which capability provided by Vault and AWS Secrets Manager helps with this?",
        "options": [
          {
            "id": "a",
            "text": "Audit Logging",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container Monitoring",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Load Balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Caching",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of Security Automation in a DevOps environment?",
        "options": [
          {
            "id": "a",
            "text": "Reduce manual security tasks and improve consistency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increase application downtime",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace all security teams",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove CI/CD pipelines",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company automatically scans source code and container images for vulnerabilities whenever code is pushed to GitHub. This is an example of:",
        "options": [
          {
            "id": "a",
            "text": "Security Automation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Auditing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Database Replication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can be automated in a DevSecOps pipeline?",
        "options": [
          {
            "id": "a",
            "text": "Vulnerability Scanning",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets Detection",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Compliance Checks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "Your organization wants to prevent developers from accidentally committing passwords and API keys to Git repositories. Which automated security practice can help?",
        "options": [
          {
            "id": "a",
            "text": "Secrets Scanning",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Testing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Application Logging",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Balancing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer integrates Vault with Kubernetes so that applications can securely retrieve credentials when they start. What is the main benefit of this setup?",
        "options": [
          {
            "id": "a",
            "text": "Eliminates the need for containers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Avoids hardcoded credentials and improves security",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increases application latency",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes access controls",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the combined role of Vault, AWS Secrets Manager, and Security Automation in modern DevSecOps practices?",
        "options": [
          {
            "id": "a",
            "text": "Securely manage secrets and automate security controls throughout the software lifecycle",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Replace cloud providers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminate the need for authentication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage only application performance",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 5,
    "topic_title": "AI-Assisted Infrastructure Generation",
    "quiz_title": "AI-Assisted Infrastructure Generation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A DevOps engineer wants ChatGPT to generate Terraform code for creating an AWS EC2 instance. What should be provided to the AI first?",
        "options": [
          {
            "id": "a",
            "text": "Clear infrastructure requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS billing information",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Laptop specifications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Company logo",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of using AI tools for infrastructure generation?",
        "options": [
          {
            "id": "a",
            "text": "Reduce manual coding effort",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Replace cloud providers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminate testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove security requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A cloud engineer asks an AI tool to generate a VPC with public and private subnets. Before deploying the generated code, what should be done?",
        "options": [
          {
            "id": "a",
            "text": "Deploy directly to production",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and validate the generated configuration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable security groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can AI assist with when working on cloud infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "Generating Terraform templates",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating CloudFormation scripts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Suggesting architecture improvements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "You want ChatGPT to generate Terraform code for an EC2 instance, security group, and S3 bucket. Which prompt is likely to produce the best result?",
        "options": [
          {
            "id": "a",
            "text": "Create AWS resources",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Terraform",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Generate Terraform code to create an EC2 instance, security group allowing SSH access, and an S3 bucket in AWS",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Cloud Setup",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI-generated Terraform script contains a configuration that exposes all ports to the internet. What should the engineer do?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and fix the security configuration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ignore the issue",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delete Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which skill helps engineers get more accurate infrastructure code from AI tools?",
        "options": [
          {
            "id": "a",
            "text": "Prompt Engineering",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Graphic Design",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Video Editing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database Administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps team uses AI to generate infrastructure templates but still performs manual reviews. Why is this considered a best practice?",
        "options": [
          {
            "id": "a",
            "text": "AI outputs may contain errors, security issues, or incorrect assumptions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AI cannot generate code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Terraform does not work with AI",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud providers do not support automation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major advantage of AI-assisted infrastructure generation for beginners?",
        "options": [
          {
            "id": "a",
            "text": "Helps learn infrastructure concepts faster through examples",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Eliminates the need to understand cloud services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Removes the need for testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Automatically guarantees secure infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to accelerate cloud deployments while maintaining engineering oversight. What is the most effective use of AI-assisted infrastructure generation?",
        "options": [
          {
            "id": "a",
            "text": "Generate infrastructure code, review it, test it, and then deploy",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy all AI-generated code directly to production",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace all DevOps engineers with AI",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Skip validation and testing",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 1,
    "topic_title": "Prometheus, Grafana",
    "quiz_title": "Prometheus, Grafana — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "Your production application is running slowly and the operations team wants to monitor CPU, memory, and disk usage of servers in real time. Which tool is primarily responsible for collecting and storing these metrics?",
        "options": [
          {
            "id": "a",
            "text": "Grafana",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Prometheus",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Jenkins",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to create visual dashboards showing application health, CPU utilization, and request latency. Which tool is best suited for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Prometheus",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Grafana",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Docker",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ansible",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a monitoring setup, what is the primary role of Prometheus?",
        "options": [
          {
            "id": "a",
            "text": "Visualize metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Store and collect metrics",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deploy applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage containers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team wants to monitor Kubernetes Pods and Nodes. Prometheus collects metrics from exporters and stores them. What does Grafana typically do with these metrics?",
        "options": [
          {
            "id": "a",
            "text": "Deletes them",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Visualizes them in dashboards",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deploys them",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypts them",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your web application becomes unavailable. Which Prometheus feature can automatically notify the operations team when predefined conditions are met?",
        "options": [
          {
            "id": "a",
            "text": "Dashboards",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Alerting Rules",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Workspaces",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to know whether a server's CPU usage exceeded 90% during the last hour. Which combination of tools is most commonly used?",
        "options": [
          {
            "id": "a",
            "text": "Prometheus for metrics and Grafana for visualization",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Jenkins and GitHub Actions",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Terraform and Ansible",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Docker and Kubernetes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application is exposing metrics at '/metrics'. What is the process called when Prometheus periodically collects these metrics?",
        "options": [
          {
            "id": "a",
            "text": "Pulling/Scraping",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pushing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to monitor the number of HTTP requests received by its application every minute. Which type of information is Prometheus designed to collect?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Source Code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Docker Images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Secrets",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your manager asks for a dashboard displaying CPU usage, memory consumption, disk utilization, and application response times on a single screen. Which Grafana feature should you use?",
        "options": [
          {
            "id": "a",
            "text": "Dashboard",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Playbook",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production server goes down at 2:00 AM. The DevOps team receives an automatic email notification. Which monitoring capability enabled this?",
        "options": [
          {
            "id": "a",
            "text": "Visualization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Alerting",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to monitor multiple Linux servers. Which component is commonly installed on servers to expose system metrics such as CPU, memory, and disk usage to Prometheus?",
        "options": [
          {
            "id": "a",
            "text": "Node Exporter",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Docker Hub",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Helm Chart",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "GitHub Runner",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer notices a spike in application latency on a Grafana dashboard. What should be the next logical step?",
        "options": [
          {
            "id": "a",
            "text": "Investigate the underlying metrics and system health",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the dashboard",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Restart Grafana immediately",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the spike",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which real-world use case best demonstrates the value of Prometheus and Grafana?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring application and infrastructure health",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Writing source code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating cloud accounts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your organization wants to track trends in application performance over time rather than only viewing current values. Why is Prometheus useful in this scenario?",
        "options": [
          {
            "id": "a",
            "text": "It stores historical metrics data",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It creates Docker images",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It manages CI/CD pipelines",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It provisions infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production-ready monitoring solution is being designed. Which statement best describes how Prometheus and Grafana work together?",
        "options": [
          {
            "id": "a",
            "text": "Prometheus collects and stores metrics, while Grafana visualizes and analyzes them",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Grafana collects metrics and Prometheus creates dashboards",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Both tools perform the same function",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Prometheus replaces Grafana completely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 2,
    "topic_title": "Metrics, Logs, Traces",
    "quiz_title": "Metrics, Logs, Traces — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A DevOps engineer wants to monitor CPU utilization of a production server over the last 24 hours. Which observability data type is most suitable for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Metrics",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Alerts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application suddenly starts throwing 'Database Connection Failed' errors. Which observability data type would provide detailed error messages to help investigate the issue?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Logs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Dashboards",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A user reports that a request is taking 10 seconds to complete. You need to identify which service in a microservices architecture is causing the delay. Which observability data type is most useful?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Logs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Alerts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a Metric?",
        "options": [
          {
            "id": "a",
            "text": "User login failed due to invalid password",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CPU usage is 85%",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "API request passed through 5 services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application stack trace",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a Log entry?",
        "options": [
          {
            "id": "a",
            "text": "Memory usage is 70%",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Request latency is 200ms",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ERROR: Unable to connect to database",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Service A called Service B",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes a Trace in a distributed application?",
        "options": [
          {
            "id": "a",
            "text": "A collection of system resource statistics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A record of events generated by applications",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The complete journey of a request across multiple services",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "A monitoring dashboard",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your monitoring dashboard shows that API response time has increased significantly. What should you check next to understand the root cause?",
        "options": [
          {
            "id": "a",
            "text": "Logs and Traces",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the dashboard",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Restart all servers immediately",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production application consists of multiple microservices. One service is causing slow responses, but it is unclear which one. Which observability component helps identify the exact service responsible?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Traces",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Logs Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps team wants to know how many requests per second their application is handling. Which observability data type provides this information most effectively?",
        "options": [
          {
            "id": "a",
            "text": "Logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Metrics",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Events",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Metrics, Logs, and Traces in modern observability?",
        "options": [
          {
            "id": "a",
            "text": "They provide different views of system health and work together for troubleshooting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Metrics replace Logs and Traces",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Logs are the only required observability data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Traces are used only for security",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 3,
    "topic_title": "Incident Response, AIOps",
    "quiz_title": "Incident Response, AIOps — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A production application suddenly becomes unavailable and customers are unable to access the service. What is the first step in a typical incident response process?",
        "options": [
          {
            "id": "a",
            "text": "Ignore the issue",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Identify and assess the incident",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the application",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploy a new feature",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Incident Response in a DevOps or SRE environment?",
        "options": [
          {
            "id": "a",
            "text": "Developing new features",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The process of detecting, responding to, and resolving service disruptions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating Docker images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing source code",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A monitoring system detects that a web server is down and automatically notifies the operations team. Which phase of incident response is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Detection and Alerting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Documentation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer receives an alert that CPU utilization on a production server has exceeded 95%. What should be done before taking corrective action?",
        "options": [
          {
            "id": "a",
            "text": "Investigate the root cause of the issue",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the server",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ignore the alert",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After resolving a major outage, the team conducts a meeting to analyze what happened and how similar incidents can be prevented. What is this activity called?",
        "options": [
          {
            "id": "a",
            "text": "Code Review",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Post-Incident Review",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Infrastructure Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deployment Planning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A database service crashes unexpectedly. The monitoring system automatically restarts the service without human intervention. This is an example of:",
        "options": [
          {
            "id": "a",
            "text": "Manual Remediation",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Auto-Remediation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deployment Rollback",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Capacity Planning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does AIOps stand for?",
        "options": [
          {
            "id": "a",
            "text": "Artificial Intelligence for Operations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automated Infrastructure Operations",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Application Integration Operations",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Advanced Internet Operations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "The primary goal of AIOps is to:",
        "options": [
          {
            "id": "a",
            "text": "Replace cloud infrastructure",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Use AI and machine learning to improve IT operations",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace monitoring tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Eliminate automation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company collects thousands of logs every minute. An AIOps platform analyzes the logs and identifies unusual patterns before an outage occurs. What capability is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Predictive Analysis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Version Control",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Balancing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AIOps system detects abnormal memory consumption and predicts a service failure before users are impacted. What is the main benefit of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Proactive Issue Detection",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Troubleshooting",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced Monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increased Downtime",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps team uses AI to analyze application logs and automatically suggest the most likely root cause of an incident. Which AIOps capability is being used?",
        "options": [
          {
            "id": "a",
            "text": "Root Cause Analysis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Version Control",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Infrastructure Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production alert is triggered because response times have increased significantly. An AIOps platform correlates metrics, logs, and traces to identify the problem. What is the main advantage of this process?",
        "options": [
          {
            "id": "a",
            "text": "Faster Incident Resolution",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "More Manual Work",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced Visibility",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increased Costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can be enhanced by AIOps?",
        "options": [
          {
            "id": "a",
            "text": "Incident Detection",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Root Cause Analysis",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Alert Correlation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company wants to reduce alert fatigue by automatically grouping related alerts into a single incident. Which AIOps capability helps achieve this?",
        "options": [
          {
            "id": "a",
            "text": "Alert Correlation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container Orchestration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Source Control",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Incident Response and AIOps?",
        "options": [
          {
            "id": "a",
            "text": "AIOps helps detect, analyze, and resolve incidents faster through automation and intelligence",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AIOps replaces Incident Response completely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Incident Response is only used when AIOps fails",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They are unrelated concepts",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 4,
    "topic_title": "AI-Powered Log Analysis",
    "quiz_title": "AI-Powered Log Analysis — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A production application generates thousands of log entries every minute. What is the primary benefit of using AI-powered log analysis instead of manually reviewing logs?",
        "options": [
          {
            "id": "a",
            "text": "Faster identification of issues and patterns",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increases server downtime",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Removes the need for monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deletes unnecessary logs automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to identify unusual application behavior from millions of log entries. Which AI capability is most useful for this task?",
        "options": [
          {
            "id": "a",
            "text": "Anomaly Detection",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Load Balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Version Control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI system analyzes logs and detects a sudden increase in 'Database Connection Timeout' errors. What is the main advantage of this detection?",
        "options": [
          {
            "id": "a",
            "text": "Early identification of potential incidents",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic deployment of applications",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creation of new databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduction of log storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company receives thousands of alerts daily. AI-powered log analysis groups similar errors together to reduce alert fatigue. What capability is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Log Correlation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container Orchestration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Infrastructure Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Source Control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI tool reviews application logs and suggests that a memory leak is causing performance degradation. What type of analysis is the AI performing?",
        "options": [
          {
            "id": "a",
            "text": "Root Cause Analysis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Network Provisioning",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Code Compilation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of log entry would most likely indicate an application error?",
        "options": [
          {
            "id": "a",
            "text": "INFO: User logged in successfully",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "INFO: Service started",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ERROR: Database connection failed",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "INFO: Configuration loaded",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer uses an AI assistant to analyze logs after a production outage. What is the most likely outcome?",
        "options": [
          {
            "id": "a",
            "text": "Faster troubleshooting and issue resolution",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic cloud migration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Database creation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application redesign",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI-powered monitoring platform detects a recurring pattern of errors every day at midnight. What valuable insight can this provide?",
        "options": [
          {
            "id": "a",
            "text": "A scheduled process may be causing the issue",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The application is secure",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The logs can be deleted",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The server no longer requires monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major advantage of combining AI-powered log analysis with monitoring tools like Prometheus and Grafana?",
        "options": [
          {
            "id": "a",
            "text": "Better visibility into system health and faster incident investigation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Eliminates the need for logs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replaces cloud infrastructure",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes the need for DevOps engineers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes AI-powered log analysis in modern DevOps environments?",
        "options": [
          {
            "id": "a",
            "text": "It uses AI to analyze large volumes of logs, detect anomalies, and accelerate troubleshooting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It replaces application logging completely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It only works with Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It is used only for storing logs",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 5,
    "topic_title": "SRE — SLIs, SLOs, Error Budgets",
    "quiz_title": "SRE — SLIs, SLOs, Error Budgets — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "What does SRE stand for in modern cloud and DevOps environments?",
        "options": [
          {
            "id": "a",
            "text": "System Reliability Engineering",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Site Reliability Engineering",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Software Resource Engineering",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security Reliability Engineering",
            "is_correct": false
          }
        ]
      },
      {
        "question": "The primary goal of Site Reliability Engineering (SRE) is to:",
        "options": [
          {
            "id": "a",
            "text": "Deploy applications manually",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Improve system reliability, scalability, and performance",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace DevOps teams",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage source code repositories",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to measure the percentage of successful API requests served by its application. Which SRE concept is being used?",
        "options": [
          {
            "id": "a",
            "text": "Error Budget",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "SLI",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deployment Strategy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CI/CD",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does SLI stand for?",
        "options": [
          {
            "id": "a",
            "text": "Service Level Indicator",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "System Level Indicator",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Service Load Index",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "System Load Indicator",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of an SLI?",
        "options": [
          {
            "id": "a",
            "text": "API availability percentage",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Number of developers in the team",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cloud provider name",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application source code size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An organization defines that its application should be available 99.9% of the time each month. Which SRE concept does this represent?",
        "options": [
          {
            "id": "a",
            "text": "SLI",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "SLO",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Error Log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Incident",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does SLO stand for?",
        "options": [
          {
            "id": "a",
            "text": "Service Level Objective",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "System Level Objective",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Service Load Objective",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "System Load Operation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes an SLO?",
        "options": [
          {
            "id": "a",
            "text": "A measurable target for service reliability or performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A log generated by an application",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A monitoring dashboard",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A deployment script",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company defines an SLO of 99.95% uptime. What is the purpose of setting such a target?",
        "options": [
          {
            "id": "a",
            "text": "To establish reliability expectations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase cloud costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To replace monitoring tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate incidents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Error Budget in SRE?",
        "options": [
          {
            "id": "a",
            "text": "The budget allocated for cloud services",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The amount of acceptable downtime or failure within an SLO target",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The cost of monitoring tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The number of incidents reported",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A service has an SLO of 99.9% uptime. Which statement about its Error Budget is correct?",
        "options": [
          {
            "id": "a",
            "text": "0.1% downtime is acceptable within the defined period",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No downtime is allowed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "10% downtime is acceptable",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The service does not require monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development team has exhausted its Error Budget due to multiple production incidents. What is the most appropriate action according to SRE practices?",
        "options": [
          {
            "id": "a",
            "text": "Focus on reliability improvements before releasing more features",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy more features immediately",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disable monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the incidents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which metric would be commonly used as an SLI for a web application?",
        "options": [
          {
            "id": "a",
            "text": "Request Latency",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Availability",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Error Rate",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A payment application has an SLO stating that 95% of transactions must complete within 2 seconds. Which aspect of reliability is being measured?",
        "options": [
          {
            "id": "a",
            "text": "Performance and Latency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Infrastructure Cost",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deployment Frequency",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Source Code Quality",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between SLIs, SLOs, and Error Budgets?",
        "options": [
          {
            "id": "a",
            "text": "SLIs measure performance, SLOs define targets, and Error Budgets define acceptable failure levels",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "SLIs replace SLOs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Error Budgets eliminate incidents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All three concepts are unrelated",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 6,
    "topic_title": "Cost Optimization, Production Readiness Reviews",
    "quiz_title": "Cost Optimization, Production Readiness Reviews — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A company notices that several EC2 instances are running continuously even though they are only needed during business hours. Which cost optimization action would be most effective?",
        "options": [
          {
            "id": "a",
            "text": "Increase instance size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Schedule instances to stop when not in use",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create additional instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of cloud cost optimization?",
        "options": [
          {
            "id": "a",
            "text": "Increase cloud spending",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduce costs while maintaining performance and reliability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Eliminate monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replace automation tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development environment has been idle for several weeks but is still generating cloud costs. What should a DevOps engineer do?",
        "options": [
          {
            "id": "a",
            "text": "Scale it up",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and remove or shut down unused resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ignore it",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploy more applications",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which cloud resource is commonly reviewed first when looking for opportunities to reduce infrastructure costs?",
        "options": [
          {
            "id": "a",
            "text": "Compute Instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Unused Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Idle Load Balancers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company is paying for a large EC2 instance, but monitoring shows that CPU utilization rarely exceeds 15%. What cost optimization recommendation is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Increase the instance size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Right-size the instance to a smaller type",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create duplicate instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable CloudWatch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before deploying a new application to production, the engineering team performs a review to ensure scalability, security, monitoring, and reliability requirements are met. What is this process called?",
        "options": [
          {
            "id": "a",
            "text": "Code Commit",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Production Readiness Review",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Cost Allocation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Build",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following areas is commonly evaluated during a Production Readiness Review?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring and Alerting",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Security",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Backup and Recovery",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A new application is ready for deployment, but no monitoring or alerting has been configured. According to Production Readiness best practices, what should happen?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Complete monitoring and alerting setup before production release",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Disable logging permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore observability requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is a Production Readiness Review important before launching a critical application?",
        "options": [
          {
            "id": "a",
            "text": "It helps identify risks and operational gaps before users are impacted",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It guarantees zero downtime forever",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates the need for documentation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best combines the goals of Cost Optimization and Production Readiness Reviews?",
        "options": [
          {
            "id": "a",
            "text": "Build systems that are reliable, secure, observable, and cost-efficient before going live",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Reduce all cloud costs regardless of performance impact",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deploy applications without validation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Focus only on infrastructure costs",
            "is_correct": false
          }
        ]
      }
    ]
  }
]
$catalog$::jsonb) AS x(
      course_code text,
      module_number int,
      topic_sort int,
      topic_title text,
      quiz_title text,
      pass_score int,
      max_attempts int,
      time_limit_min int,
      questions jsonb
    )
  LOOP
    SELECT id INTO v_course_id
    FROM public.courses
    WHERE upper(code) = upper(entry.course_code)
    LIMIT 1;

    IF v_course_id IS NULL THEN
      RAISE NOTICE 'Course % not found — skipping quiz %', entry.course_code, entry.quiz_title;
      CONTINUE;
    END IF;

    SELECT id INTO v_module_id
    FROM public.program_modules
    WHERE course_id = v_course_id AND module_number = entry.module_number
    LIMIT 1;

    IF v_module_id IS NULL THEN
      RAISE NOTICE 'Module % for % not found — run seed_lms_curriculum() first', entry.module_number, entry.course_code;
      CONTINUE;
    END IF;

    IF entry.topic_title IS NOT NULL THEN
      UPDATE public.module_topics
      SET title = entry.topic_title, is_published = true
      WHERE module_id = v_module_id AND sort_order = entry.topic_sort;
    END IF;

    SELECT id INTO v_topic_id
    FROM public.module_topics
    WHERE module_id = v_module_id AND sort_order = entry.topic_sort
    LIMIT 1;

    IF v_topic_id IS NULL THEN
      RAISE NOTICE 'Topic sort % not found for % M% — skipping', entry.topic_sort, entry.course_code, entry.module_number;
      CONTINUE;
    END IF;

    INSERT INTO public.quizzes (course_id, topic_id, title, pass_score, max_attempts, time_limit_min, is_published)
    SELECT v_course_id, v_topic_id, entry.quiz_title, entry.pass_score, entry.max_attempts, entry.time_limit_min, true
    WHERE NOT EXISTS (SELECT 1 FROM public.quizzes existing_quiz WHERE existing_quiz.topic_id = v_topic_id);

    SELECT id INTO v_quiz_id FROM public.quizzes WHERE topic_id = v_topic_id LIMIT 1;

    UPDATE public.quizzes
    SET
      title = entry.quiz_title,
      pass_score = entry.pass_score,
      max_attempts = entry.max_attempts,
      time_limit_min = entry.time_limit_min
    WHERE id = v_quiz_id;

    DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

    v_sort := 0;
    FOR v_question IN SELECT * FROM jsonb_to_recordset(entry.questions) AS r(question text, options jsonb)
    LOOP
      v_sort := v_sort + 1;
      INSERT INTO public.quiz_questions (quiz_id, question_text, options, sort_order)
      VALUES (v_quiz_id, v_question.question, v_question.options, v_sort);
    END LOOP;

    RAISE NOTICE 'Seeded quiz: % (% questions)', entry.quiz_title, v_sort;
  END LOOP;
END;
$$;

SELECT public.seed_topic_quizzes();
