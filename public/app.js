const state = { lane: 'all' };

const elements = {
  tasks: document.querySelector('#tasks'),
  template: document.querySelector('#taskTemplate'),
  taskForm: document.querySelector('#taskForm'),
  title: document.querySelector('#title'),
  lane: document.querySelector('#lane'),
  laneButtons: document.querySelectorAll('.lane'),
  summary: {
    total: document.querySelector('#total'),
    pending: document.querySelector('#pending'),
    professional: document.querySelector('#professional'),
    personal: document.querySelector('#personal')
  }
};

const api = {
  listTasks: async (lane) => {
    const query = lane && lane !== 'all' ? `?lane=${lane}` : '';
    const res = await fetch(`/api/tasks${query}`);
    return res.json();
  },
  summary: async () => {
    const res = await fetch('/api/summary');
    return res.json();
  },
  addTask: async (payload) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },
  updateTask: async (id, payload) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },
  removeTask: async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  }
};

const renderSummary = async () => {
  const data = await api.summary();
  Object.entries(data).forEach(([key, value]) => {
    if (elements.summary[key]) elements.summary[key].textContent = value;
  });
};

const renderTasks = async () => {
  const tasks = await api.listTasks(state.lane);
  elements.tasks.innerHTML = '';

  tasks.forEach((task) => {
    const clone = elements.template.content.firstElementChild.cloneNode(true);
    clone.dataset.id = task.id;
    clone.querySelector('h5').textContent = task.title;
    clone.querySelector('p').textContent = `${task.minutes} mins • ${task.status}`;
    const pill = clone.querySelector('.pill');
    pill.textContent = task.lane;
    pill.style.color = task.lane === 'professional' ? 'var(--primary)' : 'var(--secondary)';

    clone.querySelector('.done').addEventListener('click', async () => {
      await api.updateTask(task.id, { status: 'done' });
      await refresh();
    });

    clone.querySelector('.remove').addEventListener('click', async () => {
      await api.removeTask(task.id);
      await refresh();
    });

    elements.tasks.append(clone);
  });
};

const refresh = async () => {
  await Promise.all([renderSummary(), renderTasks()]);
};

elements.taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await api.addTask({ title: elements.title.value, lane: elements.lane.value, status: 'today' });
  elements.taskForm.reset();
  await refresh();
});

elements.laneButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    elements.laneButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    state.lane = button.dataset.lane;
    await renderTasks();
  });
});

refresh();
