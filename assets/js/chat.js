(function () {
    const chatWindow = document.getElementById('chat-window');
    const messageForm = document.getElementById('message-form');
    const senderSelect = document.getElementById('sender');
    const messageInput = document.getElementById('message');
    const timestampInput = document.getElementById('timestamp');
    const statusSelect = document.getElementById('status');
    const addDividerBtn = document.getElementById('add-divider');
    const resetChatBtn = document.getElementById('reset-chat');
    const loadSampleBtn = document.getElementById('load-sample');
    const phoneClock = document.getElementById('phone-clock');

    const to12Hour = (date) => {
        const options = { hour: 'numeric', minute: '2-digit' };
        return new Intl.DateTimeFormat(undefined, options).format(date);
    };

    const parseTimeInput = (value) => {
        if (!value) {
            return to12Hour(new Date());
        }

        const [hours, minutes] = value.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return to12Hour(date);
    };

    const createBubble = ({ sender, text, timestamp, status }) => {
        const bubble = document.createElement('div');
        bubble.className = `message ${sender === 'a' ? 'outgoing' : 'incoming'}`;

        const textEl = document.createElement('div');
        textEl.className = 'message-text';
        textEl.textContent = text;
        bubble.appendChild(textEl);

        const meta = document.createElement('div');
        meta.className = 'message-meta';

        const timeEl = document.createElement('time');
        timeEl.dateTime = timestamp;
        timeEl.textContent = timestamp;
        meta.appendChild(timeEl);

        if (sender === 'a') {
            const statusEl = document.createElement('span');
            statusEl.className = `message-status ${status}`;
            statusEl.setAttribute('aria-label', `Message ${status}`);
            meta.appendChild(statusEl);
        }

        bubble.appendChild(meta);
        return bubble;
    };

    const addMessage = (data) => {
        const bubble = createBubble(data);
        chatWindow.appendChild(bubble);
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    };

    const addDivider = (label) => {
        const divider = document.createElement('div');
        divider.className = 'system-message';
        divider.textContent = label || 'New day';
        chatWindow.appendChild(divider);
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    };

    const resetConversation = () => {
        chatWindow.innerHTML = '';
        addDivider('Today');
    };

    const loadSampleConversation = () => {
        const sample = [
            {
                sender: 'a',
                text: 'Hi!\nI was thinking here, would you like to share your briefing with me?',
                timestamp: '09:01',
                status: 'read'
            },
            {
                sender: 'b',
                text: 'Depending on what you are looking for, I can make some adjustments. I\'m expanding the studio and international projects are important for that',
                timestamp: '09:03'
            },
            {
                sender: 'b',
                text: '1. Core Brand Identity\n2. Logo & Sub-Logo\n3. Signature\n4. Color Palette\n5. Typography\n6. Imagery\n7. Brand Pattern\n8. Brand Guideline (Mini)\n9. Logo usage\n10. Icon usage\n11. Font & Sub-Font',
                timestamp: '09:04'
            },
            {
                sender: 'a',
                text: 'Thank you!',
                timestamp: '09:06',
                status: 'delivered'
            },
            {
                sender: 'b',
                text: 'I see. Is there any possibility to flexibilize your budget, and at the same time, I adjust the delivery scope so we can find a middle ground?',
                timestamp: '09:10'
            },
            {
                sender: 'a',
                text: 'Unfortunately this is the max budget for my team to work on',
                timestamp: '09:12',
                status: 'sent'
            }
        ];

        resetConversation();
        sample.forEach(addMessage);
    };

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = messageInput.value.trim();
        if (!text) {
            messageInput.focus();
            messageInput.classList.add('invalid');
            return;
        }

        const data = {
            sender: senderSelect.value,
            text,
            timestamp: parseTimeInput(timestampInput.value),
            status: statusSelect.value
        };

        addMessage(data);

        messageInput.value = '';
        messageInput.focus();
        timestampInput.value = '';
        messageInput.classList.remove('invalid');
    });

    messageInput.addEventListener('input', () => {
        messageInput.classList.remove('invalid');
    });

    addDividerBtn.addEventListener('click', () => {
        const label = prompt('Divider label', 'Today');
        if (label) {
            addDivider(label.trim());
        }
    });

    resetChatBtn.addEventListener('click', () => {
        if (confirm('Clear the current conversation?')) {
            resetConversation();
        }
    });

    loadSampleBtn.addEventListener('click', () => {
        loadSampleConversation();
    });

    const updateClock = () => {
        phoneClock.textContent = to12Hour(new Date());
    };

    updateClock();
    setInterval(updateClock, 60000);

    // Seed with a friendly hint
    addMessage({
        sender: 'b',
        text: '👋 Welcome! Add your first message using the controls on the left.',
        timestamp: parseTimeInput(''),
        status: 'read'
    });
})();
