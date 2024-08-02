document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login');
    const usernameInput = document.getElementById('username');
    const postForm = document.getElementById('form');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts-container');
    const loginSection = document.getElementById('login-form');
    const postSection = document.getElementById('post-form');
    const logoutButton = document.getElementById('logout');
    let currentUser = null;
    const userVotes = {};

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentUser = usernameInput.value.trim();
        if (currentUser) {
            loginSection.classList.add('hidden');
            postSection.classList.remove('hidden');
            logoutButton.classList.remove('hidden');
        }
    });

    logoutButton.addEventListener('click', function() {
        currentUser = null;
        loginSection.classList.remove('hidden');
        postSection.classList.add('hidden');
        logoutButton.classList.add('hidden');
        usernameInput.value = '';
    });

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const content = postContent.value.trim();
        if (content) {
            addPost(content, currentUser);
            postContent.value = '';
        }
    });

    function addPost(content, user) {
        const postId = `post-${Date.now()}`;
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.dataset.postId = postId;

        const metaDiv = document.createElement('div');
        metaDiv.classList.add('meta');
        metaDiv.textContent = `Posted by ${user}`;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.textContent = content;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const upvoteButton = document.createElement('button');
        upvoteButton.classList.add('vote');
        upvoteButton.textContent = 'Upvote';
        upvoteButton.addEventListener('click', function() {
            handleVote(postId, 1, upvoteButton);
        });

        const downvoteButton = document.createElement('button');
        downvoteButton.classList.add('vote');
        downvoteButton.textContent = 'Downvote';
        downvoteButton.addEventListener('click', function() {
            handleVote(postId, -1, downvoteButton);
        });

        const replyButton = document.createElement('button');
        replyButton.classList.add('reply');
        replyButton.textContent = 'Reply';
        replyButton.addEventListener('click', function() {
            handleReply(postDiv, user);
        });

        actionsDiv.appendChild(upvoteButton);
        actionsDiv.appendChild(downvoteButton);
        actionsDiv.appendChild(replyButton);

        postDiv.appendChild(metaDiv);
        postDiv.appendChild(contentDiv);
        postDiv.appendChild(actionsDiv);

        postsContainer.appendChild(postDiv);
    }

    function handleVote(postId, value, button) {
        if (!currentUser) return;

        if (!userVotes[currentUser]) {
            userVotes[currentUser] = {};
        }

        if (!userVotes[currentUser][postId]) {
            userVotes[currentUser][postId] = 0;
        }

        if (userVotes[currentUser][postId] !== value) {
            let voteCount = button.parentNode.querySelector('.vote-count');
            if (!voteCount) {
                voteCount = document.createElement('span');
                voteCount.classList.add('vote-count');
                voteCount.textContent = '0';
                button.parentNode.appendChild(voteCount);
            }
            let count = parseInt(voteCount.textContent, 10) || 0;
            count += value - userVotes[currentUser][postId];
            voteCount.textContent = count;
            userVotes[currentUser][postId] = value;
        }
    }

    function handleReply(postDiv, user) {
        const replyForm = document.createElement('form');
        replyForm.classList.add('reply-form');

        const replyInput = document.createElement('textarea');
        replyInput.placeholder = 'Write your reply here...';
        replyInput.required = true;

        const replyButton = document.createElement('button');
        replyButton.type = 'submit';
        replyButton.textContent = 'Reply';

        replyForm.appendChild(replyInput);
        replyForm.appendChild(replyButton);

        postDiv.appendChild(replyForm);

        replyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const content = replyInput.value.trim();
            if (content) {
                addReply(postDiv, content, user);
                replyForm.remove();
            }
        });
    }

    function addReply(postDiv, content, user) {
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('reply');

        const metaDiv = document.createElement('div');
        metaDiv.classList.add('meta');
        metaDiv.textContent = `Replied by ${user}`;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.textContent = content;

        replyDiv.appendChild(metaDiv);
        replyDiv.appendChild(contentDiv);

        postDiv.appendChild(replyDiv);
    }
});
