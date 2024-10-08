// ON SCROLL NAVIGATION STYLING SCRIPT STARTS HERE
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
});

// Loading animation for the page
var loaderImg = document.querySelector(".img");
var loader = document.querySelector(".loader");

window.addEventListener('load', hides);

function hides() {
  loader.classList.add("hide");
  loaderImg.classList.add("ImgNone");
}

// NAVIGATION MENU TOGGLE BUTTON SCRIPT STARTS HERE
const Menu = document.querySelector(".nav__navigation");
const menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("menu-active");
  Menu.classList.toggle("active");
});

const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    // Scrolling down, hide the navigation
    nav.classList.add('hidden');
    nav.classList.remove('visible');

    // Close the menu if open
    if (Menu.classList.contains("active")) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
    }
  } else {
    // Scrolling up, show the navigation and close the menu
    nav.classList.add('visible');
    nav.classList.remove('hidden');

    if (Menu.classList.contains("active")) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
    }
  }
  lastScrollTop = currentScrollTop;
});

// Close menu when clicking outside of it
document.addEventListener('click', (event) => {
  const isMenuOpen = Menu.classList.contains('active');
  const isClickInsideMenu = Menu.contains(event.target);
  const isClickInsideButton = menuBtn.contains(event.target);

  if (isMenuOpen && !isClickInsideMenu && !isClickInsideButton) {
    menuBtn.classList.remove("menu-active");
    Menu.classList.remove("active");
  }
});

// BLOG SECTION CAROUSEL SCRIPT STARTS HERE
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;

    // Calculate the new scroll position
    const newScrollLeft = startScrollLeft - (e.pageX - startX);

    // Check if the new scroll position exceeds 
    // the carousel boundaries
    if (newScrollLeft <= 0 || newScrollLeft >=
      carousel.scrollWidth - carousel.offsetWidth) {

      // If so, prevent further dragging
      isDragging = false;
      return;
    }

    // Otherwise, update the scroll position of the carousel
    carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {

    // Return if window is smaller than 800
    if (window.innerWidth < 800) return;

    // Calculate the total width of all cards
    const totalCardWidth = carousel.scrollWidth;

    // Calculate the maximum scroll position
    const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

    // If the carousel is at the end, stop autoplay
    if (carousel.scrollLeft >= maxScrollLeft) return;

    // Autoplay the carousel after every 2500ms
    timeoutId = setTimeout(() =>
      carousel.scrollLeft += firstCardWidth, 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () =>
    clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Add event listeners for the arrow buttons to 
  // scroll the carousel left and right
  arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ?
        -firstCardWidth : firstCardWidth;
    });
  });
});


// BLOG SECTION BLOG POPUP STARTS HERE
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = "block"; // Ensure it's visible
  setTimeout(() => {
    popup.classList.add("show"); // Trigger animation
  }, 10); // Slight delay to ensure transition works
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.remove("show"); // Remove animation class

  // Use a small timeout to hide the popup after the animation ends
  setTimeout(() => {
    popup.style.display = "none";
  }, 300); // Matches the transition duration
}




// Quiz Questions and Answers
const questions = [
  {
    question: "What does Article 21 protect?",
    options: ["Right to Life and Liberty", "Right to Property", "Right to Vote", "Right to Education"],
    correctAnswer: 0
    },
  {
    question: "What is required to deprive someone of their right to life?",
    options: ["Government Order", "Legal Procedure", "Police Action", "None of the above"],
    correctAnswer: 1
    },
  {
    question: "Does Article 21 protect against arbitrary actions?",
    options: ["Yes", "No", "Only in Some Cases", "Not Applicable"],
    correctAnswer: 0
    },
  {
    question: "Which of the following is NOT covered under Article 21?",
    options: ["Right to Dignity", "Right to Liberty", "Right to Property", "Right to Life"],
    correctAnswer: 2
    },
  {
    question: "What is the scope of Article 21?",
    options: ["Protection against state actions", "Protection against foreign entities", "Only for citizens", "None of the above"],
    correctAnswer: 0
    }
];

let currentQuestion = 0;
let score = 0;

function checkAnswer(element, isCorrect) {
  const options = document.querySelectorAll('.quiz-options div');
  options.forEach(option => option.style.pointerEvents = 'none'); // Disable all options after selection

  if (isCorrect) {
    element.style.backgroundColor = 'green';
    score++;
  } else {
    element.style.backgroundColor = 'red';
  }

  setTimeout(nextQuestion, 1000); // Move to the next question after a short delay
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion(currentQuestion);
  } else {
    showFinalScore();
  }
}

function loadQuestion(index) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.querySelector('.quiz-question p').textContent = questions[index].question;

  const options = quizContainer.querySelectorAll('.quiz-options div');
  options.forEach((option, i) => {
    option.textContent = questions[index].options[i];
    option.style.backgroundColor = ''; // Reset background color
    option.style.pointerEvents = 'auto'; // Re-enable options
  });
}

function showFinalScore() {
  document.getElementById('quiz-score').textContent = `Your score: ${score} out of ${questions.length}`;
}

window.onload = function() {
  loadQuestion(currentQuestion);
};






document.addEventListener('DOMContentLoaded', function() {
  const quizQuestions = [
    {
      question: "What is the Preamble of the Indian Constitution?",
      options: ["A statement of values", "A law", "A guideline", "A directive"],
      answer: 0,
      explanation: "The Preamble of the Indian Constitution is a brief introductory statement that outlines the guiding values and principles of the Constitution."
    },
    {
      question: "Which article provides the right to equality?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      answer: 0,
      explanation: "Article 14 of the Indian Constitution provides the right to equality, ensuring equal protection under the law and prohibiting discrimination."
    },
    {
      question: "Which article provides the right to freedom of speech and expression?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      answer: 1,
      explanation: "Article 19 of the Indian Constitution grants the right to freedom of speech and expression, allowing individuals to express their views freely."
    },
    {
      question: "Which article provides the right to life and personal liberty?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      answer: 2,
      explanation: "Article 21 guarantees the right to life and personal liberty, ensuring that no person shall be deprived of their life or liberty except according to a procedure established by law."
    },
    {
      question: "Which article is known as the ‘Heart and Soul of the Constitution’?",
      options: ["Article 19", "Article 32", "Article 21", "Article 14"],
      answer: 1,
      explanation: "Article 32 is known as the 'Heart and Soul of the Constitution' because it allows citizens to move the Supreme Court to seek justice when they believe their rights are violated."
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizQuestionElement = document.getElementById('quiz-question');
  const quizOptionsElement = document.getElementById('quiz-options');
  const quizNextButton = document.getElementById('quiz-next-button');
  const quizResultElement = document.getElementById('quiz-result');
  const explanationContainer = document.createElement('div'); // Container to hold explanations
  document.querySelector('.quiz-popup-content').appendChild(explanationContainer);

  function loadQuizQuestion() {
    quizResultElement.textContent = '';
    quizNextButton.style.display = 'none';

    const currentQuestion = quizQuestions[currentQuestionIndex];
    quizQuestionElement.textContent = currentQuestion.question;
    quizOptionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('div');
      button.textContent = option;
      button.classList.add('quiz-option-button');
      button.addEventListener('click', () => checkAnswer(index));
      quizOptionsElement.appendChild(button);
    });
  }

  function checkAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const buttons = document.querySelectorAll('.quiz-option-button');
    if (selectedIndex === currentQuestion.answer) {
      buttons[selectedIndex].classList.add('quiz-option-correct');
      score++;
      addExplanation(currentQuestion.explanation, true);
    } else {
      buttons[selectedIndex].classList.add('quiz-option-incorrect');
      buttons[currentQuestion.answer].classList.add('quiz-option-correct');
      addExplanation(currentQuestion.explanation, false);
    }

    quizNextButton.style.display = 'block';
    quizNextButton.onclick = loadNextQuestion;
  }

  function addExplanation(explanation, isCorrect) {
    const explanationDiv = document.createElement('div');
    explanationDiv.style.marginTop = '20px';
    
    const explanationHeading = document.createElement('h3');
    explanationHeading.textContent = `Question ${currentQuestionIndex + 1} Explanation:`;
    explanationHeading.style.color = isCorrect ? '#4caf50' : '#f44336'; // Green for correct, Red for incorrect

    const explanationText = document.createElement('p');
    explanationText.textContent = explanation;

    explanationDiv.appendChild(explanationHeading);
    explanationDiv.appendChild(explanationText);

    explanationContainer.appendChild(explanationDiv);
  }

  function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      loadQuizQuestion();
    } else {
      showQuizResult();
    }
  }

  function showQuizResult() {
    quizQuestionElement.textContent = '';
    quizOptionsElement.innerHTML = '';
    quizNextButton.style.display = 'none';
    quizResultElement.textContent = `Quiz Completed! Your score: ${score} / ${quizQuestions.length}`;
  }

  loadQuizQuestion();
});

// ---------<<<<<<<>>>>>>-----------
// MEMORY PAIR GAME SECTION CODE

const memoryPairs = [
  { question: "What is the Preamble?", answer: "Introduction to the Constitution" },
  { question: "Who is the Father of the Indian Constitution?", answer: "Dr. B.R. Ambedkar" },
  { question: "When was the Constitution adopted?", answer: "26 January 1950" },
  { question: "First President of India?", answer: "Dr. Rajendra Prasad" },
  { question: "India Independence Date?", answer: "15 August 1947" },
  { question: "National Emblem of India?", answer: "Lion Capital of Ashoka" }
];

let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];

function shuffleMemoryCards() {
  shuffledCards = memoryPairs.flatMap(pair => [
    { type: 'question', content: pair.question },
    { type: 'answer', content: pair.answer }
    ]).sort(() => 0.5 - Math.random());
}

function loadMemoryGame() {
  shuffleMemoryCards();
  const grid = document.getElementById('memory-grid');
  grid.innerHTML = shuffledCards.map((card, index) => `
        <div class="memory-card" onclick="flipCard(${index})" data-type="${card.type}" data-content="${card.content}">
            <div class="card-inner">
                <div class="card-front">${card.content}</div>
                <div class="card-back">🧐</div>
            </div>
        </div>
    `).join('');
}

function flipCard(index) {
  const cards = document.querySelectorAll('.memory-card');
  const selectedCard = cards[index];

  // Only allow flipping if less than 2 cards are flipped and the card isn't already matched or flipped
  if (!selectedCard.classList.contains('flipped') && !selectedCard.classList.contains('matched') && flippedCards.length < 2) {
    selectedCard.classList.add('flipped');
    flippedCards.push(selectedCard);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = (
    (card1.getAttribute('data-type') === 'question' && card2.getAttribute('data-type') === 'answer' && card2.getAttribute('data-content') === getAnswer(card1.getAttribute('data-content'))) ||
    (card2.getAttribute('data-type') === 'question' && card1.getAttribute('data-type') === 'answer' && card1.getAttribute('data-content') === getAnswer(card2.getAttribute('data-content')))
  );

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    card1.querySelector('.card-front').style.backgroundColor = '#27ae60'; // Green color for matched cards
    card2.querySelector('.card-front').style.backgroundColor = '#27ae60'; // Green color for matched cards
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000);
  }

  flippedCards = [];
}

function getAnswer(question) {
  const pair = memoryPairs.find(p => p.question === question || p.answer === question);
  return pair ? pair.answer : null;
}

// Call this function when the popup is opened
loadMemoryGame();


// ---------<<<<<<<>>>>>>-----------
// TRAVIA CHALLENGE GAME SECTION CODE

document.addEventListener('DOMContentLoaded', function() {
  const matchPairContainer = document.getElementById('match-pair-container');
  const tryAgainMessage = document.getElementById('try-again-message');
  const explanationContainer = document.getElementById('explanation-container'); // New container for explanations

  let matchedPairs = 0; // Track matched pairs

  const draggableItems = [
    { text: "Equality before law for everyone", article: "14", explanation: "Article 14 ensures equality before the law and equal protection of the laws within India." },
    { text: "Freedom of speech and expression", article: "19", explanation: "Article 19 guarantees freedom of speech and expression, allowing citizens to express themselves freely." },
    { text: "Right to life and personal liberty", article: "21", explanation: "Article 21 protects the right to life and personal liberty, ensuring that no person is deprived of life or liberty except according to the procedure established by law." },
    { text: "Right to constitutional remedies", article: "32", explanation: "Article 32 allows individuals to approach the Supreme Court to seek enforcement of fundamental rights." }
  ];

  const droppableItems = [
    { text: "Article 14", article: "14" },
    { text: "Article 19", article: "19" },
    { text: "Article 21", article: "21" },
    { text: "Article 32", article: "32" }
  ];

  // Shuffle both draggable and droppable items
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const shuffledDraggableItems = shuffleArray(draggableItems);
  const shuffledDroppableItems = shuffleArray(droppableItems);

  const draggableColumn = document.createElement('div');
  draggableColumn.classList.add('match-pair-column');

  shuffledDraggableItems.forEach(item => {
    const draggableDiv = document.createElement('div');
    draggableDiv.classList.add('draggable-item-match-pair');
    draggableDiv.setAttribute('draggable', 'true');
    draggableDiv.setAttribute('data-article', item.article);
    draggableDiv.textContent = item.text;
    draggableColumn.appendChild(draggableDiv);
  });

  const droppableColumn = document.createElement('div');
  droppableColumn.classList.add('match-pair-column');

  shuffledDroppableItems.forEach(item => {
    const droppableDiv = document.createElement('div');
    droppableDiv.classList.add('droppable-item-match-pair');
    droppableDiv.setAttribute('data-article', item.article);
    droppableDiv.textContent = item.text;
    droppableColumn.appendChild(droppableDiv);
  });

  matchPairContainer.appendChild(draggableColumn);
  matchPairContainer.appendChild(droppableColumn);

  // Add event listeners for dragging and dropping
  const draggableElements = document.querySelectorAll('.draggable-item-match-pair');
  const droppableElements = document.querySelectorAll('.droppable-item-match-pair');

  draggableElements.forEach(item => {
    item.addEventListener('dragstart', dragStartMatchPair);
  });

  droppableElements.forEach(item => {
    item.addEventListener('dragover', dragOverMatchPair);
    item.addEventListener('drop', dropMatchPair);
  });

  function dragStartMatchPair(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.article);
  }

  function dragOverMatchPair(e) {
    e.preventDefault();
  }

  function dropMatchPair(e) {
    e.preventDefault();
    const draggedArticle = e.dataTransfer.getData('text/plain');
    const targetArticle = e.target.dataset.article;

    if (draggedArticle === targetArticle) {
      e.target.classList.add('matched-item-match-pair');
      const draggedElement = document.querySelector(`.draggable-item-match-pair[data-article="${draggedArticle}"]`);
      draggedElement.classList.add('matched-item-match-pair');
      draggedElement.setAttribute('draggable', 'false'); // Disable dragging after match
      // Keep the text same on droppable item
      // Change the background color instead
      e.target.classList.add('correct-match-background');
      draggedElement.classList.add('correct-match-background');
      matchedPairs++; // Increment matched pairs count

      tryAgainMessage.style.display = 'none'; // Hide the try again message

      // Show explanation for matched article
      const matchedItem = draggableItems.find(item => item.article === draggedArticle);
      if (matchedItem) {
        const explanationDiv = document.createElement('div');
        explanationDiv.innerHTML = `Matched Article <strong>${targetArticle}</strong>: ${matchedItem.explanation}`;
        explanationDiv.classList.add('article-explanation');
        explanationContainer.appendChild(explanationDiv); // Append explanation to the container
      }

      // Check if all pairs are matched
      if (matchedPairs === draggableItems.length) {
        tryAgainMessage.textContent = "Yahoo! All pairs matched correctly!";
        tryAgainMessage.style.display = 'block';
        tryAgainMessage.style.color = 'green'; // Show success message
      }

    } else {
      tryAgainMessage.textContent = "Wrong pair! Try again.";
      tryAgainMessage.style.display = 'block'; // Show the try again message
      setTimeout(() => {
        tryAgainMessage.style.display = 'none'; // Hide after 2 seconds
      }, 2000);
    }
  }
});


// -------<<<<<<<>>>>>>----------
// FAQ'S SECTION CODE STARTS HERE

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
    const answer = item.querySelector('.faq-answer');
    if (item.classList.contains('active')) {
      answer.style.display = 'block';
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = 0;
      answer.style.display = 'none';
    }
  });
});
